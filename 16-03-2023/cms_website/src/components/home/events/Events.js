import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/common/sectionHeader";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import EventsTabs from "./EventsTabs";

const { getAllPosts, getTodayEvents } = actions;

function Events() {
  const { t } = useTranslation();
  const classes = useStyles();
  const btnClasses = useBtnStyles();
  const dispatch = useDispatch();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const language = isRTL ? "ar" : "en";

  useEffect(() => {
    dispatch(getAllPosts({ sort: "events", order: "DESC", language }));
    dispatch(
      getAllPosts({ sort: "eventsOnThisDay", isFeatured: false, language })
    );
    dispatch(getTodayEvents({ language }));
  }, [isRTL]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className="title">
        <Container maxWidth="lg" style={{ minHeight: "unset" }}>
          <Typography variant="h1" gutterBottom>
            {t("HOME.EVENTS.HEADER")}
          </Typography>
        </Container>
      </Grid>

      <Grid item xs={12} className={classes.eventContentContainer}>
        <EventsTabs />
      </Grid>
      <Grid item xs={12} className="title">
        <Container maxWidth="lg" style={{ minHeight: "unset" }}>
          <Box className={btnClasses.btnContainer}>
            <Link to="/media/events">
              <Button variant="contained" className={btnClasses.viewAllBtn}>
                {t("HOME.CAROUSEL.INITIATIVE.ALLBUTTON")}
              </Button>
            </Link>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default memo(Events);
