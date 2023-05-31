import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  TextField as TextField2,
  Typography,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import moment from "moment";
import React, { memo, useEffect, useState } from "react";
import Captcha from "../shared/captcha/Captcha";

import { useTranslation } from "react-i18next";
import { BiImageAdd } from "react-icons/bi";
import { BsFileText } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  ArabicEmirates,
  arLabels,
  Emirates,
  enLabels,
} from "../../components/shared/utils";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/contactForm/submitCvForm";
import { CountriesLTR, CountriesRTL } from "../../utils/data";
import Dialog from "../shared/dialog/Dialog";
import DropZone from "../shared/materialDropZone/DropZone";

const {
  getCareerByAlias,
  getAll,
  submitCareer,
  loadingAction,
  submitCareerDone,
} = actions;
const SubmitCvForm = ({ match }) => {
  const { t } = useTranslation();
  const { alias } = match.params;

  const dispatch = useDispatch();
  const reducers = useSelector((state) => state);
  const [career, setCareer] = useState({});
  const [values, setValues] = useState({});
  const [validation, setValidation] = useState(false);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(1);
  const [message, setMessage] = useState("");

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  //phoneRegex
  const phoneRegExp =
    /^(\+\d{0,4})\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const Countries = isRTL ? CountriesRTL : CountriesLTR;
  const AllEmirates = isRTL ? ArabicEmirates : Emirates;

  useEffect(() => {
    const language = isRTL ? "ar" : "en";
    dispatch(getCareerByAlias({ alias, language }));
  }, [isRTL]);
  useEffect(() => {
    if (reducers?.careers?.careerByAliasReturned?.success) {
      dispatch(loadingAction({ loading: false }));
      setCareer(reducers?.careers?.careerByAliasReturned);
    }
  }, [reducers?.careers]);

  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);

  useEffect(() => {
    if (reducers?.careers?.submitCareerDone) {
      if (!reducers?.careers?.submitCareerDone?.success) {
        if (reducers?.careers?.submitCareerDone?.code == 8) {
          setOpen(true);
          setMessage(
            isRTL
              ? "يرجى إدخال رقم الهاتف بشكل صحيح"
              : "please add Valid Phone Number"
          );
        } else if (reducers?.careers?.submitCareerDone?.code === 73) {
          setOpen(true);
          setMessage(
            isRTL
              ? "لقد قمت بالتقدم لهذه الوظيفة مسبقا ."
              : "You've already Submitted!"
          );
        } else if (
          reducers?.careers?.submitCareerDone?.code == -1 ||
          reducers?.careers?.submitCareerDone?.code == 0
        ) {
          setOpen(true);
          setMessage(
            isRTL
              ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
              : "Something went wrong , please try again"
          );
        } else if (reducers?.careers?.submitCareerDone?.code == 74) {
          setOpen(true);
          setMessage(
            isRTL ? "! صورتك موجودة مسبقا " : "Your Photo is already exist!"
          );
        } else if (reducers?.careers?.submitCareerDone?.code == 75) {
          setOpen(true);
          setMessage(
            isRTL
              ? "! سيرتك الذاتية موجودة مسبقا "
              : "Your CV is already exist!"
          );
        } else {
          setOpen(true);
          setMessage(
            isRTL
              ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
              : "Something went wrong , please try again"
          );
        }
      }
      setTimeout(() => {
        dispatch(submitCareerDone({ data: false }));
      }, 5000);
    } else {
      setOpen(false);
      setMessage(null);
    }
  }, [reducers?.careers?.submitCareerDone, isRTL]);

  const onSubmit = async (values) => {
    delete values["code"];

    values["careerId"] = Number(career.id);

    dispatch(submitCareer({ payload: values }));
    dispatch(loadingAction({ loading: true }));
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    placeOfBirth: "",
    experienceYears: "",
    qualification: "",
    residentCity: null,
    residentCountry: null,
    phone: null,
    homeNumber: "",
    email: "",
    skybeId: "",
    currentLocation: "",
    cv: [],
    photo: [],
    gender: "",
    religon: "",
    nationality: null,
    code: "",
  };
  const validationSchema = validation
    ? Yup.object({
        firstName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        lastName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        gender: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        religon: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        dateOfBirth: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        experienceYears: Yup.number()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        placeOfBirth: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        residentCountry: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        residentCity: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        qualification: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        nationality: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        homeNumber: Yup.string().matches(
          phoneRegExp,
          isRTL ? "رقم المنزل غير فعال" : "Home Number is not valid"
        ),
        phone: Yup.string()
          .matches(
            phoneRegExp,
            isRTL ? "رقم الهاتف غير فعال" : "Phone Number is not valid"
          )
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        email: Yup.string()
          .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format")
          .required(isRTL ? "مطلوب" : "Required"),
        currentLocation: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        cv: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
        code: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
      })
    : Yup.object({
        firstName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        lastName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        gender: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        religon: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        qualification: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        dateOfBirth: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        experienceYears: Yup.number()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        placeOfBirth: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        residentCountry: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        nationality: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        phone: Yup.string()
          .matches(
            phoneRegExp,
            isRTL ? "رقم الهاتف غير فعال" : "Phone number is not valid"
          )
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
        email: Yup.string()
          .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format")
          .required(isRTL ? "مطلوب" : "Required"),
        currentLocation: Yup.string().required(isRTL ? "مطلوب" : "Required"),
        cv: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
        code: Yup.string()
          .required(isRTL ? "مطلوب" : "Required")
          .nullable(),
      });

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Box className={classes.container}>
        <Typography type="h2" className={classes.header}>
          {career.title}
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
        setFieldValue
        validateOnChange={true}
        validateOnBlur={true}
      >
        {function MyForm(formik) {
          useEffect(() => {
            if (reducers?.careers?.submitCareerDone?.success === true) {
              formik?.resetForm({
                values: initialValues,
              });

              setKey(Math.random());

              setOpen(true);
              setMessage(
                isRTL
                  ? "تم إرسال طلبك بنجاح"
                  : "Your application submitted successfully!"
              );
            }
          }, [reducers?.careers?.submitCareerDone]);

          return (
            <Form className={classes.fullForm}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box className={classes.secondHeader}>
                    <Typography variant="h5" className="header">
                      {t("CAREER.PERSONAL")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid container md={12} className="section1">
                  <Grid item md={2} sm={2} className={classes.image}>
                    <img src="/assets/images/computer.png" />
                  </Grid>

                  <Grid item md={8} sm={10} xs={12}>
                    <Grid item md={12} className="controlContainer">
                      <InputLabel
                        htmlFor="firstName"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.FIRST")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id={"firstName"}
                        value={formik?.values?.firstName}
                        name={"firstName"}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="lastName"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.LAST")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="lastName"
                        name="lastName"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="lama"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.GENDER")}
                      </InputLabel>
                      <Box display="flex" flexDirection="column" width="100%">
                        <Field
                          component={Select}
                          name="gender"
                          id="gender"
                          className={classes.select}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "top",
                              horizontal: isRTL ? "right" : "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem
                            value="male"
                            selected
                            style={{
                              textAlign: "start",
                              direction: isRTL ? "rtl" : "ltr",
                            }}
                          >
                            {isRTL ? "ذكر" : "Male"}
                          </MenuItem>
                          <MenuItem
                            value="female"
                            style={{
                              textAlign: "start",
                              direction: isRTL ? "rtl" : "ltr",
                              fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                            }}
                          >
                            {isRTL ? "أنثى" : "Female"}
                          </MenuItem>
                        </Field>
                        {formik?.errors.gender && formik?.touched.gender ? (
                          <div className={classes.inputfeedback}>
                            {formik?.errors.gender}
                          </div>
                        ) : null}
                      </Box>
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="nationality"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.NATIONALITY")}
                      </InputLabel>
                      <Box display="flex" flexDirection="column" width="100%">
                        <Field
                          component={Autocomplete}
                          key={key}
                          id="nationality"
                          name="nationality"
                          value={values?.nationality}
                          options={Countries}
                          getOptionLabel={(option) => option}
                          onChange={(e, value) => {
                            formik?.setFieldValue("nationality", value);
                          }}
                          PaperComponent={({ children }) => (
                            <Paper
                              style={{
                                textTransform: "capitalize",
                                direction: isRTL ? "rtl" : "ltr",
                              }}
                            >
                              {children}
                            </Paper>
                          )}
                          renderInput={(params) => (
                            <TextField2
                              {...params}
                              variant="standard"
                              fullWidth
                            />
                          )}
                          className={classes.select}
                        />
                        {formik?.errors.nationality &&
                        formik?.touched.nationality ? (
                          <div className={classes.inputfeedback}>
                            {formik?.errors.nationality}
                          </div>
                        ) : null}
                      </Box>
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="religon"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.RELEGION")}
                      </InputLabel>
                      <Box display="flex" flexDirection="column" width="100%">
                        <Field
                          component={Select}
                          name="religon"
                          id="religon"
                          className={classes.select}
                          MenuProps={{
                            anchorOrigin: {
                              vertical: "top",
                              horizontal: isRTL ? "right" : "left",
                            },
                            getContentAnchorEl: null,
                          }}
                        >
                          <MenuItem
                            value="muslim"
                            style={{
                              textAlign: "start",
                              direction: isRTL ? "rtl" : "ltr",
                              fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                            }}
                          >
                            {t("CAREERS.MUSLIM")}
                          </MenuItem>
                          <MenuItem
                            value="christian"
                            style={{
                              textAlign: "start",
                              direction: isRTL ? "rtl" : "ltr",
                              fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                            }}
                          >
                            {t("CAREERS.CHRISTIAN")}
                          </MenuItem>
                        </Field>
                        {formik?.errors.religon && formik?.touched.religon ? (
                          <div className={classes.inputfeedback}>
                            {formik?.errors.religon}
                          </div>
                        ) : null}
                      </Box>
                    </Grid>

                    <Grid item md={12} className="controlContainer">
                      <InputLabel htmlFor="" className={classes.label} required>
                        {t("CAREERS.CVFORM.QUALIFICATION")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="qualification"
                        variant="outlined"
                        name="qualification"
                      />
                    </Grid>

                    <Grid item md={12} className="controlContainer">
                      <InputLabel
                        htmlFor="experience"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.EXPR")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="experienceYears"
                        type="number"
                        variant="outlined"
                        name="experienceYears"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="dateOfBirth"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.BIRTHDATE")}
                      </InputLabel>
                      <Box display="flex" flexDirection="column" width="100%">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Field
                            component={DatePicker}
                            name="dateOfBirth"
                            id="dateOfBirth"
                            format="dd-MM-yyyy"
                            inputVariant="outlined"
                            views={["year", "date", "month"]}
                            value={formik?.values?.dateOfBirth}
                            onChange={(e) => {
                              formik?.setFieldValue("dateOfBirth", e);
                            }}
                            // placeholder="10/10/2000"
                            minDate={moment(
                              new Date("December 17, 1940 03:24:00")
                            )}
                            maxDate={moment(new Date())}
                            className={classes.datePicker}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="start">
                                  <FaCalendarAlt
                                    style={{
                                      color: "#263661",
                                      marginRight: "-5px",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Box>
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="placeOfBirth"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.BIRTHPLACE")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="placeOfBirth"
                        name="placeOfBirth"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box className={classes.secondHeader}>
                    <Typography variant="h5" className="header">
                      {t("CAREERS.CVFORM.CONTACTINFO")}
                    </Typography>
                  </Box>
                </Grid>

                <Grid container md={12} xs={12}>
                  <Grid item md={2} sm={2} className={classes.image}>
                    <img src="/assets/images/type.png" />
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="phone"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.PHONE")}
                      </InputLabel>
                      <Field
                        component={PhoneInput}
                        labels={isRTL ? arLabels : enLabels}
                        key={key}
                        name="phone"
                        type="text"
                        id="phone"
                        className={classes.phoneNumber}
                        onChange={(e) => {
                          formik?.setFieldValue("phone", e);
                          if (e) {
                            if (!isValidPhoneNumber(e))
                              formik?.setFieldError(
                                "phone",
                                isRTL
                                  ? "أدخل رقم هاتفك من فضلك"
                                  : "Please Add Phone Number"
                              );
                          }
                        }}
                        variant="outlined"
                        placeholder={
                          isRTL ? "أدخل رقم هاتفك" : "Enter Your Phone Number"
                        }
                        defaultCountry="AE"
                        country="AE"
                        international
                      />

                      {formik?.errors?.phone ? (
                        <div className={classes.codeError}>
                          {formik?.errors?.phone}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="homeNumber"
                        className={classes.label}
                      >
                        {t("CAREERS.CVFORM.HOMENUM")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="homeNumber"
                        name="homeNumber"
                        variant="outlined"
                        type="text"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="email"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.EMAIL")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="email"
                        name="email"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel htmlFor="skypeId" className={classes.label}>
                        {t("CAREERS.CVFORM.SKYPE")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="skybeId"
                        name="skybeId"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="country"
                        className={classes.label}
                        required
                      >
                        {t("CAREERS.CVFORM.COUNTRY")}
                      </InputLabel>
                      <Box display="flex" flexDirection="column" width="100%">
                        <Field
                          component={Autocomplete}
                          id="residentCountry"
                          name="residentCountry"
                          value={values?.residentCountry}
                          options={Countries}
                          key={key}
                          getOptionLabel={(option) => option}
                          onChange={(e, value) => {
                            formik?.setFieldValue("residentCity", "");
                            if (
                              value !== "United Arab Emirates" &&
                              value !== "الإمارات العربية المتحدة"
                            )
                              setValidation(false);
                            if (
                              value === "United Arab Emirates" ||
                              value === "الإمارات العربية المتحدة"
                            )
                              setValidation(true);
                            formik?.setFieldValue("residentCountry", value);
                          }}
                          PaperComponent={({ children }) => (
                            <Paper
                              style={{
                                textTransform: "capitalize",
                                direction: isRTL ? "rtl" : "ltr",
                              }}
                            >
                              {children}
                            </Paper>
                          )}
                          renderInput={(params) => (
                            <TextField2
                              {...params}
                              variant="standard"
                              fullWidth
                            />
                          )}
                          className={classes.select}
                        />
                        {formik?.errors.residentCountry &&
                        formik?.touched.residentCountry ? (
                          <div className={classes.inputfeedback}>
                            {formik?.errors.residentCountry}
                          </div>
                        ) : null}
                      </Box>
                    </Grid>

                    {validation ? (
                      <Grid item md={12} xs={12} className="controlContainer">
                        <InputLabel htmlFor="country" className={classes.label}>
                          {t("CAREERS.CVFORM.STATE")}
                          <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                        <Box display="flex" flexDirection="column" width="100%">
                          <Field
                            component={Autocomplete}
                            id="residentCity"
                            name="residentCity"
                            value={formik?.values?.residentCity}
                            options={AllEmirates}
                            getOptionLabel={(option) => option}
                            key={key}
                            onChange={(e, value) => {
                              console.log("valueCity", value);
                              formik?.setFieldValue("residentCity", value);
                            }}
                            renderInput={(params) => (
                              <TextField2
                                {...params}
                                variant="standard"
                                fullWidth
                              />
                            )}
                            PaperComponent={({ children }) => (
                              <Paper
                                className={classes.selectPaper}
                                style={{
                                  textTransform: "capitalize",
                                  direction: isRTL ? "rtl" : "ltr",
                                  fontFamily: isRTL ? "next" : "poppins",
                                }}
                              >
                                {children}
                              </Paper>
                            )}
                            className={classes.select}
                          />

                          {formik?.errors.residentCity &&
                          formik?.touched.residentCity ? (
                            <div className={classes.inputfeedback}>
                              {formik?.errors.residentCity}
                            </div>
                          ) : null}
                        </Box>
                      </Grid>
                    ) : null}

                    <Grid item md={12} xs={12} className="controlContainer">
                      <InputLabel
                        htmlFor="currentLocation"
                        className={classes.label}
                      >
                        {t("CAREERS.CVFORM.LOCATION")}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.TextField}
                        id="currentLocation"
                        name="currentLocation"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.rootDropZone}>
                  <Box
                    className={
                      formik.values?.photo?.length > 0
                        ? classes.dropZoneNoIcon
                        : classes.gridDropZone
                    }
                  >
                    <InputLabel
                      htmlFor="currentLocation"
                      className={classes.label}
                      style={{ marginBlock: "10px" }}
                    >
                      {t("CAREERS.CVFORM.PHOTO")}
                    </InputLabel>

                    <DropZone
                      showFileNames
                      multiple="false"
                      showImage
                      acceptedFiles={["image/png", "image/jpg", "image/jpeg"]}
                      filesLimit={1}
                      name="photo"
                      key={key}
                      helperText
                      page="career"
                      maxFileSize={25000000}
                      Icon={BiImageAdd}
                      className={classes.dropZone}
                      onChange={(e) => formik?.setFieldValue("photo", e)}
                    />
                  </Box>

                  <Box
                    className={
                      formik.values?.cv?.length > 0
                        ? classes.dropZoneNoIcon
                        : classes.gridDropZone
                    }
                  >
                    <InputLabel
                      htmlFor="cv"
                      className={classes.label}
                      required
                      style={{ marginBlock: "10px" }}
                    >
                      {t("CAREERS.CVFORM.CV")}
                    </InputLabel>

                    <DropZone
                      showFileNames
                      multiple="false"
                      name="cv"
                      key={key}
                      page="career"
                      acceptedFiles={[".pdf"]}
                      filesLimit={1}
                      maxFileSize={30000000}
                      Icon={BsFileText}
                      helperText
                      className={
                        formik.values?.cv?.length > 0
                          ? classes.dropZoneNoIcon
                          : classes.dropZone
                      }
                      onChange={(e) => formik?.setFieldValue("cv", e)}
                    />

                    {formik?.errors?.cv && formik?.touched?.cv ? (
                      <div className={classes.inputfeedback}>
                        {formik?.errors.cv}
                      </div>
                    ) : null}
                  </Box>
                </Grid>
                <Grid item md={6} xs={12} className={classes.captcha}>
                  <Captcha
                    onChange={(value) => formik?.setFieldValue(`code`, value)}
                  />
                  <br />
                  <ErrorMessage
                    name="code"
                    component="p"
                    className={classes.error}
                  />
                </Grid>
                <Grid item xs={12} className={classes.captcha}>
                  <Button
                    className={classes.send}
                    onClick={(e) => {
                      formik?.submitForm();
                    }}
                  >
                    {t("CAREERS.CVFORM.SUBMIT")}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Dialog open={open} message={message} />
    </Container>
  );
};
export default memo(SubmitCvForm);
