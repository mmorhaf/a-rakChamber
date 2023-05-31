import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import Captcha from "../../shared/captcha/Captcha";
import { useTranslation } from "react-i18next";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/openData/openData";
import Dialog from "../../shared/dialog/Dialog";
import DropZone from "../../shared/materialDropZone/DropZone";

const { submitRequest, submitRequestReturned, getAll, loadingAction } = actions;

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

function RequestForm() {
  const { t } = useTranslation();

  const {
    request,
    files,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [charNum, setCharNum] = useState(1000);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const doSubmit = (values) => {
    const toBeSend = {};
    toBeSend["descreption"] = values.description;
    toBeSend["postLanguage"] = isRTL ? "ar" : "en";
    toBeSend["email"] = values.email;
    toBeSend["name"] = values.name;
    toBeSend["requestFile"] = values.requestFile;
    dispatch(loadingAction({ loading: true }));
    dispatch(submitRequest({ data: toBeSend }));
    setDescription("");
    setCharNum(1000);
  };

  useEffect(() => {
    dispatch(submitRequestReturned({ data: false }));
    dispatch(getAll({ sort: "configuration" }));
  }, []);

  useEffect(() => {
    dispatch(loadingAction({ loading: false }));
    if (request.requestReturned) {
      if (request.requestReturned.success) {
        setOpen(true);
        setMessage(isRTL ? "تم إرسال طلبك بنجاح" : "Submitted Successfully!");
      } else if (request.requestReturned.code === 77) {
        setOpen(true);
        setMessage(isRTL ? "تم إرسال طلبك مسبقا" : "Request Exists");
      } else {
        setOpen(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا"
            : "Something went wrong , please try again"
        );
      }
      setTimeout(() => {
        dispatch(submitRequestReturned({ data: false }));
      }, 5000);
    } else {
      setOpen(false);
      setMessage(null);
    }
  }, [request.requestReturned]);

  useEffect(() => {
    dispatch(submitRequestReturned({ data: false }));
  }, []);

  const handleChange = (e) => {
    const request = e.target.value;
    const stringLength = request.length;
    const charLeft = 1000 - stringLength;
    setCharNum(charLeft);
    setDescription(request);
  };

  const handleSubmit = async (values) => {
    doSubmit(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    description: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(
        isRTL ? "صيغة البريد الإلكتروني غير صحيحة" : "Invalid email format"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    code: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    mobile: Yup.string()
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير فعال" : "Phone number is not valid"
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });

  const classes = useStyles();

  return (
    <Box>
      <Typography variant="h4" component="h4" className="required">
        {t("OPENDATA.PAGE.FORM.REQUIREDFIELDS")}{" "}
        <strong>{t("OPENDATA.PAGE.FORM.REQUIRED")}</strong>
      </Typography>
      <Formik
        initialValues={{
          email: "",
          name: "",
          mobile: "",
          description: "",
          code: "",
          requestFile: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          submitForm,
          isValid,
          dirty,
          values,
          touched,
          errors,
          setFieldValue,
          ...props
        }) => (
          <Form className="form">
            <Grid container>
              <Grid item xs={2} className={classes.imageForm}>
                <img src="/assets/images/computer.png" />
              </Grid>
              <Grid item sm={10} xs={12}>
                <Grid item xs={12} sm={10} md={6} className="label">
                  <InputLabel htmlFor="name">
                    {t("OPENDATA.PAGE.FORM.NAME")}
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

                <Grid item xs={12} sm={10} md={6} className="label">
                  <InputLabel htmlFor="email">
                    {t("OPENDATA.PAGE.FORM.EMAIL")}
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

                <Grid item xs={12} sm={10} md={6} className="label">
                  <InputLabel htmlFor="mobile">
                    {t("OPENDATA.PAGE.FORM.MOBILE")}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    id="mobile"
                    name="mobile"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField direction"
                  />
                </Grid>

                <Grid container item>
                  <Grid item xs={12} sm={10} md={6} className="labelupload">
                    <InputLabel htmlFor="upload">
                      <Box className="controlContainer">
                        <Box className="uploadTitle">
                          {t("OPENDATA.PAGE.FORM.UPLOAD")}
                        </Box>
                        <Box className="uploadControl" disabled={isSubmitting}>
                          <DropZone
                            acceptedFiles={[".pdf"]}
                            name="requestFile"
                            showFileNames={true}
                            onChange={(e) => setFieldValue("requestFile", e)}
                            helperText={t(
                              "SERVICESPAGES.SUPPLIER.SIGNATUREHELPERTEXT"
                            )}
                            maxFileSize={26000000}
                            filesLimit={1}
                            dropzoneText={t("SERVICESPAGES.SUPPLIER.DRAGIMG")}
                            page={"openData"}
                          />
                        </Box>
                      </Box>
                    </InputLabel>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={10} md={6} className="label">
                  <InputLabel htmlFor="description">
                    {t("OPENDATA.PAGE.FORM.DESC")}
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
                    value={values?.description}
                    className="inputField desc"
                    onChange={(e) => {
                      const request = e.target.value;
                      setFieldValue("description", request);
                      handleChange(e);
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item sm={12} className="captcha">
              <Captcha onChange={(value) => setFieldValue(`code`, value)} />
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
                  dispatch(submitRequestReturned({ data: false }));
                  submitForm(values);
                }}
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

export default memo(RequestForm);
