import React, { memo } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/home/contactUs/links";
import { Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LinksSlider from "../carousels/LinksSlider";

function Links() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Paper className={classes.linkRoot}>
      <Typography variant="h1">
        {t("HOME.PARTICIPATION.LINKS.HEADER")}
      </Typography>
      <Grid container item xs={12}>
        <Grid className="linksContainer">
          <LinksSlider />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default memo(Links);
