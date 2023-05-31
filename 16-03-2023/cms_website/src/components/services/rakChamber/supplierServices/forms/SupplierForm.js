import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
  TextField as TextField2,
  Typography,
} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Add, Remove } from "@material-ui/icons";
import GetAppIcon from "@material-ui/icons/GetApp";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Checkbox, Select, TextField } from "formik-material-ui";
import { DatePicker } from "formik-material-ui-pickers";
import * as moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { Fragment, memo, useEffect, useState } from "react";
import Captcha from "../../../../shared/captcha/Captcha";
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsInfoSquare } from "react-icons/bs";
import { FiEdit, FiMessageSquare } from "react-icons/fi";
import { GoBell } from "react-icons/go";
import { ImCancelCircle, ImEye } from "react-icons/im";
import { IoLogIn } from "react-icons/io5";
import { MdAttachFile, MdDateRange } from "react-icons/md";
import { RiAttachmentLine, RiBankLine, RiContactsLine } from "react-icons/ri";
import { VscGoToFile } from "react-icons/vsc";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as Yup from "yup";
import actions from "../../../../../redux/actions";
import store from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import List from "../../../../shared/list/List";
import DropZone from "../../../../shared/materialDropZone/DropZone";
import {
  Activities,
  ArabicEmirates,
  arLabels,
  CountriesLTR,
  CountriesRTL,
  Emirates,
  enLabels,
  getFileUrl,
} from "../../../../shared/utils";
import ServicesResultModal from "../../ServicesResultModal";

const {
  postSupplierForm,
  postSupplierFormReturned,
  getAll,
  markNotification,
  createNew,
  created,
  loadingAction,
  getNotifications,
  getSupplierRequestNotes,
  addSupplierRequestNote,
} = actions;

