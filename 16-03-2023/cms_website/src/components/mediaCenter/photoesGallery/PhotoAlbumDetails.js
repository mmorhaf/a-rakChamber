import React, { useState, useLayoutEffect, memo } from "react";
import Gallery from "./Gallery";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@material-ui/core/Grid";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/mediaCenter/photoAlbumDetails";
import useRoute from "../../shared/customHooks/useRoute";
import MainImage from "../../shared/mainImage/MainImage";
import UpperSection from "../../shared/upperSection/UpperSection";
import useRating from "../../shared/customHooks/useRating";
import { Container } from "@material-ui/core";
const { getCategoryByAlias, byAliasReturned, loadingAction } = actions;

function PhotoAlbumDetails({ match }) {
  const { alias } = match.params;

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { categoryByAliasReturned, lastUpdate = "" } = useSelector(
    (state) => state.category
  );
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();
  const [gallery, setGallery] = useState({
    children: false,
    response: false,
  });

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getCategoryByAlias({ alias, language }));
  }, [isRTL, alias]);

  useLayoutEffect(() => {
    return () => dispatch(byAliasReturned({ data: false }));
  }, []);

  useLayoutEffect(() => {
    const response = categoryByAliasReturned;
    if (response?.success === false && response?.message)
      window.location?.replace(isRTL ? "/ar/not-found" : "/en/not-found");
    if (response.success) {
      if (response.childrens.length === 0) {
        setGallery({ children: false, response });
        dispatch(loadingAction({ loading: false }));
      } else {
        const galleries = [];
        galleries.push(response);
        response.childrens.map((child) => galleries.push(child));

        setGallery({ children: true, response: galleries });

        dispatch(loadingAction({ loading: false }));
      }
    }
  }, [categoryByAliasReturned, isRTL, alias]);
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
  } = useRoute({ match, subPage: "media", category: "photos-gallery" });
  const isRateable = useRating();
  const classes = useStyles();
  return (
    <Grid container className={classes.photoesRoot} ref={componentRef}>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={secondaryPage}
          link={secondaryPagePath}
        />
      </Grid>
      <Container maxWidth="lg" className={classes.page}>
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
        <Grid container className={classes.detailedPhotoesRoot}>
          <Grid item xs={12} className="actualContent">
            {!gallery.children && gallery.response && (
              <Gallery response={gallery.response} />
            )}
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
}

export default memo(PhotoAlbumDetails);
