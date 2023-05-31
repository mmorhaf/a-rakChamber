import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { Checkbox, Select, TextField } from "formik-material-ui";
import React, { useEffect, useState } from "react";
import Captcha from "../shared/captcha/Captcha";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import * as Yup from "yup";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/contactForm/contactForm";
import useRating from "../shared/customHooks/useRating";
import useRoute from "../shared/customHooks/useRoute";
import Dialog from "../shared/dialog/Dialog";
import MainImage from "../shared/mainImage/MainImage";
import UpperSection from "../shared/upperSection/UpperSection";
import ContactCard from "./ContactCard";
import ContactTabs from "./ContactTabs";
import { getImage } from "../shared/utils";

const { contactUsAction, contactUsReturned, getData, loadingAction } = actions;

const ltrOptions = {
  subjects: [
    { key: "Enquiry", value: "Enquiry" },
    { key: "Question", value: "Question" },
    { key: "Suggestion", value: "Suggestion" },
    { key: "Complaint", value: "Complaint" },
    { key: "Other", value: "Other" },
  ],
  nature: [
    { key: "Statistical Reports", value: "statisticalReport" },
    { key: "General Information", value: "generalInformation" },
    { key: "Print Materials", value: "printMatirial" },
  ],
  response: [
    { key: "Phone", value: "phone" },
    { key: "E-Mail", value: "email" },
  ],
};

const rtlOptions = {
  subjects: [
    { key: "استعلام", value: "Enquiry" },
    { key: "سؤال", value: "Question" },
    { key: "اقتراح", value: "Suggestion" },
    { key: "شكوى", value: "Complaint" },
    { key: "غير ذلك", value: "Other" },
  ],
  nature: [
    { key: "التقارير الإحصائية", value: "statisticalReport" },
    { key: "معلومات عامة", value: "generalInformation" },
    { key: "مواد الطباعة", value: "printMatirial" },
  ],
  response: [
    { key: "الهاتف", value: "phone" },
    { key: "البريد الإلكتروني", value: "email" },
  ],
};

