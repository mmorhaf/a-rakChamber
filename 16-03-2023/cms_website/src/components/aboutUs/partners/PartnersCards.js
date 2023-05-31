import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

function PartnersCards({ type, item, sum, image, image1 }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={type === "total" ? image1 : image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {type === "total"
            ? isRTL
              ? "جميع الشركاء"
              : "Total partners"
            : isRTL
            ? item.title.ar
            : item?.title?.en}
        </Typography>

        <span style={{ display: "flex", height: "42px" }}>
          <Typography gutterBottom variant="h5" component="div" className="no">
            {type === "total" ? sum : item?.posts?.length}
          </Typography>
          <span className="parper">
            <Typography variant="body2" color="text.secondary" className="part">
              {isRTL ? "الشركاء" : " partners"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="percent"
            >
              {type === "total"
                ? "100%"
                : Math.round((item.posts.length * 100) / sum) + " % "}
            </Typography>
          </span>
        </span>
      </CardContent>
    </Card>
  );
}
export default PartnersCards;
