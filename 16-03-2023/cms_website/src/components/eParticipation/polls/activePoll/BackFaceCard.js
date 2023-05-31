import React, { memo, useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../redux/actions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import { uid } from "react-uid";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import { useTranslation } from "react-i18next";

const { getAnswersById } = actions;

function BackFaceCard({ item, lastUpdate, setShowResults, showResults,homePage }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { t } = useTranslation();

  const { answers = [] } = useSelector(
    (state) => state.surveys.surveyAnswersReturned
  );

  const dispatch = useDispatch();

  moment.locale(isRTL ? "ar-sa" : "en-au");

  const [data, setData] = useState([]);
  const [results, setResults] = useState([]);

  useLayoutEffect(() => {
    const id = item.id;
    dispatch(getAnswersById({ id }));
  }, []);

  useLayoutEffect(() => {
    const returnedData = answers;

    if (!returnedData.length) return;
    setData(returnedData);
  }, [answers, isRTL]);

  useLayoutEffect(() => {
    if (!data.length) return;

    if (data.length) {
      const results = [];

      item.choices.map((choice) => {
        const value = choice.value;
        let rate = 0;

        data.map((answer) => {
          if (answer.answerData[item.name] === value) {
            rate += 1;
          }
          return null;
        });

        results.push({
          name:
            typeof choice.text === "string"
              ? choice.text
              : isRTL
              ? choice?.text?.ar
              : choice?.text?.default,
          rate: Math.round((rate * 100) / data.length),
        });

        return null;
      });

      setResults(results);
    }
  }, [data, isRTL, item]);

  const handleClick = () => {
    setShowResults(!showResults);
  };

  return (
    <Box className="cardContainer card-back">
      <CardContent className="cardContentContainer">
        <Box className="title">
          <Typography variant="h2" gutterBottom>
            {typeof item.title === "string"
              ? item.title
              : isRTL
              ? item.title?.ar
              : item.title?.default}
          </Typography>
         {!homePage? <Box component="span">
            {isRTL ? "تاريخ النشر" : "Post Date"}:{" "}
            {moment(item.postedDate)
              .format("DD MMMM, YYYY")
              .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
          </Box>:null}
        </Box>
        <Box className="pollContainer">
          {results &&
            results.map((choice) => {
              const { name, rate } = choice;
              return (
                <Box key={uid(choice)} className="patrialContainer">
                  <Box component="span" className="name">
                    {name}
                  </Box>
                  <Box className="boxContainer">
                    <Box className="outerBox">
                      <Box
                        className="innerBox"
                        style={{ width: `${rate}%` }}
                      ></Box>
                    </Box>
                    <Box component="span" className="rate">{`${rate}%`}</Box>
                  </Box>
                </Box>
              );
            })}
          {!results.length &&
            item.choices &&
            item.choices.map((choice) => {
              return (
                <Box key={uid(choice)} className="patrialContainer">
                  <Box component="span" className="name">
                    {typeof item.title === "string"
                      ? item.title
                      : isRTL
                      ? item.title?.ar
                      : item.title?.default}
                  </Box>
                  <Box className="boxContainer">
                    <Box className="outerBox">
                      <Box
                        className="innerBox"
                        style={{ width: `${0}%` }}
                      ></Box>
                    </Box>
                    <Box component="span" className="rate">{`${0}%`}</Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
        <Box className="votesNBtn">
          <Button onClick={() => handleClick()}>
            {t("HEADER.TOOLS.BACK")}
          </Button>
          {/* <Box component="span">Total Votes: {data.length}</Box> */}
        </Box>
      </CardContent>
    </Box>
  );
}

export default memo(BackFaceCard);
