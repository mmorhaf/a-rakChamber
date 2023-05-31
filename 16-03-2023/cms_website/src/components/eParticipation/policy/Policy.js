import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Grid, Typography, Container } from "@material-ui/core";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import { useParams } from "react-router";
import NoData from "../../shared/noData/NoData";

const { getPostByAlias, loadingAction } = actions;

export default function AboutChamber({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "policy" });
  const dispatch = useDispatch();
  const { alias } = useParams();
  const isRateable = useRating();
  const classes = useStyles();
  const [info, setInfo] = useState({});

  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const { postByAliasReturned = {} } = useSelector(
    (state) => state.posts_reducers
  );

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    const language = isRTL ? "ar" : "en";
    let alias = "e-policy";
    dispatch(getPostByAlias({ sort, alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (postByAliasReturned.success) {
      setInfo(postByAliasReturned);
      dispatch(loadingAction({ loading: false }));
    }
  }, [postByAliasReturned]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={info?.title}
          // link={secondaryPagePath}
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
        <Typography paragraph variant="body1" className={classes.title}>
          {isRTL ? "سياسة المشاركة الرقمية" : " E- Participation Policy"}
        </Typography>
        {info?.description ? (
          <Typography
            paragraph
            variant="body1"
            className={classes.aboutMainParagraph}
            dangerouslySetInnerHTML={{
              __html: `${info?.description}`,
            }}
          />
        ) : (
          <NoData />
        )}
      </Container>
    </Grid>
  );
}
