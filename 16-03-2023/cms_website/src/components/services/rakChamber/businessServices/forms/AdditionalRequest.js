import {
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Paper,
} from "@material-ui/core";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Select, TextField } from "formik-material-ui";
import Autocomplete from "@material-ui/lab/Autocomplete";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiSave } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import actions from "../../../../../redux/actions";
import { store } from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import ServiceStep from "../../steps/ServiceSteps";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.worker.min.js";

const {
  getCooAccreditedList,
  sendCooAdditionalRequest,
  sendCooAdditionalRequestDone,
  uploadRakFile,
  uploadRakFileDone,
  sendCooAttachments,
  sendMostUsedService,
  sendNotification,
  sendEmail,
} = actions;

function AdditionalRequest(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [issuedCooResults, setIssuedCooResults] = useState([]);
  const [note, setNote] = useState("");
  const [requiredAttachments, setRequiredAttchments] = useState([]);
  const [cooAttachment, setCooAttachment] = useState([]);
  const [cooTypeCode, setCooTypeCode] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});
  const [cooCode, setCooCode] = useState(null);
  const [filePagesCount, setFilePagesCount] = useState(null);
  const [code, setCode] = useState(null);

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");

  const handleAttachments = (code) => {
    setCooTypeCode(code);
    setCooAttachment([]);
    setRequiredAttchments(
      code == 55
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
              title: isRTL ? "شهادة المنشأ" : "Original certificate of origin ",
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
        : code == 54
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

  const initialValues = {
    cooCode: "",
    serviceType: "",
    count: "",
    fees: "",
    notes: "",
  };
  const regex = /^(0*[1-9][0-9]*(\.[0-9]*)?|0*\.[0-9]*[1-9][0-9]*)$/;

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
          code == 54 ||
          (val && filePagesCount && val < filePagesCount + 1)
      )
      .required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values, { resetForm }) => {
    let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
    if (profile) {
      setSendValues({
        company_code: profile?.company_code,
        coo_code: values.cooCode,
        coo_status_type: "C",
        income_code: values.serviceType,
        inserted_by: profile?.username,
        srv_count: values.count,
        user_note: note,
      });
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
  useEffect(() => {
    const company_code = profile?.company_code;
    const day_number = 365;
    dispatch(getCooAccreditedList({ data: { day_number, company_code } }));
    dispatch(sendMostUsedService({ data: 60 }));
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
    else if (profile == null || loggedType != "1")
      store.dispatch(push("/login"));
    if (memberType && memberType != "active" && memberType != "activeExpired")
      store.dispatch(push("/services/rak-chamber/dashboard"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.cooAccreditedListDone;
    if (result && result?.items) setIssuedCooResults(result?.items);
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
      dispatch(sendCooAdditionalRequest({ data: { ...sendValues } }));
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
    const result = APIServices.cooAdditionalRequestDone;
    if (result.rowcode) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.rowcode;
        return attch;
      });
      dispatch(
        sendCooAttachments({
          data: { coo_attach: cooAttachment },
          reqType: 55,
        })
      );
    }
  }, [APIServices.cooAdditionalRequestDone]);

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

  useEffect(async () => {
    const result = APIServices.cooAdditionalRequestDone;
    if (result.rowcode && APIServices.cooAttachments.affectedRow) {
      setOpen(true);
      setMessage(
        isRTL
          ? ` رقم طلبك هو ${result.rowcode} `
          : `Your Application Number is ${result.rowcode} .`
      );
      dispatch(
        sendNotification({
          data: {
            request_code: result.rowcode,
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
    if (Object.keys(APIServices.cooAdditionalRequestDone).length) {
      dispatch(sendCooAdditionalRequestDone({ data: [] }));
      dispatch(uploadRakFileDone({ data: [] }));
    }
  }, [APIServices.cooAttachments]);

  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.ADDITIONALREQ.TITLE")}{" "}
      </Typography>
      <ServiceStep getStatus={0} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
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
            <Form className={classes.fullForm} variant="outlined">
              <Grid container spacing={1}>
                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="cooCode" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.ISSUEDCOO")}{" "}
                    <span style={{ color: "red" }}>*</span>
                  </InputLabel>
                  <Autocomplete
                    className={classes.textField}
                    id="cooCode"
                    options={issuedCooResults}
                    getOptionLabel={(option) => String(option?.coo_code)}
                    value={cooCode}
                    onChange={(e, value) => {
                      setCooCode(value);
                      setFieldValue("cooCode", value?.coo_code || "");
                    }}
                    includeInputInList
                    renderInput={(params) => (
                      <Field
                        component={TextField}
                        {...params}
                        fullWidth
                        name="cooCode"
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

                <Grid item md={6} xs={12} className={classes.inpuContainer}>
                  <InputLabel htmlFor="serviceType" className={classes.label}>
                    {t("SERVICESPAGES.ADDITIONALREQ.TYPE")}{" "}
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
                    id="serviceType"
                    name="serviceType"
                    variant="outlined"
                    onChange={(event) => {
                      setFieldValue("serviceType", event.target.value);
                      handleAttachments(event.target.value);
                      setCode(event.target.value);
                    }}
                  >
                    <MenuItem
                      key={1}
                      value={"55"}
                      name="serviceType"
                      style={{ direction: isRTL ? "rtl" : "ltr" }}
                      className={classes.menuItem}
                    >
                      {t("SERVICESPAGES.ADDITIONALREQ.SEAL")}
                    </MenuItem>
                    <MenuItem
                      key={2}
                      value={"54"}
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
                    className={classes.textField}
                    type="number"
                    min="1"
                    id="count"
                    name="count"
                    variant="outlined"
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
                      values.serviceType == "54"
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
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                </Grid>
                <Grid container xs={12}>
                  <Box className={classes.divider}>
                    <Typography name="fills">
                      {t("SERVICESPAGES.ADDITIONALREQ.ATTACHMENT")}
                    </Typography>
                  </Box>
                </Grid>
                {requiredAttachments?.map((attch) => (
                  <Grid container item className={classes.inpuContainer}>
                    <InputLabel htmlFor={attch.key} className={classes.label}>
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
                      maxFileSize={attch?.maxSize ? attch?.maxSize : 30000000}
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
              <Button
                variant="contained"
                className={classes.send}
                onClick={submitForm}
                disabled={!isValid || !dirty || !allFilesUploaded}
                disableElevation
                endIcon={<HiSave />}
              >
                {t("SERVICESPAGES.ADDITIONALREQ.SAVE")}
              </Button>
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

export default memo(AdditionalRequest);
