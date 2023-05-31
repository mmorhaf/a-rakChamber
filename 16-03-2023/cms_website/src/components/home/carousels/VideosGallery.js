import React, {
  memo,
  useState,
  Fragment,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardMedia,
  Box,
  Tooltip,
} from "@material-ui/core";
import { uid } from "react-uid";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../../styles/components/carousels/photosCarousel";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import { useTranslation } from "react-i18next";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import { BsFullscreen } from "react-icons/bs";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import NoData from "../../shared/noData/NoData";

// toolTip
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.primary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

function VideosCarousel() {
  const { t } = useTranslation();

  const { allLinksReturned } = useSelector((state) => state.links);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = allLinksReturned;
    if (!returnedData.length) return;
    setData(returnedData);
  }, [allLinksReturned]);

  const card = useCallback((video) => {
    const videoLink = video.link.split("&")[0];
    moment.locale(isRTL ? "ar-sa" : "en-au");

    return (
      <Box key={uid(video)} className="cardContainer">
        <Card className="card">
          {/* <Box className="videoContainer"> */}
          <CardMedia
            component="iframe"
            title={video.alt}
            image={videoLink}
            allowFullScreen={true}
            frameBorder="0"
          />

          <CardContent>
            <Box className="info">
              <Box component="span" className="date">
                <IoCalendarOutline />
                {moment(video.startDate)
                  .format("DD MMM YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </Box>
              <Box className="controls">
                <BootstrapTooltip title={t("HOME.CAROUSEL.VIDEOS.WATCHBTN")}>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noreferrer"
                    className="moreBtn"
                  >
                    <BsFullscreen />
                  </a>
                </BootstrapTooltip>
              </Box>
            </Box>
            <Link to={`/media/videos-gallery/${video.categoryAlias}`}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className="title"
              >
                {video.title}
              </Typography>
            </Link>
          </CardContent>
        </Card>
      </Box>
    );
  }, []);

  const renderSlider = useMemo(
    () => data.map((video) => card(video)),
    [data, card]
  );

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  return (
    <Fragment>
      {data.length > 0 ? (
        <OwlCarousel
          nav={true}
          loop={true}
          dots={true}
          autoplay={true}
          margin={16}
          className={`owl-theme ${classes.root}`}
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
            },
            700: {
              items: data.length < 2 ? data.length : 2,
              center: false,
            },
            1000: {
              items: data.length < 3 ? data.length : 3,
            },
          }}
        >
          {renderSlider}
        </OwlCarousel>
      ) : (
        <NoData card={true} />
      )}
      <Box className={btnClasses.btnContainer}>
        <Link to="/media/videos-gallery">
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.VIDEOS.ALLBUTTON")}
          </Button>
        </Link>
      </Box>
    </Fragment>
  );
}

export default memo(VideosCarousel);
