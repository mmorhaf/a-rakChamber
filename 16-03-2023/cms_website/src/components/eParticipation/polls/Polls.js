import React, { memo } from "react";
import { useSelector } from "react-redux";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import useStyles from "../../../styles/components/mediaCenter/publications";
import PollsTabs from "./PollsTabs";

function Polls({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "polls" });
  const isRateable = useRating();

  const { lastUpdate = "" } = useSelector(
    (state) => state.surveys.allSurveysReturned
  );
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const classes = useStyles();
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
        <Grid container item xs={12} className="tabs">
          <PollsTabs />
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(Polls);
