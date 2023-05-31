import {
  Box,
  Button,
  Grid,
  InputLabel,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import PropTypes from "prop-types";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { CiFaceSmile } from "react-icons/ci";
import { RiSearch2Line } from "react-icons/ri";
import { TbTableExport } from "react-icons/tb";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { arLab, enLabels } from "../../../../../constants/labels";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import usePaginationStyles from "../../../../../styles/components/shared/pagination/pagination";
import { makeExcel } from "../../../../../utils/makeExcel";
import HappinessMetter from "../../../../floatingSocialButtons/HappinessMetter";
import { pagination } from "../../../../shared/utils";
import VerifyServiceSteps from "../../steps/VerifyServiceSteps";
import MembershipProfileEstablishment from "../../templates/MembershipProfileEstablishment";

const {
  postBusinessDirectoryForm,
  postBusinessDirectoryFormReturned,
  sendMostUsedService,
  fetchIsicActivityData,
  postBusinessDirectoryActivity,
} = actions;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function BusinessDirectoryForm(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [searchResults, setSearchResults] = useState(null);
  const [isicActivity, setIsicActivity] = useState([]);
  const [isicSector, setIsicSector] = useState([]);
  const [activityByGroup, setActivityByGroup] = useState([]);
  const [phoneValue, setPhoneValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [value, setValue] = useState(0);
  const [inputValue, setinputValue] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [sectorCode, setSectorCode] = useState(null);
  const [isicCode, setIsicCode] = useState(null);
  const [displayAll, setDisplayAll] = useState(false);
  const [searcherName, setSearcherName] = useState("");
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    pgCount: 0,
  });
  const [requestStatus, setRequestStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };
  const paginationClasses = usePaginationStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /[\u0600-\u06FF]/;
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  const rateValues = {
    req_code: null,
    ref_code: null,
    income_code: null,
    service_step: 5,
    inserted_by: searcherName, //add name
    company_code: 0,
    person_code: 0,
    service_code: "120",
    chamber_remarks: null,
  };
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    mobile: "",
    tradeNameEn: "",
    trn: "",
    pobox: "",
    establishName: isRTL ? profile?.name : profile?.name_e,
    sector_code: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    phone: Yup.string().test(
      "len",
      isRTL ? "الرجاء إضافة رقم الهاتف" : "Please Add phone Number",

      (val) => val && val.length > 8
    ),
    fills:
      value == 0
        ? Yup.string().when(["tradeNameEn", "pobox", "trn"], {
            is: (tradeNameEn, pobox, trn) => !tradeNameEn && !pobox && !trn,
            then: Yup.string().required(
              isRTL
                ? "يرجى ملء حقل واحد على الأقل أدناه"
                : "Please Fill One Field At Least Below"
            ),
          })
        : Yup.string().when(["isic_code", "sector_code"], {
            is: (isic_code, sector_code) => !isic_code && !sector_code,
            then: Yup.string().required(
              isRTL
                ? "يرجى ملء حقل واحد على الأقل أدناه"
                : "Please Fill One Field At Least Below"
            ),
          }),
  });

  const doSubmit = async (values, { resetForm }) => {
    if (value == 0) {
      let memberValues = {
        NAME: values.name,
        EMAIL: values.email,
        TEL: phoneValue,
        MOBILE: values.phone,
        COMPANY_NAME_E: values.tradeNameEn,
        trn: values.trn,
        pobox: values.pobox,
        establishName: values.establishName,
        COMPANY_CODE: profile?.company_code ? profile?.company_code : "",
        ENQUIRY_LANG: isRTL ? "1" : "2",
      };
      if (isRTL)
        memberValues = {
          NAME: values.name,
          EMAIL: values.email,
          TEL: phoneValue,
          MOBILE: values.phone,
          COMPANY_NAME: values.tradeNameEn,
          trn: values.trn,
          pobox: values.pobox,
          establishName: values.establishName,
          COMPANY_CODE: profile?.company_code ? profile?.company_code : "",
          ENQUIRY_LANG: "1",
        };
      dispatch(postBusinessDirectoryForm({ data: { ...memberValues } }));
    } else if (value == 1) {
      const activityValues = {
        NAME: values.name,
        EMAIL: values.email,
        TEL: phoneValue,
        MOBILE: values.phone,
        establishName: values.establishName,
        activity_code: values.isic_code,
        sector_code: values.sector_code,
        ENQUIRY_LANG: isRTL ? "1" : "2",
      };
      dispatch(postBusinessDirectoryActivity({ data: { ...activityValues } }));
    }
    setRequestStatus(true);
    // setPhoneValue("");
    // resetForm();
  };

  useEffect(() => {
    dispatch(sendMostUsedService({ data: 215 }));
    dispatch(fetchIsicActivityData());
  }, []);

  useEffect(() => {
    let result = [];
    if (value === 0) {
      result = APIServices.businessDirectoryFormReturned || null;
    } else result = APIServices.businessDirectoryByActivityReturned || null;

    setSearchResults(result);
  }, [
    APIServices.businessDirectoryFormReturned,
    APIServices.businessDirectoryByActivityReturned,
    value,
  ]);

  useEffect(() => {
    setIsicActivity(APIServices.isicActivityDataDone.isic_activity);
    setActivityByGroup(APIServices.isicActivityDataDone.isic_activity);
    setIsicSector(APIServices.isicActivityDataDone.sector);
  }, [APIServices.isicActivityDataDone]);

  useLayoutEffect(() => {
    return () => dispatch(postBusinessDirectoryFormReturned({ data: [] }));
  }, []);
  let displayedContent = searchResults;

  useLayoutEffect(() => {
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);
    setPaginate({ requiredArr, pgCount: count });
  }, [displayedContent, pageNum]);

  const handlePdf = () => {
    html2canvas(document.getElementById("print_to_pdf")).then((canvas) => {
      var data = canvas.toDataURL();
      var pdfExportSetting = {
        content: [
          {
            image: data,
            width: 500,
          },
        ],
      };
      pdfMake
        .createPdf(pdfExportSetting)
        .download("Business_Directory_search_results.pdf");
    });
  };

  const handleExcel = async () => {
    let data = {};
    data.fileName = "Buisness Directory";
    data.workSheetName = ["Search Results"];
    data.columnTitles = [
      [
        "",
        t("SERVICESPAGES.FORMS.FORM.COMPANY"),
        t("SERVICESPAGES.FORMS.FORM.COMPANYEMAIL"),
        t("SERVICESPAGES.DIRECTORY.PHONENUM"),
        t("SERVICESPAGES.DIRECTORY.ADRESS"),
      ],
    ];
    data.columnWidth = [[10, 40, 40, 40, 40, 40, 40, 40]];
    let real = [];
    real = searchResults.map((item) => {
      return {
        company: isRTL ? item.company_name : item.company_name_e,
        email: item?.email,
        phoneNum: item.tel1,
        address: isRTL
          ? item.city_name + " " + item.street_name
          : item.city_name_e + " " + item.street_name_e,
      };
    });
    data.rows = [real];
    await makeExcel(data, isRTL);
  };

  const allResults = useMemo(
    () =>
      searchResults?.length &&
      searchResults?.map((item) => {
        return (
          <Grid item xs={12} md={6}>
            <Box
              className="searchResultItem"
              onClick={() => (
                setOpenModal(true), setSelectedResult(item.company_code)
              )}
            >
              <Typography>
                {t("SERVICESPAGES.FORMS.FORM.COMPANY")} :{" "}
                <span> {isRTL ? item.company_name : item.company_name_e}</span>
              </Typography>
              <Typography>
                {t("SERVICESPAGES.FORMS.FORM.COMPANYEMAIL")} :{" "}
                <span> {item.email}</span>
              </Typography>
              <Typography>
                {t("SERVICESPAGES.DIRECTORY.PHONENUM")} :{" "}
                <span> {item.tel1}</span>
              </Typography>
              <Typography>
                {t("SERVICESPAGES.DIRECTORY.ADRESS")} : {"  "}
                <span>
                  {isRTL ? item.city_name : item?.city_name_e}{" "}
                  {(isRTL && item.city_name) || (!isRTL && item?.city_name_e)
                    ? ","
                    : ""}{" "}
                  {isRTL ? item.street_name : item?.street_name_e}
                </span>
              </Typography>
            </Box>
          </Grid>
        );
      }),
    [searchResults]
  );

  const result = useMemo(
    () =>
      searchResults && searchResults?.length > 0 ? (
        paginate?.requiredArr?.length &&
        paginate?.requiredArr?.map((item) => {
          return (
            <Grid item xs={12} md={6}>
              <Box
                className="searchResultItem"
                onClick={() => (
                  setOpenModal(true), setSelectedResult(item.company_code)
                )}
              >
                <Typography>
                  {t("SERVICESPAGES.FORMS.FORM.COMPANY")} :{" "}
                  <span>
                    {" "}
                    {isRTL ? item.company_name : item.company_name_e}
                  </span>
                </Typography>
                <Typography>
                  {t("SERVICESPAGES.FORMS.FORM.COMPANYEMAIL")} :{" "}
                  <span> {item.email}</span>
                </Typography>
                <Typography>
                  {t("SERVICESPAGES.DIRECTORY.PHONENUM")} :{" "}
                  <span> {item.tel1}</span>
                </Typography>
                <Typography>
                  {t("SERVICESPAGES.DIRECTORY.ADRESS")} : {"  "}
                  <span>
                    {isRTL ? item.city_name : item?.city_name_e}{" "}
                    {(isRTL && item.city_name) || (!isRTL && item?.city_name_e)
                      ? ","
                      : ""}{" "}
                    {isRTL ? item.street_name : item?.street_name_e}
                  </span>
                </Typography>
              </Box>
            </Grid>
          );
        })
      ) : Array.isArray(searchResults) ? (
        <span className={classes.noSearch}>
          {t("SERVICESPAGES.DIRECTORY.NORESULTS")}
        </span>
      ) : null,
    [paginate.requiredArr]
  );
  return (
    <Grid container className={classes.formRoot}>
      <Grid item xs={12}>
        <Typography className={classes.serviceTitle}>
          {t("SERVICESPAGES.DIRECTORY.TITLE")}
        </Typography>
      </Grid>
      <VerifyServiceSteps getStatus={requestStatus ? 1 : 0} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize
      >
        {({
          isValid,
          dirty,
          values,
          submitForm,
          errors,
          touched,
          setFieldValue,
          setFieldError,
        }) => (
          <Form variant="outlined">
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box className="serviceFormIcon">
                  <img src="/assets/images/bds.png" />
                </Box>
              </Grid>
              <Grid
                container
                spacing={2}
                item
                xs={12}
                md={9}
                className={classes.inpuContainer}
              >
                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="name" className={classes.label}>
                    {t("CONTACTUS.NAME")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    component={TextField}
                    className={classes.textField}
                    id="name"
                    name="name"
                    variant="outlined"
                    value={values?.name}
                    onChange={(e) => {
                      setFieldValue("name", e?.target?.value);
                      setSearcherName(e?.target?.value);
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="establishName" className={classes.label}>
                    {t("SERVICESPAGES.DIRECTORY.ESTABLISHMENT")}{" "}
                  </InputLabel>

                  <Field
                    component={TextField}
                    className={classes.textField}
                    id="establishName"
                    name="establishName"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="email" className={classes.label}>
                    {t("SERVICESPAGES.FORMS.FORM.EMAIL")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>

                  <Field
                    component={TextField}
                    className={classes.textField}
                    id="email"
                    name="email"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <InputLabel htmlFor="mobile" className={classes.label}>
                    {t("SERVICESPAGES.DIRECTORY.MOBILE")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Field
                    component={PhoneInput}
                    labels={isRTL ? arLab : enLabels}
                    name="phone"
                    type="text"
                    id="phone"
                    style={{ direction: "ltr" }}
                    value={values.phone}
                    className={classes.phoneNumber}
                    onChange={(e) => {
                      setFieldValue("phone", e);
                      if (e) {
                        if (!isPossiblePhoneNumber(e))
                          setFieldError(
                            "phone",
                            isRTL
                              ? "الرجاء إضافة رقم الهاتف"
                              : "Please Add phone Number"
                          );
                      }
                    }}
                    variant="outlined"
                    placeholder={isRTL ? "" : "أدخل رقم هاتفك"}
                    defaultCountry="AE"
                    international
                  />
                  {values.phone &&
                  isPossiblePhoneNumber(values.phone) ? null : (
                    <div className={classes.inputfeedback}>{errors.phone}</div>
                  )}
                </Grid>
                <Grid item xs={12} md={6} className={classes.inpuContainer}>
                  <InputLabel htmlFor="phone" className={classes.label}>
                    {t("SERVICESPAGES.FORMS.FORM.PHONE")}
                  </InputLabel>
                  <Box display="flex">
                    <PhoneInput
                      international
                      style={{ direction: "ltr" }}
                      labels={isRTL ? arLab : enLabels}
                      value={phoneValue}
                      onChange={setPhoneValue}
                      className={classes.textField}
                      defaultCountry="AE"
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="Vertical tabs example"
                  className="tradesTabs"
                >
                  <Tab
                    label={t("SERVICESPAGES.DIRECTORY.MEMBERS")}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label={t("SERVICESPAGES.DIRECTORY.ACTIVITIES")}
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <Grid container spacing={2} className={classes.inpuContainer}>
                    <Grid item xs={12}>
                      <Typography className="info" name="fills">
                        {t("SERVICESPAGES.DIRECTORY.SEARCHFEEDBACK")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel
                        htmlFor="tradeNameEn"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.DIRECTORY.TRADENAME")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="tradeNameEn"
                        name="tradeNameEn"
                        variant="outlined"
                        onKeyUp={(e) => {
                          if (e.which === 13) {
                            submitForm();
                          }
                        }}
                      />
                    </Grid>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="trn" className={classes.label}>
                        {t("SERVICESPAGES.DIRECTORY.TRADEREG")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="trn"
                        name="trn"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="pobox" className={classes.label}>
                        {t("SERVICESPAGES.DIRECTORY.BOX")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="pobox"
                        name="pobox"
                        variant="outlined"
                      />
                    </Grid>

                    <Box className={classes.buttons}>
                      <Button
                        variant="contained"
                        className={classes.send}
                        disableElevation
                        onClick={(e) => {
                          setDisplayAll(false);
                          submitForm();
                        }}
                        endIcon={<RiSearch2Line />}
                        disabled={!isValid || !dirty}
                      >
                        {t("MEDIA.NEWS.SEARCH.BTN")}
                      </Button>
                      {searchResults && searchResults?.length > 0 ? (
                        <Box className={classes.space}>
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
                          <Button
                            className={clsx(classes.send, classes.smallerBtn)}
                            endIcon={<TbTableExport />}
                            onClick={(e) => {
                              setDisplayAll(true);
                              handleExcel();
                            }}
                          >
                            <span className={classes.exportText}>
                              {t("SERVICESPAGES.DIRECTORY.EXPORTEXCEL")}
                            </span>
                            <TbTableExport className={classes.exportIcon} />
                          </Button>
                        </Box>
                      ) : null}
                    </Box>
                  </Grid>
                </TabPanel>
                <TabPanel className="tabContainer" value={value} index={1}>
                  <Grid container spacing={2} className={classes.inpuContainer}>
                    <Grid item xs={12}>
                      <Typography className="info" name="fills">
                        {t("SERVICESPAGES.DIRECTORY.SEARCHFEEDBACK")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel
                        htmlFor="sector_code"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.DIRECTORY.SECTOR")}
                      </InputLabel>
                      <Autocomplete
                        className={classes.textField}
                        onInputChange={(e) => setinputValue(e?.target?.value)}
                        id="contact-autocomplete"
                        options={isicSector ? isicSector : []}
                        getOptionLabel={(option) =>
                          isRTL ? option?.name : option?.name_e
                        }
                        value={sectorCode}
                        onChange={(e, value) => {
                          setSectorCode(value);
                          let filteredActivity = [];
                          value &&
                            (filteredActivity = isicActivity?.filter(
                              (item) =>
                                item.sector_code == value?.section_en_code
                            ));
                          setActivityByGroup(filteredActivity);

                          setFieldValue(
                            "sector_code",
                            value?.section_en_code || ""
                          );
                        }}
                        includeInputInList
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            fullWidth
                            name="sector_code"
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
                    <Grid item xs={12} md={6}>
                      <InputLabel htmlFor="trn" className={classes.label}>
                        {t("SERVICESPAGES.DIRECTORY.ACTIVITY")}
                      </InputLabel>

                      <Autocomplete
                        className={classes.textField}
                        onInputChange={(e) => setinputValue(e?.target?.value)}
                        id="contact-autocomplete"
                        options={
                          activityByGroup
                            ? values?.sector_code
                              ? activityByGroup?.filter(
                                  (item) =>
                                    item?.sector_code === values?.sector_code
                                )
                              : activityByGroup
                            : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option?.name : option?.name_e
                        }
                        value={isicCode}
                        onChange={(e, value) => {
                          setIsicCode(value);
                          setFieldValue("isic_code", value?.code || "");
                        }}
                        // disabled={values.sector_code == ""}
                        // open={inputValue?.length > 1}
                        includeInputInList
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            fullWidth
                            name="isic_code"
                            variant="outlined"
                            placeholder={t(
                              "SERVICESPAGES.DIRECTORY.ACTIVITYPLACEHOLDER"
                            )}
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

                    <Grid item xs={12}>
                      <Box className={classes.buttons}>
                        <Button
                          variant="contained"
                          className={classes.send}
                          disableElevation
                          onClick={submitForm}
                          endIcon={<RiSearch2Line />}
                          disabled={!isValid || !dirty}
                        >
                          {t("MEDIA.NEWS.SEARCH.BTN")}
                        </Button>
                        {searchResults && searchResults?.length > 0 ? (
                          <Box className={classes.space}>
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
                            <Button
                              className={clsx(classes.send, classes.smallerBtn)}
                              endIcon={<TbTableExport />}
                              onClick={(e) => {
                                setDisplayAll(true);
                                handleExcel();
                              }}
                            >
                              <span className={classes.exportText}>
                                {t("SERVICESPAGES.DIRECTORY.EXPORTEXCEL")}
                              </span>
                              <TbTableExport className={classes.exportIcon} />
                            </Button>
                          </Box>
                        ) : null}
                      </Box>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {!displayAll && (
        <Grid container spacing={2}>
          {result}
        </Grid>
      )}
      {paginate.pgCount > 0 && !displayAll && (
        <Grid item xs={12} className="pagination">
          <Pagination
            className={paginationClasses.root}
            count={paginate.pgCount}
            variant="outlined"
            shape="rounded"
            onChange={handlePaginationClick}
          />
        </Grid>
      )}
      {
        <MembershipProfileEstablishment
          code={selectedResult}
          openModal={openModal}
          setOpenModal={setOpenModal}
          cancelBtn={true}
        />
      }
      {displayAll && (
        <Grid container spacing={2} id="print_to_pdf">
          {allResults}
        </Grid>
      )}
      <HappinessMetter open={open} setOpen={setOpen} rateValues={rateValues} />
    </Grid>
  );
}

export default memo(BusinessDirectoryForm);
