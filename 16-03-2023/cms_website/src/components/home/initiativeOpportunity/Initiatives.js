import Box from "@material-ui/core/Box";
import { Typography, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/common/sectionHeader";
import Ad from "./Ad";
import InitiativesTabs from "./InitiativesTabs";
import { useTranslation } from "react-i18next";
const { getAllPosts } = actions;
function Initiatives() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const language = isRTL ? "ar" : "en";
  const { advertisments: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  useEffect(() => {
    dispatch(
      getAllPosts({ sort: "initiatives", language, limit: 9, offset: 0 })
    );
    dispatch(
      getAllPosts({
        sort: "investmentOpportunities",
        language,
        limit: 9,
        offset: 0,
      })
    );
    dispatch(
      getAllPosts({ sort: "advertisments", isFeatured: false, language })
    );
  }, [isRTL]);

  const classes = useStyles();
  return (
    <Box style={{ position: "relative" }}>
      <Grid
        container
        className={classes.root}
        style={{ justifyContent: posts.length ? "flex-end" : "center" }}
      >
        <Grid item xs={12} className={`title hiddenOnSmall initiativeTitl`}>
          <Container maxWidth="lg" style={{ minHeight: "unset" }}>
            <Typography variant="h1" gutterBottom>
              {t("HOME.INITIATIVE.HEADER")}
            </Typography>
          </Container>
        </Grid>
        {posts.length ? (
          <Grid item xs={12} sm={6} md={4}>
            <Ad />
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          sm={posts.length ? 6 : 12}
          md={posts.length ? 8 : 12}
          className={`initiatives ${classes.tabsContainer}`}
        >
          <Grid item xs={12} className={`title hiddenTitle initiativeTitl`}>
            <Container maxWidth="lg" style={{ minHeight: "unset" }}>
              <Typography variant="h1" gutterBottom>
                {t("HOME.INITIATIVE.HEADER")}
              </Typography>
            </Container>
          </Grid>
          <InitiativesTabs />
        </Grid>
      </Grid>
    </Box>
  );
}

export default memo(Initiatives);
