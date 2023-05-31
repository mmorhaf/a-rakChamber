import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Fab,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  TextField as TextField2,
  Typography,
  InputAdornment,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import moment from "moment";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { AiFillInfoCircle } from "react-icons/ai";
import { FaBoxes } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { GoVerified } from "react-icons/go";
import { HiSave } from "react-icons/hi";
import { IoCopy } from "react-icons/io5";
import { RiAttachmentLine, RiUserLocationFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import actions from "../../../../../redux/actions";
import { store } from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import debounce from "lodash.debounce";
import { DatePicker } from "formik-material-ui-pickers";
import { MdDateRange } from "react-icons/md";
import ServiceStep from "../../steps/ServiceSteps";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

const MySwal = withReactContent(Swal);

const {
  saveNewCooData,
  saveNewCooDataDone,
  fetchSelectMenuData,
  calculateFees,
  uploadRakFileDone,
  calculateFeesDone,
  sendCooAttachments,
  uploadRakFile,
  checkInvoiceNo,
  sendMostUsedService,
  sendNotification,
  sendEmail,
} = actions;

function NewCoo(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [expanded4, setExpanded4] = useState(true);
  const [expanded5, setExpanded5] = useState(true);
  const [expanded6, setExpanded6] = useState(true);
  const [invoiceValue, setInvoiceValue] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [invoiceCheck, setInvoiceCheck] = useState(null);
  const [countries, setCountries] = useState([]);
  const [hsItem, setHsItem] = useState({});
  const [goods, setGoods] = useState([]);
  const [serial_no, setSerial_no] = useState(0);
  const [note, setNote] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [cooTypeCode, setCooTypeCode] = useState("");
  const [cooAttachment, setCooAttachment] = useState([]);
  const [selectMenuData, setSelectMenuData] = useState({});
  const [calculateFeesData, setCalculateFeesData] = useState({});
  const [selectedInvoiceDate, setSelectedInvoiceDate] = useState(null);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [requiredAttachments, setRequiredAttchments] = useState([]);
  const [filePagesCount, setFilePagesCount] = useState(null);
  const { type } = useParams();
  const handleInvoiceDateChange = (date) => {
    setSelectedInvoiceDate(date);
  };
  const handleDepartureDateChange = (date) => {
    setSelectedDepartureDate(date);
  };
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");

  const initialValues = {
    cooType: loggedType == "1" ? (type == "form-A" ? 2 : "") : 3,
    userCode: loggedType == "1" ? "" : profile ? profile?.code : "",
    clientName: "",
    membershipCode:
      loggedType == "2" ? "" : profile ? profile?.company_code : "",
    companyName: "",
    invoiceDate: null,
    invoiceNumber: "",
    invoiceValue: "",
    currency: "",
    certificateFees: "",
    countryOfConsignee: "",
    countryOfOrigin: [],
    departureDate: "",
    portDischarge: "",
    transportation: "",
    dest1: "",
    dest2: "",
    dest3: "",
    dest4: "",
    attachment: "",
    numOfCopies: "",
    numOfCopiesFees: "",
    numOfSeals: "",
    numOfSealsFees: "",
    notes: "",
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    line5: "",
    line6: "",
    line7: "",
    line8: "",
    line9: t("SERVICESPAGES.AMEND.HOLDER"),
    uom: {},
    coo_details: {},
  };
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  const invoiceRegex = /^[a-zA-Z0-9]*$/;
  const validationSchema = Yup.object({
    cooType: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    invoiceNumber: Yup.string().required(isRTL ? "مطلوب" : "Required"),

    invoiceDate: Yup.date()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    invoiceValue: Yup.string()
      .matches(
        regex,
        isRTL ? "يجب أن يكون رقم موجب" : "Must be a positive number"
      )
      .required(isRTL ? "مطلوب" : "Required"),

    currency: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    countryOfConsignee: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    countryOfOrigin: Yup.array()
      .min(1, isRTL ? "مطلوب" : "Required")
      .nullable(),
    transportation: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    dest1: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    dest2: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    numOfSeals: Yup.string()
      .matches(
        regex,
        isRTL ? "يجب أن يكون رقم موجب" : "Must be a positive number"
      )
      .test(
        "max",
        isRTL
          ? `يجب أن لا يكون أكبر من ${filePagesCount}`
          : `Shouldnot be More than ${filePagesCount}`,
        (val) =>
          !filePagesCount || (val && filePagesCount && val < filePagesCount + 1)
      ),
    numOfCopies: Yup.string().matches(
      regex,
      isRTL ? "يجب أن يكون رقم موجب" : "Must be a positive number"
    ),
  });
  const doSubmit = async (values, { resetForm }) => {
    let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
    if (profile) {
      setCooTypeCode(values.cooType);
      setSendValues({
        coo: [
          {
            chamber_fees: calculateFeesData.chamber_fees,
            // values.numOfCopies * 50 +
            // values.numOfSeals * 5,
            company_code: loggedType == "1" ? values.membershipCode : 0,
            person_code: loggedType == "2" ? values.userCode : 0,
            consignee_country_code: values.countryOfConsignee,
            coo_type: values.cooType,
            currency_code: values.currency,
            destination1: values.dest1,
            destination2: values.dest2,
            destination3: values.dest3,
            destination4: values.dest4,
            estimated_date_of_departure:
              selectedDepartureDate &&
              moment(selectedDepartureDate).format("YYYY-MM-DD"),
            follow_up_remark: note,
            // host: "",
            inserted_by: profile?.username,
            invoice_issue_date: moment(values.invoiceDate).format("YYYY-MM-DD"),
            // selectedInvoiceDate &&
            // moment(selectedInvoiceDate).format("YYYY-MM-DD"),
            invoice_no: values.invoiceNumber,
            invoice_value: values.invoiceValue,
            invoice_value_aed: calculateFeesData.currency_aed,
            // ip: "",
            line1: values.line1,
            line2: values.line2,
            line3: values.line3,
            line4: values.line4,
            line5: values.line5,
            line6: values.line6,
            line7: values.line7,
            line8: values.line8,
            line9: values.line9,
            port_of_discharge: values.portDischarge,
            transportation_code: values.transportation,
          },
        ],
        coo_additional_request: [
          { copyNum: values.numOfCopies, sealNum: values.numOfSeals },
        ],
        coo_details: goods,
        coo_origins: countries,
      });
      let data = new FormData();
      cooAttachment?.map((i, index) => {
        data.append(`files,${index}`, i.file);
        data.append(`classification_code,${index}`, i.classification_code);
      });
      dispatch(
        uploadRakFile({
          body: {
            code: profile?.company_code ? profile?.company_code : profile?.code,
            data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        })
      );
      // dispatch(saveNewCooData({ data: readyValues }));
      resetForm({});
    } else {
      setOpen(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    }
  };
  const getCalculatedInvoiceFees = (invoiceValue, currency) => {
    invoiceValue &&
      currency &&
      dispatch(calculateFees({ data: { invoiceValue, currency } }));
  };

  const handleFileChange = (e, attachment) => {
    if (!e.length) {
      setCooAttachment(
        cooAttachment?.filter((i) => i.classification_code != attachment.key)
      );
      return;
    }
    let arr = [];
    arr = cooAttachment?.filter((i) => i.classification_code != attachment.key);
    e?.length &&
      e.map((i, index) => {
        let attachs = [
          {
            file_size: i.size,
            classification_code: attachment.key,
            name: i.name,
            file: i,
          },
        ];
        arr.push(...attachs);
      });
    setCooAttachment(arr);
  };

  const handleAttachments = (code) => {
    setRequiredAttchments(
      code == 1
        ? [
            {
              title: isRTL ? "الفاتورة" : "Invoice",
              key: 20,
              isRequired: true,
              helperText: isRTL
                ? "نوع الملف : PDF والحجم الأقصى 30MB"
                : "File Type : PDF & Maximum Size : 30MB",
            },
            {
              title: isRTL
                ? "مستندات إضافية مراد الختم عليها"
                : "Additional documents to be stamped",
              key: 15,
              isRequired: true,
              helperText: isRTL
                ? "يجب أن تكون جميع صفحات المستند بحجم A4 بالطول، نوع الملف : PDF والحجم الأقصى 10MB"
                : "All Pages should be A4 and Portrait, File Type : PDF & Maximum Size : 10MB",
              maxSize: 10000000,
              countPages: true,
            },
            {
              title: isRTL ? "ملفات داعمه" : "Support documents",
              key: 16,
              isRequired: false,
              helperText: isRTL
                ? "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB "
                : "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB",
            },
          ]
        : code == 2
        ? [
            {
              title: isRTL ? "نموذج Form A" : "Form A Specimen",
              key: 17,
              isRequired: true,
              helperText: isRTL
                ? "نوع الملف : PDF والحجم الأقصى 30MB"
                : "File Type : PDF & Maximum Size : 30MB",
            },
            {
              title: isRTL ? "الفاتورة" : "Invoice",
              key: 20,
              isRequired: true,
              helperText: isRTL
                ? "نوع الملف : PDF والحجم الأقصى 30MB"
                : "File Type : PDF & Maximum Size : 30MB",
            },
            {
              title: isRTL
                ? "مستندات إضافية مراد الختم عليها"
                : "Additional documents to be stamped",
              key: 15,
              isRequired: true,
              helperText: isRTL
                ? "يجب أن تكون جميع صفحات المستند بحجم A4 بالطول، نوع الملف : PDF والحجم الأقصى 10MB"
                : "All Pages should be A4 and Portrait, File Type : PDF & Maximum Size : 10MB",
              maxSize: 10000000,
              countPages: true,
            },
            {
              title: isRTL ? "ملفات داعمه" : "Support documents",
              key: 16,
              isRequired: false,
              helperText: isRTL
                ? "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB "
                : "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB",
            },
          ]
        : null
    );
  };
  useEffect(() => {
    if (APIServices.uploadRakFileDone?.length) {
      setCooAttachment(
        APIServices?.uploadRakFileDone?.map((i) => {
          loggedType == "1"
            ? (i["company_code"] = profile ? profile?.company_code : "")
            : (i["person_code"] = profile ? profile?.code : "");
          i["inserted_by"] = profile ? profile?.username : "";
          i["request_type_code"] = 50;
          i["file_size"] = i?.file_size;
          return i;
        })
      );
      dispatch(saveNewCooData({ data: { ...sendValues } }));
    }
  }, [APIServices.uploadRakFileDone]);

  useEffect(() => {
    let isRequiredFiles = requiredAttachments?.filter((e) => e.isRequired);
    let action = isRequiredFiles?.map((item) =>
      cooAttachment?.some((i) => item.key == i.classification_code)
    );
    setAllFilesUploaded(action?.every((i) => i == true));
  }, [cooAttachment]);

  useEffect(() => {
    if (profile != null) dispatch(fetchSelectMenuData());

    dispatch(
      sendMostUsedService({
        data:
          type == "companies"
            ? 54
            : type == "form-A"
            ? 55
            : type == "personal"
            ? 56
            : 54,
      })
    );
    loggedType == "2"
      ? setRequiredAttchments([
          {
            title: isRTL
              ? "نموذج تعبئة أغراض شخصية"
              : "Personal Effects Specimen",
            key: 18,
            isRequired: true,
            helperText: isRTL
              ? "نوع الملف : PDF والحجم الأقصى 30MB"
              : "File Type : PDF & Maximum Size : 30MB",
          },
          {
            title: isRTL ? "الفاتورة" : "Invoice",
            key: 20,
            isRequired: true,
            helperText: isRTL
              ? "نوع الملف : PDF والحجم الأقصى 30MB"
              : "File Type : PDF & Maximum Size : 30MB",
          },
          {
            title: isRTL
              ? "مستندات إضافية مراد الختم عليها"
              : "Additional documents to be stamped",
            key: 15,
            isRequired: true,
            helperText: isRTL
              ? "يجب أن تكون جميع صفحات المستند بحجم A4 بالطول، نوع الملف : PDF والحجم الأقصى 10MB"
              : "All Pages should be A4 and Portrait, File Type : PDF & Maximum Size : 10MB",
            maxSize: 10000000,
            countPages: true,
          },
          {
            title: isRTL ? "ملفات داعمه" : "Support documents",
            key: 16,
            isRequired: false,
            helperText: isRTL
              ? "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB "
              : "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB",
          },
        ])
      : setRequiredAttchments([]);
  }, []);

  useLayoutEffect(() => {
    return () => (
      dispatch(calculateFeesDone({ data: {} })),
      dispatch(uploadRakFileDone({ data: {} }))
    );
  }, []);

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear) {
      setOpen(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    } else if (profile && profile?.blocked === 1)
      store.dispatch(push("/services/rak-chamber/dashboard"));
    else if (profile == null) store.dispatch(push("/login"));
    if (
      loggedType == "1" &&
      memberType != "active" &&
      memberType != "activeExpired"
    )
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    setSelectMenuData({ ...APIServices.selectMenuDataDone });
  }, [APIServices.selectMenuDataDone]);

  useEffect(() => {
    setCalculateFeesData({ ...APIServices.calculateFeesDone });
  }, [APIServices.calculateFeesDone]);

  useEffect(() => {
    const result = APIServices.sendNewCOOFormDone;
    if (result.coo_code) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.coo_code;
        attch["request_type"] = cooTypeCode;
        return attch;
      });
      dispatch(
        sendCooAttachments({
          data: { coo_attachment: cooAttachment },
          reqType: 50,
        })
      );
    }
  }, [APIServices.sendNewCOOFormDone]);

  useEffect(() => {
    if (
      APIServices?.sendNotificationDone?.success &&
      APIServices?.sendNotificationDone?.sent_to
    )
      dispatch(
        sendEmail({
          data: {
            to: APIServices?.sendNotificationDone?.sent_to,
            subject: APIServices?.sendNotificationDone?.subject,
            body: APIServices?.sendNotificationDone?.email_body,
          },
        })
      );
    if (APIServices?.sendNotificationDone?.success === false)
      setTimeout(() => {
        store.dispatch(push("/services-form/requests-list"));
      }, 7000);
  }, [APIServices?.sendNotificationDone]);

  useEffect(() => {
    if (APIServices?.sendEmailDone && APIServices?.sendEmailDone?.success)
      setTimeout(() => {
        store.dispatch(push("/services-form/requests-list"));
      }, 7000);
    if (APIServices?.sendEmailDone?.success === false)
      setTimeout(() => {
        store.dispatch(push("/services-form/requests-list"));
      }, 7000);
  }, [APIServices?.sendEmailDone]);

  useEffect(() => {
    const result = APIServices.sendNewCOOFormDone;
    if (result.coo_code && APIServices.cooAttachments.affected_row) {
      setOpen(true);
      setMessage(
        isRTL
          ? ` رقم طلبك هو ${result.coo_code}`
          : `Your Application Number is ${result.coo_code} .`
      );
      dispatch(
        sendNotification({
          data: {
            request_code: result.coo_code,
            company_code: loggedType == "1" ? profile?.company_code : 0,
            person_code: loggedType == "2" ? profile?.code : 0,
            user_name: profile?.username,
            service_action: "1",
          },
        })
      );
    } else {
      if (result.items == []) {
        setOpen(true);
        setMessage(isRTL ? `خطأ في السيرفر` : `Internal Server Error.`);
      }
    }
    if (Object.keys(APIServices.sendNewCOOFormDone).length)
      dispatch(saveNewCooDataDone({ data: {} }));
  }, [APIServices.cooAttachments]);

  useEffect(() => {
    invoiceValue &&
      currency &&
      dispatch(calculateFees({ data: { invoiceValue, currency } }));
  }, [invoiceValue, currency]);

  useEffect(() => {
    const result = APIServices.invoiceNoChecked;
    if (result) setInvoiceCheck(result);
  }, [APIServices.invoiceNoChecked]);

  const changeHandler = (event) => {
    dispatch(
      checkInvoiceNo({
        data: {
          invoice_no: event.target.value,
          company_code:
            loggedType == "1" ? profile?.company_code : profile?.code,
        },
      })
    );
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 2000), []);

  return (
    <Grid container className={classes.supplierRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.ORIGIN.TITLE")}
      </Typography>
      <ServiceStep getStatus={0} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize
        validateOnChange={true}
      >
        {function MyForm({
          isValid,
          dirty,
          values,
          submitForm,
          setFieldValue,
          resetForm,
          errors,
          touched,
          validateField,
        }) {
          useEffect(() => {
            validateField("numOfSeals");
          }, [filePagesCount]);
          return (
            <Form className={classes.fullForm} variant="standard">
              <Accordion
                expanded={expanded1}
                onChange={() => setExpanded1(!expanded1)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded1 ? <Remove /> : <Add />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <AiFillInfoCircle className={classes.address} />
                  <Typography> {t("SERVICESPAGES.ORIGIN.GENERAL")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="cooType"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.CERTYPE")}
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
                        id="cooType"
                        name="cooType"
                        variant="outlined"
                        disabled={loggedType == "2" || type == "form-A"}
                        onChange={(e) => {
                          setFieldValue("cooType", e.target.value);
                          handleAttachments(e.target.value);
                        }}
                      >
                        {loggedType == "1"
                          ? type == "form-A"
                            ? selectMenuData.coo_type?.map((type, idx) => {
                                return (
                                  <MenuItem
                                    key={idx}
                                    value={type.code}
                                    name="cooType"
                                    style={{
                                      direction: isRTL ? "rtl" : "ltr",
                                    }}
                                    className={classes.menuItem}
                                  >
                                    {isRTL ? type.name : type.name_e}
                                  </MenuItem>
                                );
                              })
                            : selectMenuData.coo_type
                                ?.filter((item) => item.code != 3)
                                .map((type, idx) => {
                                  return (
                                    <MenuItem
                                      key={idx}
                                      name="cooType"
                                      value={type.code}
                                      style={{
                                        direction: isRTL ? "rtl" : "ltr",
                                      }}
                                      className={classes.menuItem}
                                    >
                                      {isRTL ? type.name : type.name_e}
                                    </MenuItem>
                                  );
                                })
                          : selectMenuData.coo_type?.map((type, idx) => {
                              return (
                                <MenuItem
                                  key={idx}
                                  name="cooType"
                                  value={type.code}
                                  style={{
                                    direction: isRTL ? "rtl" : "ltr",
                                  }}
                                  className={classes.menuItem}
                                >
                                  {isRTL ? type.name : type.name_e}
                                </MenuItem>
                              );
                            })}
                      </Field>
                      {errors.cooType && touched.cooType ? (
                        <div className={classes.inputfeedback}>
                          {errors.cooType}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="membershipCode"
                        className={classes.label}
                      >
                        {loggedType == "1"
                          ? t("SERVICESPAGES.ORIGIN.MEMBERSHIP")
                          : t("SERVICESPAGES.ORIGIN.USERCODE")}
                      </InputLabel>

                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        id="membershipCode"
                        name={loggedType == "1" ? "membershipCode" : "userCode"}
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="companyName"
                        className={classes.label}
                      >
                        {loggedType == "1"
                          ? t("SERVICESPAGES.FORMS.FORM.COMPANY")
                          : t("SERVICESPAGES.ORIGIN.CLIENTNAME")}
                      </InputLabel>

                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        id="companyName"
                        name={loggedType == "1" ? "companyName" : "clientName"}
                        value={
                          profile
                            ? isRTL
                              ? profile?.name
                              : profile?.name_e
                            : ""
                        }
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item md={6} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="invoiceDate"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.INVDATE")}
                      </InputLabel>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Field
                          component={DatePicker}
                          className={classes.textFieldDate2}
                          variant="outlined"
                          name="invoiceDate"
                          showTodayButton="true"
                          id="invoiceDate"
                          views={["year", "date", "month"]}
                          format="dd-MM-yyyy"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="start">
                                <MdDateRange className={classes.dateIcon} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {/* <KeyboardDatePicker
                        className={classes.textFieldDate2}
                        name="invoiceDate"
                        id="date-picker-dialog"
                        format="dd-MM-yyyy"
                        value={selectedInvoiceDate}
                        onChange={(e) => (
                          handleInvoiceDateChange(e),
                          setFieldValue("invoiceDate", e)
                        )}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      /> */}
                      </MuiPickersUtilsProvider>
                    </Grid>

                    <Grid item md={6} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="invoiceNumber"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.INVNUM")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={clsx(
                          invoiceCheck?.error_code &&
                            invoiceCheck?.error_code != 0 &&
                            classes.textFieldError,
                          classes.textField
                        )}
                        id="invoiceNumber"
                        name="invoiceNumber"
                        variant="outlined"
                        value={values.invoiceNumber}
                        onChange={(event) => {
                          setFieldValue("invoiceNumber", event.target.value);
                          event.target.value != null &&
                            debouncedChangeHandler(event);
                        }}
                        inputProps={{
                          autoComplete: "off",
                        }}
                      />
                      {invoiceCheck
                        ? invoiceCheck?.error_code
                          ? invoiceCheck?.error_code != 0 && (
                              <Typography
                                style={{
                                  marginTop: 8,
                                  fontSize: 12,
                                  color: "red",
                                }}
                              >
                                {isRTL
                                  ? invoiceCheck?.error_message
                                  : invoiceCheck?.error_message_e}
                              </Typography>
                            )
                          : ""
                        : ""}
                    </Grid>

                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="invoiceValue"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.INVVALUE")}
                      </InputLabel>
                      <Field
                        component={TextField}
                        type="number"
                        min="1"
                        className={classes.textField}
                        id="invoiceValue"
                        name="invoiceValue"
                        variant="outlined"
                        value={values.invoiceValue}
                        onChange={(val) => {
                          if (val.target.value < 0) val.target.value = 0;
                          setFieldValue("invoiceValue", val.target.value);
                          setInvoiceValue(val.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="currency"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.CURRENCY")}
                      </InputLabel>
                      <Autocomplete
                        className={classes.textField}
                        name="currency"
                        id="contact-autocomplete"
                        options={
                          selectMenuData?.currency
                            ? selectMenuData.currency
                            : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option?.name : option?.name_e
                        }
                        includeInputInList
                        onChange={(e, value) => (
                          setFieldValue("currency", value?.code || ""),
                          setCurrency(value?.code)
                        )}
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            fullWidth
                            name="currency"
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
                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="certificateFees"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.CERFEES")}
                      </InputLabel>
                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        value={calculateFeesData.chamber_fees}
                        id="certificateFees"
                        name="certificateFees"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded2}
                onChange={() => setExpanded2(!expanded2)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded2 ? <Remove /> : <Add />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <RiUserLocationFill className={classes.address} />
                  <Typography>{t("SERVICESPAGES.ORIGIN.COUNTRY")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="countryOfConsignee"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.ORIGIN.CONSIGNEE")}{" "}
                      </InputLabel>
                      <Autocomplete
                        className={classes.textField}
                        name="countryOfConsignee"
                        id="contact-autocomplete"
                        options={
                          selectMenuData?.country ? selectMenuData.country : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option?.code_name : option?.code_name_e
                        }
                        includeInputInList
                        onChange={(e, value) =>
                          setFieldValue("countryOfConsignee", value?.code || "")
                        }
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            fullWidth
                            name="countryOfConsignee"
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
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="countryOfOrigin"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.ORIGIN")}{" "}
                        {countries?.length == 0 && (
                          <span
                            style={{
                              color: "red",
                              fontWeight: "normal",
                              fontSize: "smaller",
                            }}
                          >
                            *{" "}
                            {isRTL
                              ? "يرجى اختيار بلد المنشأ من القائمة أدناه"
                              : "Please select the Country of origin from the list below"}{" "}
                          </span>
                        )}
                      </InputLabel>
                      <Autocomplete
                        multiple
                        className={classes.textField}
                        id="contact-autocomplete"
                        name="countryOfOrigin"
                        options={
                          selectMenuData?.country ? selectMenuData.country : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option?.code_name : option?.code_name_e
                        }
                        limitTags={2}
                        filterSelectedOptions={true}
                        // getOptionSelected={(option) => option}
                        onChange={(e, value) => {
                          setCountries(
                            Array.isArray(value)
                              ? value.map((x) => {
                                  return { country_code: x.code };
                                })
                              : []
                          );
                          setFieldValue(
                            "countryOfOrigin",
                            Array.isArray(value)
                              ? value.map((x) => {
                                  return { country_code: x.code };
                                })
                              : []
                          );
                        }}
                        getOptionDisabled={() => countries?.length == 15}
                        includeInputInList
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            name="countryOfOrigin"
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
                      {countries && (
                        <Typography
                          style={{ marginTop: 8, fontSize: 14, color: "#444" }}
                        >
                          {t("SERVICESPAGES.ORIGIN.COUNTRYNUM")} :
                          {countries?.length}
                          <br />
                          {countries?.length == 15 && (
                            <Typography
                              style={{
                                marginTop: 8,
                                fontSize: 12,
                                color: "red",
                              }}
                            >
                              {t("SERVICESPAGES.ORIGIN.MAX")}{" "}
                            </Typography>
                          )}
                        </Typography>
                      )}
                    </Grid>

                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="departureDate"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.DEPARTURE")}
                      </InputLabel>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          className={classes.textFieldDate2}
                          name="departureDate"
                          id="date-picker-dialog"
                          format="dd-MM-yyyy"
                          value={selectedDepartureDate}
                          onChange={handleDepartureDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="portDischarge"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.PORT")}
                      </InputLabel>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="portDischarge"
                        name="portDischarge"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="transportation"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.AMEND.TRANSPORT")}
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
                        id="transportation"
                        name="transportation"
                        variant="outlined"
                      >
                        {selectMenuData.transportation?.map((type, idx) => {
                          return (
                            <MenuItem
                              key={idx}
                              value={type.code}
                              style={{
                                direction: isRTL ? "rtl" : "ltr",
                              }}
                              className={classes.menuItem}
                            >
                              {isRTL ? type.name : type.name_e}
                            </MenuItem>
                          );
                        })}
                      </Field>
                      {errors.transportation && touched.transportation ? (
                        <div className={classes.inputfeedback}>
                          {errors.transportation}
                        </div>
                      ) : null}
                    </Grid>
                    <Grid container xs={12}>
                      <Typography className={classes.heading}>
                        {t("SERVICESPAGES.ORIGIN.DESTINATION")}
                      </Typography>
                    </Grid>
                    <Grid container className={classes.inpuContainer} xs={12}>
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="dest1"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.AMEND.NAME")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest1"
                          name="dest1"
                          variant="outlined"
                          inputProps={{
                            maxLength: 95,
                          }}
                        />
                        {values.dest1?.length == 95 ? (
                          <div className={classes.inputfeedback}>
                            {isRTL
                              ? "الاسم يحتمل 95 حرف فقط !"
                              : "Name can hold up to 95 characters."}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.inpuContainer} xs={12}>
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="dest2"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.AMEND.ADRESS")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest2"
                          name="dest2"
                          variant="outlined"
                          inputProps={{
                            maxLength: 95,
                          }}
                        />
                        {values.dest2?.length == 95 ? (
                          <div className={classes.inputfeedback}>
                            {isRTL
                              ? "العنوان يحتمل 95 حرف فقط !"
                              : "Address can hold up to 95 characters."}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.inpuContainer} xs={12}>
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="dest3" className={classes.label}>
                          {t("SERVICESPAGES.AMEND.ADRESSPHONE")}
                        </InputLabel>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest3"
                          name="dest3"
                          variant="outlined"
                          inputProps={{
                            maxLength: 95,
                          }}
                        />
                        {values.dest3?.length == 95 ? (
                          <div className={classes.inputfeedback}>
                            {isRTL
                              ? "العنوان أو رقم الهاتف يحتمل 95 حرف فقط !"
                              : "Address or Moblile Number can hold up to 95 characters."}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                    <Grid container className={classes.inpuContainer} xs={12}>
                      <Grid item xs={12} md={3}>
                        <InputLabel htmlFor="dest4" className={classes.label}>
                          {t("SERVICESPAGES.ORIGIN.DESTINATION")} 4
                        </InputLabel>
                      </Grid>
                      <Grid xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest4"
                          name="dest4"
                          variant="outlined"
                          inputProps={{
                            maxLength: 95,
                          }}
                        />
                        {values.dest4?.length == 95 ? (
                          <div className={classes.inputfeedback}>
                            {isRTL
                              ? "عنوان الوجهة 4 يحتمل 95 حرف فقط !"
                              : "Destination Address 4 can hold up to 95 characters."}
                          </div>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded3}
                onChange={() => setExpanded3(!expanded3)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded3 ? <Remove /> : <Add />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <FaBoxes className={classes.address} />
                  <Typography>
                    {t("SERVICESPAGES.AMEND.GOODDETAILS")}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item md={6} xs={12}>
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.GOODS")}{" "}
                        <span
                          style={{
                            color: "red",
                            fontWeight: "normal",
                            fontSize: "smaller",
                          }}
                        >
                          *{" "}
                          {isRTL
                            ? "اختر البضاعة من القائمة(بدون نسخ و لصق)"
                            : "Please select goods below(Do not paste)"}{" "}
                        </span>
                      </InputLabel>
                      <Autocomplete
                        onInputChange={(e) => setinputValue(e?.target.value)}
                        onBlur={() => setinputValue("")}
                        open={inputValue?.length > 1}
                        className={classes.textField}
                        id="combo-box-demo"
                        options={
                          selectMenuData?.hsItems ? selectMenuData.hsItems : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option?.code_name : option?.code_name_e
                        }
                        name="coo_details"
                        value={hsItem}
                        onChange={(e, value) => setHsItem(value)}
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            variant="outlined"
                            name="coo_details"
                          />
                        )}
                        onPaste={(e) => {
                          e.preventDefault();
                          return false;
                        }}
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
                      />{" "}
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.WEIGHT")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        variant="outlined"
                        name="weight"
                        type="number"
                        min="1"
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      {" "}
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.UNIT")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Autocomplete
                        className={classes.textField}
                        name="uom"
                        id="contact-autocomplete"
                        options={selectMenuData?.uom ? selectMenuData.uom : []}
                        getOptionLabel={(option) =>
                          isRTL ? option?.name : option?.name_e
                        }
                        value={values.uom}
                        includeInputInList
                        onChange={(e, value) =>
                          setFieldValue("uom", value || "")
                        }
                        renderInput={(params) => (
                          <Field
                            {...params}
                            component={TextField}
                            name="uom"
                            fullWidth
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
                      {" "}
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.QUANTITY")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        variant="outlined"
                        name="qty"
                        type="number"
                        min="1"
                        onBlur={() =>
                          setFieldValue(
                            `unit_price`,
                            values.total_price / values.qty
                          )
                        }
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      {" "}
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.PRICE")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        variant="outlined"
                        name="total_price"
                        type="number"
                        min="1"
                        onBlur={() =>
                          setFieldValue(
                            `unit_price`,
                            values.total_price / values.qty
                          )
                        }
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      {" "}
                      <InputLabel className={classes.label}>
                        {t("SERVICESPAGES.AMEND.UNITPRICE")}
                      </InputLabel>
                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        name="unit_price"
                        variant="outlined"
                        value={
                          values.qty &&
                          values.total_price &&
                          values.total_price / values.qty
                        }
                      />
                    </Grid>

                    <Grid container xs={12}>
                      <Grid
                        container
                        item
                        xs={12}
                        style={{ alignItems: "center" }}
                      >
                        <Button
                          disabled={
                            !hsItem ||
                            !values.weight ||
                            !values.uom ||
                            !values.qty ||
                            !values.total_price
                          }
                          variant="contained"
                          className={classes.send}
                          endIcon={<AddIcon />}
                          disableElevation
                          style={{ marginBottom: 16 }}
                          onClick={() => {
                            let newGoods = [...goods];
                            newGoods.push({
                              hs_code: hsItem?.hs_code,
                              hs_level2_name: hsItem?.name,
                              hs_level2_name_e: hsItem?.name_e,
                              item_code: hsItem?.item_code,
                              weight: values.weight,
                              uom: values.uom.code,
                              uom_name: values.uom.name,
                              uom_name_e: values.uom.name_e,
                              qty: values.qty,
                              total_price: values.total_price,
                              unit_price: values.unit_price,
                              serial_no: serial_no,
                            });
                            setGoods(newGoods);
                            setSerial_no(serial_no + 1);

                            setFieldValue("weight", "");
                            setFieldValue("uom", {});
                            setFieldValue("qty", "");
                            setFieldValue("total_price", "");
                            setFieldValue("unit_price", "");
                            setFieldValue("coo_details", {});
                            setHsItem(null);
                          }}
                        >
                          {t("SERVICESPAGES.NEWMEMBERSHIP.ADD")}
                        </Button>
                        <span
                          style={{
                            color: "red",
                            fontWeight: "normal",
                            fontSize: "smaller",
                            margin: "0 16px",
                          }}
                        >
                          {isRTL
                            ? "يرجى الضغط على زر أضف بعد تعبئة تفاصيل البضاعة"
                            : "Please click on add button after filling the goods details"}{" "}
                        </span>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.heading}>
                        {t("SERVICESPAGES.AMEND.GOODSLIST")}
                      </Typography>
                      <Box>
                        {goods?.length > 0 &&
                          goods?.map((good, index) => (
                            <Box className={classes.infoBox}>
                              <Grid container>
                                <Fab
                                  color="primary"
                                  aria-label="remove"
                                  size="small"
                                  onClick={() =>
                                    setGoods(
                                      goods?.filter((i, iIndex) => {
                                        return iIndex !== index;
                                      })
                                    )
                                  }
                                >
                                  <RemoveIcon />
                                </Fab>
                                <Grid container spacing={1} xs={12}>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.HS")}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>
                                    <Autocomplete
                                      className={classes.textField}
                                      value={good}
                                      id="code-autocomplete"
                                      options={
                                        selectMenuData?.hsItems
                                          ? selectMenuData.hsItems
                                          : []
                                      }
                                      getOptionLabel={(option) =>
                                        String(option?.hs_code)
                                      }
                                      onChange={(e, value) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? ((item.hs_level2_name_e =
                                                value?.name_e),
                                              (item.hs_code = value?.hs_code),
                                              (item.hs_level2_name =
                                                value?.name),
                                              (item.item_code =
                                                value?.item_code))
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                      key={good.hs_code}
                                      renderInput={(params) => (
                                        <TextField2
                                          {...params}
                                          variant="outlined"
                                          fullWidth
                                        />
                                      )}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      PaperComponent={({ children }) => (
                                        <Paper
                                          style={{
                                            textTransform: "capitalize",
                                            direction: isRTL ? "rtl" : "ltr",
                                            fontFamily: isRTL
                                              ? "Noto"
                                              : "OpenSansRegular",
                                          }}
                                          className={classes.menuItem}
                                        >
                                          {children}
                                        </Paper>
                                      )}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.GOODS")}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>
                                    <Autocomplete
                                      className={classes.textField}
                                      value={good}
                                      id="good-autocomplete"
                                      options={
                                        selectMenuData?.hsItems
                                          ? selectMenuData.hsItems
                                          : []
                                      }
                                      getOptionLabel={(option) =>
                                        option?.hs_level2_name_e
                                          ? isRTL
                                            ? option?.hs_level2_name
                                            : option?.hs_level2_name_e
                                          : isRTL
                                          ? option?.name
                                          : option?.name_e
                                      }
                                      key={good.hs_level2_name}
                                      onPaste={(e) => {
                                        e.preventDefault();
                                        return false;
                                      }}
                                      onChange={(e, value) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? ((item.hs_level2_name_e =
                                                value?.name_e),
                                              (item.hs_code = value?.hs_code),
                                              (item.hs_level2_name =
                                                value?.name),
                                              (item.item_code =
                                                value?.item_code))
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                      renderInput={(params) => (
                                        <TextField2
                                          {...params}
                                          variant="outlined"
                                          fullWidth
                                        />
                                      )}
                                      PaperComponent={({ children }) => (
                                        <Paper
                                          style={{
                                            textTransform: "capitalize",
                                            direction: isRTL ? "rtl" : "ltr",
                                            fontFamily: isRTL
                                              ? "Noto"
                                              : "OpenSansRegular",
                                          }}
                                          className={classes.menuItem}
                                        >
                                          {children}
                                        </Paper>
                                      )}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.WEIGHT")}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>

                                    <TextField2
                                      className={classes.textField}
                                      variant="outlined"
                                      id={`weight`}
                                      type="number"
                                      min="1"
                                      value={good.weight}
                                      onChange={(e) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? (item.weight = e.target.value)
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={6}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.UNIT")}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>
                                    <Autocomplete
                                      className={classes.textField}
                                      value={good}
                                      id="code-autocomplete"
                                      options={
                                        selectMenuData?.uom
                                          ? selectMenuData.uom
                                          : []
                                      }
                                      getOptionLabel={(option) =>
                                        option?.name
                                          ? isRTL
                                            ? option?.name
                                            : option?.name_e
                                          : isRTL
                                          ? option?.uom_name
                                          : option?.uom_name_e
                                      }
                                      onChange={(e, value) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? ((item.uom = value?.code),
                                              (item.uom_name_e = value?.name_e),
                                              (item.uom_name = value?.name))
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                      key={good.uom}
                                      renderInput={(params) => (
                                        <TextField2
                                          {...params}
                                          variant="outlined"
                                          fullWidth
                                        />
                                      )}
                                      PaperComponent={({ children }) => (
                                        <Paper
                                          style={{
                                            textTransform: "capitalize",
                                            direction: isRTL ? "rtl" : "ltr",
                                            fontFamily: isRTL
                                              ? "Noto"
                                              : "OpenSansRegular",
                                          }}
                                          className={classes.menuItem}
                                        >
                                          {children}
                                        </Paper>
                                      )}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={4}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.QUANTITY")}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>

                                    <TextField2
                                      className={classes.textField}
                                      variant="outlined"
                                      id={`qty`}
                                      value={good.qty}
                                      type="number"
                                      min="1"
                                      onChange={(e) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? ((item.qty = e.target.value),
                                              (item.unit_price =
                                                good.total_price /
                                                e.target.value))
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={4}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.PRICE")}{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </InputLabel>

                                    <TextField2
                                      className={classes.textField}
                                      variant="outlined"
                                      value={good.total_price}
                                      id={`total_price`}
                                      type="number"
                                      min="1"
                                      onChange={(e) => {
                                        let newDetails = [...goods];
                                        newDetails?.map((item, i) =>
                                          i == index
                                            ? ((item.total_price =
                                                e.target.value),
                                              (item.unit_price =
                                                e.target.value / item.qty))
                                            : item
                                        );
                                        setGoods(newDetails);
                                      }}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    md={4}
                                    xs={12}
                                    className={classes.inpuContainer}
                                  >
                                    <InputLabel className={classes.label}>
                                      {t("SERVICESPAGES.AMEND.UNITPRICE")}
                                    </InputLabel>

                                    <TextField2
                                      disabled
                                      className={classes.textField}
                                      id={`unit_price`}
                                      value={good.unit_price}
                                      variant="outlined"
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Box>
                          ))}
                      </Box>
                      <Grid container spacing={1} item xs={12}>
                        <Grid item xs={12}>
                          <Box className={classes.divider2}></Box>
                          <Typography
                            className={classes.subHeading}
                            variant="subtitle1"
                          >
                            {t("SERVICESPAGES.AMEND.ADVANCE")}
                          </Typography>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line1"
                            name="line1"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.ONE")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />
                          {values.line1?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 1 يحتمل 200 حرف فقط !"
                                : "Line 1 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line2"
                            name="line2"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.TWO")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line2?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 2 يحتمل 200 حرف فقط !"
                                : "Line 2 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line3"
                            name="line3"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.THREE")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line3?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 3 يحتمل 200 حرف فقط !"
                                : "Line 3 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line4"
                            name="line4"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.FOUR")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line4?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 4 يحتمل 200 حرف فقط !"
                                : "Line 4 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line5"
                            name="line5"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.FIVE")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line5?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 5 يحتمل 200 حرف فقط !"
                                : "Line 5 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line6"
                            name="line6"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.SIX")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line6?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 6 يحتمل 200 حرف فقط !"
                                : "Line 6 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line7"
                            name="line7"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.SEVEN")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line7?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 7 يحتمل 200 حرف فقط !"
                                : "Line 7 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line8"
                            name="line8"
                            variant="outlined"
                            placeholder={t("SERVICESPAGES.AMEND.EIGHT")}
                            inputProps={{
                              maxLength: 200,
                            }}
                          />

                          {values.line8?.length == 200 ? (
                            <div className={classes.inputfeedback}>
                              {isRTL
                                ? "سطر 8 يحتمل 200 حرف فقط !"
                                : "Line 8 can hold up to 200 characters."}
                            </div>
                          ) : null}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Field
                            component={TextField}
                            className={classes.textField}
                            id="line9"
                            name="line9"
                            variant="outlined"
                            disabled
                            value={t("SERVICESPAGES.AMEND.HOLDER")}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded4}
                onChange={() => setExpanded4(!expanded4)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded4 ? <Remove /> : <Add />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <RiAttachmentLine className={classes.address} />
                  <Typography>
                    {" "}
                    {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid container xs={12}>
                      {requiredAttachments?.length > 0 ? (
                        requiredAttachments?.map((attch, index) => (
                          <Grid
                            container
                            item
                            className={classes.inpuContainer}
                          >
                            <InputLabel
                              htmlFor={attch.key}
                              className={classes.label}
                            >
                              {attch.title}
                              {attch.isRequired && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                            </InputLabel>
                            <Field
                              component={DropZone}
                              acceptedFiles={[".pdf"]}
                              name={attch.key}
                              showFileNames={true}
                              initialFiles={cooAttachment}
                              filesLimit={1}
                              onChange={(e) => handleFileChange(e, attch)}
                              onDrop={(acceptedFiles) => {
                                if (
                                  acceptedFiles.length > 0 &&
                                  attch?.countPages
                                ) {
                                  const file = acceptedFiles[0];
                                  const fileReader = new FileReader();
                                  fileReader.onload = () => {
                                    const typedArray = new Uint8Array(
                                      fileReader.result
                                    );
                                    pdfjsLib
                                      .getDocument(typedArray)
                                      .promise.then((pdf) => {
                                        setFilePagesCount(pdf.numPages);
                                      });
                                  };
                                  fileReader.readAsArrayBuffer(file);
                                }
                              }}
                              helperText={attch.helperText}
                              maxFileSize={
                                attch?.maxSize ? attch?.maxSize : 30000000
                              }
                              dropzoneText={
                                isRTL
                                  ? "اسحب الملف أو انقر هنا"
                                  : "drag and drop a file or click here"
                              }
                            />
                          </Grid>
                        ))
                      ) : (
                        <Typography
                          className={classes.subHeading}
                          variant="subtitle1"
                        >
                          {t("SERVICESPAGES.ORIGIN.CHOOSE")}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded6}
                onChange={() => setExpanded6(!expanded6)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded6 ? <Remove /> : <Add />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <IoCopy className={classes.address} />
                  <Typography>
                    {" "}
                    {t("SERVICESPAGES.ORIGIN.ADDITIONALCOPY")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography className={classes.note}>
                        {" "}
                        <FcAbout />
                        {t("SERVICESPAGES.AMEND.ORIGINAL")}
                      </Typography>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <InputLabel
                        htmlFor="numOfCopies"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.AMEND.NUMBER")}
                      </InputLabel>
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <InputLabel
                        htmlFor="numOfCopiesFees"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ADDITIONALREQ.FEES")}{" "}
                      </InputLabel>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        variant="outlined"
                        name="numOfCopies"
                        id="numOfCopies"
                        type="number"
                        min="1"
                        onChange={(e) => {
                          if (e.target.value < 0) e.target.value = 0;
                          setFieldValue("numOfCopies", e.target.value);
                        }}
                      />
                    </Grid>

                    <Grid item md={6} xs={12}>
                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        id="numOfCopiesFees"
                        name="numOfCopiesFees"
                        variant="outlined"
                        value={values.numOfCopies * 50}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded5}
                onChange={() => setExpanded5(!expanded5)}
                className={classes.accordionStep}
              >
                <AccordionSummary
                  expandIcon={expanded5 ? <Remove /> : <Add />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <GoVerified className={classes.address} />
                  <Typography>
                    {" "}
                    {t("SERVICESPAGES.ORIGIN.ADDITIONALSEAL")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography className={classes.note}>
                        {" "}
                        <FcAbout />
                        {t("SERVICESPAGES.ORIGIN.SEALSNOTE")}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <InputLabel
                        htmlFor="numOfSeals"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.AMEND.SEALSNUM")}
                      </InputLabel>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <InputLabel
                        htmlFor="numOfSealsFees"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ADDITIONALREQ.FEES")}{" "}
                      </InputLabel>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        component={TextField}
                        className={classes.textField}
                        variant="outlined"
                        name="numOfSeals"
                        id="numOfSeals"
                        type="number"
                        min="1"
                        onChange={(e) => {
                          if (e.target.value < 0) e.target.value = 0;
                          setFieldValue("numOfSeals", e.target.value);
                        }}
                        helperText={
                          filePagesCount
                            ? isRTL
                              ? `يجب أن لا يتجاوز عدد الأختام ${filePagesCount}`
                              : `Shouldnot Be More than ${filePagesCount}`
                            : null
                        }
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Field
                        disabled
                        component={TextField}
                        className={classes.textField}
                        id="numOfSealsFees"
                        name="numOfSealsFees"
                        variant="outlined"
                        value={values.numOfSeals * 5}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Grid
                container
                className={classes.inpuContainer}
                style={{ marginTop: 40 }}
              >
                <Grid item xs={12}>
                  <InputLabel htmlFor="notes" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.NOTES")}
                  </InputLabel>

                  <textarea
                    rows={5}
                    className={classes.textFieldNumberd}
                    name="notes"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </Grid>
              </Grid>

              <Box display={"flex"} justifyContent={"flex-start"}>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.send}
                  endIcon={<HiSave />}
                  onClick={submitForm}
                  disabled={
                    !isValid ||
                    !dirty ||
                    invoiceCheck?.error_code != 0 ||
                    goods?.length < 1 ||
                    !allFilesUploaded
                  }
                >
                  {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
                </Button>
              </Box>
              <Box
                style={{ color: "red", margin: "8px 0px", textAlign: "start" }}
              >
                {errors?.cooType && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.CERTYPE") + " " + errors?.cooType}
                    <br />
                  </>
                )}

                {errors?.invoiceDate && (
                  <>
                    {" "}
                    {t("SERVICESPAGES.ORIGIN.INVDATE") +
                      " " +
                      errors?.invoiceDate}{" "}
                    <br />
                  </>
                )}
                {errors?.invoiceNumber && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.INVNUM") +
                      " " +
                      errors?.invoiceNumber}
                    <br />
                  </>
                )}
                {invoiceCheck
                  ? invoiceCheck?.error_code
                    ? invoiceCheck?.error_code != 0 && (
                        <>
                          {isRTL
                            ? invoiceCheck?.error_message
                            : invoiceCheck?.error_message_e}
                          <br />
                        </>
                      )
                    : ""
                  : ""}
                {errors?.invoiceValue && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.INVVALUE") +
                      " " +
                      errors?.invoiceValue}
                    <br />
                  </>
                )}

                {errors?.currency && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.CURRENCY") +
                      " " +
                      errors?.currency}
                    <br />
                  </>
                )}
                {errors?.countryOfConsignee && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.CONSIGNEE") +
                      " " +
                      errors?.countryOfConsignee}
                    <br />
                  </>
                )}
                {errors?.countryOfOrigin && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.ORIGIN") +
                      " " +
                      errors?.countryOfOrigin}
                    <br />
                  </>
                )}

                {errors?.transportation && (
                  <>
                    {t("SERVICESPAGES.AMEND.TRANSPORT") +
                      " " +
                      errors?.transportation}
                    <br />
                  </>
                )}
                {errors?.dest1 && (
                  <>
                    {t("SERVICESPAGES.AMEND.NAME") + " " + errors?.dest1}
                    <br />
                  </>
                )}
                {errors?.dest2 && (
                  <>
                    {t("SERVICESPAGES.AMEND.ADRESS") + " " + errors?.dest2}
                    <br />
                  </>
                )}
                {errors?.numOfSeals && (
                  <>
                    {t("SERVICESPAGES.AMEND.SEALSNUM") +
                      " " +
                      errors?.numOfSeals}
                    <br />
                  </>
                )}
                {errors?.numOfCopies && (
                  <>
                    {t("SERVICESPAGES.ORIGIN.ADDITIONALCOPY") +
                      " " +
                      errors?.numOfCopies}
                    <br />
                  </>
                )}
                {dirty && goods?.length == 0
                  ? isRTL
                    ? "يجب إضافة بضاعة واحدة على الأقل"
                    : "At least one good must be added "
                  : ""}
                {!allFilesUploaded && (
                  <>
                    <br />
                    {isRTL
                      ? "يجب إضافة كل المرفقات المطلوبة"
                      : "All required attachments must be added"}
                  </>
                )}
              </Box>
            </Form>
          );
        }}
      </Formik>
      <ServicesResultModal
        open={open}
        setOpen={setOpen}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
    </Grid>
  );
}

export default memo(NewCoo);
