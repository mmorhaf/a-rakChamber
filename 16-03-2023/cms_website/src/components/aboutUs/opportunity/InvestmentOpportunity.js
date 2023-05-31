import { Button, Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import InvCard from "./InvCard";
import useStyles from "./style";
import NoData from "../../shared/noData/NoData";
const {
  getAllPosts,
  doNewsSearchReturned,
  doNewsSearch,
  getAll,
  loadingAction,
} = actions;
function InvestmentOpportunity({ match }) {
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
  } = useRoute({
    match,
    subPage: "investmentOpportunity",
    category: "investment",
  });

  const isRateable = useRating();

  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const { t } = useTranslation();
  const [data, setData] = useState();
  const [returnedYear, setReturnedYear] = useState([]);
  const dispatch = useDispatch();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const searchReducers = useSelector((state) => state.search);

  const reducer = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  useEffect(() => {
    if (
      reducer?.posts_reducers?.allPostsReturned?.investmentOpportunities
        ?.success
    )
      setData(
        reducer?.posts_reducers?.allPostsReturned?.investmentOpportunities.posts
      );
    dispatch(loadingAction({ loading: false }));
  }, [reducer?.posts_reducers?.allPostsReturned?.investmentOpportunities]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "investmentOpportunities";
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
    let sort = "investmentOpportunities";

    const language = isRTL ? "ar" : "en";

    dispatch(loadingAction({ loading: true }));
    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);

  useEffect(() => {
    if (searchReducers?.doNewsSearchReturned?.success) {
      setData(searchReducers?.doNewsSearchReturned?.results);
      dispatch(loadingAction({ loading: false }));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (
      !year &&
      title === "" &&
      reducer?.posts_reducers?.allPostsReturned?.investmentOpportunities?.posts
    ) {
      setData(
        reducer?.posts_reducers?.allPostsReturned?.investmentOpportunities.posts
      );
    }
  }, [year, title]);

  const doSearch = () => {
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "investment";

    dispatch(doNewsSearch({ data: { title, year }, sort, language }));
  };

  const handleChange = (e) => {
    setYear(e);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={isRTL ? "الفرص الإستثمارية" : "Investment Opportunity"}
          // link={secondaryPagePath}
        />
      </Grid>

      <Container maxWidth="lg" style={{ marginTop: "30px" }}>
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
                label={isRTL ? "اسم الفرصة" : "Name of the Opportunity"}
                onChange={onChange}
                value={title}
                type="search"
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
            <Button className={classes.searchBtn} onClick={doSearch}>
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>

        <Grid container>
          {data?.length ? (
            data.map((item) => {
              return (
                <Grid item sm={4} xs={12}>
                  <InvCard item={item} />
                </Grid>
              );
            })
          ) : (
            <NoData />
          )}
        </Grid>
      </Container>
    </Grid>
  );
}

export default InvestmentOpportunity;
