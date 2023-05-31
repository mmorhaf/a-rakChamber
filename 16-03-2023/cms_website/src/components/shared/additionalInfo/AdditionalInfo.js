import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Helpful from "../helpful/Helpful";
// import Visitors from "../visitors/Visitors";
import LastUpdate from "../lastUpdate/LastUpdate";
import useStyles from "../../../styles/components/shared/additionalInfo/additionalInfo";

function AdditionalInfo({ pageLastUpdate }) {
  const {
    askingForRatingReturned: { askForIsUseFull },
  } = useSelector((state) => state.rate);

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {askForIsUseFull && <Helpful />}
          <Divider />
        </Grid>
        <Grid item xs={12} className="lastSectionContainer">
          {/* <Visitors /> */}
          <LastUpdate pageLastUpdate={pageLastUpdate} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdditionalInfo;
