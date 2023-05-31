import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import MobileLogIn from "./MobileLogIn";
import MobileResetPassword from "./MobileResetPassword";

function MobileLogInContainer() {
  const [success, setSuccess] = useState(false);
  const {
    users: { forgotPasswordComplete },
  } = useSelector((state) => state);

  useEffect(() => {
    if (forgotPasswordComplete) {
      if (forgotPasswordComplete.success) setSuccess(true);
    }
  }, [forgotPasswordComplete]);

  return (
    <Grid container>
      {!success ? (
        <MobileLogIn />
      ) : (
        <MobileResetPassword setSuccess={setSuccess} />
      )}
    </Grid>
  );
}

export default memo(MobileLogInContainer);