const attachsLTR = [
  {
    title: "Copy of trade license",
    key: "tradeLicence",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "Copy of Chamber Membership Certificate",
    key: "chamberMembershipCertificate",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "Copy owner passport",
    key: "ownerPassport",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "Copy Representative passport/ID",
    key: "representativePassport",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "Company Profile",
    key: "companyProfile",
    isRequired: false,
    isUploading: false,
    isUploaded: false,
  },
];
const attachsRTL = [
  {
    title: "نسخة من الرخصة التجارية",
    key: "tradeLicence",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "نسخة من شهادة عضوية الغرفة",
    key: "chamberMembershipCertificate",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "نسخة من جواز سفر المالك",
    key: "ownerPassport",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "نسخة من جواز سفر أو هوية المندوب",
    key: "representativePassport",
    isRequired: true,
    isUploading: false,
    isUploaded: false,
  },
  {
    title: "ملف الشركة",
    key: "companyProfile",
    isRequired: false,
    isUploading: false,
    isUploaded: false,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function SupplierForm(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const { operation } = useParams();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { APIServices } = useSelector((state) => state);
  const reducers = useSelector((state) => state);
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);
  const [expanded4, setExpanded4] = useState(false);
  const [expanded6, setExpanded6] = useState(false);
  const [expanded7, setExpanded7] = useState(false);
  const [replys, setReplys] = useState([]);
  const [open, setOpen] = useState(false);
  const [openReplyData, setOpenReplyData] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [replyClicked, setReplyClicked] = useState(false);
  const [emailFrom, setEmailFrom] = useState("");
  const [emailTo, setEmailTo] = useState("");
  const [view, setView] = useState(false);
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [openNote, setOpenNote] = useState(false);
  const [updateReq, setUpdateReq] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState("");
  const [noThanks, setNoThanks] = useState(false);
  const [allNotifications, setAllNotification] = useState([]);
  const [notSeen, setNotSeen] = useState(0);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const [reply, setReply] = useState({});
  const [value, setValue] = useState(0);
  const [requestFiles, setRequestFiles] = useState([]);
  const [requiredAttachments, setRequiredAttchments] = useState(attachsLTR);
  const [displayedNote, setDisplayedNote] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const { files } = useSelector((state) => state);
  const { services } = useSelector((state) => state);
  const dispatch = useDispatch();
  const Countries = CountriesRTL.map((arTitle, index) => ({
    id: index,
    arTitle,
    enTitle: CountriesLTR[index],
    value: CountriesLTR[index],
  }));
  const AllEmirates = isRTL ? ArabicEmirates : Emirates;
  let haveRequest = JSON.parse(sessionStorage.getItem("haveRequest"));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleReplyDataClose = () => {
    setOpenReplyData(false);
  };
  const handleReplyClose = () => {
    setOpenReplyDialog(false);
  };

  const handleModalOpen = () => {
    setOpenReplyData(true);
  };

  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);

  useEffect(() => {
    const attach = isRTL ? attachsRTL : attachsLTR;
    setRequiredAttchments(attach);
  }, [isRTL]);

  useEffect(() => {
    if (operation === "view" && haveRequest) {
      setView(true);
      let sort = "service/request/supplier/mine";
      let supplierToken = true;
      dispatch(getAll({ sort, supplierToken }));
    } else if (operation === "view" && !haveRequest)
      store.dispatch(
        push("/services-form/supplier-services/Supplier Registration")
      );
    else if (operation !== "view" && haveRequest)
      store.dispatch(push("/services-form/profile"));
  }, [operation]);

  useEffect(() => {
    if (operation === "view") {
      setExpanded1(true);
      setExpanded2(true);
      setExpanded3(true);
      setExpanded4(true);
      setExpanded6(true);
      setExpanded7(true);
    }
  }, [operation]);

  useEffect(() => {
    if (data && data?.files) setRequestFiles(data?.files);
    if (data && data?.id)
      dispatch(
        getAll({
          sort: `service/request/${data?.id}/replays`,
          supplierToken: true,
        })
      );
  }, [data]);

  useEffect(() => {
    if (operation !== "view") setUpdateReq(true);
  }, [operation]);

  const columns = [
    {
      name: "title",
      label: t("OPENDATA.PAGE.TABLEHEAD.TITLE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "source",
      label: t("OPENDATA.PAGE.TABLEHEAD.SOURCE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "view",
      label: t("OPENDATA.PAGE.TABLEHEAD.READ"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "download",
      label: t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD"),
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    tableBodyHeight: "auto",
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    fixedHeader: false,
    textLabels: {
      filter: {
        title: t("LABEL.FILTERS"),
        reset: t("LABEL.RESET"),
      },
      pagination: {
        rowsPerPage: t("LABEL.PAGEROWS"),
        displayRows: t("LABEL.OF"),
      },
      selectedRows: {
        text: t("LABEL.SELECTED"),
      },
    },
  };

  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj["title"] = isRTL ? item.title?.ar : item.title?.en;
        obj["source"] = item?.source;
        obj["view"] = (
          <IconButton
            onClick={async () => {
              store.dispatch(push(`/services-form/file/read/${item?.uuid}`));
            }}
          >
            <VscGoToFile className={classes.icon} />
          </IconButton>
        );
        obj["download"] = (
          <IconButton
            onClick={async () => {
              const url = await getFileUrl(item?.uuid);
              handleClick(url, item?.title);
            }}
          >
            <GetAppIcon className={classes.icon} />
          </IconButton>
        );

        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };
  const newData = createColumn(requestFiles);

  const replyColumn = [
    {
      name: "from",
      label: t("OPENDATA.PAGE.TABLEHEAD.FROM"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "to",
      label: t("OPENDATA.PAGE.TABLEHEAD.TO"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "date",
      label: t("OPENDATA.PAGE.TABLEHEAD.REPLYDATE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "view",
      label: t("OPENDATA.PAGE.TABLEHEAD.VIEW"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button
              style={{ fontSize: 25, marginLeft: "-10px" }}
              onClick={(e) => {
                setReply(value);
                setOpenReplyDialog(true);
              }}
            >
              <ImEye style={{ color: "#47799c" }} />
            </Button>
          );
        },
      },
    },
  ];
  const createReplyColumns = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj["from"] = item?.from;
        obj["to"] = item?.to;
        obj["date"] = moment(item?.createdAt).format("DD-MM-YYYY");
        obj["view"] = item;
        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };
  const replysData = createReplyColumns(replys);

  const addNote = () => {
    let data = {
      body: {
        note: note,
        type: "external",
      },
      id: id,
    };
    dispatch(loadingAction({ loading: true }));
    dispatch(addSupplierRequestNote({ data }));
    setNote("");
  };

  const createNoteColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        {
          obj["Note"] = item?.note;
          obj["Date"] = moment(item?.createdAt).format("DD-MM-YYYY hh:mm");
          obj["View"] = item?.note;
        }
        array.push(obj);
        obj = {};
      });

      return array;
    }
  };
  const handleNoteClose = () => {
    setOpenNote(false);
  };
  const noteData = createNoteColumn(notes);
  const noteColumn = [
    {
      name: "Note",
      label: t("SERVICESPAGES.SUPPLIER.NOTE"),
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => {
          return (
            <Typography
              variant="body2"
              component="p"
              className={classes.text}
              style={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
              }}
            >
              {value}{" "}
            </Typography>
          );
        },
      },
    },
    {
      name: "Date",
      label: t("SERVICESPAGES.SUPPLIER.DATE"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "View",
      label: t("SERVICESPAGES.SUPPLIER.VIEWNOTE"),
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value) => {
          return (
            <Button
              style={{ color: "#B2C900", fontSize: 25, marginLeft: "-10px" }}
              onClick={() => {
                setOpenNote(true);
                setDisplayedNote(value);
              }}
            >
              <ImEye />
            </Button>
          );
        },
      },
    },
  ];

  const handleClick = (url, title) => {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", isRTL ? title?.ar : title?.en);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  const phoneRegExp =
    /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
  const positiveNumberRegex =
    /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  let serviceProfile = JSON.parse(sessionStorage.getItem("supplierProfile"));

  useEffect(() => {
    if (serviceProfile && serviceProfile?.email) {
      setEmailFrom(serviceProfile?.email);
      setEmailTo("rakchamber@gmail.com");
    }
  }, [serviceProfile]);

  useEffect(() => {
    if (
      files.uploadFileReturned &&
      files.uploadFileReturned?.success === false
    ) {
      setOpen(true);
      setMessage(` ${files.uploadFileReturned?.message}`);
      setNoThanks(true);
    }
  }, [files.uploadFileReturned]);

  let initialValues = {
    id: data?.id ? data?.id : null,
    name: data?.name ? data?.name : "",
    tradeName: data?.tradeName ? data?.tradeName : "",
    country: data?.country ? data?.country : "",
    emirate: data?.emirate ? data?.emirate : "",
    directorName: data?.directorName ? data?.directorName : "",
    address: data?.address ? data?.address : "",
    phone: data?.phoneNumber ? data?.phoneNumber : null,
    website: data?.website ? data?.website : "",
    email: serviceProfile?.email,
    repMobile: data?.repMobile ? data?.repMobile : null,
    repPhone: data?.repPhone ? data?.repPhone : null,
    licenseNo: data?.licenceNo ? data?.licenceNo : "",
    chamberNo: data?.chamberNo ? data?.chamberNo : "",
    issueDate: data?.issueDate ? data?.issueDate : new Date(),
    licenseInfo: data?.licenceInfo ? data?.licenceInfo : null,
    expiryDate: data?.expireDate ? data?.expireDate : new Date(),
    taxNo: data?.taxRegisteredNo ? data?.taxRegisteredNo : "",
    sponsorName: data?.sponsorName ? data?.sponsorName : "",
    accountName: data?.accountNumber ? data?.accountNumber : "",
    iban: data?.iban ? data?.iban : "",
    accountNo: data?.accountNumber ? data?.accountNumber : "",
    bankName: data?.bankName ? data?.bankName : "",
    branchName: data?.bankBranchName ? data?.bankBranchName : "",
    approvedActivity: data?.approvedActivity ? data?.approvedActivity : [],
    date: data?.date ? data?.date : new Date(),
    code: "",
    signature: [],
    stamp: [],
    suppDate: data?.date ? data?.date : new Date(),
    suppNum: data?.id ? data?.id : null,
    pledgeName: data?.pledgeName ? data?.pledgeName : "",
    pledge: view ? ["pledge"] : [],
    taxRecord: data?.taxRecord ? ["taxRecord"] : [],
    files: [],
    tradeLicence: [],
    chamberMembershipCertificate: [],
    certificateForRegisteriationForVTA: [],
    ownerPassport: [],
    representativePassport: [],
    companyProfile: [],
  };

  const validationSchema = Yup.object({
    tradeName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    email: Yup.string()
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format")
      .required(isRTL ? "مطلوب" : "Required"),
    phone: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير صالح" : "Phone number is not valid"
      )
      .nullable(),
    country: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    emirate: Yup.string().when("country", (country, schema) => {
      if (
        country === "United Arab Emirates" ||
        country === "الإمارات العربية المتحدة"
      ) {
        return schema.required(isRTL ? "مطلوب" : "Required");
      } else {
        return schema;
      }
    }),
    directorName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    address: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    website: Yup.string().test(
      "validLang",
      isRTL ? "يرجى إدخال رابط الموقع بالصيفة الصحيحية" : "Invalid Website URL",
      (value) => (value ? urlRegex.test(value) : englishLangRegex.test(value))
    ),
    repMobile: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير صالح" : "Phone number is not valid"
      )
      .nullable(),
    repPhone: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .matches(
        phoneRegExp,
        isRTL ? "رقم الهاتف غير صالح" : "Phone number is not valid"
      )
      .nullable(),
    licenseNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    chamberNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    issueDate: Yup.date().required(isRTL ? "مطلوب" : "Required"),
    // licenseInfo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    expiryDate: Yup.date()
      .required(isRTL ? "مطلوب" : "Required")
      .when("issueDate", (issueDate, schema) => {
        if (issueDate) {
          return schema.min(
            moment(issueDate),
            isRTL
              ? "تاريخ الانتهاء يجب أن يكون قبل تاريخ الإصدار"
              : "Expiry date Should Be After issue date"
          );
        } else {
          return schema;
        }
      }),
    taxNo: Yup.string().when("taxRecord", (taxRecord, schema) => {
      if (taxRecord?.length > 0) {
        return schema.required(isRTL ? "مطلوب" : "Required");
      } else {
        return schema;
      }
    }),
    accountName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    iban: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    accountNo: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    bankName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    branchName: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    code: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    pledge: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    tradeLicence: !view && Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    chamberMembershipCertificate:
      !view && Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    certificateForRegisteriationForVTA:
      (!view ||
        (view &&
          !data?.files?.filter(
            (item) =>
              item?.title?.en === "Copy of Certificate of registration for VAT "
          )?.length)) &&
      Yup.array().when("taxRecord", (taxRecord, schema) => {
        if (taxRecord?.length > 0) {
          return schema.min(1, isRTL ? "مطلوب" : "Required");
        } else {
          return schema;
        }
      }),
    ownerPassport: !view && Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
    representativePassport:
      !view && Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    let supplierProfile = JSON.parse(sessionStorage.getItem("supplierProfile"));

    if (supplierProfile && supplierProfile?.email) {
      const readyValues = {
        id: values?.id,
        directorName: values.directorName,
        email: supplierProfile?.email,
        phoneNumber: values.phone,
        tradeName: values.tradeName,
        website: values.website,
        country: values.country,
        emirate: values.emirate,
        address: values.address,
        fax: values.fax,
        repPhone: values.repPhone,
        repMobile: values.repMobile,
        licenceNo: values.licenseNo,
        issueDate: values.issueDate,
        chamberNo: values.chamberNo,
        licenceInfo: values.licenseInfo,
        taxRegisteredNo: values?.taxRecord?.length > 0 ? values.taxNo : null,
        sponsorName:
          values?.licenseInfo === "registeredWithSponsor"
            ? values?.sponsorName
            : "",
        approvedActivity: values.approvedActivity,
        accountName: values.accountName,
        accountNumber: values.accountNo,
        iban: values.iban,
        bankName: values.bankName,
        bankBranchName: values.branchName,
        date: values.date,
        expireDate: values.expiryDate,
        pledgeName: values?.pledgeName,
        tradeLicence: values.tradeLicence,
        chamberMembershipCertificate: values.chamberMembershipCertificate,
        certificateForRegisteriationForVTA:
          values.certificateForRegisteriationForVTA,
        ownerPassport: values.ownerPassport,
        companyProfile: values.companyProfile,
        signature: values?.signature,
        stamp: values?.stamp,
        representativePassport: values?.representativePassport,
        taxRecord: values?.taxRecord?.length > 0 ? true : false,
      };
      dispatch(postSupplierForm({ data: { ...readyValues } }));
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
    // resetForm({});
  };
  const sessionToken = sessionStorage.getItem("supplierProfile");

  useEffect(() => {
    // dispatch(loadingAction({ loading: true }));
    let sort = "notification/mine";
    dispatch(getNotifications({ sort }));
  }, [isRTL]);

  useEffect(() => {
    const interval = setInterval(() => {
      let sort = "notification/mine";
      dispatch(getNotifications({ sort }));
    }, 180000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (id) dispatch(getSupplierRequestNotes({ id }));
  }, [id]);

  useEffect(() => {
    let seenArray = [];
    if (
      reducers?.crudReducers?.allNotificationsReturned?.notifications &&
      reducers?.crudReducers?.allNotificationsReturned?.notifications.length > 0
    ) {
      setAllNotification(
        reducers?.crudReducers?.allNotificationsReturned?.notifications
      );

      reducers?.crudReducers?.allNotificationsReturned?.notifications?.map(
        (item) => (!item.seenByUSer ? seenArray.push(item) : null)
      );
      setNotSeen(seenArray.length);
    }
    if (reducers?.crudReducers?.allReturned?.mineSupplierRequest) {
      setData(reducers?.crudReducers?.allReturned?.mineSupplierRequest);
      let id = reducers?.crudReducers?.allReturned?.mineSupplierRequest?.id;
      setId(id);
      dispatch(loadingAction({ loading: false }));
    }
    if (
      reducers?.crudReducers?.allSupplierNotesReturned?.notes &&
      reducers?.crudReducers?.allSupplierNotesReturned?.notes?.length
    ) {
      setNotes(reducers?.crudReducers?.allSupplierNotesReturned?.notes);
    }
    if (
      reducers?.crudReducers?.allReturned?.replays &&
      reducers?.crudReducers?.allReturned?.replays.length > 0
    )
      setReplys(reducers?.crudReducers?.allReturned?.replays);
    if (reducers?.crudReducers?.created) {
      setOpen(true);
      setMessage(
        isRTL
          ? "تم إرسال الرد الخاص بك بنجاح"
          : "Your Reply has been sent Successfully."
      );
      setNoThanks(true);
      dispatch(
        getAll({
          sort: `service/request/${data?.id}/replays`,
          supplierToken: true,
        })
      );
      dispatch(
        getAll({ sort: "service/request/supplier/mine", supplierToken: true })
      );
      handleReplyDataClose();
      dispatch(created({ response: false }));
    }
  }, [
    reducers?.crudReducers?.allSupplierNotesReturned?.notes,
    reducers?.crudReducers?.allReturned,
    reducers?.crudReducers?.created,
    reducers?.services?.notificationMarked,
  ]);

  useEffect(() => {
    if (
      reducers?.crudReducers?.allNotesReturned &&
      reducers?.crudReducers?.allNotesReturned?.length
    ) {
      dispatch(loadingAction({ loading: false }));
      setNotes(reducers?.crudReducers?.allNotesReturned);
    }
  }, [reducers?.crudReducers?.allNotesReturned]);

  useEffect(() => {
    if (reducers?.crudReducers?.addSupplierRequestNoteDone && id) {
      dispatch(loadingAction({ loading: true }));
      dispatch(getSupplierRequestNotes({ id }));
    }
  }, [reducers?.crudReducers?.addSupplierRequestNoteDone, id]);

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear && !sessionToken) {
      setOpen(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    } else if (!clear && !sessionToken) store.dispatch(push("/login"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    if (files.fileCreated && files.fileCreated?.success === false) {
      setOpen(true);
      setMessage(`${files.fileCreated?.file} ${files.fileCreated?.message}`);
      setNoThanks(true);
    }
  }, [files.fileCreated]);

  useEffect(() => {
    const result = services.supplierFormReturned;
    if (result.success) {
      setOpen(true);
      setNoThanks(false);
      data?.id
        ? setMessage(
            isRTL
              ? ` تم تحديث طلبك الذي يحمل الرقم  ${result.id} بنجاح `
              : `Your Application with Number ${result.id} has been Updated Successfully.`
          )
        : setMessage(
            isRTL
              ? ` رقم طلبك هو ${result.id} `
              : `Your Application Number is ${result.id} .`
          );
      sessionStorage?.setItem("haveRequest", true);
      setTimeout(() => {
        store.dispatch(
          push("/services-form/supplier-services/Supplier Registration/view")
        );
      }, 7000);
    } else {
      if (result.code === 0) {
        setDisabledBtn(false);
        setOpen(true);
        setNoThanks(true);
        setMessage(isRTL ? `خطأ في السيرفر` : `Internal Server Error.`);
      }
      if (result.success === false) {
        setDisabledBtn(false);
        setOpen(true);
        setNoThanks(true);
        setMessage(result?.message);
      }
    }
    if (Object.keys(services.supplierFormReturned).length)
      dispatch(postSupplierFormReturned({ data: {} }));
  }, [services.supplierFormReturned]);
  let date = new Date();

  const replyInitialValues = {
    from: emailFrom,
    to: emailTo,
    subject: "",
    message: "",
    replyFiles: [],
    requestId: null,
  };
  let replyValidationSchema = Yup.object({
    from: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"),
    to: Yup.string()
      .required(isRTL ? "مطلوب" : "Required")
      .email(isRTL ? "صيغة إيميل خاطئة" : "Invalid email format"),
    subject: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    message: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });
  const sendReply = async (values) => {
    values["requestId"] = parseInt(data?.id);
    let payload = values;
    let sort = "replay/user";
    dispatch(loadingAction({ loading: true }));
    dispatch(createNew({ payload, sort }));
  };
  const getStatus = (status) => {
    switch (status) {
      case "fullyApproved":
        return isRTL ? "تم اعتماده" : "Approved";
      case "fullyRejected":
        return isRTL ? "تم رفضه " : "Rejected";
      default:
        return status;
    }
  };
  return (
    <Box className={classes.supplierRoot}>
      <Box display="block" justifyContent="center" className={classes.status}>
        <Box position="relative">
          {data ? (
            <Typography className={classes.requestDate}>
              {t("LABEL.ID")}
              {data?.id}
            </Typography>
          ) : null}
          <Box onClick={(e) => setVisible(false)}>
            <Typography className={classes.status}>
              {t("SERVICESPAGES.SIGNUP.TIMELINE")}
            </Typography>
            <Stepper
              activeStep={
                !view ? 0 : view ? 1 : data?.managerResponse ? 2 : null
              }
              alternativeLabel
              className={classes.stepper}
            >
              <Step completed={view}>
                <StepLabel>{t("SERVICESPAGES.SIGNUP.APPLY")}</StepLabel>
              </Step>
              <Step completed={data?.mangerResponse}>
                <StepLabel>{t("SERVICESPAGES.SIGNUP.PENDING")}</StepLabel>
              </Step>
              <Step completed={data?.mangerResponse}>
                <StepLabel error={data?.mangerResponse === false}>
                  {data?.mangerResponse
                    ? t("SERVICESPAGES.SIGNUP.APPROVED")
                    : data?.mangerResponse === false
                    ? t("SERVICESPAGES.SIGNUP.REJECTED")
                    : t("SERVICESPAGES.SIGNUP.APPROVE")}
                </StepLabel>
              </Step>
            </Stepper>
          </Box>
          {view && (
            <>
              <Box className={classes.badgeBox}>
                <FiEdit
                  className={
                    !data?.acceptOwnerUpdates
                      ? clsx(classes.disabledIcon, classes.marginRight16)
                      : clsx(classes.bell, classes.marginRight16)
                  }
                  onClick={(e) =>
                    data?.acceptOwnerUpdates ? setUpdateReq(true) : null
                  }
                />
                <Badge badgeContent={notSeen}>
                  <GoBell
                    className={
                      notSeen !== 0
                        ? clsx(classes.bell, classes.animation)
                        : classes.bell
                    }
                    onClick={(e) => {
                      let idsArray = [];
                      allNotifications.map((item) => idsArray.push(item.id));
                      let sort = "notification/mine";
                      dispatch(markNotification({ data: idsArray }));
                      dispatch(getNotifications({ sort }));
                      setVisible(!visible);
                    }}
                  />
                </Badge>
                {visible ? <List items={allNotifications} /> : null}
              </Box>
            </>
          )}
        </Box>
        <Box>
          <Box className={clsx(classes.relative, classes.dateBoxHeight)}>
            <Typography className={classes.requestDate}>
              {data
                ? moment(data?.date).format("DD-MM-YYYY")
                : moment(date).format("DD-MM-YYYY")}
            </Typography>
          </Box>
          {(data?.innerStatus === "fullyApproved" ||
            data?.innerStatus === "fullyRejected") && (
            <Box>{getStatus(data?.innerStatus)}</Box>
          )}
        </Box>
      </Box>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize={view ? true : false}
      >
        {({
          isValid,
          dirty,
          values,
          submitForm,
          setFieldValue,
          setFieldTouched,
          setFieldError,
          errors,
          touched,
        }) => (
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
                <RiContactsLine className={classes.address} />
                <Typography>{t("SERVICESPAGES.SUPPLIER.DETAILS")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="tradeName"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.NAME")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="tradeName"
                      name="tradeName"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="directorName"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.DIRECTOR")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="directorName"
                      name="directorName"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="phone"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.FORMS.FORM.PHONE")}
                    </InputLabel>
                    <Field
                      component={PhoneInput}
                      name="phone"
                      type="text"
                      id="phone"
                      value={values?.phone}
                      labels={isRTL ? arLabels : enLabels}
                      className={classes.phone}
                      onChange={(e) => {
                        setFieldValue("phone", e);
                        if (e) {
                          if (!isValidPhoneNumber(e)) {
                            setFieldTouched("phone", true);
                            setFieldError(
                              "phone",
                              isRTL
                                ? "يرجى إضافة رقم الهاتف"
                                : "Please Add Phone Number"
                            );
                          }
                        }
                      }}
                      disabled={!updateReq}
                      variant="outlined"
                      placeholder={t("SERVICESPAGES.SUPPLIER.PHONETEXT")}
                      defaultCountry="AE"
                      international
                    />
                    {errors?.phone && touched?.phone ? (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        {errors?.phone}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel htmlFor="website" className={classes.label}>
                      {t("SERVICESPAGES.SUPPLIER.SITE")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="website"
                      name="website"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                    <span className={classes.helperText}>
                      {t("SERVICESPAGES.SUPPLIER.WEBSITE")}
                    </span>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="country"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.COUNTRY")}
                    </InputLabel>
                    <Field
                      component={Select}
                      className={classes.textField}
                      disabled={!updateReq}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "top",
                          horizontal: isRTL ? "right" : "left",
                        },
                        getContentAnchorEl: null,
                      }}
                      id="country"
                      name="country"
                      variant="outlined"
                    >
                      {Countries?.map((item, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={item?.enTitle}
                            style={{ direction: isRTL ? "rtl" : "ltr" }}
                            className={classes.menuItem}
                          >
                            {isRTL ? item?.arTitle : item?.enTitle}
                          </MenuItem>
                        );
                      })}
                    </Field>{" "}
                    {errors.country && touched.country ? (
                      <div className={classes.inputfeedback}>
                        {errors.country}
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="address"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.AMEND.ADRESS")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="address"
                      name="address"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>
                  {(values?.country === "United Arab Emirates" ||
                    values?.country === "الإمارات العربية المتحدة") && (
                    <Grid item md={6} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="emirate"
                        className={classes.label}
                        required
                      >
                        {t("SERVICESPAGES.SUPPLIER.EMIRATE")}
                      </InputLabel>
                      <Field
                        component={Select}
                        className={classes.textField}
                        disabled={!updateReq}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "top",
                            horizontal: isRTL ? "right" : "left",
                          },
                          getContentAnchorEl: null,
                        }}
                        id="emirate"
                        name="emirate"
                        variant="outlined"
                      >
                        {AllEmirates?.map((emirate, idx) => {
                          return (
                            <MenuItem
                              key={idx}
                              value={emirate}
                              style={{ direction: isRTL ? "rtl" : "ltr" }}
                              className={classes.menuItem}
                            >
                              {emirate}
                            </MenuItem>
                          );
                        })}
                      </Field>{" "}
                      {errors.emirate && touched.emirate ? (
                        <div className={classes.inputfeedback}>
                          {errors.emirate}
                        </div>
                      ) : null}
                    </Grid>
                  )}
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="email"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.FORMS.FORM.EMAIL")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="email"
                      name="email"
                      variant="outlined"
                      disabled={true}
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
                <BiMessageSquareDetail className={classes.address} />
                <Typography>
                  {t("SERVICESPAGES.SUPPLIER.REPRESENTTITLE")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="repMobile"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.MOBILE")}
                    </InputLabel>
                    <Field
                      component={PhoneInput}
                      name="repMobile"
                      type="text"
                      id="repMobile"
                      value={values?.repMobile}
                      labels={isRTL ? arLabels : enLabels}
                      className={classes.phone}
                      onChange={(e) => {
                        setFieldValue("repMobile", e);
                        if (e) {
                          if (!isValidPhoneNumber(e)) {
                            setFieldTouched("repMobile", true);
                            setFieldError(
                              "repMobile",
                              isRTL
                                ? "يرجى إضافة رقم الهاتف"
                                : "Please Add Phone Number"
                            );
                          }
                        }
                      }}
                      disabled={!updateReq}
                      variant="outlined"
                      placeholder={t("SERVICESPAGES.SUPPLIER.PHONETEXT")}
                      defaultCountry="AE"
                      international
                    />
                    {errors?.repMobile && touched?.repMobile ? (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        {errors?.repMobile}
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="repPhone"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.FORMS.FORM.PHONE")}
                    </InputLabel>
                    <Field
                      component={PhoneInput}
                      name="repPhone"
                      type="text"
                      id="repPhone"
                      value={values?.repPhone}
                      labels={isRTL ? arLabels : enLabels}
                      className={classes.phone}
                      onChange={(e) => {
                        setFieldValue("repPhone", e);
                        if (e) {
                          if (!isValidPhoneNumber(e)) {
                            setFieldTouched("repPhone", true);
                            setFieldError(
                              "repPhone",
                              isRTL
                                ? "يرجى إضافة رقم الهاتف"
                                : "Please Add Phone Number"
                            );
                          }
                        }
                      }}
                      disabled={!updateReq}
                      variant="outlined"
                      placeholder={t("SERVICESPAGES.SUPPLIER.PHONETEXT")}
                      defaultCountry="AE"
                      international
                    />
                    {errors?.repPhone && touched?.repPhone ? (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        {errors?.repPhone}
                      </div>
                    ) : null}
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
                <BsInfoSquare className={classes.address} />
                <Typography>{t("SERVICESPAGES.SUPPLIER.LICENSE")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="licenseNo"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.LICNO")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="licenseNo"
                      name="licenseNo"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="chamberNo"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.CHAMBERNO")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="chamberNo"
                      name="chamberNo"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>

                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="issueDate"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SUPPLIER.ISSUEDATE")}
                    </InputLabel>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        component={DatePicker}
                        className={classes.supplierDate}
                        variant="outlined"
                        name="issueDate"
                        showTodayButton="true"
                        id="issueDate"
                        views={["year", "date", "month"]}
                        format="dd-MM-yyyy"
                        disabled={!updateReq}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <MdDateRange className={classes.dateIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="expiryDate"
                      className={classes.label}
                      required
                    >
                      {t("SERVICESPAGES.SIDEMENU.EXPIRE")}
                    </InputLabel>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Field
                        component={DatePicker}
                        className={classes.supplierDate}
                        variant="outlined"
                        name="expiryDate"
                        showTodayButton="true"
                        id="expiryDate"
                        views={["year", "date", "month"]}
                        format="dd-MM-yyyy"
                        disabled={!updateReq}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <MdDateRange className={classes.dateIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid
                    item
                    md={6}
                    xs={12}
                    className={clsx(
                      classes.check,
                      classes.blockCheckbox,
                      classes.centerCheckBox
                    )}
                  >
                    <InputLabel
                      className={clsx(classes.label, classes.biggerLabel)}
                    >
                      <Field
                        type="checkbox"
                        component={Checkbox}
                        name="taxRecord"
                        value="taxRecord"
                        disabled={!updateReq}
                      />
                      {t("SERVICESPAGES.SUPPLIER.HAVETAX")}
                    </InputLabel>
                  </Grid>
                  <Grid item md={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="taxNo"
                      className={classes.label}
                      required={values?.taxRecord?.length ? true : false}
                    >
                      {t("SERVICESPAGES.SUPPLIER.TAX")}
                    </InputLabel>

                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="taxNo"
                      name="taxNo"
                      variant="outlined"
                      disabled={!updateReq || !values?.taxRecord?.length}
                    />
                  </Grid>

                  <Grid item xs={12} className={classes.inpuContainer}>
                    <InputLabel htmlFor="licenseInfo" className={classes.label}>
                      {t("SERVICESPAGES.SUPPLIER.LICENSE")}
                    </InputLabel>

                    <Box display="flex" className={classes.licenceInfoButtons}>
                      <label>
                        <Field
                          type="radio"
                          name="licenseInfo"
                          value="individualFoundation"
                          disabled={!updateReq}
                        />
                        {t("SERVICESPAGES.SUPPLIER.INDIVIDUAL")}
                      </label>
                      <label label>
                        <Field
                          type="radio"
                          name="licenseInfo"
                          value="company"
                          disabled={!updateReq}
                        />
                        {t("SERVICESPAGES.SUPPLIER.COMPANY")}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="licenseInfo"
                          value="rakSme"
                          disabled={!updateReq}
                        />
                        {t("SERVICESPAGES.SUPPLIER.RAK")}
                      </label>
                      <label>
                        <Field
                          type="radio"
                          name="licenseInfo"
                          value="registeredWithSponsor"
                          disabled={!updateReq}
                        />
                        {t("SERVICESPAGES.SUPPLIER.SUPPORTREG")}
                      </label>
                    </Box>
                  </Grid>
                  {values?.licenseInfo === "registeredWithSponsor" && (
                    <Grid item md={4} xs={12} className={classes.inpuContainer}>
                      <InputLabel
                        htmlFor="sponsorName"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.SUPPLIER.SPONSORNAME")}
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="sponsorName"
                        name="sponsorName"
                        variant="outlined"
                        disabled={!updateReq}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="approvedActivity"
                      className={classes.label}
                    >
                      {t("SERVICESPAGES.SUPPLIER.APPROV")}
                    </InputLabel>
                    <Field
                      component={Autocomplete}
                      id="approvedActivity"
                      name="approvedActivity"
                      value={values?.approvedActivity}
                      options={Activities}
                      freeSolo={false}
                      multiple
                      disabled={!updateReq}
                      filterSelectedOptions={true}
                      getOptionSelected={(options, selectedSections) => {
                        return selectedSections?.value === options.value;
                      }}
                      renderOption={(option, { selected }) => (
                        <React.Fragment>
                          {isRTL ? option?.ar : option?.en}
                        </React.Fragment>
                      )}
                      getOptionLabel={(option) =>
                        isRTL ? option?.ar : option?.en
                      }
                      onChange={(e, value) => {
                        setFieldValue("approvedActivity", value);
                      }}
                      renderInput={(params) => (
                        <TextField2 {...params} variant="outlined" fullWidth />
                      )}
                      PaperComponent={({ children }) => (
                        <Paper
                          style={{
                            textTransform: "capitalize",
                            direction: isRTL ? "rtl" : "ltr",
                          }}
                        >
                          {children}
                        </Paper>
                      )}
                    />
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
                <RiBankLine className={classes.address} />
                <Typography>
                  {t("SERVICESPAGES.SUPPLIER.BANKDETAILS")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid container xs={12}>
                    <Grid
                      container
                      item
                      md={6}
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="accountName"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SUPPLIER.ACCNAME")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="accountName"
                          name="accountName"
                          variant="outlined"
                          disabled={!updateReq}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      md={6}
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="iban"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SUPPLIER.IBAN")}{" "}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="iban"
                          name="iban"
                          variant="outlined"
                          disabled={!updateReq}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid
                      container
                      item
                      md={6}
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="accountNo"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SUPPLIER.ACCNUM")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="accountNo"
                          name="accountNo"
                          variant="outlined"
                          disabled={!updateReq}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      item
                      md={6}
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="bankName"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SUPPLIER.BANKNAME")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="bankName"
                          name="bankName"
                          variant="outlined"
                          disabled={!updateReq}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={12}>
                    <Grid
                      container
                      item
                      md={6}
                      xs={12}
                      className={classes.inpuContainer}
                    >
                      <Grid item xs={12} md={3}>
                        <InputLabel
                          htmlFor="branchName"
                          className={classes.label}
                          required
                        >
                          {t("SERVICESPAGES.SUPPLIER.BRANCH")}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <Field
                          component={TextField}
                          className={classes.textField}
                          id="branchName"
                          name="branchName"
                          variant="outlined"
                          disabled={!updateReq}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded7}
              onChange={() => setExpanded7(!expanded7)}
              className={classes.accordionStep}
            >
              <AccordionSummary
                expandIcon={expanded7 ? <Remove /> : <Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <BsInfoSquare className={classes.address} />
                <Typography>{t("SERVICESPAGES.SUPPLIER.PLEDGE")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={1}>
                  <Grid
                    item
                    xs={12}
                    className={clsx(classes.check, classes.blockCheckbox)}
                  >
                    <InputLabel
                      className={clsx(classes.label, classes.biggerLabel)}
                      required
                    >
                      <Field
                        type="checkbox"
                        component={Checkbox}
                        name="pledge"
                        value="pledge"
                        disabled={!updateReq}
                      />
                      {t("SERVICESPAGES.SUPPLIER.PLEDGETEXT")}
                    </InputLabel>
                  </Grid>
                  <Grid item xs={12} className={classes.inpuContainer}>
                    <InputLabel htmlFor="pledgeName" className={classes.label}>
                      {t("SERVICESPAGES.SUPPLIER.PLEDGENAME")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      id="pledgeName"
                      name="pledgeName"
                      variant="outlined"
                      disabled={!updateReq}
                    />
                  </Grid>
                  {(!view || updateReq) && (
                    <Grid
                      container
                      item
                      xs={12}
                      className={classes.inpuContainer}
                      spacing={2}
                    >
                      <Grid item xs={6} className={classes.inpuContainer}>
                        <InputLabel
                          htmlFor="signature"
                          className={classes.label}
                        >
                          {t("SERVICESPAGES.SUPPLIER.SIGNATURE")}
                        </InputLabel>
                        <DropZone
                          acceptedFiles={[".png", ".jpg"]}
                          name="signature"
                          showFileNames={true}
                          onChange={(e) => setFieldValue("signature", e)}
                          disabled={!updateReq}
                          helperText={t(
                            "SERVICESPAGES.SUPPLIER.SIGNATUREHELPERTEXT"
                          )}
                          maxFileSize={26000000}
                          filesLimit={1}
                          dropzoneText={t("SERVICESPAGES.SUPPLIER.DRAGIMG")}
                          page={"supplier"}
                        />
                      </Grid>
                      <Grid item xs={6} className={classes.inpuContainer}>
                        <InputLabel htmlFor="stamp" className={classes.label}>
                          {t("SERVICESPAGES.SUPPLIER.COSTAMP")}
                        </InputLabel>
                        <DropZone
                          acceptedFiles={[".png", ".jpg"]}
                          name="stamp"
                          showFileNames={true}
                          onChange={(e) => setFieldValue("stamp", e)}
                          disabled={!updateReq}
                          helperText={t(
                            "SERVICESPAGES.SUPPLIER.SIGNATUREHELPERTEXT"
                          )}
                          maxFileSize={26000000}
                          filesLimit={1}
                          dropzoneText={t("SERVICESPAGES.SUPPLIER.DRAGIMG")}
                          page={"supplier"}
                        />
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
            {(!view || updateReq) && (
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
                  <RiAttachmentLine className={classes.address} />

                  <Typography>
                    {t("SERVICESPAGES.ADDITIONALREQ.ATTACHMENT")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid container xs={12}>
                      {(!view || updateReq) &&
                        requiredAttachments.map((attch) => (
                          <Grid
                            container
                            item
                            className={classes.inpuContainer}
                          >
                            <Grid item xs={12} md={6}>
                              <InputLabel
                                htmlFor={attch.key}
                                className={classes.label}
                              >
                                {attch.title}
                                {attch.isRequired && (
                                  <span style={{ color: "red" }}>*</span>
                                )}
                              </InputLabel>
                              <DropZone
                                acceptedFiles={[".pdf"]}
                                name={attch.key}
                                showFileNames={true}
                                Icon={MdAttachFile}
                                filesLimit={1}
                                onChange={(e) => setFieldValue(attch.key, e)}
                                helperText={t("HOME.SERVICES.FILEHELPERTEXT")}
                                page={"supplier"}
                              />
                            </Grid>
                          </Grid>
                        ))}
                      <Grid container item className={classes.inpuContainer}>
                        <Grid item xs={12} md={6}>
                          <InputLabel
                            htmlFor={"certificateForRegisteriationForVTA"}
                            className={classes.label}
                          >
                            {isRTL
                              ? "نسخة من شهادة التسجيل في ضريبة القيمة المضافة"
                              : "Copy of Certificate of registration for VAT "}
                            {values.taxRecord?.length > 0 && (
                              <span style={{ color: "red" }}>*</span>
                            )}
                          </InputLabel>
                          <DropZone
                            acceptedFiles={[".pdf"]}
                            name={"certificateForRegisteriationForVTA"}
                            showFileNames={true}
                            Icon={MdAttachFile}
                            filesLimit={1}
                            onChange={(e) =>
                              setFieldValue(
                                "certificateForRegisteriationForVTA",
                                e
                              )
                            }
                            helperText={t("HOME.SERVICES.FILEHELPERTEXT")}
                            page={"supplier"}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            )}
            {view && (
              <>
                <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                  className={classes.tabs}
                >
                  <Tab label={t("SERVICESPAGES.SUPPLIER.ATTACHMENTS")} />
                  <Tab label={t("SERVICESPAGES.SUPPLIER.REPLY")} />
                  <Tab label={t("SERVICESPAGES.SUPPLIER.NOTES")} />
                </Tabs>
                <TabPanel value={value} index={0} className="tabCon">
                  <Fragment>
                    <MUIDataTable
                      className={classes.table}
                      data={newData}
                      columns={columns}
                      options={options}
                    />
                  </Fragment>
                </TabPanel>
                <TabPanel value={value} index={1} className="tabCon">
                  <Fragment>
                    <MUIDataTable
                      className={classes.table}
                      data={replysData}
                      columns={replyColumn}
                      options={options}
                    />
                    <Button
                      color="primary"
                      className={classes.send}
                      variant="contained"
                      onClick={handleModalOpen}
                      endIcon={<FiMessageSquare />}
                    >
                      {t("OPENDATA.PAGE.TABLEHEAD.REPLY")}
                    </Button>
                  </Fragment>
                </TabPanel>
                <TabPanel value={value} index={2} className="tabCon">
                  <Fragment>
                    <MUIDataTable
                      className={classes.table}
                      data={noteData}
                      columns={noteColumn}
                      options={options}
                    />
                    <Box className="addNote">
                      <textarea
                        placeHolder={t("SERVICESPAGES.SUPPLIER.ADDYOURNOTE")}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <Box display="flex"></Box>

                      <Button
                        className="addBtn"
                        variant="contained"
                        disabled={note?.replace(/\s+/g, "") == ""}
                        onClick={addNote}
                      >
                        {t("SERVICESPAGES.SUPPLIER.ADDNOTE")}
                      </Button>
                    </Box>
                  </Fragment>
                </TabPanel>
              </>
            )}
            {(!view || updateReq) && (
              <Grid item xs={12} className={classes.controlLabel}>
                <Captcha onChange={(value) => setFieldValue(`code`, value)} />
              </Grid>
            )}
            {(!view || updateReq) && (
              <>
                <Button
                  variant="contained"
                  disableElevation
                  className={classes.send}
                  endIcon={<IoLogIn />}
                  onClick={() => {
                    setDisabledBtn(true);
                    submitForm();
                  }}
                  disabled={!isValid || !dirty || disabledBtn}
                >
                  {view
                    ? t("SERVICESPAGES.SUPPLIER.UPDATE")
                    : t("SERVICESPAGES.SUPPLIER.SUBMIT")}{" "}
                </Button>
                {errors?.files ? (
                  <div className={classes.error}>{errors?.files}</div>
                ) : null}
              </>
            )}{" "}
            <ServicesResultModal
              open={open}
              setOpen={setOpen}
              message={message}
              routing={routing}
              noThanks={noThanks}
            />
          </Form>
        )}
      </Formik>
      <Dialog
        maxWidth="md"
        open={openReplyData}
        aria-labelledby="form-dialog-title"
        className={classes.replyDialog}
        style={{
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <DialogTitle id="form-dialog-title">
          <Typography className="label3">{t("HOME.SERVICES.REPLY")}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleReplyDataClose}
            className={classes.closeBtn}
          >
            <AiOutlineCloseCircle style={{ color: "#47799c" }} />
          </IconButton>
        </DialogTitle>
        <Formik
          initialValues={replyInitialValues}
          validationSchema={replyValidationSchema}
          onSubmit={sendReply}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(formik) => (
            <>
              <DialogContent>
                <Grid container spacing={3}>
                  <Grid item sm={6}>
                    <InputLabel
                      htmlFor="title"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.SENDTO")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="email"
                      value={emailTo}
                      name="to"
                      disabled={true}
                      className={classes.textField}
                      fullWidth
                      // onChange={(e) => setEmailTo(e.target.value)}
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <InputLabel
                      htmlFor="title"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.SENDFROM")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      type="email"
                      name="from"
                      value={emailFrom}
                      disabled={true}
                      fullWidth
                      className={classes.textField}
                      onChange={(e) => setEmailFrom(e.target.value)}
                    />
                  </Grid>
                  <Grid item sm={6} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="title"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.SUBJECT")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      className={classes.textField}
                      name="subject"
                      variant="outlined"
                      type="text"
                      value={formik.values.subject}
                      onChange={(e) =>
                        formik.setFieldValue("subject", e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item sm={6}>
                    <InputLabel
                      htmlFor="title"
                      className={clsx(classes.label, classes.marginBottom22)}
                    >
                      {t("HOME.SERVICES.ATT")}
                    </InputLabel>
                    <Box display="flex" alignItems="center">
                      <DropZone
                        acceptedFiles={[".pdf"]}
                        name="replyFiles"
                        showFileNames={true}
                        Icon={MdAttachFile}
                        filesLimit={10}
                        onChange={(e) => formik.setFieldValue("replyFiles", e)}
                        helperText={t("HOME.SERVICES.FILEHELPERTEXT")}
                        page={"replay"}
                      />
                    </Box>
                  </Grid>
                  <Grid item sm={12}>
                    <InputLabel
                      htmlFor="title"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.MESSAGE")}
                    </InputLabel>
                    <Field
                      className={classes.textEditor}
                      component={TextField}
                      name="message"
                      type="text"
                      id="message"
                      multiline={true}
                      variant="outlined"
                      rows={"8"}
                      style={{ width: "100%" }}
                      value={formik.values.message}
                      onChange={(e) =>
                        formik.setFieldValue("message", e.target.value)
                      }
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions
                style={{
                  justifyContent: "center",
                  marginTop: "15px",
                  marginBottom: "25px",
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <Button
                  onClick={handleReplyDataClose}
                  className={classes.grayBtn}
                  endIcon={<ImCancelCircle />}
                >
                  {t("HOME.SERVICES.CANCEL")}
                </Button>

                <Button
                  onClick={(e) => {
                    formik.submitForm();
                    setReplyClicked(true);
                  }}
                  color="primary"
                  className={classes.send}
                  endIcon={<IoLogIn />}
                >
                  {t("HOME.SERVICES.SEND")}
                </Button>
              </DialogActions>
            </>
          )}
        </Formik>
      </Dialog>

      <Dialog
        maxWidth="md"
        open={openReplyDialog}
        aria-labelledby="form-dialog-title"
        className={classes.replyDialog}
        style={{
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        <DialogTitle id="form-dialog-title">
          <Typography className="label3">{t("HOME.SERVICES.REPLY")}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleReplyClose}
            className={classes.closeBtn}
          >
            <AiOutlineCloseCircle style={{ color: "#47799c" }} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <Typography className={classes.label}>
                {t("HOME.SERVICES.SENDTO")}
              </Typography>
              <TextField2
                type="email"
                name="to"
                variant="outlined"
                value={reply?.to}
                disabled={true}
                className={classes.textField}
                fullWidth
                onChange={(e) => setEmailTo(e.target.value)}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography className={classes.label}>
                {t("HOME.SERVICES.SENDFROM")}
              </Typography>
              <TextField2
                type="email"
                name="from"
                variant="outlined"
                value={reply?.from}
                disabled={true}
                fullWidth
                className={classes.textField}
                onChange={(e) => setEmailFrom(e.target.value)}
              />
            </Grid>
            <Grid item sm={6}>
              <Typography className={classes.label}>
                {t("HOME.SERVICES.SUBJECT")}
              </Typography>
              <TextField2
                variant="outlined"
                className={classes.textField}
                fullWidth
                type="text"
                value={reply?.subject}
                disabled={true}
                // onChange={(e) => setSubject(e.target.value)}
              />{" "}
            </Grid>
            <Grid item sm={12}>
              <Typography className={classes.label}>
                {t("HOME.SERVICES.MESSAGE")}
              </Typography>
              <Box className={classes.messageBox}>
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.text}
                  dangerouslySetInnerHTML={{ __html: `${reply?.message}` }}
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{
            justifyContent: "center",
            marginTop: "15px",
            marginBottom: "25px",
            flexDirection: isRTL ? "row-reverse" : "row",
          }}
        >
          <Button
            onClick={handleReplyClose}
            className={classes.grayBtn}
            endIcon={<ImCancelCircle />}
          >
            {t("HOME.SERVICES.CANCEL")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        maxWidth="md"
        open={openNote}
        aria-labelledby="form-dialog-title"
        style={{ direction: isRTL ? "rtl" : "ltr" }}
        className={classes.replyDialog}
      >
        <DialogTitle id="form-dialog-title">
          <Typography className="label3">
            {t("SERVICESPAGES.SUPPLIER.NOTE")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            style={{
              minWidth: 500,
            }}
          >
            <Grid item xs={12}>
              <Typography
                className={clsx(classes.messageInput, classes.bolderInput)}
              >
                {displayedNote}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleNoteClose}
            color="primary"
            className={classes.closeButton}
          >
            {t("SERVICESPAGES.SUPPLIER.CLOSE")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default memo(SupplierForm);
