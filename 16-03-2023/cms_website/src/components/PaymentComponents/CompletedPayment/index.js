import React, { useState, memo, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Button,
  DialogContent,
  DialogContentText,
  Dialog,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import useStyles from "../../../styles/components/services/servicesTabPane";
import actions from "../../../redux/actions";
import HappinessMetter from "../../floatingSocialButtons/HappinessMetter";
import ReactToPrint from "react-to-print";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import HtmlPaymentTrx from "../../services/rakChamber/templates/HtmlPaymentTrx";
import axios from "axios";
import ServicesResultModal from "../../services/rakChamber/ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../redux/store";
import { PRODUCTION } from "../../../constants/config.json";
import moment from "moment";
const {
  postConfirmPaymentData,
  getFileList,
  fileStamp,
  finishFileStamp,
  sendNotification,
  sendEmail,
  postPrintTracking,
  getTrxCooList,
} = actions;
const previewCooModelAr = {
  img: "/assets/images/logoCoo.png",
  copy: "/assets/images/watermark.png",
  stamp: "/assets/images/rakchamberStamp.png",
};
export default function PaymentCompleted(props) {
  const classes = useStyles();
  const componentRef = useRef();
  const dispatch = useDispatch();
  let result = "SUCCESS";
  const uuid = useParams().uuid;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resultIndicator = searchParams.get("resultIndicator");
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [openMsgPopup, setOpenMsgPopup] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [files, setFiles] = useState(false);
  const [ratifiFiles, setRatifiFiles] = useState(false);
  const [allFiles, setAllFiles] = useState(false);
  const [trxDetails, setTrxDetails] = useState([]);
  const [trxItemDetails, setTrxItemDetails] = useState([]);
  const [paymentResponse, setPaymentResponse] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [data, setData] = useState([]);
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");
  let updateUser = sessionStorage.getItem("updateUser");
  useEffect(async () => {
    await axios
      .get(`/api/payment/test/transaction?uuid=${uuid}`)
      .then((response) => {
        if (response.data) {
          result =
            response.data.successIndicator == resultIndicator
              ? "SUCCESS"
              : "ERROR";
          setPaymentResponse(response.data);
          response.data.onlinePayments &&
            setData(JSON.parse(response.data.onlinePayments)[0]);
        }
      });
  }, []);

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear) {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
      setNoThanks(true);
    } else if (profile == null) store.dispatch(push("/login"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    if (
      paymentResponse &&
      paymentResponse?.success == true &&
      data &&
      data?.online_peyment_code
    ) {
      const readyValues = {
        payment_code: data && data?.payment_code,
        paid_fees: paymentResponse.deductedAmount,
        order_id: data && data?.online_peyment_code,
        order_reference: data && data?.orderReference,
        succeeded: result == "SUCCESS" ? 1 : 0,
        username: profile?.username,
        computer_ip: "null",
        adjustment_flag: data && data?.adjustment_flag,
        bank_reference: paymentResponse.bankReference,
        credit_card: paymentResponse.cardNumber,
      };
      dispatch(postConfirmPaymentData({ data: { ...readyValues } }));

      axios.post(`/api/info`, {
        key: `${data?.online_peyment_code} / confirm_payment`,
        data: JSON.stringify(readyValues),
      });
    } else if (result != "SUCCESS" || paymentResponse?.success == false) {
      setErrMsg(
        isRTL
          ? "فشل في عملية إتمام المعاملة في بوابة الدفع الإلكتروني "
          : "Failed to complete the transaction in the e-payment gateway"
      );
    }
  }, [paymentResponse, data]);

  const rateValues = {
    service_step: 4,
    inserted_by: profile?.username,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    online_payment_code: data && data?.online_peyment_code,
    service_code: 117,
  };

  useEffect(async () => {
    if (APIServices.confirmOnlinePayment) {
      axios.post(`/api/info`, {
        key: `${data?.online_peyment_code} / confirm_payment_result`,
        data: JSON.stringify(APIServices.confirmOnlinePayment),
      });
      if (APIServices.confirmOnlinePayment.o_result) {
        if (APIServices?.confirmOnlinePayment?.o_result[0]?.status == -1) {
          setErrMsg(APIServices.confirmOnlinePayment.o_result[0]?.msg);
        } else if (APIServices?.confirmOnlinePayment?.o_result[0]?.code) {
          if (
            APIServices?.confirmOnlinePayment?.o_result[0]?.trx_exist_flag == 1
          ) {
            setTrxDetails(APIServices?.confirmOnlinePayment?.o_result[0]);
            setTrxItemDetails(
              APIServices?.confirmOnlinePayment?.o_result[0]?.details
            );
          } else if (
            paymentResponse?.deductedAmount == 0 &&
            paymentResponse?.adjustmentFlag == 1
          ) {
            setOpenMsgPopup(true);
            setOpen(true);
            setTrxDetails(APIServices?.confirmOnlinePayment?.o_result[0]);
            setTrxItemDetails(
              APIServices?.confirmOnlinePayment?.o_result[0]?.details
            );
            dispatch(
              getFileList({
                data: {
                  code: APIServices?.confirmOnlinePayment?.o_result[0]?.code,
                },
              })
            );
            dispatch(
              getTrxCooList({
                data: {
                  code: APIServices?.confirmOnlinePayment?.o_result[0]?.code,
                  date: moment(
                    APIServices?.confirmOnlinePayment?.o_result[0]?.issue_date
                  ).format("YYYY-MM-DD"),
                },
              })
            );
            axios.post(`/api/info`, {
              key: `${data?.online_peyment_code} / getFileList - deductedAmount = 0`,
              data: JSON.stringify(
                APIServices?.confirmOnlinePayment?.o_result[0]?.code
              ),
            });
          } else {
            setOpenMsgPopup(true);
            setOpen(true);
            setTrxDetails(APIServices?.confirmOnlinePayment?.o_result[0]);
            setTrxItemDetails(
              APIServices?.confirmOnlinePayment?.o_result[0]?.details
            );
            await axios
              .get(
                `/api/payment/test/capture?uuid=${uuid}&transactionId=${APIServices?.confirmOnlinePayment?.o_result[0]?.code}`
              )
              .then((response) => {
                axios.post(`/api/info`, {
                  key: `${data?.online_peyment_code} / capture`,
                  data: JSON.stringify(response),
                });
                if (response?.data.response.result == "ERROR") {
                  setErrMsg(response?.data.response.error.explanation);
                } else if (response?.data.result == "SUCCESS") {
                  dispatch(
                    getFileList({
                      data: {
                        code: APIServices?.confirmOnlinePayment?.o_result[0]
                          ?.code,
                      },
                    })
                  );
                  dispatch(
                    getTrxCooList({
                      data: {
                        code: APIServices?.confirmOnlinePayment?.o_result[0]
                          ?.code,
                        date: moment(
                          APIServices?.confirmOnlinePayment?.o_result[0]
                            ?.issue_date
                        ).format("YYYY-MM-DD"),
                      },
                    })
                  );
                }
              });

            dispatch(
              sendNotification({
                data: {
                  request_code: data && data?.online_peyment_code,
                  company_code: loggedType == "1" ? profile?.company_code : 0,
                  person_code: loggedType == "2" ? profile?.code : 0,
                  user_name: profile?.username,
                  service_action: "4",
                },
              })
            );
          }
        } else {
          setErrMsg(
            isRTL
              ? "فشل في عملية إتمام المعاملة في بوابة الدفع الإلكتروني "
              : "Failed to complete the transaction in the e-payment gateway"
          );
        }
      }
    }
  }, [APIServices.confirmOnlinePayment]);

  useEffect(() => {
    axios.post(`/api/info`, {
      key: `${data?.online_peyment_code} / getFileListDone`,
      data: JSON.stringify(APIServices?.getFileListDone),
    });
    if (
      APIServices.getFileListDone &&
      APIServices?.getFileListDone?.items?.length
    )
      setFiles(APIServices?.getFileListDone?.items);
  }, [APIServices.getFileListDone]);

  useEffect(() => {
    axios.post(`/api/info`, {
      key: `${data?.online_peyment_code} / fileStampDone`,
      data: JSON.stringify(APIServices?.fileStampDone),
    });
    let allFiles = [];
    if (APIServices.fileStampDone && APIServices.fileStampDone?.length) {
      APIServices.fileStampDone?.map((item) => {
        if (item?.success) {
          delete item["success"];
          allFiles?.push(item);
        }
      });
      dispatch(finishFileStamp({ data: APIServices.fileStampDone }));
      dispatch(
        sendNotification({
          data: {
            request_code: data && data?.online_peyment_code,
            company_code: loggedType == "1" ? profile?.company_code : 0,
            person_code: loggedType == "2" ? profile?.code : 0,
            user_name: profile?.username,
            service_action: "5",
          },
        })
      );
    }
  }, [APIServices.fileStampDone]);

  useEffect(() => {
    if (
      APIServices?.sendNotificationDone?.success &&
      APIServices?.sendNotificationDone?.sent_to
    ) {
      dispatch(
        sendEmail({
          data: {
            to: APIServices?.sendNotificationDone?.sent_to,
            subject: APIServices?.sendNotificationDone?.subject,
            body: APIServices?.sendNotificationDone?.email_body,
          },
        })
      );
      // if (
      //   (APIServices?.finishFileStampDone &&
      //     APIServices?.finishFileStampDone?.items) ||
      //   (allFiles && allFiles?.length == 0)
      // ) {
      //   store.dispatch(push("/services-form/issued-requests-list"));
      // }
    }
  }, [APIServices?.sendNotificationDone]);

  useEffect(() => {
    if (APIServices?.sendEmailDone && APIServices?.sendEmailDone?.success) {
      if (
        (APIServices?.finishFileStampDone &&
          APIServices?.finishFileStampDone?.items) ||
        (allFiles && allFiles?.length == 0)
      ) {
        setOpenMsgPopup(false);
      }
    }
  }, [APIServices?.sendEmailDone]);

  useEffect(() => {
    axios.post(`/api/info`, {
      key: `${data?.online_peyment_code} / files`,
      data: JSON.stringify(files),
    });
    if (files && files?.length) {
      let array = [];
      files?.map((item) => {
        if (item?.coo_to_stamp?.length)
          array = array?.concat(item?.coo_to_stamp);
        if (item?.request_to_stamp?.length)
          array = array?.concat(item?.request_to_stamp);

        if (item?.ratification_to_stamp?.length)
          array = array?.concat(item?.ratification_to_stamp);
      });
      setAllFiles(array);
      axios.post(`/api/info`, {
        key: `${data?.online_peyment_code} / files array`,
        data: JSON.stringify(array),
      });
    }
  }, [files]);

  useEffect(() => {
    axios.post(`/api/info`, {
      key: `${data?.online_peyment_code} / allFiles`,
      data: JSON.stringify(allFiles),
    });
    if (allFiles && allFiles?.length)
      dispatch(
        fileStamp({ data: allFiles, code: trxDetails.code, fileType: "stamp" })
      );
    // if (ratifiFiles && ratifiFiles?.length)
    //   dispatch(
    //     fileStamp({
    //       data: ratifiFiles,
    //       code: trxDetails.code,
    //       fileType: "ratifi",
    //     })
    //   );
    if (allFiles && allFiles?.length == 0)
      dispatch(
        sendNotification({
          data: {
            request_code: data && data?.online_peyment_code,
            company_code: loggedType == "1" ? profile?.company_code : 0,
            person_code: loggedType == "2" ? profile?.code : 0,
            user_name: profile?.username,
            service_action: "5",
          },
        })
      );
  }, [allFiles]);
  return (
    <Grid container className={classes.formRoot}>
      {!errMsg && trxDetails?.code ? (
        <>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            className={classes.serviceHeader}
          >
            <Typography className={classes.serviceTitle}>
              {t("SERVICESPAGES.CHECKOUT.RECEIPT")}
            </Typography>
            <ReactToPrint
              onBeforePrint={(e) => {
                let data = {
                  certificate_no: trxDetails?.code,
                  trx_code: "0",
                  certificate_type: "payment",
                  user_type: loggedType,
                  branch_serial_no: "0",
                  operation_type: "7",
                  income_type: "0",
                  user_name: profile?.username ? profile?.username : null,
                };
                dispatch(postPrintTracking({ data }));
              }}
              trigger={() => (
                <Button className="printBtn">
                  <PrintOutlinedIcon />
                </Button>
              )}
              content={() => document.getElementById("printSection_aura")}
            />
          </Box>

          <HtmlPaymentTrx
            ref={componentRef}
            trx_details={trxDetails}
            previewCooModelAr={previewCooModelAr}
            trx_item_details={trxItemDetails}
          />
          <HappinessMetter
            open={open}
            setOpen={setOpen}
            rateValues={rateValues}
            isPayment
          />
        </>
      ) : errMsg ? (
        <>
          <ReactToPrint
            trigger={() => (
              <Button className="printBtn">
                <PrintOutlinedIcon />
              </Button>
            )}
            content={() => componentRef.current}
          />
          <Typography
            className={classes.serviceTitle}
            ref={componentRef}
            style={{
              padding: "24px 32px",
              margin: "32px",
              border: "2px dashed #eee",
            }}
          >
            {errMsg}
            {paymentResponse && (
              <>
                <br />
                {t("SERVICESPAGES.CHECKOUT.ORDERID")} :{" "}
                {paymentResponse?.orderId}
                <br />
                {t("SERVICESPAGES.CHECKOUT.BANKREF")} :{" "}
                {paymentResponse.bankReference}
                <br />
                {t("SERVICESPAGES.CHECKOUT.CARDNUM")} :{" "}
                {paymentResponse.cardNumber}
                <br />
                {t("SERVICESPAGES.CHECKOUT.TOTAL")} :{" "}
                {paymentResponse.deductedAmount}
                {"  "} {paymentResponse.currency}
                <br />
              </>
            )}
            <br />
            {t("SERVICESPAGES.CHECKOUT.CONTACT")}{" "}
            <a
              href={`${PRODUCTION}/services-form/OtherServicesForm/Technical Support`}
            >
              {" "}
              {t("SERVICESPAGES.SERVICEDETAILS.TECHNICALSUPPORT")}{" "}
            </a>
          </Typography>
        </>
      ) : null}
      {!errMsg && (
        <Dialog
          open={openMsgPopup}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
          className={classes.dialog}
          style={{
            direction: isRTL ? "rtl" : "ltr",
            textAlign: "start",
            zIndex: "9000",
          }}
        >
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
              style={{
                display: "flex",
                color: "#f4676c",
                alignItems: "center",
              }}
            >
              <img
                src="/assets/images/error.gif"
                style={{ width: "150px", height: "100%" }}
              />
              {isRTL
                ? "جاري إنجاز معاملاتك وثم تحويلك إلى صفحة الطلبات الصادرة للاطلاع على طلباتك ومستنداتك المختومة والمصدقة (بعد قيامك مشكوراً بتقييم الخدمة)"
                : "We are issuing your requests then you’ll be redirected to Issued Request Page to check your Issued Transactions and stamped/rectified files after evaluation of the service"}
              <br />
              <br />
              {isRTL
                ? "يرجى عدم  تحديث هذه الصفحة أو إغلاقها "
                : "Please don’t refresh or close this page"}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
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
