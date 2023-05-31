import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockIcon from "@material-ui/icons/Lock";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import * as Yup from "yup";
import useStyles from "../../../styles/components/header/mobileResetPassword";
import Fade from "@material-ui/core/Fade";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useTranslation } from "react-i18next";
import actions from "../../../redux/actions/index";

const { resetPasswordAction } = actions;
const MySwal = withReactContent(Swal);

function ResetPassword({ setSuccess }) {
  const { t } = useTranslation();
  const {
    router,
    users: { resetPasswordComplete },
    users: { forgotPasswordComplete },

    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (resetPasswordComplete) {
      if (resetPasswordComplete.success) {
        MySwal.fire({
          icon: "success",
          title: `${t("HEADER.LOGIN.RESET.NOTIFI.SUCCESS")}`,
        }).then(() => {
          return (window.location.href = "/login");
          // router.push("/home")
        });
      } else
        MySwal.fire({
          icon: "error",
          title: `${t("HEADER.LOGIN.RESET.NOTIFI.SOMETHING")}`,
          text: `${t("HEADER.LOGIN.RESET.NOTIFI.SOMETHINGTEXT")}`,
        }).then(() => {
          return (window.location.href = "/login");
          // router.push("/home")
        });
    }
  }, [resetPasswordComplete, router]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const doSubmit = async (values) => {
    const payload = {
      email: forgotPasswordComplete.email,
      passwordResetingCode: values.code,
      newPassword: values.newPassword,
    };

    dispatch(resetPasswordAction({ payload }));
  };

  const initialValues = {
    newPassword: "",
    code: "",
  };

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .matches(/^[a-zA-Z]+$/, `${t("HEADER.LOGIN.RESET.NOTIFI.PASSWORD")}`)
      .min(8, `${t("HEADER.LOGIN.RESET.NOTIFI.CHARACTERSNUM")}`)
      .required(`${t("HEADER.LOGIN.RESET.NOTIFI.ENTERPASS")}`),
  });

  const classes = useStyles();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={doSubmit}
    >
      {() => (
        <Fade in={true} timeout={400}>
          <Form className={classes.root}>
            <Grid container className="wrapper">
              <Typography variant="h1" className="message" gutterBottom>
                {t("HEADER.LOGIN.RESET.MESSAGE")}
              </Typography>
              <Grid container item className="controlContainer">
                <Grid item className="label">
                  <InputLabel htmlFor="newPassword">
                    {t("HEADER.LOGIN.RESET.NEW")}
                  </InputLabel>
                </Grid>
                <Grid item>
                  <Field
                    id="newPassword"
                    name="newPassword"
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
                            onClick={() => handleClickShowPassword("password")}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container item className="controlContainer validation">
                <Grid item className="label">
                  <InputLabel htmlFor="code">
                    {t("HEADER.LOGIN.RESET.CODE")}
                  </InputLabel>
                </Grid>
                <Grid item>
                  <Field
                    id="code"
                    name="code"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton aria-label="confirmation code icon">
                            <ConfirmationNumberIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item className="btnContainer">
              <Button type="submit">
                {t("HEADER.LOGIN.RESET.BTN.CONFIRM")}
              </Button>
              <Button onClick={() => setSuccess(false)}>
                {t("HEADER.LOGIN.RESET.BTN.CANCEL")}
              </Button>
            </Grid>
          </Form>
        </Fade>
      )}
    </Formik>
  );
}

export default memo(ResetPassword);
