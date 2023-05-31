import React from "react";
import {
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Card,
  Typography,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { getImage } from "../../shared/utils";
import useStyles from "../../../styles/components/mediaCenter/publications";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import HtmlParser from "html-react-parser";

export function Cards({ data }) {
  const { t } = useTranslation();

  const classes = useStyles();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const image = getImage(data?.files, isRTL);
  return (
    <div>
      <Grid items className={classes.card}>
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={`/api/file/download/${image?.uuid}?size=small`}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {HtmlParser(data?.title)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data?.description?.en}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/media/publications/publications/${data.alias}`}></Link>
            <Button className={classes.btn}>{t("PUBLICATIONS.BTN")}</Button>
          </CardActions>
        </Card>
      </Grid>
    </div>
  );
}
