import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import InitiativeCard from "./InitiativeCard";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import useStyles from "../../../styles/components/mediaCenter/news";
import useCardStyles from "../../../styles/components/aboutUs/initiativesCards";
import { useSelector, useDispatch } from "react-redux";
import NoData from "../../shared/noData/NoData";
import actions from "../../../redux/actions";

const { getAllPosts, loadingAction } = actions;

function News({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "initiatives" });

  const isRateable = useRating();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  const { initiatives: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "initiatives";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  const cardStyles = useCardStyles();

  const card = useCallback((item) => <InitiativeCard item={item} />, []);

  const renderCards = useMemo(
    () =>
      data.map((item) => (
        <Grid item md={4} sm={6} xs={12}>
          {card(item)}
        </Grid>
      )),
    [data, card]
  );

  const classes = useStyles();

  return (
    <Grid container className={classes.newsRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className="contents">
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
        <Grid
          container
          item
          xs={12}
          className={`${classes.news} ${cardStyles.root}`}
        >
          {data.length ? renderCards : <NoData />}
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(News);
