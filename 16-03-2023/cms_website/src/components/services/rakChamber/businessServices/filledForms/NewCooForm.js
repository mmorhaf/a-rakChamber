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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField as TextField2,
  Typography,
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
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
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
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import actions from "../../../../../redux/actions";
import { store } from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import { editingInitialValues } from "../forms/EditingInitialValue";
import ServiceStep from "../../steps/ServiceSteps";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

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
  getCooRequestDetails,
  sendCooUpdateRequest,
  sendCooUpdateRequestDone,
  getRatificationAttachData,
  sendDeletedAttachments,
  getServiceStep,
} = actions;

function NewCooForm(props) {
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
  const [oldCountries, setOldCountries] = useState([]);
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
  const [cooRequestDetails, setCooRequestDetails] = useState(null);
  const [ratificationAttach, setRatificationAttach] = useState([]);
  const [deletedAttachments, setDeletedAttachments] = useState([]);
  const [allReqFiles, setAllReqFiles] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [requiredAttachments, setRequiredAttchments] = useState([]);
  const [requestStep, setRequestStep] = useState([]);
  const [filePagesCount, setFilePagesCount] = useState(null);

  let { code, type } = useParams();

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
  const regex = /^(0*[0-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  // const invoiceRegex = /^[a-zA-Z0-9]*$/;

  const validationSchema = Yup.object({
    cooType: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    invoiceNumber: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    invoiceDate: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    invoiceValue: Yup.string()
      .matches(
        regex,
        isRTL ? "رقم الموبايل غير صالح" : "Phone number is not valid"
      )
      .required(isRTL ? "مطلوب" : "Required"),
    currency: Yup.object()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    countryOfConsignee: Yup.object()
      .required(isRTL ? "مطلوب" : "Required")
      .nullable(),
    countryOfOrigin: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
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
      const readyValues = {
        coo: [
          {
            chamber_fees: calculateFeesData.chamber_fees,
            // values.numOfCopies * 50 +
            // values.numOfSeals * 5,
            company_code: profile ? profile?.company_code : "",
            consignee_country_code: values.countryOfConsignee.code,
            coo_type: values.cooType,
            coo_code: cooRequestDetails?.coo[0]?.coo_code,
            currency_code: values.currency.code,
            destination1: values.dest1,
            destination2: values.dest2,
            destination3: values.dest3,
            destination4: values.dest4,
            estimated_date_of_departure:
              selectedDepartureDate &&
              moment(selectedDepartureDate).format("YYYY-MM-DD"),
            follow_up_remark: note,
            // host: "",
            updated_by: profile?.username,
            invoice_issue_date:
              selectedInvoiceDate &&
              moment(selectedInvoiceDate).format("YYYY-MM-DD"),
            invoice_no: values.invoiceNumber,
            invoice_value: Number(values.invoiceValue),
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
            user_remark: values.user_remark,
          },
        ],
        coo_additional_request: [
          {
            copyNum: Number(values.numOfCopies),
            sealNum: Number(values.numOfSeals),
          },
        ],
        coo_details: goods,
        coo_origins: countries,
      };
      setSendValues(readyValues);

      if (cooAttachment?.length) {
        let data = new FormData();
        cooAttachment?.map((i, index) => {
          data.append(`files,${index}`, i.file);
          data.append(`classification_code,${index}`, i.classification_code);
        });
        dispatch(
          uploadRakFile({
            body: {
              code: profile?.company_code
                ? profile?.company_code
                : profile?.code,
              data,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          })
        );
      } else {
        dispatch(sendCooUpdateRequest({ data: readyValues }));
      }
      // dispatch(sendCooUpdateRequest({ data: readyValues }));
      // resetForm({});
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

  const handleFileChange = (e, attachment) => {
    if (!e.length) {
      setCooAttachment(
        cooAttachment?.filter((i) => i.classification_code != attachment.key)
      );
      let filteredItem = ratificationAttach?.filter(
        (item) => item?.classification_code === attachment?.key
      );
      if (filteredItem?.length > 0)
        setDeletedAttachments(
          deletedAttachments?.filter((i) => i?.code != filteredItem[0]?.code)
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
      dispatch(sendCooUpdateRequest({ data: { ...sendValues } }));
    }
  }, [APIServices.uploadRakFileDone]);

  useEffect(() => {
    if (profile != null) dispatch(fetchSelectMenuData());
    dispatch(sendMostUsedService({ data: 54 }));
    dispatch(getCooRequestDetails({ data: { code } }));
    let service_code = 50;
    let request_code = code;
    dispatch(getServiceStep({ data: { service_code, request_code } }));
    if (
      loggedType == "1" &&
      memberType != "active" &&
      memberType != "activeExpired"
    )
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, []);

  useLayoutEffect(() => {
    return () => (
      dispatch(calculateFeesDone({ data: {} })),
      dispatch(uploadRakFileDone({ data: {} }))
    );
  }, []);

  useEffect(() => {
    let newDeletedItems = [];
    if (
      cooAttachment &&
      cooAttachment?.length > 0 &&
      ratificationAttach?.length > 0
    ) {
      cooAttachment?.map((item) => {
        newDeletedItems = ratificationAttach?.filter(
          (attach) => item?.classification_code === attach?.classification_code
        );
        if (newDeletedItems && newDeletedItems[0]?.code) {
          let filteredDeletedAttachments = [
            ...deletedAttachments,
            {
              code: newDeletedItems[0]?.code,
              request_code: newDeletedItems[0]?.request_code,
              updated_by: profile?.username,
            },
          ];
          filteredDeletedAttachments = filteredDeletedAttachments.filter(
            (ele, ind) =>
              ind ===
              filteredDeletedAttachments.findIndex(
                (elem) => elem.code === ele.code
              )
          );
          setDeletedAttachments(filteredDeletedAttachments);
        }
      });
    }
  }, [cooAttachment]);

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
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    setSelectMenuData({ ...APIServices.selectMenuDataDone });
  }, [APIServices.selectMenuDataDone]);

  useEffect(() => {
    if (APIServices.getServiceStepDone) {
      if (APIServices.getServiceStepDone.request_step)
        setRequestStep(APIServices.getServiceStepDone.request_step[0]);
    }
  }, [APIServices.getServiceStepDone]);

  useEffect(() => {
    setCalculateFeesData({ ...APIServices.calculateFeesDone });
  }, [APIServices.calculateFeesDone]);

  useEffect(() => {
    if (APIServices.cooRequestDetails?.coo) {
      setCooRequestDetails({ ...APIServices.cooRequestDetails });

      setSelectedInvoiceDate(
        moment(
          APIServices.cooRequestDetails?.coo[0]?.invoice_issue_date
        ).format("YYYY-MM-DD")
      );
      APIServices.cooRequestDetails?.coo[0]?.estimated_date_of_departure &&
        setSelectedDepartureDate(
          moment(
            APIServices.cooRequestDetails?.coo[0]?.estimated_date_of_departure
          ).format("YYYY-MM-DD")
        );
      setInvoiceValue(APIServices.cooRequestDetails?.coo[0]?.invoice_value);
      setCurrency(APIServices.cooRequestDetails?.coo[0]?.currency_code);
      setOldCountries(
        Array.isArray(APIServices.cooRequestDetails?.origin_countries)
          ? APIServices.cooRequestDetails?.origin_countries
          : []
      );
      setCountries(
        Array.isArray(APIServices.cooRequestDetails?.origin_countries)
          ? APIServices.cooRequestDetails?.origin_countries.map((x) => {
              return { country_code: x.code };
            })
          : []
      );
      setGoods(
        APIServices.cooRequestDetails?.details
          ? APIServices.cooRequestDetails?.details
          : []
      );
      setNote(APIServices.cooRequestDetails?.coo[0]?.follow_up_remark);
      setSerial_no(APIServices.cooRequestDetails?.details.length);
      dispatch(
        getRatificationAttachData({
          data: { request_code: code },
          reqType: 50,
        })
      );
      dispatch(
        checkInvoiceNo({
          data: {
            invoice_no: APIServices.cooRequestDetails?.coo[0]?.invoice_no,
            company_code: profile?.company_code,
          },
        })
      );
      setRequiredAttchments(
        APIServices.cooRequestDetails?.coo[0]?.coo_type == 1
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
          : APIServices.cooRequestDetails?.coo[0]?.coo_type == 2
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
          : APIServices.cooRequestDetails?.coo[0]?.coo_type == 3
          ? [
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
            ]
          : null
      );
    }
  }, [APIServices.cooRequestDetails]);

  useEffect(() => {
    const result = APIServices.ratificationRequestAttach;
    if (result) {
      if (result?.length > 0)
        setRatificationAttach(
          result?.filter((item) => item.request_code == code)
        );
    }
  }, [APIServices.ratificationRequestAttach]);

  useEffect(() => {
    const result = APIServices.cooRequestUpdated;
    if (result.coo_code) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.coo_code;
        attch["request_type"] = cooTypeCode;
        return attch;
      });
      dispatch(
        sendDeletedAttachments({
          data: { deletedAttach: deletedAttachments },
          reqType: 50,
        })
      );
      dispatch(
        sendCooAttachments({
          data: { coo_attachment: cooAttachment },
          reqType: 50,
        })
      );
    }
  }, [APIServices.cooRequestUpdated]);

  useEffect(() => {
    const result = APIServices.cooRequestUpdated;
    if (
      result.coo_code
      // APIServices.cooAttachments.affectedRow &&
      // APIServices.deletedAttachments.updated
    ) {
      setOpen(true);
      setMessage(
        isRTL
          ? `تم حفظ تغييراتك بنجاح , رقم طلبك هو ${result.coo_code}`
          : `your changes have been saved successfully, Your Application Number is ${result.coo_code} .`
      );
      store.dispatch(push("/services-form/requests-list"));
    } else {
      if (result.items == [] || result == []) {
        setOpen(true);
        setMessage(isRTL ? `خطأ في السيرفر` : `Internal Server Error.`);
      }
    }
    if (Object.keys(APIServices.cooRequestUpdated).length)
      dispatch(sendCooUpdateRequestDone({ data: {} }));
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

  function handleRemove(attach) {
    let deletedAttach = ratificationAttach.filter(
      (item) => item.code == attach.code
    );
    let filteredDeletedAttachments = [
      ...deletedAttachments,
      {
        code: deletedAttach[0].code,
        request_code: deletedAttach[0].request_code,
        updated_by: profile?.username,
      },
    ];
    filteredDeletedAttachments = filteredDeletedAttachments.filter(
      (ele, ind) =>
        ind ===
        filteredDeletedAttachments.findIndex((elem) => elem.code === ele.code)
    );
    setDeletedAttachments(filteredDeletedAttachments);
    let newList = ratificationAttach.filter(
      (item) => item.code !== attach.code
    );
    setRatificationAttach(newList);
  }

  useEffect(() => {
    let arr = [...ratificationAttach, ...cooAttachment];
    let isRequiredFiles = requiredAttachments?.filter((e) => e.isRequired);
    let action = isRequiredFiles?.map((item) =>
      arr?.some((i) => item.key == i.classification_code)
    );
    setAllReqFiles(action?.every((i) => i == true));
  }, [ratificationAttach, cooAttachment]);

  const AttachType = (item) => {
    switch (item.classification_code) {
      case 21:
        return isRTL
          ? "جواز السفر أو الهوية لمنجز المعاملة"
          : "Passport Copy Of Client  or UAE ID Card";
      case 11:
        return isRTL ? "المستند المراد تصديقه" : "Document Copy to Ratify";
      case 12:
        return isRTL ? "نموذج التعهد" : "Undertaking Form";
      case 16:
        return isRTL ? "ملفات داعمه" : "Support documents";
      case 10:
        return isRTL ? "جواز السفر لمنجز المعاملة" : "Passport Copy Of Client";
      case 1:
        return isRTL
          ? "بطاقة الهوية الإماراتية لمقدم الطلب"
          : "UAE ID Card of the Applicant";
      case 99:
        return isRTL ? "أخرى" : "Others";
      case 15:
        return isRTL
          ? "مستندات إضافية مراد الختم عليها"
          : "Additional documents to be stamped";
      case 17:
        return isRTL ? "نموذج Form A" : "Form A Specimen";
      case 18:
        return isRTL ? "نموذج تعبئة أغراض شخصية" : "Personal Effects Specimen";
      case 19:
        return isRTL ? "رسالة طلب إلغاء معتمدة" : "Request Letter";
      case 8:
        return isRTL
          ? "المستندات المرفقة مع شهادة المنشأ المراد الختم عليها"
          : "Attachments With the Certificate of Origin to be Stamped";
      case 9:
        return isRTL ? "الفاتورة القديمة" : "Previous Invoice";
      case 20:
        return isRTL ? "الفاتورة" : "Invoice";
      case 13:
        return isRTL ? "الرخصة التجارية" : "Commercial license";
      case 14:
        return isRTL ? "سند القبض" : "Receipt";
      case 2:
        return isRTL ? "شهادة المنشأ" : "Original certificate of origin";
      case 3:
        return isRTL ? "رسالة طلب تعديل معتمدة" : "Request Letter";
      case 4:
        return isRTL
          ? "رسالة طلب طباعة النسخ"
          : "Request Letter to Print Copies";
      case 5:
        return isRTL ? "الفاتورة الجديدة" : "New Invoice";
      case 6:
        return isRTL
          ? "الرسالة الأصلية إن وجدت أو صورة من الشهادة"
          : "The Original Certificate (if an) or a Copy Thereof";
      default:
        return "";
    }
  };
  const getStatus = (status) => {
    switch (status) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 3:
        return 2;
      case 4:
        return 3;
      case 5:
        return 4;
      default:
        return 0;
    }
  };
  const initialValues = editingInitialValues("editNewCoo", cooRequestDetails);
  return (
    <Grid container className={classes.supplierRoot}>
      <Box>
        <Typography className={classes.serviceTitle}>
          {t("SERVICESPAGES.ORIGIN.TITLE")}
        </Typography>
        {cooRequestDetails?.coo?.length && (
          <>
            <Typography style={{ textAlign: "start", position: "absolute" }}>
              {getStatus(Number(requestStep.step_code)) == 4
                ? t("SERVICESPAGES.DELETED.ISSUENO")
                : t("SERVICESPAGES.DELETED.REQNO")}{" "}
              :{" "}
              {getStatus(Number(requestStep.step_code)) == 4
                ? cooRequestDetails?.coo[0]?.ref_code
                : cooRequestDetails?.coo[0]?.coo_code}
            </Typography>
            <Typography style={{ textAlign: "end" }}>
              {t("SERVICESPAGES.DELETED.REQDATE")} :{" "}
              {moment(cooRequestDetails?.coo[0]?.coo_issue_date).format(
                "YYYY-MM-DD h:mm a"
              )}
            </Typography>
          </>
        )}
      </Box>
      <ServiceStep
        getStatus={getStatus(Number(requestStep.step_code))}
        status={isRTL ? requestStep.status_name : requestStep.status_name_e}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize
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
            <Form className={classes.fullForm} variant="outlined">
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
                      <InputLabel htmlFor="cooType" className={classes.label}>
                        {t("SERVICESPAGES.ORIGIN.CERTYPE")}{" "}
                        <span style={{ color: "red" }}>*</span>
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
                        disabled={loggedType == "2" || type == "view"}
                        onChange={(e) => {
                          setFieldValue("cooType", e.target.value);
                          handleAttachments(e.target.value);
                        }}
                      >
                        {loggedType == "1"
                          ? selectMenuData.coo_type
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
                        value={
                          loggedType == "2"
                            ? profile?.code
                            : profile?.company_code
                        }
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
                        variant="outlined"
                        value={
                          profile
                            ? isRTL
                              ? profile?.name
                              : profile?.name_e
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item md={6} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="invoiceDate"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.INVDATE")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>

                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
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
                          disabled={type == "view" ? true : false}
                        />
                      </MuiPickersUtilsProvider>
                      {errors.invoiceDate && touched.invoiceDate ? (
                        <div className={classes.inputfeedback}>
                          {errors.invoiceDate}
                        </div>
                      ) : null}
                    </Grid>

                    <Grid item md={6} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="invoiceNumber"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.ORIGIN.INVNUM")}{" "}
                        <span style={{ color: "red" }}>*</span>
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
                        onBlur={(val) => {
                          setFieldValue("invoiceNumber", val.target.value);
                          // setTimeout(() => {
                          dispatch(
                            checkInvoiceNo({
                              data: {
                                invoice_no: val.target.value,
                                company_code: profile?.company_code,
                              },
                            })
                          );
                          // }, 3000)
                        }}
                        disabled={type == "view" ? true : false}
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
                      >
                        {t("SERVICESPAGES.ORIGIN.INVVALUE")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Field
                        disabled={type == "view" ? true : false}
                        type="number"
                        min="1"
                        component={TextField}
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
                      <InputLabel htmlFor="currency" className={classes.label}>
                        {t("SERVICESPAGES.ORIGIN.CURRENCY")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Autocomplete
                        disabled={type == "view" ? true : false}
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
                        value={values.currency}
                        onChange={(e, value) => (
                          setFieldValue("currency", value || ""),
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
                      >
                        {t("SERVICESPAGES.ORIGIN.CONSIGNEE")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>
                      <Autocomplete
                        disabled={type == "view" ? true : false}
                        className={classes.textField}
                        id="contact-autocomplete"
                        options={
                          selectMenuData?.country ? selectMenuData.country : []
                        }
                        getOptionLabel={(option) =>
                          isRTL ? option.code_name : option?.code_name_e
                        }
                        onChange={(e, value) =>
                          setFieldValue("countryOfConsignee", value || "")
                        }
                        value={values.countryOfConsignee}
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            name="countryOfConsignee"
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
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="countryOfOrigin"
                        className={classes.label}
                        required
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
                            {isRTL
                              ? "يرجى اختيار بلد المنشأ من القائمة أدناه"
                              : "Please select the Country of origin from the list below"}{" "}
                          </span>
                        )}
                      </InputLabel>
                      <Autocomplete
                        multiple
                        disabled={type == "view" ? true : false}
                        className={classes.textField}
                        id="contact-autocomplete"
                        options={
                          selectMenuData?.country ? selectMenuData.country : []
                        }
                        getOptionLabel={(option) =>
                          option?.code_name
                            ? isRTL
                              ? option?.code_name
                              : option?.code_name_e
                            : isRTL
                            ? option?.name
                            : option?.name_e
                        }
                        limitTags={type == "edit" ? 2 : -1}
                        filterSelectedOptions={true}
                        onChange={(e, value) => {
                          setCountries(
                            Array.isArray(value)
                              ? value.map((x) => {
                                  return { country_code: x.code };
                                })
                              : []
                          );
                          setOldCountries(
                            Array.isArray(value)
                              ? value.map((x) => {
                                  return { ...x, country_code: x.code };
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
                        key="country"
                        value={oldCountries}
                        getOptionDisabled={() => countries.length == 15}
                        // includeInputInList
                        renderInput={(params) => (
                          <Field
                            component={TextField}
                            {...params}
                            name="coo_origins"
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
                          disabled={type == "view" ? true : false}
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
                        disabled={type == "view" ? true : false}
                      />
                    </Grid>
                    <Grid md={6} item xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="transportation"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.AMEND.TRANSPORT")}{" "}
                        <span style={{ color: "red" }}>*</span>
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
                        disabled={type == "view" ? true : false}
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
                      <Grid item xs={3} className={classes.fullWidth}>
                        <InputLabel htmlFor="dest1" className={classes.label}>
                          {t("SERVICESPAGES.AMEND.NAME")}
                          <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest1"
                          name="dest1"
                          variant="outlined"
                          disabled={type == "view" ? true : false}
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
                      <Grid item xs={3} className={classes.fullWidth}>
                        <InputLabel htmlFor="dest2" className={classes.label}>
                          {t("SERVICESPAGES.AMEND.ADRESS")}
                          <span style={{ color: "red" }}>*</span>
                        </InputLabel>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest2"
                          name="dest2"
                          variant="outlined"
                          disabled={type == "view" ? true : false}
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
                      <Grid item xs={3} className={classes.fullWidth}>
                        <InputLabel htmlFor="dest3" className={classes.label}>
                          {t("SERVICESPAGES.AMEND.ADRESSPHONE")}
                        </InputLabel>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest3"
                          name="dest3"
                          variant="outlined"
                          disabled={type == "view" ? true : false}
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
                      <Grid item xs={3} className={classes.fullWidth}>
                        <InputLabel htmlFor="dest4" className={classes.label}>
                          {t("SERVICESPAGES.ORIGIN.DESTINATION")} 4
                        </InputLabel>
                      </Grid>
                      <Grid item sm={8} xs={12}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="dest4"
                          name="dest4"
                          variant="outlined"
                          disabled={type == "view" ? true : false}
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
                    {" "}
                    {t("SERVICESPAGES.AMEND.GOODDETAILS")}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1}>
                    {type == "edit" && (
                      <>
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
                            onInputChange={(e) =>
                              setinputValue(e?.target.value)
                            }
                            onBlur={() => setinputValue("")}
                            open={inputValue?.length > 1}
                            className={classes.textField}
                            id="combo-box-demo"
                            options={
                              selectMenuData?.hsItems
                                ? selectMenuData.hsItems
                                : []
                            }
                            getOptionLabel={(option) =>
                              isRTL ? option?.code_name : option?.code_name_e
                            }
                            onChange={(e, value) => setHsItem(value)}
                            onPaste={(e) => {
                              e.preventDefault();
                              return false;
                            }}
                            name="coo_details"
                            // includeInputInList
                            renderInput={(params) => (
                              <Field
                                component={TextField}
                                {...params}
                                name="coo_details"
                                variant="outlined"
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
                          />{" "}
                        </Grid>

                        <Grid item md={6} xs={12}>
                          {" "}
                          <InputLabel className={classes.label}>
                            {t("SERVICESPAGES.AMEND.UNIT")}
                            <span style={{ color: "red" }}>*</span>
                          </InputLabel>
                          <Autocomplete
                            className={classes.textField}
                            name="uom"
                            id="contact-autocomplete"
                            options={
                              selectMenuData?.uom ? selectMenuData.uom : []
                            }
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
                          />{" "}
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
                          />{" "}
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
                                  unit_of_measure_name: values.uom.name,
                                  unit_of_measure_name_e: values.uom.name_e,
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
                              // disabled={!isValid || !dirty}
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
                      </>
                    )}
                    <Grid item xs={12}>
                      <Typography className={classes.heading}>
                        {t("SERVICESPAGES.AMEND.GOODSLIST")}
                      </Typography>
                      {type == "view" ? (
                        <TableContainer>
                          <Table
                            className={classes.table}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>
                                  {t("SERVICESPAGES.AMEND.HS")}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>
                                  {t("SERVICESPAGES.AMEND.NAME")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {t("SERVICESPAGES.AMEND.UNIT")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {t("SERVICESPAGES.AMEND.WEIGHT")}{" "}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {t("SERVICESPAGES.AMEND.QUANTITY")}
                                </TableCell>

                                <TableCell style={{ textAlign: "center" }}>
                                  {t("SERVICESPAGES.AMEND.PRICE")}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                  {t("SERVICESPAGES.AMEND.UNITPRICE")}
                                </TableCell>
                                {/* <TableCell></TableCell> */}
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {goods?.length > 0 &&
                                goods.map((row, index) => (
                                  <TableRow key={row.serial_no}>
                                    <TableCell component="th" scope="row">
                                      {row.hs_code}
                                    </TableCell>
                                    <TableCell>
                                      {isRTL
                                        ? row.hs_level2_name
                                        : row.hs_level2_name_e}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                      {isRTL
                                        ? row.unit_of_measure_name
                                        : row.unit_of_measure_name_e}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                      {row.weight}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                      {row.qty}
                                    </TableCell>

                                    <TableCell style={{ textAlign: "center" }}>
                                      {row.total_price}
                                    </TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                      {row.unit_price}
                                    </TableCell>
                                    {/* <TableCell>
                                    {" "}
                                    <IconButton
                                      onClick={() =>
                                        setGoods(
                                          goods?.filter((i, iIndex) => {
                                            return iIndex !== index;
                                          })
                                        )
                                      }
                                    >
                                      <AiOutlineDelete />
                                    </IconButton>
                                  </TableCell> */}
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      ) : (
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
                                        key={good.hs_code}
                                        renderInput={(params) => (
                                          <TextField2
                                            {...params}
                                            // value={good?.hs_code}
                                            // name="hs_code"
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
                                        {t("SERVICESPAGES.AMEND.GOODS")}
                                        <span style={{ color: "red" }}>*</span>
                                      </InputLabel>
                                      <Autocomplete
                                        // component={Autocomplete}
                                        // multiple
                                        className={classes.textField}
                                        value={good}
                                        id="good-autocomplete"
                                        options={
                                          selectMenuData?.hsItems
                                            ? selectMenuData.hsItems
                                            : []
                                        }
                                        onPaste={(e) => {
                                          e.preventDefault();
                                          return false;
                                        }}
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
                                            // value={good?.hs_level2_name_e}
                                            // name="hs_level2_name"
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

                                      <Field
                                        component={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        name={`weight`}
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
                                            ? option?.unit_of_measure_name
                                            : option?.unit_of_measure_name_e
                                        }
                                        onChange={(e, value) => {
                                          let newDetails = [...goods];
                                          newDetails?.map((item, i) =>
                                            i == index
                                              ? ((item.uom = value?.code),
                                                (item.unit_of_measure_name =
                                                  value?.name),
                                                (item.unit_of_measure_name_e =
                                                  value?.name_e))
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

                                      <Field
                                        component={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        name={`qty`}
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
                                        onBlur={() =>
                                          setFieldValue(
                                            `unit_price`,
                                            good.total_price / good.qty
                                          )
                                        }
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

                                      <Field
                                        component={TextField}
                                        className={classes.textField}
                                        variant="outlined"
                                        name={`total_price`}
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
                                        onBlur={() =>
                                          setFieldValue(
                                            `unit_price`,
                                            good.total_price / good.qty
                                          )
                                        }
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

                                      <Field
                                        disabled
                                        component={TextField}
                                        className={classes.textField}
                                        id={`unit_price`}
                                        name={`unit_price`}
                                        value={good.unit_price}
                                        variant="outlined"
                                        // value={
                                        //   good.qty &&
                                        //   good.total_price &&
                                        //   good.qty / good.total_price
                                        // }
                                      />
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Box>
                            ))}
                        </Box>
                      )}{" "}
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
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.ONE")
                            }
                            disabled={type == "view" ? true : false}
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
                            disabled={type == "view" ? true : false}
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.TWO")
                            }
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
                            disabled={type == "view" ? true : false}
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.THREE")
                            }
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
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.FOUR")
                            }
                            disabled={type == "view" ? true : false}
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
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.FIVE")
                            }
                            disabled={type == "view" ? true : false}
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
                            disabled={type == "view" ? true : false}
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.SIX")
                            }
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
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.SEVEN")
                            }
                            disabled={type == "view" ? true : false}
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
                            disabled={type == "view" ? true : false}
                            placeholder={
                              type == "edit" && t("SERVICESPAGES.AMEND.EIGHT")
                            }
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
                    {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid container xs={12}>
                      {type == "edit" ? (
                        requiredAttachments?.length > 0 ? (
                          requiredAttachments?.map((attch) => (
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
                                helperText={attch.helperText}
                                maxFileSize={
                                  attch?.maxSize ? attch?.maxSize : 30000000
                                }
                                dropzoneText={
                                  isRTL
                                    ? "اسحب الملف أو انقر هنا"
                                    : "drag and drop a file or click here"
                                }
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
                        )
                      ) : null}

                      <Grid container className={classes.inpuContainer}>
                        <Box className={classes.divider}>
                          <Typography name="fills">
                            {isRTL ? "المرفقات" : "Attachments"}
                          </Typography>
                        </Box>

                        {ratificationAttach?.length
                          ? ratificationAttach?.map((attch) => (
                              <>
                                <Grid item xs={12} md={5}>
                                  <InputLabel className={classes.label}>
                                    {AttachType(attch)}
                                  </InputLabel>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Button
                                    className={classes.pdfRead}
                                    variant="contained"
                                    target="_blank"
                                    href={`/tmp/services/${attch.file_name}`}
                                  >
                                    {attch.file_name}
                                  </Button>
                                </Grid>
                                {type == "edit" ? (
                                  <Grid item md={1}>
                                    {" "}
                                    <Fab
                                      color="primary"
                                      aria-label="remove"
                                      size="small"
                                      onClick={() => handleRemove(attch)}
                                    >
                                      <Remove />
                                    </Fab>
                                  </Grid>
                                ) : null}
                              </>
                            ))
                          : null}
                      </Grid>
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
                        disabled={type == "view" ? true : false}
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
                        disabled={type == "view" ? true : false}
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
                    disabled={type == "view" ? true : false}
                  ></textarea>
                </Grid>
              </Grid>
              <Grid
                container
                className={classes.inpuContainer}
                style={{ marginTop: 40 }}
              >
                <Grid item xs={12}>
                  <InputLabel htmlFor="emp_notes" className={classes.label}>
                    {t("SERVICESPAGES.RATIFICATION.EMPLOYEE")}
                  </InputLabel>
                  <textarea
                    rows={5}
                    className={classes.textFieldNumberd}
                    name="emp_notes"
                    value={
                      APIServices.cooRequestDetails?.coo
                        ? APIServices.cooRequestDetails?.coo[0]?.user_remark
                        : ""
                    }
                    disabled
                  ></textarea>
                </Grid>
              </Grid>
              {type != "view" && (
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.send}
                  endIcon={<HiSave />}
                  onClick={submitForm}
                  disabled={
                    !isValid ||
                    // !dirty ||
                    (invoiceCheck && invoiceCheck?.error_code != 0) ||
                    allReqFiles == false ||
                    goods?.length < 1
                  }
                  // requiredAttachments.length != cooAttachment.length}
                >
                  {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
                </Button>
              )}
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

export default memo(NewCooForm);
