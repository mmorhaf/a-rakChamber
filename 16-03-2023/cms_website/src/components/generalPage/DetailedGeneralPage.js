import { Container, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/mediaCenter/detailedNews";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import MainImage from "../shared/mainImage/MainImage";
import UpperSection from "../shared/upperSection/UpperSection";
import { pagination } from "../shared/utils";
import NDetails from "./GeneralPageDetails";
import Ntable from "./Ntable";
const { getPostByAlias, byAliasReturned, loadingAction } = actions;

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

export default function DetailedGeneralPage({ match }, props) {
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
  const [pageName, setPageName] = useState("");
  const [secondaryPageName, setSecondaryPageName] = useState("");
  const [link, setLink] = useState("");
  const [secondaryPageLink, setSecondaryPageLink] = useState("");
  const { t } = useTranslation();
  const { alias } = match.params;
  const reducers = useSelector((state) => state);

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
    const language = isRTL ? "ar" : "en";
    dispatch(loadingAction({ loading: true }));
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

  useEffect(() => {
    if (reducers?.menu?.menuReturned?.length > 0) {
      let header = reducers?.menu?.menuReturned?.filter(
        (item) => item?.title?.en === "header"
      );
      let link = window?.location?.href?.split("/");
      let menuLink = header[0]?.childrens?.filter(
        (item) =>
          item?.link === `/${link[link?.length - 2]}/${link[link?.length - 1]}`
      );
      if (menuLink && menuLink?.length > 0) {
        setLink(menuLink[0]?.link);
        setPageName(isRTL ? menuLink[0]?.title?.ar : menuLink[0]?.title?.en);
      } else {
        header[0]?.childrens?.map((item) => {
          item?.childrens?.map((subItem) => {
            if (
              subItem?.link ===
              `/${link[link?.length - 2]}/${link[link?.length - 1]}`
            ) {
              setPageName(isRTL ? item?.title?.ar : item?.title?.en);
              setSecondaryPageName(
                isRTL ? subItem?.title?.ar : subItem?.title?.en
              );
              setSecondaryPageLink(subItem?.link);
            }
          });
        });
      }
    } else if (data?.details) {
      setPageName(
        isRTL
          ? data?.details?.categoryTitle?.ar
          : data?.details?.categoryTitle?.en
      );
      setLink(`/section/${data?.details?.categoryAlias}`);
      setSecondaryPageName(data?.details?.title);
      setSecondaryPageLink(`/page/${data?.details?.categoryAlias}`);
    }
  }, [data, window?.location?.href]);

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
    if (!postByAliasReturned.success) return;
    const returnedData = postByAliasReturned;
    setData((prevState) => ({
      ...prevState,
      details: returnedData,
    }));

    dispatch(loadingAction({ loading: false }));

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

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPageName}
          link={link}
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
            dynamic={true}
            pageName={pageName}
            secondaryPageName={secondaryPageName}
            link={link}
            secondaryPageLink={secondaryPageLink}
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
      </Container>
    </Grid>
  );
}
