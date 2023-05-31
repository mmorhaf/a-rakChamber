import React, { useState, memo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { uid } from "react-uid";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 1,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
}));

function VideosCarousel(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [stop, setStop] = useState(false);
  const maxSteps = props.items.length;
  let items = props.items;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    if (stop) return;
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        onMouseEnter={() => setStop(true)}
        onMouseLeave={() => setStop(false)}
      >
        {items.map((step, index) => (
          <div key={uid(step)}>
            {Math.abs(activeStep - index) <= 2 ? (
              <iframe
                width="100%"
                height="500px"
                src={step}
                title="YouTube video player"
                frameborder="0"
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                style={{
                  borderRadius: 10,
                  padding: 10,
                }}
                loading="lazy"
              ></iframe>
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
    </div>
  );
}

export default memo(VideosCarousel);
