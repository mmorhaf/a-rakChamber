import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { uid } from "react-uid";
import MediaCard from "../../components/shared/cards/MediaCard";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/mediaCenter/news";
import usePaginationStyles from "../../styles/components/shared/pagination/pagination";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import MainImage from "../shared/mainImage/MainImage";
import NoData from "../shared/noData/NoData";
import UpperSection from "../shared/upperSection/UpperSection";
import { dynamicDataPagination } from "../shared/utils";

const { getPostByCategory, allPostByCategoryReturned, loadingAction } = actions;
function GeneralPage({ match }) {
  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    alias,
    apply,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "generalPage", category: "page" });
  const isRateable = useRating();
  const { categoryAlias } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageName, setPageName] = useState("");
  const [secondaryPageName, setSecondaryPageName] = useState("");
  const [link, setLink] = useState("");
  const [secondaryPageLink, setSecondaryPageLink] = useState("");
  const [count, setCount] = useState(0);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const reducers = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    let data = { categoryAlias: categoryAlias, limit: 6, offset: 0 };
    dispatch(getPostByCategory({ data, language }));
  }, [isRTL, categoryAlias]);

  useEffect(() => {
    if (reducers?.menu?.menuReturned?.length > 0) {
      let header = reducers?.menu?.menuReturned?.filter(
        (item) => item?.title?.en === "header"
      );
      let link = window?.location?.href?.split("/");
      let menuLink = header[0]?.childrens?.filter(
        (item) =>
          item?.link === `/${link[link?.length - 2]}/${link[link?.length - 1]}`
      );
      if (menuLink && menuLink?.length > 0) {
        setLink(menuLink[0]?.link);
        setPageName(isRTL ? menuLink[0]?.title?.ar : menuLink[0]?.title?.en);
      } else {
        header[0]?.childrens?.map((item) => {
          item?.childrens?.map((subItem) => {
            if (
              subItem?.link ===
              `/${link[link?.length - 2]}/${link[link?.length - 1]}`
            ) {
              setPageName(isRTL ? item?.title?.ar : item?.title?.en);
              setSecondaryPageName(
                isRTL ? subItem?.title?.ar : subItem?.title?.en
              );
              setSecondaryPageLink(subItem?.link);
            }
          });
        });
      }
    }
  }, [reducers, window?.location?.href]);

  useEffect(() => {
    if (
      reducers?.posts_reducers?.allPostByCategoryReturned?.data?.posts?.length
    ) {
      setData(reducers?.posts_reducers?.allPostByCategoryReturned?.data?.posts);
      setCount(
        Math.ceil(
          reducers?.posts_reducers.allPostByCategoryReturned?.data?.count / 6
        )
      );
      dispatch(loadingAction({ loading: false }));
    }
  }, [reducers?.posts_reducers?.allPostByCategoryReturned]);

  useLayoutEffect(() => {
    const { startIndex } = dynamicDataPagination(6, pageNum);
    const language = isRTL ? "ar" : "en";
    dispatch(loadingAction({ loading: true }));
    let data = {
      categoryAlias: categoryAlias,
      limit: 6,
      offset: startIndex,
    };
    dispatch(getPostByCategory({ data, language }));
  }, [pageNum]);

  useLayoutEffect(() => {
    setPageNum(1);
  }, [isRTL]);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const newsSection = useMemo(
    () =>
      data?.length > 0 ? (
        data?.map((item) => {
          return (
            <Grid item md={6} sm={12} xs={12} key={uid(item)}>
              <MediaCard item={item} link="/page/" />
            </Grid>
          );
        })
      ) : (
        <NoData />
      ),
    [data]
  );
  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  return (
    <Grid container className={classes.newsRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={pageName}
          link={link}
        />
      </Grid>
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <UpperSection
            main={main}
            mainPath={mainPath}
            secondaryPage={secondaryPage}
            secondaryPagePath={secondaryPagePath}
            detailsPage={detailsPage}
            alias={alias}
            apply={false}
            name={name}
            isRateable={isRateable}
            componentRef={componentRef}
            anchorRef={anchorRef}
            dynamic={true}
            pageName={pageName}
            secondaryPageName={secondaryPageName}
            link={link}
            secondaryPageLink={secondaryPageLink}
          />
        </Grid>

        <Grid container item xs={12} className={classes.news}>
          {newsSection}
        </Grid>

        {data?.length > 0 ? (
          <Grid item xs={12} className="pagination">
            <Pagination
              className={paginationClasses.root}
              count={count}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationClick}
            />
          </Grid>
        ) : null}
      </Container>
    </Grid>
  );
}

export default memo(GeneralPage);
