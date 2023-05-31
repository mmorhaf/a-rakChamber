import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import actions from "../../../redux/actions";
import useDialogStyles from "../../../styles/components/shared/dialog/dialog";

const { addIsuseful, addReportReturned } = actions;

function DialogForm({ open, handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    const data = {};
    data["url"] = `${window.location.href}`;
    data["isUsefull"] = Boolean(false);
    data["reason"] = `${values.feedback}`;

    dispatch(addIsuseful({ data }));
    handleClose();
  };

  const initialValues = {
    feedback: "",
  };

  const validationSchema = Yup.object({
    feedback: Yup.string().required("Required"),
  });

  const classes = useDialogStyles();

  useEffect(() => {
    dispatch(addReportReturned({ data: false }));
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title">{t("HELPFUL.TITLE")}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, dirty, isSubmitting }) => (
            <Form>
              <Field
                name="feedback"
                fullWidth={true}
                component={TextField}
                variant="outlined"
                multiline={true}
                className={classes.fontFamily}
                rows={4}
              />
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  {t("HELPFUL.CANCEL")}
                </Button>
                <Button
                  type="submit"
                  //onClick={handleClose}
                  color="primary"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {t("HELPFUL.SUBMIT")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default memo(DialogForm);
