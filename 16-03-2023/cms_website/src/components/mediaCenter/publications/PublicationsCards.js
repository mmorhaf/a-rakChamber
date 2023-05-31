import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import PublicationCard from "./PublicationCard";
import useStyles from "../../../styles/components/mediaCenter/publications";

function PublicationsCards({ data, search }) {
  const classes = useStyles();
  const renderCards = data.map((item) => {
    return (
      <Grid item md={4} sm={6} xs={12} className={classes.cc}>
        <PublicationCard item={item} search={search} />
      </Grid>
    );
  });

  return <Grid container>{renderCards}</Grid>;
}

export default memo(PublicationsCards);
