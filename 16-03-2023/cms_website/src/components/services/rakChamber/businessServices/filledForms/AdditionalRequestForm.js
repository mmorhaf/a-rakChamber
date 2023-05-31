import {
  Box,
  Button,
  Fab,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Receipt, Remove } from "@material-ui/icons";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import moment from "moment";
import React, { memo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiSave } from "react-icons/hi";
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
import * as pdfjsLib from "pdfjs-dist";
import clsx from "clsx";
import { CiFaceSmile } from "react-icons/ci";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

const {
  getCooAccreditedList,
  sendCooAdditionalRequestUpdate,
  sendCooAdditionalRequestUpdateDone,
  uploadRakFile,
  uploadRakFileDone,
  sendCooAttachments,
  getCooAdditionalRequestDetails,
  getRatificationAttachData,
  getCooStamps,
  getServiceStep,
  sendDeletedAttachments,
} = actions;

function AdditionalRequest(props) {
  const { t } = useTranslation();
  const componentRef = useRef();
  const classes = useStyles();
  const [issuedCooResults, setIssuedCooResults] = useState([]);
  const [note, setNote] = useState("");
  const [requiredAttachments, setRequiredAttchments] = useState([]);
  const [cooAttachment, setCooAttachment] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [cooTypeCode, setCooTypeCode] = useState("");
  const [ratificationAttach, setRatificationAttach] = useState([]);
  const [cooStamps, setCooStamps] = useState([]);
  const [deletedAttachments, setDeletedAttachments] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [requestStep, setRequestStep] = useState([]);
  const [filePagesCount, setFilePagesCount] = useState(null);
  const [serviceCode, setServiceCode] = useState(null);

  let { code, type, status } = useParams();

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
  const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

  const initialValues = editingInitialValues("editAdditional", requestData);
  const validationSchema = Yup.object({
    cooCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    serviceType: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    count: Yup.string()
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
          !filePagesCount ||
          serviceCode == 54 ||
          (val && filePagesCount && val < filePagesCount + 1)
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
    if (profile) {
      setSendValues({
        code: code,
        company_code: profile?.company_code,
        coo_code: values.cooCode,
        income_code: values.serviceType,
        updated_by: profile?.username,
        srv_count: values.count,
        user_note: note,
        emp_note: requestData ? requestData?.emp_note : "",
      });
      if (cooAttachment && cooAttachment?.length > 0) {
        let data = new FormData();
        cooAttachment?.map((i, index) => {
          data.append(`files,${index}`, i.file);
          data.append(`classification_code,${index}`, i.classification_code);
        });
        dispatch(
          uploadRakFile({
            body: {
              code: profile?.company_code,
              data,
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          })
        );
      } else {
        let readyValues = {
          code: code,
          company_code: profile?.company_code,
          coo_code: values.cooCode,
          income_code: values.serviceType,
          updated_by: profile?.username,
          srv_count: values.count,
          user_note: note,
          emp_note: requestData ? requestData?.emp_note : "",
        };
        dispatch(sendCooAdditionalRequestUpdate({ data: { ...readyValues } }));
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
    const company_code = profile?.company_code;
    const day_number = 365;
    dispatch(getCooAccreditedList({ data: { day_number, company_code } }));
    dispatch(getCooAdditionalRequestDetails({ data: { code } }));
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
    else if (profile == null || loggedType != "1")
      store.dispatch(push("/login"));
    if (memberType && memberType != "active" && memberType != "activeExpired")
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.cooAccreditedListDone;
    if (result) setIssuedCooResults(result);
  }, [APIServices.cooAccreditedListDone]);

  useEffect(() => {
    if (APIServices.uploadRakFileDone?.length) {
      setCooAttachment(
        APIServices?.uploadRakFileDone?.map((i) => {
          i["company_code"] = profile ? profile?.company_code : "";
          i["inserted_by"] = profile ? profile?.username : "";
          i["request_type_code"] = cooTypeCode;
          i["file_size"] = i?.file_size;
          return i;
        })
      );

      dispatch(sendCooAdditionalRequestUpdate({ data: { ...sendValues } }));
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
    const result = APIServices.cooAdditionalRequestUpdated;
    if (result.reqCode) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.reqCode;
        return attch;
      });
      dispatch(
        sendDeletedAttachments({
          data: { deletedAttach: deletedAttachments },
          reqType: 55,
        })
      );
      dispatch(
        sendCooAttachments({
          data: { coo_attach: cooAttachment },
          reqType: 55,
        })
      );
    }
  }, [APIServices.cooAdditionalRequestUpdated]);

  useEffect(async () => {
    const result = APIServices.cooAdditionalRequestUpdated;
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
    if (Object.keys(APIServices.cooAdditionalRequestUpdated).length) {
      dispatch(sendCooAdditionalRequestUpdateDone({ data: {} }));
      dispatch(uploadRakFileDone({ data: [] }));
    }
  }, [APIServices.cooAttachments]);

  useEffect(() => {
    const result = APIServices.cooAdditionalRequestDetails;
    if (result?.code) {
      setRequestData(result);
      setNote(result.user_note);
      setServiceCode(result.income_code);
      setRequiredAttchments(
        result.income_code == 55
          ? [
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
                title: isRTL
                  ? "شهادة المنشأ"
                  : "Original certificate of origin ",
                key: 2,
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
                title: isRTL ? "ملفات داعمه" : "Support documents",
                key: 16,
                isRequired: false,
                helperText: isRTL
                  ? "يرجى جمع جميع الملفات الأخرى الداعمة لطلبك في ملف PDF واحد وإرفاقه هنا , الحجم الأقصى 30MB "
                  : "Please combine all other supporting files for your request into one PDF document and attach it here, Maximum Size : 30MB",
              },
            ]
          : result.income_code == 54
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
                  ? "جواز السفر أو الهوية لمنجز المعاملة"
                  : "Passport Copy Of Client  or UAE ID Card Passport Copy",
                key: 21,
                isRequired: true,
                helperText: isRTL
                  ? "نوع الملف : PDF والحجم الأقصى 30MB"
                  : "File Type : PDF & Maximum Size : 30MB",
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
      let request_code = code;
      dispatch(
        getRatificationAttachData({
          data: { request_code },
          reqType: 55,
        })
      );
      let service_code = result.income_code;
      dispatch(getServiceStep({ data: { service_code, request_code } }));
      let trx_code = result.payment_code;
      let additional_request_code = code;
      let coo_code = result.coo_code;
      // let trx_code = 35223;
      // let additional_request_code = 762;
      // let coo_code = 47284;
      if (status == "issued")
        dispatch(
          getCooStamps({
            data: { trx_code, additional_request_code, coo_code },
          })
        );
    }
  }, [APIServices.cooAdditionalRequestDetails]);
  useEffect(() => {
    const result = APIServices.ratificationRequestAttach;
    if (result?.length) setRatificationAttach(result);
  }, [APIServices.ratificationRequestAttach]);

  useEffect(() => {
    const result = APIServices.cooStamps;
    if (result) setCooStamps(result);
  }, [APIServices.cooStamps]);

  useEffect(() => {
    if (APIServices.getServiceStepDone) {
      if (APIServices.getServiceStepDone.request_step)
        setRequestStep(APIServices.getServiceStepDone.request_step[0]);
    }
  }, [APIServices.getServiceStepDone]);

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
    req_code: requestData?.code ? String(requestData?.code) : null,
    ref_code: requestData?.code ? String(requestData?.code) : null,
    service_step: 5,
    inserted_by: profile?.username,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    service_code: requestData.income_code == "54" ? "107" : "108",
    income_code: requestData.income_code,
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
        {" "}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={classes.serviceHeader}
        >
          {" "}
          <Typography className={classes.serviceTitle}>
            {t("SERVICESPAGES.ADDITIONALREQ.TITLE")}
          </Typography>
          {requestData && type == "view" && (
            <Typography className={classes.fontFamily}>
              {isRTL ? "للاطلاع فقط " : "Read Only"}
            </Typography>
          )}
          {status == "issued" ? (
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
        {status == "issued" ? (
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
        {requestData &&
          (status == "issued" ? (
            <Typography>
              {status == "issued"
                ? t("SERVICESPAGES.DELETED.ISSUENO")
                : t("SERVICESPAGES.DELETED.REQNO")}
              : {requestData?.code}
            </Typography>
          ) : (
            <Typography style={{ textAlign: "start", position: "absolute" }}>
              {status == "issued"
                ? t("SERVICESPAGES.DELETED.ISSUENO")
                : t("SERVICESPAGES.DELETED.REQNO")}
              : {requestData?.code}
            </Typography>
          ))}
        {requestData &&
          (status == "issued" ? (
            <Typography>
              {t("SERVICESPAGES.DELETED.REQDATE")} :{" "}
              {moment(requestData?.request_date).format("YYYY-MM-DD h:mm a")}
            </Typography>
          ) : (
            <Typography style={{ textAlign: "end" }}>
              {t("SERVICESPAGES.DELETED.REQDATE")} :{" "}
              {moment(requestData?.request_date).format("YYYY-MM-DD h:mm a")}
            </Typography>
          ))}
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
          errors,
          touched,
          setFieldValue,
          validateField,
        }) {
          useEffect(() => {
            validateField("count");
          }, [filePagesCount]);
          return (
            <Form
              className={classes.fullForm}
              variant="outlined"
              ref={componentRef}
            >
              {status == "issued" ? (
                <>
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
                              `/services-form/business-services/trx-preview/${requestData.payment_code}`
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
                        الملفات المختومة
                      </Typography>
                    ) : (
                      <Typography className={classes.heading}>
                        Stammped Files
                      </Typography>
                    )}
                    {cooStamps?.length ? (
                      cooStamps?.map((item) =>
                        item.document_flag == 2 ? (
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
                            href={`${PRODUCTION}/api/stamp/download/${item.stampped_file_name}`}
                          >
                            <img
                              src="/assets/icons/pdf.png"
                              style={{ padding: 8 }}
                            />
                            <Typography style={{ direction: "ltr" }}>
                              {item.stampped_file_name}
                            </Typography>
                          </Button>
                        )
                      )
                    ) : isRTL ? (
                      <Box display="flex" alignItems="center">
                        <img
                          src="/assets/icons/pdf.png"
                          style={{ padding: 8 }}
                        />{" "}
                        <Typography>
                          لا توجد ملفات مختومة بعد لهذا الطلب
                        </Typography>
                      </Box>
                    ) : (
                      <Box display="flex" alignItems="center">
                        <img
                          src="/assets/icons/pdf.png"
                          style={{ padding: 8 }}
                        />
                        <Typography>
                          There are no stamped files for this request yet
                        </Typography>
                      </Box>
                    )}
                    <Box display="flex">
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
              <Grid container spacing={1}>
                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="cooCode" className={classes.label}>
                    {t("SERVICESPAGES.AMEND.CODE")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Field
                    component={Select}
                    className={classes.textField}
                    id="cooCode"
                    name="cooCode"
                    variant="outlined"
                    MenuProps={{
                      anchorOrigin: {
                        vertical: "top",
                        horizontal: isRTL ? "right" : "left",
                      },
                      getContentAnchorEl: null,
                    }}
                    disabled
                  >
                    {issuedCooResults.items?.map((type, idx) => {
                      return (
                        <MenuItem
                          key={idx}
                          value={type.coo_code}
                          name="cooCode"
                          style={{ direction: isRTL ? "rtl" : "ltr" }}
                          className={classes.menuItem}
                        >
                          {type.coo_code}
                        </MenuItem>
                      );
                    })}
                  </Field>{" "}
                  {errors.cooCode && touched.cooCode ? (
                    <div className={classes.inputfeedback}>
                      {errors.cooCode}
                    </div>
                  ) : null}
                </Grid>

                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="serviceType" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.TYPE")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Field
                    component={Select}
                    className={classes.textField}
                    id="serviceType"
                    name="serviceType"
                    variant="outlined"
                    disabled
                  >
                    <MenuItem
                      key={1}
                      value={55}
                      name="serviceType"
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                      className={classes.menuItem}
                    >
                      {t("SERVICESPAGES.ADDITIONALREQ.SEAL")}
                    </MenuItem>
                    <MenuItem
                      key={2}
                      value={54}
                      name="serviceType"
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                      className={classes.menuItem}
                    >
                      {t("SERVICESPAGES.ADDITIONALREQ.COPY")}
                    </MenuItem>
                  </Field>
                  {errors.serviceType && touched.serviceType ? (
                    <div className={classes.inputfeedback}>
                      {errors.serviceType}
                    </div>
                  ) : null}
                </Grid>

                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="count" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.COUNT")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Field
                    component={TextField}
                    type="number"
                    className={classes.textField}
                    id="count"
                    name="count"
                    variant="outlined"
                    min="1"
                    disabled={type == "view" ? true : false}
                    onChange={(e) => {
                      if (e.target.value < 0) e.target.value = 0;
                      setFieldValue("count", e.target.value);
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

                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="fees" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.FEES")}
                  </InputLabel>
                  <Field
                    disabled
                    component={TextField}
                    className={classes.textField}
                    id="fees"
                    name="fees"
                    variant="outlined"
                    value={
                      type == "view"
                        ? requestData?.fees
                        : values.serviceType == "54"
                        ? values.count * 50
                        : values.serviceType == "55"
                        ? values.count * 5
                        : ""
                    }
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  className={classes.inpuContainer}
                  style={{ marginTop: 40 }}
                >
                  <InputLabel htmlFor="notes" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.NOTES")}
                  </InputLabel>
                  <textarea
                    rows={5}
                    className={classes.textFieldNumberd}
                    name="notes"
                    onChange={(e) => setNote(e.target.value)}
                    disabled={type == "view" ? true : false}
                    value={note}
                  ></textarea>
                </Grid>
                <Grid container className={classes.inpuContainer}>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="emp_notes" className={classes.label}>
                      {t("SERVICESPAGES.RATIFICATION.EMPLOYEE")}
                    </InputLabel>
                    <textarea
                      rows={5}
                      className={classes.textFieldNumberd}
                      name="emp_notes"
                      value={requestData ? requestData?.emp_note : ""}
                      disabled
                    ></textarea>
                  </Grid>
                </Grid>
                <Grid container xs={12}>
                  {type == "edit" ? (
                    <>
                      {" "}
                      <Box className={classes.divider}>
                        <Typography name="fills">
                          {" "}
                          {t("SERVICESPAGES.ADDITIONALREQ.ATTACHMENT")}
                        </Typography>
                      </Box>
                      {requiredAttachments?.map((attch) => (
                        <Grid container item className={classes.inpuContainer}>
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
                            filesLimit={1}
                            // initialFiles={cooAttachment}
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
                          {errors?.exhibitionStudy &&
                          touched.exhibitionStudy ? (
                            <div className={classes.red}>
                              {errors?.exhibitionStudy}
                            </div>
                          ) : null}
                        </Grid>
                      ))}
                    </>
                  ) : null}
                </Grid>

                <Grid container className={classes.inpuContainer}>
                  <Box className={classes.divider}>
                    <Typography name="fills">
                      {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                    </Typography>
                  </Box>

                  {ratificationAttach.length
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
              {type != "view" ? (
                <Button
                  variant="contained"
                  className={classes.send}
                  onClick={submitForm}
                  disabled={
                    !isValid ||
                    // || !dirty
                    !allFilesUploaded
                  }
                  disableElevation
                  endIcon={<HiSave />}
                >
                  {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
                </Button>
              ) : null}
            </Form>
          );
        }}
      </Formik>
      <HappinessMetter
        open={open}
        setOpen={setOpen}
        rateValues={rateValues}
        closeBtn={true}
      />
      <ServicesResultModal
        open={openModal}
        setOpen={setOpenModal}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
    </Grid>
  );
}

export default memo(AdditionalRequest);
