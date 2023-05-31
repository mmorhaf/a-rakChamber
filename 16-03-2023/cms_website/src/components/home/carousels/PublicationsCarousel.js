import React, {
  memo,
  useState,
  Fragment,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { uid } from "react-uid";
import useStyles from "../../../styles/components/carousels/publicationsCarousel";
import useIndicatorsStyles from "../../../styles/components/home/initiativeOpportunity/carouselIndicators";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import { useTranslation } from "react-i18next";
//import PublicationCard from "../../shared/cards/PublicationCard";
import PublicationCard from "../../mediaCenter/publications/PublicationCard";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import NoData from "../../shared/noData/NoData";

function PublicationsCarousel() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { posts = [] } = useSelector(
    (state) => state.posts_reducers.topPubliReturned
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = posts;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [posts]);

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
    infinite: true,
    speed: 1000,
    autoplaySpeed: 5000,
    slidesToShow: data.length < 3 ? data.length : 3,
    slidesToScroll: 1,
    autoplay: false,
    initialSlide: 0,
    nextArrow: <SlickArrowRight />,
    prevArrow: <SlickArrowLeft />,
    responsive: [
      {
        breakpoint: 1110,
        settings: {
          slidesToShow: data.length < 2 ? data.length : 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: data.length < 2 ? data.length : 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  const renderCard = useCallback((item) => {
    return <PublicationCard key={uid(item)} item={item} />;
  }, []);

  const renderSlider = useMemo(
    () => data.map((item) => renderCard(item)),
    [data, renderCard]
  );

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  const indicatorsClasses = useIndicatorsStyles();
  return (
    <Fragment>
      {data && data?.length > 0 ? (
        <Slider
          {...settings}
          className={`${classes.root} ${indicatorsClasses.root}`}
        >
          {renderSlider}
        </Slider>
      ) : (
        <NoData card={true} />
      )}
      <Link to="/media/publications">
        <Box className={btnClasses.btnContainer}>
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.PUBLICATION.ALLBUTTON")}
          </Button>
        </Box>
      </Link>
    </Fragment>
  );
}

export default memo(PublicationsCarousel);
