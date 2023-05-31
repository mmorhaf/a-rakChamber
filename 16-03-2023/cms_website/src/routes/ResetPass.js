import {
  Box,
  Button,
  Grid,
  InputLabel,
  Typography,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
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
import { useLocation } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const { resetPasswordAction, resetPasswordReturned } = actions;
function ResetPass(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmOldPassword, setShowConfirmOldPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const serviceReducer = useSelector((state) => state);

  useEffect(() => {
    setUserEmail(location.userEmail);
  }, [location.userEmail]);

  useEffect(() => {
    dispatch(
      resetPasswordReturned({
        data: false,
      })
    );
  }, []);

  const initialValues = {
    email: "",
    passwordResetingCode: "",
    // oldPassword: "",
    // confirmOldPassword: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format"),
    passwordResetingCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    // oldPassword: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    // confirmOldPassword: Yup.string()
    //   .oneOf(
    //     [Yup.ref("oldPassword"), null],
    //     isRTL ? "يجب أن تطابق كلمة المرور القديمة" : "must match Old Password"
    //   )
    //   .required(isRTL ? "مطلوب" : "Required"),
    password: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        isRTL
          ? "يجب أن يكون الحد الأدنى لطول كلمة المرور على الأقل (8) أحرف ويجب أن تتكون من حروف إنجليزية(يجب استخدام أحرف كبيرة وصغيرة) وأرقام ورموز"
          : "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        isRTL ? "يجب أن تطابق كلمة المرور الجديدة" : "must match new Password"
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    dispatch(
      resetPasswordAction({
        payload: { ...values },
      })
    );
  };

  useEffect(() => {
    if (serviceReducer?.users?.resetPasswordComplete) {
      if (!serviceReducer?.users?.resetPasswordComplete?.success) {
        if (serviceReducer?.users?.resetPasswordComplete?.code === 6)
          setTimeout(() => {
            store.dispatch(push("/login"));
          }, 7000);
      }
      if (serviceReducer?.users?.resetPasswordComplete?.success) {
        setTimeout(() => {
          store.dispatch(push("/login"));
        }, 7000);
      }
    }
  }, [serviceReducer]);

  useEffect(() => {
    if (serviceReducer?.users?.resetPasswordComplete) {
      if (!serviceReducer?.users?.resetPasswordComplete?.success) {
        let errorsMessage = isRTL
          ? " . يرجى التحقق من بريدك الإلكتروني و كود التحقق"
          : "Please Check Your Email and Code .";
        if (serviceReducer?.users?.resetPasswordComplete?.code === 4)
          errorsMessage = isRTL
            ? " . كود التحقق غير صحيح"
            : "Code is Incorrect.";
        if (serviceReducer?.users?.resetPasswordComplete?.code === 2)
          errorsMessage = isRTL
            ? " . يرجى التحقق من بريدك الإلكتروني"
            : "Please Check Your Email";
        if (serviceReducer?.users?.resetPasswordComplete?.code === 6)
          errorsMessage = isRTL
            ? ". انتهت صلاحية الكود , قم بإعادة تعيين كلمة المرور مرة أخرى"
            : "Code has been expired , Please Reset Password Again .";
        setOpen(true);
        setMessage(errorsMessage);
        setNoThanks(true);
      }
      if (serviceReducer?.users?.resetPasswordComplete?.success) {
        setOpen(true);
        setMessage(
          isRTL
            ? ".تم إعادة تعيين كلمة المرور الخاصة بك بنجاح"
            : "Your Password has been Reset Successfully ."
        );
        setNoThanks(true);
      }
    } else setOpen(false);
  }, [serviceReducer]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleClickShowConfirmOldPassword = () => {
    setShowConfirmOldPassword(!showConfirmOldPassword);
  };

  const handleMouseDownOldPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid container className={clsx(classes.formRoot, classes.loginRoot)}>
      <Typography className={classes.serviceTitle}>
        {isRTL
          ? "الرجاء التحقق من وصول الكود إلى البريد الإلكتروني الخاص بك"
          : "Please Check Your Email For Confimation Code."}
      </Typography>
      <Grid container item>
        <Grid item md={12}>
          <Formik
            initialValues={initialValues}
            onSubmit={doSubmit}
            validationSchema={validationSchema}
          >
            {function MyForm({
              isValid,
              dirty,
              values,
              submitForm,
              setFieldValue,
              errors,
            }) {
              useEffect(() => {
                setFieldValue("email", userEmail);
              }, [userEmail]);
              return (
                <Form
                  className={clsx(
                    classes.fullForm,
                    "animate__animated animate__bounce"
                  )}
                  variant="outlined"
                >
                  <Grid container>
                    <Grid
                      container
                      item
                      className={clsx(
                        classes.inpuContainer,
                        classes.inpuContainerLessMargin
                      )}
                    >
                      <Grid item xs={8}>
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
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          variant="outlined"
                          placeholder={
                            isRTL
                              ? "ادخل البريد الالكتروني"
                              : "Enter Your Email"
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      className={clsx(
                        classes.inpuContainer,
                        classes.inpuContainerLessMargin
                      )}
                    >
                      <Grid item xs={8}>
                        <InputLabel
                          htmlFor="passwordResetingCode"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.CODE")}
                        </InputLabel>

                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="passwordResetingCode"
                          name="passwordResetingCode"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      className={clsx(
                        classes.inpuContainer,
                        classes.inpuContainerLessMargin
                      )}
                    >
                      <Grid item xs={8} className={classes.fullContainerWidth}>
                        <InputLabel
                          htmlFor="password"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.NEWPASSWORD")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={8} className={classes.fullContainerWidth}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="password"
                          name="password"
                          autoComplete="new-password"
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
                    <Grid
                      container
                      item
                      className={clsx(
                        classes.inpuContainer,
                        classes.inpuContainerLessMargin
                      )}
                    >
                      <Grid item xs={8} className={classes.fullContainerWidth}>
                        <InputLabel
                          htmlFor="confirmPassword"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SIGNUP.CONFIRMPASSWORD")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={8} className={classes.fullContainerWidth}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="confirmPassword"
                          name="confirmPassword"
                          variant="outlined"
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
              );
            }}
          </Formik>
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

export default memo(ResetPass);
