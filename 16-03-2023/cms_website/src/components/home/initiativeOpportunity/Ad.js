import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { uid } from "react-uid";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useStyles from "../../../styles/components/home/ad/ad";
import { getImage } from "../../shared/utils";

function Ad() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { advertisments: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const [data, setData] = useState([]);
  let currentUrl = window.location.href?.split("/");
  currentUrl = currentUrl?.filter((item, index) => index < 3);
  currentUrl = currentUrl?.join("/");

  useEffect(() => {
    const returnedData = posts;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [posts]);

  const card = useCallback(
    (item, url, isExternal) => {
      const image = getImage(item.files, isRTL);
      let adsUrl = url?.split("/");
      let adsUrlSecondSection = adsUrl?.filter((item, index) => index > 2);
      let adsUrlfirstSection = adsUrl?.filter((item, index) => index < 3);
      adsUrlfirstSection = adsUrlfirstSection?.join("/");
      adsUrlSecondSection = adsUrlSecondSection?.join("/");
      return (
        <Card className="card">
          <CardContent>
            <Box className="ad">
              <Box component="span">Ad</Box>
            </Box>
            {adsUrlfirstSection === currentUrl ? (
              <Link to={"/" + adsUrlSecondSection}>
                <Typography variant="h2" component="h2">
                  {item.title}
                </Typography>
              </Link>
            ) : isExternal ? (
              url !== "#" ? (
                <a href={url}>
                  <Typography variant="h2" component="h2">
                    {item.title}
                  </Typography>
                </a>
              ) : (
                <Typography variant="h2" component="h2">
                  {item.title}
                </Typography>
              )
            ) : url !== "#" ? (
              <Link to={url}>
                <Typography variant="h2" component="h2">
                  {item.title}
                </Typography>
              </Link>
            ) : (
              <Typography variant="h2" component="h2">
                {item.title}
              </Typography>
            )}

            {item.description ? (
              <Typography
                variant="body2"
                component="p"
                dangerouslySetInnerHTML={{
                  __html: `${item.description}`,
                }}
              ></Typography>
            ) : (
              <Typography variant="body2" component="p"></Typography>
            )}
          </CardContent>
          <CardMedia
            image={`/api/file/download/${image.uuid}?size=medium`}
            title={image.alt}
          />
          {url !== "#" ? (
            <CardActions>
              {adsUrlfirstSection === currentUrl ? (
                <Link to={"/" + adsUrlSecondSection}>
                  <Button variant="outlined">
                    {isRTL ? "اضغط هنا" : "click here"}
                  </Button>
                </Link>
              ) : isExternal ? (
                <a href={url}>
                  <Button variant="outlined">
                    {isRTL ? "اضغط هنا" : "click here"}
                  </Button>
                </a>
              ) : (
                <Link to={url}>
                  <Button variant="outlined">
                    {isRTL ? "اضغط هنا" : "click here"}
                  </Button>
                </Link>
              )}
            </CardActions>
          ) : null}
        </Card>
      );
    },
    [isRTL]
  );

  const imageCard = useCallback(
    (item, url, isExternal) => {
      const image = getImage(item.files, isRTL);
      let adsUrl = url?.split("/");
      let adsUrlSecondSection = adsUrl?.filter((item, index) => index > 2);
      let adsUrlfirstSection = adsUrl?.filter((item, index) => index < 3);
      adsUrlfirstSection = adsUrlfirstSection?.join("/");
      adsUrlSecondSection = adsUrlSecondSection?.join("/");
      return (
        <Card className="cardImge">
          {adsUrlfirstSection === currentUrl ? (
            <Link to={"/" + adsUrlSecondSection}>
              <CardMedia
                image={`/api/file/download/${image.uuid}?size=medium`}
                title={image.alt}
              />
            </Link>
          ) : isExternal ? (
            url !== "#" ? (
              <a href={url}>
                <CardMedia
                  image={`/api/file/download/${image.uuid}?size=medium`}
                  title={image.alt}
                />
              </a>
            ) : (
              <CardMedia
                image={`/api/file/download/${image.uuid}?size=medium`}
                title={image.alt}
              />
            )
          ) : url !== "#" ? (
            <Link to={url}>
              <CardMedia
                image={`/api/file/download/${image.uuid}?size=medium`}
                title={image.alt}
              />
            </Link>
          ) : (
            <CardMedia
              image={`/api/file/download/${image.uuid}?size=medium`}
              title={image.alt}
            />
          )}
        </Card>
      );
    },
    [isRTL]
  );

  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    pauseOnHover: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const slides = data.map((item) => {
    const extraData = item.extraData;

    const { adType, adArLink, adLink } = extraData;
    let url = isRTL ? adArLink : adLink;
    if (!url) url = "#";

    const isExternal = url.startsWith("http");

    return (
      <Box key={uid(item)} className="cardContainer">
        {adType === "ImageWithText"
          ? card(item, url, isExternal)
          : imageCard(item, url, isExternal)}
      </Box>
    );
  });

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Slider {...settings}>{data.length ? slides : null}</Slider>
    </Box>
  );
}

export default memo(Ad);
