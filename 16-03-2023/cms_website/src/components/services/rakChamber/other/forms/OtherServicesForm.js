import { Grid, Typography } from "@material-ui/core";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import CommercialConsultationForm from "./CommercialConsultationForm";
import LegalConsultancyForm from "./LegalConsultancyForm";
import TechnicalSupportForm from "./TechnicalSupportForm";
import VenuesCards from "./VenuesCards";

function OtherServicesForm(props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const classes = useStyles();
  let { serviceName } = useParams();
  let serviceTitle = "";

  switch (serviceName) {
    case "Commercial Consultation":
      serviceTitle = isRTL ? "استشارة تجارية" : "Commercial Consultation";
      break;
    case "Technical Support":
      serviceTitle = isRTL ? "دعم فني" : "Technical Support";
      break;
    case "Legal Consultation":
      serviceTitle = isRTL ? "استشارة قانونية" : "Legal Consultation";
      break;
    case "Booking Service":
      serviceTitle = isRTL ? "خدمة الحجز" : "Booking Service";
      break;
    default:
      serviceTitle = "";
  }

  return (
    <Grid container className={classes.otherContainer}>
      <Typography className={classes.serviceTitle}>{serviceTitle}</Typography>

      {props.selectedId == 2 ||
      props.location.id == 2 ||
      serviceName == "Commercial Consultation" ? (
        <CommercialConsultationForm />
      ) : props.selectedId == 3 ||
        props.location.id == 3 ||
        serviceName == "Technical Support" ? (
        <TechnicalSupportForm />
      ) : props.selectedId == 1 ||
        props.location.id == 1 ||
        serviceName == "Legal Consultation" ? (
        <LegalConsultancyForm />
      ) : props.selectedId == 4 ||
        props.location.id == 4 ||
        serviceName == "Booking Service" ? (
        <VenuesCards />
      ) : null}
    </Grid>
  );
}

export default memo(OtherServicesForm);
