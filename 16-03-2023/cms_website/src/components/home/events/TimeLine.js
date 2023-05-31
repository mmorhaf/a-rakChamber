import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Timeline from "@material-ui/lab/Timeline";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import { push } from "connected-react-router";
import * as moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import React, { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { uid } from "react-uid";
import store from "../../../redux/store";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import useStyles from "../../../styles/components/home/events/timeLine";

function TimeLine() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { events: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const ref = useRef(null);
  const [disableLeftBtn, setDisableLeftBtn] = useState(true);
  const [disableRightBtn, setDisableRightBtn] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = posts;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [posts]);

  useEffect(() => {
    if (data && data?.length > 0) {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      let thisMonthEvent = data?.findIndex(
        (item) =>
          new Date(item?.activeFrom).getFullYear() === currentYear &&
          new Date(item?.activeFrom)?.getMonth() === currentMonth
      );
      if (thisMonthEvent > -1) ref.current.scrollLeft += thisMonthEvent * 150;
    }
  }, [data]);

  const handleScroll = () => {
    const ul = ref.current;

    const lastEvent = ul.lastElementChild;
    const parentWidth = lastEvent.offsetParent.offsetWidth;
    const parentLeft = ul.getBoundingClientRect().left;
    const childRight = lastEvent.getBoundingClientRect().right;

    if (parentLeft + parentWidth > childRight) {
      setDisableRightBtn(true);
    } else if (disableRightBtn) setDisableRightBtn(false);
  };

  const handleClick = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;

    if (ref.current.scrollLeft + scrollOffset <= 0) {
      if (disableLeftBtn) return;
      else setDisableLeftBtn(true);
    } else {
      if (!disableLeftBtn) return;
      else {
        setDisableLeftBtn(false);
      }
    }
  };
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const classes = useStyles();
  const btnClasses = useBtnStyles();

  const renderEvent = (item, left) => {
    const { eventType } = item.extraData;
    const getType = (type, isRTL) => {
      let returnedType = isRTL ? "خارجي" : "External";
      if (type === "Internal") returnedType = isRTL ? "داخلي" : "Internal";
      return returnedType;
    };
    return (
      <TimelineItem
        key={uid(item)}
        style={{ left }}
        onClick={(e) => store.dispatch(push(`/media/events/${item.alias}`))}
      >
        <TimelineOppositeContent></TimelineOppositeContent>
        <TimelineSeparator>
          <Box></Box>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Box></Box>
          <Paper elevation={3} className={classes.paper}>
            <Box className={`type ${eventType}`}>
              {getType(eventType, isRTL)}
            </Box>
            <Typography variant="h4" component="h2">
              {moment(item?.activeFrom, "YYYY-MM-DD")
                .format("DD MMM, YYYY")
                .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
            </Typography>
            <Typography>{item.title}</Typography>
          </Paper>
        </TimelineContent>
      </TimelineItem>
    );
  };

  const renderTimeLine = (items) => {
    const renderTimeLineItems = (items) => {
      return items.map((item, index) => {
        const left = index * (isRTL ? 0 : -50);

        return renderEvent(item, left);
      });
    };

    return (
      <Timeline
        align="alternate"
        ref={ref}
        className="eventsList"
        onScroll={handleScroll}
      >
        <TimelineItem>
          <TimelineOppositeContent className="top"></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineOppositeContent className="bottom"></TimelineOppositeContent>
        </TimelineItem>
        {renderTimeLineItems(data)}
      </Timeline>
    );
  };

  return (
    <Box className={classes.root}>
      {data && data?.length > 0 ? (
        <IconButton
          // disabled={disableLeftBtn}
          className="left"
          onClick={() => handleClick(-150)}
        >
          {isRTL ? <ChevronRightIcon /> : <KeyboardArrowLeftIcon />}
        </IconButton>
      ) : null}
      {data && data?.length > 0 ? (
        renderTimeLine(data)
      ) : (
        <Box className={classes.whiteBox}>
          {isRTL ? "لا يوجد فعاليات" : "No Events"}
        </Box>
      )}
      {data && data?.length > 0 ? (
        <IconButton
          // disabled={disableRightBtn}
          className="right"
          onClick={() => handleClick(150)}
        >
          {isRTL ? <KeyboardArrowLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      ) : null}
    </Box>
  );
}

export default memo(TimeLine);
