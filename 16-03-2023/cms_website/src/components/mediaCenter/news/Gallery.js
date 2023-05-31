import React, { Fragment, memo, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import SharedCarousel from "../../shared/carousel/Carousel";

function NGallery({ response }) {
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

      if (!image.mimetype.includes("image")) return null;

      if (image.publishMode === 1 && isRTL) pushImg(image);
      else if (image.publishMode === 2 && !isRTL) pushImg(image);
    });

    setData({ photoGl, images });
  }, [response, isRTL]);

  return (
    <Fragment>
      <SharedCarousel items={data.images} />
    </Fragment>
  );
}

export default memo(NGallery);
