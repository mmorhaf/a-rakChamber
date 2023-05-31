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
import { AiOutlineCalendar } from "react-icons/ai";
import { CgSandClock } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { BiTimeFive, BiCalendarPlus } from "react-icons/bi";
import useStyles from "./eventCardStyle";
import { getImage } from "../utils";
import * as moment from "moment";
import PropTypes from "prop-types";
import { RiBroadcastLine } from "react-icons/ri";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
export default function MediaCard({ item, component: Component, props }) {
  const CustomTag = Component ? Component : Fragment;
  const {
    locationName,
    arLocationName,
    eventDate,
    eventTime,
    eventStartTime,
    eventEndTime,
    eventType,
  } = item.extraData;

  const classes = useStyles();
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const getType = (type, isRTL) => {
    let returnedType = isRTL ? "خارجي" : "External";
    if (type === "Internal") returnedType = isRTL ? "داخلي" : "Internal";
    return returnedType;
  };
  const gapi = window.gapi;
  const CLIENT_ID =
    "11968745056-iu2iva917mmnos3v1jf5gr98aokdtfb3.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDINanwBcvyn8YrF2NcGQiMTE_amez93u0";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";
  const image = getImage(item.files, isRTL);
  const d = moment(item.activeFrom).format("YYYY-MM-D");
  const d1 = moment(item.activeTo).format("YYYY-MM-D");
  var given = moment(d, "YYYY-MM-DD");
  var current = moment().startOf("day");
  let days = moment.duration(given.diff(current)).asDays();

  let activeFrom = moment(current).isBefore(d);
  let disForm = moment(d1).isBefore(current);
  let activeTo = moment(current).isAfter(d1);

  const handleAddtoGoogle = () => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      gapi.client.load("calendar", "v3");

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          let event = {
            summary: item?.title, // or event name
            location: isRTL
              ? item?.extraData?.arLocationName
              : item?.extraData?.locationName, //where it would happen
            start: {
              dateTime: new Date(
                new Date(
                  moment(item?.activeFrom).format("MMM DD YYYY")
                ).getTime() -
                  new Date().getTimezoneOffset() * 60 * 1000
              ),
              timeZone: "GMT/UTC (UTC+04:00)",
            },
            end: {
              dateTime: new Date(
                new Date(
                  moment(item?.activeTo).format("MMM DD YYYY")
                ).getTime() -
                  new Date().getTimezoneOffset() * 60 * 1000
              )
                .toISOString()
                .split(".")[0],
              timeZone: "GMT/UTC (UTC+04:00)",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
            reminders: {
              useDefault: false,
              overrides: [{ method: "popup", minutes: 20 }],
            },
          };
          let request = gapi.client.calendar.events.insert({
            calendarId: "primary",
            resource: event,
          });
          request.execute((event) => {
            window.open(event.htmlLink);
          });
        })
        .catch((e) => {
          console.log(e, "error55533");
        });
    });
  };
  moment.locale(isRTL ? "ar-sa" : "en-au");
  let time = moment(eventStartTime)
    .format("h:mm A")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

  let endTime = moment(eventEndTime)
    .format("h:mm A")
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
  return (
    <>
      {disForm === true ? (
        <span className={classes.diableCard}>
          {" "}
          <Card className={classes.mediaCard}>
            <Box className={classes.contentContainer}>
              <span>
                {eventType === "External" ? (
                  <span className={classes.ext}>
                    {getType(eventType, isRTL)}
                  </span>
                ) : (
                  <span className={classes.int}>
                    {getType(eventType, isRTL)}
                  </span>
                )}
                {activeFrom === false &&
                activeTo === false &&
                item?.liveBroadCastLink ? (
                  <span>
                    <RiBroadcastLine className={classes.enableIcon} />{" "}
                    <span className={classes.enable}>
                      {isRTL ? "مباشر" : "live"}
                    </span>
                  </span>
                ) : null}
              </span>
              <CustomTag {...props}>
                <Link to={`/media/events/${item.alias}`}>
                  <CardHeader title={item.title} />
                </Link>
              </CustomTag>
              <CardContent>
                <span className={classes.detail}>
                  <ImLocation />
                  {isRTL ? arLocationName : locationName}
                </span>
                <span className={classes.detail}>
                  <BiTimeFive />
                  {time}-{endTime}
                </span>
                <span className={classes.detail}>
                  <AiOutlineCalendar />
                  {moment(item.activeFrom)
                    .format("ll")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}{" "}
                  ,
                  {moment(item.activeTo)
                    .format("ll")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </span>
                <span className={classes.detail}>
                  {activeFrom === true ? (
                    <span>
                      <CgSandClock />{" "}
                      {(isRTL ? "بعد " : "after ") +
                        Math.floor(days) +
                        (isRTL ? " يوم " : " Days")}
                    </span>
                  ) : activeFrom === false && activeTo === false ? (
                    <span>
                      <CgSandClock /> {isRTL ? "يحدث الان" : "Happening Now"}
                    </span>
                  ) : (
                    <span>
                      <CgSandClock /> {isRTL ? "منتهي" : "Finished"}
                    </span>
                  )}
                  {/* {days} */}
                </span>
              </CardContent>
              <CustomTag {...props}>
                <Link to={`/media/events/${item.alias}`}>
                  <Button>{t("MEDIA.NEWS.CARDBTN")}</Button>
                </Link>
              </CustomTag>
            </Box>
            <CardMedia
              image={`/api/file/download/${image.uuid}?size=medium`}
              title={image.alt}
            />
          </Card>
        </span>
      ) : (
        <span>
          {" "}
          <Card className={classes.mediaCard}>
            <Box className={classes.contentContainer}>
              <span>
                {eventType === "External" ? (
                  <span className={classes.ext}>
                    {getType(eventType, isRTL)}
                  </span>
                ) : (
                  <span className={classes.int}>
                    {getType(eventType, isRTL)}
                  </span>
                )}{" "}
                {activeFrom === false &&
                activeTo === false &&
                item?.liveBroadCastLink ? (
                  <span>
                    <RiBroadcastLine className={classes.enableIcon} />{" "}
                    <span className={classes.enable}>
                      {isRTL ? "مباشر" : "live"}
                    </span>
                  </span>
                ) : null}
              </span>
              <BiCalendarPlus
                className={classes.calendarIcon}
                onClick={() => handleAddtoGoogle()}
              />
              <CustomTag {...props}>
                <Link
                  to={`/media/events/${item.alias}`}
                  // style={{ alignSelf: "self-end", marginRight: "15px" }}
                >
                  <CardHeader title={item.title} />
                </Link>
              </CustomTag>
              <CardContent>
                <span className={classes.detail}>
                  <ImLocation />
                  {isRTL ? arLocationName : locationName}
                </span>
                <span className={classes.detail}>
                  <BiTimeFive />
                  {time}-{endTime}
                </span>
                <span className={classes.detail}>
                  <AiOutlineCalendar />
                  {moment(item.activeFrom)
                    .format("ll")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}{" "}
                  ,
                  {moment(item.activeTo)
                    .format("ll")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </span>
                <span className={classes.detail}>
                  {activeFrom === true ? (
                    <span>
                      <CgSandClock />{" "}
                      {(isRTL ? "بعد " : "after ") +
                        Math.floor(days) +
                        (isRTL ? " يوم " : " Days")}
                    </span>
                  ) : activeFrom === false && activeTo === false ? (
                    <span>
                      <CgSandClock /> {isRTL ? "يحدث الان" : "Happening Now"}
                    </span>
                  ) : (
                    <span>
                      <CgSandClock /> {isRTL ? "منتهي" : "Finished"}
                    </span>
                  )}
                  {/* {days} */}
                </span>
              </CardContent>
              <CustomTag {...props}>
                <Link
                  to={`/media/events/${item.alias}`}
                  // style={{ alignSelf: "self-end", marginRight: "15px" }}
                >
                  <Button>{t("MEDIA.NEWS.CARDBTN")}</Button>
                </Link>
              </CustomTag>
            </Box>
            <CardMedia
              image={`/api/file/download/${image.uuid}?size=medium`}
              title={image.alt}
            />
          </Card>
        </span>
      )}
    </>
  );
}

MediaCard.propTypes = {
  item: PropTypes.object.isRequired,
};
