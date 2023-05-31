import {
  Box,
  Button,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@material-ui/core";
import { FiEdit } from "react-icons/fi";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiRefresh } from "react-icons/bi";
import { HiSave } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import { store } from "../../../redux/store";
import useStyles from "../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "./ServicesResultModal";

const {
  getMembershipProfile,
  sendUpdatedPassword,
  sendUpdatedPasswordDone,
  sendMemberProfileUpdate,
  sendMemberProfileUpdateDone,
  serviceLoginDone,
  updateUserAction,
  userUpdated,
} = actions;

function UserProfile(props) {
  let loggedType = sessionStorage.getItem("loggedType");
  const serviceProfile =
    loggedType === "3"
      ? JSON.parse(sessionStorage.getItem("supplierProfile"))
      : JSON.parse(sessionStorage.getItem("serviceProfile"));
  let updateUser = sessionStorage.getItem("updateUser");
  const [activities, setActivities] = useState([]);
  const [company_profile, setCompany_profile] = useState([]);
  const [user_profile, setUser_profile] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmOldPassword, setShowConfirmOldPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openError, setOpenError] = useState(false);
  const [view, setView] = useState(true);
  const { t } = useTranslation();

  const classes = useStyles();

  const dispatch = useDispatch();

  const {
    APIServices,
    users,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /[\u0600-\u06FF]/;
  useEffect(() => {
    const company_code = serviceProfile?.company_code;
    const code = serviceProfile?.code;
    if (code || company_code)
      dispatch(
        getMembershipProfile({
          data: loggedType == "1" ? { company_code, code } : { code },
          dataType: loggedType,
        })
      );
  }, []);

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
      setNoThanks(true);
    } else if (serviceProfile == null) store.dispatch(push("/login"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.membershipProfile;
    if (result) {
      if (loggedType == "1") {
        if (result && result.activities && result.company_profile) {
          setActivities(result.activities.length ? result.activities : []);
          setCompany_profile(
            result.company_profile?.length ? result.company_profile[0] : []
          );
          setUser_profile(
            result.user_profile?.length ? result.user_profile[0] : []
          );
        }
      } else if (loggedType == "2") {
        setUser_profile(result.items?.length ? result.items[0] : []);
      }
    }
  }, [APIServices.membershipProfile]);

  const changePasswordinitialValues = {
    confirmPassword: "",
    oldPassword: "",
    newPassword: "",
    p_username: serviceProfile?.username,
  };
  const changePasswordValidationSchema = Yup.object({
    oldPassword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    newPassword: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        isRTL
          ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
          : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("newPassword"), null],
        isRTL ? "كلمتي السر غير متطابقين" : "Passwords must match"
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });
  const changePasswordDoSubmit = async (values, { resetForm }) => {
    const readyValues = {
      p_new_password: values.confirmPassword,
      p_old_password: values.oldPassword,
      p_username: serviceProfile?.username,
    };
    dispatch(
      sendUpdatedPassword({ data: { ...readyValues }, userType: loggedType })
    );
  };
  const initialValues = {
    city: isRTL
      ? company_profile?.company_city
      : company_profile?.company_city_e,
    officePhone: company_profile?.telephone,
    mobilePhone: company_profile?.mobile_contact,
    fax: company_profile?.fax,
    PBox: company_profile?.pobox,
    email: company_profile?.email,
    contactName: user_profile?.contact_name,
    contactEmail: user_profile?.email,
    contactMobilePhone: user_profile?.mobile,
    personalComunication:
      user_profile?.usr_contact_switch == 0
        ? null
        : user_profile?.usr_contact_switch,
    personalLang:
      user_profile?.usr_lang_switch == 0
        ? null
        : user_profile?.usr_contact_switch,
    gender: user_profile?.usr_gender == 0 ? null : user_profile?.usr_gender,
    age: user_profile?.usr_age == 0 ? null : user_profile?.usr_age,
    typeOfWork:
      user_profile?.usr_worktype == 0 ? null : user_profile?.usr_worktype,
    checkTerms: [],
    emirates_id: user_profile?.emirates_id,
    passportNo: user_profile?.passport_no,
    userName: user_profile?.username,
    name_e: user_profile?.name_e,
    name: user_profile?.name,
    userEmail: user_profile?.email,
    mobile: user_profile?.mobile,
    code: user_profile?.code,
    lang: user_profile?.language,
    smsNotify: user_profile?.sms_notify,
    emailNotify: user_profile?.email_notify,
  };
  const companyUpdateSubmit = async (values, { resetForm }) => {
    const readyValues = {
      company_code: company_profile?.company_code,
      office_phone: values.officePhone,
      mobile_phone: values?.mobilePhone,
      fax: values?.fax,
      pobox: values?.PBox,
      email: values?.email,
    };
    dispatch(
      sendMemberProfileUpdate({
        data: { ...readyValues },
        dataType: "membership",
      })
    );
  };
  const userUpdateSubmit = async (values, { resetForm }) => {
    const readyValues = {
      user_code: user_profile?.user_code,
      user_name: user_profile?.user_name,
      contact_name: values.contactName,
      mobile_phone: values?.contactMobilePhone,
      usr_contact_method: values?.personalComunication,
      usr_language: values?.personalLang,
      usr_gender: values?.gender,
      usr_age: values?.age,
      usr_worktype: values?.typeOfWork,
      email: values?.contactEmail,
    };
    dispatch(
      sendMemberProfileUpdate({ data: { ...readyValues }, dataType: "user" })
    );
  };
  const personalUserSubmit = async (values, { resetForm }) => {
    const readyValues = {
      code: user_profile?.code,
      name: values.name,
      name_e: values?.name_e,
      emirates_id: values?.emirates_id,
      mobile: values?.mobile,
      email: user_profile?.email,
      username: values?.userName,
      passport_no: values?.passportNo,
      updated_by: user_profile?.username,
      email_notify: values?.emailNotify,
      language: values?.lang,
      sms_notify: values?.smsNotify,
    };
    dispatch(
      sendMemberProfileUpdate({ data: { ...readyValues }, dataType: "person" })
    );
  };
  const companyUpdateValidationSchema = Yup.object({
    officePhone: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(9, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .nullable(),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .nullable(),
    mobilePhone: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .nullable(),
    fax: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(9, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .nullable(),
  });
  const userUpdateValidationSchema = Yup.object({
    contactName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    contactEmail: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .nullable(),
    contactMobilePhone: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .required(isRTL ? "مطلوب" : "Required")
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .nullable(),
    personalComunication: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    gender: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    personalLang: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    age: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    typeOfWork: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    checkTerms: updateUser && Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
  });

  const personalUserSubmitValidationSchema = Yup.object({
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .min(10, isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid")
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    name: Yup.string().matches(
      arabicLangRegex,
      isRTL ? "الاسم باللغة العربية" : "Name in Arabic"
    ),
    name_e: Yup.string().matches(
      englishLangRegex,
      isRTL ? "الاسم باللغة الانجليزية" : "Name in English"
    ),
    emirates_id: Yup.string()
      .min(
        15,
        isRTL
          ? "الهوية الإماراتية يجب أن تتكون على الأقل من 15 محرف"
          : "Emirates ID must be at least 15 characters"
      )
      .nullable(),
    passportNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    userName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmOldPassword = () => {
    setShowConfirmOldPassword(!showConfirmOldPassword);
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const result = APIServices.memberProfileUpdated;
    if (result.updated == 1) {
      setOpen(true);
      setMessage(
        isRTL
          ? "تم تحديث معلوماتك بنجاح ."
          : `Your Information Updated Successfully.`
      );
      if (updateUser) {
        sessionStorage.removeItem("updateUser");
        store.dispatch(push("/services/rak-chamber/dashboard"));
      } else {
        const company_code = serviceProfile?.company_code;
        const code = serviceProfile?.code;

        setTimeout(() => {
          setOpen(false);
          dispatch(getMembershipProfile({ data: { company_code, code } }));
        }, 5000);
      }
    } else if (result.updated == 0) {
      setErrorMessage(
        isRTL
          ? "لم يتم تحديث معلوماتك , يرجى التحقق من البيانات المدخلة ."
          : "Your information has not been updated, please check the entered data"
      );
      handleClick();
    }
    if (Object.keys(APIServices.memberProfileUpdated).length)
      dispatch(sendMemberProfileUpdateDone({ data: {} }));
  }, [APIServices.memberProfileUpdated]);

  useEffect(() => {
    if (users?.userUpdated?.success) {
      setOpen(true);
      setMessage(
        isRTL
          ? "تم تحديث معلوماتك بنجاح ."
          : `Your Profile Updated Successfully.`
      );
      setTimeout(() => {
        dispatch(userUpdated({ response: false }));
      }, 5000);
    } else if (users?.userUpdated?.message && !users?.userUpdated?.success) {
      setOpen(true);
      setMessage(
        isRTL
          ? "لم يتم تحديث معلوماتك , يرجى التحقق من البيانات المدخلة ."
          : "Your information has not been updated, please check the entered data"
      );
    } else setOpen(false);
  }, [users]);

  useEffect(() => {
    const result = APIServices.passwordUpdated;
    if (result.updated == 1) {
      setOpen(true);
      setMessage(
        isRTL
          ? "تم تحديث كلمة المرور بنجاح ."
          : `Your Password Updated Successfully.`
      );

      setTimeout(() => {
        dispatch(serviceLoginDone({ status: 0 }));
        sessionStorage.setItem("loggedType", 0);
        sessionStorage.removeItem("memberType");
        sessionStorage.removeItem("serviceProfile");
        sessionStorage.removeItem("uaePassUserInfo");
        store.dispatch(push("/login"));
      }, 5000);
    } else if (result.error) {
      setErrorMessage(
        isRTL
          ? "لم يتم تحديث كلمة المرور , يرجى التحقق من البيانات المدخلة ."
          : "Your password has not been updated, please check the entered data"
      );
      handleClick();
    }
    if (Object.keys(APIServices.passwordUpdated).length)
      dispatch(sendUpdatedPasswordDone({ data: {} }));
  }, [APIServices.passwordUpdated]);

  const handleClick = () => {
    setOpenError(true);
  };

  const handleClose = () => {
    setOpenError(false);
  };

  const supplierInitialValues = {
    email: serviceProfile?.email ? serviceProfile?.email : "",
    userName: serviceProfile?.userName ? serviceProfile?.userName : "",
    password: "",
    confirmPassword: "",
    oldPassword: "",
    prefferedMean: serviceProfile?.prefferedMean
      ? serviceProfile?.prefferedMean
      : [],
    prefferedLanguage: serviceProfile?.prefferedLanguage
      ? serviceProfile?.prefferedLanguage
      : "",
    notificationByEmail: serviceProfile?.notificationByEmail ? "1" : "0",
    notificationBySms: serviceProfile?.notificationBySms ? "1" : "0",
  };

  const supplierValidationSchema = Yup.object({
    userName: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        isRTL ? /[ء-ي]+\s[ء-ي]+/ : /\w\s\w/,
        isRTL
          ? "الاسم الكامل و باللغة العربية من فضلك"
          : "Provide Full Name in English Please"
      ),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    prefferedMean: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    prefferedLanguage: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    oldPassword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    password: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      isRTL
        ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
        : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      isRTL ? "يجب أن تطابق كلمة المرور الجديدة" : "must match new Password"
    ),
    notificationByEmail: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    notificationBySms: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    const readyValues =
      values?.password !== ""
        ? {
            userName: values.userName,
            oldPassword: values?.oldPassword,
            password: values.password,
            email: values.email,
            prefferedMean: values.prefferedMean,
            notificationByEmail:
              values.notificationByEmail === "1" ? true : false,
            notificationBySms: values.notificationBySms === "1" ? true : false,
            prefferedLanguage: values.prefferedLanguage,
          }
        : {
            userName: values.userName,
            email: values.email,
            prefferedMean: values.prefferedMean,
            notificationByEmail:
              values.notificationByEmail === "1" ? true : false,
            notificationBySms: values.notificationBySms === "1" ? true : false,
            prefferedLanguage: values.prefferedLanguage,
          };
    dispatch(
      updateUserAction({ id: serviceProfile?.id, payload: readyValues })
    );

    // resetForm({});
  };
  return (
    <Box className={classes.profileRoot}>
      <Grid container className={classes.formRoot}>
        {!updateUser && loggedType == "1" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography className="sectionTitle">
                {t("SERVICESPAGES.PROFILE.COMPANYINFO")}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.SIGNUP.MEMBERSHIPCODE")}
              </Typography>
              <Typography className="label2">
                {company_profile?.company_code}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.PROFILE.COMPANYNAME")}
              </Typography>
              <Typography className="label2">
                {isRTL
                  ? company_profile?.company_name
                  : company_profile?.company_name_e}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.SIGNUP.TRN")}
              </Typography>
              <Typography className="label2">
                {company_profile?.trade_registration_no}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.SIGNUP.MEMBERSHIPDATE")}
              </Typography>
              <Typography className="label2">
                {company_profile?.membership_date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.PROFILE.ISSUEDATE")}
              </Typography>
              <Typography className="label2">
                {company_profile?.membership_issue_date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.SIDEMENU.EXPIRE")}
              </Typography>
              <Typography className="label2">
                {company_profile?.membership_expiry_date}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.PROFILE.CLASSIFICATION")}
              </Typography>
              <Typography className="label2">
                {isRTL
                  ? company_profile?.company_legal_status
                  : company_profile?.company_legal_status_e}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} className="companyInfo">
              <Typography className="label1">
                {t("SERVICESPAGES.PROFILE.CATEGORY")}
              </Typography>
              <Typography className="label2">
                {isRTL
                  ? company_profile?.company_category
                  : company_profile?.company_category_e}
              </Typography>
            </Grid>
            <Grid container item xs={12} className="companyInfo">
              <Grid item xs={12}>
                <Typography className="label1">
                  {t("SERVICESPAGES.PROFILE.ACTIVITIES")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={12}>
                <Box>
                  {activities &&
                    activities?.map((item) => {
                      return (
                        <Typography className="label2">
                          - {isRTL ? item.company_name : item?.company_name_e}
                        </Typography>
                      );
                    })}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
        {!updateUser && loggedType == "1" && (
          <Grid container>
            <Formik
              initialValues={initialValues}
              validationSchema={companyUpdateValidationSchema}
              onSubmit={companyUpdateSubmit}
              enableReinitialize
            >
              {function FirstForm({
                isValid,
                dirty,
                values,
                submitForm,
                errors,
                touched,
                setTouched,
              }) {
                useEffect(() => {
                  if (
                    initialValues &&
                    APIServices.membershipProfile?.networkSuccess
                  )
                    setTouched({
                      ...touched,
                      ["city"]: true,
                      ["officePhone"]: true,
                      ["mobilePhone"]: true,
                      ["fax"]: true,
                      ["PBox"]: true,
                      ["email"]: true,
                    });
                }, [initialValues, APIServices.membershipProfile]);
                return (
                  <Form variant="outlined">
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography className="sectionTitle">
                          {t("SERVICESPAGES.PROFILE.COMPANYADDRESS")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="city" className="label3">
                          {t("SERVICESPAGES.PROFILE.CITY")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="city"
                          name="city"
                          variant="outlined"
                          disabled
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="officePhone" className="label3">
                          {t("SERVICESPAGES.PROFILE.OFFICEPHONE")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="officePhone"
                          name="officePhone"
                          variant="outlined"
                          inputProps={{ maxLength: 9 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="mobilePhone" className="label3">
                          {t("SERVICESPAGES.DIRECTORY.MOBILE")}{" "}
                        </InputLabel>

                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="mobilePhone"
                          name="mobilePhone"
                          variant="outlined"
                          inputProps={{ maxLength: 10 }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="fax" className="label3">
                          {t("SERVICESPAGES.PROFILE.FAX")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="fax"
                          name="fax"
                          variant="outlined"
                          inputProps={{ maxLength: 9 }}
                        />
                      </Grid>{" "}
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="PBox" className="label3">
                          {t("SERVICESPAGES.PROFILE.PBOX")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="PBox"
                          name="PBox"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <InputLabel htmlFor="email" className="label3">
                          {t("SERVICESPAGES.FORMS.FORM.EMAIL")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="email"
                          name="email"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      className={classes.send}
                      disableElevation
                      endIcon={<HiSave />}
                      onClick={submitForm}
                      disabled={!isValid || !dirty}
                    >
                      {t("SERVICESPAGES.PROFILE.UPDATE")}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        )}
        {loggedType == "1" && (
          <Grid container>
            <Formik
              initialValues={initialValues}
              validationSchema={userUpdateValidationSchema}
              onSubmit={userUpdateSubmit}
              enableReinitialize
            >
              {function MyForm({
                isValid,
                dirty,
                values,
                submitForm,
                errors,
                touched,
                initialValues,
                setTouched,
              }) {
                useEffect(() => {
                  if (
                    initialValues &&
                    APIServices.membershipProfile?.networkSuccess
                  )
                    setTouched({
                      ...touched,
                      ["contactName"]: true,
                      ["contactEmail"]: true,
                      ["contactMobilePhone"]: true,
                      ["personalComunication"]: true,
                      ["personalLang"]: true,
                      ["gender"]: true,
                      ["age"]: true,
                      ["typeOfWork"]: true,
                      ["checkTerms"]: true,
                    });
                }, [initialValues, APIServices.membershipProfile]);
                return (
                  <Form variant="outlined">
                    <Grid container spacing={3}>
                      {updateUser && (
                        <Grid item xs={12}>
                          <Typography style={{ fontWeight: "600" }}>
                            {isRTL
                              ? "عملاؤنا الأعزاء, حرصاً منا على تحسين جودة خدماتنا المقدمة لكم دوماً، يرجى تحديث بياناتكم أدناه قبل استكمال طلباتكم"
                              : "Dear Customers, In order for us to improve the quality of our services to you consistently, please update your information below before proceeding with your requests"}
                          </Typography>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Typography className="sectionTitle">
                          {t("SERVICESPAGES.PROFILE.PERSONALINFO")}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="contactName"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.CONTACTNAME")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="contactName"
                          name="contactName"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="contactEmail"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.FORMS.FORM.EMAIL")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="contactEmail"
                          name="contactEmail"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="contactMobilePhone"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                        </InputLabel>
                        <Field
                          component={TextField}
                          className="textField2"
                          type="text"
                          id="contactMobilePhone"
                          name="contactMobilePhone"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="personalComunication"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.RESPONSETYPE")}
                        </InputLabel>
                        <Box display="flex" className="radioButtons">
                          <label>
                            <Field
                              type="radio"
                              name="personalComunication"
                              value="1"
                              checked={values.personalComunication == "1"}
                            />
                            {t("SERVICESPAGES.FORMS.FORM.EMAIL")}{" "}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="personalComunication"
                              value="2"
                              checked={values.personalComunication == "2"}
                            />
                            {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                          </label>
                        </Box>
                        {touched?.personalComunication &&
                        errors?.personalComunication ? (
                          <div className={classes.error}>
                            {errors?.personalComunication}
                          </div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="personalLang"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.FAVLANG")}
                        </InputLabel>
                        <Box display="flex" className="radioButtons">
                          <label>
                            <Field
                              type="radio"
                              name="personalLang"
                              value="1"
                              checked={values.personalLang == "1"}
                            />
                            {t("SERVICESPAGES.SIGNUP.ARABIC")}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="personalLang"
                              value="2"
                              checked={values.personalLang == "2"}
                            />
                            {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                          </label>
                        </Box>
                        {touched?.personalLang && errors?.personalLang ? (
                          <div className={classes.error}>
                            {errors?.personalLang}
                          </div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="gender"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.GENDER")}
                        </InputLabel>
                        <Box display="flex" className="radioButtons">
                          <label>
                            <Field
                              type="radio"
                              name="gender"
                              value="1"
                              checked={values.gender == "1"}
                            />
                            {t("SERVICESPAGES.SIGNUP.MALE")}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="gender"
                              value="2"
                              checked={values.gender == "2"}
                            />
                            {t("SERVICESPAGES.SIGNUP.FEMALE")}
                          </label>
                        </Box>
                        {touched?.gender && errors?.gender ? (
                          <div className={classes.error}>{errors?.gender}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel htmlFor="age" className="label3" required>
                          {t("SERVICESPAGES.SIGNUP.AGE")}
                        </InputLabel>
                        <Box display="flex" className="radioButtons">
                          <label>
                            <Field
                              type="radio"
                              name="age"
                              value="1"
                              checked={values.age == "1"}
                            />
                            {"< 25"}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="age"
                              value="2"
                              checked={values.age == "2"}
                            />
                            25-30
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="age"
                              value="3"
                              checked={values.age == "3"}
                            />
                            31-35
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="age"
                              value="4"
                              checked={values.age == "4"}
                            />
                            36-40
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="age"
                              value="5"
                              checked={values.age == "5"}
                            />
                            {"40 <"}
                          </label>
                        </Box>
                        {touched?.age && errors?.age ? (
                          <div className={classes.error}>{errors?.age}</div>
                        ) : null}
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="typeOfWork"
                          className="label3"
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.WORKTYPE")}
                        </InputLabel>
                        <Box display="flex" className="radioButtons">
                          <label>
                            <Field
                              type="radio"
                              name="typeOfWork"
                              value="1"
                              checked={values.typeOfWork == "1"}
                            />
                            {t("SERVICESPAGES.SIGNUP.OWNER")}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="typeOfWork"
                              value="2"
                              checked={values.typeOfWork == "2"}
                            />
                            {t("SERVICESPAGES.SIGNUP.PARTNER")}{" "}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="typeOfWork"
                              value="3"
                              checked={values.typeOfWork == "3"}
                            />
                            {t("SERVICESPAGES.SIGNUP.AGENT")}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="typeOfWork"
                              value="4"
                              checked={values.typeOfWork == "4"}
                            />
                            {t("SERVICESPAGES.SIGNUP.EMPLOYEE")}
                          </label>
                          <label>
                            <Field
                              type="radio"
                              name="typeOfWork"
                              value="99"
                              checked={values.typeOfWork == "99"}
                            />
                            {t("SERVICESPAGES.SIGNUP.OTHER")}
                          </label>
                        </Box>
                        {touched?.typeOfWork && errors?.typeOfWork ? (
                          <div className={classes.error}>
                            {errors?.typeOfWork}
                          </div>
                        ) : null}
                      </Grid>
                      {updateUser && (
                        <Grid container>
                          <Box display="flex" flexDirection="column">
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
                            {touched?.checkTerms && errors?.checkTerms ? (
                              <div
                                className={clsx(
                                  classes.error,
                                  classes.paddingLeft16
                                )}
                              >
                                {errors?.checkTerms}
                              </div>
                            ) : null}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                    <Button
                      variant="contained"
                      className={classes.send}
                      disableElevation
                      endIcon={<HiSave />}
                      onClick={submitForm}
                      disabled={!isValid || !dirty}
                    >
                      {t("SERVICESPAGES.PROFILE.UPDATE")}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        )}
        {loggedType == "2" && (
          <Grid container>
            <Formik
              initialValues={initialValues}
              onSubmit={personalUserSubmit}
              validationSchema={personalUserSubmitValidationSchema}
              enableReinitialize
            >
              {function SecondForm({
                isValid,
                dirty,
                values,
                submitForm,
                setTouched,
                touched,
                errors,
              }) {
                useEffect(() => {
                  if (
                    initialValues &&
                    APIServices.membershipProfile?.networkSuccess
                  )
                    setTouched({
                      ...touched,
                      ["code"]: true,
                      ["mobile"]: true,
                      ["userEmail"]: true,
                      ["name"]: true,
                      ["name_e"]: true,
                      ["userName"]: true,
                      ["passportNo"]: true,
                      ["emirates_id"]: true,
                      ["emailNotify"]: true,
                      ["smsNotify"]: true,
                      ["lang"]: true,
                    });
                }, [initialValues, APIServices.membershipProfile]);
                return (
                  <Form
                    className={clsx(
                      classes.fullForm,
                      "animate__animated animate__bounce"
                    )}
                    variant="outlined"
                    style={{ borderTop: "none" }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography className="sectionTitle">
                          {t("SERVICESPAGES.PROFILE.PERSONALINFO")}
                        </Typography>
                      </Grid>
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={3}>
                          <InputLabel htmlFor="code" className={classes.label}>
                            {t("SERVICESPAGES.SIGNUP.USER_CODE")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="code"
                            name="code"
                            variant="outlined"
                            disabled
                          />
                        </Grid>
                      </Grid>
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="mobile"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
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
                            htmlFor="userEmail"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.FORMS.FORM.EMAIL")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="userEmail"
                            name="userEmail"
                            variant="outlined"
                            disabled
                          />
                        </Grid>
                      </Grid>

                      <Box className={classes.divider2}></Box>

                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={3}>
                          <InputLabel htmlFor="name" className={classes.label}>
                            {t("SERVICESPAGES.SIGNUP.PASSPORTNAME")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
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
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="name_e"
                            className={classes.label}
                          >
                            {t("SERVICESPAGES.SIGNUP.PASSPORTNAMEE")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
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
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="userName"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.SIGNUP.USERNAME")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
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
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="passportNo"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.SIGNUP.PASSPORTNO")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="passportNo"
                            name="passportNo"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={3}>
                          <InputLabel
                            htmlFor="emirates_id"
                            className={classes.label}
                          >
                            {t("SERVICESPAGES.SIGNUP.EIDOPTIONAL")}
                          </InputLabel>
                        </Grid>
                        <Grid item xs={7}>
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
                              <Field
                                type="radio"
                                name="emailNotify"
                                value="1"
                                checked={values.emailNotify == "1"}
                              />
                              {t("SERVICESPAGES.SIGNUP.YES")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="emailNotify"
                                value="0"
                                checked={values.emailNotify == "0"}
                              />
                              {t("SERVICESPAGES.SIGNUP.NO")}
                            </label>
                          </Box>
                          {touched?.emailNotify && errors?.emailNotify ? (
                            <div className={classes.error}>
                              {errors?.emailNotify}
                            </div>
                          ) : null}
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
                              <Field
                                type="radio"
                                name="smsNotify"
                                value="1"
                                checked={values.smsNotify == "1"}
                              />
                              {t("SERVICESPAGES.SIGNUP.YES")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="smsNotify"
                                value="0"
                                checked={values.smsNotify == "0"}
                              />
                              {t("SERVICESPAGES.SIGNUP.NO")}
                            </label>
                          </Box>
                          {touched?.smsNotify && errors?.smsNotify ? (
                            <div className={classes.error}>
                              {errors?.smsNotify}
                            </div>
                          ) : null}
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
                              <Field
                                type="radio"
                                name="lang"
                                value="1"
                                checked={values.lang == "1"}
                              />
                              {t("SERVICESPAGES.SIGNUP.ARABIC")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="lang"
                                value="2"
                                checked={values.lang == "2"}
                              />
                              {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                            </label>
                          </Box>
                          {touched?.lang && errors?.lang ? (
                            <div className={classes.error}>{errors?.lang}</div>
                          ) : null}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      className={classes.send}
                      disableElevation
                      endIcon={<HiSave />}
                      onClick={submitForm}
                      disabled={!isValid || !dirty}
                    >
                      {t("SERVICESPAGES.PROFILE.UPDATE")}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </Grid>
        )}
        {loggedType == "3" && (
          <Grid container>
            <Box
              className={classes.updateIconBox}
              onClick={(e) => setView(false)}
            >
              <FiEdit className={classes.updateIcon} />
            </Box>
            <Formik
              initialValues={supplierInitialValues}
              onSubmit={doSubmit}
              validationSchema={supplierValidationSchema}
            >
              {function ThirdForm({
                isValid,
                dirty,
                values,
                errors,
                touched,
                submitForm,
                setTouched,
              }) {
                useEffect(() => {
                  if (initialValues && !view)
                    setTouched({
                      ...touched,
                      ["userName"]: true,
                      ["email"]: true,
                      ["oldPassword"]: true,
                      ["password"]: true,
                      ["confirmPassword"]: true,
                      ["prefferedMean"]: true,
                      ["prefferedLanguage"]: true,
                      ["notificationByEmail"]: true,
                      ["notificationBySms"]: true,
                    });
                }, [initialValues, view]);
                return (
                  <Form
                    className={clsx(
                      classes.fullForm,
                      classes.noBorderTop,
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
                        <Grid
                          item
                          xs={7}
                          className={classes.fullContainerWidth}
                        >
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="userName"
                            name="userName"
                            variant="outlined"
                            disabled={view}
                            ceholder={
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
                        <Grid
                          item
                          xs={7}
                          className={classes.fullContainerWidth}
                        >
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="email"
                            name="email"
                            variant="outlined"
                            disabled={view}
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
                            htmlFor="oldPassword"
                            className={classes.label}
                            required
                          >
                            {t("SERVICESPAGES.SIGNUP.OLDPASSWORD")}
                          </InputLabel>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          className={classes.fullContainerWidth}
                        >
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="oldPassword"
                            name="oldPassword"
                            autoComplete="oldPassword"
                            variant="outlined"
                            disabled={view}
                            type={showOldPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowOldPassword}
                                    onMouseDown={handleMouseDownOldPassword}
                                    className={classes.verticalPadding0}
                                  >
                                    {showOldPassword ? (
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
                          >
                            {t("SERVICESPAGES.SIGNUP.NEWPASSWORD")}
                          </InputLabel>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          className={classes.fullContainerWidth}
                        >
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            disabled={view}
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
                            required={values?.password !== ""}
                          >
                            {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                          </InputLabel>
                        </Grid>
                        <Grid
                          item
                          xs={7}
                          className={classes.fullContainerWidth}
                        >
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="confirmPassword"
                            name="confirmPassword"
                            variant="outlined"
                            disabled={view}
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
                      <Box className={classes.divider2}></Box>
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
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.EMAIL")}
                            </label>
                            <label>
                              <Field
                                type="checkbox"
                                component={Checkbox}
                                name="prefferedMean"
                                value="phone"
                                disabled={view}
                              />
                              {t("SERVICESPAGES.DIRECTORY.MOBILE")}
                            </label>
                          </Box>
                          {touched?.prefferedMean && errors?.prefferedMean ? (
                            <div className={classes.error}>
                              {errors?.prefferedMean}
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
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.ARABIC")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="prefferedLanguage"
                                value="en"
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.ENGLISH")}
                            </label>
                          </Box>
                          {touched?.prefferedLanguage &&
                          errors?.prefferedLanguage ? (
                            <div className={classes.error}>
                              {errors?.prefferedLanguage}
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
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.YES")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="notificationByEmail"
                                value="0"
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.NO")}
                            </label>
                          </Box>
                          {touched?.notificationByEmail &&
                          errors?.notificationByEmail ? (
                            <div className={classes.error}>
                              {errors?.notificationByEmail}
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
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.YES")}
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="notificationBySms"
                                value="0"
                                disabled={view}
                              />
                              {t("SERVICESPAGES.SIGNUP.NO")}
                            </label>
                          </Box>
                          {touched?.notificationBySms &&
                          errors?.notificationBySms ? (
                            <div className={classes.error}>
                              {errors?.notificationBySms}
                            </div>
                          ) : null}
                        </Grid>
                      </Grid>
                      <Button
                        variant="contained"
                        className={classes.send}
                        disableElevation
                        endIcon={<BiRefresh />}
                        onClick={submitForm}
                        disabled={!isValid || !dirty}
                      >
                        {t("SERVICESPAGES.SIGNUP.UPDATEPROFILE")}
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
                );
              }}
            </Formik>
          </Grid>
        )}
        {!updateUser && (
          <Grid container>
            <Formik
              initialValues={changePasswordinitialValues}
              validationSchema={changePasswordValidationSchema}
              onSubmit={changePasswordDoSubmit}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({
                isValid,
                dirty,
                values,
                submitForm,
                setFieldTouched,
                setFieldValue,
                errors,
                touched,
              }) => (
                <Form variant="outlined">
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography className="sectionTitle">
                        {t("SERVICESPAGES.PROFILE.CHANGEPASSWORD")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <InputLabel
                        htmlFor="oldPassword"
                        className="label3"
                        required
                      >
                        {t("SERVICESPAGES.PROFILE.OLDPASSWORD")}
                      </InputLabel>
                      <Field
                        component={TextField}
                        className="textField2"
                        id="oldPassword"
                        name="oldPassword"
                        variant="outlined"
                        type={showOldPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                onMouseDown={handleMouseDownPassword}
                                className={classes.verticalPadding0}
                              >
                                {showOldPassword ? (
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
                    <Grid item xs={12} md={4}>
                      <InputLabel
                        htmlFor="newPassword"
                        className="label3"
                        required
                      >
                        {t("SERVICESPAGES.PROFILE.NEWPASSWORD")}
                      </InputLabel>
                      <Field
                        component={TextField}
                        className="textField2"
                        id="newPassword"
                        name="newPassword"
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
                    <Grid item xs={12} md={4}>
                      <InputLabel
                        htmlFor="confirmPassword"
                        className="label3"
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                      </InputLabel>
                      <Field
                        component={TextField}
                        className="textField2"
                        id="confirmPassword"
                        name="confirmPassword"
                        variant="outlined"
                        onChange={(e) => {
                          setFieldValue("confirmPassword", e.target.value);
                          setFieldTouched("confirmPassword");
                        }}
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
                    <Grid item xs={12}>
                      <Box className={classes.passwordNote}>
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
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        className={classes.send}
                        disableElevation
                        onClick={submitForm}
                        disabled={!isValid || !dirty}
                      >
                        {t("SERVICESPAGES.PROFILE.CHANGEPASSWORD")}
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        )}
        <ServicesResultModal
          open={open}
          setOpen={setOpen}
          message={message}
          routing={routing}
          noThanks={noThanks}
        />

        <Dialog
          open={openError}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.replyDialog}
        >
          <Alert elevation={6} variant="filled" severity="error">
            {errorMessage}
          </Alert>
        </Dialog>
      </Grid>
    </Box>
  );
}

export default memo(UserProfile);
