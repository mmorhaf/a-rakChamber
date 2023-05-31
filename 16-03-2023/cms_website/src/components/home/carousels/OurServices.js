import React, { memo, useMemo, useState } from "react";
import { Card, CardText, CardBody, Button, Col } from "reactstrap";
import Box from "@material-ui/core/Box";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useStyles from "../../../styles/components/carousels/initiativesCarousel";
import useIndicatorsStyles from "../../../styles/components/home/initiativeOpportunity/carouselIndicators";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import { uid } from "react-uid";
import { useTranslation } from "react-i18next";

const items = [
  {
    id: 1,
    img: "/assets/images/7.png",
    content: "RAK SME",
  },
  {
    id: 2,
    img: "/assets/images/6.jpg",
    content: "RAK Reconciliation Arbitration Center",
  },
  {
    id: 3,
    img: "/assets/images/5.png",
    content: "RAK Exhibition Center",
  },

  {
    id: 4,
    img: "/assets/images/7.png",
    content: "RAK SME",
  },
  {
    id: 5,
    img: "/assets/images/6.jpg",
    content: "RAK Reconciliation Arbitration Center",
  },
];

function InitiativesCarousel() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [data, setData] = useState(items);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" + (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    >
      <ArrowBackIosIcon />
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
    >
      <ArrowForwardIosIcon />
    </button>
  );
  const settings = {
    dots: true,
    rtl: isRTL,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const card = (item) => {
    return (
      <Col key={uid(item)} className="cardContainer">
        <Card>
          <Col
            className="cardImage"
            style={{
              backgroundImage: `url(${item.img})`,
            }}
          ></Col>
          <CardBody>
            <CardText>{item.content}</CardText>
            <Col>
              <Button>{t("HOME.SERVICES.SERVICES.CARDBUTTON")}</Button>
            </Col>
          </CardBody>
        </Card>
      </Col>
    );
  };

  const renderCards = useMemo(() => data.map((item) => card(item)), [data]);

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  const indicatorsClasses = useIndicatorsStyles();
  return (
    <div className={`${classes.root} ${indicatorsClasses.root}`}>
      <Slider {...settings}>{renderCards}</Slider>
      <Box className={btnClasses.btnContainer}>
        <Button variant="contained" className={btnClasses.viewAllBtn}>
          {t("HOME.SERVICES.SERVICES.ALLBUTTON")}
        </Button>
      </Box>
    </div>
  );
}

export default memo(InitiativesCarousel);
