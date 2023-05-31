import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import LinkIcon from "@material-ui/icons/Link";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { uid } from "react-uid";
import NoData from "../../shared/noData/NoData";

function LinksSlider() {
  const [data, setData] = useState([]);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { menuReturned } = useSelector((state) => state.menu);

  const getLinks = useCallback((items) => {
    const total = [];
    let oneSlide = [];

    items?.map((item) => {
      if (oneSlide.length < 7) {
        oneSlide.push(item);
      } else {
        total.push(oneSlide);
        oneSlide = [];
        oneSlide.push(item);
      }
      return null;
    });

    if (oneSlide.length > 0) total.push(oneSlide);

    setData(total);
  }, []);

  useEffect(() => {
    const returnedData = menuReturned;

    if (!returnedData.length) return;
    let data = returnedData.find((item) => item.title.en === "links");
    getLinks(data?.childrens);
  }, [menuReturned, getLinks]);

  const settings = {
    dots: true,
    infinite: true,
    pauseOnHover: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const slides = useMemo(
    () =>
      data.map((item) => {
        return (
          <List key={uid(item)}>
            {item.map((link) => {
              let url = link.link;
              if (!url) url = "#";

              const isExternal = url.startsWith("http");

              return isExternal ? (
                <a href={url}>
                  <ListItem key={uid(link)}>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={isRTL ? link.title.ar : link.title.en}
                    />
                  </ListItem>
                </a>
              ) : (
                <Link to={url}>
                  <ListItem key={uid(link)}>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={isRTL ? link.title.ar : link.title.en}
                    />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        );
      }),
    [data, isRTL]
  );

  return (
    <Box>
      {data && data?.length > 0 ? (
        <Slider {...settings}>{slides}</Slider>
      ) : (
        <NoData morePaddingTop={true} />
      )}
    </Box>
  );
}

export default memo(LinksSlider);
