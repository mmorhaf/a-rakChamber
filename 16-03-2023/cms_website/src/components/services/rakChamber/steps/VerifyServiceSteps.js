import React from "react";
import { Box, Typography, Step, StepLabel, Stepper } from "@material-ui/core";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { useTranslation } from "react-i18next";

export default function VerifyServiceSteps(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box display="block" justifyContent="center" className={classes.status}>
      <Box position="relative">
        <Box>
          <Typography className={classes.status}>
            {t("SERVICESPAGES.SIGNUP.TIMELINE")}
          </Typography>
          <Stepper
            activeStep={props.getStatus}
            alternativeLabel
            className={classes.stepper}
          >
            <Step completed={props.getStatus == 0 || props.getStatus == 1}>
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.APPLYREQUEST")}
              </StepLabel>
            </Step>
            <Step completed={props.getStatus == 1}>
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.RECEIVESERVICE")}
              </StepLabel>
            </Step>
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
}
