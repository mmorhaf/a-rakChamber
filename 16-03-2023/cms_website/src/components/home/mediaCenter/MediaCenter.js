import { Typography, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/common/sectionHeader";
import MediaCenterTabs from "./MediaCenterTabs";

const { getAllPosts, getCategories, listAllLinks, getTopPublications, getAll } =
  actions;
function MediaCenter() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const language = isRTL ? "ar" : "en";

  useEffect(() => {
    dispatch(getCategories({ sort: "post", isFeatured: true, language }));
    dispatch(
      getAllPosts({
        sort: "news",
        isFeatured: false,
        limit: 6,
        offset: 0,
        categoryId: 5,
        language,
      })
    );
    dispatch(
      getAll({
        sort: "post",
        subSort: "news",
        isFeatured: false,
        limit: 6,
        offset: 0,
        categoryId: 6,
        language,
      })
    );
    dispatch(getCategories({ sort: "image", language }));
    dispatch(getTopPublications({ language }));
    dispatch(listAllLinks({ language }));
  }, [isRTL]);
  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid item xs={12} className="title">
        <Container maxWidth="lg" style={{ minHeight: "unset" }}>
          <Typography variant="h1" gutterBottom>
            {t("HOME.MEDIA.HEADER")}
          </Typography>
        </Container>
      </Grid>

      <Grid
        item
        xs={12}
        className={classes.tabsContainer}
        id="introMediaCenter"
      >
        <MediaCenterTabs />
      </Grid>
    </Container>
  );
}

export default memo(MediaCenter);
