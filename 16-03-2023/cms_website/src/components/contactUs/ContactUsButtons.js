import React from "react";
import useStyles from "../../styles/components/contactUs/contactUsButtons";
import { Grid, Typography } from "@material-ui/core";
import { Media } from "reactstrap";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.btnsContainer}>
        <Media className={classes.goldenBox}>
          <Media body>
            <Media heading className={classes.boxHeader}>
              {t("CONTACTUS.PHONECARD")}
            </Media>
            <PhoneIcon
              className={`${classes.iconColor} ${classes.phoneIcon} `}
            />
            <Typography variant="body1" className={classes.content}>
              +971 7 2260000
            </Typography>
            <Typography variant="body1" className={classes.content}>
              +971 7 2260112
            </Typography>
          </Media>
        </Media>
        <Media className={`${classes.goldenBox} second`}>
          <Media body>
            <Media heading className={classes.boxHeader}>
              {t("CONTACTUS.MAILCARD")}
            </Media>
            <MailIcon className={classes.iconColor} />
            <Typography variant="body1" className={classes.content}>
              info@rakchamber.ae
            </Typography>
            <Typography variant="body1" className={classes.content}>
              Al Jaz'ah Road, R.A.K., U.A.E
            </Typography>
          </Media>
        </Media>
      </Grid>
    </Grid>
  );
}
