import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import React from "react";
import { useSelector } from "react-redux";
import NGallery from "./Gallery";
import HtmlParser from "html-react-parser";

function NDetails({ details }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Box>
      <Typography variant="h2">{HtmlParser(details.title)}</Typography>
      <Box component="span">
        {moment(details.startDate)
          .format("DD MMM YYYY")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
      </Box>
      <Box>
        <NGallery response={details} />
      </Box>
      <Typography
        component="p"
        dangerouslySetInnerHTML={{ __html: `${details.fullText}` }}
      ></Typography>
    </Box>
  );
}

export default React.memo(NDetails);
