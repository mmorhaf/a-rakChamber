import { Button, Container, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import ShareIcon from "@material-ui/icons/Share";
import Pagination from "@material-ui/lab/Pagination";
import * as moment from "moment";
import PropTypes from "prop-types";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillYoutube } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/detailsVideoGallery";
import useVideoBtnStyles from "../../../styles/components/mediaCenter/videosGallery";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import Dialog from "../../shared/dialog/Dialog";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { getImage, pagination } from "../../shared/utils";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
const { getCategories, getCategoryByAlias, byAliasReturned, loadingAction } =
  actions;
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

function VideoGalleryDetails({ match }, props) {
  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    apply,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "media", category: "videos-gallery" });
  const isRateable = useRating();
  const { t } = useTranslation();
  const { alias } = match.params;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    categoriesReturned: { video: { categories = [], lastUpdate = "" } = {} },
    categoryByAliasReturned,
  } = useSelector((state) => state.category);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    allVideos: [],
    galVideos: {},
  });

  useEffect(() => {
    const sort = "video";
    const language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, isFeatured: false, language }));
    dispatch(getCategoryByAlias({ alias, language }));
    dispatch(loadingAction({ loading: true }));
  }, [isRTL, alias]);

  useEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useEffect(() => {
    if (confirmed) {
      window.open("https://www.youtube.com/channel/UCQbVLrrEc_Vi2n_FzBhc22w");
      setConfirmed(false);
    }
  }, [confirmed]);

  useEffect(() => {
    if (!categories.length) return;

    setData((prevState) => ({
      ...prevState,
      allVideos: categories,
    }));
  }, [categories]);

  useEffect(() => {
    if (
      categoryByAliasReturned?.success === false &&
      categoryByAliasReturned?.message
    )
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (categoryByAliasReturned.success) {
      const returnedData = categoryByAliasReturned;

      setData((prevState) => ({
        ...prevState,
        galVideos: returnedData,
      }));
    }
    dispatch(loadingAction({ loading: false }));
  }, [categoryByAliasReturned, alias]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);

  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useEffect(() => {
    const displayedContent = data.allVideos.filter(
      (item) => item.id !== data.galVideos.id
    );
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [data, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const videoBtnCalsses = useVideoBtnStyles();
  const paginationClasses = usePaginationStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  //data.galVideos.links
  const renderVideoGallery = (links) =>
    links.map((video) => {
      const videoLink = video.link.split("&")[0];

      return (
        <Card key={uid(video)}>
          <Box className="videoContainer">
            {" "}
            <CardMedia
              component="iframe"
              title={video.alt}
              image={videoLink}
              allowFullScreen={true}
              frameborder="0"
            />
          </Box>
          <CardContent>
            <Box className="titleNshare">
              <Typography component="h5" variant="h5">
                {isRTL ? video.title.ar : video.title.en}
              </Typography>
              <ShareIcon />
            </Box>

            <Box className="dataNviews">
              <Box component="span" className="date">
                {moment(video.startDate)
                  .format("YYYY-MM-D")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      );
    });

  const renderMedia = useCallback(
    (album) => {
      const image = getImage(album.files, isRTL);
      return (
        <Grid key={uid(album)} item md={4} sm={6} xs={12}>
          <Link key={uid(album)} to={`/media/videos-gallery/${album.alias}`}>
            <Card className="card">
              <CardContent>
                <Box component="span">
                  {moment(album.startDate)
                    .format("DD MMM YYYY")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </Box>
                <Typography variant="body2" color="textSecondary" component="p">
                  {album.title}
                </Typography>
              </CardContent>
              <CardActionArea className={videoBtnCalsses.root}>
                <Box className="circle">
                  <PlayArrowOutlinedIcon />
                </Box>
                <CardMedia
                  className="albumPhoto"
                  image={`/api/file/download/${image.uuid}?size=small`}
                  title={image.alt}
                />
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      );
    },
    [isRTL, props]
  );

  const contentSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 &&
      paginate.requiredArr?.map((album) => {
        return renderMedia(album);
      }),
    [paginate.requiredArr, renderMedia]
  );

  return (
    <Grid container className={classes.photoesRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className={classes.root}>
        <Grid item xs={12}>
          <UpperSection
            main={main}
            mainPath={mainPath}
            secondaryPage={secondaryPage}
            secondaryPagePath={secondaryPagePath}
            detailsPage={detailsPage}
            alias={alias}
            apply={apply}
            name={name}
            isRateable={isRateable}
            componentRef={componentRef}
            anchorRef={anchorRef}
          />
        </Grid>
        <Grid item xs={12} className="headContent">
          {data.galVideos ? (
            <>
              <Typography variant="h2">{data.galVideos.title}</Typography>
              <Typography variant="p">
                {moment(data.galVideos.startDate)
                  .format("DD MMM YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </Typography>
            </>
          ) : null}
        </Grid>

        <Grid item xs={12} className="actualContent">
          <div id="details">
            <Grid item xs={12} className={classes.subscribe}>
              <Button
                variant="outlined"
                startIcon={<AiFillYoutube />}
                onClick={() => {
                  setOpen(true);
                  setMessage(
                    isRTL
                      ? "هل تريد الذهاب إلى يوتيوب ؟"
                      : "Do you want to go to youtube?"
                  );
                  setConfirmed();
                }}
              >
                {t("VIDEODETAILS.SUBSCRIBE")}
              </Button>
            </Grid>
            <Grid item xs={12}>
              {Object.keys(data.galVideos).length
                ? renderVideoGallery(data.galVideos.links)
                : null}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} className="latest">
          <Grid item xs={12} className="latestHeader">
            <Grid item xs={5} sm={3} md={2} className="heading">
              <Typography variant="h2">{t("MEDIA.VIDEO.LATEST")}</Typography>
            </Grid>
            <Grid item xs className="divider">
              <Divider />
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <Grid container item xs={12} className="listOfLatest">
              {contentSection}
            </Grid>
          </Grid>
        </Grid>
        {data?.allVideos?.length > 0 ? (
          <Pagination
            className={paginationClasses.root}
            count={paginate.pgCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        ) : null}
      </Container>
      <Dialog open={open} message={message} setConfirmed={setConfirmed} />
    </Grid>
  );
}

export default memo(VideoGalleryDetails);
