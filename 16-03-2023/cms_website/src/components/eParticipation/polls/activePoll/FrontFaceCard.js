import React, { memo } from "react";
import { useSelector } from "react-redux";
import ActiveForm from "./ActiveForm";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";

function FrontFaceCard({ item, lastUpdate, setShowResults, showResults,homePage }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Card className="cardContainer card-front">
      <CardContent className={homePage?"":"cardContentContainer"}>
        <Box className="title">
          <Typography variant="h2" gutterBottom>
            {typeof item.title === "string"
              ? item.title
              : isRTL
              ? item.title?.ar
              : item.title?.default}
          </Typography>
       {!homePage?   <Box component="span">
            {isRTL ? "تاريخ النشر" : "Post Date"}:{" "}
            {moment(item.postedDate)
              .format("DD MMMM, YYYY")
              .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
          </Box>:null}
        </Box>
        <Box className="formContainer">
          <ActiveForm
            item={item}
            setShowResults={setShowResults}
            showResults={showResults}
            homePage={homePage}
          />
        </Box>
        <Box className="totalVotes">
          <Box component="span">{item.date}</Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default memo(FrontFaceCard);
