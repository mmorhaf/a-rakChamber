import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import * as moment from "moment";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { uid } from "react-uid";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useStyles from "../../../styles/components/carousels/onThisDay";
import { getImage } from "../../shared/utils";
import "moment/locale/ar-sa";
import "moment/locale/en-au";

function OnThisDay() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { eventsOnThisDay: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!posts.length) return;
    setData(posts.slice(posts.slice(0, 3)));
  }, [posts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: data.length < 3 ? data.length : 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 880,
        settings: {
          slidesToShow: data.length < 2 ? data.length : 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const classes = useStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const card = useCallback(
    (item) => {
      const image = getImage(item.files, isRTL);

      return (
        <Box key={uid(item)} className="cardContainer">
          <Card
            style={{
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            <CardMedia
              image={`/api/file/download/${image.uuid}?size=small`}
              title={image.alt}
            />

            <Box className="contentContainer">
              <Box className="date">
                <Box className="month">
                  {moment(item.privateDate).format("MMM")}
                </Box>
                <Box className="day">
                  {moment(item.privateDate)
                    .format("DD")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </Box>
              </Box>
              <Box className="details">
                <CardHeader title={item.title} />
                <CardContent>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${item.description}`,
                    }}
                  ></span>
                </CardContent>
              </Box>
            </Box>
          </Card>
        </Box>
      );
    },
    [isRTL]
  );

  const renderCards = useMemo(
    () => data.map((item) => card(item)),
    [data, card]
  );

  return (
    <div className={classes.root}>
      {data && data?.length > 0 ? (
        <Slider {...settings}>{renderCards}</Slider>
      ) : (
        <Box className={classes.whiteBox}>
          {isRTL ? "لا يوجد فعاليات" : "No Events"}
        </Box>
      )}
      {/* <Box className={btnClasses.btnContainer}>
        <Link to="/media/events">
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.INITIATIVE.ALLBUTTON")}
          </Button>
        </Link>
      </Box> */}
    </div>
  );
}

export default memo(OnThisDay);
