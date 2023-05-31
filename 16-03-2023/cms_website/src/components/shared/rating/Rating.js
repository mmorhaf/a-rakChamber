import React, { useLayoutEffect, useState, Fragment, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import actions from "../../../redux/actions";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const { addFeedback } = actions;

function RatingComponent({ number, readOnly, needTitle = true }) {
  const { t } = useTranslation();

  const { sendFeedBackReturned } = useSelector((state) => state.rate);

  const dispatch = useDispatch();

  const [value, setValue] = useState(1);

  useLayoutEffect(() => {
    if (number) setValue(number);
  }, [number]);

  const sendFeedBack = (newValue) => {
    const data = {};
    data["url"] = `${window.location.href}`;
    data["rate"] = Number(newValue);
    data["reason"] = "reason";

    dispatch(addFeedback({ data }));
  };

  return (
    <Fragment>
      {needTitle && (
        <Typography variant="h2" className="rateTitle">
          {t("RATE")}
        </Typography>
      )}
      <Rating
        value={value}
        disabled={Boolean(sendFeedBackReturned)}
        name="unique-rating"
        onChange={(event, newValue) => {
          setValue(newValue);
          sendFeedBack(newValue);
        }}
        readOnly={readOnly}
      />
    </Fragment>
  );
}

export default memo(RatingComponent);
