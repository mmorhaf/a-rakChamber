import React, {
  memo,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import actions from "../../../../redux/actions";
import { useParams } from "react-router-dom";
import { Grid, Typography, Box, Button } from "@material-ui/core";
import HtmlPaymentTrx from "./HtmlPaymentTrx";
import ReactToPrint from "react-to-print";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { useTranslation } from "react-i18next";
import ServicesResultModal from "../ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
const { getPaymentTrx, getPaymentTrxDone, postPrintTracking } = actions;

const previewCooModelAr = {
  img: "/assets/images/logoCoo.png",
  copy: "/assets/images/watermark.png",
  stamp: "/assets/images/rakchamberStamp.png",
};

function PaymentTrx(props) {
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  let loggedType = sessionStorage.getItem("loggedType");
  const dispatch = useDispatch();
  const { code } = useParams();
  const componentRef = useRef();
  const { t } = useTranslation();
  let serviceProfile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let updateUser = sessionStorage.getItem("updateUser");
  const [trxDetails, setTrxDetails] = useState([]);
  const [trxItemDetails, setTrxItemDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    dispatch(getPaymentTrx({ data: { code } }));
  }, []);
  useLayoutEffect(() => {
    return () => dispatch(getPaymentTrxDone({ data: {} }));
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
    } else if (serviceProfile == null) store.dispatch(push("/login"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const result = APIServices.paymentTrx;
    if (result) {
      setTrxDetails(result?.items?.[0]);
      setTrxItemDetails(result?.items?.[0]?.details);
    }
  }, [APIServices.paymentTrx]);

  return (
    <Grid container className={classes.formRoot}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.serviceHeader}
      >
        <Typography className={classes.serviceTitle}>
          {t("SERVICESPAGES.CHECKOUT.RECEIPT")}{" "}
        </Typography>
        <ReactToPrint
          onBeforePrint={(e) => {
            let data = {
              certificate_no: code,
              trx_code: code,
              certificate_type: "trx",
              user_type: loggedType,
              branch_serial_no: "0",
              operation_type: "6",
              income_type: "0",
              user_name: serviceProfile?.username
                ? serviceProfile?.username
                : null,
            };
            dispatch(postPrintTracking({ data }));
          }}
          trigger={() => (
            <Button className={classes.printBtn}>
              <PrintOutlinedIcon />
            </Button>
          )}
          content={() => document.getElementById("profile_printSection_aura")}
        />
      </Box>
      <HtmlPaymentTrx
        ref={componentRef}
        trx_details={trxDetails}
        previewCooModelAr={previewCooModelAr}
        trx_item_details={trxItemDetails}
      />
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

export default memo(PaymentTrx);
