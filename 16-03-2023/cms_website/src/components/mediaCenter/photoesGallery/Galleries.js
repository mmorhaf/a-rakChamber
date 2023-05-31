import React, { memo, Fragment, useLayoutEffect, useState } from "react";
import Gallery from "./Gallery";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { uid } from "react-uid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/mediaCenter/photoAlbumDetails";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { pagination, getImage } from "../../shared/utils";
import PropTypes from "prop-types";

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#details"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div onClick={handleClick} className={classes.root}>
      {children}
    </div>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,

  window: PropTypes.func,
};

function Galleries({ response }, props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [data, setData] = useState([]);
  const [parentGal, setParentGal] = useState({});

  useLayoutEffect(() => {
    const parentGal = response[0];
    response.shift();

    setParentGal(parentGal);
    setData(response);
  }, [response]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 2, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);

  //End dividing process

  const photoesGallerySection =
    paginate.requiredArr?.length > 0 &&
    paginate.requiredArr?.map((album) => {
      const image = getImage(album.files, isRTL);

      return (
        <ScrollTop {...props}>
          <Link key={uid(album)} to={`/media/photos-gallery/${album.alias}`}>
            <Card className="card">
              <CardContent>
                <Box component="span">{album.startDate}</Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  {album.title}
                </Typography>
              </CardContent>
              <CardActionArea>
                <CardMedia
                  className="albumPhoto"
                  image={`/api/file/download/${image.uuid}?size=small`}
                  title={image.alt}
                />
              </CardActionArea>
            </Card>
          </Link>
        </ScrollTop>
      );
    });

  const paginationClasses = usePaginationStyles();

  return (
    <Fragment>
      <Grid container item xs={12}>
        <Grid item xs={12} className="album">
          <div id="details">
            {parentGal.id && <Gallery response={parentGal} />}
          </div>
        </Grid>
        <Grid item xs={12} className="dividTitle">
          <Typography variant="h2" component="h2">
            More Galleries on this Occasion
          </Typography>
          <Divider></Divider>
        </Grid>
        <Grid item xs={12} className="albums">
          {photoesGallerySection}
        </Grid>
      </Grid>

      {data && data?.length > 0 ? (
        <Pagination
          className={paginationClasses.root}
          count={paginate.pgCount}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationClick}
        />
      ) : null}
    </Fragment>
  );
}

export default memo(Galleries);
