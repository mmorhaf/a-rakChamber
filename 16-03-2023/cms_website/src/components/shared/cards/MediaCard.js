import React, { Fragment } from "react";
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
import useStyles from "./mediaCardStyle";
import { getImage } from "../utils";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import HtmlParser from "html-react-parser";
import testExpiredDate from "../../eParticipation/survey/testActiveSurvey";
export default function MediaCard({
  item,
  link,
  component: Component,
  props,
  survey,
}) {
  const CustomTag = Component ? Component : Fragment;
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const image = getImage(item.files, isRTL);

  const start = survey ? item.startTime : item.startDate;
  const end = survey ? item.endTime : item.endDate;

  moment.locale(isRTL ? "ar-sa" : "en-au");
  const classes = useStyles();
  return (
    <Card
      className={
        survey && testExpiredDate(start, end)
          ? clsx(classes.inActiveCard, classes.mediaCard)
          : classes.mediaCard
      }
    >
      <Box className={classes.contentContainer}>
        <CustomTag {...props}>
          <CardHeader
            title={
              <span className={classes.date}>
                {moment(item.startDate)
                  .format("DD MMM YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>
            }
            subheader={
              <span className={classes.title}>{HtmlParser(item.title)}</span>
            }
          />
        </CustomTag>

        <CardContent>
          {item?.description ? (
            <p
              className={
                survey && testExpiredDate(start, end)
                  ? clsx(classes.noBackGroundColor, classes.text)
                  : classes.text
              }
              dangerouslySetInnerHTML={{
                __html: `${item?.description}`,
              }}
            ></p>
          ) : null}
        </CardContent>
        <CustomTag {...props}>
          <span
            className={
              survey && testExpiredDate(start, end) ? classes.null : classes.b
            }
          >
            <Link to={`${link}${item.alias}`}>
              <Button>
                {survey ? t("MEDIA.NEWS.START") : t("MEDIA.NEWS.CARDBTN")}
              </Button>
            </Link>
          </span>
        </CustomTag>
      </Box>
      <CardMedia
        image={`/api/file/download/${image.uuid}?size=medium`}
        title={image.alt}
      />
    </Card>
  );
}

MediaCard.propTypes = {
  link: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};
