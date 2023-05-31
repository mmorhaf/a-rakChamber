import { Grid } from "@material-ui/core";
import React from "react";
import PublicationCard from "../../shared/cards/PublicationCard";
import { uid } from "react-uid";

export function PublicationsCategories({ data }) {
  return (
    <Grid container>
      {data.map((item) => {
        return (
          <Grid key={uid(item)} item md={4} sm={6} xs={12}>
            <PublicationCard item={item} />
          </Grid>
        );
      })}
    </Grid>
  );
}
