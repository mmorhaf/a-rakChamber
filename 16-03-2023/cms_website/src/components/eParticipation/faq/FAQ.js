import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import RemoveIcon from "@material-ui/icons/Remove";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/eParticipation/faq/faq";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import NoData from "../../shared/noData/NoData";

const {
  getAllPosts,
  getCategories,
  doNewsSearch,
  doNewsSearchReturned,
  loadingAction,
} = actions;

function FAQ({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "faq" });
  const isRateable = useRating();
  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  const [expanded, setExpanded] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [category, setCategory] = useState(null);
  const [keyword, setKeyword] = useState("");

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { faq: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const { post: { categories = [] } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );
  const searchReducers = useSelector((state) => state.search);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    const sort11 = "faq";
    dispatch(getAllPosts({ sort: sort11, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    let sort = "post";
    let subSort = "faq";
    let isFeatured = "false";
    let language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, subSort, isFeatured, language }));
  }, [isRTL]);

  useEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  const handleChangeC = (e) => {
    setCategory(e);
  };

  const onKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    if (!searchReducers?.doNewsSearchReturned?.success) return;
    setData(searchReducers?.doNewsSearchReturned?.results);
    dispatch(loadingAction({ loading: false }));
  }, [searchReducers?.doNewsSearchReturned]);

  const doSearch = () => {
    let language = isRTL ? "ar" : "en";
    let sort = "faq";
    const categoryId = category ? category?.id : null;
    dispatch(loadingAction({ loading: true }));
    dispatch(doNewsSearch({ data: { keyword, categoryId }, sort, language }));
  };

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const displayedContent = data;
  useEffect(() => {
    if (displayedContent) {
      const { count, requiredArr } = pagination(displayedContent, 6, pageNum);

      setPaginate({ requiredArr, pgCount: count });
    }
  }, [displayedContent, pageNum]);

  //End dividing process

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const accordionItem = (item) => {
    return (
      item && (
        <Accordion
          key={uid(item)}
          expanded={expanded === `panel${item.id}` || !collapse}
          onChange={handleChange(`panel${item.id}`)}
        >
          <AccordionSummary
            expandIcon={
              expanded === `panel${item.id}` || !collapse ? <RemoveIcon /> : "+"
            }
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
            className={expanded === `panel${item.id}` ? "border-bottom" : ""}
          >
            <Typography component="h2">{item.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              dangerouslySetInnerHTML={{
                __html: `${item.description}`,
              }}
            ></Box>
          </AccordionDetails>
        </Accordion>
      )
    );
  };

  useEffect(() => {
    if (!category && keyword === "" && posts) {
      setData(posts);
    }
  }, [keyword, category]);

  const accordion =
    paginate?.requiredArr?.length > 0
      ? paginate.requiredArr?.map((item) => accordionItem(item))
      : null;

  const storeType = () => {
    localStorage.setItem("question", JSON.stringify(true));
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <MainImage
            uuid={askingForRatingReturned?.pagePicture?.uuid}
            title={secondaryPage}
            link={secondaryPagePath}
          />
        </Grid>
        <Container maxWidth="lg" style={{ marginTop: "50px" }}>
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
                  id="category"
                  name="category"
                  value={category}
                  options={categories?.sort((a, b) =>
                    a.title > b.title ? 1 : -1
                  )}
                  getOptionLabel={(option) => option.title}
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
            </Grid>
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
                  label={t("FAQ.SEARCH.KEYWORD")}
                  onChange={onKeywordChange}
                  type="search"
                  value={keyword}
                />
              </form>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12} className={classes.btns}>
              <Button className={classes.searchBtn} onClick={doSearch}>
                {t("MEDIA.NEWS.SEARCH.BTN")}
              </Button>

              <Link to="/contactus/contactus">
                <Button
                  className={`${classes.searchBtn} ${classes.ask}`}
                  onClick={storeType}
                >
                  {t("FAQ.SEARCH.ASK")}
                </Button>
              </Link>
            </Grid>
          </Grid>
          {displayedContent?.length > 0 ? (
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
          <Grid item xs={12} className={classes.root}>
            {accordion}
          </Grid>
          {displayedContent?.length > 0 ? (
            <Pagination
              className={paginationClasses.root}
              count={paginate.pgCount}
              variant="outlined"
              shape="rounded"
              onChange={handlePaginationClick}
            />
          ) : (
            <NoData />
          )}
        </Container>
      </Grid>
    </Fragment>
  );
}

export default memo(FAQ);
