import React, { useState, useEffect } from "react";
import useStyles from "../../../styles/components/aboutUs/boardOfDirector";
import { Grid, Container } from "@material-ui/core";
import MainImage from "../../shared/mainImage/MainImage";
import DirectorsCard from "./DirectorsCard";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useRoute from "../../shared/customHooks/useRoute";
import useRating from "../../shared/customHooks/useRating";
import UpperSection from "../../shared/upperSection/UpperSection";
import NoData from "../../shared/noData/NoData";

const { getAllPosts, loadingAction } = actions;

export default function BoardOfDirector({ match }) {
  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    apply,
    alias,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "aboutus", category: "boardOfDirectors" });
  const isRateable = useRating();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [data, setData] = useState();
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const { directors: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "directors";

    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  // useEffect(() => {
  //   data?.map((item) => {
  //     setImage(getImage(item?.files, isRTL));
  //   });
  // }, [data]);

  const content =
    data?.length > 0 ? (
      data?.map((item) => {
        return (
          <Grid item md={3} sm={6} xs={12} spacing={3} className={classes.card}>
            <DirectorsCard data={item} isRTL={isRTL} />
          </Grid>
        );
      })
    ) : (
      <NoData />
    );
  return (
    <Grid container>
      <Grid style={{ width: "100%" }}>
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

        <Grid container className={classes.root}>
          {content}
        </Grid>
      </Container>
    </Grid>
  );
}
