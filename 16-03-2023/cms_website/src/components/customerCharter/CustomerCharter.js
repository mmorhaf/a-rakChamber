import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography } from "@material-ui/core";
import { Container } from "@material-ui/core";
import useRoute from "../shared/customHooks/useRoute";
import UpperSection from "../shared/upperSection/UpperSection";
import useRating from "../shared/customHooks/useRating";
import MainImage from "../shared/mainImage/MainImage";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/customerCharter/customerCharter";

const { getPostByAlias } = actions;

function CustomerCharter({ match }) {
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
  } = useRoute({
    match,
    subPage: "customerCharter",
    category: "customerCharter",
  });

  const isRateable = useRating();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { postByAliasReturned } = useSelector((state) => state.posts_reducers);

  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState({});

  useEffect(() => {
    let alias = "customer-charter";
    const language = isRTL ? "ar" : "en";
    dispatch(getPostByAlias({ alias, language }));
  }, [isRTL]);

  useEffect(() => {
    if (postByAliasReturned?.success === false && postByAliasReturned?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (!postByAliasReturned.success) return;

    setData(postByAliasReturned);
  }, [postByAliasReturned]);

  const classes = useStyles();

  return (
    <Grid>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container
        maxWidth="lg"
        style={{ marginTop: "50px", minHeight: "calc(100vh - 370px)" }}
      >
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
            singlePage={true}
          />
        </Grid>
        <Grid container item xs={12} spacing={2} className={classes.root}>
          {data.success && data.fullText ? (
            <Typography
              component="p"
              className="actualContent"
              dangerouslySetInnerHTML={{
                __html: `${data.fullText}`,
              }}
            ></Typography>
          ) : null}
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(CustomerCharter);
