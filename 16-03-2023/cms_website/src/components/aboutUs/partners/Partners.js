import { Box, Button, Container, Grid } from "@material-ui/core";
import clsx from "clsx";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import PartnerAccordion from "./PartnerAccordion";
import PartnersCards from "./PartnersCards";
import useStyles from "./style";

const { getAllPartners, loadingAction, byAliasReturned, getCategoryByAlias } =
  actions;

function Partners({ match }) {
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
  } = useRoute({ match, subPage: "aboutus", category: "partners" });

  const [partnersCategory, setPartnersCategory] = useState({
    description: "",
  });

  const isRateable = useRating();
  const classes = useStyles();

  const [category, setcategory] = useState([]);
  const [sum, setSum] = useState(0);

  const [expanded, setExpanded] = useState("panel0");
  const [collapse, setCollapse] = useState(true);

  const handleChange = useCallback(
    (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    },
    []
  );

  const dispatch = useDispatch();

  const reducer = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const { categoryByAliasReturned, lastUpdate = "" } = useSelector(
    (state) => state.category
  );

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useLayoutEffect(() => {
    const language = isRTL ? "ar" : "en";
    dispatch(getCategoryByAlias({ alias: "partners", language }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    const response = categoryByAliasReturned;
    if (response.success) {
      setPartnersCategory({ response: response.description });
    }
  }, [categoryByAliasReturned, isRTL, alias]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getAllPartners({ language: language }));
  }, [isRTL]);

  useEffect(() => {
    if (reducer?.crudReducers?.allPartnersReturned?.result) {
      dispatch(loadingAction({ loading: false }));
      setcategory(reducer?.crudReducers?.allPartnersReturned?.result);
    }
  }, [reducer?.crudReducers?.allPartnersReturned]);

  useEffect(() => {
    let total = 0;

    category.map((item, index) => {
      total = total + item?.posts?.length;
    });
    setSum(total);
  }, [category]);

  let image = [
    { src: "/assets/images/green.png" },
    { src: "/assets/images/pink.png" },
    { src: "/assets/images/sky.png" },
    { src: "/assets/images/blue.png" },
    { src: "/assets/images/Partner5.png" },
    { src: "/assets/images/Partner6.png" },
    { src: "/assets/images/Partner7.png" },
    { src: "/assets/images/Partner8.png" },
    { src: "/assets/images/Partner9.png" },
    { src: "/assets/images/Partner10.png" },
  ];
  let image1 = { src: "/assets/images/total.png" };

  return (
    <Grid container>
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
        <Grid item xs={12} style={{ marginTop: "50px" }}>
          <span className={classes.ourPartner}>
            {isRTL ? "شركاؤنا" : "our partners"}
          </span>
          {partnersCategory && partnersCategory && partnersCategory.response ? (
            <span
              className={classes.title}
              dangerouslySetInnerHTML={{
                __html: `${partnersCategory ? partnersCategory.response : ""}`,
              }}
            ></span>
          ) : null}
        </Grid>
        <Grid container style={{ marginTop: "30px" }}>
          <Grid item md={4} sm={12} xs={12} className={classes.total}>
            <Grid
              item
              md={10}
              sm={12}
              xs={12}
              className={clsx(classes.category1, classes.tg)}
            >
              <PartnersCards type="total" sum={sum} image1={image1.src} />
            </Grid>
          </Grid>
          <Grid item md={8} sm={12} xs={12} className={classes.categories}>
            {category.map((item, index) => {
              return (
                <Grid item md={6} sm={5} xs={12} className={classes.category}>
                  <PartnersCards
                    item={item}
                    sum={sum}
                    image={
                      index < 9
                        ? image[index]?.src
                        : image[Math.floor(index % 9)].src
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {category && category?.length > 0 ? (
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
        {category.map((item, index) => {
          return (
            <Grid item xs={12} className={classes.partnerAcc}>
              <PartnerAccordion
                item={item}
                isRTL={isRTL}
                collapse={collapse}
                handleChange={handleChange}
                expanded={expanded}
                index={index}
              />
            </Grid>
          );
        })}
      </Container>
    </Grid>
  );
}

export default Partners;
