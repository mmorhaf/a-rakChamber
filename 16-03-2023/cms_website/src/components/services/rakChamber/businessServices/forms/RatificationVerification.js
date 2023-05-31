import { Box, Button, Grid, InputLabel, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CiFaceSmile } from "react-icons/ci";
import { GoUnverified } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTION } from "../../../../../constants/config.json";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import HappinessMetter from "../../../../floatingSocialButtons/HappinessMetter";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const {
  getRatificationVerify,
  getRatificationVerifyReturned,
  sendMostUsedService,
} = actions;

function RatificationVerification(props) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);
  const { t } = useTranslation();
  const { APIServices } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  const initialValues = {
    code: "",
  };

  const doSubmit = async (values) => {
    setCode(values.code);
    const readyValues = { verify_id: values.code };
    setMessage("");
    dispatch(getRatificationVerify({ data: { ...readyValues } }));
  };

  const rateValues = {
    req_code: null,
    ref_code: null,
    income_code: "59",
    service_step: 5,
    inserted_by: profile?.username,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    service_code: "110",
    chamber_remarks: code,
  };

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("verify_id"))
      dispatch(
        getRatificationVerify({
          data: {
            verify_id: new URLSearchParams(window.location.search).get(
              "verify_id"
            ),
          },
        })
      );
    else dispatch(sendMostUsedService({ data: 947 }));
  }, []);

  useLayoutEffect(() => {
    return () => dispatch(getRatificationVerifyReturned({ data: [] }));
  }, []);

  useEffect(() => {
    const result = APIServices.ratificationVerificationReturned;
    if (result) {
      if (result?.ratification?.length == 0) {
        setMessage(
          isRTL
            ? "رمز التحقق غير صحيح , يرجى التأكد من الرمز"
            : `Coo number is invalid, please check the Verification ID`
        );
        setSearchResults(result.ratification);
      } else if (new URLSearchParams(window.location.search).get("verify_id")) {
        window.open(
          `${PRODUCTION}/api/ratifi/download/${result?.ratification[0]?.ratified_file}`,
          "_self"
        );
      } else setSearchResults(result.ratification);
      setRequestStatus(true);
    }
  }, [APIServices.ratificationVerificationReturned]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {isRTL ? "التحقق من التصديق" : "Ratification Verification"}
      </Typography>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Formik initialValues={initialValues} onSubmit={doSubmit}>
        {({ isValid, dirty, values, submitForm }) => (
          <Form className={classes.fullForm} variant="outlined">
            <Grid container>
              <Typography style={{ color: "red" }}>{message}</Typography>
              <Grid container item className={classes.inpuContainer}>
                <Grid item xs={12} md={3}>
                  <InputLabel htmlFor="code" className={classes.label}>
                    {isRTL ? "أدخل رمز التحقق" : "Insert Verify Code"}{" "}
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
              <Box className={classes.spaceBetween}>
                <Button
                  variant="contained"
                  className={classes.send}
                  onClick={submitForm}
                  disabled={!isValid || !dirty}
                  disableElevation
                  endIcon={<GoUnverified />}
                >
                  {isRTL ? "تحقق" : "Verify"}
                </Button>
                {searchResults?.length > 0 ? (
                  <Button
                    className={clsx(
                      classes.send,
                      classes.marginLeft16,
                      classes.smallerBtn,
                      classes.marginRight16
                    )}
                    endIcon={<CiFaceSmile />}
                    onClick={(e) => {
                      setOpen(true);
                    }}
                  >
                    <span className={classes.exportText}>
                      {t("SERVICESPAGES.DIRECTORY.RATESERVICE")}
                    </span>
                    <CiFaceSmile className={classes.exportIcon} />
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </Form>
        )}
      </Formik>

      {searchResults && searchResults[0]?.ratified_file && (
        <>
          <Typography className={classes.label}>
            {isRTL
              ? "لاستعراض الملفات المصدقة :"
              : "To View The Ratified Files :"}
          </Typography>
          {searchResults?.length > 0 &&
            searchResults.map((item) => (
              <Button
                className={classes.pdfRead}
                variant="contained"
                target="_self"
                href={`${PRODUCTION}/api/ratifi/download/${item?.ratified_file}`}
              >
                {item?.ratified_file}
              </Button>
            ))}
        </>
      )}
      <HappinessMetter
        open={open}
        setOpen={setOpen}
        rateValues={rateValues}
        closeBtn={true}
      />
    </Grid>
  );
}

export default memo(RatificationVerification);
