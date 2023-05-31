import React, { useState, useEffect } from "react";
import useStyles from "./style";
import { Grid, Typography } from "@material-ui/core";
import MainImage from "../../shared/mainImage/MainImage";
import { Container } from "@material-ui/core";
import UpperSection from "../../shared/upperSection/UpperSection";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import { getImage } from "../../shared/utils";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

const { getPostByAlias, loadingAction } = actions;
export default function Organizational({ match }) {
  const { t } = useTranslation();
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
  } = useRoute({ match, subPage: "aboutus", category: "organizational" });

  const isRateable = useRating();
  const dispatch = useDispatch();

  let [image, setImage] = useState();
  const { alias } = useParams();
  const { postByAliasReturned = {} } = useSelector(
    (state) => state.posts_reducers
  );
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    const language = isRTL ? "ar" : "en";
    let alias = "Organizational";
    dispatch(getPostByAlias({ sort, alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (postByAliasReturned.success) {
      setImage(getImage(postByAliasReturned.files, isRTL));
      dispatch(loadingAction({ loading: false }));
    }
  }, [postByAliasReturned, isRTL]);

  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className={classes.root}>
        <Grid item xs={12}>
          <UpperSection
            main={main}
            mainPath={mainPath}
            secondaryPage={secondaryPage}
            secondaryPagePath={secondaryPagePath}
            detailsPage={detailsPage}
            apply={apply}
            alias={alias}
            name={name}
            isRateable={isRateable}
            componentRef={componentRef}
            anchorRef={anchorRef}
          />
        </Grid>
        <Typography variant="h5">{t("ORGANIZATIONAL.TITLE")}</Typography>
        <Grid container className="contents">
          <Grid item xs={12} className={classes.flex}>
            <img
              src={`/api/file/download/${image?.uuid}?size=medium`}
              alt="pic"
              className={classes.committeesImage}
            />
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}
