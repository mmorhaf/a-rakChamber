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
  Typography,
} from "@material-ui/core";
import { Add, Receipt, Remove } from "@material-ui/icons";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Checkbox, Select, TextField } from "formik-material-ui";
import moment from "moment";
import React, { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsInfoSquare } from "react-icons/bs";
import { HiSave } from "react-icons/hi";
import { RiAttachmentLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import actions from "../../../../../redux/actions";
import { store } from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import HappinessMetter from "../../../../floatingSocialButtons/HappinessMetter";
import ServicesResultModal from "../../ServicesResultModal";
import { editingInitialValues } from "../forms/EditingInitialValue";
import ServiceStep from "../../steps/ServiceSteps";
import { PRODUCTION } from "../../../../../constants/config.json";
import { CiFaceSmile } from "react-icons/ci";
import clsx from "clsx";

const {
  getRatificationType,
  getRatificationDocType,
  sendRatificationUpdateRequest,
  sendRatificationUpdateRequestDone,
  sendCooAttachments,
  uploadRakFile,
  uploadRakFileDone,
  getRatificationRequestData,
  getRatificationAttachData,
  sendDeletedAttachments,
  getServiceStep,
} = actions;

function RatificationRequest(props) {
  const { t } = useTranslation();
  const componentRef = useRef();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [ratificationType, setRatificationType] = useState([]);
  const [ratificationDocType, setRatificationDocType] = useState([]);
  const [ratificationData, setRatificationData] = useState([]);
  const [ratificationAttach, setRatificationAttach] = useState([]);
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [requiredAttachments, setRequiredAttchments] = useState([
    {
      titleAr: "جواز السفر أو الهوية لمنجز المعاملة",
      titleEn: "Passport Copy Of Client  or UAE ID Card",
      key: 21,
      isRequired: true,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "المستند المراد تصديقه",
      titleEn: "Document Copy to Ratify",
      key: 11,
      isRequired: true,
      helperTextAr:
        "يجب أن تكون جميع صفحات المستند بحجم A4 بالطول، نوع الملف : PDF والحجم الأقصى 10MB",
      helperTextEn:
        "All Pages should be A4 and Portrait, File Type : PDF & Maximum Size : 10MB",
      maxSize: 10000000,
    },
    {
      titleAr: "نموذج التعهد",
      titleEn: "Undertaking Form",
      key: 12,
      isRequired: true,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "ملفات داعمه",
      titleEn: "Support documents",
      key: 16,
      isRequired: false,
      helperTextAr:
        "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB ",
      helperTextEn:
        "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB",
    },
  ]);
  const [cooAttachment, setCooAttachment] = useState([]);
  const [deletedAttachments, setDeletedAttachments] = useState([]);
  const [fileType, setFileType] = useState("");
  const [cooTypeCode, setCooTypeCode] = useState("");

  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [requestStep, setRequestStep] = useState([]);
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
    APIServices,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  let { code, type, status } = useParams();

  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");

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

  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /[\u0600-\u06FF]/;

  const validationSchema = Yup.object({
    ratificationCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    ratificationDocCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    person_name: Yup.string().when(
      ["ratificationCode", "lang"],
      (ratificationCode, lang, schema) => {
        if (ratificationCode === "2") {
          if (lang === "1") {
            return schema
              .matches(
                arabicLangRegex,
                isRTL
                  ? "يرجى كتابة اسم الشخص بنفس لغة التصديق المختارة"
                  : "Please write person name using same language of the ratification"
              )
              .required(isRTL ? "مطلوب" : "Required");
          } else if (lang === "2") {
            return schema
              .matches(
                englishLangRegex,
                isRTL
                  ? "يرجى كتابة اسم الشخص بنفس لغة التصديق المختارة"
                  : "Please write person name using same language of the ratification"
              )
              .required(isRTL ? "مطلوب" : "Required");
          } else {
            return schema;
          }
        } else {
          return schema;
        }
      }
    ),
    checkUndertraking: Yup.array().min(1, isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
    if (profile) {
      let readyValues = {
        code: ratificationData?.code,
        company_code: profile?.company_code,
        company_name: profile?.name,
        description: values.ratificationDocName,
        document_code: values.ratificationDocCode,
        host: "",
        inserted_by: profile?.username,
        ip: "",
        person_code: profile?.code,
        person_name: values.person_name,
        ratification_fees: 50,
        ratification_type: values.ratificationCode,
        seal_fees: 0,
        selected_language: values.lang,
        srv_count: 0,
        updated_by: profile?.username,
        username: profile?.username,
        user_note: values.notes,
      };
      setCooTypeCode(values.ratificationCode);
      if (cooAttachment && cooAttachment?.length > 0) {
        setSendValues(readyValues);
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
        dispatch(sendRatificationUpdateRequest({ data: { ...readyValues } }));
      }
      // resetForm({});
      setNote("");
    } else {
      setOpenModal(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    }
  };
  useEffect(() => {
    if (profile != null) {
      dispatch(getRatificationType());
      dispatch(getRatificationDocType());
      dispatch(getRatificationRequestData({ data: { code }, reqType: status }));
    }
  }, []);

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear) {
      setOpenModal(true);
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
      memberType &&
      memberType != "active" &&
      memberType != "activeExpired"
    )
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.ratificationType;
    if (result) setRatificationType(result);
  }, [APIServices.ratificationType]);

  useEffect(() => {
    const result = APIServices.ratificationDocType;
    if (result) setRatificationDocType(result);
  }, [APIServices.ratificationDocType]);

  useEffect(() => {
    const result = APIServices.ratificationRequestDetails;
    if (result) {
      setRatificationData(result);
      setNote(result.user_note);
      let request_type = 1;
      let service_code = 51;

      let request_code = result.request_code;
      request_code &&
        dispatch(
          getRatificationAttachData({
            data: { request_code, request_type },
            reqType: 51,
          })
        );
      request_code &&
        dispatch(getServiceStep({ data: { service_code, request_code } }));
    }
  }, [APIServices.ratificationRequestDetails]);

  useEffect(() => {
    const result = APIServices.ratificationRequestAttach;
    if (result?.length) setRatificationAttach(result);
    // let service_code = 51;
    // let request_code = ratificationData.request_code;
    // request_code &&
    //   dispatch(getServiceStep({ data: { service_code, request_code } }));
  }, [APIServices.ratificationRequestAttach]);

  useEffect(() => {
    if (APIServices.uploadRakFileDone?.length) {
      setCooAttachment(
        APIServices?.uploadRakFileDone?.map((i) => {
          loggedType == "1"
            ? (i["company_code"] = profile ? profile?.company_code : "")
            : (i["person_code"] = profile ? profile?.code : "");
          i["inserted_by"] = profile ? profile?.username : "";
          i["request_type_code"] = 51;
          i["file_size"] = i?.file_size;
          return i;
        })
      );
      dispatch(sendRatificationUpdateRequest({ data: { ...sendValues } }));
    }
  }, [APIServices.uploadRakFileDone]);

  useEffect(() => {
    let arr = [...ratificationAttach, ...cooAttachment];
    let isRequiredFiles = requiredAttachments?.filter((e) => e.isRequired);
    let action = isRequiredFiles?.map((item) =>
      arr?.some((i) => item.key == i.classification_code)
    );
    setAllFilesUploaded(action?.every((i) => i == true));
  }, [ratificationAttach, cooAttachment]);

  useEffect(() => {
    const result = APIServices.ratificationRequestUpdate;
    if (result.reqCode) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.reqCode;
        attch["request_type"] = 1;
        return attch;
      });
      dispatch(
        sendDeletedAttachments({
          data: { deletedAttach: deletedAttachments },
          reqType: 51,
        })
      );
      dispatch(
        sendCooAttachments({
          data: { ratification_attach: cooAttachment },
          reqType: 51,
        })
      );
    }
  }, [APIServices.ratificationRequestUpdate]);

  useEffect(() => {
    if (APIServices.getServiceStepDone) {
      if (APIServices.getServiceStepDone.request_step)
        setRequestStep(APIServices.getServiceStepDone.request_step[0]);
    }
  }, [APIServices.getServiceStepDone]);

  useEffect(() => {
    const result = APIServices.ratificationRequestUpdate;
    if (result.reqCode) {
      setOpenModal(true);
      setMessage(
        isRTL
          ? ` رقم طلبك هو ${result.reqCode} `
          : `Your Application Number is ${result.reqCode} .`
      );
      setTimeout(() => {
        store.dispatch(push("/services-form/requests-list"));
      }, 7000);
    } else {
      if (result.items == []) {
        setOpenModal(true);
        setMessage(isRTL ? `خطأ في السيرفر` : `Internal Server Error.`);
      }
    }
    if (Object.keys(APIServices.ratificationRequestUpdate).length)
      dispatch(sendRatificationUpdateRequestDone({ data: {} }));
  }, [APIServices.cooAttachments]);

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
  const initialValues = editingInitialValues(
    "editRatification",
    ratificationData
  );
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
  const rateValues = {
    req_code: ratificationData?.request_code
      ? String(ratificationData?.request_code)
      : null,
    ref_code: ratificationData?.code ? String(ratificationData?.code) : null,
    service_step: 5,
    inserted_by: profile?.username,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    service_code: "109",
    income_code: 51,
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
  return (
    <Grid container className={classes.formRoot}>
      <Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={classes.serviceHeader}
        >
          {" "}
          <Typography className={classes.serviceTitle}>
            {t("SERVICESPAGES.SIDEMENU.RATIFICATION")}{" "}
          </Typography>
          {ratificationData && type == "view" && (
            <Typography className={classes.fontFamily}>
              {isRTL ? "للاطلاع فقط " : "Read Only"}
            </Typography>
          )}
          {status == "print_issued" ? (
            <Box className={classes.hidePrint}>
              <Button
                className={clsx(
                  classes.send,
                  classes.smallerBtn,
                  classes.noMarginTop
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
              <ReactToPrint
                trigger={() => (
                  <Button className="printBtn">
                    <PrintOutlinedIcon />
                  </Button>
                )}
                content={() => componentRef.current}
              />{" "}
            </Box>
          ) : (
            <ReactToPrint
              trigger={() => (
                <Button className="printBtn">
                  <PrintOutlinedIcon />
                </Button>
              )}
              content={() => componentRef.current}
            />
          )}
        </Box>
        {status == "print_issued" ? (
          <Box className={classes.displayPrint}>
            <Button
              className={clsx(
                classes.send,
                classes.smallerBtn,
                classes.noMarginTop
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
            <ReactToPrint
              trigger={() => (
                <Button className="printBtn">
                  <PrintOutlinedIcon />
                </Button>
              )}
              content={() => componentRef.current}
            />
          </Box>
        ) : null}
        {ratificationData && (
          <Typography style={{ textAlign: "start", position: "absolute" }}>
            {status == "print_issued" || status == "issued"
              ? t("SERVICESPAGES.DELETED.ISSUENO")
              : t("SERVICESPAGES.DELETED.REQNO")}{" "}
            : {ratificationData?.code}
          </Typography>
        )}
        {ratificationData && (
          <Typography style={{ textAlign: "end" }}>
            {t("SERVICESPAGES.DELETED.REQDATE")} :{" "}
            {moment(ratificationData?.insert_date).format("YYYY-MM-DD h:mm a")}
          </Typography>
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
        {({
          isValid,
          dirty,
          values,
          submitForm,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form
            className={classes.fullForm}
            variant="outlined"
            autocomplete="off"
            ref={componentRef}
          >
            {status == "print_issued" ? (
              <>
                {" "}
                <Grid item xs={12}>
                  {" "}
                  <Box
                    display="flex"
                    alignItems="center"
                    className={classes.heading}
                  >
                    {" "}
                    {isRTL ? (
                      <Typography>
                        لطباعة الفاتورة الصادرة من غرفة رأس الخيمة
                      </Typography>
                    ) : (
                      <Typography>To print RAK Chamber Receipt</Typography>
                    )}
                    <Button
                      onClick={() =>
                        store.dispatch(
                          push(
                            `/services-form/business-services/trx-preview/${ratificationData.trx_code}`
                          )
                        )
                      }
                    >
                      <Receipt />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  {isRTL ? (
                    <Typography className={classes.heading}>
                      الملفات المصدقة
                    </Typography>
                  ) : (
                    <Typography className={classes.heading}>
                      Ratified Files
                    </Typography>
                  )}
                  {ratificationData?.ratified_file ? (
                    ratificationData?.document_flag == 2 ? (
                      isRTL ? (
                        <Typography
                          style={{ color: "#999", textAlign: "start" }}
                        >
                          مدة صلاحية استعراض الملفات انتهت
                        </Typography>
                      ) : (
                        <Typography
                          style={{ color: "#999", textAlign: "start" }}
                        >
                          File validity period is Expired
                        </Typography>
                      )
                    ) : (
                      <Button
                        style={{ display: "flex", justifyContent: "start" }}
                        target="_blank"
                        href={`${PRODUCTION}/api/ratifi/download/${ratificationData?.ratified_file}`}
                      >
                        <img
                          src="/assets/icons/pdf.png"
                          style={{ padding: 8 }}
                        />
                        <Typography style={{ direction: "ltr" }}>
                          {ratificationData?.ratified_file}
                        </Typography>
                      </Button>
                    )
                  ) : isRTL ? (
                    <Box display="flex" alignItems="center">
                      <img src="/assets/icons/pdf.png" style={{ padding: 8 }} />{" "}
                      <Typography>
                        لا توجد ملفات مصدقة بعد لهذا الطلب
                      </Typography>
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="center">
                      <img src="/assets/icons/pdf.png" style={{ padding: 8 }} />
                      <Typography>
                        There are no ratified files for this request yet
                      </Typography>
                    </Box>
                  )}
                  <Box display="flex" paddingTop="8px">
                    <Typography class="text-danger ng-binding">
                      {isRTL ? "*تحديث:" : "*Update:"}
                    </Typography>
                    <Typography class="text-muted text-xs">
                      <i class="ng-binding">
                        {isRTL
                          ? " مدة صلاحية الملفات هي 3 أيام عمل منذ تاريخ ختم/تصديق الملف "
                          : "Files validity is 3 working days from the date of stamping/ratifying the file"}{" "}
                      </i>
                    </Typography>
                  </Box>
                  <Box className={classes.divider2}></Box>
                </Grid>
              </>
            ) : null}
            {/* <Grid container> */}
            <Accordion
              expanded={expanded1}
              className={classes.accordionStep}
              onChange={() => setExpanded1(!expanded1)}
            >
              <AccordionSummary
                expandIcon={expanded1 ? <Remove /> : <Add />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <BsInfoSquare className={classes.address} />

                <Typography>
                  {t("SERVICESPAGES.RATIFICATION.DETAILS")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <InputLabel
                      htmlFor="ratificationCode"
                      className={classes.label}
                    >
                      {t("SERVICESPAGES.RATIFICATION.RAFITYPE")}{" "}
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
                      id="ratificationCode"
                      name="ratificationCode"
                      variant="outlined"
                      disabled={type == "view" ? true : false}
                    >
                      {ratificationType?.map((type, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={type.code}
                            name="ratificationCode"
                            className={classes.menuItem}
                          >
                            {isRTL ? type.name : type.name_e}
                          </MenuItem>
                        );
                      })}
                    </Field>{" "}
                    {errors.ratificationCode && touched.ratificationCode ? (
                      <div className={classes.inputfeedback}>
                        {errors.ratificationCode}
                      </div>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <InputLabel
                      htmlFor="ratificationDocCode"
                      className={classes.label}
                    >
                      {t("SERVICESPAGES.RATIFICATION.DOC")}{" "}
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
                      id="ratificationDocCode"
                      name="ratificationDocCode"
                      variant="outlined"
                      disabled={type == "view" ? true : false}
                      value={values.ratificationDocCode}
                      onChange={(e) => {
                        let desc = ratificationDocType?.filter(
                          (item) => item.code == e.target.value
                        );
                        setFieldValue("ratificationDocCode", e.target.value);
                        setFieldValue(
                          "ratificationDocName",
                          isRTL ? desc[0].name : desc[0].name_e
                        );
                        e.target.value == 1 && setFieldValue("person_name", "");
                      }}
                    >
                      {ratificationDocType?.map((type, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={type.code}
                            name="ratificationDocCode"
                            className={classes.menuItem}
                          >
                            {isRTL ? type.name : type.name_e}
                          </MenuItem>
                        );
                      })}
                    </Field>{" "}
                    {errors.ratificationDocCode &&
                    touched.ratificationDocCode ? (
                      <div className={classes.inputfeedback}>
                        {errors.ratificationDocCode}
                      </div>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                    <InputLabel htmlFor="lang" className={classes.label}>
                      {t("SERVICESPAGES.RATIFICATION.LANG")}{" "}
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
                      id="lang"
                      name="lang"
                      variant="outlined"
                      disabled={type == "view" ? true : false}
                    >
                      <MenuItem
                        key={1}
                        value={"1"}
                        name="lang"
                        className={classes.menuItem}
                      >
                        1. {t("SERVICESPAGES.RATIFICATION.AR")}
                      </MenuItem>
                      <MenuItem
                        key={2}
                        value={"2"}
                        name="lang"
                        className={classes.menuItem}
                      >
                        2. {t("SERVICESPAGES.RATIFICATION.EN")}
                      </MenuItem>
                    </Field>
                    {errors.lang && touched.lang ? (
                      <div className={classes.inputfeedback}>{errors.lang}</div>
                    ) : null}
                  </Grid>
                  {values.ratificationCode == "2" ||
                  values.ratificationCode == 2 ? (
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                      <InputLabel
                        htmlFor="person_name"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.RATIFICATION.PERSONNAME")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={classes.textField}
                        id="person_name"
                        name="person_name"
                        variant="outlined"
                        disabled={type == "view" ? true : false}
                      />
                    </Grid>
                  ) : null}
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded2}
              className={classes.accordionStep}
              onChange={() => setExpanded2(!expanded2)}
            >
              <AccordionSummary
                expandIcon={expanded2 ? <Remove /> : <Add />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <RiAttachmentLine className={classes.address} />
                <Typography>
                  {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  {type == "edit" ? (
                    <Grid container>
                      <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                          <Typography
                            className={classes.label}
                            style={{ width: "100%" }}
                          >
                            {t("SERVICESPAGES.RATIFICATION.PDF")}:
                          </Typography>
                          <Box
                            display="flex"
                            justifyContent="space-around"
                            width="100%"
                          >
                            <Button
                              className={classes.pdfRead}
                              variant="contained"
                              target="_blank"
                              href={`${PRODUCTION}/tmp/services/Undertaking_Form_ar.pdf`}
                            >
                              {t("SERVICESPAGES.RATIFICATION.AR")}
                            </Button>
                            <Button
                              className={classes.pdfRead}
                              variant="contained"
                              target="_blank"
                              href={`${PRODUCTION}/tmp/services/Undertaking_Form_en.pdf`}
                            >
                              {t("SERVICESPAGES.RATIFICATION.EN")}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                      <Box className={classes.divider}>
                        <Typography name="fills">
                          {t("SERVICESPAGES.ADDITIONALREQ.ATTACHMENT")}
                        </Typography>
                      </Box>
                      {requiredAttachments?.map((attch) => (
                        <Grid container item className={classes.inpuContainer}>
                          <InputLabel
                            htmlFor={attch.key}
                            className={classes.label}
                          >
                            {isRTL ? attch.titleAr : attch.titleEn}
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
                            helperText={
                              isRTL ? attch.helperTextAr : attch.helperTextEn
                            }
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
                      ))}
                    </Grid>
                  ) : null}

                  <Grid container className={classes.inpuContainer}>
                    {type == "edit" && (
                      <Box className={classes.divider}>
                        <Typography name="fills">
                          {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                        </Typography>
                      </Box>
                    )}
                    {ratificationAttach?.length
                      ? ratificationAttach?.map((attch) => (
                          <>
                            <Grid item xs={5}>
                              <InputLabel className={classes.label}>
                                {AttachType(attch)}
                              </InputLabel>
                            </Grid>
                            <Grid item xs={6}>
                              <Button
                                className={classes.pdfRead}
                                variant="contained"
                                target="_blank"
                                href={`/tmp/services/${attch.file_name}`}
                              >
                                {attch.file_name}
                              </Button>
                            </Grid>{" "}
                            {type == "edit" ? (
                              <Grid item xs={1}>
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
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded3}
              className={classes.accordionStep}
              onChange={() => setExpanded3(!expanded3)}
            >
              <AccordionSummary
                expandIcon={expanded3 ? <Remove /> : <Add />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <BiMessageSquareDetail className={classes.address} />

                <Typography>
                  {t("SERVICESPAGES.ADDITIONALREQ.NOTES")}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="notes" className={classes.label}>
                      {t("SERVICESPAGES.RATIFICATION.CLIENT")}
                    </InputLabel>

                    {/* <textarea
                      rows={3}
                      className={classes.textFieldNumberd}
                      name="notes"
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t("SERVICESPAGES.RATIFICATION.CLIENT")}
                      disabled={type == "view" ? true : false}
                      value={note}
                    ></textarea> */}
                    <Field
                      rows={3}
                      multiline={true}
                      component={TextField}
                      className={classes.textField}
                      name="notes"
                      variant="outlined"
                      disabled={type == "view" ? true : false}
                      placeholder={t("SERVICESPAGES.RATIFICATION.CLIENT")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="notes" className={classes.label}>
                      {t("SERVICESPAGES.RATIFICATION.EMPLOYEE")}
                    </InputLabel>

                    <textarea
                      placeholder={t("SERVICESPAGES.RATIFICATION.EMPLOYEE")}
                      rows={3}
                      disabled
                      className={classes.textFieldNumberd}
                      value={ratificationData?.emp_note}
                    ></textarea>
                  </Grid>
                  {type == "edit" && (
                    <Grid item sm={12}>
                      <Box className={classes.checkUndertraking}>
                        <label style={{ textAlign: "start" }}>
                          <Field
                            type="checkbox"
                            component={Checkbox}
                            name="checkUndertraking"
                            value="terms checked"
                            // value={item.name_e}
                          />
                          <span
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              paddingInline: "8px",
                            }}
                          >
                            *
                          </span>
                          {isRTL
                            ? "أتعهد بصحة وشرعية هذا المستند وصحة المعلومات الواردة فيه، وأتحمل المسؤولية المدنية والجنائية إذا ثبت عدم صحة بعض أو كل مما سبق، وعلاوةً على ذلك أتحمل جميع المسؤوليات في حالة ورود أخطاء من جانبي فيما يتعلق بإجراءات عملية التوثيق دون أي مسؤولية على غرفة تجارة وصناعة رأس الخيمة."
                            : "I, the undersigned, confirm the validity and legality of this document and the correctness of the information contained therein, and I bear civil and criminal responsibility if all or some of the above is proven to be invalid.  Moreover, I bear all responsibilities in the event of mistakes on my part received on our part regarding procedures for the certification process without any responsibility on the Ras Al Khaimah Chamber of Commerce and Industry."}
                        </label>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </AccordionDetails>
            </Accordion>
            {type != "view" ? (
              <Button
                variant="contained"
                className={classes.send}
                onClick={submitForm}
                disabled={
                  !isValid ||
                  // || !dirty
                  !allFilesUploaded ||
                  values.checkUndertraking?.length == 0
                }
                disableElevation
                endIcon={<HiSave />}
              >
                {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
              </Button>
            ) : null}
          </Form>
        )}
      </Formik>
      <ServicesResultModal
        open={openModal}
        setOpen={setOpenModal}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
      <HappinessMetter
        open={open}
        setOpen={setOpen}
        rateValues={rateValues}
        closeBtn={true}
      />
    </Grid>
  );
}

export default memo(RatificationRequest);
