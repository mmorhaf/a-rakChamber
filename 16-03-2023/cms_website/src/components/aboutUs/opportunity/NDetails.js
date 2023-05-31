import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import moment from "moment";
import React from "react";
import NGallery from "./Gallery";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import { useSelector } from "react-redux";

function NDetails({ details }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Box>
      <Typography variant="h2">{details.title}</Typography>
      <Box component="span">
        {moment(details.startDate)
          .format("DD MMM YYYY")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
      </Box>
      <NGallery response={details} />
      {details.fullText ? (
        <Typography
          component="p"
          dangerouslySetInnerHTML={{ __html: `${details.fullText}` }}
        ></Typography>
      ) : null}
    </Box>
  );
}

export default React.memo(NDetails);
