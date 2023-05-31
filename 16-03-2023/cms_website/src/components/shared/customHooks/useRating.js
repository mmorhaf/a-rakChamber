import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
const { askForRate, askForRateReturned, addFeedbackReturned } = actions;

function useRating() {
  let { alias } = useParams();
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const dispatch = useDispatch();
  const [isRateable, setIsRateable] = useState({});

  useLayoutEffect(() => {
    // if (!alias) return;
    const url = window.location.href;
    dispatch(askForRate({ url }));
    return () => {
      dispatch(askForRateReturned({ data: false }));
      dispatch(addFeedbackReturned({ data: false }));
    };
  }, [window.location.href]);

  useEffect(() => {
    if (!askingForRatingReturned) return;
    setIsRateable(askingForRatingReturned);
  }, [askingForRatingReturned]);

  return isRateable;
}

export default useRating;
