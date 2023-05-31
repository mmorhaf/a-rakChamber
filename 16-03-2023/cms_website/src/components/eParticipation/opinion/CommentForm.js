import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import Dialog from "../../shared/dialog/Dialog";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/eParticipation/opinion/opinionDetails";
import Captcha from "../../shared/captcha/Captcha";

const { submitComment, submitCommentReturned, loadingAction } = actions;

function CommentForm({
  id,
  fileId,
  popUp = false,
  handleClose,
  title,
  opinionPage,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { commentReturned } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const [charNum, setCharNum] = useState(1000);
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!commentReturned) return;
    if (commentReturned.success) {
      dispatch(loadingAction({ loading: false }));
      popUp && handleClose();
      if (opinionPage) {
        setOpen(true);
        setMessage(isRTL ? "تم إرسال الرسالة بنجاح" : "Submitted successfully");
      }
    } else if (commentReturned.code === 77) {
      dispatch(loadingAction({ loading: false }));
      popUp && handleClose();
      if (opinionPage) {
        setOpen(true);
        setMessage(isRTL ? " !التعليق موجود مسبقا " : "Comment Exists !");
      }
    } else {
      dispatch(loadingAction({ loading: false }));
      popUp && handleClose();
      if (opinionPage) {
        setOpen(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
      }
    }
  }, [commentReturned]);

  useEffect(() => {
    dispatch(submitCommentReturned({ data: false }));
  }, []);

  const handleChange = (e, props) => {
    const comment = e.target.value;
    props.setFieldValue("description", comment);

    const stringLength = comment.length;

    const charLeft = 1000 - stringLength;

    setCharNum(charLeft);
    setDescription(comment);
  };

  const doSubmit = async (values) => {
    dispatch(submitCommentReturned({ data: false }));
    dispatch(loadingAction({ loading: true }));
    const toBeSend = {};
    toBeSend["postId"] = Number(id);
    toBeSend["data"] = values.description;
    toBeSend["postLanguage"] = isRTL ? "ar" : "en";
    toBeSend["email"] = values.email;
    toBeSend["name"] = values.name;

    if (popUp) {
      toBeSend["attachmentId"] = fileId;
    }

    dispatch(submitComment({ data: toBeSend }));
  };

  return (
    <Box>
      {popUp && (
        <Typography variant="h2" className="title">
          {title}
        </Typography>
      )}
      <Typography variant="h4" component="h4" className="required">
        {t("OPENDATA.PAGE.FORM.REQUIREDFIELDS")}{" "}
        <strong>{t("OPENDATA.PAGE.FORM.REQUIRED")}</strong>
      </Typography>
      <Formik
        initialValues={{ email: "", name: "", description: "", code: "" }}
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
              ? "يرجى إدخال 1000 محرف على الأكثر"
              : "Description shuold have 1000 characters at most";
          }

          if (!values.code) {
            errors.code = isRTL ? "مطلوب" : "Required";
          }

          return errors;
        }}
        onSubmit={doSubmit}
      >
        {({
          isSubmitting,
          submitForm,
          isValid,
          dirty,
          values,
          touched,
          ...props
        }) => (
          <Form className="form">
            <Grid container>
              <Grid item xs={3} className="icon">
                <Box className={classes.image}>
                  <img src="/assets/images/comment.png" />
                </Box>
              </Grid>

              <Grid item sm={9} xs={12} className="fieldsContainer">
                <Grid item xs={12} className="label">
                  <InputLabel htmlFor={`name`} required>
                    {t("OPENDATA.PAGE.FORM.NAME")}
                  </InputLabel>

                  <Field
                    id={`name`}
                    name="name"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>

                <Grid item xs={12} className="label">
                  <InputLabel htmlFor={`email`} required>
                    {t("OPENDATA.PAGE.FORM.EMAIL")}
                  </InputLabel>

                  <Field
                    id={`email`}
                    name="email"
                    fullWidth={true}
                    component={TextField}
                    variant="outlined"
                    className="inputField"
                  />
                </Grid>
                <Grid item xs={12} className="label">
                  <InputLabel htmlFor={`description`} required>
                    {t("OPENDATA.PAGE.FORM.DESC")}
                  </InputLabel>

                  <Field
                    id={`description`}
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
                    value={description}
                    //className="inputField"
                    onChange={(e) => handleChange(e, props)}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={12} className="captcha">
              <Captcha
                onChange={(value) => props.setFieldValue(`code`, value)}
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
                onClick={submitForm}
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

export default memo(CommentForm);
