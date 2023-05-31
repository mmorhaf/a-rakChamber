import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import actions from "../../../redux/actions";
const { getAll } = actions;
const Captcha = (props) => {
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state);
  const [captchakey, setCaptchaKey] = useState(
    "6LdtefgcAAAAAKW4RdtTHiiFPjLTJ1rAZcv26tA0"
  );
  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);
  useEffect(async () => {
    if (
      reducers?.crudReducers?.allReturned?.configurations &&
      reducers.crudReducers?.allReturned.configurations?.filter(
        (item) => item?.key === "CAPTCHA_KEY"
      )[0]?.value
    ) {
      await setCaptchaKey(
        reducers.crudReducers?.allReturned.configurations?.filter(
          (item) => item?.key === "CAPTCHA_KEY"
        )[0]?.value
      );
    }
  }, [reducers]);
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  return (
    <ReCAPTCHA
      sitekey={captchakey}
      onChange={props?.onChange}
      hl={isRTL ? "ar" : "en"}
    />
  );
};
export default Captcha;
