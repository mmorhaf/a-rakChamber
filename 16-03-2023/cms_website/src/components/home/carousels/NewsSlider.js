import React, { useState, memo, useCallback, useEffect, useMemo } from "react";
import { push } from "connected-react-router";
import { useSelector } from "react-redux";
import {
  Card,
  Button,
  CardMedia,
  CardHeader,
  Box,
  CardContent,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import ApartmentOutlinedIcon from "@material-ui/icons/ApartmentOutlined";
import BarChartOutlinedIcon from "@material-ui/icons/BarChartOutlined";
import useStyles from "../../../styles/components/carousels/mediaCenterCarousel";
import useBtnStyles from "../../../styles/components/home/common/viewAllBtn";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { uid } from "react-uid";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { getImage } from "../../shared/utils";
import store from "../../../redux/store";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import HtmlParser from "html-react-parser";
import NoData from "../../shared/noData/NoData";
function NewsSlider(props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const reducers = useSelector((state) => state);
  const { news: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const { post: { categories = [] } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );

  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [categos, setCategos] = useState({
    chamb: [],
    econo: [],
  });
  const [titles, setTitles] = useState({
    first: "",
    second: "",
  });

  useEffect(() => {
    const categReturned = categories;
    const titles = {};

    if (!categReturned.length) return;
    else {
      const first = categReturned.find((cat) => cat.id === 5);
      const second = categReturned.find((cat) => cat.id === 6);

      titles["first"] = first?.title;
      titles["second"] = second?.title;
    }
    setTitles(titles);
  }, [categories]);

  const sortItemsByCateg = useCallback((returnedData) => {
    const chamb = [];
    const econo = [];
    let chambSlide = [];
    let econoSlide = [];

    returnedData.map((item) => {
      const id = item.categoryId;

      if (id === 5 || id === 6) {
        if (id === 5) {
          if (chambSlide.length < 2) {
            chambSlide.push(item);
          } else {
            chamb.push(chambSlide);

            chambSlide = [];
            chambSlide.push(item);
          }
        } else {
          if (econoSlide.length < 2) {
            econoSlide.push(item);
          } else {
            econo.push(econoSlide);

            econoSlide = [];
            econoSlide.push(item);
          }
        }
      }

      return null;
    });

    chamb.push(chambSlide);
    econo.push(econoSlide);
    setCategos({ chamb, econo });
  }, []);

  useEffect(() => {
    let returnedData = [];
    if (!posts?.length) return;
    if (!reducers?.crudReducers?.allReturned?.posts?.length) return;
    if (posts?.length && reducers?.crudReducers?.allReturned?.posts?.length)
      returnedData = [...posts, ...reducers?.crudReducers?.allReturned?.posts];
    if (returnedData.length) {
      sortItemsByCateg(returnedData);
    }
  }, [posts, reducers?.crudReducers?.allReturned?.posts, sortItemsByCateg]);

  const sortSlidesByCateg = useCallback(() => {
    let slides = [];
    let slide = [];
    const chambLength = categos.chamb.length;
    const econoLength = categos.econo.length;
    const maxLength = Math.max(chambLength, econoLength);
    let i;
    for (i = 0; i < maxLength; i++) {
      if (slide.length < 2) {
        slide.push(categos.chamb[i] ? categos.chamb[i] : []);
        slide.push(categos.econo[i] ? categos.econo[i] : []);
      } else {
        slides.push(slide);

        slide = [];
        slide.push(categos.chamb[i] ? categos.chamb[i] : []);
        slide.push(categos.econo[i] ? categos.econo[i] : []);
      }
    }

    if (slide.length) slides.push(slide);
    setData(slides);
  }, [categos.chamb, categos.econo]);

  useEffect(() => {
    sortSlidesByCateg();
  }, [categos, sortSlidesByCateg]);

  const classes = useStyles();
  const btnClasses = useBtnStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const renderMedia = useCallback(
    (column) => {
      return column.map((report) => {
        const image = getImage(report.files, isRTL);

        return (
          <Card className="mediaCard" key={uid(report)}>
            <Box className="contentContainer">
              <CardHeader
                title={
                  <span className={classes.date}>
                    {moment(report.startDate)
                      .format("DD MMM YYYY")
                      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                  </span>
                }
                subheader={HtmlParser(report.title)}
              />
              <CardContent>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `${report.description}`,
                  }}
                ></p>
              </CardContent>

              <Button
                onClick={() => {
                  store.dispatch(push(`/media/news/${report.alias}`));
                }}
              >
                {" "}
                {t("MEDIA.NEWS.CARDBTN")}
              </Button>
            </Box>
            <CardMedia
              image={`/api/file/download/${image.uuid}?size=medium`}
              title={image.alt}
            />
          </Card>
        );
      });
    },
    [isRTL]
  );

  const renderSlide = useCallback(
    (content) => {
      return (
        <Grid container key={uid(content)}>
          <Grid item xs={12} className="slideContainer">
            {content.map((column, index) => {
              const heading =
                index === 0 ? (
                  <h2>
                    <ApartmentOutlinedIcon />
                    {titles.first}
                  </h2>
                ) : (
                  <h2>
                    <BarChartOutlinedIcon />
                    {titles.second}
                  </h2>
                );

              return (
                <Box key={uid(column)} className="columnContainer">
                  {heading}
                  {renderMedia(column)}
                </Box>
              );
            })}
          </Grid>
        </Grid>
      );
    },
    [titles.first, titles.second, renderMedia]
  );

  const renderSlider = useMemo(
    () => data.map((content) => renderSlide(content)),
    [data, renderSlide]
  );

  return (
    <Box className={classes.root}>
      {data.length > 0 ? (
        <OwlCarousel
          items={1}
          autoplay={false}
          autoplaySpeed={500}
          autoplayTimeout={3000}
          loop={false}
          margin={10}
          className={`owl-theme  ${classes.root}`}
        >
          {renderSlider}
        </OwlCarousel>
      ) : (
        <NoData card={true} />
      )}

      <Box className={btnClasses.btnContainer}>
        <Button
          disableElevation
          variant="contained"
          className={btnClasses.viewAllBtn}
          onClick={() => {
            store.dispatch(push("/media/news"));
          }}
        >
          {t("HOME.CAROUSEL.MEDIA.BUTTON")}
        </Button>
      </Box>
    </Box>
  );
}

export default memo(NewsSlider);
