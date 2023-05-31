import React, { useEffect, useState, memo } from "react";
import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import * as moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";

function LastUpdate({ pageLastUpdate, location }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { lastUpdate } = useSelector(
    (state) => state.lastUpdate.lastUpdateReturned
  );

  const [data, setData] = useState("");

  if (!location) location = isRTL ? "للصفحة" : "page";

  useEffect(() => {
    const returnedData = pageLastUpdate ? pageLastUpdate : lastUpdate;

    if (!returnedData) return;
    setData(returnedData);
  }, [lastUpdate, pageLastUpdate]);
  return (
    <Box component="span" className="visitors lastUpdate">
      {" "}
      {isRTL
        ? `آخر تحديث ${location} في ${moment(data)
            .format("DD/MM/YYYY")
            .replace(/[٠-٩]/g, (l) => "٠١٢٣٤٥٦٧٨٩".indexOf(l))}`
        : `${location} last updated on ${moment(data)
            .format("DD/MMM/YYYY")
            .replace(/[٠-٩]/g, (y) => "٠١٢٣٤٥٦٧٨٩".indexOf(y))}`}
    </Box>
  );
}

export default memo(LastUpdate);
