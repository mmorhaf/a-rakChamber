import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Pagination from "@material-ui/lab/Pagination";
import { push } from "connected-react-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCalendarCheckLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { uid } from "react-uid";
import SharedCarousel from "../../../../../components/shared/carousel/DynamicCarousel";
import actions from "../../../../../redux/actions";
import store from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/venueDatails";
import usePaginationStyles from "../../../../../styles/components/shared/pagination/pagination";
import { getImages, pagination } from "../../../../shared/utils";
const { getById } = actions;

export default function VenueDetails() {
  const { t } = useTranslation();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [details, setDetails] = useState([]);
  const [displayedContent, setDisplayedContent] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesArray, setImagesArray] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const reducers = useSelector((state) => state);
  const id = useParams().id;
  const dispatch = useDispatch();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  useEffect(async () => {
    dispatch(getById({ sort: "post", id }));
  }, []);

  useEffect(async () => {
    if (reducers.crudReducers.byIdReturned.result) {
      setData(reducers.crudReducers.byIdReturned.result);
      setDetails(reducers.crudReducers.byIdReturned.result?.details);
      setImages(reducers.crudReducers.byIdReturned.result.files);
    }
  }, [reducers.crudReducers]);

  useEffect(async () => {
    setImagesArray(getImages(images, isRTL));
  }, [images]);

  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useEffect(async () => {
    setDisplayedContent(details);
  }, [details]);

  useLayoutEffect(() => {
    if (!displayedContent.length) return;
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);
  //   End dividing process
  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const renderDetails = (report) => {
    return (
      <>
        <InputLabel className={classes.gray}>
          {isRTL ? report?.title?.ar : report?.title?.en}
        </InputLabel>
        <Typography variant="body1" className={classes.blue}>
          {isRTL ? report?.description?.ar : report?.description?.en}
        </Typography>
      </>
    );
  };

  const roomDetails = paginate.requiredArr?.map((report) => {
    return isRTL && report.publishMode === 1 ? (
      <Grid
        item
        sm={6}
        xs={12}
        key={uid(report)}
        className={classes.marginBottom15}
      >
        {renderDetails(report)}
      </Grid>
    ) : !isRTL && report.publishMode === 2 ? (
      <Grid
        item
        sm={6}
        xs={12}
        key={uid(report)}
        className={classes.marginBottom15}
      >
        {renderDetails(report)}
      </Grid>
    ) : null;
  });

  const paginationClasses = usePaginationStyles();
  return (
    <Grid
      container
      className={classes.root}
      style={{ textAlign: isRTL ? "right" : "left" }}
    >
      <Grid item xs={12}>
        <SharedCarousel items={imagesArray} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.header}
        >
          {" "}
          {isRTL ? data?.title?.ar : data?.title?.en}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.body}
          dangerouslySetInnerHTML={{
            __html: `${isRTL ? data?.description?.ar : data?.description?.en}`,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" gutterBottom className={classes.location}>
          <LocationOnIcon />
          {isRTL
            ? data?.roomSetting?.location?.ar
            : data?.roomSetting?.location?.en}
        </Typography>
      </Grid>
      <Grid container item xs={12} spacing={2} className={classes.margin}>
        {roomDetails}
      </Grid>
      {displayedContent.length > 0 ? (
        <Pagination
          className={paginationClasses.root}
          count={paginate.pgCount}
          variant="outlined"
          shape="rounded"
          onChange={handlePaginationClick}
        />
      ) : null}
      <Grid container item xs={12}>
        <Button
          className={classes.send}
          endIcon={<RiCalendarCheckLine />}
          onClick={() => {
            store.dispatch(
              push(
                `/services-form/OtherServicesForm/BookingService/${data.id}/venue`
              )
            );
          }}
        >
          {t("HOME.SERVICES.BOOK")}
        </Button>
      </Grid>
    </Grid>
  );
}
