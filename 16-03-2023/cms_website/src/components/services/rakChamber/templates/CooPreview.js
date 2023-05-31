import React, { memo, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import actions from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import { Grid, Typography, Button, Box } from "@material-ui/core";
import { HtmlCooPreview } from "./HtmlCooPreview";
import { HtmlIssuedCooPreview } from "./HtmlIssuedCooPreview";
import HTML_PARSER from "react-html-parser";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { Receipt } from "@material-ui/icons";
import ReactToPrint from "react-to-print";
import HappinessMetter from "../../../floatingSocialButtons/HappinessMetter";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
import ServicesResultModal from "../ServicesResultModal";
import { PRODUCTION } from "../../../../constants/config.json";
import { CiFaceSmile } from "react-icons/ci";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

// import jsPDF from "jspdf";

const previewCooModelAr = {
  exporter: "المصدر (اسم، عنوان، بلد)",
  sentTo: "المرسل إليه (اسم، عنوان، بلد)",
  transport: "وسيلة النقل",
  depatureDate: "التاريخ المتوقع للمغادرة",
  dischargePort: "ميناء/ مكان التفريغ",
  uae: "دولة الإمارات العربية المتحدة",
  typeOfCopy: "Copy For Preview & Verify Only نسخة للعرض والتحقق فقط",
  typeOfCopy1: "Original النسخة الأصلیة",
  typeOfCopy2: "Copy صورة طبق الأصل",
  outCountry: "بلد الوجهة الأخيرة",
  invoiceDate: "رقم وتاريخ الفاتورة",
  originCountry: "بلد منشأ البضاعة",
  marksNum: "العلامات والأرقام",
  kindofPackage: "عدد نوع التعبئة، وصف البضاعة، أسماء الماركات إذا لزم",
  quantityUnit: "الكمية والوحدة",
  asPerAttached: "حسب الفاتورة المرفقة",
  cerification: "تصديق جهة الإصدار",
  certificationDescr:
    "نشهد بأنه قد تم تقديم الأدلة بأن البضاعة المذكورة أعلاه منشؤها/تصنيعها في البلد الموضح في الخانة 8. ولذلك  فإن الشهادة قد تم إصدارها و التصديق عليها حسب معرفتنا واعتقادنا بصحتها دون أية مسؤولية علينا.",
  authorizedSign: "المخول بالتوقيع",
  signDescr:
    "بمجرد إصدار هذه الشهادة فإن أى تغير فيها بدون إذن من جهة الإصدار يجعلها لاغية.",
  toVerify: "للتأكد من صحة بيانات الشهادة يرجي الرجوع لموقع الغرفة",
  rakChamber: "غرفة تجارة وصناعة رأس الخيمة",
  pobox:
    "P.O.Box 87- Rak,U.A.E.صندوق البريد | Tel(Inside UAE) 072070222|Tel(Outside UAE)(+971) 7 2070222 هاتفFax(+971) 7 2260112 فاكس|Email:coo@rakchamber.ae البريد الألكتروني |Website:www.rakchamber.ae الموقع الألكتروني",
  img: "/assets/images/logoCoo.png",
  copy: "/assets/images/verify-copy.png",
  issued_img: "/assets/images/chamber_bg.png",
  issued_coo_img: "/assets/images/logoCoo.png",
  signature: "/assets/images/scan0086.jpg",
  icc: "/assets/images/ICC.png",
  stamp: "/assets/images/E-stamp_PNG11-Original.jpg",
};
const { getCooVerifyData, getCooStamps, createNew, postPrintTracking } =
  actions;

function CooPreview(props) {
  const componentRef = useRef();
  const [coo_ws_data, setCoo_ws_data] = useState([]);
  const [origin_countries_data, setOrigin_countries] = useState("");
  const [details, setDetails] = useState([]);
  const [cooStamps, setCooStamps] = useState([]);
  const [open, setOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [url, setUrl] = useState("");
  const classes = useStyles();
  const dispatch = useDispatch();
  let { code, type, income_code, count, trx, req_code } = useParams();
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const { t } = useTranslation();
  const reducers = useSelector((state) => state);
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  useEffect(async () => {
    let clear = sessionStorage.getItem("clear");
    if (clear && type != "verify" && type !== "coo-verify") {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    } else if (profile == null && type != "verify" && type !== "coo-verify")
      store.dispatch(push("/login"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    if (window.location.href) {
      let sort = "qrcode/generate";
      let payload = {
        text: `${PRODUCTION}/en/services-form/business-services/coo-preview/verify/${code}/null/null/null/null`,
      };
      dispatch(createNew({ payload, sort }));
    }
  }, [window.location.href]);

  useEffect(() => {
    if (
      reducers?.crudReducers?.created?.returnedTypeName === "qrcode" &&
      reducers?.crudReducers?.created?.result
    )
      setUrl(reducers?.crudReducers?.created?.result);
  }, [reducers]);

  useEffect(() => {
    dispatch(getCooVerifyData({ data: { code, type } }));
    let trx_code = trx;
    let additional_request_code = req_code;
    let coo_code = code;
    if (type == "print_issued") {
      dispatch(
        getCooStamps({
          data: { trx_code, additional_request_code, coo_code },
        })
      );
    }
  }, []);

  useEffect(() => {
    const result = APIServices.cooVerificationDataReturned;
    if (result && result?.length != 0) {
      if (result?.coo && result?.coo[0]) {
        setCoo_ws_data(result?.coo[0]);
      } else if (result?.coo_ws && result?.coo_ws[0]) {
        setCoo_ws_data(result?.coo_ws[0]);
      }
      if (result?.origin_countries[0]) {
        let countries = [];
        countries = !isRTL
          ? result?.origin_countries
              ?.map((item) =>
                item?.country_name_e ? item?.country_name_e : item?.name_e
              )
              .join(",")
          : result?.origin_countries
              ?.map((item) =>
                item?.country_name ? item?.country_name : item?.name
              )
              .join(",");
        setOrigin_countries(countries);
      }
      if (result?.details?.length && result?.details[0]) {
        setDetails(result?.details);
      }
    }
  }, [APIServices.cooVerificationDataReturned]);

  useEffect(() => {
    const result = APIServices.cooStamps;
    if (result) setCooStamps(result);
  }, [APIServices.cooStamps]);

  const rateValues = {
    ref_code:
      income_code == "54"
        ? coo_ws_data?.code
          ? String(coo_ws_data?.code)
          : null
        : coo_ws_data?.coo_code
        ? String(coo_ws_data?.coo_code)
        : null,
    req_code:
      income_code == "54"
        ? coo_ws_data?.code
          ? String(coo_ws_data?.code)
          : null
        : coo_ws_data?.online_code
        ? String(coo_ws_data?.online_code)
        : null,
    income_code: income_code,
    service_step: 5,
    inserted_by: profile?.username,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    service_code:
      type === "coo-verify"
        ? "105"
        : income_code == "54"
        ? "107"
        : income_code == "50"
        ? "102"
        : income_code == "56"
        ? "106"
        : "102",
    chamber_remarks: coo_ws_data?.verify_id,
  };

  const copies = () => {
    let cooCopies = [];
    let counter = count;
    if (income_code == "50" || income_code == "56") {
      counter = Number(count) + 1;
    }
    for (let i = 0; i < counter; i++) {
      cooCopies.push(
        <>
          {HTML_PARSER(
            HtmlIssuedCooPreview(
              coo_ws_data,
              origin_countries_data,
              previewCooModelAr,
              !isRTL && "en_US",
              url,
              details
            )
          )}
        </>
      );
    }

    return cooCopies;
  };
  return (
    <Grid container className={classes.formRoot}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.serviceHeader}
      >
        <Typography className={classes.serviceTitle}>
          {isRTL ? "عرض شهادة المنشأ " : "COO Preview"}
        </Typography>
        <Typography className={classes.fontFamily}>
          {isRTL ? "للاطلاع فقط " : "Read Only"}
        </Typography>
        <Box className={classes.space}>
          <Button
            className={clsx(
              classes.send,
              classes.marginLeft16,
              classes.smallerBtn,
              classes.marginRight16,
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
              <Button
                className="printBtn"
                disabled={
                  type == "print_issued" && coo_ws_data?.print_flag == 2
                }
              >
                <PrintOutlinedIcon />
              </Button>
            )}
            onBeforePrint={(e) => {
              let data = {
                certificate_no: code,
                trx_code: 0,
                certificate_type: "coo",
                user_type: loggedType,
                branch_serial_no: "0",
                operation_type: "59",
                income_type: type == "print_issued" ? "50" : "0",
                user_name: profile?.username ? profile?.username : null,
              };
              dispatch(postPrintTracking({ data }));
            }}
            content={() =>
              type == "print_issued"
                ? document.getElementById("profile_printSection_aura")
                : document.getElementById("printSection_aura")
            }
          />
        </Box>
      </Box>

      {type == "print_issued" ? (
        <>
          <div class="alert-info p-a text-center ng-binding">
            {isRTL ? "يرجى الطباعة بإعدادت A4" : "Please, Print in A4 Setting"}
            <br />
            {isRTL
              ? "مدة صلاحية الطباعة 3 أيام عمل من تاريخ إصدار فاتورة الغرفة"
              : "Note: The validity period of the printing is 3 working days from the date of Rak Chamber Invoice is issued"}
          </div>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
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
                    push(`/services-form/business-services/trx-preview/${trx}`)
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
                    <Typography style={{ color: "#999", textAlign: "start" }}>
                      مدة صلاحية استعراض الملفات انتهت
                    </Typography>
                  ) : (
                    <Typography style={{ color: "#999", textAlign: "start" }}>
                      File validity period is Expired
                    </Typography>
                  )
                ) : (
                  <Button
                    style={{ display: "flex", justifyContent: "start" }}
                    target="_blank"
                    href={`${PRODUCTION}/api/stamp/download/${item.stampped_file_name}`}
                  >
                    <img src="/assets/icons/pdf.png" style={{ padding: 8 }} />
                    <Typography>{item.stampped_file_name}</Typography>
                  </Button>
                )
              )
            ) : isRTL ? (
              <Box display="flex" alignItems="center">
                <img src="/assets/icons/pdf.png" style={{ padding: 8 }} />{" "}
                <Typography>لا توجد ملفات مختومة بعد لهذا الطلب</Typography>
              </Box>
            ) : (
              <Box display="flex" alignItems="center">
                <img src="/assets/icons/pdf.png" style={{ padding: 8 }} />
                <Typography>
                  There are no stamped files for this request yet
                </Typography>
              </Box>
            )}
            <Box className={classes.divider2}></Box>
          </Grid>
        </>
      ) : null}
      {/* <Button ref={componentRef} onClick={() => savePDF()}>
        button
      </Button> */}
      {type == "print_issued" ? (
        <Box ref={componentRef} id="profile_printSection_aura">
          {copies()}
        </Box>
      ) : (
        <Box ref={componentRef}>
          {HTML_PARSER(
            HtmlCooPreview(
              coo_ws_data,
              origin_countries_data,
              previewCooModelAr,
              !isRTL && "en_US"
            )
          )}
        </Box>
      )}
      <HappinessMetter
        open={open}
        setOpen={setOpen}
        rateValues={rateValues}
        closeBtn={true}
      />
      <ServicesResultModal
        open={openPopup}
        setOpen={setOpenPopup}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
    </Grid>
  );
}

export default memo(CooPreview);
