import React, { useState, useLayoutEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import MainImage from "../../shared/mainImage/MainImage";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import UpperSection from "../../shared/upperSection/UpperSection";
import { Container } from "@material-ui/core";
import actions from "../../../redux/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CommentForm from "./CommentForm";
import useStyles from "../../../styles/components/eParticipation/opinion/opinionDetails";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
const { getPostByAlias, byAliasReturned, loadingAction } = actions;

function OpinionDetails({ match }) {
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
  } = useRoute({ match, subPage: "participation", category: "opinion" });
  const isRateable = useRating();

  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    postByAliasReturned,
    postByAliasReturned: { updatedAt = "" },
  } = useSelector((state) => state.posts_reducers);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";

    dispatch(getPostByAlias({ alias, language }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (postByAliasReturned.success) {
      const returnedData = postByAliasReturned;
      setData(returnedData);
      dispatch(loadingAction({ loading: false }));
    }
  }, [postByAliasReturned, alias]);
  const classes = useStyles();
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Grid container className={classes.root} ref={componentRef}>
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
        <Grid container item xs={12} className="opinionDetails">
          {data.success ? (
            <>
              <Grid item xs={12} className="opinionDetailsContainer">
                <Typography variant="h2" className="heading">
                  {data.title}
                </Typography>
                <Box component="span" className="fullDate">
                  {moment(data.startDate)
                    .format("DD MMM YYYY")
                    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
                </Box>
              </Grid>

              {data.consultation ? (
                <Grid container item xs={12} className={classes.textSection}>
                  <Typography variant="h2" className="heading">
                    {isRTL ? "موضوع الاستشارة:" : "Consultation Subject:"}
                  </Typography>
                  <Typography variant="span" className="heading">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${data.consultation}`,
                      }}
                    ></span>
                  </Typography>
                </Grid>
              ) : (
                ""
              )}

              {data.objective ? (
                <Grid container item xs={12} className={classes.textSection}>
                  <Typography variant="h2" className="heading">
                    {isRTL
                      ? "الهدف من الاستشارة:"
                      : "The objective of Consultation :"}
                  </Typography>
                  <Typography variant="span" className="heading">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${data.objective}`,
                      }}
                    ></span>
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
              {data.decision ? (
                <Grid container item xs={12} className={classes.textSection}>
                  <Typography variant="h2" className="heading">
                    {isRTL
                      ? "القرار المتوقع نتيجة الاستشارة:"
                      : "Expected decision as a result of Consultation :"}
                  </Typography>
                  <Typography variant="span" className="heading">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${data.decision}`,
                      }}
                    ></span>
                  </Typography>
                </Grid>
              ) : (
                ""
              )}

              {data.fullText ? (
                <Grid item xs={12} className="paragraph">
                  <span
                    dangerouslySetInnerHTML={{ __html: `${data.fullText}` }}
                  />
                </Grid>
              ) : null}

              <Grid item xs={12} md={10} className="comment">
                <Box className="commentForm">
                  <Typography
                    variant="h2"
                    component="h2"
                    className="commentTitle"
                  >
                    {t("PARTICIPATION.OPINIONS.COMMENT.TITLE")}
                  </Typography>
                  <CommentForm id={data.id} opinionPage={true} />
                </Box>
              </Grid>
            </>
          ) : null}
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(OpinionDetails);
