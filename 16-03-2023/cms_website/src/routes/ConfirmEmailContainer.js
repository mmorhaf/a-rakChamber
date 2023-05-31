import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ConfirmEmail from "./ConfirmEmail";
import useStyles from "../styles/components/login/loginContainer";

function ConfirmEmailContainer() {
  const [success, setSuccess] = useState(false);
  const [loginType, setLoginType] = useState(1);

  const {
    users: { forgotPasswordComplete },
  } = useSelector((state) => state);

  useEffect(() => {
    if (forgotPasswordComplete) {
      if (forgotPasswordComplete.success) setSuccess(true);
    }
  }, [forgotPasswordComplete]);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item className="formContainer">
        <ConfirmEmail />
      </Grid>
    </Grid>
  );
}

export default memo(ConfirmEmailContainer);
