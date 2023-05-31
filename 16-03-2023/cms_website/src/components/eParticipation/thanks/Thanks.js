import React, { memo } from "react";
import { useSelector } from "react-redux";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import ThanksForm from "./ThanksForm";
import useStyles from "../../../styles/components/eParticipation/opinion/opinionDetails";

function OpinionDetails({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "thanks" });
  const isRateable = useRating();

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
        <Grid
          item
          xs={12}
          md={10}
          className="comment"
          style={{ marginTop: "50px" }}
        >
          <Box className="commentForm">
            <ThanksForm />
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(OpinionDetails);
