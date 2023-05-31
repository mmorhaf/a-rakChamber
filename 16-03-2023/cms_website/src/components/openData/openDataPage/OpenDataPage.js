import { Button, Container, Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/openData/openData";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import RequestForm from "./RequestForm";
import Table from "./table/Table";
import Dialog from "../../shared/dialog/Dialog";

const {
  getAllPosts,
  loadingAction,
  doNewsSearchReturned,
  doNewsSearch,
  getCategories,
  getAll,
  submitRequestReturned,
  submitCommentReturned,
} = actions;

export default function OpenDataPage(props) {
  const { match } = props;
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
  } = useRoute({ match, subPage: "open", category: "page" });
  const isRateable = useRating();
  const { openDatas: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const { t } = useTranslation();

  const { openDatas: { lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const { commentReturned } = useSelector((state) => state.comment);
  const [year, setYear] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [returnedYear, setReturnedYear] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const reducer = useSelector((state) => state);
  useEffect(() => {
    return () => dispatch(doNewsSearchReturned({ data: false }));
  }, []);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const searchReducers = useSelector((state) => state.search);

  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const { post: { categories = [] } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (commentReturned) {
      if (commentReturned.success) {
        setOpen(true);
        setMessage(isRTL ? "تم إرسال الرسالة بنجاح" : "Submitted successfully");
      } else if (commentReturned.code === 77) {
        setOpen(true);
        setMessage(isRTL ? " !التعليق موجود مسبقا " : "Comment Exists !");
      } else if (!commentReturned.success && commentReturned.code) {
        setOpen(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
      }
      setTimeout(() => {
        dispatch(submitCommentReturned({ data: false }));
      }, 5000);
    } else {
      setOpen(false);
      setMessage(null);
    }
  }, [commentReturned]);

  useEffect(() => {
    let sort = "post";
    let subSort = "openDatas";
    let isFeatured = "false";
    let language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, subSort, isFeatured, language }));
  }, [isRTL]);

  useEffect(() => {
    if (!posts.length) return;
    setData(posts);
  }, [posts]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    const sort = "openDatas";
    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "openDatas";
    let field = "startDate";
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

  useEffect(() => {
    if (!searchReducers?.doNewsSearchReturned?.success) return;
    setData(searchReducers?.doNewsSearchReturned?.results);
    dispatch(loadingAction({ loading: false }));
  }, [searchReducers?.doNewsSearchReturned]);

  const myRef = useRef(null);

  const scrollToRef = useCallback(
    (ref) =>
      window.scrollTo({
        left: 0,
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      }),
    []
  );
  const executeScroll = () => scrollToRef(myRef);

  const handleYearChange = (e) => {
    setYear(e);
  };

  const handleSectorChange = (e) => {
    setCategoryId(e);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const doSearch = (categoryInput) => {
    dispatch(submitRequestReturned({ data: false }));
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "opendata";
    let categoryId = categoryInput ? categoryInput?.id : null;
    dispatch(
      doNewsSearch({ data: { keyword, year, categoryId }, sort, language })
    );
  };

  useEffect(() => {
    if (!categoryId && keyword === "" && !year && categories && posts) {
      setData(posts);
    }
  }, [keyword, categoryId, year]);

  const classes = useStyles();
  return (
    <Grid container className={classes.root} ref={componentRef}>
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
          <Grid item xs={12}>
            <form noValidate autoComplete="off">
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={12}
                className={classes.searchTitle}
              >
                <TextField
                  id="standard-basic"
                  label={t("FAQ.SEARCH.KEYWORD")}
                  onChange={handleKeywordChange}
                  value={keyword}
                  type="search"
                />
              </Grid>
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={12}
                className={classes.searchSelect}
              >
                <Autocomplete
                  id="categoryId"
                  name="categoryId"
                  value={categoryId}
                  options={categories?.sort((a, b) =>
                    a.title > b.title ? 1 : -1
                  )}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => {
                    handleSectorChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("MEDIA.NEWS.SEARCH.SECTOR")}
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
              </Grid>
              <Grid
                item
                lg={3}
                md={3}
                sm={3}
                xs={12}
                className={classes.searchSelect}
              >
                <Autocomplete
                  id="year"
                  name="year"
                  value={year}
                  options={returnedYear}
                  getOptionLabel={(option) => String(option)}
                  onChange={(e, value) => {
                    handleYearChange(value);
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
              </Grid>
              <Grid item lg={3} md={3} sm={3} xs={12} className={classes.btns}>
                <Button
                  className={classes.searchBtn}
                  onClick={(e) => doSearch(categoryId)}
                >
                  {t("MEDIA.NEWS.SEARCH.BTN")}
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid item xs={12} className="requestBtn">
          <Button onClick={executeScroll}>
            {isRTL ? "قم بطلب بيانات" : " request open data"}
          </Button>
        </Grid>
        <Grid item xs={12} className="events" style={{ marginTop: "50px" }}>
          <Table searchData={data} setSearchData={setData} />
        </Grid>
        <Grid
          item
          xs={12}
          style={{ marginTop: "50px" }}
          className="comment"
          ref={myRef}
        >
          <Grid item xs={12}>
            <Typography variant="h2" component="h2" className="commentTitle">
              {t("OPENDATA.PAGE.REQUEST.TITLE")}
            </Typography>
          </Grid>
          <Grid item xs={12} className="commentForm">
            <RequestForm />
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} message={message} />
    </Grid>
  );
}
