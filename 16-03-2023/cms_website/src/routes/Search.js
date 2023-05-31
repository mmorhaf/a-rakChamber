import { Container, TextField, Button, Box } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import useRating from "../components/shared/customHooks/useRating";
import useRoute from "../components/shared/customHooks/useRoute";
import MainImage from "../components/shared/mainImage/MainImage";
import UpperSection from "../components/shared/upperSection/UpperSection";
import { pagination } from "../components/shared/utils";
import actions from "../redux/actions";
import useStyles from "../styles/components/search/search";
import usePaginationStyles from "../styles/components/shared/pagination/pagination";
import { unescapeHTML } from "../utils/publicFunctions";

const { doSearchReturned, doSearch, getData, loadingAction } = actions;

function Search({ match }) {
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
  } = useRoute({ match, subPage: "search", category: "search" });

  const isRateable = useRating();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { searchDataReturned, searchData } = useSelector(
    (state) => state.search
  );
  const reducer = useSelector((state) => state);

  console.log(reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [sections, setSections] = useState([]);
  const [section, setSection] = useState();
  const [title, setTitle] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  // Get sections array
  useEffect(() => {
    let sort = "search/sections";
    dispatch(getData({ sort }));
  }, [isRTL]);

  useEffect(() => {
    if (searchData && searchData?.phrase) setTitle(searchData?.phrase);
  }, [searchData]);

  useEffect(() => {
    if (reducer?.crudReducers?.dataReturned)
      setSections(reducer?.crudReducers?.dataReturned?.sections);
  }, [reducer]);
  console.log(reducer?.crudReducers, "sections");
  const handleChange = (e) => {
    setSection(e);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  // include section with condition if no section
  const handleSearch = () => {
    setPageNum(1);
    let sections = section?.key;
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    let data = { phrase: title };
    if (section?.key) data = { phrase: title, sections };
    dispatch(
      doSearch({
        data,
        language,
      })
    );
  };

  useEffect(() => {
    if (searchDataReturned === false && data.length) {
      setData([]);
      return;
    }
    if (searchDataReturned.success) {
      dispatch(loadingAction({ loading: false }));
      setData(searchDataReturned.result);
    }
  }, [searchDataReturned, data]);
  //Divide the total array into the required part
  useLayoutEffect(() => {
    const displayedContent = data;
    const { count, requiredArr } = pagination(displayedContent, 4, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [pageNum, data]);
  //End dividing process

  const hightLightMatched = useCallback(
    (str) => {
      const matchedData = searchData?.phrase;
      let re = new RegExp(`${matchedData}`, "gi");
      return str?.replace(
        re,
        `<mark style="background-color: yellow;"  >${matchedData}</mark>`
      );
    },
    [searchData]
  );

  const renderResults =
    paginate.requiredArr?.length &&
    paginate.requiredArr?.map((item) => {
      return (
        <Link key={uid(item)} to={item.url} className="containerLink">
          <Card variant="outlined">
            <Typography
              component="h3"
              dangerouslySetInnerHTML={{
                __html: unescapeHTML(hightLightMatched(item.title || "")),
              }}
            ></Typography>
            <Typography
              dangerouslySetInnerHTML={{
                __html: unescapeHTML(hightLightMatched(item.description || "")),
              }}
            ></Typography>
          </Card>
        </Link>
      );
    });

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={
            searchData
              ? `${t("SEARCH.SEARCRESULTS")}: ${searchData?.phrase}`
              : t("SEARCH.START")
          }
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
            singlePage={true}
          />
        </Grid>
        <Grid item xs={12} className={classes.search}>
          <Grid item lg={4} md={4} sm={4} xs={12}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch(title);
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <TextField
                id="standard-basic"
                type="search"
                placeholder={t("MEDIA.NEWS.SEARCH.TITLE")}
                value={title}
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
                handleSearch(title);
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <Autocomplete
                id="year"
                name="year"
                value={section?.key}
                options={sections}
                getOptionLabel={(option) =>
                  isRTL ? String(option?.title?.ar) : String(option?.title?.en)
                }
                onChange={(e, value) => {
                  handleChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Sections"
                    fullWidth
                    className={classes.blue}
                  />
                )}
                PaperComponent={({ children }) => (
                  <Paper
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {children}
                  </Paper>
                )}
                className={classes.select}
              />
            </form>
          </Grid>
          <Box item lg={4} md={4} sm={4} xs={12} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={() => handleSearch()}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className="searchContainer">
          {renderResults}
          {!data.length && <h1>{t("SEARCH.NORESULTS")}</h1>}
        </Grid>
        {data.length > 0 ? (
          <Grid item xs={12} className="pagination">
            <Pagination
              className={paginationClasses.root}
              count={paginate.pgCount}
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

export default Search;
