import React, { memo, useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@material-ui/core";
import { uid } from "react-uid";

function NotificationSlider() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { notifications: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = posts;
    if (!returnedData.length) return;
    setData(returnedData);
  }, [posts]);

  const getLink = useCallback(
    (links) => {
      let link = "";
      if (links.length)
        link = links.find((link) =>
          isRTL ? link?.publishMode === 1 : link?.publishMode === 2
        );
      let subLink;
      subLink = link ? link.link : "";
      return subLink;
    },
    [isRTL]
  );

  const renderCards = useMemo(
    () =>
      data.map((item) => {
        const link = item?.extraData?.notificationLinkUrl
          ? item?.extraData?.notificationLinkUrl
          : getLink(item.links);

        const isExternalLink = link.startsWith("http");
        return (
          <Box key={uid(item)} className="slideContainer">
            <Box className="actualContent">
              {!isExternalLink ? (
                <Link to={link}>
                  <Box component="span" className="contentContainer">
                    {isRTL ? item.title.ar : item.title.en}
                  </Box>
                </Link>
              ) : (
                <a href={link} target="_blank" rel="noreferrer">
                  <Box component="span" className="contentContainer">
                    {isRTL ? item.title.ar : item.title.en}
                  </Box>
                </a>
              )}
            </Box>
          </Box>
        );
      }),
    [data, getLink, isRTL]
  );

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: data.length > 1 ? true : false,
    verticalSwiping: data.length > 1 ? true : false,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
  };
  return <Slider {...settings}>{data.length ? renderCards : null}</Slider>;
}

export default memo(NotificationSlider);
