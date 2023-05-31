import React, { memo, useEffect, useState, useMemo } from "react";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { uid } from "react-uid";
import MediaCard from "../../../components/shared/cards/MediaCard";
import useStyles from "../../../styles/components/mediaCenter/news";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../shared/utils";
import actions from "../../../redux/actions";
import NoData from "../../shared/noData/NoData";

const { getAllSurveys, loadingAction } = actions;

function SurveyContainer({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "survey" });
  const isRateable = useRating();
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const { survey: { surveys = [] } = {}, lastUpdate = "" } = useSelector(
    (state) => state.surveys.allSurveysReturned
  );

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";

    const sort = "survey";
    dispatch(getAllSurveys({ sort, language }));
  }, [isRTL]);

  useEffect(() => {
    const returnedData = surveys;

    if (returnedData.length) setData(returnedData);
    dispatch(loadingAction({ loading: false }));
  }, [surveys]);

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

  const newsSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 ? (
        paginate.requiredArr?.map((item) => {
          return (
            <Grid item md={6} sm={12} xs={12} key={uid(item)}>
              <MediaCard
                item={item}
                link="/participation/survey/"
                survey={true}
              />
            </Grid>
          );
        })
      ) : (
        <NoData />
      ),
    [paginate.requiredArr]
  );

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
          {newsSection}
        </Grid>
        {data && data?.length > 0 ? (
          <Grid item xs={12} className="pagination">
            <Pagination
              className={paginationClasses.root}
              count={paginate.pgCount}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationClick}
            />
          </Grid>
        ) : null}
      </Container>
    </Grid>
  );
}

export default memo(SurveyContainer);
