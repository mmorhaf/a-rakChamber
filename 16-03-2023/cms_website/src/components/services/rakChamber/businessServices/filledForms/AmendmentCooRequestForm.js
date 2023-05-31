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
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBoxes } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { GoVerified } from "react-icons/go";
import { HiSave } from "react-icons/hi";
import { IoCopy } from "react-icons/io5";
import { RiUserLocationFill } from "react-icons/ri";
import { SiGooglemaps } from "react-icons/si";
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
import { editingInitialValues } from "../forms/EditingInitialValue";
import ServiceStep from "../../steps/ServiceSteps";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

const MySwal = withReactContent(Swal);

const {
  getCooAccreditedList,
  fetchSelectMenuData,
  sendCooEditRequest,
  getGoodsDetailsList,
  getGoodsDetailsListDone,
  sendCooEditGoods,
  uploadRakFile,
  uploadRakFileDone,
  sendCooAttachments,
  sendCooEditRequestDone,
  sendCooEditGoodsDone,
  getCooEditRequestOriginDetails,
  getCooEditRequestDetails,
  getCooEditGoodsData,
  getRatificationAttachData,
  sendDeletedAttachments,
  getServiceStep,
} = actions;

function AmendmentCooRequest(props) {
  const { t } = useTranslation();

  const classes = useStyles();
  const [issuedCooResults, setIssuedCooResults] = useState([]);
  const [issuedCooData, setIssuedCooData] = useState([]);
  const [GoodsDetailsData, setGoodsDetailsData] = useState([]);
  const [selectMenuData, setSelectMenuData] = useState({});
  const [goodsDetails, setGoodsDetails] = useState([]);
  const [serialNo, setSerialNo] = useState(GoodsDetailsData?.length);
  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [expanded4, setExpanded4] = useState(true);
  const [expanded5, setExpanded5] = useState(true);
  const [note, setNote] = useState("");
  const [cooAttachment, setCooAttachment] = useState([]);
  const [fileType, setFileType] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [hsItem, setHsItem] = useState(null);
  const [allReqFiles, setAllReqFiles] = useState(false);
  const [editRequestOriginDetails, setEditRequestOriginDetails] = useState([]);
  const [editRequestDetails, setEditRequestDetails] = useState([]);
  const [cooGoodsEditData, setCooGoodsEditData] = useState([]);
  const [ratificationAttach, setRatificationAttach] = useState([]);
  const [deletedAttachments, setDeletedAttachments] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [requestStep, setRequestStep] = useState([]);
  const [filePagesCount, setFilePagesCount] = useState(null);
  const [requiredAttachments, setRequiredAttchments] = useState([
    {
      titleAr: "رسالة طلب تعديل معتمدة",
      titleEn: "Request Letter",
      key: 3,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "شهادة المنشأ",
      titleEn: "Original certificate of origin",
      key: 2,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "جواز السفر أو الهوية لمنجز المعاملة",
      titleEn: "Passport Copy Of Client  or UAE ID Card Passport Copy",
      key: 21,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "الفاتورة الجديدة",
      titleEn: "New Invoice",
      key: 5,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "الفاتورة القديمة",
      titleEn: "Previous Invoice",
      key: 9,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr: "نوع الملف : PDF والحجم الأقصى 30MB",
      helperTextEn: "File Type : PDF & Maximum Size : 30MB",
    },
    {
      titleAr: "مستندات إضافية مراد الختم عليها",
      titleEn: "Additional documents to be stamped",
      key: 15,
      isRequired: true,
      isUploading: false,
      isUploaded: false,
      helperTextAr:
        "يجب أن تكون جميع صفحات المستند بحجم A4 بالطول، نوع الملف : PDF والحجم الأقصى 10MB",
      helperTextEn:
        "All Pages should be A4 and Portrait, File Type : PDF & Maximum Size : 10MB",
      maxSize: 10000000,
      countPages: true,
    },
  ]);
  let { coo_code, code, type } = useParams();

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

  const validationSchema = Yup.object({
    cooCode: Yup.string().required("Required"),
    seal_number: Yup.string()
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
  });

  const doSubmit = async (values, { resetForm }) => {
    let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
    if (profile) {
      const readyValues = {
        company_code: profile?.company_code,
        coo_code: values.cooCode,
        reqCode: code,
        updated_transportaion_code: values.updated_transportaion_code,
        updated_exp_country_code: values.updated_exp_country_code,
        updated_disten1: values.updated_disten1,
        updated_disten2: values.updated_disten2,
        updated_disten3: values.updated_disten3,
        updated_disten4: values.updated_disten4,
        updated_by: profile?.username,
        copy_number: Number(values.copy_number),
        seal_number: Number(values.seal_number),
        updateline1: values.updateline1,
        updateline2: values.updateline2,
        updateline3: values.updateline3,
        updateline4: values.updateline4,
        updateline5: values.updateline5,
        updateline6: values.updateline6,
        updateline7: values.updateline7,
        updateline8: values.updateline8,
        updateline9: null,
        user_note: note,
        emp_note: values.emp_note,
      };
      setSendValues(readyValues);
      if (cooAttachment?.length > 0) {
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
      } else
        dispatch(
          sendCooEditRequest({ data: { ...readyValues }, sendType: "put" })
        );
      setNote("");
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
    setRequiredAttchments(
      requiredAttachments?.map((attch) =>
        attch.key == attachment.key
          ? { ...attch, isUploading: true }
          : { ...attch }
      )
    );
    let attachs = [
      {
        file_size: e[0].size,
        classification_code: attachment.key,
        name: e[0].name,
        file: e[0],
      },
    ];
    let arr = [];
    if (cooAttachment?.length) {
      arr = cooAttachment?.filter(
        (i) => i.classification_code != attachment.key
      );
      setCooAttachment([...arr, ...attachs]);
    } else setCooAttachment(attachs);
  };

  useEffect(() => {
    let arr = [...ratificationAttach, ...cooAttachment];
    let isRequiredFiles = requiredAttachments?.filter((e) => e.isRequired);
    let action = isRequiredFiles?.map((item) =>
      arr?.some((i) => item.key == i.classification_code)
    );
    setAllReqFiles(action?.every((i) => i == true));
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
    const company_code = profile?.company_code;
    const day_number = 60;
    const coo_additi_req_code = code;
    dispatch(getCooAccreditedList({ data: { day_number, company_code } }));
    dispatch(fetchSelectMenuData());
    dispatch(getCooEditRequestOriginDetails({ data: { coo_code } }));
    dispatch(getCooEditRequestDetails({ data: { code } }));
    dispatch(getCooEditGoodsData({ data: { coo_additi_req_code } }));
    let request_code = code;
    dispatch(
      getRatificationAttachData({
        data: { request_code },
        reqType: 55,
      })
    );
    let service_code = 56;
    dispatch(getServiceStep({ data: { service_code, request_code } }));
  }, []);

  useEffect(() => {
    if (APIServices.getServiceStepDone) {
      if (APIServices.getServiceStepDone.request_step)
        setRequestStep(APIServices.getServiceStepDone.request_step[0]);
    }
  }, [APIServices.getServiceStepDone]);

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
    else if (profile == null || loggedType != "1")
      store.dispatch(push("/login"));
    if (memberType && memberType != "active" && memberType != "activeExpired")
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useLayoutEffect(() => {
    dispatch(getGoodsDetailsListDone({ data: {} }));
  }, []);

  useEffect(() => {
    const result = APIServices.cooAccreditedListDone;
    if (result) setIssuedCooResults(result);
  }, [APIServices.cooAccreditedListDone]);

  useEffect(() => {
    const result = APIServices.goodsDetailsList.items;
    if (result) {
      setGoodsDetailsData(result);
      setSerialNo(result?.length);
    }
  }, [APIServices.goodsDetailsList]);

  useEffect(() => {
    setSelectMenuData({ ...APIServices.selectMenuDataDone });
  }, [APIServices.selectMenuDataDone]);

  useEffect(() => {
    if (APIServices.uploadRakFileDone?.length) {
      setCooAttachment(
        APIServices?.uploadRakFileDone?.map((i) => {
          i["company_code"] = profile ? profile?.company_code : "";
          i["inserted_by"] = profile ? profile?.username : "";
          i["request_type_code"] = 56;
          i["file_size"] = i?.file_size;
          return i;
        })
      );
      requiredAttachments?.map((attch) => {
        APIServices?.uploadRakFileDone?.map((i) => {
          if (attch.key == i.classification_code) {
            attch["isUploading"] = false;
            attch["isUploaded"] = true;
          }
        });
      });
      setRequiredAttchments(requiredAttachments);
      dispatch(
        sendCooEditRequest({ data: { ...sendValues }, sendType: "put" })
      );
    }
    requiredAttachments?.map((attch) =>
      attch["isUploaded"] == false
        ? setAllFilesUploaded(false)
        : setAllFilesUploaded(true)
    );
  }, [APIServices.uploadRakFileDone]);

  // useEffect(() => {
  //   if (allFilesUploaded == true)
  //     dispatch(sendCooEditRequest({ data: { ...sendValues }, sendType: "put" }))
  // }, [allFilesUploaded]);

  useEffect(() => {
    const result = APIServices.cooEditRequestDone;
    if (result.reqCode) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.reqCode;
        return attch;
      });
      const goodsValues = {
        coo_details: goodsDetails,
        coo_additi_req_code: result.reqCode,
        updated_by: profile?.username,
        company_code: profile ? profile?.company_code : "",
      };
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
      dispatch(sendCooEditGoods({ data: { ...goodsValues }, sendType: "put" }));
    }
  }, [APIServices.cooEditRequestDone]);

  useEffect(() => {
    const result = APIServices.cooEditRequestDone;
    if (
      result.reqCode
      // &&
      // APIServices.cooAttachments.affectedRow &&
      // APIServices.sendCooEditGoodsDone.affectedRow &&
      // APIServices.deletedAttachments.updated
    ) {
      setOpen(true);
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
        MySwal.fire({
          icon: "error",
          title: "Internal server error!",
        });
      }
    }
    // if (Object.keys(APIServices.cooEditRequestDone).length) {
    //   dispatch(sendCooEditRequestDone({ data: {} }));
    //   // dispatch(sendCooEditGoodsDone({ data: {} }));
    // }
  }, [
    APIServices.cooAttachments,
    APIServices.sendCooEditGoodsDone,
    // APIServices.deletedAttachments,
  ]);

  useEffect(() => {
    const result = APIServices.cooEditRequestOriginDetails;
    if (result) setEditRequestOriginDetails(result);
  }, [APIServices.cooEditRequestOriginDetails]);

  useEffect(() => {
    const result = APIServices.cooEditRequestDetails;
    if (result) setEditRequestDetails(result);
  }, [APIServices.cooEditRequestDetails]);

  useEffect(() => {
    const result = APIServices.cooGoodsEditData;
    if (result && result.items) {
      setCooGoodsEditData(result);
      setGoodsDetails(result?.items);
    }
  }, [APIServices.cooGoodsEditData]);

  useEffect(() => {
    const result = APIServices.ratificationRequestAttach;

    if (result) {
      if (result?.length > 0)
        setRatificationAttach(
          result?.filter((item) => item.request_code == code)
        );
    }
  }, [APIServices.ratificationRequestAttach]);

  const initialValues = editingInitialValues(
    "editEditedCoo",
    editRequestDetails
  );

  const onSelectCooType = (e) => {
    const coo_code = e.target.value;
    dispatch(getGoodsDetailsList({ data: { coo_code } }));
    setIssuedCooData(
      issuedCooResults.items?.filter((item) => item.coo_code == e.target.value)
    );
  };

  function handleRemove(id) {
    const newList = goodsDetails.filter((item) => item.serial_no !== id);
    setGoodsDetails(newList);
  }
  function handleRemoveAttachment(attach) {
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
  return (
    <Box className={classes.formRoot}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.serviceHeader}
      >
        <Typography className={classes.serviceTitle}>
          {t("SERVICESPAGES.SIDEMENU.AMENDMENT")}
        </Typography>
        {editRequestDetails?.items?.length && type == "view" && (
          <Typography className={classes.fontFamily}>
            {isRTL ? "للاطلاع فقط " : "Read Only"}
          </Typography>
        )}
      </Box>
      <Box>
        {editRequestDetails?.items?.length && (
          <Typography style={{ textAlign: "start", position: "absolute" }}>
            {getStatus(Number(requestStep.step_code)) == 4
              ? t("SERVICESPAGES.DELETED.ISSUENO")
              : t("SERVICESPAGES.DELETED.REQNO")}{" "}
            : {editRequestDetails?.items[0]?.code}
          </Typography>
        )}
        {editRequestDetails?.items?.length && (
          <Typography style={{ textAlign: "end" }}>
            {t("SERVICESPAGES.DELETED.REQDATE")} :{" "}
            {moment(editRequestDetails?.items[0]?.request_date).format(
              "YYYY-MM-DD h:mm a"
            )}
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
        {function MyForm({
          isValid,
          dirty,
          values,
          submitForm,
          errors,
          touched,
          setFieldValue,
          resetForm,
          validateField,
        }) {
          useEffect(() => {
            validateField("seal_number");
          }, [filePagesCount]);
          return (
            <Form className={classes.fullForm} variant="outlined">
              <Grid container spacing={2}>
                <Grid item md={3} sm={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="cooCode" className={classes.label}>
                    {t("SERVICESPAGES.AMEND.CODE")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Field
                    component={TextField}
                    className={classes.textField}
                    id="cooCode"
                    name="cooCode"
                    variant="outlined"
                    disabled
                    value={coo_code}
                  ></Field>
                </Grid>

                <Grid item md={6} sm={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="serviceType" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.TYPE")}
                  </InputLabel>

                  <Field
                    component={TextField}
                    value={
                      isRTL
                        ? "تعديل شهادة المنشأ"
                        : "Amendment of Certificate of Origin"
                    }
                    disabled
                    className={classes.textField}
                    id="serviceType"
                    name="serviceType"
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={3} sm={12} className={classes.inpuContainer}>
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
                    value={isRTL ? "50 درهم إماراتي" : "50 AED"}
                  />
                </Grid>

                <Grid container item xs={12} style={{ marginTop: 40 }}>
                  <Grid item xs={12}>
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
                        <SiGooglemaps className={classes.address} />
                        <Typography>
                          {t("SERVICESPAGES.AMEND.ADRESS")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Typography
                              className={classes.heading}
                              variant="body2"
                            >
                              {" "}
                              {t("SERVICESPAGES.AMEND.BEFORE")}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography
                              className={classes.heading}
                              variant="body2"
                            >
                              {" "}
                              {t("SERVICESPAGES.AMEND.AFTER")}
                            </Typography>
                          </Grid>
                          <Grid container item spacing={1} xs={12}>
                            <Grid item md={6} xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="destination1"
                                name="destination1"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]
                                        ?.destination1 == null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]
                                          ?.destination1
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={6}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="updated_disten1"
                                name="updated_disten1"
                                variant="outlined"
                                disabled={type == "view" ? true : false}
                                inputProps={{
                                  maxLength: 95,
                                }}
                              />
                              {values.updated_disten1?.length == 95 ? (
                                <div className={classes.inputfeedback}>
                                  {isRTL
                                    ? "عنوان الوجهة 1 يحتمل 95 حرف فقط !"
                                    : "Destination Address 1 can hold up to 95 characters."}
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid container item spacing={1} xs={12}>
                            <Grid item md={6} xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="destination2"
                                name="destination2"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]
                                        ?.destination2 == null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]
                                          ?.destination2
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={6}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="updated_disten2"
                                name="updated_disten2"
                                variant="outlined"
                                disabled={type == "view" ? true : false}
                                inputProps={{
                                  maxLength: 95,
                                }}
                              />
                              {values.updated_disten2.length == 95 ? (
                                <div className={classes.inputfeedback}>
                                  {isRTL
                                    ? "عنوان الوجهة 2 يحتمل 95 حرف فقط !"
                                    : "Destination Address 2 can hold up to 95 characters."}
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid container item spacing={1} xs={12}>
                            <Grid item md={6} xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="destination3"
                                name="destination3"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]
                                        ?.destination3 == null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]
                                          ?.destination3
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={6}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="updated_disten3"
                                name="updated_disten3"
                                variant="outlined"
                                disabled={type == "view" ? true : false}
                                inputProps={{
                                  maxLength: 95,
                                }}
                              />
                              {values.updated_disten3?.length == 95 ? (
                                <div className={classes.inputfeedback}>
                                  {isRTL
                                    ? "عنوان الوجهة 3 يحتمل 95 حرف فقط !"
                                    : "Destination Address 3 can hold up to 95 characters."}
                                </div>
                              ) : null}
                            </Grid>
                          </Grid>
                          <Grid container item spacing={1} xs={12}>
                            <Grid item md={6} xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="destination4"
                                name="destination4"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]
                                        ?.destination4 == null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]
                                          ?.destination4
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={6}>
                              <Field
                                component={TextField}
                                className={classes.textField}
                                id="updated_disten4"
                                name="updated_disten4"
                                variant="outlined"
                                disabled={type == "view" ? true : false}
                                inputProps={{
                                  maxLength: 95,
                                }}
                              />
                              {values.updated_disten4?.length == 95 ? (
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
                  </Grid>
                  <Grid item xs={12}>
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
                        <Typography>
                          {t("SERVICESPAGES.AMEND.TRANSPORTCOUNTRY")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container>
                          <Grid container xs={12}>
                            <Grid item xs={6}>
                              <Typography
                                className={classes.heading}
                                variant="body2"
                              >
                                {t("SERVICESPAGES.AMEND.BEFORE")}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography
                                className={classes.heading}
                                variant="body2"
                              >
                                {" "}
                                {t("SERVICESPAGES.AMEND.AFTER")}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid container xs={12}>
                            {" "}
                            <InputLabel className={classes.label}>
                              {t("SERVICESPAGES.AMEND.TRANSPORT")}
                            </InputLabel>
                          </Grid>
                          <Grid container spacing={1} xs={12}>
                            <Grid item xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="transportation"
                                name="transportation"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? isRTL
                                      ? editRequestOriginDetails.coo[0]
                                          .transportation_name
                                      : editRequestOriginDetails.coo[0]
                                          .transportation_name_e
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                component={Select}
                                className={classes.textField}
                                id="updated_transportaion_code"
                                name="updated_transportaion_code"
                                variant="outlined"
                                MenuProps={{
                                  anchorOrigin: {
                                    vertical: "top",
                                    horizontal: isRTL ? "right" : "left",
                                  },
                                  getContentAnchorEl: null,
                                }}
                                disabled={type == "view" ? true : false}
                              >
                                {selectMenuData?.transportation?.map(
                                  (type, idx) => {
                                    return (
                                      <MenuItem
                                        key={idx}
                                        value={type.code}
                                        className={classes.menuItem}
                                      >
                                        {type.name_e}
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Field>
                            </Grid>
                          </Grid>{" "}
                          <Grid container xs={12}>
                            {" "}
                            <InputLabel className={classes.label}>
                              {t("SERVICESPAGES.AMEND.COUNTRY")}
                            </InputLabel>
                          </Grid>
                          <Grid container spacing={1} xs={12}>
                            <Grid item xs={6}>
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="exp_country_name"
                                name="exp_country_name"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? isRTL
                                      ? editRequestOriginDetails.coo[0]
                                          .exp_country_name
                                      : editRequestOriginDetails.coo[0]
                                          .exp_country_name_e
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                component={Select}
                                className={classes.textField}
                                id="updated_exp_country_code"
                                name="updated_exp_country_code"
                                variant="outlined"
                                disabled={type == "view" ? true : false}
                              >
                                {selectMenuData.country?.map((type, idx) => {
                                  return (
                                    <MenuItem
                                      key={idx}
                                      value={type.code}
                                      className={classes.menuItem}
                                    >
                                      {type.code_name_e}
                                    </MenuItem>
                                  );
                                })}
                              </Field>
                            </Grid>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
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
                        <FaBoxes className={classes.address} />
                        <Typography>
                          {t("SERVICESPAGES.AMEND.GOODDETAILS")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container xs={12}>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.heading}
                              variant="body2"
                            >
                              {t("SERVICESPAGES.AMEND.BEFORE")}
                            </Typography>
                          </Grid>

                          <Grid item xs={12}>
                            <TableContainer>
                              <Table
                                className={classes.table}
                                aria-label="simple table"
                              >
                                <TableHead>
                                  <TableRow>
                                    <TableCell>
                                      {" "}
                                      {t("SERVICESPAGES.AMEND.HS")}
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      {t("SERVICESPAGES.AMEND.NAME")}
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      {t("SERVICESPAGES.AMEND.QUANTITY")}
                                    </TableCell>
                                    <TableCell>
                                      {t("SERVICESPAGES.AMEND.UNIT")}
                                    </TableCell>
                                    <TableCell>
                                      {t("SERVICESPAGES.AMEND.WEIGHT")}{" "}
                                    </TableCell>
                                    <TableCell>
                                      {t("SERVICESPAGES.AMEND.PRICE")}
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {editRequestOriginDetails?.details?.length &&
                                    editRequestOriginDetails?.details.map(
                                      (row) => (
                                        <TableRow key={row.name}>
                                          <TableCell component="th" scope="row">
                                            {row.hs_code}
                                          </TableCell>
                                          <TableCell>
                                            {isRTL
                                              ? row.hs_level2_name
                                              : row.hs_level2_name_e}
                                          </TableCell>
                                          <TableCell>{row.qty}</TableCell>
                                          <TableCell>
                                            {row.unit_of_measure_name_e}
                                          </TableCell>
                                          <TableCell>{row.weight}</TableCell>
                                          <TableCell>
                                            {row.total_price}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </Grid>
                          <Grid
                            container
                            spacing={1}
                            item
                            xs={12}
                            style={{ marginBottom: 16 }}
                          >
                            <Grid item xs={12}>
                              <Typography
                                className={classes.subHeading}
                                variant="subtitle1"
                              >
                                {t("SERVICESPAGES.AMEND.ADVANCE")}
                              </Typography>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line1"
                                name="line1"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line1 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line1
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line2"
                                name="line2"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line2 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line2
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line3"
                                name="line3"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line3 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line3
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line4"
                                name="line4"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line4 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line4
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line5"
                                name="line5"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line5 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line5
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line16"
                                name="line6"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line6 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line6
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line7"
                                name="line7"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line7 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line7
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line8"
                                name="line8"
                                variant="outlined"
                                value={
                                  editRequestOriginDetails?.coo?.length > 0
                                    ? editRequestOriginDetails?.coo[0]?.line8 ==
                                      null
                                      ? ""
                                      : editRequestOriginDetails?.coo[0]?.line8
                                    : ""
                                }
                              />
                            </Grid>
                            <Grid item md={6} xs={12}>
                              {" "}
                              <Field
                                disabled
                                component={TextField}
                                className={classes.textField}
                                id="line9"
                                name="line9"
                                variant="outlined"
                                value={t("SERVICESPAGES.AMEND.HOLDER")}
                              />
                            </Grid>
                          </Grid>
                          <Box className={classes.divider2}></Box>
                          <Grid item xs={12}>
                            <Typography
                              className={classes.heading}
                              variant="body2"
                            >
                              {t("SERVICESPAGES.AMEND.AFTER")}
                            </Typography>
                            <Grid item xs={12}>
                              {type == "view" ? (
                                <TableContainer>
                                  <Table
                                    className={classes.table}
                                    aria-label="simple table"
                                  >
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>
                                          {" "}
                                          {t("SERVICESPAGES.AMEND.HS")}
                                        </TableCell>
                                        <TableCell>
                                          {" "}
                                          {t("SERVICESPAGES.AMEND.NAME")}
                                        </TableCell>
                                        <TableCell>
                                          {" "}
                                          {t("SERVICESPAGES.AMEND.QUANTITY")}
                                        </TableCell>
                                        <TableCell>
                                          {t("SERVICESPAGES.AMEND.UNIT")}
                                        </TableCell>
                                        <TableCell>
                                          {t("SERVICESPAGES.AMEND.WEIGHT")}{" "}
                                        </TableCell>
                                        <TableCell>
                                          {t("SERVICESPAGES.AMEND.PRICE")}
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {cooGoodsEditData?.items?.length &&
                                        cooGoodsEditData?.items.map((row) => (
                                          <TableRow key={row.name}>
                                            <TableCell
                                              component="th"
                                              scope="row"
                                            >
                                              {row.hs_code}
                                            </TableCell>
                                            <TableCell>
                                              {isRTL
                                                ? row.hs_level2_name
                                                : row.hs_level2_name_e}
                                            </TableCell>
                                            <TableCell>{row.qty}</TableCell>
                                            <TableCell>
                                              {row.unit_of_measure_name_e}
                                            </TableCell>
                                            <TableCell>{row.weight}</TableCell>
                                            <TableCell>
                                              {row.total_price}
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              ) : null}
                            </Grid>
                            <Grid container spacing={1} item xs={12}>
                              <Grid item xs={12}>
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
                                  id="updateline1"
                                  name="updateline1"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.ONE")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline1?.length == 200 ? (
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
                                  id="updateline2"
                                  name="updateline2"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.TWO")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline2?.length == 200 ? (
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
                                  id="updateline3"
                                  name="updateline3"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.THREE")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline3?.length == 200 ? (
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
                                  id="updateline4"
                                  name="updateline4"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.FOUR")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline4?.length == 200 ? (
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
                                  id="updateline5"
                                  name="updateline5"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.FIVE")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline5?.length == 200 ? (
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
                                  id="updateline6"
                                  name="updateline6"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.SIX")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline6?.length == 200 ? (
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
                                  id="updateline7"
                                  name="updateline7"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.SEVEN")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline7?.length == 200 ? (
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
                                  id="updateline8"
                                  name="updateline8"
                                  variant="outlined"
                                  placeholder={
                                    type == "edit" &&
                                    t("SERVICESPAGES.AMEND.EIGHT")
                                  }
                                  disabled={type == "view" ? true : false}
                                  inputProps={{
                                    maxLength: 200,
                                  }}
                                />
                                {values.updateline8?.length == 200 ? (
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
                                  id="updateline9"
                                  name="updateline9"
                                  variant="outlined"
                                  value={t("SERVICESPAGES.AMEND.HOLDER")}
                                  disabled
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          {type != "view" ? (
                            <Grid container>
                              <Grid container spacing={1} xs={12}>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  className={classes.inpuContainer}
                                >
                                  <InputLabel className={classes.label}>
                                    {t("SERVICESPAGES.AMEND.GOODS")}{" "}
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>

                                  <Autocomplete
                                    onInputChange={(e) =>
                                      setinputValue(e.target.value)
                                    }
                                    onBlur={() => setinputValue("")}
                                    open={inputValue?.length > 1}
                                    className={classes.textField}
                                    id="contact-autocomplete"
                                    options={
                                      selectMenuData?.hsItems
                                        ? selectMenuData.hsItems
                                        : []
                                    }
                                    getOptionLabel={(option) =>
                                      isRTL
                                        ? option?.code_name
                                        : option?.code_name_e
                                    }
                                    onChange={(e, value) => setHsItem(value)}
                                    includeInputInList
                                    renderInput={(params) => (
                                      <Field
                                        component={TextField}
                                        {...params}
                                        error={Boolean(
                                          touched.item_code && errors.item_code
                                        )}
                                        fullWidth
                                        helperText={
                                          touched.item_code && errors.item_code
                                        }
                                        name="item_code"
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
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  className={classes.inpuContainer}
                                >
                                  <InputLabel className={classes.label}>
                                    {t("SERVICESPAGES.AMEND.WEIGHT")}
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
                                  />
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  className={classes.inpuContainer}
                                >
                                  <InputLabel className={classes.label}>
                                    {t("SERVICESPAGES.AMEND.UNIT")}
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>
                                  <Field
                                    disabled={false}
                                    component={Select}
                                    className={classes.textField}
                                    MenuProps={{
                                      anchorOrigin: {
                                        vertical: "top",
                                        horizontal: isRTL ? "right" : "left",
                                      },
                                      getContentAnchorEl: null,
                                    }}
                                    id={`uom`}
                                    name={`uom`}
                                    variant="outlined"
                                  >
                                    {selectMenuData?.uom?.map((type, idx) => {
                                      return (
                                        <MenuItem
                                          key={idx}
                                          value={type}
                                          className={classes.menuItem}
                                        >
                                          {isRTL ? type.name : type.name_e}
                                        </MenuItem>
                                      );
                                    })}
                                  </Field>
                                </Grid>
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  className={classes.inpuContainer}
                                >
                                  <InputLabel className={classes.label}>
                                    {t("SERVICESPAGES.AMEND.QUANTITY")}
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>

                                  <Field
                                    component={TextField}
                                    className={classes.textField}
                                    variant="outlined"
                                    name={`qty`}
                                    id={`qty`}
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
                                <Grid
                                  item
                                  md={6}
                                  xs={12}
                                  className={classes.inpuContainer}
                                >
                                  <InputLabel className={classes.label}>
                                    {t("SERVICESPAGES.AMEND.PRICE")}
                                    <span style={{ color: "red" }}>*</span>
                                  </InputLabel>

                                  <Field
                                    component={TextField}
                                    className={classes.textField}
                                    variant="outlined"
                                    name={`total_price`}
                                    id={`total_price`}
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
                                <Grid
                                  item
                                  md={6}
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
                                    variant="outlined"
                                    value={
                                      values.qty &&
                                      values.total_price &&
                                      values.total_price / values.qty
                                    }
                                  />
                                </Grid>
                              </Grid>
                              <Grid
                                container
                                item
                                // xs={6}
                                className={classes.inpuContainer}
                              >
                                <Fab
                                  color="primary"
                                  aria-label="add"
                                  size="medium"
                                  onClick={() => {
                                    let newGoods = [...goodsDetails];
                                    newGoods.push({
                                      coo_code: values.cooCode,
                                      hs_code: hsItem?.hs_code,
                                      hs_level2_name: hsItem?.name,
                                      hs_level2_name_e: hsItem?.name_e,
                                      item_code: hsItem?.item_code,
                                      weight: values.weight,
                                      uom: values.uom.code,
                                      unit_of_measure_name_e: values.uom.name_e,
                                      unit_of_measure_name: values.uom.name,
                                      qty: values.qty,
                                      total_price: values.total_price,
                                      unit_price: values.unit_price,
                                      serial_no: serialNo + 1,
                                    });
                                    setGoodsDetails(newGoods);
                                    setSerialNo(serialNo + 1);
                                    resetForm({
                                      values: {
                                        ...values,
                                        weight: "",
                                        uom: "",
                                        qty: "",
                                        total_price: "",
                                        unit_price: "",
                                      },
                                    });
                                  }}
                                  // disabled={!isValid || !dirty}
                                >
                                  <AddIcon />
                                </Fab>
                              </Grid>
                              <Grid
                                container
                                // xs={6}
                              >
                                <Box className={classes.divider}>
                                  <Typography
                                    variant="h5"
                                    color="primary"
                                    gutterBottom
                                    name="fills"
                                  >
                                    {t("SERVICESPAGES.AMEND.GOODSLIST")}
                                  </Typography>
                                </Box>
                                <Box>
                                  {goodsDetails?.length > 0 &&
                                    goodsDetails?.map((good, index) => (
                                      <Box className={classes.infoBox}>
                                        <Grid container>
                                          <Fab
                                            color="primary"
                                            aria-label="remove"
                                            size="small"
                                            onClick={() =>
                                              handleRemove(good.serial_no)
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
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t("SERVICESPAGES.AMEND.HS")}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
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
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? ((item.hs_level2_name_e =
                                                          value?.name_e),
                                                        (item.hs_code =
                                                          value?.hs_code),
                                                        (item.hs_level2_name =
                                                          value?.name),
                                                        (item.item_code =
                                                          value?.item_code))
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
                                                }}
                                                key={good.hs_code}
                                                renderInput={(params) => (
                                                  <TextField2
                                                    {...params}
                                                    variant="outlined"
                                                    fullWidth
                                                  />
                                                )}
                                                PaperComponent={({
                                                  children,
                                                }) => (
                                                  <Paper
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      direction: isRTL
                                                        ? "rtl"
                                                        : "ltr",
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
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t("SERVICESPAGES.AMEND.GOODS")}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
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
                                                    ? option?.hs_level2_name_e
                                                    : option?.name_e
                                                }
                                                key={good.hs_level2_name}
                                                onChange={(e, value) => {
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? ((item.hs_level2_name_e =
                                                          value?.name_e),
                                                        (item.hs_code =
                                                          value?.hs_code),
                                                        (item.hs_level2_name =
                                                          value?.name),
                                                        (item.item_code =
                                                          value?.item_code))
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
                                                }}
                                                renderInput={(params) => (
                                                  <TextField2
                                                    {...params}
                                                    variant="outlined"
                                                    fullWidth
                                                  />
                                                )}
                                                PaperComponent={({
                                                  children,
                                                }) => (
                                                  <Paper
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      direction: isRTL
                                                        ? "rtl"
                                                        : "ltr",
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
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t(
                                                  "SERVICESPAGES.AMEND.WEIGHT"
                                                )}{" "}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
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
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? (item.weight =
                                                          e.target.value)
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
                                                }}
                                              />
                                            </Grid>
                                            <Grid
                                              item
                                              md={6}
                                              xs={12}
                                              className={classes.inpuContainer}
                                            >
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t("SERVICESPAGES.AMEND.UNIT")}{" "}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
                                              </InputLabel>

                                              <Field
                                                disabled={false}
                                                component={Select}
                                                className={classes.textField}
                                                MenuProps={{
                                                  anchorOrigin: {
                                                    vertical: "top",
                                                    horizontal: isRTL
                                                      ? "right"
                                                      : "left",
                                                  },
                                                  getContentAnchorEl: null,
                                                }}
                                                id={`uom`}
                                                name={`uom`}
                                                variant="outlined"
                                                value={good.uom}
                                                onChange={(e) => {
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  let uom = null;
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? ((item.uom =
                                                          e.target.value),
                                                        (uom =
                                                          selectMenuData?.uom?.filter(
                                                            (data) =>
                                                              data.code ==
                                                              e.target.value
                                                          )),
                                                        (item.unit_of_measure_name_e =
                                                          uom[0]?.name_e),
                                                        (item.unit_of_measure_name =
                                                          uom[0]?.name))
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
                                                }}
                                              >
                                                {selectMenuData?.uom?.map(
                                                  (type, idx) => {
                                                    return (
                                                      <MenuItem
                                                        key={idx}
                                                        value={type.code}
                                                        className={
                                                          classes.menuItem
                                                        }
                                                      >
                                                        {isRTL
                                                          ? type.name
                                                          : type.name_e}
                                                      </MenuItem>
                                                    );
                                                  }
                                                )}
                                              </Field>
                                            </Grid>
                                            <Grid
                                              item
                                              md={4}
                                              xs={12}
                                              className={classes.inpuContainer}
                                            >
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t(
                                                  "SERVICESPAGES.AMEND.QUANTITY"
                                                )}{" "}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
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
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? ((item.qty =
                                                          e.target.value),
                                                        (item.unit_price =
                                                          good.total_price /
                                                          e.target.value))
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
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
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t("SERVICESPAGES.AMEND.PRICE")}{" "}
                                                <span style={{ color: "red" }}>
                                                  *
                                                </span>
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
                                                  let newDetails = [
                                                    ...goodsDetails,
                                                  ];
                                                  newDetails?.map((item, i) =>
                                                    i == index
                                                      ? ((item.total_price =
                                                          e.target.value),
                                                        (item.unit_price =
                                                          e.target.value /
                                                          item.qty))
                                                      : item
                                                  );
                                                  setGoodsDetails(newDetails);
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
                                              <InputLabel
                                                className={classes.label}
                                              >
                                                {t(
                                                  "SERVICESPAGES.AMEND.UNITPRICE"
                                                )}
                                              </InputLabel>

                                              <Field
                                                disabled
                                                component={TextField}
                                                className={classes.textField}
                                                id={`unit_price`}
                                                name={`unit_price`}
                                                value={good.unit_price}
                                                variant="outlined"
                                              />
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    ))}
                                </Box>
                              </Grid>
                            </Grid>
                          ) : null}
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
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
                        <IoCopy className={classes.address} />
                        <Typography>
                          {t("SERVICESPAGES.AMEND.COPIES")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography className={classes.note}>
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
                              {t("SERVICESPAGES.AMEND.COPY")}{" "}
                            </InputLabel>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Field
                              component={TextField}
                              className={classes.textField}
                              variant="outlined"
                              name="copy_number"
                              id="numOfCopies"
                              type="number"
                              min="1"
                              disabled={type == "view" ? true : false}
                              onChange={(e) => {
                                if (e.target.value < 0) e.target.value = 0;
                                setFieldValue("copy_number", e.target.value);
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
                              value={values.copy_number * 50}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                  <Grid item xs={12}>
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
                        <GoVerified className={classes.address} />
                        <Typography>
                          {t("SERVICESPAGES.AMEND.SEALS")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={1}>
                          <Grid item md={6} xs={12}>
                            <InputLabel
                              htmlFor="numOfseals"
                              className={classes.label}
                            >
                              {t("SERVICESPAGES.AMEND.SEALSNUM")}
                            </InputLabel>
                            <Field
                              component={TextField}
                              className={classes.textField}
                              variant="outlined"
                              name="seal_number"
                              id="numOfseals"
                              type="number"
                              min="1"
                              disabled={type == "view" ? true : false}
                              onChange={(e) => {
                                if (e.target.value < 0) e.target.value = 0;
                                setFieldValue("seal_number", e.target.value);
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

                          <Grid item md={6} xs={12}>
                            <InputLabel
                              htmlFor="numOfsealsFees"
                              className={classes.label}
                            >
                              {t("SERVICESPAGES.AMEND.SEALSFEES")}{" "}
                            </InputLabel>
                            <Field
                              disabled
                              component={TextField}
                              className={classes.textField}
                              id="numOfsealsFees"
                              name="numOfsealsFees"
                              variant="outlined"
                              value={values.seal_number * 5}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                </Grid>
                {type == "edit" ? (
                  <Grid item xs={12}>
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
                          onDrop={(acceptedFiles) => {
                            if (acceptedFiles.length > 0 && attch?.countPages) {
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
                    ))}
                  </Grid>
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
                                onClick={() => handleRemoveAttachment(attch)}
                              >
                                <Remove />
                              </Fab>
                            </Grid>
                          ) : null}
                        </>
                      ))
                    : null}
                </Grid>
                <Grid item xs={12}>
                  <Box className={classes.divider}>
                    <InputLabel htmlFor="notes" className={classes.label}>
                      {t("SERVICESPAGES.AMEND.OTHER")}
                    </InputLabel>
                  </Box>

                  <textarea
                    rows={3}
                    disabled={type == "view" ? true : false}
                    value={
                      type == "view"
                        ? editRequestDetails?.items?.length > 0
                          ? editRequestDetails.items[0].user_note
                          : ""
                        : note
                    }
                    className={classes.textFieldNumberd}
                    name="notes"
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t("SERVICESPAGES.AMEND.OTHER")}
                  ></textarea>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="emp_notes" className={classes.label}>
                    {t("SERVICESPAGES.RATIFICATION.EMPLOYEE")}
                  </InputLabel>
                  <textarea
                    rows={5}
                    className={classes.textFieldNumberd}
                    name="emp_notes"
                    value={
                      editRequestDetails?.items
                        ? editRequestDetails?.items[0]?.emp_note
                        : ""
                    }
                    disabled
                  ></textarea>
                </Grid>
              </Grid>

              {type != "view" ? (
                <Button
                  variant="contained"
                  size="medium"
                  className={classes.send}
                  disableElevation
                  endIcon={<HiSave />}
                  onClick={submitForm}
                  disabled={
                    !isValid || allReqFiles == false
                    // || !dirty
                  }
                >
                  {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
                </Button>
              ) : null}
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
    </Box>
  );
}

export default AmendmentCooRequest;
