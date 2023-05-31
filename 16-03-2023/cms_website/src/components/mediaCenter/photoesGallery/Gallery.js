import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import React, { Fragment, memo, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import SharedCarousel from "../../shared/carousel/Carousel";
function PhGallery({ response }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [data, setData] = useState({
    photoGl: {},
    images: [],
  });

  useLayoutEffect(() => {
    const photoGl = response;

    const images = [];

    photoGl.files.map((image) => {
      function pushImg(img) {
        images.push({
          src: `/api/file/download/${img.uuid}?size=medium`,
          thumbnail: `/api/file/download/${img.uuid}?size=medium`,
        });
      }

      if (image.publishMode === 1 && isRTL) pushImg(image);
      else if (image.publishMode === 2 && !isRTL) pushImg(image);
    });

    setData({ photoGl, images });
  }, [response, isRTL]);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Fragment>
      <Box className="albumDetails">
        <Typography variant="h2" gutterBottom>
          {data.photoGl.title}
        </Typography>
        <Typography variant="span" component="span" gutterBottom>
          {moment(data.photoGl.startDate)
            .format("DD MMM YYYY")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
        </Typography>
      </Box>
      <SharedCarousel items={data.images} />
    </Fragment>
  );
}

export default memo(PhGallery);
