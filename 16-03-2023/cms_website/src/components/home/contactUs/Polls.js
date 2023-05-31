import Grid from "@material-ui/core/Grid";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../styles/components/home/contactUs/polls";
import NoData from "../../shared/noData/NoData";
import FlippableCard from ".././../../components/eParticipation/polls/activePoll/FlippableCard";

function Polls() {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const {
    allSurveysReturned: { poll: { surveys = [] } = {} },
  } = useSelector((state) => state.surveys);

  const [item, setItem] = useState({});

  const getRequiredPoll = useCallback((returnedData) => {
    const polls = returnedData.filter(
      (poll) => poll.avilableQuestions === true
    );

    if (!polls.length) return;

    const items = requiredPoll(polls);

    function requiredPoll(polls) {
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

      return finalData.length ? finalData : [];
    }

    const data = items.length ? items[0] : {};
    setItem(data);
  }, []);

  useEffect(() => {
    if (!surveys.length) return;
    getRequiredPoll(surveys);
  }, [surveys, getRequiredPoll]);

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      {item?.id ? (
        <Grid item xs={12} className="cardContentContainer">
          <FlippableCard item={item} homePage={true}/>
        </Grid>
      ) : (
        <NoData card={true} />
      )}
    </Grid>
  );
}

export default memo(Polls);
