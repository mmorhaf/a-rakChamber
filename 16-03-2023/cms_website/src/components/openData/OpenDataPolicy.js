import React, { useEffect, useState } from "react";
import MainImage from "../shared/mainImage/MainImage";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import UpperSection from "../shared/upperSection/UpperSection";
import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { List } from "reactstrap";
import useStyles from "../../styles/components/openData/openDataPolicy";
import { useSelector, useDispatch } from "react-redux";

import actions from "../../redux/actions";

const { getPostByAlias, loadingAction } = actions;
export default function OpenDataPolicy({ match }) {
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
  } = useRoute({ match, subPage: "open", category: "policy" });
  const isRateable = useRating();
  const classes = useStyles();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const {
    basicTheme,
    basicTheme: { isRTL, isDark },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const { postByAliasReturned = {} } = useSelector(
    (state) => state.posts_reducers
  );

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    let sort = "post";
    const language = isRTL ? "ar" : "en";
    let alias = "openDatas";
    dispatch(getPostByAlias({ sort, alias, language }));
  }, [isRTL, alias]);

  useEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (!postByAliasReturned.success) return;

    setData(postByAliasReturned);
    dispatch(loadingAction({ loading: false }));
  }, [postByAliasReturned]);

  return (
    <Grid item className={classes.root} ref={componentRef}>
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
        <Grid item xs={12} className="actualContent">
          <Box>
            <Typography component="h2">
              {isRTL ? "سياسة البيانات المفتوحة" : "Open data policy "}
            </Typography>

            <List>
              <Typography
                component="h3"
                id="nested-list-subheader"
                className={classes.header2}
              >
                {isRTL ? "أهداف السياسة" : "The policy goals"}
              </Typography>
              <Typography
                component="h3"
                id="nested-list-subheader"
                className={classes.header2}
              >
                {isRTL
                  ? "تهدف هذه السياسة إلى توضيح السياسات الخاصة بإدارة البيانات المفتوحة على الموقع وفقًا لما يلي:"
                  : `This policy aims to clarify policies on the management of open
                data on the website according to:`}
              </Typography>
              <Typography
                component="span"
                id="nested-list-subheader"
                className={classes.subheader}
              >
                {isRTL ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${data?.extraData?.arGoals}`,
                    }}
                  ></span>
                ) : (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${data?.extraData?.enGoals}`,
                    }}
                  ></span>
                )}
              </Typography>
            </List>

            <Typography component="h3" className={classes.header2}>
              {isRTL ? "منطقة التطبيق" : "Application area"}
            </Typography>
            <Typography component="p" className={classes.subheader}>
              {isRTL ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.arApp}`,
                  }}
                ></span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.enApp}`,
                  }}
                ></span>
              )}
            </Typography>
            <List>
              <Typography
                component="h3"
                id="nested-list-subheader"
                className={classes.header2}
              >
                {isRTL
                  ? "شروط إعادة استخدام البيانات المفتوحة"
                  : "Terms of re-use of open data"}{" "}
              </Typography>
              <Typography component="p" className={classes.subheader}>
                {isRTL ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${data?.extraData?.arTerms}`,
                    }}
                  ></span>
                ) : (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${data?.extraData?.enTerms}`,
                    }}
                  ></span>
                )}
              </Typography>
            </List>
            <Typography component="h3" className={classes.header2}>
              {isRTL
                ? "مسؤولية غرفة تجارة و صناعة رأس الخيمة"
                : "The responsibility of RAK Chamber of Commerce and Industry"}
            </Typography>
            <Typography component="p" className={classes.subheader}>
              {isRTL ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.arMinisitry}`,
                  }}
                ></span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.enMinisitry}`,
                  }}
                ></span>
              )}
            </Typography>
            <Typography component="h3" className={classes.header2}>
              {isRTL
                ? "مسؤولية بيانات المستخدم"
                : "The responsibility of the user data"}
            </Typography>
            <Typography component="p" className={classes.subheader}>
              {isRTL ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.arResponsibility}`,
                  }}
                ></span>
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `${data?.extraData?.enResponsibility}`,
                  }}
                ></span>
              )}
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Grid>
  );
}
