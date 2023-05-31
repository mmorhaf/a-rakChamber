import { Box, Button, Grid, InputLabel, Typography } from "@material-ui/core";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import ServicesResultModal from "../components/services/rakChamber/ServicesResultModal";
import actions from "../redux/actions";
import { store } from "../redux/store";
import useStyles from "../styles/components/services/servicesTabPane";

const { confirmUser, confirmUserReturned } = actions;
function ConfirmEmail(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const dispatch = useDispatch();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const serviceReducer = useSelector((state) => state);

  const initialValues = {
    email: "",
    emailConfirmationCode: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format"),
    emailConfirmationCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    dispatch(
      confirmUser({
        data: { ...values },
      })
    );
  };

  useEffect(() => {
    if (serviceReducer?.users?.userConfirmReturned) {
      if (!serviceReducer?.users?.userConfirmReturned?.success) {
        let errorsMessage = isRTL
          ? " . يرجى التحقق من بريدك الإلكتروني و كود التحقق"
          : "Please Check Your Email and Code .";
        if (serviceReducer?.users?.userConfirmReturned?.code === 5)
          errorsMessage = isRTL
            ? " . لقد تم تأكيد البريد الإلكتروني مسبقا"
            : "This Email has Confirmed Before.";
        setOpen(true);
        setMessage(errorsMessage);
        setNoThanks(true);
      }
      if (serviceReducer?.users?.userConfirmReturned?.success) {
        store.dispatch(push("/login"));
      }
    } else setOpen(false);
  }, [serviceReducer]);

  useEffect(() => {
    dispatch(confirmUserReturned({ data: false }));
  }, []);

  return (
    <Grid container className={clsx(classes.formRoot, classes.loginRoot)}>
      <Typography className={classes.serviceTitle}>
        {isRTL
          ? "الرجاء التحقق من وصول الكود إلى البريد الإلكتروني الخاص بك"
          : "Please Check Your Email For Confimation Code."}
      </Typography>
      <Grid container item>
        <Grid item md={6}>
          <Formik
            initialValues={initialValues}
            onSubmit={doSubmit}
            validationSchema={validationSchema}
          >
            {({ isValid, dirty, values, submitForm, errors }) => (
              <Form
                className={clsx(
                  classes.fullForm,
                  "animate__animated animate__bounce"
                )}
                variant="outlined"
              >
                <Grid container>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid item xs={12}>
                      <InputLabel
                        htmlFor="email"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.EMAIL")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="email"
                        name="email"
                        variant="outlined"
                        placeholder={
                          isRTL ? "ادخل البريد الالكتروني" : "Enter Your Email"
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container item className={classes.inpuContainer}>
                    <Grid item xs={12}>
                      <InputLabel
                        htmlFor="emailConfirmationCode"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.CODE")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="emailConfirmationCode"
                        name="emailConfirmationCode"
                        variant="outlined"
                        placeholder={
                          isRTL ? "ادخل كود التفعيل" : "Enter Cofirmation Code"
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item sm={6} xs={12}>
                      {" "}
                      <Typography>
                        <a className={classes.account} href={"/resend-code"}>
                          {isRTL
                            ? "إعادة إرسال كود التفعيل"
                            : "Resend Confirmation Code"}
                        </a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    className={classes.send}
                    disableElevation
                    endIcon={<IoLogIn />}
                    onClick={submitForm}
                    disabled={!isValid || !dirty}
                  >
                    {t("SERVICESPAGES.SIGNUP.CONFIRM")}
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid item md={6} sm={12} xs={12} className={classes.uaePassBtnBox}>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            flexDirection={"column"}
            padding={"0px 16px"}
          >
            <Box className={classes.supplierImgBox}>
              <img
                alt="site logo"
                src="/assets/images/supplier1.jpg"
                className={classes.supplierImg}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ServicesResultModal
        open={open}
        message={message}
        noThanks={noThanks}
        setOpen={setOpen}
      />
    </Grid>
  );
}

export default memo(ConfirmEmail);
