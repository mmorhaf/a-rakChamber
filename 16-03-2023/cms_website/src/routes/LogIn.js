import React, { memo, useState, useEffect } from "react";
import { push } from "connected-react-router";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import { Checkbox } from "formik-material-ui";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import useStyles from "../styles/components/login/login";
import * as Yup from "yup";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import actions from "../redux/actions/index";
import store from "../redux/store";

const { logInAction, logInComplete, forgotPasswordAction } = actions;
const MySwal = withReactContent(Swal);

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
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (users.logInComplete) {
      if (users.logInComplete.success) {
        setLoggedIn(true);
        store.dispatch(push("/home"));
      } else {
        setLoggedIn(false);
        if (users.logInComplete.code === 3) {
          MySwal.fire({
            icon: "error",
            title: `${t("HEADER.LOGIN.NOTIFI.WRONGPASSEMAIL")}`,
            text: `${t("HEADER.LOGIN.NOTIFI.WRONGPASSEMAILTEXT")}`,
          }).then(() => dispatch(logInComplete({ data: false })));
        } else if (users.logInComplete.code === 29) {
          MySwal.fire({
            icon: "error",
            title: `${t("HEADER.LOGIN.NOTIFI.NOTACTIVE")}`,
          }).then(() => dispatch(logInComplete({ data: false })));
        } else {
          MySwal.fire({
            icon: "error",
            title: `${t("HEADER.LOGIN.NOTIFI.SOMETHING")}`,
          }).then(() => dispatch(logInComplete({ data: false })));
        }
      }
    }
  }, [users.logInComplete]);

  useEffect(() => {
    if (forgotPasswordComplete) {
      if (!forgotPasswordComplete.success)
        if (
          forgotPasswordComplete.code === 2 ||
          forgotPasswordComplete.code === 5
        )
          MySwal.fire({
            icon: "error",
            title: `${t("HEADER.LOGIN.NOTIFI.NOTREGISTERED")}`,
            text: `${t("HEADER.LOGIN.NOTIFI.NOTREGISTEREDTEXT")}`,
          });
        else
          MySwal.fire({
            icon: "error",
            title: `${t("HEADER.LOGIN.NOTIFI.SOMETHING")}`,
            text: `${t("HEADER.LOGIN.NOTIFI.SOMETHINGTEXT")}`,
          });
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
      MySwal.fire({
        icon: "warning",
        title: `${t("HEADER.LOGIN.NOTIFI.CREDENTIALS")}`,
      });
    }
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
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
        `${t("HEADER.LOGIN.RESET.NOTIFI.PASSWORD")}`
      ),
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
        <Form className={classes.root}>
          <Grid container className="title">
            <Grid item xs={3} sm={2}>
              <Typography variant="h1" gutterBottom>
                Log In
              </Typography>
            </Grid>

            <Grid item xs={9} sm={10} className="divider">
              <Divider />
            </Grid>
          </Grid>

          <Grid container item className="controlContainer">
            <Grid item className="label">
              <InputLabel htmlFor="email">{t("HEADER.LOGIN.EMAIL")}</InputLabel>
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
              <Field type="checkbox" component={Checkbox} name="remember" />
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
      )}
    </Formik>
  );
}

export default memo(LogIn);
