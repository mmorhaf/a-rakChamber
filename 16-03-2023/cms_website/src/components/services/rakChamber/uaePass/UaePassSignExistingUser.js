import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Box,
  Typography,
  Button,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { Formik, Form, Field } from "formik";
import { TextField, Checkbox } from "formik-material-ui";
import actions from "../../../../redux/actions";

import { IoLogIn } from "react-icons/io5";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ServicesResultModal from "../ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
import { useParams } from "react-router-dom";

const {
  sendMemberRegister,
  sendMemberRegisterDone,
  sendUaePassPersonData,
  serviceLoginUpdate,
} = actions;

function UaePassSignExistingUser(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    APIServices,
    uaePass,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  let { type } = useParams();
  const user_type = sessionStorage.getItem("userType");

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /[\u0600-\u06FF]/;
  const emirateRegex = /^[784]+$/;
  const userInfo =
    sessionStorage.getItem("uaePassUserInfo") &&
    JSON.parse(sessionStorage.getItem("uaePassUserInfo"));

  const serviceProfile = JSON.parse(sessionStorage.getItem("serviceProfile"));

  const initialValues = {
    name: userInfo?.fullnameAR
      ? userInfo?.fullnameAR
      : `${userInfo?.firstnameAR} ${userInfo?.lastnameAR}`,
    name_e: userInfo?.fullnameEN
      ? userInfo?.fullnameEN
      : `${userInfo?.firstnameEN} ${userInfo?.lastnameEN}`,
    email: serviceProfile?.email,
    email_uae: userInfo?.email,
    mobile: serviceProfile?.mobile,
    mobile_uae: userInfo?.mobile,
    gender: userInfo?.gender,
    userNameAR: serviceProfile?.name,
    userNameEN: serviceProfile?.name_e,
    passportNo: serviceProfile?.passport_no,
    emirates_id: userInfo?.idn,
    user_name: serviceProfile?.username,
  };
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

  const validationSchema = Yup.object({
    email: Yup.string().email(
      isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"
    ),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"),
    //   .required(isRTL ? "مطلوب" : "Required"),
  });
  const validationSchema2 = Yup.object({
    userNameAR: Yup.string()
      .matches(
        arabicLangRegex,
        isRTL ? "الاسم باللغة العربية" : "Name in Arabic"
      )
      .nullable(),
    userNameEN: Yup.string().matches(
      englishLangRegex,
      isRTL ? "الاسم باللغة الانجليزية" : "Name in English"
    ),
    fills: Yup.string().when(["userNameAR", "userNameEN"], {
      is: (userNameAR, userNameEN) => !userNameAR && !userNameEN,
      then: Yup.string().required(
        isRTL
          ? "يرجى ملء حقل واحد على الأقل أدناه"
          : "Please Fill One Field At Least Below"
      ),
    }),
    passportNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),

    email: Yup.string().email(
      isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"
    ),
    //   .required(isRTL ? "مطلوب" : "Required"),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"),
    //   .required(isRTL ? "مطلوب" : "Required"),
  });
  const doSubmit = async (values, { resetForm }) => {
    if (user_type == 1) {
      const readyValues = {
        code: serviceProfile?.code,
        mobile_number2: userInfo?.mobile,
        email2: userInfo?.email,
        uuid: userInfo?.uuid,
        member_user: serviceProfile?.username,
        email: values.email,
        mobile: values.mobile,
        gender: userInfo?.gender == "Male" ? "1" : "2",
      };
      dispatch(serviceLoginUpdate({ data: { ...readyValues }, loginType: 1 }));
    } else if (user_type == 2) {
      const readyValues = {
        code: serviceProfile?.code,
        mobile_number2: userInfo?.mobile,
        email2: userInfo?.email,
        uuid: userInfo?.uuid,
        personal_user: serviceProfile?.username,
        email: values.email,
        mobile: values.mobile,
        name: values?.userNameAR,
        name_e: values?.userNameEN,
      };
      dispatch(serviceLoginUpdate({ data: { ...readyValues }, loginType: 2 }));
    }
    // resetForm({});
  };

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear) {
      setOpen(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
    } else if (serviceProfile == null) store.dispatch(push("/login"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.serviceLoginUpdatedDone;
    if (result.updated == 1) {
      const uaepassValues = {
        email: userInfo?.email,
        firstnamear: userInfo?.firstnameAR,
        firstnameen: userInfo?.firstnameEN,
        fullnamear: userInfo?.fullnameAR
          ? userInfo?.fullnameAR
          : `${userInfo?.firstnameAR} ${userInfo?.lastnameAR}`,
        fullnameen: userInfo?.fullnameEN
          ? userInfo?.fullnameEN
          : `${userInfo?.firstnameEN} ${userInfo?.lastnameEN}`,
        gender: userInfo?.gender,
        id_type: userInfo?.idn,
        idn: userInfo?.idn,
        lastnamear: userInfo?.lastnameAR,
        lastnameen: userInfo?.lastnameEN,
        mobile: userInfo?.mobile,
        nationalityar: userInfo?.nationalityEN,
        nationalityen: userInfo?.nationalityEN,
        sub: userInfo?.uuid,
        user_type: userInfo?.userType,
        uuid: userInfo?.uuid,
        rakcci_user_type: user_type,
      };
      dispatch(sendUaePassPersonData({ data: { ...uaepassValues } }));
      // setOpen(true);
      // setMessage(`Your ID is ${result.user_id} .`);
      // setTimeout(() => {
      //   store.dispatch(push("/login"));
      // }, 7000);
    } else {
      if (result.updated == 0) {
        setErrorMessage(isRTL ? "الشركة غير موجودة" : "Company Not Exists");
      }
    }
  }, [APIServices.serviceLoginUpdatedDone]);

  useEffect(() => {
    const result = uaePass.uaepassPersonDataDone;
    if (result.row_code) {
      setOpen(true);
      setMessage(
        isRTL
          ? `تم ربط حسابك مع الهوية الرقمية`
          : "Your account has been linked with UAE Pass"
      );
      setTimeout(() => {
        store.dispatch(push("/services/rak-chamber/dashboard"));
      }, 7000);
    } else {
    }
  }, [uaePass.uaepassPersonDataDone]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.SIGNUP.EXISTREGISTERUAE")}
      </Typography>
      {user_type == 1 ? (
        <Formik
          initialValues={initialValues}
          onSubmit={doSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({
            isValid,
            dirty,
            values,
            errors,
            touched,
            submitForm,
            setFieldValue,
          }) => (
            <Form
              className={clsx(
                classes.fullForm,
                "animate__animated animate__bounce"
              )}
              variant="outlined"
            >
              <Grid container>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="emirates_id"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.EID")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="emirates_id"
                      name="emirates_id"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="user_name"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.USERNAME")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="user_name"
                      name="user_name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="gender"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.GENDER")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="gender"
                      name="gender"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="name_e"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.NAMEEN")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="name_e"
                      name="name_e"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="name"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.NAMEAR")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="name"
                      name="name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="email_uae" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.EMAILPASS")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="email_uae"
                      name="email_uae"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="mobile_uae"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MOBILEPASS")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="mobile_uae"
                      name="mobile_uae"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="email" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.EMAIL")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="email"
                      name="email"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="mobile" className={classes.label}>
                      {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="mobile"
                      name="mobile"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  className={classes.send}
                  disableElevation
                  endIcon={<IoLogIn />}
                  onClick={submitForm}
                  disabled={!isValid}
                >
                  {t("SERVICESPAGES.SIGNUP.CONFIRM")}
                </Button>
                {errorMessage && (
                  <Grid container item className={classes.inpuContainer}>
                    <Box className={classes.errorNote}>
                      <Typography>
                        {isRTL
                          ? "الرجاء التأكد من البيانات المدخلة."
                          : "Please Check your Inputs."}
                      </Typography>
                      <br />
                      <Typography>{errorMessage}</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={doSubmit}
          validationSchema={validationSchema2}
          enableReinitialize
        >
          {({ isValid, dirty, submitForm }) => (
            <Form
              className={clsx(
                classes.fullForm,
                "animate__animated animate__bounce"
              )}
              variant="outlined"
            >
              <Grid container>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="emirates_id"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.EID")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="emirates_id"
                      name="emirates_id"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="passportNo"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNO")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="passportNo"
                      name="passportNo"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>{" "}
                <Box className={classes.divider2}></Box>
                <Grid item xs={12}>
                  <Typography className="info" name="fills">
                    {isRTL
                      ? "يجب ملء حقل الاسم بإحدى اللغتين على الأقل (اللغة العربية أو الإنجليزية)"
                      : "Please fill your name in one language at least(Arabic or English)"}
                  </Typography>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="userNameAR" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAME")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="userNameAR"
                      name="userNameAR"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="userNameEN" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAMEE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="userNameEN"
                      name="userNameEN"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box className={classes.divider2}></Box>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="name" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAMEUAE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="name"
                      name="name"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="name_e" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAMEEUAE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="name_e"
                      name="name_e"
                      variant="outlined"
                      disabled
                    />
                  </Grid>
                </Grid>
                <Box className={classes.divider2}></Box>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="email_uae"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.EMAILPASS")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="email_uae"
                      name="email_uae"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="email" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.EMAIL")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="email"
                      name="email"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="mobile_uae"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MOBILEPASS")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      disabled
                      component={TextField}
                      className={classes.textField}
                      id="mobile_uae"
                      name="mobile_uae"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel htmlFor="mobile" className={classes.label}>
                      {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="mobile"
                      name="mobile"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  className={classes.send}
                  disableElevation
                  endIcon={<IoLogIn />}
                  onClick={submitForm}
                  disabled={!isValid}
                >
                  {t("SERVICESPAGES.SIGNUP.CONFIRM")}
                </Button>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <ServicesResultModal
        open={open}
        setOpen={setOpen}
        message={message}
        routing={routing}
        noThanks={true}
      />
    </Grid>
  );
}

export default memo(UaePassSignExistingUser);
