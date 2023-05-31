import React, { useState, useEffect } from "react";
import useStyles from "../../../styles/components/aboutUs/committees";
import { Grid, Typography } from "@material-ui/core";
import MainImage from "../../shared/mainImage/MainImage";
import { Container, Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import actions from "../../../redux/actions";
import { getImage } from "../../shared/utils";
import useRoute from "../../shared/customHooks/useRoute";
import useRating from "../../shared/customHooks/useRating";
import UpperSection from "../../shared/upperSection/UpperSection";

const { getPostByAlias, loadingAction } = actions;

export default function Committees({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "committees" });
  const isRateable = useRating();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
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
    let alias = "Board-Committees";
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

  useEffect(() => {
    setImage(getImage(info?.files, isRTL));
  }, [info]);
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
        <Box className="contents">
          <img
            src={`/api/file/download/${image?.uuid}?size=medium`}
            className={classes.committeesImage}
            alt="pic"
          />
          {info.success ? (
            <Typography
              paragraph
              variant="body1"
              className={classes.committeesParagraph}
            >
              <span
                dangerouslySetInnerHTML={{
                  __html: `${info?.fullText}`,
                }}
              ></span>
            </Typography>
          ) : null}
        </Box>
      </Container>
    </Grid>
  );
}
