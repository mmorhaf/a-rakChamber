import { Button, Container, Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/aboutUs/aboutUsMain";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import AwardCard from "./AwardsCard";
import NoData from "../../shared/noData/NoData";

const { doNewsSearchReturned, doNewsSearch, getAll, loadingAction } = actions;

export default function AboutChamber({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "awards" });

  const isRateable = useRating();
  const classes = useStyles();

  const dispatch = useDispatch();
  const { alias } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [returnedYear, setReturnedYear] = useState([]);
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const searchReducers = useSelector((state) => state.search);
  const { allReturned: { posts = [], years = [] } = {} } = useSelector(
    (state) => state.crudReducers
  );
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    let subSort = "awards";
    let categoryId = 21;
    dispatch(getAll({ sort, subSort, categoryId }));
  }, [isRTL]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "awards";
    let field = "privateDate";
    let language = isRTL ? "ar" : "en";
    dispatch(getAll({ sort, subSort, field, language }));
  }, [isRTL]);

  useEffect(() => {
    if (years.length)
      setReturnedYear(years?.filter((item) => String(item) !== "null"));
    dispatch(loadingAction({ loading: false }));
  }, [years]);

  useEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  useEffect(() => {
    if (!year && title === "" && posts) {
      setData(posts);
    }
  }, [year, title]);

  useEffect(() => {
    if (searchReducers?.doNewsSearchReturned?.success) {
      dispatch(loadingAction({ loading: false }));
      setData(searchReducers?.doNewsSearchReturned?.results);
    }
  }, [searchReducers?.doNewsSearchReturned]);

  const handleChange = (e) => {
    setYear(e);
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const doSearch = (yearInput, titleInput) => {
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "award";
    let year = yearInput ? yearInput : "";
    let title = titleInput;
    dispatch(doNewsSearch({ data: { title, year }, sort, language }));
  };

  return (
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
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(year, title);
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

          <Grid item sm={5} xs={12} className={classes.searchSelect}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                doSearch(year, title);
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
          <Grid item sm={1} xs={2} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={() => doSearch(year, title)}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.contents}>
          {data && data?.length > 0 ? (
            data?.map((item, index) => {
              // setImage(getImage([item?.photo], isRTL));
              return (
                <Grid item xs={12} spacing={3}>
                  <AwardCard item={item} />
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
