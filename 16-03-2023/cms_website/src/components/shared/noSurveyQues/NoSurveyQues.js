import { Typography } from "@material-ui/core";
import React from "react";
import useStyles from "../../../styles/components/shared/noData/noData";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
function NoQues(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  let { card, morePaddingTop } = props;
  return (
    <Typography
      className={
        morePaddingTop
          ? clsx(classes.noDataText, classes.morePaddingTop, classes.cardText)
          : card
          ? clsx(classes.noDataText, classes.cardText)
          : classes.noDataText
      }
    >
      {t("LABEL.NOSURVEYQUES")}
    </Typography>
  );
}

export default NoQues;
