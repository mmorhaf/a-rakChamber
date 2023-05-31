import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import useStyles from "../../../styles/components/aboutUs/boardOfDirector";
import { getImage } from "../../shared/utils";
export default function DirectorsCard({ data, isRTL }) {
  const classes = useStyles();
  let [image, setImage] = useState();

  useEffect(() => {
    setImage(getImage(data?.files, isRTL));
  }, []);
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`/api/file/download/${image?.uuid}?size=small`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.position}
        >
          {data?.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.name}
        >
          {data?.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
