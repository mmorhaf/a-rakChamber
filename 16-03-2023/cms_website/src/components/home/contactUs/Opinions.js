import React, { memo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../../styles/components/home/contactUs/opinions";
import { Grid } from "@material-ui/core";
import { uid } from "react-uid";
import moment from "moment";
import { useTranslation } from "react-i18next";
import NoData from "../../shared/noData/NoData";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
function Opinions() {
  const { t } = useTranslation();

  const { opinions: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = posts;
    if (!returnedData.length) return;
    setData(returnedData[0]);
  }, [posts]);

  const classes = useStyles();
  const renderCard = useCallback((data) => {
    return (
      <Card key={uid(data)} className="cardContainer">
        <CardContent>
          <Box component="span" className="date">
            {moment(data.startDate)
              .format("DD/MMM/ YYYY")
              .replace(/[٠-٩]/g, (y) => "٠١٢٣٤٥٦٧٨٩".indexOf(y))}
          </Box>
          <Typography variant="h2" component="h2" className="title">
            {data.title}
          </Typography>

          <Typography
            variant="body2"
            component="p"
            className="text"
            dangerouslySetInnerHTML={{
              __html: `${data?.description}`,
            }}
          ></Typography>
        </CardContent>
      </Card>
    );
  }, []);

  return (
    <Grid container className={classes.root}>
      {data.id ? (
        <Grid item xs={12} className="contentContainer">
          {renderCard(data)}
        </Grid>
      ) : (
        <NoData card={true} morePaddingTop={true} />
      )}
      {data.id && data.alias ? (
        <Grid item xs={12} className="btnContainer">
          <Link to={`/participation/opinion/${data.id && data.alias}`}>
            <Button variant="outlined">{isRTL ? "شارك" : "participate"}</Button>
          </Link>
          <Link to={`/participation/opinion`}>
            <Button variant="outlined">
              {isRTL ? "عرض الكل" : "view all"}
            </Button>
          </Link>
        </Grid>
      ) : null}
    </Grid>
  );
}

export default memo(Opinions);
