import React, { useEffect, useState } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core";
import LawAccordion from "../aboutUs/law/LawAccordion";
import MainImage from "../shared/mainImage/MainImage";
import UpperSection from "../shared/upperSection/UpperSection";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { BsArrowsExpand } from "react-icons/bs";
import { BsArrowsCollapse } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/aboutUs/polices";
import NoData from "../shared/noData/NoData";

const { getAll, loadingAction } = actions;
function PrivacyPolicy({ match }) {
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
  } = useRoute({ match, subPage: "privacyPolicy", category: "privacy-policy" });

  const isRateable = useRating();

  const dispatch = useDispatch();
  const [info, setInfo] = useState([]);

  const { alias } = useParams();

  const { allReturned } = useSelector((state) => state.crudReducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    let sort = "post";
    let subSort = "generalPages";
    let categoryId = 25;
    const language = isRTL ? "ar" : "en";
    dispatch(loadingAction({ loading: true }));
    dispatch(getAll({ sort, subSort, categoryId, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (allReturned?.posts) setInfo(allReturned?.posts);
    dispatch(loadingAction({ loading: false }));
  }, [allReturned]);

  const [expanded, setExpanded] = useState("panel0");
  const [collapse, setCollapse] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();

  return (
    <div className={classes.minHeight76}>
      <Grid container style={{ marginBottom: "50px" }}>
        <Grid item xs={12}>
          <MainImage
            uuid={askingForRatingReturned?.pagePicture?.uuid}
            title={secondaryPage}
            link={secondaryPagePath}
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
              apply={apply}
              alias={alias}
              name={name}
              isRateable={isRateable}
              componentRef={componentRef}
              anchorRef={anchorRef}
              singlePage={true}
            />
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
          {info?.length > 0 ? (
            info?.map((item, index) => {
              return (
                <Grid item xs={12} spacing={3}>
                  <LawAccordion
                    type="policy"
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
        </Container>
      </Grid>
    </div>
  );
}

export default PrivacyPolicy;
