import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Field, Form, Formik } from "formik";
import { Checkbox, TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import actions from "../../../redux/actions/index";
import useStyles from "../../../styles/components/header/mobileLogIn";
import Dialog from "../../shared/dialog/Dialog";

const { logInAction, forgotPasswordAction } = actions;

function LogIn() {
  const { t } = useTranslation();

  const {
    users,
    users: { forgotPasswordComplete },
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loggedIn, setLoggedIn] = useState(" ");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (users.logInComplete) {
      if (users.logInComplete.success) {
        setLoggedIn(true);
        window.location.href = "/home";

        if (remember) {
          localStorage.setItem("authUser", users.logInComplete.token);
        }
      } else {
        setLoggedIn(false);
        if (users.logInComplete.code === 3) {
          setOpen(true);
          setMessage(
            t("HEADER.LOGIN.NOTIFI.WRONGPASSEMAIL") +
              t("HEADER.LOGIN.NOTIFI.WRONGPASSEMAILTEXT")
          );
        }
      }
    }
  }, [users.logInComplete, remember, history]);

  useEffect(() => {
    if (forgotPasswordComplete) {
      if (!forgotPasswordComplete.success)
        if (
          forgotPasswordComplete.code === 2 ||
          forgotPasswordComplete.code === 5
        ) {
          setOpen(true);
          setMessage(
            t("HEADER.LOGIN.NOTIFI.NOTREGISTERED") +
              t("HEADER.LOGIN.NOTIFI.NOTREGISTEREDTEXT")
          );
        } else {
          setOpen(true);
          setMessage(
            t("HEADER.LOGIN.NOTIFI.SOMETHING") +
              t("HEADER.LOGIN.NOTIFI.SOMETHINGTEXT")
          );
        }
    }
  }, [forgotPasswordComplete]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleForgetPassword = (email, password) => {
    if (email && password) {
      const payload = { email };
      dispatch(forgotPasswordAction({ payload }));
    } else {
      setOpen(true);
      setMessage(t("HEADER.LOGIN.NOTIFI.CREDENTIALS"));
    }
  };

  const handleCheckBoxChange = (e) => {
    setRemember(e.target.checked);
  };

  const doSubmit = async (payload, { resetForm }) => {
    dispatch(logInAction({ payload }));
    if (!loggedIn) await resetForm({});
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email(isRTL ? "إيميل غير صالح" : "Invalid email")
      .required(isRTL ? "مطلوب" : "Required"),
    password: Yup.string()
      .required(
        isRTL ? "أدخل كلمة المرور من فضلك" : "Please Enter your password"
      )
      .matches(/[a-zA-Z]/),
  });

  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        remember: false,
      }}
      validationSchema={schema}
      onSubmit={doSubmit}
    >
      {({ values }) => (
        <Fade in={true} timeout={400}>
          <Form className={classes.root}>
            <Grid container item className="controlContainer">
              <Grid item className="label">
                <InputLabel htmlFor="email">
                  {t("HEADER.LOGIN.EMAIL")}
                </InputLabel>
              </Grid>
              <Grid item>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  fullWidth={true}
                  component={TextField}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="email icon">
                          <EmailIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Grid container item className="controlContainer">
              <Grid item className="label">
                <InputLabel htmlFor="password">
                  {t("HEADER.LOGIN.PASSWORD")}
                </InputLabel>
              </Grid>
              <Grid item>
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth={true}
                  component={TextField}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton aria-label="lock icon">
                          <LockIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          className={classes.verticalPadding0}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item className="forgotRemember">
              <Typography
                component="p"
                onClick={() =>
                  handleForgetPassword(values.email, values.password)
                }
              >
                {t("HEADER.LOGIN.FORGOT")}
              </Typography>
              <label>
                <Field
                  type="checkbox"
                  component={Checkbox}
                  name="remember"
                  checked={remember}
                  onChange={handleCheckBoxChange}
                />
                {t("HEADER.LOGIN.REMEMBER")}
              </label>
            </Grid>

            <Grid item className="notRegister">
              <Typography component="p">
                {t("HEADER.LOGIN.NOTREGISTER")}
              </Typography>
              <Link to="/signup">{t("HEADER.LOGIN.REGISTERNOW")}</Link>
            </Grid>

            <Grid item className="btnContainer">
              <Button type="submit">{t("HEADER.LOGIN.BTN.LOGIN")}</Button>
              <Button type="reset">{t("HEADER.LOGIN.BTN.CANCEL")}</Button>
            </Grid>
          </Form>
        </Fade>
      )}
      <Dialog open={open} message={message} />
    </Formik>
  );
}

export default memo(LogIn);
