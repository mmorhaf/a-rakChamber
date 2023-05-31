import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import MediaCard from "../../components/shared/careerDetailsCard/MediaCard";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/career/career";
import usePaginationStyles from "../../styles/components/shared/pagination/pagination";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import MainImage from "../shared/mainImage/MainImage";
import UpperSection from "../shared/upperSection/UpperSection";
import { pagination } from "../shared/utils";
import NoData from "../shared/noData/NoData";

const { getAllCareers, doNewsSearchReturned, loadingAction } = actions;

const { doNewsSearch } = actions;
const Vacances = ({ match }) => {
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
  } = useRoute({ match, subPage: "careers", category: "vacances" });
  const dispatch = useDispatch();

  const isRateable = useRating();
  const { t } = useTranslation();
  // const { carouselImages } = content;
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState(null);
  const [classifications, setClassifications] = useState(null);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { allCareersReturned } = useSelector((state) => state.careers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const searchReducers = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getAllCareers({ language }));
  }, [isRTL]);

  useLayoutEffect(() => {
    const returnedData = allCareersReturned || [];

    if (returnedData.length) setData(returnedData);
    dispatch(loadingAction({ loading: false }));
  }, [allCareersReturned]);

  useEffect(() => {
    return () => dispatch(doNewsSearchReturned({ data: false }));
  }, []);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const careerSection =
    paginate?.requiredArr && paginate?.requiredArr?.length ? (
      paginate.requiredArr.map((item) => (
        <Grid item md={6} sm={6} xs={12} key={uid(item)}>
          <MediaCard item={item} link={`/careers/vacances/${item.alias}`} />
        </Grid>
      ))
    ) : (
      <NoData />
    );

  useEffect(() => {
    if (!classifications && !department && title === "" && allCareersReturned) {
      setData(allCareersReturned);
    }
  }, [classifications, department, title]);

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  const onNameChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClassificationChange = (e) => {
    setClassifications(e);
    setMsg("");
  };
  const handleDepartmentChange = (e) => {
    setDepartment(e);
  };
  useEffect(() => {
    if (!searchReducers?.doNewsSearchReturned?.success) return;
    setData(searchReducers?.doNewsSearchReturned?.results);
    dispatch(loadingAction({ loading: false }));
  }, [searchReducers?.doNewsSearchReturned]);

  const doSearch = (departmentInput) => {
    if (!classifications) {
      setMsg(t("CAREER.REQUIRED"));
      return;
    }
    let language = isRTL ? "ar" : "en";
    let sort = "career";
    let level = classifications?.value;
    let department = departmentInput ? departmentInput?.value : "";
    dispatch(loadingAction({ loading: true }));
    dispatch(
      doNewsSearch({ data: { title, department, level }, sort, language })
    );
  };

  return (
    <Grid className={classes.root}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
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
          <Grid item xs={12} className={classes.search}>
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
                  doSearch(department);
                }}
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
              >
                <Autocomplete
                  id="classifications"
                  name="classifications"
                  value={classifications}
                  options={[
                    { title: t("CAREER.CREATIVE"), value: "creative" },
                    { title: t("CAREER.LEADER"), value: "leader" },
                  ]}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => {
                    handleClassificationChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("CAREER.SEARCH.CLASSIFICATION")}
                      required
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
              <Box component="span" className="error">
                {msg}
              </Box>
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
                  doSearch(department);
                }}
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
              >
                <Autocomplete
                  id="department"
                  name="department"
                  value={department}
                  options={[
                    {
                      title: t("CAREER.DIRECTOR"),
                      value: "directorGeneralOffice",
                    },
                    {
                      title: t("CAREER.CHAIRMAN"),
                      value: "chairmanOffice",
                    },
                    {
                      title: t("CAREER.HR"),
                      value: "humanResourcesDepartment",
                    },
                    {
                      title: t("CAREER.CORPORATE"),
                      value: "corporateCommunicationOffice",
                    },
                    {
                      title: t("CAREER.IT"),
                      value: "informationTechnologyDepartment",
                    },
                    {
                      title: t("CAREER.FINANCIAL"),
                      value: "financialAffairsDepartment",
                    },
                    {
                      title: t("CAREER.EVENT"),
                      value: "eventCoordinationDepartment",
                    },
                  ]}
                  getOptionLabel={(option) => option?.title}
                  onChange={(e, value) => {
                    handleDepartmentChange(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={t("CAREER.SEARCH.DEPARTMENT")}
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
            <Grid item lg={3} md={3} sm={3} xs={12}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  doSearch(department);
                }}
                noValidate
                autoComplete="off"
                className={classes.searchTitle}
              >
                <TextField
                  id="standard-basic"
                  label={t("CAREER.SEARCH.NAME")}
                  onChange={onNameChange}
                  value={title}
                  type="search"
                />
              </form>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={12} className={classes.btns}>
              <Button
                className={classes.searchBtn}
                onClick={(e) => doSearch(department)}
              >
                {t("MEDIA.NEWS.SEARCH.BTN")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2} className="mediaContainer">
          {careerSection}
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
};
export default memo(Vacances);
