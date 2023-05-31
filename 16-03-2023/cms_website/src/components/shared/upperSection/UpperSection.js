import React, { memo } from "react";
import BreadCrumb from "../breadCrumb/BreadCrumb";
import Rating from "../rating/Rating";
import FeedBackBtns from "../feedbackBtns/FeedBackBtns";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import useStyles from "../../../styles/components/shared/upperSection/upperSection";

function UpperSection({
  main,
  mainPath,
  secondaryPage,
  secondaryPagePath,
  detailsPage,
  alias,
  apply,
  name,
  isRateable,
  componentRef,
  anchorRef,
  singlePage,
  dynamic,
  pageName,
  secondaryPageName,
  link,
  secondaryPageLink,
}) {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.root}>
      <Box className="bcrContainer">
        <Box className="breadCrumb">
          <BreadCrumb
            main={main}
            mainPath={mainPath}
            secondaryPage={secondaryPage}
            secondaryPagePath={secondaryPagePath}
            detailsPage={detailsPage}
            alias={alias}
            apply={apply}
            name={name}
            singlePage={singlePage}
            dynamic={dynamic}
            pageName={pageName}
            secondaryPageName={secondaryPageName}
            link={link}
            secondaryPageLink={secondaryPageLink}
          />
        </Box>
        <Box className="ratingNBtns">
          <Box className="rtaing">
            <Rating
              number={Math.ceil(isRateable?.rate)}
              readOnly={!isRateable?.askForRating}
            />
          </Box>
          <Box className="btns">
            <FeedBackBtns componentRef={componentRef} anchorRef={anchorRef} />
          </Box>
        </Box>
      </Box>
    </Grid>
  );
}

export default memo(UpperSection);
