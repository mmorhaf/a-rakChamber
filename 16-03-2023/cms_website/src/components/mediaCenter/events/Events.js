import { Button, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import moment from "moment";
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
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/events";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import EventCard from "../../shared/cards/EventCard";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import NoData from "../../shared/noData/NoData";
import UpperSection from "../../shared/upperSection/UpperSection";
import { pagination } from "../../shared/utils";
import ETable from "./ETable";
import OnThisDay from "./OnThisDay";
const {
  getAllPosts,
  doNewsSearch,
  doNewsSearchReturned,
  loadingAction,
  getAll,
} = actions;

function Events({ match }) {
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
  } = useRoute({ match, subPage: "media", category: "events" });

  const isRateable = useRating();

  const [lastYears, setLastYears] = useState([]);
  useEffect(() => {
    const year = moment(new Date()).format("YYYY");
    lastYears.push(year, year - 1, year - 2);
  }, []);
  const [counter, setCounert] = useState(0);
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const searchReducers = useSelector((state) => state.search);
  const { events: { posts = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const reducer = useSelector((state) => state);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [eventName, setName] = useState("");
  const [type, setType] = useState(null);
  const [year, setYear] = useState(null);
  const [returnedYear, setReturnedYear] = useState([]);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e);
  };
  const handleYearChange = (e) => {
    setYear(e);
  };

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "events";
    const language = isRTL ? "ar" : "en";
    dispatch(getAllPosts({ sort, isFeatured: false, order: "DESC", language }));
  }, [isRTL]);

  useLayoutEffect(() => {
    if (posts.length) setData(posts);
    dispatch(loadingAction({ loading: false }));
  }, [posts]);

  useEffect(() => {
    return () => dispatch(doNewsSearchReturned({ data: false }));
  }, []);

  useEffect(() => {
    if (!year && !type && eventName === "" && posts) {
      setData(posts);
    }
  }, [eventName, year, type]);

  const doSearch = () => {
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "events";
    let classification = type
      ? !isRTL
        ? type
        : type === "خارجي"
        ? "External"
        : "Internal"
      : null;
    let title = eventName;

    dispatch(
      doNewsSearch({ data: { title, year, classification }, sort, language })
    );
  };

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post/years";
    let subSort = "events";
    let field = "activeFrom";
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
    if (searchReducers?.doNewsSearchReturned?.success)
      setData(searchReducers?.doNewsSearchReturned?.results);
    dispatch(loadingAction({ loading: false }));
  }, [searchReducers?.doNewsSearchReturned]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useLayoutEffect(() => {
    if (!data.length) return;

    let array = data.filter(
      (item) =>
        Number(moment(item.privateDate).format("YYYY")) ===
        Number(lastYears[value])
    );
    let displayedContent = array;

    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [data, pageNum, value]);

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);

    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum, value]);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  const eventsSection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 ? (
        paginate.requiredArr?.map((item) => {
          return (
            <Grid item md={6} sm={12} xs={12} key={uid(item)}>
              <EventCard item={item} />
            </Grid>
          );
        })
      ) : (
        <NoData />
      ),
    [paginate.requiredArr]
  );
  useEffect(() => {
    let newCounter = 0;
    data?.files?.map((file) => {
      if (file?.mimetype?.includes("application")) {
        newCounter = newCounter + 1;
      }
      // {
      //   file?.mimetype?.includes("image") ?
      // }
    });
    setCounert(newCounter);
  }, [data.details]);

  return (
    <Grid container className={classes.eventsRoot}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className={classes.page}>
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
                doSearch();
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <TextField
                id="standard-basic"
                label={t("MEDIA.EVENTS.SEARCH.NAME")}
                value={eventName}
                onChange={handleNameChange}
                type="search"
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
                doSearch();
              }}
              noValidate
              autoComplete="off"
              className={classes.searchTitle}
            >
              <Autocomplete
                id="type"
                name="type"
                value={type}
                options={[
                  t("MEDIA.EVENTS.EXTERNAL"),
                  t("MEDIA.EVENTS.INTERNAL"),
                ]}
                getOptionLabel={(option) => String(option)}
                onChange={(e, value) => {
                  handleTypeChange(value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={t("MEDIA.EVENTS.SEARCH.TYPE")}
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
            {" "}
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
            </form>
          </Grid>
          <Grid item lg={3} md={3} sm={3} xs={12} className={classes.btns}>
            <Button className={classes.searchBtn} onClick={doSearch}>
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid container item md={9} sm={8} xs={12} className="events">
            {eventsSection}
          </Grid>

          <Grid
            container
            item
            md={3}
            sm={4}
            xs={12}
            className={classes.EOnThisDay}
          >
            <OnThisDay />
          </Grid>
        </Grid>

        <Grid container item xs={12} className={classes.table}>
          {counter > 0 ? <ETable /> : ""}
        </Grid>

        {data?.length > 0 ? (
          <Pagination
            className={paginationClasses.root}
            count={paginate.pgCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        ) : null}
      </Container>
    </Grid>
  );
}
export default memo(Events);
