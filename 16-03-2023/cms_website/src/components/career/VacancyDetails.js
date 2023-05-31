import React, { memo, useLayoutEffect, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@material-ui/core";
import { Container, Button } from "@material-ui/core";
import useRoute from "../shared/customHooks/useRoute";
import UpperSection from "../shared/upperSection/UpperSection";
import useRating from "../shared/customHooks/useRating";
import useStyles from "../../styles/components/career/careerDetail";
import { useTranslation } from "react-i18next";
import MediaCard from "../../components/shared/careerDetailsCard/MediaCard";
import actions from "../../redux/actions";
import MainImage from "../shared/mainImage/MainImage";
import Pagination from "@material-ui/lab/Pagination";
import { pagination } from "../shared/utils";
import Divider from "@material-ui/core/Divider";
import usePaginationStyles from "../../styles/components/shared/pagination/pagination";
import moment from "moment";
import CareersAccordion from "./CareersAccordion";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
const {
  getCareerByAlias,
  getAllCareers,
  getCareerByAliasReturned,
  loadingAction,
} = actions;

const VacancyDetails = ({ match }) => {
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
  } = useRoute({ match, subPage: "careers", category: "vacances" });
  const paginationClasses = usePaginationStyles();
  const isRateable = useRating();
  const { t } = useTranslation();
  //const { alias } = match.params;
  const { alias } = useParams();
  const { careerByAliasReturned } = useSelector((state) => state.careers);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [career, setCareer] = useState({});
  const [displayedContent, setDisplayedContent] = useState([]);

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getCareerByAlias({ alias, language }));

    return () => dispatch(getCareerByAliasReturned({ data: false }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    if (
      careerByAliasReturned?.success === false &&
      careerByAliasReturned?.message
    )
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (careerByAliasReturned.success) {
      const returnedData = careerByAliasReturned;
      setCareer(returnedData);
      dispatch(loadingAction({ loading: false }));
    }
  }, [careerByAliasReturned]);
  const { allCareersReturned } = useSelector((state) => state.careers);

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    if (!career?.department) return;
    dispatch(getAllCareers({ language, department: career?.department }));
  }, [isRTL, career.department]);

  useLayoutEffect(() => {
    const returnedData = allCareersReturned || [];
    if (returnedData.length) dispatch(loadingAction({ loading: false }));
    setData(returnedData);
  }, [allCareersReturned]);
  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });

  useLayoutEffect(() => {
    const displayedContent0 = data?.filter((item) => item?.id !== career.id);
    setDisplayedContent(displayedContent0);
  }, [data, career]);
  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const careerSection =
    paginate.requiredArr?.length > 0 &&
    paginate.requiredArr?.map((item) => {
      return (
        <Grid
          item
          sm={6}
          xs={12}
          style={{ marginTop: "6px", marginBottom: "6px" }}
        >
          <MediaCard
            item={item}
            link={`/careers/vacances/${item.alias}`}
            style={{ marginTop: "5px" }}
          />
        </Grid>
      );
    });

  const classes = useStyles();

  const zeroPad = (num, numZeros) => {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
    var zeroString = Math.pow(10, zeros).toString().substr(1);
    if (num < 0) zeroString = "-" + zeroString;
    return zeroString + n;
  };
  moment.locale(isRTL ? "ar-sa" : "en-au");

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
        </Grid>
        <Grid item xs={12} className="mediaContainer">
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.heading}>
              {career.title}
            </Typography>
            <Typography variant="h6" className={classes.date}>
              {t("CAREER.CARD.FROM")}{" "}
              <span className={classes.dateDirection}>
                {" "}
                {moment(career.startTime)
                  .format("DD MMM y")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}{" "}
              </span>{" "}
              {t("CAREER.CARD.TO")}{" "}
              <span className={classes.dateDirection}>
                {" "}
                {moment(career.endTime)
                  .format("DD MMM y")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>
            </Typography>
          </Grid>

          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.REFERENCE")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {zeroPad(career.id, 3)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.DEPARTMENT")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {t(`CAREER.DEPARTMENTS.${career.department}`)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography paragraph variant="span" className={classes.label}>
              {t("CAREER.CARD.CLASSIFICATION")} :
            </Typography>
            <Typography
              paragraph
              variant="span"
              className={classes.MainParagraph}
            >
              {t(`CAREER.LEVEL.${career.level}`)}
            </Typography>
          </span>
        </Grid>
        <Grid item xs={12}>
          <CareersAccordion career={career} />
        </Grid>
        {career.isActive ? (
          <Link
            to={`/careers/vacances/${alias}/apply`}
            className={classes.btnLink}
          >
            <Button className="applyBtn">{t("CAREER.BTN")}</Button>
          </Link>
        ) : (
          <Button className="applyBtn" disabled={!career.isActive}>
            {t("CAREER.BTN")}
          </Button>
        )}

        <Grid item xs={12} className={classes.latest}>
          <Grid item xs={12} className="latestHeader">
            <Grid item className="heading">
              <Typography variant="h2">{t("CAREER.RELATED")}</Typography>
            </Grid>
            <Grid item xs className="divider">
              <Divider />
            </Grid>
          </Grid>

          <Grid container xs={12}>
            {careerSection}
          </Grid>
        </Grid>
        {displayedContent?.length > 0 ? (
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
export default memo(VacancyDetails);
