import {
  Box,
  Button,
  Grid,
  InputLabel,
  IconButton,
  InputAdornment,
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
import { Visibility, VisibilityOff } from "@material-ui/icons";

const { activateAccount, activateAccountReturned, loadingAction } = actions;
function ResendCode(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const serviceReducer = useSelector((state) => state);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة الايميل خاطئة" : "Invalid email format"),
    password: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values) => {
    dispatch(loadingAction({ loading: true }));
    dispatch(activateAccount({ payload: values }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (serviceReducer?.users?.activateAccountReturned) {
      dispatch(loadingAction({ loading: false }));
      if (!serviceReducer?.users?.activateAccountReturned?.success) {
        let errorsMessage = isRTL
          ? " . يرجى التحقق من بريدك الإلكتروني و كلمة المرور"
          : "Please Check Your Email and Password .";
        setOpen(true);
        setMessage(errorsMessage);
        setNoThanks(true);
      }
      if (serviceReducer?.users?.activateAccountReturned?.success) {
        store.dispatch(push("/confirm-email"));
      }
    } else setOpen(false);
  }, [serviceReducer]);

  useEffect(() => {
    dispatch(activateAccountReturned({ data: false }));
  }, []);

  return (
    <Grid container className={clsx(classes.formRoot, classes.loginRoot)}>
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
                        htmlFor="password"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SIGNUP.PASSWORD")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="password"
                        name="password"
                        variant="outlined"
                        autoComplete="new-password"
                        placeholder={
                          isRTL ? "ادخل كلمة المرور" : "Enter Your Password"
                        }
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
                                  <VisibilityOff className={classes.redColor} />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
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
                    {t("SERVICESPAGES.SUPPLIER.SUBMIT")}
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

export default memo(ResendCode);
