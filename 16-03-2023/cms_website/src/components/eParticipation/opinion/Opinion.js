import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../../../components/shared/detailedCards/MediaCard";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/news";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import NoData from "../../shared/noData/NoData";

const { getAllPosts, loadingAction } = actions;

function Opinion({ match }) {
  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    alias,
    apply,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "participation", category: "opinion" });
  const isRateable = useRating();

  const { t } = useTranslation();

  const { opinions: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const sort = "opinions";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    const returnedData = posts;
    dispatch(loadingAction({ loading: false }));
    if (returnedData.length) setData(returnedData);
  }, [posts]);
  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const displayedContent = data;

  useEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const opinionSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 ? (
        paginate.requiredArr?.map((item) => {
          return <MediaCard item={item} link={"/participation/opinion"} />;
        })
      ) : (
        <NoData morePaddingTop={true} />
      ),
    [paginate.requiredArr]
  );

  // const liteOpinionSection = useMemo(opinionSection, [opinionSection]);

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  return (
    <Grid container className={classes.newsRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg">
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
        <Grid container item xs={12} className={classes.news}>
          {opinionSection}
        </Grid>
        <Grid item xs={12} className="pagination">
          {data?.length > 0 ? (
            <Pagination
              className={paginationClasses.root}
              count={paginate.pgCount}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationClick}
            />
          ) : null}
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(Opinion);
