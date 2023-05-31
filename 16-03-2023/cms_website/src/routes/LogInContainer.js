import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServicesLogin from "../components/services/rakChamber/ServicesLogin";
import useStyles from "../styles/components/login/loginContainer";

function LogInContainer() {
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
      <Grid item className="formContainer hiddenOverflow">
        <ServicesLogin loginType={loginType} setLoginType={setLoginType} />
      </Grid>
    </Grid>
  );
}

export default memo(LogInContainer);
