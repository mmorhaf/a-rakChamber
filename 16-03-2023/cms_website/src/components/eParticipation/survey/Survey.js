import React, { useState, useLayoutEffect, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainImage from "../../shared/mainImage/MainImage";
import ViewSurvey from "./ViewSurvey";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { Container } from "@material-ui/core";
import actions from "../../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/eParticipation/survay/survay";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import testExpiredDate from "./testActiveSurvey";
import NoQues from "../../shared/noSurveyQues/NoSurveyQues";

const { getSurveyByAlias, surveyByAliasReturned, loadingAction } = actions;

function Survay({ match }) {
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

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { surveyByAliasComplete } = useSelector((state) => state.surveys);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const dispatch = useDispatch();

  const [survey, setSurvey] = useState({});

  useEffect(() => {
    return () => dispatch(surveyByAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";

    dispatch(getSurveyByAlias({ alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (
      surveyByAliasComplete?.success === false &&
      surveyByAliasComplete?.message
    )
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (surveyByAliasComplete?.success) {
      const returnedSurvey = surveyByAliasComplete;
      setSurvey(returnedSurvey);
      dispatch(loadingAction({ loading: false }));
    }
  }, [surveyByAliasComplete]);

  const classes = useStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Grid container className={classes.root} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className="contentContainer">
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
        <Grid item xs={12} className="title">
          <Box>
            <Typography variant="h2">{survey?.title}</Typography>
            <Box component="span">
              {isRTL ? "تاريخ النشر" : "Post Date"}:{" "}
              <span className="dateDirection">
                {moment(survey?.startDate)
                  .format("DD MMMM, YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>
            </Box>
          </Box>
        </Grid>

        {testExpiredDate(survey?.startTime, survey?.endTime) ? (
          <NoQues />
        ) : (
          <Grid item xs={12} className="actualSurvey">
            {survey.id && <ViewSurvey id={survey.id} />}
          </Grid>
        )}
      </Container>
    </Grid>
  );
}

export default memo(Survay);
