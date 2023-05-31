import DateFnsUtils from "@date-io/date-fns";
import { Box, Button, Grid, InputLabel, Typography } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Schema } from "yup";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
const {
  sendMemberRegister,
  sendMemberRegisterDone,
  sendUaePassPersonData,
  uaePassLogin,
  serviceLoginDone,
} = actions;

function ServicesSignUp(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
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

  const initialValues = {
    membershipNumber: "",
    memberShipDate: null,
    trn: "",
    name: userInfo?.fullnameAR
      ? userInfo?.fullnameAR
      : `${userInfo?.firstnameAR} ${userInfo?.lastnameAR}`,
    name_e: userInfo?.fullnameEN
      ? userInfo?.fullnameEN
      : `${userInfo?.firstnameEN} ${userInfo?.lastnameEN}`,
    email: userInfo?.email,
    email_uae: userInfo?.email,
    mobile: userInfo?.mobile,
    mobile_uae: userInfo?.mobile,
    response: "",
    lang: "",
    gender: userInfo?.gender,
    age: "",
    work: "",
    userNameAR: userInfo?.fullnameAR
      ? userInfo?.fullnameAR
      : `${userInfo?.firstnameAR} ${userInfo?.lastnameAR}`,
    userNameEN: userInfo?.fullnameEN
      ? userInfo?.fullnameEN
      : `${userInfo?.firstnameEN} ${userInfo?.lastnameEN}`,
    checkTerms: [],
    passportNo: "",
    emirates_id: userInfo?.idn,
    emailNotify: "",
    smsNotify: "",
  };
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

  const validationSchema = Yup.object({
    membershipNumber: Yup.number()
      .required(isRTL ? "مطلوب" : "Required")
      .positive(),
    memberShipDate: Yup.date()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    trn: Yup.string()
      .matches(
        regex,
        isRTL ? "يجب أن يكون رقم موجب" : "Must be a positive number"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    name_e: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    emirates_id: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string().email(
      isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"
    ),
    email_uae: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"),
    response: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    gender: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    age: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    work: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    checkTerms: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    smsNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    emailNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });
  const validationSchema2 = Yup.object({
    emirates_id: Yup.string().min(
      15,
      isRTL
        ? "الهوية الإماراتية يجب أن تتكون على الأقل من 15 محرف"
        : "Emirates ID must be at least 15 characters"
    ),
    passportNo: Yup.string().required(
      isRTL ? "رقم جواز السفر مطلوب" : "Passport No. Required"
    ),
    userNameAR: Yup.string().matches(
      arabicLangRegex,
      isRTL ? "الاسم باللغة العربية" : "Name in Arabic"
    ),
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
    email: Yup.string().email(
      isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"
    ),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"),
    smsNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    emailNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    checkTerms: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
  });
  const doSubmit = async (values, { resetForm }) => {
    var randomName = userInfo?.email.split("@")[0];
    var chars = "0123456789",
      length = 4;
    for (var i = length; i > 0; --i) {
      randomName += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    if (user_type == 1) {
      const readyValues = {
        user_name: randomName,
        password: "P@ssw0rd",
        membership_code: values.membershipNumber,
        membership_date: moment(selectedDate).format("DD-MM-YYYY"),
        trn: values.trn,
        contact_name: values.name_e,
        mobile_number: values.mobile,
        email: values.email,
        usr_contact_method: values.response,
        usr_language: values.lang,
        usr_gender: userInfo?.gender == "Male" ? "1" : "2",
        usr_age: values.age,
        usr_worktype: values.work,
        uuid: userInfo?.uuid,

        email2: userInfo?.email,
        mobile_number2: userInfo?.mobile,
        email_notify: values.emailNotify,
        sms_notify: values.smsNotify,
      };

      dispatch(
        sendMemberRegister({ data: { ...readyValues }, userType: "membership" })
      );
    } else if (user_type == 2) {
      const readyValues = {
        user_name: randomName,
        password: "P@ssw0rd",
        name: values.userNameAR,
        name_e: values.userNameEN,
        email: values.email,
        passport_no: values.passportNo,
        mobile: values.mobile,
        uuid: userInfo?.uuid,
        email2: userInfo?.email,
        mobile_number2: userInfo?.mobile,
        email_notify: values.emailNotify,
        sms_notify: values.smsNotify,
        lang: values.lang,
      };
      dispatch(
        sendMemberRegister({ data: { ...readyValues }, userType: "personal" })
      );
    }
    // resetForm({});
  };

  useEffect(() => {
    const result = APIServices.memberRegister;
    if (result.user_id) {
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
        id_type: userInfo?.idType,
        idn: userInfo?.idn,
        lastnamear: userInfo?.lastnameAR,
        lastnameen: userInfo?.lastnameEN,
        mobile: userInfo?.mobile,
        nationalityar: userInfo?.nationalityAR,
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
      if (result.error) {
        setErrorMessage(result.error_message);
      }
      if (result.success === false) {
        setErrorMessage(result.message);
      }
    }
    // if (Object.keys(APIServices.memberRegister).length) {
    //   dispatch(sendMemberRegisterDone({ data: [] }));
    // }
  }, [APIServices.memberRegister]);
  useEffect(() => {
    const result = uaePass.uaepassPersonDataDone;
    const uuid = userInfo?.uuid;

    if (result.row_code) {
      setOpen(true);
      setMessage(`Your ID is ${APIServices.memberRegister.user_id} .`);
      dispatch(uaePassLogin({ data: { uuid, user_type } }));
      // setTimeout(() => {
      //   store.dispatch(push("/login"));
      // }, 7000);
    } else {
    }
  }, [uaePass.uaepassPersonDataDone]);

  useEffect(() => {
    if (uaePass.uaepassLoginDone) {
      if (uaePass.uaepassLoginDone?.user) {
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
            uaePass.uaepassLoginDone?.user[0]?.preferred_contact_way == 0 ||
            uaePass.uaepassLoginDone?.user[0]?.preferred_contact_way == null ||
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
      }
    }
  }, [uaePass.uaepassLoginDone]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.SIGNUP.NEWREGISTERUAE")}
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
                      htmlFor="membershipNumber"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MEMBERSHIPCODE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="membershipNumber"
                      name="membershipNumber"
                      variant="outlined"
                      type="number"
                      min="1"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="memberShipDate"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MEMBERSHIPDATE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className={classes.textFieldDate2}
                        name="memberShipDate"
                        margin="normal"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        value={selectedDate}
                        onChange={(e) => (
                          setSelectedDate(e), setFieldValue("memberShipDate", e)
                        )}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    {errors.memberShipDate && touched.memberShipDate ? (
                      <div className={classes.inputfeedback}>
                        {errors.memberShipDate}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="trn"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.TRN")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="trn"
                      name="trn"
                      type="number"
                      variant="outlined"
                      min="0"
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
                      {t("SERVICESPAGES.SIGNUP.CONTACTNAME")}
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
                      {t("SERVICESPAGES.SIGNUP.CONTACTNAMEAR")}
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
                <Box className={classes.divider2}></Box>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="response"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.RESPONSETYPE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="response" value="1" />
                        {t("SERVICESPAGES.FORMS.FORM.EMAIL")}
                      </label>
                      <label>
                        <Field type="radio" name="response" value="2" />
                        {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="lang"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.FAVLANG")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="lang" value="1" />
                        {t("SERVICESPAGES.SIGNUP.ARABIC")}
                      </label>
                      <label>
                        <Field type="radio" name="lang" value="2" />
                        {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="age"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.AGE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="age" value="1" />
                        {" < 25"}
                      </label>
                      <label>
                        <Field type="radio" name="age" value="2" />
                        25-30
                      </label>
                      <label>
                        <Field type="radio" name="age" value="3" />
                        31-35
                      </label>
                      <label>
                        <Field type="radio" name="age" value="4" />
                        36-40
                      </label>{" "}
                      <label>
                        <Field type="radio" name="age" value="5" />
                        {"40 <"}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="work"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.WORKTYPE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="work" value="1" />
                        {t("SERVICESPAGES.SIGNUP.OWNER")}
                      </label>
                      <label>
                        <Field type="radio" name="work" value="2" />
                        {t("SERVICESPAGES.SIGNUP.PARTNER")}
                      </label>{" "}
                      <label>
                        <Field type="radio" name="work" value="3" />
                        {t("SERVICESPAGES.SIGNUP.AGENT")}
                      </label>{" "}
                      <label>
                        <Field type="radio" name="work" value="4" />
                        {t("SERVICESPAGES.SIGNUP.EMPLOYEE")}
                      </label>
                      <label>
                        <Field type="radio" name="work" value="99" />
                        {t("SERVICESPAGES.SIGNUP.OTHER")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="emailNotify"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MAILNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="emailNotify" value="1" />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field type="radio" name="emailNotify" value="0" />
                        {t("SERVICESPAGES.SIGNUP.NO")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3} className={classes.fullContainerWidth}>
                    <InputLabel
                      htmlFor="smsNotify"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.SMSNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="smsNotify" value="1" />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field type="radio" name="smsNotify" value="0" />
                        {t("SERVICESPAGES.SIGNUP.NO")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <label className={classes.text}>
                    <Field
                      type="checkbox"
                      component={Checkbox}
                      name="checkTerms"
                      value="terms checked"
                    />
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        paddingInline: "8px",
                      }}
                    >
                      *
                    </span>
                    {isRTL
                      ? "أوافق على سياسة الخصوصية و الشروط والأحكام"
                      : "I agree the Privacy Policy and Terms & Conditions"}
                  </label>
                </Grid>
                <Button
                  variant="contained"
                  className={classes.send}
                  disableElevation
                  endIcon={<IoLogIn />}
                  onClick={submitForm}
                  disabled={!isValid || !dirty}
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
          {({ isValid, dirty, submitForm, errors }) => (
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
                      {t("SERVICESPAGES.SIGNUP.NAMEAR")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
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
                      {t("SERVICESPAGES.SIGNUP.NAMEEN")}
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
                      id="name_e"
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
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3}>
                    <InputLabel
                      htmlFor="lang"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.FAVLANG")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="lang" value="1" />
                        {t("SERVICESPAGES.SIGNUP.ARABIC")}
                      </label>
                      <label>
                        <Field type="radio" name="lang" value="2" />
                        {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3}>
                    <InputLabel
                      htmlFor="emailNotify"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MAILNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="emailNotify" value="1" />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field type="radio" name="emailNotify" value="0" />
                        {t("SERVICESPAGES.SIGNUP.NO")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid item xs={3}>
                    <InputLabel
                      htmlFor="smsNotify"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.SMSNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field type="radio" name="smsNotify" value="1" />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field type="radio" name="smsNotify" value="0" />
                        {t("SERVICESPAGES.SIGNUP.NO")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <label className={classes.text}>
                    <Field
                      type="checkbox"
                      component={Checkbox}
                      name="checkTerms"
                      value="terms checked"
                    />
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        paddingInline: "8px",
                      }}
                    >
                      *
                    </span>
                    {isRTL
                      ? "أوافق على سياسة الخصوصية و الشروط والأحكام"
                      : "I agree the Privacy Policy and Terms & Conditions"}
                  </label>
                </Grid>
                <Button
                  variant="contained"
                  className={classes.send}
                  disableElevation
                  endIcon={<IoLogIn />}
                  onClick={submitForm}
                  disabled={!isValid || !dirty}
                >
                  {t("SERVICESPAGES.SIGNUP.CONFIRM")}
                </Button>
                <br />
                <Box style={{ color: "red", margin: "8px 16px" }}>
                  {errors?.userNameAR}
                  <br />
                  {errors?.userNameEN}
                  <br />
                  {errors?.passportNo}
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <ServicesResultModal open={open} message={message} setOpen={setOpen} />
    </Grid>
  );
}

export default memo(ServicesSignUp);
