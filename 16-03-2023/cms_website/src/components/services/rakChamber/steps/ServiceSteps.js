import React from "react";
import { Box, Typography, Step, StepLabel, Stepper } from "@material-ui/core";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { useTranslation } from "react-i18next";

export default function ServiceStep(props) {
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
            <Step
              completed={
                props.getStatus == 0 ||
                props.getStatus == 1 ||
                props.getStatus == 2 ||
                props.getStatus == 3 ||
                props.getStatus == 4
              }
            >
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.APPLYREQUEST")}
              </StepLabel>
            </Step>
            <Step
              completed={
                props.getStatus == 1 ||
                props.getStatus == 2 ||
                props.getStatus == 3 ||
                props.getStatus == 4
              }
            >
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.REQUESTREVIEW")}
              </StepLabel>
            </Step>
            <Step
              completed={
                props.getStatus == 2 ||
                props.getStatus == 3 ||
                props.getStatus == 4
              }
            >
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.REQUESTAPPROVE")}
              </StepLabel>
            </Step>
            <Step completed={props.getStatus == 3 || props.getStatus == 4}>
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.FEESPAYMENT")}
              </StepLabel>
            </Step>
            <Step completed={props.getStatus == 4}>
              <StepLabel>
                {t("SERVICESPAGES.SERVICEDETAILS.RECEIVESERVICE")}
              </StepLabel>
            </Step>
          </Stepper>
        </Box>
      </Box>
      <Box>{props.status}</Box>
    </Box>
  );
}
