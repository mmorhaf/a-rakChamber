import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import MainImage from "../../shared/mainImage/MainImage";
import { Container } from "@material-ui/core";
import useStyles from "../../../styles/components/aboutUs/strategicPlan";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import { useParams } from "react-router";
import PlanCard from "./PlanCard";
import NoData from "../../shared/noData/NoData";

const { getAll, loadingAction } = actions;

export default function StrategicPlan({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "strategic-plan" });
  const isRateable = useRating();
  const dispatch = useDispatch();
  const { alias } = useParams();
  const [data, setData] = useState();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const classes = useStyles();

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
  }, [isRTL]);

  useEffect(() => {
    let sort = "post";
    let subSort = "generalPages";
    let categoryId = 20;
    dispatch(getAll({ sort, subSort, categoryId }));
  }, [isRTL]);

  const { posts = [] } = useSelector((state) => state.crudReducers.allReturned);
  const reducers = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  useEffect(() => {
    if (reducers?.crudReducers?.allReturned?.posts) {
      setData(reducers?.crudReducers?.allReturned?.posts);
      dispatch(loadingAction({ loading: false }));
    }
  }, [reducers]);

  const content =
    data?.length > 0 ? (
      data?.map((item, index) => {
        return (
          <Grid item xs={12} spacing={3} className={classes.card}>
            <PlanCard item={item} />
          </Grid>
        );
      })
    ) : (
      <NoData />
    );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" style={{ marginTop: "30px" }}>
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
        <Grid container item className="strategic">
          <Grid item xs={12} className="content">
            {content}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
