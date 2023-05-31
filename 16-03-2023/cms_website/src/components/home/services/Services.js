import React, { memo } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Typography } from "@material-ui/core";
import useStyles from "../../../styles/components/home/common/sectionHeader";
import ServicesTabs from "./ServicesTabs";
import { useTranslation } from "react-i18next";

function Services() {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={5} className="divider">
        <Divider />
      </Grid>
      <Grid item xs={2} className="title">
        <Typography variant="h1" gutterBottom>
          {t("HOME.SERVICES.HEADER")}
        </Typography>
      </Grid>
      <Grid item xs={5} className="divider">
        <Divider />
      </Grid>
      <Grid item xs={12} className={classes.tabsContainer}>
        <ServicesTabs />
      </Grid>
    </Grid>
  );
}

export default memo(Services);
