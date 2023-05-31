import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import Captcha from "../../shared/captcha/Captcha";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/eParticipation/opinion/opinionDetails";
import Dialog from "../../shared/dialog/Dialog";

const { contactUsAction, contactUsReturned, loadingAction } = actions;

function ThanksForm() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { contactus } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [charNum, setCharNum] = useState(1000);
  const [description, setDescription] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

  const handleChange = (e, props) => {
    const comment = e.target.value;
    props.setFieldValue("description", comment);

    const stringLength = comment.length;

    const charLeft = 1000 - stringLength;

    setCharNum(charLeft);
    setDescription(comment);
  };

  const doSubmit = async (values) => {
    const toBeSend = {};
    toBeSend["message"] = values.description;
    toBeSend["email"] = values.email;
    toBeSend["name"] = values.name;
    toBeSend["serviceId"] = 8;
    dispatch(loadingAction({ loading: true }));
    dispatch(contactUsAction({ data: toBeSend }));
  };

  useEffect(() => {
    dispatch(contactUsReturned({ data: false }));
  }, []);

  useEffect(() => {
    dispatch(loadingAction({ loading: false }));
    const result = contactus.contactUsReturned;
    if (result?.data?.success) {
      dispatch(contactUsReturned({ data: false }));
      setOpen(true);
      setMessage(isRTL ? "تم إرسال الرسالة بنجاح" : "Submitted successfully");
    } else {
      if (result?.code === 0) {
        setOpen(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
      }
      if (result?.code === 92) {
        setOpen(true);
        setMessage(
          isRTL ? "! تم تسجيل طلبك مسبقا" : "You've already submitted!"
        );
      }
      if (result?.code === 74) {
        setMessage(
          isRTL ? "! صورتك موجودة مسبقا " : "Your Photo is already exist!"
        );
      }
      if (result?.code === 75) {
        setOpen(true);
        setMessage(
          isRTL ? "! سيرتك الذاتية موجودة مسبقا " : "Your CV is already exist!"
        );
      }
    }
  }, [contactus.contactUsReturned, isRTL]);
  return (
    <Box>
      <Typography variant="h4" component="h4" className="required">
        {t("OPENDATA.PAGE.FORM.REQUIREDFIELDS")}{" "}
        <strong>{t("OPENDATA.PAGE.FORM.REQUIRED")}</strong>
      </Typography>
      <Formik
        initialValues={{ email: "", name: "", description: "", code: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = isRTL ? "مطلوب" : "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = isRTL
              ? "صيغة البريد الإلكتروني غير صحيحة"
              : "Invalid email address";
          }

          if (!values.name) {
            errors.name = isRTL ? "مطلوب" : "Required";
          }

          if (!values.description) {
            errors.description = isRTL ? "مطلوب" : "Required";
          }

          if (values.description.length < 10) {
            errors.description = isRTL
              ? "يجب أن يحتوي التعليق على 10 محارف على الأقل"
              : "Description shuold have 10 characters at least";
          }

          if (values.description.length > 1000) {
            errors.description = isRTL
              ? "يرجى إرسال 1000 محرف على الأكثر"
              : "Description shuold have 1000 characters at most";
          }

          if (!values.code) {
            errors.code = isRTL ? "مطلوب" : "Required";
          }

          return errors;
        }}
        onSubmit={doSubmit}
      >
        {({
          isSubmitting,
          submitForm,
          isValid,
          dirty,
          values,
          touched,
          ...props
        }) => (
          <Form className="form">
            <Grid container>
              <Grid item xs={2} className={classes.imageContainer}>
                <img src="/assets/images/heart.png" />
              </Grid>
              <Grid item sm={10} xs={12}>
                <Grid item xs={12} className="label">
                  <InputLabel htmlFor="name">
                    {t("OPENDATA.PAGE.FORM.NAME")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    id="name"
                    name="name"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>

                <Grid item xs={12} className="label">
                  <InputLabel htmlFor="email">
                    {t("OPENDATA.PAGE.FORM.EMAIL")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    id="email"
                    name="email"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>

                <Grid item xs={12} className="label">
                  <InputLabel htmlFor="description">
                    {t("OPENDATA.PAGE.FORM.DESC")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    id="description"
                    name="description"
                    fullWidth={true}
                    component={TextField}
                    maxLength={1000}
                    label={
                      isRTL
                        ? `${t("OPENDATA.PAGE.FORM.CHARS")} ${charNum} `
                        : `${charNum} ${t("OPENDATA.PAGE.FORM.CHARS")}`
                    }
                    variant="outlined"
                    multiline={true}
                    rows={5}
                    value={description}
                    className="inputField"
                    onChange={(e) => handleChange(e, props)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item sm={12} className="captcha">
              <Captcha
                onChange={(value) => props.setFieldValue(`code`, value)}
              />
            </Grid>
            <ErrorMessage
              name="code"
              component="p"
              className={`MuiFormHelperText-root Mui-error `}
            />

            <Grid item xs={12} className="btnContainer">
              <Button
                size="medium"
                className={classes.send}
                disableElevation
                onClick={submitForm}
              >
                {t("OPENDATA.PAGE.FORM.BTN")}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
      <Dialog open={open} message={message} />
    </Box>
  );
}

export default memo(ThanksForm);
