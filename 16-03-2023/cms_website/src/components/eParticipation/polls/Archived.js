import React, { useState, useLayoutEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { pagination } from "../../shared/utils";
import useStyles from "../../../styles/components/eParticipation/polls/archived";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import NoData from "../../shared/noData/NoData";

const { getArchivedPolls, loadingAction } = actions;

function ArchivedComponent() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { surveys } = useSelector(
    (state) => state?.surveys?.ArchivedAnswersReturned
  );
  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    dispatch(loadingAction({ loading: true }));

    const language = isRTL ? "ar" : "en";
    dispatch(getArchivedPolls({ language }));
  }, [isRTL]);

  const getPackage = useCallback(
    (surveys) => {
      const data = [];
      console.log(surveys, "surveys");
      surveys.map((survey) => {
        const parsedSurvey = JSON.parse(survey.surveyQuestions);
        const archivedData = [];
        if (parsedSurvey?.pages[0] && parsedSurvey?.pages[0]?.elements) {
          const title = parsedSurvey?.pages[0]?.elements[0]?.title;
          const name = parsedSurvey.pages[0]?.elements[0]?.name;
          const choices = parsedSurvey.pages[0]?.elements[0]?.choices;
          const answers = survey.surveyAnsers;

          choices.map((choice) => {
            const value = choice.value;
            let rate = 0;

            answers.map((answer) => {
              if (JSON.parse(answer.answer)[name] === value) {
                rate += 1;
              }
              return null;
            });

            archivedData.push({
              name:
                typeof choice.text === "string"
                  ? choice.text
                  : isRTL
                  ? choice?.text?.ar
                  : choice?.text?.default,
              rate: Math.round((rate * 100) / answers.length) || 0,
            });

            return null;
          });

          data.push({
            q: title,
            result: archivedData,
            totalVotes: answers.length,
          });

          return null;
        }
      });

      return data;
    },
    [isRTL]
  );

  useLayoutEffect(() => {
    if (!surveys?.length) dispatch(loadingAction({ loading: false }));
    if (!surveys?.length) return;

    const returnedData = getPackage(surveys);
    setData(returnedData);

    dispatch(loadingAction({ loading: false }));
  }, [surveys, getPackage]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({ count: 0, requiredArr: [] });

  const displayedContent = data;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 3, pageNum);
    console.log(requiredArr, "requiredArr");
    setPaginate({ count, requiredArr });
  }, [pageNum, displayedContent]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        {paginate.requiredArr?.length > 0 ? (
          paginate.requiredArr?.map((item) => {
            return (
              <Card key={uid(item)} className="cardContainer">
                <CardContent className="cardContentContainer">
                  <Box className="title">
                    <Typography variant="h2" gutterBottom>
                      {typeof item.q === "string"
                        ? item?.q
                        : isRTL
                        ? item?.q?.ar
                        : item?.q?.default}
                    </Typography>
                    <Box component="span">
                      {isRTL ? "عدد المصوتين: " : "Total Votes:"}{" "}
                      {item.totalVotes}
                    </Box>
                  </Box>

                  <Box className="pollContainer">
                    {item.result.map((poll) => {
                      const { name, rate } = poll;
                      return (
                        <Box key={uid(poll)} className="patrialContainer">
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
                            <Box
                              component="span"
                              className="rate"
                            >{`${rate}%`}</Box>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                  {/* <Box className="totalVotes">
                  <Box component="span"></Box>
                </Box> */}
                </CardContent>
              </Card>
            );
          })
        ) : (
          <NoData />
        )}
      </Grid>
      {data?.length > 0 ? (
        <Grid item xs={12}>
          <Pagination
            className={paginationClasses.root}
            count={paginate.count}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}

export default memo(ArchivedComponent);
