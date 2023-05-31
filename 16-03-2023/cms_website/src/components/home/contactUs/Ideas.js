import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { lazy, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/home/contactUs/feedback";
import Dialog from "../../shared/dialog/Dialog";
import DropZone from "../../shared/materialDropZone/DropZone";
import Captcha from "../../shared/captcha/Captcha";
const { contactUsAction, getAll, contactUsReturned } = actions;

function Feedback() {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { contactus } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(1);

  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);
  const onSubmit = async (values) => {
    delete values["code"];
    values["serviceId"] = 7;
    dispatch(contactUsAction({ data: values }));
  };

  useEffect(() => {
    const result = contactus.contactUsReturned;
    if (result) {
      if (!result?.data?.success) {
        if (result?.data?.code === -1) {
          setOpen(true);
          setMessage(
            isRTL
              ? "تم إرسال الرسالة مسبقا"
              : "You sent this message previously"
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
        dispatch(contactUsReturned({ data: false }));
      }, 5000);
    } else {
      setOpen(false);
      setMessage(null);
    }
  }, [contactus.contactUsReturned]);
  const initialValues = {
    email: "",
    name: "",
    message: "",
    code: "",
    file: [],
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    message: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(
        isRTL ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    code: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
  });

  const classes = useStyles();
  return (
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
          if (contactus?.contactUsReturned?.data?.success) {
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
        }, [contactus?.contactUsReturned]);
        return (
          <Form className={classes.root}>
            <Grid container>
              <Grid container item className="controlContainer">
                <Grid item sm={4} xs={12} className="label">
                  <InputLabel htmlFor="email">
                    {t("HOME.PARTICIPATION.IDEAS.EMAIL")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Grid>
                <Grid item sm={8} xs={12}>
                  <Field
                    id="email"
                    name="email"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                    required={true}
                  />
                </Grid>
              </Grid>
              <Grid container item className="controlContainer marginTop10">
                <Grid item sm={4} xs={12} className="label">
                  <InputLabel htmlFor="name">
                    {t("HOME.PARTICIPATION.IDEAS.NAME")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Grid>
                <Grid item sm={8} xs={12}>
                  <Field
                    id="name"
                    name="name"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>
              </Grid>
              <Grid container item className="uploadContainer marginTop10">
                <Grid item xs={12} className="label">
                  <Grid container className="block">
                    <Grid item sm={4} xs={12} className="uploadTitle">
                      {t("OPENDATA.PAGE.FORM.UPLOAD")}
                    </Grid>
                    <Grid item sm={8} className={classes.dropZone}>
                      <DropZone
                        acceptedFiles={[".pdf"]}
                        key={key}
                        name="file"
                        showFileNames={true}
                        onChange={(e) => {
                          formik?.setFieldValue("file", e);
                        }}
                        helperText
                        maxFileSize={26000000}
                        helperStyle={
                          formik.values.file &&
                          formik.values.file.length > 0 &&
                          classes.helperStyle
                        }
                        filesLimit={1}
                        toolHelper
                        dropzoneText={t("SERVICESPAGES.SUPPLIER.DRAGFILE")}
                        page={"ideas"}
                        noPreviewImg={true}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item className="controlContainer message">
                <Grid item sm={4} xs={12} className="label">
                  <InputLabel htmlFor="message">
                    {t("HOME.PARTICIPATION.IDEAS.MESSAGE")}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Grid>
                <Grid item sm={8} xs={12}>
                  <Field
                    id="message"
                    name="message"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    multiline={true}
                    rows={2}
                    className="inputField"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={12} className="captcha">
                <Captcha
                  onChange={(value) => formik?.setFieldValue(`code`, value)}
                />

                <ErrorMessage
                  name="code"
                  component="p"
                  className={`MuiFormHelperText-root Mui-error `}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className="btnContainer">
              <Button
                onClick={(e) => {
                  formik?.submitForm();
                }}
              >
                {t("HOME.PARTICIPATION.IDEAS.BTN")}
              </Button>
            </Grid>
            <Dialog open={open} message={message} />
          </Form>
        );
      }}
    </Formik>
  );
}

export default memo(Feedback);
