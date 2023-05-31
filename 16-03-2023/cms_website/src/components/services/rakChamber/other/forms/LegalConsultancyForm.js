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
import { arLab, enLabels } from "../../../../../constants/labels";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const { postServiceForm, postServiceFormReturned, sendMostUsedService } =
  actions;
const MySwal = withReactContent(Swal);

const options = {
  response: [
    { name_e: "Phone", name: "الهاتف" },
    { name_e: "E-Mail", name: "البريد الإلكتروني" },
  ],
};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const LegalConsultancyForm = () => {
  const { t } = useTranslation();
  const { services } = useSelector((state) => state);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);

  useEffect(() => {
    dispatch(sendMostUsedService({ data: 372 }));
  }, []);

  const classes = useStyles();

  const doSubmit = async (values) => {
    setRequestStatus(true);

    const readyValues = {
      serviceId: 2,
      name: values.name,
      companyName: values.companyName,
      phoneNumber: values.phone,
      email: values.email,
      message: values.details,
      responseTypes: values.response,
    };
    dispatch(postServiceForm({ data: { ...readyValues } }));
  };
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    companyName: "",
    details: "",
    response: [],
    code: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    phone: Yup.string().test(
      "len",
      isRTL ? "الرجاء إضافة رقم الهاتف" : "Please Add phone Number",

      (val) => val && val.length > 8
    ),
    code: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    details: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  return (
    <>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Grid container className={classes.inpuContainer}>
        <Grid item xs={12}>
          <Typography className={classes.desc}>
            {t("SERVICESPAGES.FORMS.LEGAL.DESC")}
          </Typography>
          <Typography className={classes.desc}>
            {t("SERVICESPAGES.FORMS.FORM.FIELDS")}
            <span style={{ color: "red" }}>*</span>
            {t("SERVICESPAGES.FORMS.FORM.REQUIRED")}
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={doSubmit}
          enableReinitialize={true}
        >
          {function LegalForm({
            isValid,
            dirty,
            values,
            touched,
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
                    ? `رقم طلبك لاستشارة قانونية هو ${result.id}`
                    : `Your Application Number for Legal Consultation is ${result.id} .`
                );
                resetForm({});
              } else {
                if (result.code === 0) {
                  setOpen(true);
                  setMessage(
                    isRTL ? "خطأ سيرفر داخلي" : "Internal server error!"
                  );
                }
                if (result.success === false) {
                  setOpen(true);
                  setMessage(result.message);
                }
              }
              if (Object.keys(services.serviceFormReturned).length)
                dispatch(postServiceFormReturned({ data: {} }));
            }, [services.serviceFormReturned]);
            return (
              <Form
                className={classes.fullForm}
                variant="outlined"
                autocomplete="off"
              >
                <Grid container>
                  <Grid item xs={12} md={3}>
                    <Box className="serviceFormIcon">
                      <img src="/assets/images/legal.png" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={9}>
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
                        <InputLabel
                          htmlFor="companyName"
                          className={classes.label}
                        >
                          {t("SERVICESPAGES.FORMS.FORM.COMPANY")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="companyName"
                          name="companyName"
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
                          <span style={{ color: "red" }}>*</span>
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
                          className={classes.phoneNumber}
                          value={values.phone}
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
                      style={{ alignItems: "start" }}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="details" className={classes.label}>
                          {t("SERVICESPAGES.FORMS.FORM.CONSULT")}{" "}
                          <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={9}>
                        <Field
                          style={{ whiteSpace: "pre-line" }}
                          component={TextField}
                          name="details"
                          multiline={true}
                          rows={7}
                          id="details"
                          className={(classes.TextField, classes.messageInput)}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} className={classes.inpuContainer}>
                  <InputLabel
                    htmlFor="response"
                    className={classes.labelCheckbox}
                  >
                    {t("SERVICESPAGES.FORMS.FORM.RESPONSE")}:{" "}
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
                    disabled={!isValid || !dirty}
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
export default memo(LegalConsultancyForm);
