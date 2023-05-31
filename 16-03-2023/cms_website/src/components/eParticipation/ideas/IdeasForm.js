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
import DropZone from "../../shared/materialDropZone/DropZone";
const { contactUsAction, contactUsReturned, getAll, loadingAction } = actions;

function IdeasForm() {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { contactus } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [charNum, setCharNum] = useState(1000);
  const [description, setDescription] = useState("");

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [key, setKey] = useState(1);

  const handleChange = (e) => {
    const comment = e.target.value;
    const stringLength = comment.length;
    const charLeft = 1000 - stringLength;
    setCharNum(charLeft);
    setDescription(comment);
  };

  const onSubmit = async (values) => {
    let payload = {
      message: values?.description,
      email: values?.email,
      postLanguage: isRTL ? "ar" : "en",
      name: values?.name,
      ideaTitle: values?.title,
      serviceId: 7,
      file: values?.file,
    };

    dispatch(loadingAction({ loading: true }));
    dispatch(contactUsAction({ data: payload }));
  };

  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);

  const initialValues = {
    email: "",
    name: "",
    title: "",
    description: "",
    code: "",
    file: [],
  };

  useEffect(() => {
    const result = contactus.contactUsReturned;
    if (contactus?.contactUsReturned?.data) {
      dispatch(loadingAction({ loading: false }));
      if (contactus?.contactUsReturned?.code === 0) {
        setOpen(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
      } else if (contactus?.contactUsReturned?.code === 73) {
        setOpen(true);
        setMessage(
          isRTL ? "! تم تسجيل طلبك مسبقا" : "You've already submitted!"
        );
      } else if (contactus?.contactUsReturned?.code === 74) {
        setOpen(true);
        setMessage(
          isRTL ? "! صورتك موجودة مسبقا " : "Your Photo is already exist!"
        );
      } else if (contactus?.contactUsReturned?.code === 75) {
        setOpen(true);
        setMessage(
          isRTL ? "! سيرتك الذاتية موجودة مسبقا " : "Your CV is already exist!"
        );
      }
      setTimeout(() => {
        dispatch(contactUsReturned({ data: false }));
      }, 5000);
    } else {
      setOpen(false);
      setMessage(null);
    }
  }, [contactus.contactUsReturned, isRTL]);
  useEffect(() => {
    dispatch(contactUsReturned({ data: false }));
  }, []);
  return (
    <Box>
      <Typography variant="h4" component="h4" className="required">
        {t("OPENDATA.PAGE.FORM.REQUIREDFIELDS")}
        <strong>{t("OPENDATA.PAGE.FORM.REQUIRED")}</strong>
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        setFieldValue
        validateOnChange={true}
        validateOnBlur={true}
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
          if (!values.title) {
            errors.title = isRTL ? "مطلوب" : "Required";
          }

          if (values.title.length < 4) {
            errors.title = isRTL
              ? "يرجى إدخال 4 محارف على الأقل"
              : "Title shuold have 4 characters at least";
          }

          if (!values.description) {
            errors.description = isRTL ? "مطلوب" : "Required";
          }

          if (values.description.length < 10) {
            errors.description = isRTL
              ? "يرجى إدخال 10 محارف على الأقل"
              : "Description shuold have 10 characters at least";
          }

          if (values.description.length > 1000) {
            errors.description = isRTL
              ? "مطلوب"
              : "Description shuold have 1000 characters at most";
          }

          if (!values.code) {
            errors.code = isRTL ? "مطلوب" : "Required";
          }

          return errors;
        }}
      >
        {function MyForm(formik) {
          useEffect(() => {
            if (contactus?.contactUsReturned?.data?.success) {
              formik?.resetForm({
                values: initialValues,
              });
              setDescription("");
              setCharNum(1000);
              setKey(Math.random());
              setOpen(true);
              setMessage(
                isRTL ? "تم إرسال الرسالة بنجاح" : "Submitted successfully"
              );
            }
          }, [contactus.contactUsReturned]);
          return (
            <Form className="form">
              <Grid container spacing={2}>
                <Grid item xs={2} className={classes.image}>
                  <img src="/assets/images/idea.png" alt="icon" />
                </Grid>
                <Grid
                  container
                  item
                  sm={10}
                  xs={12}
                  spacing={2}
                  className="basicform"
                >
                  <Grid item xs={12} className="label">
                    <Grid item sm={3} xs={12}>
                      <InputLabel htmlFor="name">
                        {t("OPENDATA.PAGE.FORM.NAME")}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                    </Grid>

                    <Grid item sm={9} xs={12}>
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

                  <Grid item xs={12} className="label">
                    <Grid item sm={3} xs={12}>
                      <InputLabel htmlFor="email">
                        {t("OPENDATA.PAGE.FORM.EMAIL")}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                    </Grid>

                    <Grid item sm={9} xs={12}>
                      <Field
                        id="email"
                        name="email"
                        fullWidth={true}
                        component={TextField}
                        variant="outlined"
                        className="inputField"
                      />
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className="label">
                    <Grid item sm={3} xs={12}>
                      <InputLabel htmlFor="title">
                        {t("OPENDATA.PAGE.FORM.TITLE")}
                      </InputLabel>
                    </Grid>

                    <Grid item sm={9} xs={12}>
                      <Field
                        id="title"
                        name="title"
                        fullWidth={true}
                        component={TextField}
                        variant="outlined"
                        className="inputField"
                      />
                    </Grid>
                  </Grid>

                  <Grid container item className="uploadContainer">
                    <Grid item xs={12} className="label">
                      <InputLabel htmlFor="file">
                        <Grid container>
                          <Grid
                            item
                            sm={3}
                            xs={12}
                            className={classes.marginBottom}
                          >
                            {t("OPENDATA.PAGE.FORM.UPLOAD")}
                          </Grid>
                          <Grid item sm={9} xs={12}>
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
                              filesLimit={1}
                              dropzoneText={t(
                                "SERVICESPAGES.SUPPLIER.DRAGFILE"
                              )}
                              page={"ideas"}
                            />
                          </Grid>
                        </Grid>
                      </InputLabel>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} className="label description">
                    <Grid item sm={3} xs={12}>
                      <InputLabel htmlFor="description">
                        {t("OPENDATA.PAGE.FORM.DESC")}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                    </Grid>

                    <Grid item sm={9} xs={12}>
                      <Field
                        id="description"
                        name="description"
                        fullWidth={true}
                        component={TextField}
                        maxLength={1000}
                        key={key}
                        label={
                          isRTL
                            ? `${t("OPENDATA.PAGE.FORM.CHARS")} ${charNum} `
                            : `${charNum} ${t("OPENDATA.PAGE.FORM.CHARS")}`
                        }
                        variant="outlined"
                        multiline={true}
                        rows={5}
                        value={description}
                        className={"inputField comment"}
                        onChange={(e) => {
                          const comment = e.target.value;
                          formik?.setFieldValue("description", comment);
                          handleChange(e);
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item sm={12} className="captcha">
                <Captcha
                  onChange={(value) => formik?.setFieldValue(`code`, value)}
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
                  onClick={(e) => {
                    formik?.submitForm();
                  }}
                >
                  {t("OPENDATA.PAGE.FORM.BTN")}
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Dialog open={open} message={message} />
    </Box>
  );
}

export default memo(IdeasForm);
