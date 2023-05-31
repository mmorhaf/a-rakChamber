import React, { memo, useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Typography, Button, InputLabel } from "@material-ui/core";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import actions from "../../../../../redux/actions";
import store from "../../../../../redux/store";
import { push } from "connected-react-router";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker } from "formik-material-ui-pickers";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import * as Yup from "yup";
import { GoUnverified } from "react-icons/go";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const { getMembershipVerifyDone, sendMostUsedService, getMembershipVerify } =
  actions;

function MembershipVerify(props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const classes = useStyles();
  const { APIServices } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [error, setError] = useState(false);
  const [code, setCode] = useState(null);
  const [companyDate, setCompanyDate] = useState(null);
  const [requestStatus, setRequestStatus] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const initialValues = {
    code: "",
    date: null,
  };
  const validationSchema = Yup.object({
    code: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    // date: Yup.date()
    //   .required(isRTL ? "مطلوب" : "Required")
    //   .nullable(),
  });

  const doSubmit = async (values, { resetForm }) => {
    setRequestStatus(true);
    const code = values.code;
    setCode(code);
    const CompanyDate = moment(selectedDate).format("DD-MM-YYYY");
    store.dispatch(
      push(
        isRTL
          ? `/ar/services-form/business-services/membership-preview/${code}/${CompanyDate}`
          : `/en/services-form/business-services/membership-preview/${code}/${CompanyDate}`
      )
    );
    // resetForm({});
  };

  useEffect(() => {
    dispatch(sendMostUsedService({ data: 68 }));
  }, []);

  useLayoutEffect(() => {
    return () => dispatch(getMembershipVerifyDone({ data: {} }));
  }, []);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {isRTL
          ? "التحقق من شهادة العضوية"
          : "Verification of The Membership Certificate"}
      </Typography>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize={true}
      >
        {({ isValid, dirty, values, submitForm }) => (
          <Form className={classes.fullForm} variant="outlined">
            <Grid container>
              {error ? (
                <Typography style={{ color: "red" }}>
                  {isRTL
                    ? "عفواً! لا توجد شهادة عضوية صادرة من غرفة رأس الخيمة بهذه البيانات , يرجى التأكد من رقم العضوية وتاريخ الانتساب. "
                    : "Sorry! There is not Membership Certificate issued from Rak Chamber with this detail , Please check Membership No. and Membership Since ."}
                </Typography>
              ) : null}
              <Grid container item className={classes.inpuContainer}>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="code" className={classes.label}>
                    {isRTL ? "رقم العضوية" : "Membership Code "}
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
              <Grid container item className={classes.inpuContainer}>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="date" className={classes.label}>
                    {isRTL ? "العضوية منذ" : "Membership Since"}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                </Grid>
                <Grid item xs={12} md={7}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.textFieldDate2}
                      name="date"
                      margin="normal"
                      id="date-picker-dialog"
                      format="dd-MM-yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                className={classes.send}
                onClick={submitForm}
                disabled={!isValid || !dirty || selectedDate == null}
                disableElevation
                endIcon={<GoUnverified />}
              >
                {isRTL ? "تحقق" : "Verify"}
              </Button>{" "}
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  );
}

export default memo(MembershipVerify);
