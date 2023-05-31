import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  ACR_VALUES_WEB,
  AUTH_URL,
  REDIRECT_URL,
  RESPONSE_TYPE,
  SCOPE,
  STATE,
  UAE_PASS_CLIENT_ID,
  BASE_URL,
} from "../../../../constants/constant";
import actions from "../../../../redux/actions";
import { store } from "../../../../redux/store";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";

const {
  updateAuthCode,
  getAccessToken,
  getProfile,
  getProfileDone,
  uaePassLogin,
  serviceLoginDone,
  serviceLogin,
} = actions;

function UaePassLogin(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    uaePass,
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const { t } = useTranslation();

  const [noAccount, setNoAccount] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);
  const [errorToken, setErrorToken] = useState("");
  let accessCode = new URLSearchParams(window.location.search).get("code");
  let state = new URLSearchParams(window.location.search).get("state");
  let canceled = new URLSearchParams(window.location.search).get(
    "error_description"
  );
  const user_type = Number(sessionStorage.getItem("userType"));
  const URL = `${AUTH_URL}?redirect_uri=${REDIRECT_URL}&client_id=${UAE_PASS_CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${STATE}&scope=${SCOPE}&acr_values=${ACR_VALUES_WEB}&ui_locales=${
    isRTL ? "ar" : "en"
  }`;
  const serviceProfile = JSON.parse(sessionStorage.getItem("serviceProfile"));

  const initialValues = {
    name: "",
    pasword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    pasword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });
  const doSubmit = async (values, { resetForm }) => {
    values.name &&
      values.pasword &&
      dispatch(
        serviceLogin({
          user: values.name,
          password: values.pasword,
          loginType: user_type,
          loginById: true,
        })
      );
  };

  useEffect(() => {
    if (APIServices?.serviceLogInFaild) {
      let errorsMessage = isRTL
        ? ".يوجد خطأ ما ,أعد تسجيل الدخول من فضلك"
        : "Something went wrong , Please Log in again.";
      if (APIServices?.serviceLogInFaild?.user) {
        errorsMessage = isRTL
          ? `${APIServices?.serviceLogInFaild?.user[0]?.error_description_ar} , أعد تسجيل الدخول من فضلك  `
          : `${APIServices?.serviceLogInFaild?.user[0]?.error_description} , Please Log in again.`;
      }
      setOpen(true);
      setMessage(errorsMessage);
      setNoThanks(true);
    }
  }, [APIServices]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (
      (!APIServices.serviceLogInDone || APIServices.serviceLogInDone == 0) &&
      serviceProfile
    ) {
      sessionStorage.removeItem("serviceProfile");
    }
    if (canceled && canceled.includes("Cancelled")) {
      return store.dispatch(
        push({ pathname: isRTL ? "/ar/login" : "/en/login", type: "cancel" })
      );
    }
    if (accessCode) {
      const readyValues = {
        redirect_uri: REDIRECT_URL,
        code: accessCode,
      };
      dispatch(getAccessToken({ data: { ...readyValues } }));
    } else {
      store.dispatch(push("/login"));
    }
  }, []);

  useEffect(() => {
    if (uaePass.accessToken?.data?.access_token) {
      const token = uaePass.accessToken?.data?.access_token;

      dispatch(getProfile({ token: { token } }));
    } else if (uaePass.accessToken?.data?.data?.error_description) {
      setErrorToken(true);
      setErrorDesc(uaePass.accessToken?.data?.data?.error_description);
      setTimeout(() => {
        window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
      }, 3000);
    }
  }, [uaePass.accessToken]);
  useEffect(() => {
    if (uaePass.uaepassProfile?.data) {
      const uuid = uaePass.uaepassProfile?.data?.uuid;
      if (uaePass.uaepassProfile?.data?.userType == "SOP1") {
        window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
        // isRTL
        //   ? store.dispatch(push({ pathname: "/ar/login", type: "sop1" }))
        //   : store.dispatch(push({ pathname: "/en/login", type: "sop1" }));
      } else dispatch(uaePassLogin({ data: { uuid, user_type } }));
    }
  }, [uaePass.uaepassProfile]);

  useEffect(() => {
    if (uaePass.uaepassLoginDone) {
      if (uaePass.uaepassLoginDone?.error) {
        uaePass.uaepassLoginDone?.error == 112
          ? setNoAccount(true)
          : isRTL
          ? store.dispatch(push({ pathname: "/ar/login", type: "multi" }))
          : store.dispatch(push({ pathname: "/en/login", type: "multi" }));
      } else if (uaePass.uaepassLoginDone?.user) {
        if (uaePass.uaepassLoginDone?.user[0])
          if (uaePass.uaepassProfile?.data) {
            if (
              uaePass.uaepassProfile?.data?.userType == "SOP2" ||
              uaePass.uaepassProfile?.data?.userType == "SOP3"
            ) {
              dispatch(serviceLoginDone({ status: user_type }));
              sessionStorage.setItem("loggedType", user_type);
              sessionStorage.setItem(
                "serviceProfile",
                JSON.stringify(uaePass.uaepassLoginDone?.user[0])
              );
              if (
                new Date(
                  uaePass.uaepassLoginDone?.user[0]?.membership_expiry_date
                ).getTime() < new Date(new Date()).getTime() &&
                uaePass.uaepassLoginDone?.user[0]?.status == 1 &&
                uaePass.uaepassLoginDone?.user[0]?.exception_flag == 2
              )
                sessionStorage.setItem("memberType", "expired");
              else if (
                new Date(
                  uaePass.uaepassLoginDone?.user[0]?.membership_expiry_date
                ).getTime() < new Date(new Date()).getTime() &&
                uaePass.uaepassLoginDone?.user[0]?.status == 1 &&
                uaePass.uaepassLoginDone?.user[0]?.exception_flag == 1
              )
                sessionStorage.setItem("memberType", "activeExpired");
              else if (uaePass.uaepassLoginDone?.user[0]?.status == 1)
                sessionStorage.setItem("memberType", "active");
              else if (uaePass.uaepassLoginDone?.user[0]?.status == 2)
                sessionStorage.setItem("memberType", "canceled");
              if (
                user_type == 1 &&
                (uaePass.uaepassLoginDone?.user[0]?.language == 0 ||
                  uaePass.uaepassLoginDone?.user[0]?.language == null ||
                  uaePass.uaepassLoginDone?.user[0]?.preferred_contact_way ==
                    0 ||
                  uaePass.uaepassLoginDone?.user[0]?.preferred_contact_way ==
                    null ||
                  uaePass.uaepassLoginDone?.user[0]?.gender == 0 ||
                  uaePass.uaepassLoginDone?.user[0]?.gender == null ||
                  uaePass.uaepassLoginDone?.user[0]?.age == 0 ||
                  uaePass.uaepassLoginDone?.user[0]?.age == null ||
                  uaePass.uaepassLoginDone?.user[0]?.work_type == 0 ||
                  uaePass.uaepassLoginDone?.user[0]?.work_type == null)
              ) {
                store.dispatch(push("/services-form/profile"));
                sessionStorage.setItem("updateUser", true);
              } else store.dispatch(push("/services/rak-chamber/dashboard"));
            } else if (uaePass.uaepassProfile?.data?.userType == "SOP1") {
              isRTL
                ? store.dispatch(push({ pathname: "/ar/login", type: "sop1" }))
                : store.dispatch(push({ pathname: "/en/login", type: "sop1" }));
            }
          }
      }
    }
  }, [uaePass.uaepassLoginDone]);
  return (
    <Box className={classes.flexRoot}>
      {noAccount && (
        <Grid container className={classes.uaepassRegister}>
          <Typography className="serviceTitle">
            {t("SERVICESPAGES.SIGNUP.LINKUAEPASS")}
          </Typography>
          <Typography> {t("SERVICESPAGES.SIGNUP.UAEPASSSERVICE")}</Typography>
          <Grid container item>
            <Grid item sm={6}>
              <Button
                className="chooseBtn"
                onClick={() =>
                  store.dispatch(push("/services-form/uaepass-register"))
                }
              >
                {t("SERVICESPAGES.SIGNUP.NEWUSER")}
              </Button>
            </Grid>
            <Grid item sm={6}>
              <Button
                className="chooseBtn"
                onClick={() => setShowLoginForm(true)}
              >
                {t("SERVICESPAGES.SIGNUP.USERTOLINK")}
              </Button>
            </Grid>
            <Grid item sm={6}></Grid>
            <Grid item sm={6}>
              {" "}
              <Formik
                initialValues={initialValues}
                onSubmit={doSubmit}
                validationSchema={validationSchema}
              >
                {({ isValid, dirty, values, submitForm }) => (
                  <Form
                    className={clsx(
                      classes.fullForm,
                      classes.noBorder,
                      "animate__animated animate__bounce"
                    )}
                    variant="outlined"
                  >
                    <Grid container>
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={12}>
                          <InputLabel
                            htmlFor="name"
                            className={classes.label}
                            required
                          >
                            {user_type === 1
                              ? t("SERVICESPAGES.SIGNUP.USERNAME")
                              : t("SERVICESPAGES.SIGNUP.USERNAMEORMAIL")}
                          </InputLabel>

                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="name"
                            name="name"
                            variant="outlined"
                            placeholder={
                              isRTL ? "ادخل الاسم" : "Enter Your Name"
                            }
                            disabled={!showLoginForm}
                          />
                        </Grid>
                      </Grid>
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={12}>
                          <InputLabel
                            htmlFor="pasword"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.SIGNUP.PASSWORD")}
                          </InputLabel>

                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="pasword"
                            name="pasword"
                            variant="outlined"
                            autoComplete="new-password"
                            disabled={!showLoginForm}
                            placeholder={
                              isRTL ? "ادخل كلمة المرور" : "Enter Your Password"
                            }
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    className={classes.verticalPadding0}
                                  >
                                    {showPassword ? (
                                      <Visibility
                                        className={classes.redColor}
                                      />
                                    ) : (
                                      <VisibilityOff
                                        className={classes.redColor}
                                      />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Button
                        variant="contained"
                        className={classes.send}
                        disableElevation
                        endIcon={<IoLogIn />}
                        onClick={submitForm}
                        disabled={!isValid || !dirty}
                      >
                        {t("SERVICESPAGES.SIGNUP.LOGIN")}
                      </Button>
                    </Grid>
                  </Form>
                )}
              </Formik>
            </Grid>

            <Grid item sm={12}>
              <Button
                className="newBtn"
                onClick={() => {
                  window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
                  // window.location.href = URL;
                }}
              >
                {t("SERVICESPAGES.SIGNUP.NEWLOGIN")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {errorToken && (
        <Box
          style={{ width: "fit-content", margin: "0% auto" }}
          className={classes.alertMsg}
        >
          {errorDesc}
        </Box>
      )}
      <ServicesResultModal
        open={open}
        message={message}
        noThanks={noThanks}
        setOpen={setOpen}
      />
    </Box>
  );
}

export default memo(UaePassLogin);
