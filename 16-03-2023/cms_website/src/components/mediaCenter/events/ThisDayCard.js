import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImage } from "../../shared/utils";
import useStyles from "./ThisDayStyle";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
function ThisDayCard({ item }) {
  let [image, setImage] = useState([]);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  useEffect(() => {
    setImage(getImage(item?.files, isRTL));
  }, [item]);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className="media"
          image={`/api/file/download/${image.uuid}?size=small`}
          title={image.alt}
        />
        <CardContent>
          <Box className="date">
            <Typography component="span">
              {" "}
              {moment(item.privateDate)
                .format("MMM")
                .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
            </Typography>
            <Typography component="span">
              {moment(item.privateDate)
                .format("DD")
                .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
            </Typography>
          </Box>
          <Box className="content">
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>

            <Typography component="span" className="location">
              <span
                dangerouslySetInnerHTML={{
                  __html: `${
                    isRTL
                      ? item?.description?.replace("&nbsp;", " ")
                      : item.description
                  }`,
                }}
              ></span>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ThisDayCard;
