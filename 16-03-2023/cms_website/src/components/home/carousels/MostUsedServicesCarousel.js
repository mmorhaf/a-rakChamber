import { Button, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiCertification, BiMapPin } from "react-icons/bi";
import { BsBuilding, BsFileCheck } from "react-icons/bs";
import { FaQuestion, FaUserShield } from "react-icons/fa";
import { FiCopy, FiEdit } from "react-icons/fi";
import { GiSwapBag } from "react-icons/gi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import {
  IoChatbubbleEllipsesOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";
import { RiScalesLine } from "react-icons/ri";
import OwlCarousel from "react-owl-carousel";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/carousels/mostUsedServicesCarousel";

const items = [
  {
    id: 2,
    serviceId: 54,
    heading: `Issuing Certificate of Origin`,
    heading_ar: `إصدار شهادة منشأ للشركات`,
    link: "/business-services/new-coo/companies",
    roles: [1],
    icon: <BiCertification />,
  },
  {
    id: 3,
    serviceId: 60,
    heading: `Additional Request (copies and seals)`,
    heading_ar: `اصدار نسخ اضافية من شهادات المنشأ`,
    link: "/business-services/additional-request",
    roles: [1],
    icon: <FiCopy />,
  },
  {
    id: 59,
    serviceId: 61,
    heading: `Other`,
    heading_ar: `طلبات إضافية`,
    link: "/business-services/other-request",
    roles: [1],
    icon: <FiCopy />,
  },
  {
    id: 4,
    serviceId: 58,
    heading: `Amendment Issued COO Request`,
    heading_ar: `طلب تعديل شهادة المنشأ`,
    link: "/business-services/amendment-coo-request",
    roles: [1],
    icon: <FiEdit />,
  },
  {
    id: 5,
    heading: `Ratification Request`,
    heading_ar: `طلب التصديق`,
    serviceId: 63,
    link: "/business-services/ratification-request",
    roles: [1, 2],
    icon: <HiOutlineBadgeCheck />,
  },
  {
    id: 6,
    heading: `Verification The Issuance of The Certificate of Origin`,
    heading_ar: `التحقق من صحة إصدار شهادة منشأ`,
    link: "/business-services/coo-verify",
    serviceId: 57,
    public: true,
    icon: <IoShieldCheckmarkOutline />,
  },
  {
    id: 7,
    link: "/business-services/ratification-verify",
    heading: `Ratification Verification`,
    heading_ar: `التحقق من صحة التصديق`,
    serviceId: 947,
    public: true,
    icon: <BsFileCheck />,
  },
  {
    id: 8,
    link: "/business-services/membership-verify",
    heading: `Verification of The Membership Certificate`,
    heading_ar: `التحقق من صحة شهادة العضوية`,
    serviceId: 68,
    public: true,
    icon: <FaUserShield />,
  },
  {
    link: "/business-services/membership-fees",
    id: 9,
    serviceId: 72,
    heading: `Inquiring About New Membership Fees`,
    heading_ar: `الاستعلام عن رسوم العضوية الجديدة`,
    public: true,
    icon: <GiSwapBag />,
  },

  {
    id: 1,
    heading: `Business Directory`,
    link: "/business-services/Business Directory",
    heading_ar: `الدليل التجاري`,
    serviceId: 215,
    public: true,
    icon: <BsBuilding />,
  },
  {
    serviceId: 372,
    id: 11,
    heading: `Legal Consultation`,
    heading_ar: `طلب استشارة قانونية`,
    link: "/OtherServicesForm/Legal Consultation",
    roles: [1, 2],
    public: true,
    icon: <RiScalesLine />,
  },
  {
    serviceId: 218,
    id: 12,
    heading: `Commercial Consultation`,
    heading_ar: `طلب استشارة تجارية`,
    link: "/OtherServicesForm/Commercial Consultation",
    roles: [1, 2],
    public: true,
    icon: <IoChatbubbleEllipsesOutline />,
  },
  {
    serviceId: 218,
    id: 13,
    heading: `Technical Support`,
    heading_ar: `طلب دعم فني`,
    link: "/OtherServicesForm/Technical Support",
    roles: [1, 2],
    public: true,
    icon: <FaQuestion />,
  },
  {
    serviceId: "4b",
    id: 14,
    heading: `Booking Service`,
    heading_ar: `خدمة الحجز`,
    link: "/OtherServicesForm/Booking Service",
    roles: [1, 2],
    public: true,
    icon: <BiMapPin />,
  },
  {
    id: 10,
    serviceId: 56,
    heading_ar: `شهادة منشأ شخصية`,
    heading: `Personal COO`,
    link: "/business-services/new-coo/personal",
    roles: [2],
    icon: <BiCertification />,
  },
  {
    id: 15,
    serviceId: 55,
    heading_ar: `اصدار شهادة منشأ FORM A`,
    heading: `Issuing Certificate of Origin (Form A)`,
    link: "/business-services/new-coo/form-A",
    roles: [1],
    icon: <BiCertification />,
  },
];
const { getMostUsedService } = actions;
function MostUsedCarousel() {
  const { t } = useTranslation();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  const classes = useStyles();
  const [mostUsedServiceList, setMostUsedServiceList] = useState([]);

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMostUsedService());
  }, []);

  useEffect(() => {
    const result = APIServices?.mostUsedServiceList;
    let array = [];
    if (result) {
      result?.map((item) =>
        items?.map((i) => item?.code == i?.serviceId && array?.push(i))
      );
      setMostUsedServiceList(array);
    }
  }, [APIServices?.mostUsedServiceList]);

  const renderSlider =
    mostUsedServiceList?.length > 0 &&
    mostUsedServiceList?.map((item) => {
      return (
        <Box key={uid(item)} className="serviceCard">
          <Box className="contentContainer">
            <Box className="icon">{item.icon}</Box>
            <Typography component="p">
              {isRTL ? item.heading_ar : item.heading}
            </Typography>
          </Box>
          <Box className="cardBtns">
            <Link
              variant="outlined"
              className="startBtn"
              to={{
                pathname: !item.public
                  ? profile == null
                    ? "/login"
                    : profile && item.roles?.includes(parseInt(loggedType))
                    ? `/services-form${item.link}`
                    : "/login"
                  : `/services-form${item.link}`,
                id: item.id,
                name: item.heading,
              }}
            >
              <PlayArrowOutlinedIcon />
            </Link>
            <Link
              variant="outlined"
              className="moreInfoBtn"
              to={{
                pathname: isRTL
                  ? `/ar/services/rak-chamber/services-details/${item.serviceId}`
                  : `/en/services/rak-chamber/services-details/${item.serviceId}`,
                state: item.link ? `/services-form${item.link}` : false,
              }}
            >
              <InfoOutlinedIcon />
            </Link>
          </Box>
        </Box>
      );
    });

  return (
    <Box className={classes.root}>
      <OwlCarousel
        nav={true}
        navElement={"div"}
        navText={["<span>➜</span>", "<span>➜</span>"]}
        items={5}
        dots={false}
        center={true}
        autoplayTimeout={3000}
        autoplay={false}
        autoplaySpeed={500}
        fluidSpeed={5000}
        loop
        className={`owl-theme ${classes.root}`}
        responsiveClass={true}
        responsive={{
          0: {
            items: 1,
          },
          600: {
            items: 2,
            center: false,
          },
          1000: {
            items: 3,
          },
          1400: {
            items: 5,
          },
        }}
      >
        {renderSlider}
      </OwlCarousel>
      <Box className={classes.btnContainer}>
        <Link to="/services/rak-chamber">
          <Button variant="contained" className={classes.viewAllBtn}>
            {t("HOME.CAROUSEL.MOSTUSED.BUTTON")}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default memo(MostUsedCarousel);
