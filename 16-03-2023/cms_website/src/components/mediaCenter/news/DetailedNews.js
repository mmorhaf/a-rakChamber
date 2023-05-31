import { Container, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import MediaCard from "../../../components/shared/cards/MediaCard";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/detailedNews";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import NDetails from "./NDetails";
import Ntable from "./Ntable";
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

export default function DetailedNews({ match }, props) {
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
  } = useRoute({ match, subPage: "media", category: "news" });

  const isRateable = useRating();
  const [counter, setCounert] = useState(0);
  const { t } = useTranslation();
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { loadingActionReturned } = useSelector((state) => state.loading);

  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const {
    allPostsReturned: { news: { posts = [], lastUpdate = "" } = {} },
    postByAliasReturned,
  } = useSelector((state) => state.posts_reducers);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    data: [],
    details: {},
  });

  useEffect(() => {
    let sort = "news";
    const language = isRTL ? "ar" : "en";

    dispatch(loadingAction({ loading: true }));
    dispatch(getAllPosts({ sort, isFeatured: false, language }));
    dispatch(getPostByAlias({ alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    setData((prevState) => ({
      ...prevState,
      data: posts,
    }));
  }, [posts]);

  const getFiles = (files, isRTL) => {
    const itemFiles = files?.filter((file) => {
      if (file) {
        const { publishMode, mimetype } = file;

        if (mimetype.includes("image")) return false;

        if (isRTL && publishMode === 1) return true;
        else if (!isRTL && publishMode === 2) return true;
      }

      return false;
    });

    return itemFiles;
  };

  useEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    dispatch(loadingAction({ loading: false }));
    if (!postByAliasReturned.success) return;
    const returnedData = postByAliasReturned;
    setData((prevState) => ({
      ...prevState,
      details: returnedData,
    }));

    if (!postByAliasReturned.files.length) return;

    const requiredFiles = getFiles(postByAliasReturned.files);

    setCounert(requiredFiles.length);
  }, [postByAliasReturned, alias]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useEffect(() => {
    if (!data.data.length) return;

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
      paginate.requiredArr.map((item) => {
        return (
          <Grid
            item
            md={6}
            sm={12}
            xs={12}
            key={uid(item)}
            className={classes.ndetails}
          >
            <MediaCard
              item={item}
              link="/media/news/"
              component={ScrollTop}
              props={props}
            />
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
      <Container maxWidth="lg" className={classes.detailedNewsRoot}>
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
        <Grid item xs={12} className="actualContent">
          <div id="details">
            {data.details.success ? <NDetails details={data.details} /> : null}
          </div>
        </Grid>
        <Grid container item xs={12} className={classes.table}>
          {counter ? <Ntable details={data.details} /> : null}
        </Grid>
        {/* <Ntable {...props} /> */}
        <Grid item xs={12} className="latest">
          <Grid item xs={12} className="latestHeader">
            <Grid item className="heading">
              <Typography variant="h2">{t("MEDIA.NEWS.LATEST")}</Typography>
            </Grid>
            <Grid item xs className="divider">
              <Divider />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2} className="listOfLatest">
            {paginate.requiredArr.length ? contentSection : null}
          </Grid>
        </Grid>

        {paginate.requiredArr.length ? (
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
