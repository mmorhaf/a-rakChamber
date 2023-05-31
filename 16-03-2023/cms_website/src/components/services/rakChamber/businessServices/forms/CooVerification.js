import { Button, Grid, InputLabel, Typography } from "@material-ui/core";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GoUnverified } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import actions from "../../../../../redux/actions";
import store from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const MySwal = withReactContent(Swal);

const { postCooVerifyForm, postCooVerifyFormReturned, sendMostUsedService } =
  actions;

function CooVerification(props) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);

  const classes = useStyles();
  const { APIServices } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialValues = {
    code: "",
  };

  const doSubmit = async (values, { resetForm }) => {
    const readyValues = { verify_id: values.code };

    dispatch(postCooVerifyForm({ data: { ...readyValues } }));
    // resetForm({});
  };

  useEffect(() => {
    dispatch(sendMostUsedService({ data: 57 }));
  }, []);
  useLayoutEffect(() => {
    return () => dispatch(postCooVerifyFormReturned({ data: [] }));
  }, []);

  useEffect(() => {
    const result = APIServices.cooVerificationFormReturned;
    if (result && result?.length != 0) {
      if (
        result?.coo?.length == 0 &&
        result?.details?.length == 0 &&
        result?.origin_countries?.length == 0
      ) {
        setOpen(true);
        setMessage(t("SERVICESPAGES.COOVERIFY.MSG"));
      } else {
        return result?.coo?.length
          ? store.dispatch(
              push(
                `/services-form/business-services/coo-preview/coo-verify/${result.coo[0].coo_code}/null/null/null/null`
              )
            )
          : null;
      }
      setRequestStatus(true);
    }
  }, [APIServices.cooVerificationFormReturned]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.COOVERIFY.TITLE")}
      </Typography>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Formik initialValues={initialValues} onSubmit={doSubmit}>
        {({ isValid, dirty, values, submitForm }) => (
          <Form className={classes.fullForm} variant="outlined">
            <Grid container>
              <Grid container item className={classes.inpuContainer}>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="code" className={classes.label}>
                    {t("SERVICESPAGES.COOVERIFY.CODE")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Grid>
                <Grid item xs={12} md={7}>
                  <Field
                    component={TextField}
                    className={classes.textField}
                    id="code"
                    name="code"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                className={classes.send}
                onClick={submitForm}
                disabled={!isValid || !dirty}
                disableElevation
                endIcon={<GoUnverified />}
              >
                {t("SERVICESPAGES.COOVERIFY.BTN")}
              </Button>{" "}
            </Grid>
          </Form>
        )}
      </Formik>
      <ServicesResultModal open={open} setOpen={setOpen} message={message} />
    </Grid>
  );
}

export default memo(CooVerification);
