import DateFnsUtils from "@date-io/date-fns";
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
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import { store } from "../../../redux/store";
import useStyles from "../../../styles/components/services/servicesTabPane";
import { arLabels, enLabels } from "../../shared/utils";
import ServicesResultModal from "./ServicesResultModal";

const { sendMemberRegister, sendMemberRegisterDone, sendSupplierRegister } =
  actions;

function ServicesSignUp(props) {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  let { type } = useParams();

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /[\u0600-\u06FF]/;
  const emirateRegex = /^[784]+$/;

  const initialValues = {
    membershipNumber: "",
    memberShipDate: null,
    trn: "",
    name: "",
    name_e: "",
    email: "",
    mobile: "",
    response: "",
    lang: "",
    gender: "",
    age: "",
    work: "",
    userName: "",
    password: "",
    confirmPassword: "",
    checkTerms: [],
    passportNo: "",
    emirates_id: "",
    emailNotify: "",
    smsNotify: "",
    supplierPhone: "",
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
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .required(isRTL ? "مطلوب" : "Required"),
    response: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    gender: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    age: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    work: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    userName: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        isRTL
          ? "اسم المستخدم يجب أن يتضمن أحرف انجليزية أو أرقام فقط "
          : "Must Contain English characters and numbers only"
      ),
    password: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        isRTL
          ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
          : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        isRTL ? "كلمتي السر غير متطابقين" : "Passwords must match"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    checkTerms: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    emailNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    smsNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });
  const validationSchema2 = Yup.object({
    emirates_id: Yup.string().min(
      15,
      isRTL
        ? "الهوية الإماراتية يجب أن تتكون على الأقل من 15 محرف"
        : "Emirates ID must be at least 15 characters"
    ),
    passportNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    name: Yup.string().matches(
      arabicLangRegex,
      isRTL ? "الاسم باللغة العربية" : "Name in Arabic"
    ),
    name_e: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        englishLangRegex,
        isRTL ? "الاسم باللغة الانجليزية" : "Name in English"
      ),
    // fills: Yup.string().when(["name", "name_e"], {
    //   is: (name, name_e) => !name && !name_e,
    //   then: Yup.string().required(
    //     isRTL
    //       ? "يرجى ملء حقل واحد على الأقل أدناه"
    //       : "Please Fill One Field At Least Below"
    //   ),
    // }),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .required(isRTL ? "مطلوب" : "Required"),
    userName: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^[a-zA-Z0-9]+$/,
        isRTL
          ? "اسم المستخدم يجب أن يتضمن أحرف انجليزية أو أرقام فقط "
          : "Must Contain English characters and numbers only"
      ),
    password: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        isRTL
          ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
          : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        isRTL ? "كلمتي السر غير متطابقين" : "Passwords must match"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    emailNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    smsNotify: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    checkTerms: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
  });
  const validationSchema3 = Yup.object({
    userName: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        isRTL ? /[ء-ي]+\s[ء-ي]+/ : /\w\s\w/,
        isRTL ? "الاسم الكامل من فضلك" : "Provide Full Name Please"
      ),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    prefferedMean: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    prefferedLanguage: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    password: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        isRTL
          ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
          : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        isRTL ? "كلمتي السر غير متطابقين" : "Passwords must match"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    checkTerms: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    notificationByEmail: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    notificationBySms: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    supplierPhone: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير صالح" : "Phone number is not valid"
      )
      .nullable(),
  });
  const doSubmit = async (values, { resetForm }) => {
    if (type == "membership") {
      const readyValues = {
        user_name: values.userName.toLowerCase(),
        password: values.password,
        membership_code: values.membershipNumber,
        membership_date: moment(selectedDate).format("DD-MM-YYYY"),
        trn: values.trn,
        contact_name: values.name,
        email: values.email,
        mobile_number: values.mobile,
        usr_contact_method: values.response,
        usr_language: values.lang,
        usr_gender: values.gender,
        usr_age: values.age,
        usr_worktype: values.work,
        email_notify: values.emailNotify,
        sms_notify: values.smsNotify,
      };
      dispatch(
        sendMemberRegister({ data: { ...readyValues }, userType: type })
      );
    } else if (type == "personal") {
      const readyValues = {
        user_name: values.userName.toLowerCase(),
        password: values.password,
        email: values.email,
        mobile: values.mobile,
        name: values.name,
        name_e: values.name_e,
        passport_no: values.passportNo,
        emirates_id: values.emirates_id,
        email_notify: values.emailNotify,
        sms_notify: values.smsNotify,
        lang: values.lang,
      };
      dispatch(
        sendMemberRegister({ data: { ...readyValues }, userType: type })
      );
    } else if (type == "supplier") {
      const readyValues = {
        userName: values.userName,
        password: values.password,
        email: values.email,
        prefferedMean: values.prefferedMean,
        notificationByEmail: values.notificationByEmail === "1" ? true : false,
        notificationBySms: values.notificationBySms === "1" ? true : false,
        prefferedLanguage: values.prefferedLanguage,
        supplierPhone: values?.supplierPhone,
      };
      dispatch(sendSupplierRegister({ data: { ...readyValues } }));
    }
    // resetForm({});
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const result = APIServices.memberRegister;
    if (result.user_id) {
      setOpen(true);
      setMessage(`Your ID is ${result.user_id} .`);
      setTimeout(() => {
        store.dispatch(push("/login"));
      }, 7000);
    } else {
      if (result.error == 101) {
        setErrorMessage(isRTL ? "الشركة غير موجودة" : "Company Not Exists");
      }
      if (result.error == 102) {
        setErrorMessage(isRTL ? "اسم المستخدم موجود" : "User Name Exists");
      }
      if (result.error == 107) {
        setErrorMessage(
          isRTL ? "تاريخ العضوية غير صالح" : " Membership date is not correct"
        );
      }
      if (result.error == 108) {
        setErrorMessage(
          isRTL
            ? "رقم السجل التجاري غير صحيح"
            : "Trade registration number is not correct"
        );
      }
      if (result.error == 109) {
        setErrorMessage(
          isRTL
            ? "البريد الالكتروني موجود مسبقاً"
            : "This email is used in another account before, please user different email"
        );
      }
      if (result.success === false) {
        setErrorMessage(result.message);
      } else {
        setErrorMessage(result.error_message);
      }
    }
    // if (Object.keys(APIServices.memberRegister).length) {
    //   dispatch(sendMemberRegisterDone({ data: [] }));
    // }
  }, [APIServices.memberRegister]);

  useEffect(() => {
    const result = APIServices.supplierRegister;
    if (result?.data?.id) {
      setOpen(true);
      setMessage(`Your ID is ${result?.data?.id} .`);
      setTimeout(() => {
        store.dispatch(push(type === "supplier" ? "/confirm-email" : "/login"));
      }, 7000);
    } else {
      if (result.success === false) {
        setDisabledBtn(false);
        setErrorMessage(result.data?.message);
      }
      if (result.data?.code == 1) {
        setDisabledBtn(false);
        setErrorMessage(isRTL ? "المورد موجود مسبقا" : "Supplier Exists");
      } else {
        setDisabledBtn(false);
        setErrorMessage(result.data?.message);
      }
    }
  }, [APIServices.supplierRegister]);
  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {type == "supplier"
          ? t("SERVICESPAGES.SIGNUP.SIGNUP_SUPPLIER")
          : t("SERVICESPAGES.SIGNUP.NEWREGISTER")}
      </Typography>
      {type == "supplier" && (
        <span className={classes.supplier}>
          {t("SERVICESPAGES.SIGNUP.SUPPLIERPHRASE")}
        </span>
      )}
      {type == "membership" ? (
        <>
          {
            <Typography
              style={{
                fontSize: "14px",
                color: "#bb0909",
                textAlign: "start",
                backgroundColor: "#ff00001a",
                padding: "8px",
              }}
            >
              {isRTL
                ? "*في حال كنت عضوية راكز - منطقة حرة يرجى إدخال '0' في حقل رقم السجل التجاري"
                : "*Kindly if you are RAKEZ - Free Zone Membership use '0' for Trade Registration No. Field"}
            </Typography>
          }
          <Formik
            initialValues={initialValues}
            onSubmit={doSubmit}
            validationSchema={validationSchema}
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
                  classes.signUpForm,
                  "animate__animated animate__bounce"
                )}
                variant="outlined"
              >
                <Grid container>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                            setSelectedDate(e),
                            setFieldValue("memberShipDate", e)
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="name"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.CONTACTNAME")}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={7} className={classes.fullContainerWidth}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="name"
                        name="name"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="email"
                        className={classes.label}
                        required
                      >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="mobile"
                        className={classes.label}
                        required
                      >
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
                  <Box className={classes.divider2}></Box>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                          {t("SERVICESPAGES.SIGNUP.EMAIL")}
                        </label>
                        <label>
                          <Field type="radio" name="response" value="2" />
                          {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="gender"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.GENDER")}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={9}>
                      <Box display="flex" className="radioButtons">
                        <label>
                          <Field type="radio" name="gender" value="1" />
                          {t("SERVICESPAGES.SIGNUP.MALE")}
                        </label>
                        <label>
                          <Field type="radio" name="gender" value="2" />
                          {t("SERVICESPAGES.SIGNUP.FEMALE")}
                        </label>
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
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
                  <Box className={classes.divider2}></Box>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="userName"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.USERNAME")}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={7} className={classes.fullContainerWidth}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="userName"
                        name="userName"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="password"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.PASSWORD")}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={7} className={classes.fullContainerWidth}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="password"
                        name="password"
                        autoComplete="new-password"
                        variant="outlined"
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
                                  <VisibilityOff className={classes.redColor} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid
                      item
                      sm={3}
                      xs={12}
                      className={classes.fullContainerWidth}
                    >
                      <InputLabel
                        htmlFor="confirmPassword"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={7} className={classes.fullContainerWidth}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="confirmPassword"
                        name="confirmPassword"
                        variant="outlined"
                        type={showConfirmPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                className={classes.verticalPadding0}
                              >
                                {showConfirmPassword ? (
                                  <Visibility className={classes.redColor} />
                                ) : (
                                  <VisibilityOff className={classes.redColor} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Box className={classes.passwordNote}>
                      <br />
                      <Typography>
                        {isRTL
                          ? "يرجى مراعاة التالي عند اختيار كلمة المرور الخاصة بك:"
                          : "Please consider the following when choosing your password:"}
                      </Typography>
                      <Typography>
                        {isRTL
                          ? "1-يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف"
                          : "1-The minimum password length should be at least (8) characters"}
                      </Typography>
                      <Typography>
                        {isRTL
                          ? "2-أن تتكون كلمة المرور من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
                          : "2-The password must consist of English letters(must contains both Capital and Small), numbers and special characters"}
                      </Typography>
                    </Box>
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
                      <span> {isRTL ? "أوافق على " : "I agree "}</span>
                      <Link to="/privacy-policy">
                        {" "}
                        <span>
                          {" "}
                          {isRTL ? "سياسية الخصوصية " : "Privacy Policy "}
                        </span>
                      </Link>
                      <span>{isRTL ? " و " : "and "}</span>
                      <Link to="/terms-conditions">
                        {" "}
                        <span>
                          {" "}
                          {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
                        </span>
                      </Link>
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
                    {t("SERVICESPAGES.SIGNUP.SIGNUP")}
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
        </>
      ) : type === "personal" ? (
        <Formik
          initialValues={initialValues}
          onSubmit={doSubmit}
          validationSchema={validationSchema2}
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
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel htmlFor="emirates_id" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.EIDOPTIONAL")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="emirates_id"
                      name="emirates_id"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
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
                {/* <Grid item xs={12}>
                  <Typography className="info" name="fills">
                    {isRTL
                      ? "يجب ملء حقل الاسم بإحدى اللغتين على الأقل (اللغة العربية أو الإنجليزية)"
                      : "Please fill your name in one language at least(Arabic or English)"}
                  </Typography>
                </Grid> */}
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel htmlFor="name" className={classes.label}>
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAME")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="name"
                      name="name"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      required
                      htmlFor="name_e"
                      className={classes.label}
                    >
                      {t("SERVICESPAGES.SIGNUP.PASSPORTNAMEE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="name_e"
                      name="name_e"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box className={classes.divider2}></Box>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="email"
                      className={classes.label}
                      required
                    >
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
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="mobile"
                      className={classes.label}
                      required
                    >
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
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
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
                  <Grid item sm={3} xs={12}>
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
                <Grid container item className={classes.inpuContainer}>
                  <Grid item sm={3} xs={12}>
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
                  <Grid item sm={3} xs={12}>
                    <InputLabel
                      htmlFor="userName"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.USERNAME")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="userName"
                      name="userName"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="password"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.PASSWORD")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      variant="outlined"
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
                                <VisibilityOff className={classes.redColor} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="confirmPassword"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="confirmPassword"
                      name="confirmPassword"
                      variant="outlined"
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              className={classes.verticalPadding0}
                            >
                              {showConfirmPassword ? (
                                <Visibility className={classes.redColor} />
                              ) : (
                                <VisibilityOff className={classes.redColor} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Box className="passwordNote">
                    <br />
                    <Typography>
                      {isRTL
                        ? "يرجى مراعاة التالي عند اختيار كلمة المرور الخاصة بك:"
                        : "Please consider the following when choosing your password:"}
                    </Typography>
                    <Typography>
                      {isRTL
                        ? "1-يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف"
                        : "1-The minimum password length should be at least (8) characters"}
                    </Typography>
                    <Typography>
                      {isRTL
                        ? "2-أن تتكون كلمة المرور من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
                        : "2-The password must consist of English letters(must contains both Capital and Small), numbers and special characters"}
                    </Typography>
                  </Box>
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

                    <span> {isRTL ? "أوافق على " : "I agree "}</span>
                    <Link to="/privacy-policy">
                      {" "}
                      <span>
                        {" "}
                        {isRTL ? "سياسية الخصوصية " : "Privacy Policy "}
                      </span>
                    </Link>
                    <span>{isRTL ? " و " : "and "}</span>
                    <Link to="/terms-conditions">
                      {" "}
                      <span>
                        {" "}
                        {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
                      </span>
                    </Link>
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
                  {t("SERVICESPAGES.SIGNUP.SIGNUP")}
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
          validationSchema={validationSchema3}
        >
          {({
            isValid,
            dirty,
            values,
            errors,
            touched,
            submitForm,
            setFieldValue,
            setFieldTouched,
            setFieldError,
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
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="userName"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.REPNAME")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="userName"
                      name="userName"
                      variant="outlined"
                      placeholder={
                        isRTL
                          ? "يرجى إدخال الاسم الكامل"
                          : "Enter Full Name Please"
                      }
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="email"
                      className={classes.label}
                      required
                    >
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
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="supplierPhone"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.FORMS.FORM.PHONE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    {" "}
                    <Field
                      component={PhoneInput}
                      name="supplierPhone"
                      type="text"
                      id="supplierPhone"
                      value={values?.supplierPhone}
                      labels={isRTL ? arLabels : enLabels}
                      className={classes.supplierPhone}
                      onChange={(e) => {
                        setFieldValue("supplierPhone", e);
                        if (e) {
                          if (!isValidPhoneNumber(e)) {
                            setFieldTouched("supplierPhone", true);
                            setFieldError(
                              "supplierPhone",
                              isRTL
                                ? "يرجى إضافة رقم الهاتف"
                                : "Please Add Phone Number"
                            );
                          }
                        }
                      }}
                      variant="outlined"
                      placeholder={t("SERVICESPAGES.SUPPLIER.PHONETEXT")}
                      defaultCountry="AE"
                      international
                    />
                    {errors?.supplierPhone && touched?.supplierPhone ? (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        {errors?.supplierPhone}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="password"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.PASSWORD")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      variant="outlined"
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
                                <VisibilityOff className={classes.redColor} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="confirmPassword"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={7} className={classes.fullContainerWidth}>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="confirmPassword"
                      name="confirmPassword"
                      variant="outlined"
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              className={classes.verticalPadding0}
                            >
                              {showConfirmPassword ? (
                                <Visibility className={classes.redColor} />
                              ) : (
                                <VisibilityOff className={classes.redColor} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Box className={classes.passwordNote}>
                    <br />
                    <Typography>
                      {isRTL
                        ? "يرجى مراعاة التالي عند اختيار كلمة المرور الخاصة بك:"
                        : "Please consider the following when choosing your password:"}
                    </Typography>
                    <Typography>
                      {isRTL
                        ? "1-يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف"
                        : "1-The minimum password length should be at least (8) characters"}
                    </Typography>
                    <Typography>
                      {isRTL
                        ? "2-أن تتكون كلمة المرور من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
                        : "2-The password must consist of English letters(must contains both Capital and Small), numbers and special characters"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="prefferedMean"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.RESPONSETYPE")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className={classes.check}>
                      <label>
                        <Field
                          type="checkbox"
                          component={Checkbox}
                          name="prefferedMean"
                          value="email"
                        />
                        {t("SERVICESPAGES.SIGNUP.EMAIL")}
                      </label>
                      <label>
                        <Field
                          type="checkbox"
                          component={Checkbox}
                          name="prefferedMean"
                          value="phone"
                        />
                        {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="prefferedLanguage"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.FAVLANG")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field
                          type="radio"
                          name="prefferedLanguage"
                          value="ar"
                        />
                        {t("SERVICESPAGES.SIGNUP.ARABIC")}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="prefferedLanguage"
                          value="en"
                        />
                        {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="notificationByEmail"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.MAILNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field
                          type="radio"
                          name="notificationByEmail"
                          value="1"
                        />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="notificationByEmail"
                          value="0"
                        />
                        {t("SERVICESPAGES.SIGNUP.NO")}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container item className={classes.inpuContainer}>
                  <Grid
                    item
                    sm={3}
                    xs={12}
                    className={classes.fullContainerWidth}
                  >
                    <InputLabel
                      htmlFor="notificationBySms"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIGNUP.SMSNOTIFY")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={9}>
                    <Box display="flex" className="radioButtons">
                      <label>
                        <Field
                          type="radio"
                          name="notificationBySms"
                          value="1"
                        />
                        {t("SERVICESPAGES.SIGNUP.YES")}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="notificationBySms"
                          value="0"
                        />
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

                    <span> {isRTL ? "أوافق على " : "I agree "}</span>
                    <Link to="/privacy-policy">
                      {" "}
                      <span>
                        {" "}
                        {isRTL ? "سياسية الخصوصية " : "Privacy Policy "}
                      </span>
                    </Link>
                    <span>{isRTL ? " و " : "and "}</span>
                    <Link to="/terms-conditions">
                      {" "}
                      <span>
                        {" "}
                        {isRTL ? "الشروط والأحكام" : "Terms & Conditions"}
                      </span>
                    </Link>
                  </label>
                </Grid>
                <Button
                  variant="contained"
                  className={classes.send}
                  disableElevation
                  endIcon={<IoLogIn />}
                  onClick={(e) => {
                    setDisabledBtn(true);
                    submitForm();
                  }}
                  disabled={!isValid || !dirty || disabledBtn}
                >
                  {t("SERVICESPAGES.SIGNUP.SIGNUP")}
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
      )}
      <ServicesResultModal open={open} message={message} setOpen={setOpen} />
    </Grid>
  );
}

export default memo(ServicesSignUp);
