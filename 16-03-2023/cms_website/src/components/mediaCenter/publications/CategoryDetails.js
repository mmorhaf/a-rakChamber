import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { memo, useEffect, useState, useLayoutEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/publications";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import PublicationCard from "./PublicationCard";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import Pagination from "@material-ui/lab/Pagination";
import { dynamicDataPagination } from "../../shared/utils";
import HtmlParser from "html-react-parser";

const {
  getAll,
  getCategoryByAlias,
  doNewsSearch,
  doNewsSearchReturned,
  loadingAction,
  allReturned,
  setPagination,
} = actions;

function CategoryDetails({ match }, props) {
  const { t } = useTranslation();
  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    apply,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "media", category: "publications" });
  const isRateable = useRating();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { categoryByAliasReturned, lastUpdate = "" } = useSelector(
    (state) => state.category
  );

  const { posts = [] } = useSelector((state) => state.crudReducers.allReturned);
  const searchReducers = useSelector((state) => state.search);

  //const reducer = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const classes = useStyles();
  const { alias } = useParams();
  const dispatch = useDispatch();
  const [cat, setCat] = useState(null);
  const [title, setTitle] = useState(null);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(null);
  const [search, setSearch] = useState(false);
  const [returnedYear, setReturnedYear] = useState([]);
  const reducer = useSelector((state) => state);
  const paginationClasses = usePaginationStyles();
  const [count, setCount] = useState(0);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    dispatch(setPagination({ data: num }));
  };

  const contentSection = React.useMemo(
    () =>
      data?.length > 0 &&
      data?.map((item) => {
        return (
          <Grid item lg={4} sm={6} xs={12} className={classes.cc}>
            <PublicationCard item={item} search={search} />
          </Grid>
        );
      }),
    [data]
  );

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getCategoryByAlias({ alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (reducer?.crudReducers?.allReturned?.count)
      setCount(Math.ceil(reducer?.crudReducers?.allReturned?.count / 6));
    dispatch(loadingAction({ loading: false }));
  }, [reducer?.crudReducers?.allReturned]);

  useEffect(() => {
    if (!searchReducers?.doNewsSearchReturned?.success) return;

    dispatch(loadingAction({ loading: false }));
    if (search && searchReducers?.doNewsSearchReturned?.success) {
      setData(searchReducers?.doNewsSearchReturned?.results);

      setCount(Math.ceil(searchReducers?.doNewsSearchReturned?.count / 6));

      dispatch(loadingAction({ loading: false }));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  useLayoutEffect(() => {
    const { startIndex } = dynamicDataPagination(
      6,
      reducer?.crudReducers?.setPagination || 1
    );
    dispatch(loadingAction({ loading: true }));
    if (search) {
      let limit = 6;
      let offset = startIndex;
      let language = isRTL ? "ar" : "en";
      let sort = "publication";
      const categoryId = cat.id;

      dispatch(
        doNewsSearch({
          data: { title, year, categoryId, limit, offset },
          sort,
          language,
        })
      );
    } else {
      let sort = "post";
      let subSort = "publications";
      let language = isRTL ? "ar" : "en";
      let limit = 6;
      let offset = startIndex;
      if (cat?.id) {
        let categoryId = cat?.id;
        dispatch(
          getAll({ sort, subSort, categoryId, language, limit, offset })
        );
      }
    }
  }, [reducer?.crudReducers?.setPagination]);

  useEffect(() => {
    if (
      categoryByAliasReturned?.success === false &&
      categoryByAliasReturned?.message
    )
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (categoryByAliasReturned) setCat(categoryByAliasReturned);
    dispatch(loadingAction({ loading: false }));
  }, [categoryByAliasReturned]);

  useEffect(() => {
    if (cat) {
      dispatch(loadingAction({ loading: true }));
      let sort = "post/years";
      let subSort = "publications";
      let field = "privateDate";
      let categoryId = cat?.id;
      let language = isRTL ? "ar" : "en";
      dispatch(getAll({ sort, subSort, categoryId, field, language }));
    }
  }, [isRTL, cat]);

  useEffect(() => {
    if (reducer?.crudReducers?.allReturned?.years?.length)
      setReturnedYear(
        reducer?.crudReducers?.allReturned?.years?.filter(
          (item) => String(item) !== "null"
        )
      );
    dispatch(loadingAction({ loading: false }));
  }, [reducer?.crudReducers?.allReturned?.years]);

  useEffect(() => {
    if (!posts?.length) return;
    if (posts && !search) setData(posts);
  }, [posts]);

  useEffect(() => {
    if (!year && !title && posts) {
      setData(posts);
      setCount(Math.ceil(reducer?.crudReducers?.allReturned?.count / 6));
    }
  }, [title, year]);

  useEffect(() => {
    return () => {
      dispatch(doNewsSearchReturned({ data: false }));
      dispatch(allReturned({ data: false }));
    };
  }, []);

  useEffect(() => {
    let sort = "post";
    let subSort = "publications";
    let language = isRTL ? "ar" : "en";
    let limit = 6;
    let offset = reducer?.crudReducers?.setPagination
      ? (reducer?.crudReducers?.setPagination - 1) * 6
      : 0;
    if (cat?.id) {
      let categoryId = cat?.id;
      dispatch(getAll({ sort, subSort, categoryId, language, limit, offset }));
    }
  }, [cat, isRTL]);

  const doSearch = () => {
    dispatch(loadingAction({ loading: true }));
    dispatch(setPagination({ data: 1 }));
    let limit = 6;
    let offset = 0;
    let language = isRTL ? "ar" : "en";
    let sort = "publication";
    const categoryId = cat.id;

    dispatch(
      doNewsSearch({
        data: { title, year, categoryId, limit, offset },
        sort,
        language,
      })
    );
  };

  const handleChange = (event) => {
    setYear(event);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Box>
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
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch();
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <TextField
                id="standard-basic"
                label={t("MEDIA.NEWS.SEARCH.TITLE")}
                value={title}
                type="search"
                onChange={onChange}
              />
            </form>
          </Grid>
          <Grid
            item
            lg={4}
            md={4}
            sm={4}
            xs={12}
            className={classes.searchSelect}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch();
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
          <Grid item lg={4} md={4} sm={4} xs={12} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={(e) => {
                setSearch(true);
                doSearch();
              }}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.pub}>
          <Grid item xs={12} className="actualContent">
            <Typography variant="h2" className="title">
              {cat ? HtmlParser(cat.title) : null}
            </Typography>
            {cat?.description ? (
              <Typography
                paragraph
                variant="body1"
                className="summary"
                dangerouslySetInnerHTML={{
                  __html: `${cat?.description}`,
                }}
              ></Typography>
            ) : null}
            <Grid
              container
              id="details"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {contentSection}
            </Grid>
            {data?.length > 0 && (
              <Pagination
                className={paginationClasses.root}
                count={count}
                variant="outlined"
                shape="rounded"
                onChange={handlePaginationClick}
                page={
                  reducer?.crudReducers?.setPagination
                    ? reducer?.crudReducers?.setPagination
                    : 1
                }
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default memo(CategoryDetails);
