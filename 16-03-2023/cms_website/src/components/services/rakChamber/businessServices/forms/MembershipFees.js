import React, { memo, useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Box,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@material-ui/core";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import { Formik, Form, Field } from "formik";
import { TextField, Select } from "formik-material-ui";
import MembershipFeesTable from "../MembershipFeesTable";
import actions from "../../../../../redux/actions";
import * as Yup from "yup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GrAdd } from "react-icons/gr";
import { AiOutlineDelete } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";

const {
  fetchSelectMenuData,
  getMembershipFees,
  getMembershipFeesDone,
  sendMostUsedService,
} = actions;

function MembershipFees(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState([]);
  const [selectMenuData, setSelectMenuData] = useState({});
  const [selectedActivites, setSelectedActivites] = useState([]);
  const [selectedActivitesCodes, setSelectedActivitesCodes] = useState([]);
  const [inputValue, setinputValue] = useState("");
  const [requestStatus, setRequestStatus] = useState(false);

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const initialValues = {
    legal_status_code: "",
    classification_code: "",
    domain_code: "",
    activities_codes: "",
  };

  const doSubmit = async (values) => {
    const activitiesCodes = selectedActivitesCodes.toString();
    const readyValues = {
      activities_codes: activitiesCodes,
      classification_code: values.classification_code,
      domain_code: values.domain_code,
      legal_status_code: values.legal_status_code,
    };
    dispatch(getMembershipFees({ data: { ...readyValues } }));
  };

  useLayoutEffect(() => {
    return () => dispatch(getMembershipFeesDone({ data: {} }));
  }, []);

  useEffect(() => {
    dispatch(fetchSelectMenuData());
    dispatch(sendMostUsedService({ data: 72 }));
  }, []);

  useEffect(() => {
    setSelectMenuData({ ...APIServices.selectMenuDataDone });
  }, [APIServices.selectMenuDataDone]);

  useEffect(() => {
    const result = APIServices.membershipFees;

    if (result) setSearchResults(result);
    result?.items && setRequestStatus(true);
  }, [APIServices.membershipFees]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.NEWMEMBERSHIP.TITLE")}{" "}
      </Typography>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Formik initialValues={initialValues} onSubmit={doSubmit}>
        {({
          isValid,
          dirty,
          values,
          submitForm,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form className={classes.fullForm} variant="outlined">
            <Grid container spacing={1} className={classes.inpuContainer}>
              <Grid item md={6} xs={12}>
                <InputLabel
                  htmlFor="legal_status_code"
                  className={classes.label}
                >
                  {t("SERVICESPAGES.NEWMEMBERSHIP.STATUS")}
                </InputLabel>
                <Field
                  component={Select}
                  className={classes.textField}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: isRTL ? "right" : "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  id="legal_status_code"
                  name="legal_status_code"
                  variant="outlined"
                >
                  {selectMenuData?.legal_status?.map((type, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        value={type.code}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                        className={classes.menuItem}
                      >
                        {isRTL ? type.name : type.name_e}
                      </MenuItem>
                    );
                  })}
                </Field>
                {errors.legal_status_code && touched.legal_status_code ? (
                  <div className={classes.inputfeedback}>
                    {errors.legal_status_code}
                  </div>
                ) : null}
              </Grid>

              <Grid item md={6} xs={12}>
                <InputLabel
                  htmlFor="classification_code"
                  className={classes.label}
                >
                  {t("SERVICESPAGES.NEWMEMBERSHIP.CATEGORY")}
                </InputLabel>
                <Field
                  component={Select}
                  className={classes.textField}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: isRTL ? "right" : "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  id="classification_code"
                  name="classification_code"
                  variant="outlined"
                >
                  {selectMenuData?.classification?.map((type, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        value={type.code}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                        className={classes.menuItem}
                      >
                        {isRTL ? type.name : type.name_e}
                      </MenuItem>
                    );
                  })}
                </Field>{" "}
                {errors.classification_code && touched.classification_code ? (
                  <div className={classes.inputfeedback}>
                    {errors.classification_code}
                  </div>
                ) : null}
              </Grid>

              <Grid item md={6} xs={12}>
                <InputLabel htmlFor="domain_code" className={classes.label}>
                  {t("SERVICESPAGES.NEWMEMBERSHIP.DOMAIN")}
                </InputLabel>
                <Field
                  component={Select}
                  className={classes.textField}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "top",
                      horizontal: isRTL ? "right" : "left",
                    },
                    getContentAnchorEl: null,
                  }}
                  id="domain_code"
                  name="domain_code"
                  variant="outlined"
                >
                  {selectMenuData?.domain?.map((type, idx) => {
                    return (
                      <MenuItem
                        key={idx}
                        value={type.code}
                        style={{ direction: isRTL ? "rtl" : "ltr" }}
                        className={classes.menuItem}
                      >
                        {isRTL ? type.name : type.name_e}
                      </MenuItem>
                    );
                  })}
                </Field>{" "}
                {errors.domain_code && touched.domain_code ? (
                  <div className={classes.inputfeedback}>
                    {errors.domain_code}
                  </div>
                ) : null}
              </Grid>
              <Grid item md={6} xs={12}></Grid>
              <Grid item md={6} xs={12}>
                <InputLabel
                  htmlFor="activities_codes"
                  className={classes.label}
                >
                  {t("SERVICESPAGES.NEWMEMBERSHIP.ACTIVITIES")}
                </InputLabel>
                <Autocomplete
                  className={classes.textField}
                  onInputChange={(e) => setinputValue(e.target.value)}
                  id="contact-autocomplete"
                  options={
                    selectMenuData?.iactivity ? selectMenuData.iactivity : []
                  }
                  getOptionLabel={(option) =>
                    isRTL ? option?.name : option?.name_e
                  }
                  onChange={(e, value) =>
                    setFieldValue("activities_codes", value || null)
                  }
                  open={inputValue?.length > 1}
                  includeInputInList
                  renderInput={(params) => (
                    <Field
                      component={TextField}
                      {...params}
                      fullWidth
                      name="activities_codes"
                      variant="outlined"
                    />
                  )}
                  PaperComponent={({ children }) => (
                    <Paper
                      style={{
                        textTransform: "capitalize",
                        direction: isRTL ? "rtl" : "ltr",
                        fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                      }}
                      className={classes.menuItem}
                    >
                      {children}
                    </Paper>
                  )}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Box display="flex" alignItems="center" height={"100%"}>
                  <Button
                    disabled={!values?.activities_codes?.code}
                    variant="contained"
                    className={classes.addBtn}
                    disableElevation
                    onClick={() => (
                      setSelectedActivites([
                        ...selectedActivites,
                        values.activities_codes,
                      ]),
                      setSelectedActivitesCodes([
                        ...selectedActivitesCodes,
                        values.activities_codes.code,
                      ])
                    )}
                    endIcon={<GrAdd />}
                  >
                    {t("SERVICESPAGES.NEWMEMBERSHIP.ADD")}
                  </Button>
                </Box>
              </Grid>
              {selectedActivites?.length != 0 && (
                <Grid item md={12} xs={12}>
                  <Grid item md={12}>
                    {" "}
                    <Typography className={classes.heading}>
                      {isRTL
                        ? "تفاصيل الأنشطة التجارية"
                        : "Business Activities Details"}
                    </Typography>
                  </Grid>
                  <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            {isRTL ? "رمز النشاط" : "Activity Code"}
                          </TableCell>
                          <TableCell>
                            {isRTL ? "اسم النشاط بالعربي" : "Activity En Name"}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedActivites?.map((activity, index) => (
                          <TableRow key={activity.code}>
                            <TableCell>{activity.code}</TableCell>
                            <TableCell>
                              {isRTL ? activity.name : activity.name_e}
                            </TableCell>
                            <TableCell>
                              {" "}
                              <IconButton
                                onClick={() => (
                                  setSelectedActivites(
                                    selectedActivites?.filter((i, iIndex) => {
                                      return iIndex !== index;
                                    })
                                  ),
                                  setSelectedActivitesCodes(
                                    selectedActivitesCodes?.filter(
                                      (i, iIndex) => {
                                        return iIndex !== index;
                                      }
                                    )
                                  )
                                )}
                              >
                                <AiOutlineDelete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              )}
            </Grid>
            <Button
              variant="contained"
              className={classes.send}
              onClick={submitForm}
              disabled={!isValid || !dirty}
              disableElevation
              endIcon={<GiTwoCoins />}
            >
              {t("SERVICESPAGES.NEWMEMBERSHIP.CALCULATE")}
            </Button>
          </Form>
        )}
      </Formik>
      {searchResults?.items && (
        <Grid container xs={12}>
          <Box className={classes.divider}>
            <Typography name="fills">
              {t("SERVICESPAGES.NEWMEMBERSHIP.ESTIMATEDFEES")}
            </Typography>
          </Box>
          <MembershipFeesTable data={searchResults?.items} />
        </Grid>
      )}
    </Grid>
  );
}

export default memo(MembershipFees);
