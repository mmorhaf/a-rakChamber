import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { lazy, memo, Suspense, useEffect } from "react";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/contactUs/contactUs";
import Links from "./Links";
import { useDispatch, useSelector } from "react-redux";

const { getAllPosts, getAllSurveys } = actions;

const ContatctUsTabs = lazy(() => import("./ContatctUsTabs"));
const ParticipationTabs = lazy(() => import("./ParticipationTabs"));

function ContactUs() {
  const classses = useStyles();
  const dispatch = useDispatch();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const language = isRTL ? "ar" : "en";

  useEffect(() => {
    dispatch(getAllSurveys({ sort: "poll", language }));
    dispatch(getAllPosts({ sort: "opinions", limit: 1, offset: 0, language }));
  }, [isRTL]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} className={classses.root} id="introContactUs">
        <Suspense fallback={<div className="loading..." />}>
          <Grid item xs={12} md={4} className="halfWidth">
            <ContatctUsTabs />
          </Grid>
          <Grid item xs={12} md={4} className="halfWidth">
            <ParticipationTabs />
          </Grid>
          <Grid item xs={12} md={4} className="links">
            <Links />
          </Grid>
        </Suspense>
      </Grid>
    </Container>
  );
}

export default memo(ContactUs);
