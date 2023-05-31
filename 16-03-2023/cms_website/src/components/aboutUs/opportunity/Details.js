import { Container, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import PropTypes from "prop-types";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/detailedNews";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import InvCard from "./InvCard";
import NDetails from "./NDetails";
import Ntable from "./Ntable";

const { getAllPosts, getPostByAlias, byAliasReturned, loadingAction } = actions;

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const { alias } = useParams();
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

export default function Details({ match }, props) {
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
  } = useRoute({
    match,
    subPage: "investmentOpportunity",
    category: "investment",
  });

  const isRateable = useRating();
  const [counter, setCounert] = useState(0);
  const { t } = useTranslation();
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    allPostsReturned: {
      investmentOpportunities: { posts = [], lastUpdate = "" } = {},
    },
    postByAliasReturned,
  } = useSelector((state) => state.posts_reducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    data: [],
    details: [],
  });

  useLayoutEffect(() => {
    let sort = "investmentOpportunities";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
    dispatch(getPostByAlias({ alias, language }));
    dispatch(loadingAction({ loading: true }));
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

  useEffect(() => {
    let newCounter = 0;
    data?.details?.files?.map((file) => {
      if (file?.mimetype?.includes("application")) {
        newCounter = newCounter + 1;
      }
      // {
      //   file?.mimetype?.includes("image") ?
      // }
    });
    setCounert(newCounter);
  }, [data.details]);

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
  }, [data.data, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  const [image, setImage] = useState([]);
  // useEffect(() => {
  //   setImage(getImage([data?.pagePicture], isRTL));
  // }, [data]);

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
            className={classes.ndetails}
          >
            <InvCard
              item={item}
              link="/aboutus/InvestmentOpportunity"
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
          title={detailsPage}
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
            {data.details.title && <NDetails details={data.details} />}
            <Typography
              component="p"
              dangerouslySetInnerHTML={{
                __html: `${data?.details?.description}`,
              }}
            ></Typography>
          </div>
        </Grid>
        <Grid container item xs={12} className={classes.table}>
          {counter > 0 ? <Ntable /> : ""}
        </Grid>
        {/* <Ntable {...props} /> */}
        <Grid item xs={12} className="latest">
          <Grid item xs={12} className="latestHeader">
            <Grid item className="heading">
              <Typography variant="h2">
                {isRTL ? "فرص أخرى" : "Other Opportunities"}
              </Typography>
            </Grid>
            <Grid item xs className="divider">
              <Divider />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2} className="listOfLatest">
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
