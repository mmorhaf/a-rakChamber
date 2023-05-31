import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCarousel from "../components/home/carousels/HomeCarousel";
import ContactUs from "../components/home/contactUs/ContactUs";
import Events from "../components/home/events/Events";
import Indicators from "../components/home/indicators/Indicators";
import Initiatives from "../components/home/initiativeOpportunity/Initiatives";
import MediaCenter from "../components/home/mediaCenter/MediaCenter";
import ServicesTabs from "../components/home/services/ServicesTabs";
import actions from "../redux/actions";
import useStyles from "../styles/components/home/home";
import axios from "axios";

const { allPostsReturned, loadingAction } = actions;

function Home() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    dispatch(allPostsReturned({ data: false }));
  }, [isRTL]);

  useEffect(() => {
    if (reducers?.posts_reducers?.allPostsReturned?.sliders?.success)
      dispatch(loadingAction({ loading: false }));
  }, [reducers]);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      const response = await axios.get(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption&access_token=2222`
      );
      console.log(response.data.data, "response.data.data");
    };

    fetchInstagramPosts();
  }, []);

  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <>
        <Grid item xs={12} className="homeCarousselContainer">
          <HomeCarousel />
        </Grid>
        <Grid className={classes.services}>
          <Container maxWidth="lg">
            <ServicesTabs />
          </Container>
        </Grid>

        <Grid item xs={12} className={classes.bgColor}>
          <Initiatives />
        </Grid>
        <Grid item xs={12} className={classes.bgColor}>
          <MediaCenter />
        </Grid>

        <Grid item xs={12} id="introEvents" className={classes.bgColor}>
          <Events />
        </Grid>
        <Grid item xs={12} className={classes.bgColor}>
          <ContactUs />
        </Grid>
        <Grid item xs={12} className={classes.bgColor}>
          <Indicators />
        </Grid>
      </>
    </Grid>
  );
}
export default memo(Home);
