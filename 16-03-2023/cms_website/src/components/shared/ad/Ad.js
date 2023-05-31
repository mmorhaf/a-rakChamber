import { Box, Grid, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { uid } from "react-uid";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { getImage } from "../../../components/shared/utils";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/shared/ad/Ad";
import FilesTable from "./FilesTable";
const { getBlockData } = actions;

function Ad() {
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const [timeLine, setTimeLine] = useState(5);
  const { objects = [] } = useSelector(
    (state) => state.blocks.returnedBlockData
  );
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  let currentUrl = window.location.href?.split("/");
  currentUrl = currentUrl?.filter((item, index) => index < 3);
  currentUrl = currentUrl?.join("/");

  useEffect(() => {
    const language = isRTL ? "ar" : "en";
    const url = window.location.href;

    dispatch(getBlockData({ language, url }));
  }, [isRTL]);

  useEffect(() => {
    if (!objects.length) return;

    setData(objects);
  }, [objects]);

  useEffect(() => {
    if (state?.rate?.askingForRatingReturned?.files?.length)
      setFiles(state.rate.askingForRatingReturned.files);
  }, [state]);
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
    autoplaySpeed: timeLine * 1000,
    beforeChange: (current, next) =>
      setTimeLine(
        data[current]?.extraData?.dispalyTime
          ? data[current]?.extraData?.dispalyTime
          : 5
      ),
  };

  const handleClick = (e, link) => {
    const isExternalLink = link.startsWith("http");

    if (isExternalLink) window.open(link);
    else window.location.href = link;
  };

  const getLink = (extraData) => {
    return isRTL ? extraData.adArLink : extraData.adLink;
  };

  const classes = useStyles(isRTL);

  const renderAdvertisment = (item) => {
    const image = getImage(item.files, isRTL);
    const link = getLink(item.extraData);
    let adsUrl = link?.split("/");
    let adsUrlSecondSection = adsUrl?.filter((item, index) => index > 2);
    let adsUrlfirstSection = adsUrl?.filter((item, index) => index < 3);
    adsUrlfirstSection = adsUrlfirstSection?.join("/");
    adsUrlSecondSection = adsUrlSecondSection?.join("/");
    return (
      <Box className={classes.adContainer}>
        <Grid container>
          <Grid item sm={8} xs={12} className={classes.contentContainer}>
            <Box className={classes.headerContainer}>
              <Typography variant="h4" className={classes.header}>
                {item.title}
              </Typography>
            </Box>
            {item?.description ? (
              <Typography
                component="p"
                className={classes.summary}
                dangerouslySetInnerHTML={{
                  __html: `${item?.description}`,
                }}
              ></Typography>
            ) : (
              <div className={classes.height50} />
            )}
            {adsUrlfirstSection === currentUrl ? (
              <Button
                className={classes.button}
                variant="outlined"
                onClick={(e) =>
                  (window.location.href = "/" + adsUrlSecondSection)
                }
              >
                {t("SIDEBAR.AD.BUTTON")}
              </Button>
            ) : link.startsWith("http") ? (
              <a
                className={classes.link}
                href={
                  isRTL ? item?.extraData?.adArLink : item?.extraData?.adLink
                }
              >
                {" "}
                {t("SIDEBAR.AD.BUTTON")}
              </a>
            ) : (
              <Button
                className={classes.button}
                variant="outlined"
                onClick={(e) => handleClick(e, link)}
              >
                {t("SIDEBAR.AD.BUTTON")}
              </Button>
            )}
          </Grid>
          <Grid item sm={4} xs={12} className={classes.hiddenOverflow}>
            <Grid container className={classes.image}>
              <img
                src={`/api/file/download/${image.uuid}?size=medium`}
                alt={image.alt}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const slides = data.map((item) => {
    return (
      <Box key={uid(item)} className="cardContainer">
        {renderAdvertisment(item)}
      </Box>
    );
  });
  return (
    <Container maxWidth="lg">
      <Box className={classes.root}>
        {files.length ? <FilesTable files={files} setFiles={setFiles} /> : null}
        {data.length ? <Slider {...settings}>{slides}</Slider> : null}
      </Box>
    </Container>
  );
}

export default memo(Ad);
