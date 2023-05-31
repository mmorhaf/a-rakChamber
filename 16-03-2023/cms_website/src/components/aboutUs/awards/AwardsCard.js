import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import * as moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getImage } from "../../shared/utils";
import useStyles from "./AwardStyle";

export default function AwardCard({ item }) {
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
    <Card className={classes.mediaCard}>
      <CardMedia image={`/api/file/download/${image?.uuid}?size=small`} />
      <Box className={classes.contentContainer}>
        <CardHeader
          title={
            <span className={classes.title}>
              {typeof item.title === "string"
                ? item.title
                : isRTL
                ? item.title.ar
                : item.title.en}
            </span>
          }
          subheader={
            <span className={classes.date}>
              {moment(item.privateDate)
                .format("MMM DD YYYY")
                .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
            </span>
          }
        />

        <CardContent>
          <span
            dangerouslySetInnerHTML={{
              __html: `${
                typeof item.title === "string"
                  ? item.description
                  : isRTL
                  ? item?.description.ar
                  : item?.description.en
              }`,
            }}
          ></span>
        </CardContent>
      </Box>
    </Card>
  );
}
