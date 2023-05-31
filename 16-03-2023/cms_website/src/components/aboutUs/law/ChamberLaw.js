import { Box, Button, Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/aboutUs/polices";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import LawAccordion from "./LawAccordion";
import NoData from "../../shared/noData/NoData";

const {
  getAllPosts,
  loadingAction,
  getAllAb,
  doNewsSearchReturned,
  doNewsSearch,
} = actions;
function ChamberLaw({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "law" });
  const dispatch = useDispatch();
  const searchReducers = useSelector((state) => state.search);
  const reducers = useSelector((state) => state);
  const [info, setInfo] = useState([]);
  const isRateable = useRating();
  const { alias } = useParams();
  const [categories, setCategories] = useState([]);
  const { laws: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const [expanded, setExpanded] = useState("panel0");
  const [collapse, setCollapse] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(null);

  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "laws";
    const language = isRTL ? "ar" : "en";
    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "category";
    let subSort = "post";
    let entity = "laws";
    const language = isRTL ? "ar" : "en";
    dispatch(getAllAb({ sort, subSort, entity, language }));
  }, [isRTL]);

  useEffect(() => {
    if (reducers?.crudReducers?.allAbReturned) {
      dispatch(loadingAction({ loading: false }));
      setCategories(reducers?.crudReducers?.allAbReturned?.categories);
    }
  }, [reducers?.crudReducers?.allAbReturned]);

  useEffect(() => {
    if (
      reducers?.crudReducers?.allAbReturned &&
      reducers?.posts_reducers?.allPostsReturned?.laws?.posts
    ) {
      dispatch(loadingAction({ loading: false }));
    }
  }, [
    reducers?.crudReducers?.allAbReturned,
    reducers.posts_reducers.allPostsReturned.laws,
  ]);

  useEffect(() => {
    if (
      !category &&
      title === "" &&
      reducers?.posts_reducers?.allPostsReturned?.laws?.posts
    ) {
      setInfo(reducers?.posts_reducers?.allPostsReturned?.laws?.posts);
    }
  }, [category, title]);

  useEffect(() => {
    if (reducers?.posts_reducers?.allPostsReturned?.laws?.posts) {
      setInfo(reducers?.posts_reducers?.allPostsReturned?.laws?.posts);
    }
  }, [reducers?.posts_reducers?.allPostsReturned?.laws?.posts]);

  useEffect(() => {
    if (searchReducers?.doNewsSearchReturned?.success) {
      setInfo(searchReducers?.doNewsSearchReturned?.results);
      dispatch(loadingAction({ loading: false }));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  const handleCategoryChange = (e) => {
    setCategory(e);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const doSearch = (titleInput, categoryInput) => {
    let language = isRTL ? "ar" : "en";
    let sort = "laws";
    let title = titleInput;
    let categoryId = categoryInput ? categoryInput?.id : null;
    dispatch(loadingAction({ loading: true }));
    dispatch(doNewsSearch({ data: { title, categoryId }, sort, language }));
  };

  const classes = useStyles();
  return (
    <div>
      <Grid container style={{ marginBottom: "50px" }}>
        <Grid item xs={12}>
          <MainImage
            uuid={askingForRatingReturned?.pagePicture?.uuid}
            title={secondaryPage}
            link={secondaryPagePath}
          />
        </Grid>

        <Container maxWidth="lg" style={{ marginTop: "30px" }}>
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

          <Grid item xs={12} className={classes.search}>
            <Grid item sm={5} xs={12}>
              <form
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(title, category);
                }}
              >
                <TextField
                  id="standard-basic"
                  label={isRTL ? "قانون الغرفة" : "Chamber Law"}
                  onChange={onChange}
                  value={title}
                  type="search"
                />
              </form>
            </Grid>

            <Grid item sm={5} xs={12} className={classes.searchSelect}>
              <form
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(title, category);
                }}
              >
                <Autocomplete
                  id="category"
                  name="category"
                  value={category}
                  options={categories?.sort((a, b) =>
                    a.title > b.title ? 1 : -1
                  )}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => {
                    handleCategoryChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={isRTL ? "الفئة" : "Category"}
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
            <Grid item sm={1} xs={2} className={classes.btns}>
              <Button
                className={classes.searchBtn}
                onClick={() => doSearch(title, category)}
              >
                {t("MEDIA.NEWS.SEARCH.BTN")}
              </Button>
            </Grid>
          </Grid>

          {info && info?.length > 0 ? (
            <Grid item xs={12} className={classes.allBtn}>
              <Button
                onClick={() => {
                  setCollapse(!collapse);
                  setExpanded(!expanded);
                }}
              >
                {collapse ? (
                  <Box component="span" className="collaBtn">
                    {t("FAQ.EXPAND")}
                    <Box component="span">
                      <BsArrowsExpand />
                    </Box>
                  </Box>
                ) : (
                  <Box component="span" className="collaBtn">
                    {t("FAQ.COLLAPSE")}
                    <Box component="span">
                      <BsArrowsCollapse />
                    </Box>
                  </Box>
                )}
              </Button>
            </Grid>
          ) : null}
          <Grid container style={{ minHeight: "165px" }}>
            {info && info?.length > 0 ? (
              info?.map((item, index) => {
                return (
                  <Grid item xs={12} spacing={3}>
                    <LawAccordion
                      data={item}
                      collapse={collapse}
                      handleChange={handleChange}
                      expanded={expanded}
                      index={index}
                    />
                  </Grid>
                );
              })
            ) : (
              <NoData />
            )}
          </Grid>
        </Container>
      </Grid>
    </div>
  );
}

export default ChamberLaw;
