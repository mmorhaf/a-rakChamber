import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardMedia,
  CardHeader,
  Box,
  CardContent,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FcCalendar } from "react-icons/fc";
import { CgChevronDoubleRight } from "react-icons/cg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import VideocamIcon from "@material-ui/icons/Videocam";
import useStyles from "./mediaCardStyle";
import { getImage } from "../utils";
import * as moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
export default function MediaCard(props) {
  const classes = useStyles();
  let { item, link } = props;
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const image = getImage(item.files, isRTL);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Card className={classes.mediaCard}>
      <Box className={classes.contentContainer}>
        <CardHeader title={item.title} />
        <CardContent>
          <span>
            <LocationOnIcon className={classes.icon} />
            {item.extraData.locationName}
          </span>
          <span>
            <QueryBuilderIcon className={classes.icon} />
            {moment(item.extraData.eventTime)
              .format("YYYY-MM-D")
              .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
          </span>
          <span>
            <EventAvailableIcon className={classes.icon} />
            {moment(item.extraData.eventDate)
              .format("YYYY-MM-D")
              .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
          </span>
        </CardContent>
        <Link to={`${link}/${item.alias}`} className={classes.link}>
          <Button>{t("MEDIA.NEWS.CARDBTN")}</Button>
        </Link>

        {/* <EventAvailableIcon /> */}
      </Box>
      <CardMedia image={`?size=medium${image.uuid}`} title={image.alt} />
    </Card>
  );
}
