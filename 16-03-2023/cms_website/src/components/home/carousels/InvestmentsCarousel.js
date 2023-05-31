import React, { memo, useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardText, CardBody, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Slider from "react-slick";
import clsx from "clsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useStyles from "../../../styles/components/carousels/initiativesCarousel";
import useIndicatorsStyles from "../../../styles/components/home/initiativeOpportunity/carouselIndicators";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import { uid } from "react-uid";
import { useTranslation } from "react-i18next";
import { getImage } from "../../shared/utils";
import { AiOutlineEye } from "react-icons/ai";
import moment from "moment";
import actions from "../../../redux/actions";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import NoData from "../../shared/noData/NoData";

const { getPostViewers } = actions;

function InvestmentsCarousel() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { investmentOpportunities: { posts = [] } = {}, advertisments = {} } =
    useSelector((state) => state.posts_reducers.allPostsReturned);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [ad, setAd] = useState([]);

  useEffect(() => {
    const ads = advertisments.posts;

    if (!ads) return;
    if (!ads.length) return;

    setAd(ads);
  }, [advertisments]);

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

  const handleClick = useCallback((id) => {
    dispatch(getPostViewers({ id }));
  }, []);
  moment.locale(isRTL ? "ar-sa" : "en-au");
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
              <div className="cont">
                <div className="upperSec">
                  <div className="date">
                    {moment(item.startDate)
                      .format("DD MMM YYYY")
                      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                  </div>
                  <div className="visitors">
                    {item.viewCount}

                    <AiOutlineEye />
                  </div>
                </div>
                <Link to={`/aboutus/InvestmentOpportunity/${item.alias}`}>
                  <CardText>{item.title}</CardText>
                </Link>
              </div>
              <Col className="btnContainer">
                <Link to={`/aboutus/InvestmentOpportunity/${item.alias}`}>
                  <Button onClick={() => handleClick(item.id)}>
                    {t("HOME.CAROUSEL.INITIATIVE.MOREBUTTON")}
                  </Button>
                </Link>
              </Col>
            </CardBody>
          </Card>
        </Col>
      );
    },
    [isRTL, handleClick]
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
      <Box className={clsx(btnClasses.btnContainer, btnClasses.marginTop80)}>
        <Link to="/aboutus/InvestmentOpportunity">
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.INITIATIVE.ALLBUTTON")}
          </Button>
        </Link>
      </Box>
    </div>
  );
}

export default memo(InvestmentsCarousel);