export default function ContactForm(props) {
  const { t } = useTranslation();
  const match = props.match;

  const {
    main,
    mainPath,
    secondaryPage,
    secondaryPagePath,
    detailsPage,
    alias,
    apply,
    name,
    componentRef,
    anchorRef,
  } = useRoute({ match, subPage: "contactus", category: "contactus" });

  const isRateable = useRating();

  let question = Boolean(JSON.parse(localStorage.getItem("question")));

  useEffect(() => {
    return () => localStorage.removeItem("question");
  }, []);

  const [links, setLinks] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const reducers = useSelector((state) => state);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const classes = useStyles();

  const {
    contactus,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const options = isRTL ? rtlOptions : ltrOptions;
  const dispatch = useDispatch();

  useEffect(() => {
    let sort = "channel";
    dispatch(getData({ sort }));
  }, [isRTL]);

  useEffect(() => {
    if (reducers?.crudReducers?.dataReturned?.channels?.length > 0)
      setLinks(reducers?.crudReducers?.dataReturned?.channels?.reverse());
  }, [reducers?.crudReducers?.dataReturned]);

  useEffect(() => {
    dispatch(contactUsReturned({ res: false }));
  }, []);

  useEffect(() => {
    dispatch(loadingAction({ loading: false }));
    if (contactus.contactUsReturned.data) {
      if (contactus.contactUsReturned.data.success) {
        dispatch(contactUsReturned({ res: false }));
        setOpen(true);
        setMessage(
          isRTL
            ? `${contactus?.contactUsReturned?.data?.id} تم إرسال الرسالة بنجاح بالرقم التعريفي `
            : `Submitted Successfully and Your Request number is ${contactus?.contactUsReturned?.data?.id}`
        );
      } else if (contactus.contactUsReturned.data.code === -1) {
        setOpen(true);
        setMessage(
          isRTL ? "تم إرسال الرسالة مسبقا" : "You sent this message previously"
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
  }, [contactus.contactUsReturned]);

  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(
        isRTL ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    subject: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    code: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    phoneNumber: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير صحيح" : "Phone number is not valid"
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    subject: question
      ? options.subjects[1].value
      : props.location.state == "inquiry"
      ? options.subjects[0].value
      : "",
    message: "",
    responseTypes: [],
    code: "",
    phoneNumber: "",
  };

  const doSubmit = async (values, { resetForm }) => {
    delete values["code"];
    values["serviceId"] = 1;
    dispatch(loadingAction({ loading: true }));
    dispatch(contactUsAction({ data: values }));
    resetForm();
  };

  return (
    <Grid className={classes.root}>
      <MainImage
        uuid={askingForRatingReturned?.pagePicture?.uuid}
        title={secondaryPage}
        link={secondaryPagePath}
      />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <UpperSection
          main={main}
          mainPath={mainPath}
          secondaryPage={secondaryPage}
          secondaryPagePath={secondaryPagePath}
          detailsPage={detailsPage}
          alias={alias}
          apply={apply}
          name={name}
          isRateable={isRateable}
          componentRef={componentRef}
          anchorRef={anchorRef}
          singlePage={true}
        />
        <Grid container className={classes.allSections}>
          <Grid item xs={5} className={classes.section}>
            <Grid contain className={classes.titleText}>
              <Box>
                <Typography type="h1" className={classes.head1}>
                  {links?.length ? links?.length : 0}
                </Typography>
              </Box>
              <Box className={classes.secondText}>
                <Typography type="h1" className={classes.head2}>
                  {t("CONTACTUS.CHANNELS")}
                </Typography>
                <Typography type="h5" className={classes.head3}>
                  {t("CONTACTUS.CHANDESC")}.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            className={classes.fullRow}
            style={{
              display: "flex",
              flexWrap: "wrap-reverse",
              justifyContent: "center",
              direction: isRTL ? "ltr" : "rtl",
            }}
            spacing={2}
          >
            {links.length
              ? links.map((item, i) => {
                  let icon = getImage([item?.file], isRTL)?.uuid;
                  return (
                    <Grid item sm={3} xs={12} className={classes.cardContainer}>
                      <ContactCard
                        links={item}
                        cards={`/api/file/download/${icon}?size=small`}
                      />
                    </Grid>
                  );
                })
              : null}
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item md={5} sm={12} xs={12} className={classes.bgContainer}>
            <Grid
              container
              className={classes.smallContainer}
              spacing={0}
              direction="row"
            >
              <Typography type="h2" className={classes.header}>
                {t("CONTACTUS.CENTERTITLE")}
              </Typography>
            </Grid>

            <Grid item xs={12} className={classes.tabs}>
              <ContactTabs />
            </Grid>
          </Grid>
          <Grid item md={6} sm={12} xs={12} className={classes.bgContainer}>
            <Typography type="h2" className={classes.header}>
              {t("CONTACTUS.EMAILUS")}
            </Typography>
            <Grid container>
              <Grid item xs={2} className={classes.computer}>
                <img src="/assets/images/computer.png" alt="pic" />
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  className={classes.container}
                  spacing={0}
                  direction="row"
                >
                  <Typography type="body1" className={classes.warnText}>
                    {t("CONTACTUS.REQUIREDFIELDS")}
                  </Typography>
                </Grid>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={doSubmit}
                >
                  {({
                    isValid,
                    dirty,
                    values,
                    touched,
                    errors,
                    setFieldValue,
                  }) => (
                    <Form
                      className={classes.fullForm}
                      variant="outlined"
                      autoComplete="on"
                      method="POST"
                    >
                      <Grid container className="upperContainer">
                        <Grid item sm={10} xs={12} className="inputs">
                          <Grid
                            container
                            className={classes.container}
                            spacing={0}
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
                              <InputLabel
                                htmlFor="name"
                                className={classes.label}
                                required
                              >
                                {t("CONTACTUS.NAME")}{" "}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="name"
                                name="name"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className={classes.container}
                            spacing={0}
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
                              <InputLabel
                                htmlFor="email"
                                className={classes.label}
                                required
                              >
                                {t("CONTACTUS.EMAIL")}{" "}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="email"
                                name="email"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className={classes.container}
                            spacing={0}
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
                              <InputLabel
                                htmlFor="phoneNumber"
                                className={classes.label}
                                required
                              >
                                {t("CONTACTUS.PHONECARD")}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="phoneNumber"
                                name="phoneNumber"
                                variant="outlined"
                              />
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            className={classes.container}
                            spacing={0}
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
                              <InputLabel
                                htmlFor="subject"
                                className={classes.label}
                                required
                              >
                                {t("CONTACTUS.SUBJECT")}{" "}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Field
                                component={Select}
                                name="subject"
                                id="subject"
                                className={classes.select}
                                placeholder="Subject"
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "top",
                                    horizontal: isRTL ? "right" : "left",
                                  },
                                  getContentAnchorEl: null,
                                }}
                              >
                                {options.subjects.map((item) => {
                                  return (
                                    <MenuItem
                                      style={{
                                        textAlign: "start",
                                        direction: isRTL ? "rtl" : "ltr",
                                        fontFamily: isRTL
                                          ? "Noto"
                                          : "OpenSansRegular",
                                      }}
                                      value={item.value}
                                    >
                                      {item.key}
                                    </MenuItem>
                                  );
                                })}
                              </Field>
                              {errors.subject && touched.subject ? (
                                <div className={classes.inputfeedback}>
                                  {errors.subject}
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            className={`${classes.container} third`}
                            spacing={0}
                            direction="row"
                          >
                            <Grid item xs={12} md={3}>
                              <InputLabel
                                htmlFor="message"
                                className={classes.label}
                              >
                                {t("CONTACTUS.MESSAGE")}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={12} md={9}>
                              <Field
                                component={TextField}
                                name="message"
                                multiline={true}
                                rows={7}
                                id="message"
                                className={
                                  (classes.TextField, classes.messageInput)
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        className={classes.controlLabel}
                        spacing={0}
                        direction="row"
                      >
                        <InputLabel
                          htmlFor="response"
                          className={classes.label}
                        >
                          {t("CONTACTUS.RESPONSE")}
                        </InputLabel>
                      </Grid>
                      <Grid
                        container
                        className={classes.checkbox}
                        spacing={0}
                        direction="row"
                      >
                        <Box className={classes.check} id="response">
                          {options.response.map((item) => {
                            return (
                              <label key={uid(item)}>
                                <Field
                                  type="checkbox"
                                  component={Checkbox}
                                  name="responseTypes"
                                  value={item.value}
                                />
                                {item.key}
                              </label>
                            );
                          })}
                        </Box>
                      </Grid>
                      <Grid
                        container
                        className={clsx(
                          classes.container,
                          classes.down20,
                          classes.captcha
                        )}
                        spacing={0}
                        direction="row"
                      >
                        <Captcha
                          onChange={(value) => setFieldValue(`code`, value)}
                        />
                      </Grid>
                      <ErrorMessage
                        name="code"
                        component="p"
                        className={classes.inputfeedback}
                      />
                      <Grid item xs={12} className="btnContainer">
                        <Button
                          // disabled={!isValid || !dirty}
                          type="submit"
                          // variant="contained"
                          className={classes.send}
                        >
                          {t("CONTACTUS.BTN")}
                        </Button>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Dialog open={open} message={message} />
    </Grid>
  );
}
