import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import clsx from "clsx";
import { push } from "connected-react-router";
import { Field, Form, Formik } from "formik";
import { Checkbox, Select, TextField } from "formik-material-ui";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsInfoSquare } from "react-icons/bs";
import { HiSave } from "react-icons/hi";
import { RiAttachmentLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import DropZone from "../../../../../components/shared/materialDropZone/DropZone";
import actions from "../../../../../redux/actions";
import { store } from "../../../../../redux/store";
import useStyles from "../../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../ServicesResultModal";
import ServiceStep from "../../steps/ServiceSteps";
import { PRODUCTION } from "../../../../../constants/config.json";

const {
  getRatificationType,
  getRatificationDocType,
  sendRatificationRequest,
  sendRatificationRequestDone,
  sendCooAttachments,
  uploadRakFile,
  uploadRakFileDone,
  sendMostUsedService,
  sendNotification,
  sendEmail,
} = actions;

function RatificationRequest(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [ratificationType, setRatificationType] = useState([]);
  const [ratificationDocType, setRatificationDocType] = useState([]);
  const [note, setNote] = useState("");
  const [requiredAttachments, setRequiredAttchments] = useState([
    {
      titleAr: "جواز السفر أو الهوية لمنجز المعاملة",
      titleEn: "Passport Copy Of Client  or UAE ID Card Passport Copy",
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
  const [fileType, setFileType] = useState("");
  const [cooTypeCode, setCooTypeCode] = useState("");

  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [sendValues, setSendValues] = useState({});

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
    APIServices,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");

  const initialValues = {
    ratificationCode: loggedType == "2" ? 2 : "",
    ratificationDocCode: "",
    lang: "",
    person_name: "",
    doc_desc: "",
    fees: "",
    notes: "",
    file: null,
    checkUndertraking: [],
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

  useEffect(() => {
    let isRequiredFiles = requiredAttachments?.filter((e) => e.isRequired);
    let action = isRequiredFiles?.map((item) =>
      cooAttachment?.some((i) => item.key == i.classification_code)
    );
    setAllFilesUploaded(action?.every((i) => i == true));
  }, [cooAttachment]);

  const englishLangRegex = /^[a-zA-Z0-9$@$!%*?&#-^_. +]+$/;
  const arabicLangRegex = /^[\u0621-\u064A\040]+$/;
  const validationSchema = Yup.object({
    ratificationCode: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    ratificationDocCode: Yup.object().required(isRTL ? "مطلوب" : "Required"),
    lang: Yup.string().required(isRTL ? "مطلوب" : "Required"),
    doc_desc: Yup.string().when(
      ["ratificationDocCode"],
      (ratificationDocCode, schema) => {
        if (ratificationDocCode?.code === 99) {
          return schema.required(isRTL ? "مطلوب" : "Required");
        } else {
          return schema;
        }
      }
    ),
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
      setCooTypeCode(values.ratificationCode);

      setSendValues({
        company_code: profile?.company_code ? profile?.company_code : 0,
        description:
          values.ratificationDocCode.code == 99
            ? values.doc_desc
            : values.ratificationDocCode.name,
        document_code: values.ratificationDocCode.code,
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
            code: profile?.company_code ? profile?.company_code : profile?.code,
            data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        })
      );
      // dispatch(sendRatificationRequest({ data: { ...readyValues } }));
      resetForm({});
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
    if (profile != null) {
      dispatch(getRatificationType());
      dispatch(getRatificationDocType());
    }
    dispatch(sendMostUsedService({ data: 63 }));
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
    const result = APIServices.ratificationType;
    if (result) setRatificationType(result);
  }, [APIServices.ratificationType]);

  useEffect(() => {
    const result = APIServices.ratificationDocType;
    if (result) setRatificationDocType(result);
  }, [APIServices.ratificationDocType]);

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
      dispatch(sendRatificationRequest({ data: { ...sendValues } }));
    }
  }, [APIServices.uploadRakFileDone]);

  useEffect(() => {
    const result = APIServices.ratificationRequest;
    if (result.rowcode) {
      cooAttachment.map((attch) => {
        attch["request_code"] = result.rowcode;
        attch["request_type"] = 1;
        return attch;
      });
      dispatch(
        sendCooAttachments({
          data: { ratification_attach: cooAttachment },
          reqType: 51,
        })
      );
    }
  }, [APIServices.ratificationRequest]);
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
    const result = APIServices.ratificationRequest;
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
    if (Object.keys(APIServices.ratificationRequest).length)
      dispatch(sendRatificationRequestDone({ data: {} }));
  }, [APIServices.cooAttachments]);
  return (
    <Grid container className={classes.formRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.SIDEMENU.RATIFICATION")}{" "}
      </Typography>
      <ServiceStep getStatus={0} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        validateOnChange={true}
      >
        {({
          isValid,
          dirty,
          values,
          submitForm,
          setFieldTouched,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form
            className={classes.fullForm}
            variant="outlined"
            autocomplete="off"
          >
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
                  <Grid item md={6} xs={12}>
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
                      disabled={loggedType == "2" ? true : false}
                    >
                      {ratificationType?.map((type, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={type.code}
                            name="ratificationCode"
                            style={{ direction: isRTL ? "RTL" : "LTR" }}
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

                  <Grid item md={6} xs={12}>
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
                    >
                      {ratificationDocType?.map((type, idx) => {
                        return (
                          <MenuItem
                            key={idx}
                            value={type}
                            name="ratificationDocCode"
                            style={{ direction: isRTL ? "RTL" : "LTR" }}
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
                  <Grid item md={6} xs={12}>
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
                    >
                      <MenuItem
                        key={1}
                        value={"1"}
                        name="lang"
                        style={{ direction: isRTL ? "RTL" : "LTR" }}
                        className={classes.menuItem}
                      >
                        1. {t("SERVICESPAGES.RATIFICATION.AR")}
                      </MenuItem>
                      <MenuItem
                        key={2}
                        value={"2"}
                        name="lang"
                        style={{ direction: isRTL ? "RTL" : "LTR" }}
                        className={classes.menuItem}
                      >
                        2. {t("SERVICESPAGES.RATIFICATION.EN")}
                      </MenuItem>
                    </Field>
                    {errors.lang && touched.lang ? (
                      <div className={classes.inputfeedback}>{errors.lang}</div>
                    ) : null}
                  </Grid>
                  {values.ratificationCode == "2" ? (
                    <Grid item md={6} xs={12}>
                      <InputLabel
                        htmlFor="person_name"
                        className={classes.label}
                      >
                        {t("SERVICESPAGES.RATIFICATION.PERSONNAME")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={clsx(
                          errors.person_name && classes.textFieldError,
                          classes.textField
                        )}
                        id="person_name"
                        name="person_name"
                        onChange={(e) => {
                          setFieldValue("person_name", e.target.value);
                          setFieldTouched("person_name");
                        }}
                        variant="outlined"
                      />
                    </Grid>
                  ) : null}
                  {values.ratificationDocCode.code == "99" ? (
                    <Grid item md={6} xs={12}>
                      <InputLabel htmlFor="doc_desc" className={classes.label}>
                        {t("SERVICESPAGES.RATIFICATION.DOCDESC")}{" "}
                        <span style={{ color: "red" }}>*</span>
                      </InputLabel>

                      <Field
                        component={TextField}
                        className={clsx(
                          errors.doc_desc && classes.textFieldError,
                          classes.textField
                        )}
                        id="doc_desc"
                        name="doc_desc"
                        onChange={(e) => {
                          setFieldValue("doc_desc", e.target.value);
                          setFieldTouched("doc_desc");
                        }}
                        variant="outlined"
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
                  <Grid item xs={12}>
                    <Box display="flex" alignItems="center" flexWrap={"wrap"}>
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
                      <InputLabel htmlFor={attch.key} className={classes.label}>
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
                        maxFileSize={attch?.maxSize ? attch?.maxSize : 30000000}
                        dropzoneText={
                          isRTL
                            ? "اسحب الملف أو انقر هنا"
                            : "drag and drop a file or click here"
                        }
                      />
                    </Grid>
                  ))}
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

                    <textarea
                      rows={3}
                      className={classes.textFieldNumberd}
                      name="notes"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder={t("SERVICESPAGES.RATIFICATION.CLIENT")}
                    ></textarea>
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
                    ></textarea>
                  </Grid>
                  <Grid item xs={12}>
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
                        {"   "}
                        {isRTL
                          ? "أتعهد بصحة وشرعية هذا المستند وصحة المعلومات الواردة فيه، وأتحمل المسؤولية المدنية والجنائية إذا ثبت عدم صحة بعض أو كل مما سبق، وعلاوةً على ذلك أتحمل جميع المسؤوليات في حالة ورود أخطاء من جانبي فيما يتعلق بإجراءات عملية التوثيق دون أي مسؤولية على غرفة تجارة وصناعة رأس الخيمة."
                          : "I, the undersigned, confirm the validity and legality of this document and the correctness of the information contained therein, and I bear civil and criminal responsibility if all or some of the above is proven to be invalid.  Moreover, I bear all responsibilities in the event of mistakes on my part received on our part regarding procedures for the certification process without any responsibility on the Ras Al Khaimah Chamber of Commerce and Industry."}
                      </label>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
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
        )}
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

export default memo(RatificationRequest);
