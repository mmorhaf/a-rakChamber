import React, { useEffect, useState, useCallback } from "react";
import { Grid, Button, Container, Box } from "@material-ui/core";
import LawAccordion from "../law/LawAccordion";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import actions from "../../../redux/actions";
import { BsArrowsExpand } from "react-icons/bs";
import { BsArrowsCollapse } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import useStyles from "../../../styles/components/aboutUs/polices";
import NoData from "../../shared/noData/NoData";

const { getAll, loadingAction } = actions;
function ChamberPolices({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "chamber-polices" });

  const dispatch = useDispatch();
  const [info, setInfo] = useState([]);
  const isRateable = useRating();
  const { alias } = useParams();

  const [expanded, setExpanded] = useState("panel0");
  const [collapse, setCollapse] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const reducers = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    let subSort = "generalPages";
    let categoryId = 23;
    const language = isRTL ? "ar" : "en";
    dispatch(getAll({ sort, subSort, categoryId, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (reducers?.crudReducers?.allReturned?.posts) {
      setInfo(reducers?.crudReducers?.allReturned?.posts);
      dispatch(loadingAction({ loading: false }));
    }
  }, [reducers]);

  const classes = useStyles();

  return (
    <Grid container style={{ marginBottom: "50px", flex: "1 1 auto" }}>
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
  );
}

export default ChamberPolices;
