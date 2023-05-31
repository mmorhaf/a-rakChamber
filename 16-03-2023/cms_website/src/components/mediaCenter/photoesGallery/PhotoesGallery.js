import {
  Button,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Container,
} from "@material-ui/core";
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
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/photoesGallery";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import { getImage, pagination } from "../../shared/utils";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import NoData from "../../shared/noData/NoData";
const {
  getCategories,
  doNewsSearch,
  doNewsSearchReturned,
  loadingAction,
  getAll,
} = actions;

function PhotoesGallery({ match }) {
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
  } = useRoute({ match, subPage: "media", category: "photos-gallery" });
  const isRateable = useRating();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [returnedYear, setReturnedYear] = useState([]);
  const dispatch = useDispatch();
  const reducer = useSelector((state) => state);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const { image: { categories = [], lastUpdate = "" } = {} } = useSelector(
    (state) => state.category.categoriesReturned
  );

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "image";
    const language = isRTL ? "ar" : "en";
    dispatch(getCategories({ sort, isFeatured: false, language }));
  }, []);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "category/years";
    let subSort = "image";
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

  const searchReducers = useSelector((state) => state.search);
  const handleChange = (e) => {
    setYear(e);
  };
  const onChange = (e) => {
    setTitle(e.target.value);
  };
  useEffect(() => {
    if (searchReducers?.doNewsSearchReturned?.success) {
      setData(searchReducers?.doNewsSearchReturned?.results);
      dispatch(loadingAction({ loading: false }));
    }
  }, [searchReducers?.doNewsSearchReturned]);

  useEffect(() => {
    return () => dispatch(doNewsSearchReturned({ data: false }));
  }, []);

  useEffect(() => {
    if (!year && title === "" && categories) {
      setData(categories);
    }
  }, [title, year]);

  useLayoutEffect(() => {
    const returnedData = categories;
    if (returnedData.length) setData(returnedData);
    dispatch(loadingAction({ loading: false }));
  }, [categories]);

  const doSearch = (yearInput, titleInput) => {
    dispatch(loadingAction({ loading: true }));
    let language = isRTL ? "ar" : "en";
    let sort = "photo/gallery";
    let year = yearInput;
    let title = titleInput;

    dispatch(doNewsSearch({ data: { title, year }, sort, language }));
  };
  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 4, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const photoesGallerySection = useMemo(
    () =>
      paginate.requiredArr?.length > 0 ? (
        paginate.requiredArr?.map((album) => {
          const image = getImage(album.files, isRTL);

          return (
            <Grid key={uid(album)} item md={6} xs={12}>
              <Link to={`/media/photos-gallery/${album.alias}`}>
                <Card className="card">
                  <CardHeader
                    subheader={album.title}
                    title={moment(album.startDate)
                      .format("DD MMM YYYY")
                      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                  />

                  <CardActionArea>
                    <CardMedia
                      className="albumPhoto"
                      image={`/api/file/download/${image.uuid}?size=small`}
                      title={image.alt}
                    />
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })
      ) : (
        <NoData />
      ),
    [isRTL, paginate.requiredArr]
  );

  return (
    <Grid container className={classes.photoesRoot} ref={componentRef}>
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
          <Grid item lg={4} md={4} sm={4} xs={12}>
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
                value={title}
                onChange={onChange}
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
          <Grid item lg={4} md={4} sm={4} xs={12} className={classes.btns}>
            <Button
              className={classes.searchBtn}
              onClick={() => doSearch(year, title)}
            >
              {t("MEDIA.NEWS.SEARCH.BTN")}
            </Button>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid container item sm={8} xs={12} className="albums">
            {photoesGallerySection}
          </Grid>
        </Grid>
        {data && data?.length > 0 ? (
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

export default memo(PhotoesGallery);
