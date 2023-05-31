import Grid from "@material-ui/core/Grid";
import React, { memo } from "react";
import useStyles from "../styles/components/login/loginContainer";
import ResendCode from "./ResendCode";

function ResendCodeContainer() {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item className="formContainer">
        <ResendCode />
      </Grid>
    </Grid>
  );
}

export default memo(ResendCodeContainer);
