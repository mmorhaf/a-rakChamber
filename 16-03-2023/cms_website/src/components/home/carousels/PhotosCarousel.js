import React, {
  memo,
  useState,
  Fragment,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { uid } from "react-uid";
import useStyles from "../../../styles/components/carousels/photosCarousel";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import { useTranslation } from "react-i18next";
import { getImage } from "../../shared/utils";
import { IoCalendarOutline } from "react-icons/io5";
import moment from "moment";
import store from "../../../redux/store";
import { push } from "connected-react-router";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import NoData from "../../shared/noData/NoData";

function PhotosCarousel() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { image: { categories = [] } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = categories;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [categories]);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const card = useCallback(
    (album) => {
      const image = getImage(album.files, isRTL);

      return (
        <Box key={uid(album)} className="cardContainer">
          <Card className="card">
            <CardMedia
              className="albumPhoto"
              image={`/api/file/download/${image.uuid}?size=small`}
              title={image.alt}
            />
            <CardContent>
              <Box component="span" className="date">
                <IoCalendarOutline />
                {moment(album.startDate)
                  .format("DD MMM YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </Box>
              <Link
                key={uid(album)}
                to={`/media/photos-gallery/${album.alias}`}
              >
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className="title"
                >
                  {album.title}
                </Typography>
              </Link>
            </CardContent>

            <Button
              onClick={() => {
                store.dispatch(push(`/media/photos-gallery/${album.alias}`));
              }}
            >
              {" "}
              {t("MEDIA.NEWS.CARDBTN")}
            </Button>
          </Card>
        </Box>
      );
    },
    [isRTL]
  );

  const renderSlider = useMemo(
    () => data.map((album) => card(album)),
    [data, card]
  );

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  return (
    <Fragment>
      {data.length > 0 ? (
        <OwlCarousel
          nav={true}
          loop={true}
          dots={true}
          margin={16}
          autoplay={true}
          className={`owl-theme ${classes.root}`}
          responsiveClass={true}
          responsive={{
            0: {
              items: 1,
            },
            700: {
              items: data.length < 2 ? data.length : 2,
              center: false,
            },
            1000: {
              items: data.length < 3 ? data.length : 3,
            },
          }}
        >
          {renderSlider}
        </OwlCarousel>
      ) : (
        <NoData card={true} />
      )}

      <Link to="/media/photos-gallery">
        <Box className={btnClasses.btnContainer}>
          <Button variant="contained" className={btnClasses.viewAllBtn}>
            {t("HOME.CAROUSEL.PHOTOS.ALLBUTTON")}
          </Button>
        </Box>
      </Link>
    </Fragment>
  );
}

export default memo(PhotosCarousel);
