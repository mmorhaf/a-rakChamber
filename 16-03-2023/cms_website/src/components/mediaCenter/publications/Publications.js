import { Button, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/publications";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import NoData from "../../shared/noData/NoData";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import PublicationsCards from "./PublicationsCards";
import { PublicationsCategories } from "./PublicationsCategories";
const {
  doNewsSearch,
  doNewsSearchReturned,
  getCategories,
  categoriesReturned,
  loadingAction,
  getAll,
  getAllAb,
  allAbReturned,
} = actions;

function Publications({ match }) {
  const { t } = useTranslation();
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
  } = useRoute({ match, subPage: "media", category: "publications" });
  const [allCategories, setAllCategories] = useState([]);
  const isRateable = useRating();
  const [title, setTitle] = useState("");
  const [returnedYears, setReturnedYears] = useState([]);
  const [year, setYear] = useState(null);
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [returnedYear, setReturnedYear] = useState([]);
  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const searchReducers = useSelector((state) => state.search);
  const { loadingActionReturned } = useSelector((state) => state.loading);
  const [pageNum, setPageNum] = useState(1);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState(false);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useEffect(() => {
    if (reducer?.category?.categoriesReturned?.post?.categories?.length)
      setAllCategories(reducer.category.categoriesReturned.post.categories);
  }, [reducer.category]);

  const categories = useSelector(
    (state) => state.crudReducers.allAbReturned.categories
  );

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    let subSort = "publications";
    let isFeatured = "false";
    let language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, subSort, isFeatured, language }));
  }, [isRTL]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    if (search)
      dispatch(
        doNewsSearch({
          data: {
            year,
            title,
            categoryId: categoryId ? categoryId?.id : null,
            limit: 6,
            offset: (pageNum - 1) * 6,
          },
          sort: "publication",
          language,
        })
      );
    else
      dispatch(
        getAllAb({
          sort: "category",
          subSort: "post",
          entity: "publications",
          language,
          limit: 6,
          offset: (pageNum - 1) * 6,
        })
      );
  }, [isRTL, pageNum]);

  useEffect(() => {
    return () => {
      dispatch(allAbReturned({ data: false }));
      dispatch(doNewsSearchReturned({ data: false }));
    };
  }, []);

  const doSearch = (categoryInput) => {
    setPageNum(1);
    setSearch(true);
    let categoryId = categoryInput?.id;
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "publication";
    dispatch(
      doNewsSearch({
        data: {
          title,
          year,
          categoryId: categoryId ? categoryId : null,
          limit: 6,
          offset: (pageNum - 1) * 6,
        },
        sort,
        language,
      })
    );
  };

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "publications";
    let field = "privateDate";
    let language = isRTL ? "ar" : "en";
    dispatch(getAll({ sort, subSort, field, language }));
  }, [isRTL]);

  useEffect(() => {
    if (reducer?.crudReducers?.allReturned?.years?.length)
      setReturnedYear(
        reducer?.crudReducers?.allReturned?.years?.filter(
          (item) => String(item) !== "null"
        )
      );
    dispatch(loadingAction({ loading: false }));
  }, [reducer?.crudReducers?.allReturned?.years]);

  const handleChange = (e) => {
    setYear(e);
  };
  const handleCatChange = (e) => {
    setCategoryId(e);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!categoryId && title === "" && !year && categories) {
      setPageNum(1);
      setSearch(false);
      setData(categories);
      setCount(Math.ceil(reducer?.crudReducers?.allAbReturned?.count / 6));
    }
  }, [title, categoryId, year]);

  useLayoutEffect(() => {
    setPageNum(1);
  }, [isRTL]);

  useEffect(() => {
    if (categories?.length) {
      setCount(Math.ceil(reducer?.crudReducers?.allAbReturned?.count / 6));
      setData(categories);
    }
    dispatch(loadingAction({ loading: false }));
  }, [categories]);

  useEffect(() => {
    if (allCategories?.length) {
      setCat(allCategories);
    }
  }, [allCategories]);

  useEffect(() => {
    if (!searchReducers?.doNewsSearchReturned?.success) return;
    if (search && searchReducers?.doNewsSearchReturned?.success) {
      setCount(Math.ceil(searchReducers?.doNewsSearchReturned?.count / 6));

      setData(searchReducers?.doNewsSearchReturned?.results);
      dispatch(loadingAction({ loading: false }));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  const displayedContent = data;

  useLayoutEffect(() => {
    const { requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: Math.ceil(count / 6) });
  }, [displayedContent, pageNum]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={isRTL ? "المنشورات" : "Publications"}
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
                doSearch(categoryId);
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <TextField
                id="standard-basic"
                label={t("PUBLICATIONS.SEARCH.PUBLICATION")}
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(categoryId);
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <Autocomplete
                id="categoryId"
                name="categoryId"
                value={categoryId}
                options={cat?.sort((a, b) => (a.title > b.title ? 1 : -1))}
                getOptionLabel={(option) => option?.title}
                onChange={(e, value) => {
                  handleCatChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={t("CAREER.SEARCH.CLASSIFICATION")}
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
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            className={classes.searchSelect}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(categoryId);
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
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={(e) => doSearch(categoryId)}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>

        <Grid className="tabs">
          {data && data?.length ? (
            !searchReducers?.doNewsSearchReturned?.success ? (
              <PublicationsCategories data={data} />
            ) : (
              <PublicationsCards data={data} />
            )
          ) : (
            <NoData />
          )}
        </Grid>
        {data && data?.length > 0 && (
          <Grid item xs={12} className="pagination">
            <Pagination
              className={paginationClasses.root}
              count={count}
              page={pageNum}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationClick}
            />
          </Grid>
        )}
      </Container>
    </Grid>
  );
}

export default memo(Publications);
