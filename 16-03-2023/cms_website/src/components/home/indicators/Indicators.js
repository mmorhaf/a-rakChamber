import { Box } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { memo, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import VisibilitySensor from "react-visibility-sensor";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/indicators/indicators";
import { getImage } from "../../shared/utils";

const { getAllPosts } = actions;

function Statistics() {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { indicators: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const dispatch = useDispatch();
  const language = isRTL ? "ar" : "en";

  useEffect(() => {
    dispatch(getAllPosts({ sort: "indicators", language }));
  }, [isRTL]);

  useEffect(() => {
    const returnedData = posts;
    if (!returnedData.length) return;
    returnedData.splice(4);
    setData(returnedData);
  }, [posts]);

  const handleChange = (isVisible) => {
    if (!visible) setVisible(isVisible);
    //to prevent it from running the animation after the first appearance
  };

  const classes = useStyles();

  const renderCards = data.map((card, index) => {
    const image = getImage(card.files, isRTL);
    const count = card.extraData ? card.extraData.count : 0;

    return (
      <Card key={uid(card)} className="cardContainer">
        <CardContent>
          <Box className="contentContainer">
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="description"
            >
              {card.title}
            </Typography>
            <Box className="icnNnum">
              <CardMedia
                className="iconPhoto"
                image={`/api/file/download/${image.uuid}?size=small`}
                title={image.alt}
              />
              <Typography gutterBottom component="span" className="number">
                <VisibilitySensor
                  onChange={handleChange}
                  partialVisibility={"bottom"}
                  offset={{
                    bottom: 20,
                  }}
                  delayedCall
                >
                  <CountUp
                    start={0}
                    end={visible ? count : 0}
                    duration={count > 500 ? 3 : 6}
                  />
                </VisibilitySensor>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  });

  return (
    <Box className={classes.root}>
      <Box className="cardsContainer">{data.length ? renderCards : null}</Box>
    </Box>
  );
}

export default memo(Statistics);
