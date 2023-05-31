import { Box, Button, Typography } from "@material-ui/core";
import * as moment from "moment";
import React, { memo, useLayoutEffect, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BiCalendarPlus } from "react-icons/bi";
import { CgSandClock } from "react-icons/cg";
import { FaClipboardList, FaPhotoVideo } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { GrGallery } from "react-icons/gr";
import { ImLocation } from "react-icons/im";
import { RiBroadcastLine } from "react-icons/ri";
import { VscBroadcast, VscFilePdf } from "react-icons/vsc";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../../components/shared/cards/eventCardStyle";
import { getFiles } from "../../../components/shared/utils";
import { push } from "connected-react-router";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import clsx from "clsx";
import "moment/locale/ar-sa";
import "moment/locale/en-au";

function EDetails({ details }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const [links, setLinks] = useState([]);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
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
  useLayoutEffect(() => {
    const linksArr = details.links.filter((link) =>
      isRTL ? link.title.ar : link.title.en
    );

    setLinks(linksArr);
  }, [isRTL, details.links]);

  useEffect(() => {
    if (details && details?.files) {
      let eventFiles = getFiles(details?.files, isRTL);
      if (eventFiles && eventFiles?.length) setFiles(eventFiles);
    }
  }, [details]);

  const d = moment(details.activeFrom).format("YYYY-MM-D");
  const d1 = moment(details.activeTo).format("YYYY-MM-D");
  let disForm = moment(d1).isBefore(current);
  var given = moment(d, "YYYY-MM-DD");
  var current = moment().startOf("day");
  let days = moment.duration(given.diff(current)).asDays();
  let activeFrom = moment(current).isBefore(d);
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
            summary: details?.title, // or event name
            location: details?.extraData?.locationName, //where it would happen
            start: {
              dateTime: new Date(
                new Date(
                  moment(details?.activeFrom).format("MMM DD YYYY")
                ).getTime() -
                  new Date().getTimezoneOffset() * 60 * 1000
              ),
              timeZone: "GMT/UTC (UTC+04:00)",
            },
            end: {
              dateTime: new Date(
                new Date(
                  moment(details?.activeTo).format("MMM DD YYYY")
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

  return (
    <Box>
      <span
        style={{
          display: "flex",
          position: "relative",
          justifyContent: "space-between",
        }}
      >
        <Box className={classes.Etitle}>
          <Typography variant="h2" gutterBottom>
            {details.title}
          </Typography>

          {details.extraData.eventType === "External" ? (
            <span className={classes.ext}>
              {" "}
              {getType(details.extraData.eventType, isRTL)}
            </span>
          ) : (
            <span className={classes.int}>
              {" "}
              {getType(details.extraData.eventType, isRTL)}
            </span>
          )}
          <Typography component="span" gutterBottom>
            <span className={classes.sands}>
              {activeFrom === false &&
              activeTo === false &&
              details?.liveBroadCastLink ? (
                <span>
                  <RiBroadcastLine className="enableIcon" />{" "}
                  <a href={details?.liveBroadCastLink}>
                    <span className="enable">{isRTL ? "مباشر" : "live"}</span>
                  </a>
                </span>
              ) : null}
            </span>
          </Typography>
        </Box>

        <Typography variant="h2" gutterBottom className={classes.calendar}>
          {disForm === true ? null : (
            <BiCalendarPlus onClick={() => handleAddtoGoogle()} />
          )}
        </Typography>
      </span>

      {/* <Typography component="span" gutterBottom>
        <ImLocation />
        {details.extraData.locationName}
      </Typography>
      <Typography component="span" gutterBottom>
        <BiTimeFive />
        {details.extraData.eventTime}
      </Typography> */}
      {details.description ? (
        <Typography
          component="p"
          gutterBottom
          className="description"
          dangerouslySetInnerHTML={{
            __html: `${details.description}`,
          }}
        ></Typography>
      ) : null}

      {details.fullText ? (
        <Typography
          component="p"
          gutterBottom
          className="description"
          dangerouslySetInnerHTML={{
            __html: `${details.fullText}`,
          }}
        ></Typography>
      ) : null}
      <Typography component="p" gutterBottom className={classes.locationName}>
        {activeFrom === true ? (
          <Typography
            component="p"
            gutterBottom
            className={classes.locationName}
          >
            <CgSandClock style={{ color: "#C4C4C4", fontSize: "22px" }} />{" "}
            {"after " + days + " Days"}
          </Typography>
        ) : activeFrom === false && activeTo === false ? (
          <Typography
            component="p"
            gutterBottom
            className={classes.locationName}
          >
            <CgSandClock style={{ color: "#C4C4C4", fontSize: "22px" }} />{" "}
            {isRTL ? "يحدث الان" : "Happening Now"}
          </Typography>
        ) : (
          <Typography
            component="p"
            gutterBottom
            className={classes.locationName}
          >
            <CgSandClock style={{ color: "#C4C4C4", fontSize: "22px" }} />{" "}
            {isRTL ? "منتهي" : "Finished"}
          </Typography>
        )}
      </Typography>
      <Typography component="p" gutterBottom className={classes.locationName}>
        <AiOutlineCalendar style={{ color: "#C4C4C4", fontSize: "22px" }} />
        {moment(details.activeFrom)
          .format("ll")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}{" "}
        ,
        {moment(details.activeTo)
          .format("ll")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
      </Typography>
      {details?.extraData?.eventStartTime && (
        <Typography component="p" gutterBottom className={classes.locationName}>
          <BiTimeFive style={{ color: "#C4C4C4", fontSize: "22px" }} />
          {moment(details?.extraData?.eventStartTime)
            .format("h:mm A")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
          -{" "}
          {moment(details?.extraData?.eventEndTime)
            .format("h:mm A")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
        </Typography>
      )}
      <a href={details.extraData.locationLink}>
        {" "}
        <Typography component="p" gutterBottom className={classes.locationName}>
          <ImLocation style={{ color: "#C4C4C4", fontSize: "22px" }} />

          {isRTL
            ? details?.extraData?.arLocationName
            : details?.extraData?.locationName}
        </Typography>
      </a>
      {(isRTL && details?.extraData.arOrganizers) ||
      (!isRTL && details?.extraData.organizers) ? (
        <Typography component="p" gutterBottom style={{ marginTop: "20px" }}>
          <h3 className={classes.locationName}>
            {" "}
            {t("EVENTDETAILS.ORGANIZER")}
          </h3>

          <Typography
            component="span"
            className={classes.block}
            dangerouslySetInnerHTML={{
              __html: `${
                isRTL
                  ? details?.extraData.arOrganizers
                  : details?.extraData.organizers
              }`,
            }}
          ></Typography>
        </Typography>
      ) : null}
      {(isRTL && details?.extraData.arPartners) ||
      (!isRTL && details?.extraData.partners) ? (
        <Typography component="p" gutterBottom style={{ marginTop: "20px" }}>
          <h3 className={classes.locationName}>{t("EVENTDETAILS.PARTNERS")}</h3>

          <Typography
            component="span"
            dangerouslySetInnerHTML={{
              __html: `${
                isRTL
                  ? details?.extraData.arPartners
                  : details?.extraData.partners
              }`,
            }}
          ></Typography>
        </Typography>
      ) : null}
      {details.surveyLink ? (
        <Button
          className={
            !details.surveyLink
              ? clsx(classes.disabledBtn, classes.button)
              : classes.button
          }
          onClick={() =>
            details.surveyLink
              ? (window.location.href = details.surveyLink)
              : window.location.origin
          }
        >
          <Typography variant="h3">
            <FaClipboardList />
            {t("EVENTDETAILS.SURVEY")}
          </Typography>
        </Button>
      ) : (
        <Button
          className={classes.disabledBtn}
          onClick={() =>
            details.surveyLink
              ? (window.location.href = details.surveyLink)
              : window.location.origin
          }
        >
          <Typography variant="h3">
            <FaClipboardList />
            {t("EVENTDETAILS.SURVEY")}
          </Typography>
        </Button>
      )}

      <Button
        className={
          !details.photoGalleryLink
            ? clsx(classes.disabledBtn, classes.button)
            : classes.button
        }
        onClick={() =>
          details.photoGalleryLink
            ? (window.location.href = details.photoGalleryLink)
            : window.location.origin
        }
      >
        <Typography variant="h3">
          <GrGallery />
          {t("EVENTDETAILS.PHOTO")}
        </Typography>
      </Button>

      <Button
        className={
          !details.videoGalleryLink
            ? clsx(classes.disabledBtn, classes.button)
            : classes.button
        }
        onClick={() =>
          details.videoGalleryLink
            ? (window.location.href = details.videoGalleryLink)
            : window.location.origin
        }
      >
        <Typography variant="h3">
          <FaPhotoVideo />
          {t("EVENTDETAILS.VIDEO")}
        </Typography>
      </Button>
      <Button
        className={
          !details.newsLink
            ? clsx(classes.disabledBtn, classes.button)
            : classes.button
        }
        onClick={() =>
          details.newsLink
            ? (window.location.href = details.newsLink)
            : window.location.origin
        }
      >
        <Typography variant="h3">
          <FiLink />
          {t("EVENTDETAILS.NEWS")}
        </Typography>
      </Button>
      <Button
        className={
          !details.broadCastLink
            ? clsx(classes.disabledBtn, classes.button)
            : classes.button
        }
        onClick={() =>
          details.broadCastLink
            ? (window.location.href = details.broadCastLink)
            : window.location.origin
        }
      >
        <Typography variant="h3">
          <VscBroadcast />
          {t("EVENTDETAILS.LINK")}
        </Typography>
      </Button>

      {files && files?.length
        ? files?.map((item) => (
            <Button
              className={classes.button}
              onClick={() =>
                dispatch(push(`/media/events/file/read/${item?.uuid}`))
              }
            >
              <Typography variant="h3">
                <VscFilePdf />
                {t("EVENTDETAILS.FILE")}
              </Typography>
            </Button>
          ))
        : null}
    </Box>
  );
}

export default memo(EDetails);
