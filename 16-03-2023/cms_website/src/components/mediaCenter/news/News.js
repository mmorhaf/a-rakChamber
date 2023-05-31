import { Button, Container } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
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
import { uid } from "react-uid";
import MediaCard from "../../../components/shared/cards/MediaCard";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/news";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { dynamicDataPagination } from "../../shared/utils";
import LastNews from "./LastNews";
import NoData from "../../shared/noData/NoData";

const {
  getAllPosts,
  allPostsReturned,
  doNewsSearch,
  getCategories,
  categoriesReturned,
  doNewsSearchReturned,
  loadingAction,
  getAll,
} = actions;
function News({ match }) {
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
  } = useRoute({ match, subPage: "media", category: "news" });

  const isRateable = useRating();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [search, setSearch] = useState(false);
  const [title, setTitle] = useState(null);
  const [year, setYear] = useState(null);
  const [data, setData] = useState([]);
  const [last, setLast] = useState([]);
  const [classifications, setClassifications] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [returnedYear, setReturnedYear] = useState([]);
  const [count, setCount] = useState(0);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const searchReducers = useSelector((state) => state.search);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const { news: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const reducers = useSelector((state) => state);
  const { allReturned: { years = [] } = {} } = useSelector(
    (state) => state.crudReducers
  );

  const { post: { categories = [] } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );

  useEffect(() => {
    return () => dispatch(doNewsSearchReturned({ data: false }));
  }, []);

  useEffect(() => {
    let sort = "post";
    let subSort = "news";
    let isFeatured = "false";
    let language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, subSort, isFeatured, language }));
  }, [isRTL]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "news";
    let field = "startDate";
    let language = isRTL ? "ar" : "en";
    dispatch(getAll({ sort, subSort, field, language }));
  }, [isRTL]);

  useEffect(() => {
    if (years.length)
      setReturnedYear(years?.filter((item) => String(item) !== "null"));
    dispatch(loadingAction({ loading: false }));
  }, [years]);

  const doSearch = (yearInput, titleInput, classificationsInput) => {
    dispatch(loadingAction({ loading: true }));
    setPageNum(1);
    let language = isRTL ? "ar" : "en";
    let sort = "news";
    let year = yearInput;
    let title = titleInput;
    let categoryId = classificationsInput;
    let limit = 6;
    let offset = 0;
    dispatch(
      doNewsSearch({
        data: { title, year, categoryId, limit, offset },
        sort,
        language,
      })
    );
  };

  useEffect(() => {
    dispatch(loadingAction({ loading: false }));
    if (!posts.length) return;
    if (!search && posts?.length) {
      setData(posts);
      setLast(posts);
    }
  }, [posts]);

  useEffect(() => {
    if (reducers?.posts_reducers.allPostsReturned?.news)
      setCount(
        Math.ceil(reducers?.posts_reducers.allPostsReturned?.news?.count / 6)
      );
  }, [reducers?.posts_reducers.allPostsReturned]);

  useEffect(() => {
    return () => {
      dispatch(categoriesReturned({ data: false }));
      dispatch(allPostsReturned({ data: false }));
    };
  }, []);

  useLayoutEffect(() => {
    const { startIndex } = dynamicDataPagination(6, pageNum);
    let sort = "news";
    const language = isRTL ? "ar" : "en";
    dispatch(loadingAction({ loading: true }));
    if (search)
      dispatch(
        doNewsSearch({
          data: {
            year,
            title,
            categoryId: classifications?.id,
            limit: 6,
            offset: startIndex,
          },
          sort,
          language,
        })
      );
    else
      dispatch(
        getAllPosts({
          sort,
          isFeatured: false,
          language,
          limit: 6,
          offset: startIndex,
        })
      );
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
              <MediaCard item={item} link="/media/news/" />
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

  useEffect(() => {
    if (!year && !classifications && !title) {
      setSearch(false);
      dispatch(doNewsSearchReturned({ data: false }));
      let sort = "news";
      const language = isRTL ? "ar" : "en";
      dispatch(loadingAction({ loading: true }));
      dispatch(
        getAllPosts({
          sort,
          isFeatured: false,
          language,
          limit: 6,
          offset: 0,
        })
      );
    }
  }, [year, classifications, title]);

  const handleChange = (e) => {
    setYear(e);
  };
  const handleChangeC = (e) => {
    setClassifications(e);
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (search && searchReducers?.doNewsSearchReturned?.success) {
      dispatch(loadingAction({ loading: false }));
      setData(searchReducers?.doNewsSearchReturned?.results);
      setCount(Math.ceil(searchReducers?.doNewsSearchReturned?.count / 6));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  return (
    <Grid container className={classes.newsRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
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
            apply={apply}
            name={name}
            isRateable={isRateable}
            componentRef={componentRef}
            anchorRef={anchorRef}
          />
        </Grid>
        <Grid item xs={12} className={classes.search}>
          <Grid item lg={3} md={3} sm={3} xs={12}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(year, title, classifications?.id);
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <TextField
                id="standard-basic"
                label={t("MEDIA.NEWS.SEARCH.TITLE")}
                onChange={onChange}
                type="search"
                value={title}
              />
            </form>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            className={classes.searchSelect}
          >
            <FormControl className={classes.formControl}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(year, title, classifications?.id);
                }}
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
              >
                <Autocomplete
                  id="classifications"
                  name="classifications"
                  value={classifications}
                  options={categories}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => {
                    handleChangeC(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("MEDIA.NEWS.SEARCH.CLASSIFICATION")}
                      fullWidth
                      className={classes.blue}
                    />
                  )}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        textTransform: "capitalize",
                        direction: isRTL ? "rtl" : "ltr",
                        fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  className={classes.select}
                />
              </form>
            </FormControl>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            className={classes.searchSelect}
          >
            <FormControl className={classes.formControl}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(year, title, classifications?.id);
                }}
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
              >
                <Autocomplete
                  id="year"
                  name="year"
                  value={year}
                  options={returnedYear}
                  getOptionLabel={(option) => String(option)}
                  onChange={(e, value) => {
                    handleChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("MEDIA.NEWS.SEARCH.YEAR")}
                      fullWidth
                      className={classes.blue}
                    />
                  )}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        textTransform: "capitalize",
                        direction: isRTL ? "rtl" : "ltr",
                        fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                      }}
                    >
                      {children}
                    </Paper>
                  )}
                  className={classes.select}
                />
              </form>
            </FormControl>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={(e) => {
                setSearch(true);
                doSearch(year, title, classifications?.id);
              }}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
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

        {searchReducers?.doNewsSearchReturned.success ? (
          <LastNews last={last} />
        ) : null}
      </Container>
    </Grid>
  );
}

export default memo(News);
