import { Grid, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";
import Tooltip from "@material-ui/core/Tooltip";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Pagination from "@material-ui/lab/Pagination";
import { push } from "connected-react-router";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../../redux/actions";
import store from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/venuesCards";
import usePaginationStyles from "../../../../../styles/components/shared/pagination/pagination";
import { getImage, pagination } from "../../../../shared/utils";
import NoData from "../../../../shared/noData/NoData";

const { getAllAb, sendMostUsedService } = actions;

function BootstrapTooltip(props) {
  return <Tooltip arrow {...props} />;
}
function VenuesCards() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [displayedContent, setDisplayedContent] = useState([]);
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  useEffect(async () => {
    const language = isRTL ? "ar" : "en";
    let sort = "post";
    let subSort = "rooms";
    dispatch(getAllAb({ sort, subSort, language }));
    dispatch(sendMostUsedService({ data: "4b" }));
  }, [isRTL]);
  useEffect(() => {
    if (reducers.crudReducers.allAbReturned)
      setData(reducers.crudReducers.allAbReturned.posts);
  }, [reducers.crudReducers]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useEffect(() => {
    if (data) setDisplayedContent(data);
  }, [data]);

  useLayoutEffect(() => {
    if (!displayedContent.length) return;

    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const renderMedia = (report) => {
    const image = getImage(report?.files, isRTL);
    return (
      <Grid item md={6} xs={12}>
        <Card
          className={classes.card}
          style={{ textAlign: isRTL ? "right" : "left" }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.header}
              >
                {report?.title}
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                className={classes.subHeader}
              >
                <LocationOnIcon />
                {isRTL
                  ? report?.roomSetting?.location?.ar
                  : report?.roomSetting?.location?.en}
              </Typography>
            </CardContent>
            <CardMedia
              className={classes.media}
              image={`/api/file/download/${image.uuid}?size=small`}
              alt={image.alt}
            />
          </CardActionArea>
          <CardActions>
            <BootstrapTooltip title="More">
              <IconButton
                className={classes.send}
                onClick={() => {
                  store.dispatch(
                    push(
                      `/services-form/OtherServicesForm/BookingService/${report.id}`
                    )
                  );
                }}
              >
                {isRTL ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
              </IconButton>
            </BootstrapTooltip>
          </CardActions>
        </Card>
      </Grid>
    );
  };
  const newsSection = paginate.requiredArr?.map((report) => {
    return <>{renderMedia(report)}</>;
  });

  const paginationClasses = usePaginationStyles();

  return (
    <>
      <Grid container spacing={3}>
        {paginate.requiredArr.length ? newsSection : <NoData />}
      </Grid>
      {paginate.requiredArr.length > 0 ? (
        <Pagination
          className={paginationClasses.root}
          count={paginate.pgCount}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationClick}
        />
      ) : null}
    </>
  );
}
export default memo(VenuesCards);
