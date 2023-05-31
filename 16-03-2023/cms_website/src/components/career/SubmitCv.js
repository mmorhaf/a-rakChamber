import React from "react";
import useStyles from "../../styles/components/career/submitCv";
import { useSelector } from "react-redux";
import { Grid, Container } from "@material-ui/core";
import SubmitCvForm from "./SubmitCvForm";
import MainImage from "../shared/mainImage/MainImage";
import useRoute from "../shared/customHooks/useRoute";
import UpperSection from "../shared/upperSection/UpperSection";
import useRating from "../shared/customHooks/useRating";

export default function SubmitCv(props) {
  const { match } = props;

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
  } = useRoute({ match, subPage: "careers", category: "vacances" });
  const classes = useStyles();
  const isRateable = useRating();
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
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
          <SubmitCvForm {...props} />
        </Grid>
      </Container>
    </Grid>
  );
}
