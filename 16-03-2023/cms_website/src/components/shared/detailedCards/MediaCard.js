import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardMedia,
  CardHeader,
  Box,
  CardContent,
  Grid,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useStyles from "./mediaCardStyle";
import { getImage } from "../utils";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
export default function MediaCard({ item, link }) {
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const image = getImage(item.files, isRTL);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const classes = useStyles();
  return (
    <Grid item md={6} sm={12} xs={12}>
      <Card className={classes.mediaCard}>
        <Box className={classes.contentContainer}>
          <CardHeader
            title={
              <span className={classes.date}>
                {t("CAREER.CARD.FROM")}
                <span className={classes.dateDirection}>
                  {moment(item.activeFrom)
                    .format("DD MMM YYYY")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </span>
                {t("CAREER.CARD.TO")}{" "}
                <span className={classes.dateDirection}>
                  {moment(item.activeTo)
                    .format("DD MMM YYYY")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </span>
              </span>
            }
            subheader={item.title}
          />
          <CardContent>
            <span
              dangerouslySetInnerHTML={{
                __html: `${item.description}`,
              }}
              className={classes.summary}
            ></span>
          </CardContent>
          <Link to={`${link}/${item.alias}`} className={classes.endBtn}>
            <Button>{t("MEDIA.NEWS.CARDBTN")}</Button>
          </Link>
        </Box>
        <CardMedia
          image={`/api/file/download/${image.uuid}?size=medium`}
          title={image.alt}
        />
      </Card>
    </Grid>
  );
}
