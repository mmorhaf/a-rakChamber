import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useStyles from "../../../styles/components/eParticipation/opinion/opinionDetails";
import useRating from "../../shared/customHooks/useRating";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import IdeasForm from "./IdeasForm";

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
  } = useRoute({ match, subPage: "participation", category: "ideas" });
  const isRateable = useRating();

  const { t } = useTranslation();

  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const classes = useStyles();
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
          <Grid item xs={12} className="opinionDetailsContainer">
            <Typography variant="h2" className="heading">
              {t("IDEA.HEADING")}
            </Typography>{" "}
          </Grid>
          <Grid item xs={12} className="paragraph">
            {/* <span dangerouslySetInnerHTML={{ __html: `${data.fullText}` }} /> */}
            {t("IDEA.DESC")}
          </Grid>

          <Grid item xs={12} md={10} className="comment">
            <Box className="commentForm">
              <IdeasForm />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(OpinionDetails);
