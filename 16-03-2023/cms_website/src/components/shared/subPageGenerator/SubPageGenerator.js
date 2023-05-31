import React, { memo } from "react";
import useRoute from "../customHooks/useRoute";
import useRating from "../customHooks/useRating";
import UpperSection from "../upperSection/UpperSection";
import Routing from "../Routing";
import Grid from "@material-ui/core/Grid";
import useStyles from "../../../styles/components/shared/subPageGenerator/subPageGenerator";
import { Container } from "@material-ui/core";

function SubPageGenerator({ match, subPage }) {
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
  } = useRoute({ match, subPage });

  const isRateable = useRating();

  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.root} ref={componentRef}>
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

        <Grid item xs={12} className={classes.routing}>
          <Routing />
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(SubPageGenerator);
