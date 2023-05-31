import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { uid } from "react-uid";
import { Card, CardBody, Col } from "reactstrap";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useStyles from "../../../styles/components/carousels/investmentsCarousel";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import useIndicatorsStyles from "../../../styles/components/home/initiativeOpportunity/carouselIndicators";
import { getImage } from "../../shared/utils";
import NoData from "../../shared/noData/NoData";

function InitiativesCarousel() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { initiatives: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  useEffect(() => {
    const returnedData = posts;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [posts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: data.length < 3 ? data.length : 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: false,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1390,
        settings: {
          slidesToShow: data.length < 2 ? data.length : 2,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const card = useCallback(
    (item) => {
      const image = getImage(item.files, isRTL);

      return (
        <Col key={uid(item)} className="cardContainer">
          <Card>
            <Col
              className="cardImage"
              title={image.alt}
              style={{
                backgroundImage: `url(/api/file/download/${image.uuid}?size=small)`,
              }}
            ></Col>
            <CardBody>
              <h2>{item.title}</h2>

              <Col className="btnContainer">
                <Link to={`/aboutus/initiatives/${item.alias}`}>
                  <Button>{t("HOME.CAROUSEL.INITIATIVE.MOREBUTTON")}</Button>
                </Link>
              </Col>
            </CardBody>
          </Card>
        </Col>
      );
    },
    [isRTL]
  );

  const renderCards = useMemo(
    () => data.map((item) => card(item)),
    [data, card]
  );

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  const indicatorsClasses = useIndicatorsStyles();
  return (
    <div className={`${classes.root} ${indicatorsClasses.root}`}>
      {data && data?.length > 0 ? (
        <Slider {...settings}>{renderCards}</Slider>
      ) : (
        <NoData card={true} />
      )}
      <Box className={btnClasses.btnContainer}>
        <Link to="/aboutus/initiatives">
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.INVESTMENT.ALLBUTTON")}
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default memo(InitiativesCarousel);
