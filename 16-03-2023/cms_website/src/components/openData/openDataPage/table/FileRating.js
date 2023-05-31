import React, { memo, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../../redux/actions";
import Rating from "@material-ui/lab/Rating";

const { rateFileAction } = actions;

function RatingComponent({ id }) {
  const { fileRatingReturned } = useSelector((state) => state.rate);

  const [rate, setRate] = useState({ count: 1, disabled: false });

  useEffect(() => {
    if (!fileRatingReturned.success) return;
    const returnedRate = fileRatingReturned;
    const isRatedFile = returnedRate.id === id;

    if (!isRatedFile) return;

    setRate({
      count: isRatedFile ? returnedRate.rate : rate.count,
      disabled: isRatedFile,
    });
  }, [fileRatingReturned, id]);

  const dispatch = useDispatch();

  const sendFeedBack = useCallback(
    (newValue) => {
      const data = {};

      data["rate"] = Number(newValue);
      data["id"] = Number(id);

      dispatch(rateFileAction({ data }));
    },
    [id]
  );

  return (
    <Rating
      value={rate.count || 1}
      disabled={rate.disabled}
      name={`unique-rating-${id}`}
      onChange={(event, newValue) => {
        sendFeedBack(newValue);
      }}
    />
  );
}

export default memo(RatingComponent);
