import React, { useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InitiativeCard from "./InitiativeCard";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import UpperSection from "../../shared/upperSection/UpperSection";
import useStyles from "../../../styles/components/mediaCenter/detailedNews";
import useCardStyles from "../../../styles/components/aboutUs/initiativesCards";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../shared/utils";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import MainImage from "../../shared/mainImage/MainImage";
import { Container } from "@material-ui/core";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
const { getAllPosts, getPostByAlias, byAliasReturned, loadingAction } = actions;

function ScrollTop(props) {
  const { children } = props;
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
  } = useRoute({ match, subPage: "aboutus", category: "initiatives" });

  const isRateable = useRating();
  const { t } = useTranslation();
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    allPostsReturned: { initiatives: { posts = [], lastUpdate = "" } = {} },
    postByAliasReturned,
  } = useSelector((state) => state.posts_reducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [details, setDetails] = useState({});

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "initiatives";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
    dispatch(getPostByAlias({ alias, language }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    if (!posts.length) return;

    const requiredPosts = posts.filter((post) => post.alias !== alias);
    setData(requiredPosts);
  }, [posts]);

  useLayoutEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (postByAliasReturned.success) {
      const returnedData = postByAliasReturned;
      setDetails(returnedData);
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
    const displayedContent = data?.filter((item) => item.id !== details?.id);

    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [data, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  const cardStyles = useCardStyles();

  const contentSection = React.useMemo(
    () =>
      paginate.requiredArr?.length > 0 &&
      paginate.requiredArr?.map((item) => {
        return (
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            key={uid(item)}
            className={` ${cardStyles.root}`}
          >
            <InitiativeCard item={item} />
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
          {details?.id ? (
            <>
              <Typography variant="h2" className="title">
                {details?.title}
              </Typography>
              <Typography
                component="p"
                dangerouslySetInnerHTML={{
                  __html: `${details?.description}`,
                }}
              ></Typography>
              <Box className="initibtnContainer">
                <a
                  href={details?.extraData.websiteLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button>{t("INITIATIVE.SITEBTN")}</Button>
                </a>
              </Box>
            </>
          ) : null}
        </Grid>

        <Grid item xs={12} className="latest">
          <Grid item xs={12} className="latestHeader">
            <Grid item className="heading">
              <Typography variant="h2">{t("INITIATIVE.LAST")}</Typography>
            </Grid>
            <Grid item xs className="divider">
              <Divider />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2} className="listOfLatest">
            {contentSection}
          </Grid>
        </Grid>

        {data?.length > 0 ? (
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
