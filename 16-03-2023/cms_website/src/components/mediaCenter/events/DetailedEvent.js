import { Container, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import React, { memo, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/detailedEvent";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import EventCard from "../../shared/cards/EventCard";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import EDetails from "./EDetails";
import OnThisDay from "./OnThisDay";
const { getAllPosts, getPostByAlias, byAliasReturned, loadingAction } = actions;

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

function DetailedEvent({ match }, props) {
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
  } = useRoute({ match, subPage: "media", category: "events" });

  const isRateable = useRating();
  const { t } = useTranslation();
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    allPostsReturned: { events: { posts = [], lastUpdate = "" } = {} },
    postByAliasReturned,
  } = useSelector((state) => state.posts_reducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    data: [],
    details: {},
  });

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "events";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
    dispatch(getPostByAlias({ alias, language }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    if (!posts.length) return;

    setData((prevState) => ({
      ...prevState,
      data: posts,
    }));
  }, [posts]);

  useLayoutEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (postByAliasReturned.success) {
      const returnedData = postByAliasReturned;
      setData((prevState) => ({
        ...prevState,
        details: returnedData,
      }));
      dispatch(loadingAction({ loading: false }));
    }
  }, [postByAliasReturned, alias]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useLayoutEffect(() => {
    const displayedContent = data.data.filter(
      (item) => item.id !== data.details.id
    );

    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [data, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  const contentSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 &&
      paginate.requiredArr?.map((item) => {
        return (
          <Grid item md={6} sm={12} xs={12} key={uid(item)}>
            <EventCard item={item} component={ScrollTop} props={props} />
          </Grid>
        );
      }),
    [paginate.requiredArr, props]
  );
  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className={classes.detailedEventRoot}>
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

        <Grid container>
          <Grid container item md={9} sm={8} xs={12}>
            <Grid item xs={12} className="actualContent">
              <div id="details">
                {data.details.title && <EDetails details={data.details} />}
              </div>
            </Grid>{" "}
          </Grid>
          <Grid
            container
            item
            md={3}
            sm={4}
            xs={12}
            className={classes.OnThisDay}
          >
            <OnThisDay />
          </Grid>
        </Grid>
        <Grid item xs={12} className="latest">
          <Grid item xs={12} className="latestHeader">
            <Grid item sm={2} xs={6} className="heading">
              <Typography variant="h2" gutterBottom>
                {t("MEDIA.EVENTS.LATEST")}
              </Typography>
            </Grid>
            <Grid item sm={10} xs={6} className="divider">
              <Divider />
            </Grid>
          </Grid>
          <Grid item container spacing={3} xs={12} className="listOfLatest">
            {contentSection}
          </Grid>
        </Grid>
        {data?.data?.length > 0 ? (
          <Pagination
            className={paginationClasses.root}
            count={paginate.pgCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        ) : null}
      </Container>
    </Grid>
  );
}

export default memo(DetailedEvent);
