import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import useDialogStyles from "../../../styles/components/shared/dialog/dialog";

const { addReport, addReportReturned, addIsusefulReturned } = actions;

function ReportForm({ open, handleClose }) {
  const dispatch = useDispatch();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const handleSubmit = async (values) => {
    const data = {};
    // const url = window.location.href;
    data["reason"] = `${values.feedback}`;
    data["url"] = `${values.url}`;

    dispatch(addReport({ data }));
  };

  const initialValues = {
    feedback: "",
    url: window.location.href,
  };

  const validationSchema = Yup.object({
    feedback: Yup.string().required("Required"),
    url: Yup.string().required("Required"),
  });

  const classes = useDialogStyles();

  useEffect(() => {
    dispatch(addReportReturned({ data: false }));
    dispatch(addIsusefulReturned({ data: false }));
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title">
        {isRTL
          ? "هل تريد الإبلاغ عن شيء ما ؟"
          : "Do you want to report something ?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isRTL
            ? "إشرح مشكلتك في الأسفل من فضلك"
            : "Explain your problem below, please"}
        </DialogContentText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, isSubmitting }) => (
            <Form>
              <h4>{isRTL ? "الرابط :" : "Url :"}</h4>
              <Field
                name="url"
                fullWidth={true}
                component={TextField}
                variant="outlined"
                multiline={true}
                rows={2}
              />
              <h4>{isRTL ? "التعليق :" : "Comment :"}</h4>
              <Field
                name="feedback"
                fullWidth={true}
                component={TextField}
                variant="outlined"
                multiline={true}
                rows={4}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {isRTL ? "إلغاء" : "Cancel"}
                </Button>
                <Button
                  type="submit"
                  onClick={handleClose}
                  color="primary"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isRTL ? "إرسال" : "submit"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default memo(ReportForm);
