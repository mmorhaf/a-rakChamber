import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { RiArrowDropRightFill, RiArrowDropRightLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/sitemap/sitemap";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import MainImage from "../shared/mainImage/MainImage";
import UpperSection from "../shared/upperSection/UpperSection";

const { reqSitemap } = actions;

function SiteMap({ match }) {
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
    subPage: "sitemap",
    category: "sitemap",
  });

  const isRateable = useRating();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { returnedSitemap = [] } = useSelector((state) => state.sitemap);

  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(reqSitemap());
  }, []);

  useEffect(() => {
    if (!returnedSitemap.length) return;

    const sitemap = returnedSitemap.find((item) => item.title.en === "header");
    if (!sitemap) return;

    setData(sitemap.childrens);
  }, [returnedSitemap, isRTL]);

  const renderSubMenu = useCallback(
    (item, grandchild = false) => {
      return (
        <Box className="childList">
          {item.childrens.map((child) => {
            return (
              <Box key={uid(child)} className="navLinkChild">
                <Link to={child.link}>
                  {!grandchild ? (
                    <RiArrowDropRightFill className="icon" />
                  ) : (
                    <RiArrowDropRightLine className="grandchild" />
                  )}
                  <span>{isRTL ? child.title.ar : child.title.en}</span>
                </Link>
                {child.childrens?.length > 0 && renderSubMenu(child, true)}
              </Box>
            );
          })}
        </Box>
      );
    },
    [isRTL]
  );

  const renderMenu = useMemo(() => {
    return data.map((item) => {
      return (
        <Grid item sm={4} xs={12} key={uid(item)} className="navLink">
          <Typography variant="h2">
            {isRTL ? item.title.ar : item.title.en}
          </Typography>
          {item.childrens.length > 0 ? (
            renderSubMenu(item)
          ) : (
            <Box className="childList">
              <Box key={uid(item)} className="navLinkChild">
                <Link to={item.link}>
                  <RiArrowDropRightFill className="icon" />
                  {isRTL ? item.title.ar : item.title.en}
                </Link>
              </Box>
            </Box>
          )}
        </Grid>
      );
    });
  }, [data, renderSubMenu, isRTL]);

  const classes = useStyles();

  return (
    <>
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
            singlePage={true}
          />
        </Grid>
        <Grid container className={classes.root}>
          {renderMenu}
        </Grid>
      </Container>
    </>
  );
}

export default memo(SiteMap);
