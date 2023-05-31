import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardMedia,
  CardHeader,
  Box,
  CardContent,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useStyles from "./mediaCardStyle";
import { getImage } from "../utils";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
export default function MediaCard(props) {
  const classes = useStyles();
  let { item, link, department } = props;
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const image = getImage(item.files, isRTL);
  // const zeroPad = (num, places) => String(num).padStart(places, "0");
  const zeroPad = (num, numZeros) => {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) zeroString = "-" + zeroString;
    return zeroString + n;
  };
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Card className={classes.mediaCard}>
      <Box className={classes.contentContainer}>
        <CardHeader
          title={
            <span className={classes.date}>
              {t("CAREER.CARD.FROM")}{" "}
              <span className={classes.dateDirection}>
                {" "}
                {moment(item.startTime)
                  .format("DD MMM y")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>{" "}
              {t("CAREER.CARD.TO")}{" "}
              <span className={classes.dateDirection}>
                {" "}
                {moment(item.endTime)
                  .format("DD MMM y")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>
            </span>
          }
          subheader={<span className={classes.main}>{item.title}</span>}
        />
        <CardContent>
          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.REFERENCE")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {zeroPad(item.id, 3)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.DEPARTMENT")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {t(`CAREER.DEPARTMENTS.${item.department}`)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.CLASSIFICATION")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {t(`CAREER.LEVEL.${item.level}`)}
            </Typography>
          </span>
        </CardContent>
        <Link to={`${link}`} className={classes.btnLink}>
          <Button>{t("CAREER.CARD.DETAILS")}</Button>
        </Link>
      </Box>
      <CardMedia
        image={`/api/file/download/${image.uuid}?size=medium`}
        title={image.alt}
      />
    </Card>
  );
}
