import { Box, Button, Grid, InputLabel, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import Captcha from "../../../../shared/captcha/Captcha";
import { useTranslation } from "react-i18next";
import { HiSave } from "react-icons/hi";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import { arLab, enLabels } from "../../../../../constants/labels";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const {
  postServiceForm,
  postServiceFormReturned,
  sendMostUsedService,
  uploadFileAction,
} = actions;
const MySwal = withReactContent(Swal);

const options = {
  response: [
    { name_e: "Phone", name: "الهاتف" },
    { name_e: "E-Mail", name: "البريد الإلكتروني" },
  ],
};

const TechnicalSupportForm = () => {
  const { t } = useTranslation();

  const { services, files } = useSelector((state) => state);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [fileArr, setFileArr] = useState([]);
  const [values, setValues] = useState({});
  const [submitIt, setSubmitIt] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    dispatch(sendMostUsedService({ data: 218 }));
  }, []);

  const classes = useStyles();

  const doSubmit = (values, fileId) => {
    const toBeSend = values;
    if (fileId) toBeSend["fileIds"] = fileId;
    dispatch(postServiceForm({ data: { ...toBeSend } }));
  };
  const initialValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
    response: [],
    code: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),

    message: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    code: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  const handleSubmit = async (values, props) => {
    setRequestStatus(true);
    setSubmitIt(true);
    const readyValues = {
      subject: values.subject,
      serviceId: 4,
      name: values.name,
      email: values.email,
      message: values.message,
      responseTypes: values.response,
      phoneNumber: values.phone,
    };
    if (fileArr.length) {
      dispatch(
        uploadFileAction({ files: fileArr, key: "technicalSupport-file" })
      );
      setValues(readyValues);
    } else {
      doSubmit(readyValues, null);
    }
  };

  const handleFileChange = (e) => {
    if (services.serviceFormReturned.length == 0) setOpen(false);
    setFileArr(e);
  };

  useEffect(() => {
    if (files.fileCreated) {
      const ids = [];
      files.fileCreated?.map((i) => ids.push(i.id));
      doSubmit(values, ids);
    }
  }, [files.fileCreated]);

  return (
    <>
      {" "}
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Grid container className={classes.inpuContainer}>
        <Grid item xs={12}>
          <Typography className={classes.desc}>
            {t("SERVICESPAGES.FORMS.FORM.FIELDS")}
            <span style={{ color: "red" }}>*</span>
            {t("SERVICESPAGES.FORMS.FORM.REQUIRED")}
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {function TechnicalForm({
            isValid,
            dirty,
            values,
            submitForm,
            setFieldValue,
            errors,
            setFieldError,
            resetForm,
          }) {
            useEffect(() => {
              const result = services.serviceFormReturned;
              if (result.success) {
                setOpen(true);
                setMessage(
                  isRTL
                    ? `رقم طلبك لاستشارة تقنية هو ${result.id}`
                    : `Your Application Number for Technical Support is ${result.id} .`
                );
                resetForm({});
              } else {
                if (result.code === 0) {
                  setOpen(true);
                  setMessage(result.message);
                  setSubmitIt(false);
                }

                if (result.success === false) {
                  setOpen(true);
                  setMessage(result.message);
                  setSubmitIt(false);
                }
              }
              if (Object.keys(services.serviceFormReturned).length) {
                dispatch(postServiceFormReturned({ data: [] }));
                setSubmitIt(false);
              }
            }, [services.serviceFormReturned]);
            return (
              <Form className={classes.fullForm} variant="outlined">
                <Grid container>
                  <Grid item xs={12} sm={3}>
                    <Box className="serviceFormIcon">
                      <img src="/assets/images/techn.png" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="name" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.NAME")}{" "}
                          <span style={{ color: "red" }}>*</span>
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
                      item
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="email" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.EMAIL")}{" "}
                          <span style={{ color: "red" }}>*</span>
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
                      item
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="phone" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.PHONE")}{" "}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          component={PhoneInput}
                          labels={isRTL ? arLab : enLabels}
                          name="phone"
                          type="text"
                          id="phone"
                          style={{ direction: "ltr" }}
                          value={values.phone}
                          className={classes.phoneNumber}
                          onChange={(e) => {
                            setFieldValue("phone", e);
                            if (e) {
                              if (!isPossiblePhoneNumber(e))
                                setFieldError(
                                  "phone",
                                  isRTL
                                    ? "الرجاء إضافة رقم الهاتف"
                                    : "Please Add phone Number"
                                );
                            }
                          }}
                          variant="outlined"
                          placeholder={isRTL ? "" : "أدخل رقم هاتفك"}
                          defaultCountry="AE"
                          international
                        />
                        {values.phone &&
                        isPossiblePhoneNumber(values.phone) ? null : (
                          <div className={classes.inputfeedback}>
                            {errors.phone}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="subject" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.SUBJECT")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="subject"
                          name="subject"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.inpuContainer}
                      style={{ alignItems: "start" }}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="message" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.MESSAGE")}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          component={TextField}
                          name="message"
                          multiline={true}
                          rows={7}
                          id="message"
                          className={(classes.TextField, classes.messageInput)}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.inpuContainer}
                      style={{ alignItems: "start" }}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="message" className={classes.label}>
                          {isRTL ? "ملفات داعمه" : "Support documents"}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          component={DropZone}
                          acceptedFiles={[".pdf,image/*"]}
                          name="file"
                          showFileNames={true}
                          onChange={(e) => handleFileChange(e)}
                          helperText={
                            isRTL
                              ? "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB "
                              : "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB"
                          }
                          maxFileSize={30000000}
                          filesLimit={1}
                          dropzoneText={
                            isRTL
                              ? "اسحب الملف أو انقر هنا"
                              : "drag and drop a file or click here"
                          }
                          page={"technicalSupport"}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.controlLabel}>
                  <InputLabel
                    htmlFor="response"
                    className={classes.labelCheckbox}
                  >
                    {t("SERVICESPAGES.FORMS.FORM.RESPONSE")}
                  </InputLabel>

                  <Box className={classes.check} id="response">
                    {options.response.map((item) => {
                      return (
                        <label>
                          <Field
                            type="checkbox"
                            component={Checkbox}
                            name="response"
                            value={item.name_e}
                          />
                          {isRTL ? item.name : item.name_e}
                        </label>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={
                    isRTL
                      ? clsx(classes.controlLabel, classes.marginRight45)
                      : classes.controlLabel
                  }
                >
                  <Captcha onChange={(value) => setFieldValue(`code`, value)} />
                </Grid>

                <Grid item xs={12} className={classes.inpuContainer}>
                  <Button
                    variant="contained"
                    className={classes.send}
                    color="primary"
                    disabled={!isValid || !dirty || submitIt}
                    onClick={submitForm}
                    disableElevation
                    endIcon={<HiSave />}
                  >
                    {t("SERVICESPAGES.FORMS.FORM.BTN")}
                  </Button>
                </Grid>
              </Form>
            );
          }}
        </Formik>
        <ServicesResultModal open={open} message={message} setOpen={setOpen} />
      </Grid>
    </>
  );
};
export default memo(TechnicalSupportForm);
