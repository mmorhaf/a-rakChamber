import React, { memo, useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { uid } from "react-uid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/carousels/homeCarousel";
import { getImage } from "../../shared/utils";

function HomeCarousel() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { sliders: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = posts;
    if (!returnedData.length) return;

    setData(returnedData);
  }, [posts]);

  const settings = {
    dots: true,
    lazyLoad: true,
    fade: true,
    infinite: true,
    pauseOnHover: false,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const getLink = (extraData) => {
    const link = isRTL ? extraData.arLinkUrl : extraData.enLinkUrl;
    return link ? link : "/home";
  };

  const slides = useMemo(
    () =>
      data.map((item) => {
        const image = getImage(item.files, isRTL);

        const link = getLink(item.extraData);

        const isExternalLink = link.startsWith("http");

        return (
          <Box key={uid(item)} className="cardContainer">
            <Card
              style={{
                backgroundImage: `url(/api/file/download/${image.uuid}?size=large)`,
              }}
            >
              {item.caption ? (
                <CardContent>
                  {!isExternalLink ? (
                    <Link to={link}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.caption}
                      </Typography>
                    </Link>
                  ) : (
                    <a href={link} target="_blank" rel="noreferrer">
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.caption}
                      </Typography>
                    </a>
                  )}
                </CardContent>
              ) : null}
            </Card>
          </Box>
        );
      }),
    [data, isRTL]
  );

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Slider {...settings}>{data.length ? slides : null}</Slider>
    </Box>
  );
}

export default memo(HomeCarousel);
