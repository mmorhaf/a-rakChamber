import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlippableCard from "./FlippableCard";
import Pagination from "@material-ui/lab/Pagination";
import Grid from "@material-ui/core/Grid";
import { pagination } from "../../../shared/utils";
import { uid } from "react-uid";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/eParticipation/polls/archived";
import usePaginationStyles from "../../../../styles/components/shared/pagination/pagination";
import NoData from "../../../shared/noData/NoData";

const { getAllSurveys, loadingAction } = actions;

function ActivePoll() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { poll: { surveys = [] } = {} } = useSelector(
    (state) => state.surveys.allSurveysReturned
  );

  const dispatch = useDispatch();

  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";

    const sort = "poll";
    dispatch(getAllSurveys({ sort, language }));
  }, [isRTL]);

  const requiredPolls = useCallback((polls) => {
    const finalData = [];

    polls.map((poll) => {
      if (typeof poll.question !== "string") return null;

      const questions = JSON.parse(`${poll.question}`);

      questions.pages?.map((page) => {
        if (!page.elements) return null;

        page.elements.map((element) => {
          if (element.type !== "radiogroup") return null;

          element["id"] = poll.id;
          element["postedDate"] = poll.startDate;
          finalData.push(element);
        });
      });
    });
    return finalData;
  }, []);

  useEffect(() => {
    if (!surveys.length) dispatch(loadingAction({ loading: false }));
    if (!surveys.length) return;
    const returnedData = requiredPolls(surveys);

    setData(returnedData);
    dispatch(loadingAction({ loading: false }));
  }, [surveys, requiredPolls]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({ count: 0, requiredArr: [] });

  const displayedContent = data;

  useEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 2, pageNum);
    setPaginate({ count, requiredArr });
  }, [pageNum, displayedContent]);
  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const renderCards = useMemo(
    () =>
      paginate.requiredArr?.length > 0 &&
      paginate.requiredArr?.map((item) => {
        return <FlippableCard key={uid(item)} item={item} />;
      }),
    [paginate.requiredArr]
  );

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  return (
    <Grid container className={classes.root}>
      <Grid container item>
        <Grid container item>
          {paginate.requiredArr?.length ? renderCards : <NoData />}
        </Grid>
      </Grid>
      {data && data?.length > 0 ? (
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

export default memo(ActivePoll);
