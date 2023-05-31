import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import { RiGroupFill, RiUserFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as Yup from "yup";
import {
  ACR_VALUES_WEB,
  AUTH_URL,
  REDIRECT_URL,
  RESPONSE_TYPE,
  SCOPE,
  STATE,
  UAE_PASS_CLIENT_ID,
} from "../../../constants/constant";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "./ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../redux/store";
let loggedType = sessionStorage.getItem("loggedType");
let supplierProfile = sessionStorage.getItem("supplierProfile");

const {
  serviceLogin,
  supplierLogin,
  serviceLoginFaild,
  forgotPasswordAction,
  forgotPasswordEmailReturned,
  loadingAction,
} = actions;
function ServicesLogin(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [resetFields, setResetFields] = useState(true);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const serviceReducer = useSelector((state) => state);
  const uaeInfo =
    sessionStorage.getItem("uaePassUserInfo") &&
    JSON.parse(sessionStorage.getItem("uaePassUserInfo"));
  const initialValues = {
    name: "",
    pasword: "",
  };
  const validationSchema =
    props?.loginType === 3
      ? Yup.object({
          email: Yup.string()
            .required(isRTL ? "مطلوب" : "Required")
            .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format"),
          pasword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        })
      : Yup.object({
          name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
          pasword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        });

  const handleForgetPassword = (email) => {
    if (email) {
      const payload = { email };
      dispatch(loadingAction({ loading: true }));
      dispatch(forgotPasswordAction({ payload }));
    } else {
      setOpen(true);
      setMessage(
        isRTL ? "يرجى إدخال بريدك الإلكتروني" : "Please Enter Your Email"
      );
      setNoThanks(true);
    }
  };

  const doSubmit = async (values, { resetForm }) => {
    dispatch(serviceLoginFaild({ code: false }));
    props.loginType === 3
      ? values.email &&
        values.pasword &&
        dispatch(
          supplierLogin({
            email: values.email,
            password: values.pasword,
          })
        )
      : values.name &&
        values.pasword &&
        dispatch(
          serviceLogin({
            user: values.name.toLowerCase(),
            password: values.pasword,
            loginType: props.loginType,
          })
        );
  };

  useEffect(() => {
    if (serviceReducer?.APIServices?.serviceLogInFaild) {
      let errorsMessage = isRTL
        ? ".يوجد خطأ ما ,أعد تسجيل الدخول من فضلك"
        : "Something went wrong , Please Log in again.";
      if (serviceReducer?.APIServices?.serviceLogInFaild?.data?.code === 122)
        errorsMessage = isRTL
          ? ". يرجى تأكيد البريد الإلكتروني"
          : "Please Confirm Your Email.";
      if (serviceReducer?.APIServices?.serviceLogInFaild?.message) {
        errorsMessage = isRTL
          ? `${serviceReducer?.APIServices?.serviceLogInFaild?.data?.message} , أعد تسجيل الدخول من فضلك  `
          : `${serviceReducer?.APIServices?.serviceLogInFaild?.data?.message} , Please Log in again.`;
      }
      if (serviceReducer?.APIServices?.serviceLogInFaild?.user) {
        if (serviceReducer?.APIServices?.serviceLogInFaild?.user?.length == 0) {
          errorsMessage = isRTL
            ? ".يوجد خطأ ما ,أعد تسجيل الدخول من فضلك"
            : "Something went wrong , Please Log in again.";
        } else {
          errorsMessage = isRTL
            ? `${serviceReducer?.APIServices?.serviceLogInFaild?.user[0]?.error_description_ar} , أعد تسجيل الدخول من فضلك  `
            : `${serviceReducer?.APIServices?.serviceLogInFaild?.user[0]?.error_description} , Please Log in again.`;
        }
      }
      setOpen(true);
      setMessage(errorsMessage);
      setNoThanks(true);
    } else if (serviceReducer?.users?.forgotPasswordComplete) {
      dispatch(loadingAction({ loading: false }));
      if (serviceReducer?.users?.forgotPasswordComplete?.success)
        isRTL
          ? store.dispatch(
              push({
                pathname: "/ar/reset-password",
                userEmail: email,
              })
            )
          : store.dispatch(
              push({
                pathname: "/en/reset-password",
                userEmail: email,
              })
            );
      let errorsMessage = isRTL
        ? ".يوجد خطأ ما ,أعد إدخال بريدك الإلكتروني من فضلك"
        : "Something went wrong , Please Enter Your Email again.";
      if (serviceReducer?.users?.forgotPasswordComplete?.code === 2)
        errorsMessage = isRTL ? ". الحساب غير موجود" : "Account is not Exist.";
      else if (serviceReducer?.users?.forgotPasswordComplete?.message) {
        errorsMessage = isRTL
          ? `${serviceReducer?.users?.forgotPasswordComplete?.message} , أعد تسجيل الدخول من فضلك  `
          : `${serviceReducer?.users?.forgotPasswordComplete?.message} , Please Log in again.`;
      }
      setOpen(true);
      setMessage(errorsMessage);
      setNoThanks(true);
    } else setOpen(false);
  }, [serviceReducer]);

  useEffect(() => {
    dispatch(forgotPasswordEmailReturned({ data: false }));
    sessionStorage.setItem("userType", 1);
    dispatch(serviceLoginFaild({ code: false }));
    if (loggedType && loggedType === "3" && supplierProfile)
      store.dispatch(push("/services-form/profile"));
    if (loggedType && loggedType != 0 && loggedType !== "3")
      store.dispatch(push("/services/rak-chamber/dashboard"));
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const URL = `${AUTH_URL}?redirect_uri=${REDIRECT_URL}&client_id=${UAE_PASS_CLIENT_ID}&response_type=${RESPONSE_TYPE}&state=${STATE}&scope=${SCOPE}&acr_values=${ACR_VALUES_WEB}&ui_locales=${
    isRTL ? "ar" : "en"
  }`;
  return (
    <Grid container className={clsx(classes.formRoot, classes.loginRoot)}>
      <Grid item md={12}>
        {location.type == "cancel" && (
          <Box className={classes.alertMsg}>
            <Typography>
              {isRTL
                ? "قام المستخدم بإلغاء تسجيل الدخول"
                : "User cancelled the login"}
            </Typography>
          </Box>
        )}
        {uaeInfo?.userType == "SOP1" && (
          <Box className={classes.alertMsg}>
            {isRTL ? (
              <>
                <Typography>
                  حسابك غير موثق، يرجى ترقية حسابك حسب التعليمات على تطبيق
                  الهوية الرقمية ({" "}
                  <a href="https://apps.apple.com/ae/app/uae-pass/id1377158818">
                    App Store
                  </a>{" "}
                  /{" "}
                  <a href="https://play.google.com/store/apps/details?id=ae.uaepass.mainapp">
                    Google Play
                  </a>{" "}
                  )
                </Typography>
              </>
            ) : (
              <>
                <Typography>
                  Your account is unverified. Please upgrade your account
                  following instructions on the UAE PASS app ({" "}
                  <a href="https://apps.apple.com/ae/app/uae-pass/id1377158818">
                    App Store
                  </a>{" "}
                  /{" "}
                  <a href="https://play.google.com/store/apps/details?id=ae.uaepass.mainapp">
                    Google Play
                  </a>{" "}
                  ){" "}
                </Typography>
              </>
            )}
          </Box>
        )}
        {location.type == "multi" && (
          <Box className={classes.alertMsg}>
            <Typography>
              <Typography>
                Multiple online accounts are linked with same UAEPASS account.
                For Technical Support please{" "}
                <a href="/services-form/OtherServicesForm/Technical Support">
                  click here
                </a>{" "}
              </Typography>
            </Typography>
          </Box>
        )}
      </Grid>
      <Typography className={classes.serviceTitle}>
        {isRTL
          ? "سجل دخولك باستخدام حسابك في غرفة رأس الخيمة"
          : "Login with your RAK Chamber Account"}
      </Typography>
      <Grid container item>
        <Grid item md={6}>
          <Box display="flex" height="60px">
            <Button
              className={
                props.loginType === 1
                  ? classes.loginTypeBtn
                  : classes.loginTypeBtnOutlined
              }
              onClick={() => {
                setResetFields(true);
                dispatch(serviceLoginFaild({ code: false }));
                props.setLoginType(1);
                sessionStorage.setItem("userType", 1);
              }}
            >
              <RiGroupFill /> {t("SERVICESPAGES.SIGNUP.MEMBERS")}
            </Button>
            <Button
              className={
                props.loginType === 2
                  ? classes.loginTypeBtn
                  : classes.loginTypeBtnOutlined
              }
              onClick={() => {
                setResetFields(true);
                dispatch(serviceLoginFaild({ code: false }));
                props.setLoginType(2);
                sessionStorage.setItem("userType", 2);
              }}
            >
              <RiUserFill />
              {t("SERVICESPAGES.SIGNUP.INDIVIDUALS")}
            </Button>
            <Button
              className={
                props.loginType === 3
                  ? classes.loginTypeBtn
                  : classes.loginTypeBtnOutlined
              }
              onClick={() => {
                setResetFields(true);
                dispatch(serviceLoginFaild({ code: false }));
                props.setLoginType(3);
                sessionStorage.setItem("userType", 3);
              }}
            >
              <FaUsers
                style={{
                  fontSize: 18,
                }}
              />
              {t("SERVICESPAGES.SIGNUP.SUPPLIERS")}
            </Button>
          </Box>
          <Formik
            initialValues={initialValues}
            onSubmit={doSubmit}
            validationSchema={validationSchema}
          >
            {function Login({
              isValid,
              dirty,
              values,
              submitForm,
              errors,
              resetForm,
            }) {
              useEffect(() => {
                if (resetFields) {
                  resetForm();
                  setResetFields(false);
                }
              }, [resetFields]);
              return (
                <Form
                  className={clsx(
                    classes.fullForm,
                    "animate__animated animate__bounce"
                  )}
                  variant="outlined"
                >
                  <Grid container>
                    {props.loginType === 3 && (
                      <span className={classes.supplier}>
                        {t("SERVICESPAGES.SIGNUP.SUPPLIERPHRASE")}
                      </span>
                    )}
                    <Grid container item className={classes.inpuContainer}>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="name"
                          className={classes.label}
                          required
                        >
                          {props.loginType === 3
                            ? t("SERVICESPAGES.SIGNUP.EMAIL")
                            : props.loginType === 1
                            ? t("SERVICESPAGES.SIGNUP.USERNAME")
                            : t("SERVICESPAGES.SIGNUP.USERNAMEORMAIL")}
                        </InputLabel>

                        {props.loginType === 3 ? (
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="email"
                            name="email"
                            variant="outlined"
                            placeholder={
                              isRTL
                                ? "ادخل البريد الالكتروني"
                                : "Enter Your Email"
                            }
                          />
                        ) : (
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="name"
                            name="name"
                            variant="outlined"
                            placeholder={
                              isRTL ? "ادخل الاسم" : "Enter Your Name"
                            }
                          />
                        )}
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
                                    <Visibility className={classes.redColor} />
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
                    <Grid container item className={classes.inpuContainer}>
                      <Grid item xs={12}>
                        {" "}
                        <Typography className={classes.signUp}>
                          {isRTL ? "ليس لديك حساب؟" : "Do not have an account?"}
                          <a
                            className={classes.signUp}
                            href={
                              props.loginType === 1
                                ? "/services-form/register/membership"
                                : props.loginType === 2
                                ? "/services-form/register/personal"
                                : "/services-form/register/supplier"
                            }
                          >
                            {t("SERVICESPAGES.SIGNUP.SIGNUP")}
                          </a>
                        </Typography>
                      </Grid>
                      {props.loginType === 3 && (
                        <Grid container item xs={12}>
                          <Grid item sm={6} xs={12}>
                            {" "}
                            <Typography>
                              <a
                                className={classes.account}
                                href={"/confirm-email"}
                              >
                                {isRTL ? "تأكيد حسابك" : "Confirm Your Account"}
                              </a>
                            </Typography>
                          </Grid>
                          <Grid item sm={6} xs={12}>
                            {" "}
                            <Typography>
                              <Link
                                to="#"
                                className={classes.account}
                                onClick={() => {
                                  dispatch(
                                    forgotPasswordEmailReturned({ data: false })
                                  );
                                  handleForgetPassword(values.email);
                                  setEmail(values.email);
                                }}
                              >
                                {isRTL
                                  ? "تغيير كلمة المرور"
                                  : "Reset Your Password"}
                              </Link>
                            </Typography>
                          </Grid>
                        </Grid>
                      )}
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
              );
            }}
          </Formik>
        </Grid>
        <Grid item md={6} sm={12} xs={12} className={classes.uaePassBtnBox}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            flexDirection={"column"}
            padding={"0px 16px"}
          >
            {props.loginType === 3 ? (
              <Box className={classes.supplierImgBox}>
                <img
                  alt="site logo"
                  src="/assets/images/supplier1.jpg"
                  className={classes.supplierImg}
                />
              </Box>
            ) : (
              <>
                <a href={URL} target="_self" className={classes.uaePassBtn}>
                  <img
                    alt="site logo"
                    src="/assets/images/finger.png"
                    className={classes.fingerImg}
                  />
                  {isRTL
                    ? "تسجيل الدخول بالهوية الرقمية"
                    : "Sign in with UAE PASS"}
                </a>
                <Box width={"85%"} textAlign={"center"}>
                  <Typography className={classes.uaePassDesc}>
                    {isRTL
                      ? "هوية رقمية موحدة ومعتمدة لجميع المواطنين والمقيمين والزوار"
                      : "A single trusted digital identity for all citizens, residents and visitors."}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <ServicesResultModal
        open={open}
        message={message}
        noThanks={noThanks}
        setOpen={setOpen}
      />
    </Grid>
  );
}

export default memo(ServicesLogin);
