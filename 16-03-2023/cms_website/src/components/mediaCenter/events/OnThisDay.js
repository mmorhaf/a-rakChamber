import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./ThisDayStyle";
import ThisDayCard from "./ThisDayCard";
import { useTranslation } from "react-i18next";
import actions from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import NoData from "../../shared/noData/NoData";
const { getAllPosts } = actions;

function OnThisDay() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [data, setData] = useState([]);
  useEffect(() => {
    let sort = "eventsOnThisDay";
    const language = isRTL ? "ar" : "en";

    dispatch(getAllPosts({ sort, isFeatured: false, language }));
  }, [isRTL]);
  const reducers = useSelector((state) => state);

  useEffect(async () => {
    setData(reducers?.posts_reducers?.allPostsReturned?.eventsOnThisDay?.posts);
  }, [reducers]);

  const dataContent =
    data?.length > 0 ? (
      data?.map((item, index) => {
        if (index === 0 || index === 1)
          return (
            <div key={item.id}>
              <ThisDayCard item={item} />
            </div>
          );
      })
    ) : (
      <NoData card={true} />
    );
  return (
    <Grid container className={classes.OnThisDay}>
      <Grid item xs={12}>
        <Typography
          paragraph
          variant="P"
          className={classes.aboutMainParagraph}
        >
          {t("MEDIA.EVENTS.ONTHISDAY")}
        </Typography>
        <div className={classes.tb}></div>
        {dataContent}
      </Grid>
    </Grid>
  );
}

export default OnThisDay;
