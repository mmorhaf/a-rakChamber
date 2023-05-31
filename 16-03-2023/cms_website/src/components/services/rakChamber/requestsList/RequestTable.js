import React, { useEffect, useState, Fragment, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
import { useStyles } from "../../../../styles/components/openData/table";
import axios from "axios";

import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Box,
  Popover,
  Checkbox,
  FormControlLabel,
  Modal,
} from "@material-ui/core";
import { CgFileDocument } from "react-icons/cg";
import { BiEdit } from "react-icons/bi";
import { TiDocumentDelete } from "react-icons/ti";
import { FaInfo } from "react-icons/fa";
import { HiCreditCard } from "react-icons/hi";
import { FcRefresh } from "react-icons/fc";
import { VscFiles } from "react-icons/vsc";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

import clsx from "clsx";
import actions from "../../../../redux/actions";
import { Grid } from "@material-ui/core";
const { deleteRequest, sendPaymentRequestData, sendPaymentRequestDataDone } =
  actions;

export default function Table(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  let {
    requests,
    setRequests,
    totalFees,
    setTotalFees,
    totalStamps,
    setTotalStamps,
    totalCopies,
    setTotalCopies,
  } = props;
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  const dispatch = useDispatch();

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  let data = props.data;

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [requestsList, setRequestsList] = useState([]);
  const [selectedReq, setSelectedReq] = useState(null);
  const [selectedReqName, setSelectedReqName] = useState(null);
  const [selectedIncomeCode, setSelectedIncomeCode] = useState(null);
  const [description, setDescription] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderReference, setOrderReference] = useState("");
  const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0);

  useEffect(() => {
    setRequestsList(data);
  }, [data]);

  useEffect(async () => {
    if (APIServices.paymentRequest?.result && clicked) {
      const payDetails = [
        {
          ...requests,
          ...APIServices.paymentRequest?.result?.[0],
          totalFees,
          orderReference,
        },
      ];
      sessionStorage.setItem(
        "onlinePaymentDetails",
        JSON.stringify(payDetails)
      );

      store.dispatch(push(`/services-form/payment_order`));
    }
  }, [APIServices.paymentRequest]);

  // useLayoutEffect(() => {
  //   return () => dispatch(sendPaymentRequestDataDone({ data: {} }));
  // }, []);

  const ReqType = (item) => {
    switch (item.income_code) {
      case 50:
        return isRTL ? "شهادة منشأ" : "Certificate of Origin";
      case 54:
        return isRTL ? "نسخة إضافية" : "Additional Copy";
      case 56:
        return isRTL
          ? "تعديل شهادة منشأ"
          : "Amendment of Certificate of Origin";
      case 55:
        return isRTL ? "ختم" : "Seal";
      case 51:
        return isRTL ? "تصديق" : "Ratification";

      case 59:
        return isRTL ? "نماذج ورقية Form A" : "Form A Papers";
        case 60:
          return isRTL ? "ختم تصحيح" : "Correction Stamp";
          case 61:
            return isRTL ? "ختم طبق الاصل" : "Original Seal";
            case 62:
        return isRTL ? "ختم حي" : "Live Seal";   
      default:
        return "";
    }
  };

  const ReqTypePage = (item) => {
    switch (item.income_code) {
      case 50:
        return `/services-form/business-services/new-coo/${item.coo_code}/view`;
      // loggedType == "1"
      //   ? `/services-form/business-services/coo-preview/${
      //       item.ref_code ? "issued" : "request"
      //     }/${
      //       item.ref_code ? item.ref_code : item.coo_code
      //     }/null/null/null/null`

      case 54:
        return `/services-form/business-services/additional-request/${item.code}/view/request`;
      case 56:
        return `/services-form/business-services/amendment-coo-request/${item.coo_code}/${item.code}/view`;
      case 55:
        return `/services-form/business-services/additional-request/${item.code}/view/request`;
      case 51:
        return `/services-form/business-services/ratification-request/${item.code}/view/request`;
        case 59:
          return `/services-form/business-services/other-request/${item.code}/view/request`;
          case 60:
            return `/services-form/business-services/other-request/${item.code}/view/request`;
            case 61:
              return `/services-form/business-services/other-request/${item.code}/view/request`;
              case 62:
                return `/services-form/business-services/other-request/${item.code}/view/request`;
      default:
        return "";
    }
  };
  const ReqTypeEditPage = (item) => {
    switch (item.income_code) {
      case 50:
        return `/services-form/business-services/new-coo/${item.coo_code}/edit`;
      case 54:
        return `/services-form/business-services/additional-request/${item.code}/edit/request`;
      case 56:
        return `/services-form/business-services/amendment-coo-request/${item.coo_code}/${item.code}/edit`;
      case 55:
        return `/services-form/business-services/additional-request/${item.code}/edit/request`;
      case 51:
        return `/services-form/business-services/ratification-request/${item.code}/edit/request`;
      case 59:
        return `/services-form/business-services/other-request/${item.code}/edit/request`;
      case 60:
        return `/services-form/business-services/other-request/${item.code}/edit/request`;
      case 61:
        return `/services-form/business-services/other-request/${item.code}/edit/request`;
      case 62:
        return `/services-form/business-services/other-request/${item.code}/edit/request`;
      default:
        return "";
    }
  };
  const paymentDetails = (item, checked) => {
    let cooAdditionalFees = 0;
    let cooMRAdditionalFees = 0;
    item["checked"] = checked;
    if (checked) {
      setNumberOfCheckedItems(numberOfCheckedItems + 1);
      switch (item.income_code) {
        case 50:
          let newCopies = item.coo_cr_additional_request
            ?.filter((i) => i.income_code == 54)
            .filter((i) => i.approved_count != 0)
            .map((i) => {
              setTotalCopies(totalCopies + Number(i.srv_count));
              return {
                code: i.code,
                coo_code: i.coo_code,
                fees: i.chamber_fees,
                isCooSuccessor: true,
                remarks: 50,
                srv_count: i.srv_count,
              };
            });
          let Copies = [...requests.Copies, ...newCopies];

          let newStamps = item.coo_cr_additional_request
            ?.filter((i) => i.income_code == 55)
            .filter((i) => i.approved_count != 0)
            .map((i) => {
              setTotalStamps(totalStamps + Number(i.srv_count));

              return {
                code: i.code,
                coo_code: i.coo_code,
                fees: i.chamber_fees,
                isCooSuccessor: true,
                isRatificationSuccessor: false,
                remarks: 50,
                srv_count: i.srv_count,
              };
            });
          item.coo_cr_additional_request?.length != 0 &&
            item.coo_cr_additional_request?.map((i) => {
              cooAdditionalFees = cooAdditionalFees + Number(i.chamber_fees);
            });
          let Stamps = [...requests.Stamps, ...newStamps];
          return (
            setRequests({
              ...requests,
              Coos: [
                ...requests.Coos,
                {
                  code: item.coo_code,
                  fees: item.chamber_fees,
                },
              ],
              Stamps: Stamps,
              Copies: Copies,
            }),
            setTotalFees(
              Number(totalFees) +
                Number(item.chamber_fees) +
                Number(cooAdditionalFees)
            )
          );
        case 54:
          return (
            setRequests({
              ...requests,
              Copies: [
                ...requests.Copies,
                {
                  code: item.code,
                  coo_code: item.coo_code,
                  fees: item.chamber_fees,
                  srv_count: item.srv_count,
                  isCooSuccessor: false,
                  remarks: 54,
                },
              ],
            }),
            setTotalFees(Number(totalFees) + Number(item.chamber_fees)),
            setTotalCopies(totalCopies + Number(item.srv_count))
          );
        case 56:
          let newMRCopies = item.coo_mr_additional_request
            ?.filter((i) => i.income_code == 54)
            .filter((i) => i.approved_count != 0)
            .map((i) => {
              setTotalCopies(totalCopies + Number(i.srv_count));
              return {
                code: i.code,
                coo_code: i.coo_code,
                fees: i.chamber_fees,
                isCooSuccessor: true,
                remarks: 56,
                srv_count: i.srv_count,
              };
            });

          let mrCopies = [...requests.Copies, ...newMRCopies];

          let newMRStamps = item.coo_mr_additional_request
            ?.filter((i) => i.income_code == 55)
            .filter((i) => i.approved_count != 0)
            .map((i) => {
              setTotalStamps(totalStamps + Number(i.srv_count));
              return {
                code: i.code,
                coo_code: i.coo_code,
                fees: i.chamber_fees,
                isCooSuccessor: true,
                isRatificationSuccessor: false,
                remarks: 56,
                srv_count: i.srv_count,
              };
            });
          item.coo_mr_additional_request?.length != 0 &&
            item.coo_mr_additional_request?.map((i) => {
              cooMRAdditionalFees =
                cooMRAdditionalFees + Number(i.chamber_fees);
            });
          let mrStamps = [...requests.Stamps, ...newMRStamps];
          return (
            setRequests({
              ...requests,
              EditCoos: [
                ...requests.EditCoos,
                {
                  code: item.code,
                  coo_code: item.coo_code,
                  fees: item.chamber_fees,
                  remarks: 56,
                },
              ],
              Stamps: mrStamps,
              Copies: mrCopies,
            }),
            setTotalFees(
              Number(totalFees) +
                Number(item.chamber_fees) +
                Number(cooMRAdditionalFees)
            )
          );
        case 55:
          return (
            setRequests({
              ...requests,
              Stamps: [
                ...requests.Stamps,
                {
                  code: item.code,
                  coo_code: item.coo_code,
                  fees: item.chamber_fees,
                  srv_count: item.srv_count,
                  isCooSuccessor: false,
                  remarks: 55,
                },
              ],
            }),
            setTotalFees(Number(totalFees) + Number(item.chamber_fees)),
            setTotalStamps(totalStamps + Number(item.srv_count))
          );
        case 51:
          return (
            setRequests({
              ...requests,
              Ratifications: [
                ...requests.Ratifications,
                {
                  code: item.code,
                  fees: item.chamber_fees,
                },
              ],
            }),
            setTotalFees(Number(totalFees) + Number(item.chamber_fees))
          );
        default:
          return "";
      }
    } else {
      setNumberOfCheckedItems(numberOfCheckedItems - 1);

      switch (item.income_code) {
        case 50:
          let newStampsCount = 0;
          let newCopiesCount = 0;
          let newStampsCopiesFees = 0;

          let itemCopies = item.coo_cr_additional_request
            ?.filter((i) => i.income_code == 54)
            .map((i) => i.coo_code);

          requests.Copies.filter((c) => itemCopies.includes(c.coo_code)).map(
            (i) => (newStampsCopiesFees = newStampsCopiesFees + Number(i.fees))
          );

          let Copies = requests.Copies.filter(
            (c) => !itemCopies.includes(c.coo_code)
          );
          Copies.map((i) => (newCopiesCount = newCopiesCount + i.srv_count));
          setTotalCopies(newCopiesCount);

          let itemStamps = item.coo_cr_additional_request
            ?.filter((i) => i.income_code == 55)
            .map((i) => i.coo_code);

          requests.Stamps.filter((c) => itemStamps.includes(c.coo_code)).map(
            (i) => (newStampsCopiesFees = newStampsCopiesFees + Number(i.fees))
          );

          let Stamps = requests.Stamps.filter(
            (s) => !itemStamps.includes(s.coo_code)
          );
          Stamps.map((i) => (newStampsCount = newStampsCount + i.srv_count));
          setTotalStamps(newStampsCount);

          let Coos = requests.Coos.filter((c) => c.code !== item.coo_code);
          setTotalFees(Number(totalFees) - Number(item.chamber_fees));
          item.coo_cr_additional_request?.length != 0 &&
            item.coo_cr_additional_request?.map((i) => {
              cooAdditionalFees = cooAdditionalFees + Number(i.chamber_fees);
            });
          setTotalFees(
            Number(totalFees) -
              (Number(item.chamber_fees) + Number(cooAdditionalFees))
          );
          return setRequests({
            ...requests,
            Coos,
            Stamps,
            Copies,
          });
        case 54:
          requests.Copies?.map((i) =>
            i.code == item.code
              ? setTotalCopies(totalCopies - Number(i.srv_count))
              : setTotalCopies(totalCopies)
          );
          let CopiesNew = requests.Copies.filter((c) => c.code !== item.code);
          setTotalFees(Number(totalFees) - Number(item.chamber_fees));
          return setRequests({
            ...requests,
            Copies: CopiesNew,
          });
        case 56:
          let newMRStampsCount = 0;
          let newMRCopiesCount = 0;
          let newMRStampsCopiesFees = 0;

          let itemMrCopies = item.coo_mr_additional_request
            ?.filter((i) => i.income_code == 54)
            .map((i) => i.coo_code);

          requests.Copies.filter((c) => itemMrCopies.includes(c.coo_code)).map(
            (i) =>
              (newMRStampsCopiesFees = newMRStampsCopiesFees + Number(i.fees))
          );

          let mrCopies = requests.Copies.filter(
            (c) => !itemMrCopies.includes(c.coo_code)
          );
          mrCopies.map(
            (i) => (newMRStampsCount = newMRStampsCount + i.srv_count)
          );
          setTotalCopies(newMRStampsCount);

          let itemMrStamps = item.coo_mr_additional_request
            ?.filter((i) => i.income_code == 55)
            .map((i) => i.coo_code);

          requests.Stamps.filter((c) => itemMrStamps.includes(c.coo_code)).map(
            (i) =>
              (newMRStampsCopiesFees = newMRStampsCopiesFees + Number(i.fees))
          );

          let mrStamps = requests.Stamps.filter(
            (s) => !itemMrStamps.includes(s.coo_code)
          );
          mrStamps.map(
            (i) => (newMRCopiesCount = newMRCopiesCount + i.srv_count)
          );
          setTotalStamps(newMRCopiesCount);

          let mrCoos = requests.EditCoos.filter((c) => c.code !== item.code);
          setTotalFees(Number(totalFees) - Number(item.chamber_fees));

          item.coo_mr_additional_request?.length != 0 &&
            item.coo_mr_additional_request?.map((i) => {
              cooMRAdditionalFees =
                cooMRAdditionalFees + Number(i.chamber_fees);
            });
          setTotalFees(
            Number(totalFees) -
              (Number(item.chamber_fees) + Number(cooMRAdditionalFees))
          );

          return setRequests({
            ...requests,
            EditCoos: mrCoos,
            Stamps: mrStamps,
            Copies: mrCopies,
          });
        case 55:
          requests.Stamps?.map((i) =>
            i.code == item.code
              ? setTotalStamps(totalStamps - Number(i.srv_count))
              : setTotalStamps(totalStamps)
          );
          let StampsNew = requests.Stamps.filter((c) => c.code !== item.code);
          setTotalFees(Number(totalFees) - Number(item.chamber_fees));
          return setRequests({
            ...requests,
            Stamps: StampsNew,
          });
        case 51:
          let Ratifications = requests.Ratifications.filter(
            (c) => c.code !== item.code
          );
          setTotalFees(Number(totalFees) - Number(item.chamber_fees));
          return setRequests({
            ...requests,
            Ratifications: Ratifications,
          });
        default:
          return "";
      }
    }
  };
  const ReqStatus = (item) => {
    switch (item.status_name) {
      case "Pending_":
        return (
          <Box
            style={{ backgroundColor: "#e4c358" }}
            className={classes.statusBox}
          >
            {isRTL ? "قيد الانتظار " : "Pending"}
          </Box>
        );
      case "NotesAdded_":
        return (
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <>
                <Box
                  style={{
                    backgroundColor: "#ee6774",
                    display: "flex",
                    alignItems: "center",
                  }}
                  className={classes.statusBox}
                  {...bindTrigger(popupState)}
                >
                  {isRTL ? "توجد ملاحظة " : "Notes Added"}
                  <div>
                    {" "}
                    <FaInfo style={{ color: "#fff" }} />
                  </div>
                </Box>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    // vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box p={2}>
                    <Typography>{item.employee_note}</Typography>
                  </Box>
                </Popover>
              </>
            )}
          </PopupState>
        );
      case "ApprovedNotPaid_":
        return (
          <Box
            style={{ backgroundColor: "#5b8fca" }}
            className={classes.statusBox}
          >
            {isRTL ? "معتمدة غير مدفوعة " : "Approved Not Paid"}
          </Box>
        );
      case "PaidNotApproved_":
        return (
          <>
            {item.status == 1 && (
              <Box
                style={{ backgroundColor: "#529dd8" }}
                className={classes.statusBox}
              >
                {isRTL ? "معتمدة " : "Approved"}
              </Box>
            )}
            {item.status == 3 && (
              <Box
                style={{ backgroundColor: "#e4c358" }}
                className={classes.statusBox}
              >
                {isRTL ? "قيد الانتظار " : "Pending"}
              </Box>
            )}
            <Box
              style={{ backgroundColor: "#98ae4f" }}
              className={classes.statusBox}
            >
              {isRTL ? "مدفوعة إلكترونياً" : "Paid Online"}
            </Box>
          </>
        );
      case "Suspended_":
        return (
          <Box
            style={{ backgroundColor: "#9e9e9e" }}
            className={classes.statusBox}
          >
            {isRTL ? "مجمدة" : "Suspended"}
          </Box>
        );
      default:
        return "";
    }
  };
  const sendDeleteNote = () => {
    let data = {
      cancel_remark: description,
      canceled_by: profile ? profile?.username : "",
      code: selectedReq,
      income_code: selectedIncomeCode,
    };
    dispatch(deleteRequest({ data }));
    setDescription("");
    setSelectedReq(null);
    setSelectedReqName(null);
    setSelectedIncomeCode(null);
    setOpen(false);
  };

  const handleModalOpen = (item) => {
    setSelectedReq(item.code ? item.code : item.coo_code);
    setSelectedReqName(ReqType(item));
    setSelectedIncomeCode(item.income_code);
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj[isRTL ? "رقم الطلب" : "Request No"] = item.code
          ? item.code
          : item.coo_code;
        obj[isRTL ? "نوع الطلب" : "Request Type"] = (
          <>
            <Box>
              {ReqType(item)}{" "}
              {item.srv_count && item.srv_count != 0
                ? `(${item.srv_count})`
                : ""}
            </Box>
            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.srv_count == 0
                          ? ""
                          : `• ${
                              type.income_code == 54
                                ? isRTL
                                  ? "نسخة إضافية"
                                  : "Additional Copy"
                                : isRTL
                                ? "ختم"
                                : "Seal"
                            } (${type.srv_count})`}
                      </Typography>
                    );
                  })
                : ""}
              {item.coo_mr_additional_request?.length
                ? item.coo_mr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.srv_count == 0
                          ? ""
                          : `• ${
                              type.income_code == 54
                                ? isRTL
                                  ? "نسخة إضافية"
                                  : "Additional Copy"
                                : isRTL
                                ? "ختم"
                                : "Seal"
                            } (${type.srv_count})`}
                      </Typography>
                    );
                  })
                : ""}
            </Box>
          </>
        );
        obj[isRTL ? "تاريخ الطلب" : "Request Date"] = item.issue_date;
        // moment(item.issue_date).format(
        //   "YYYY-MM-DD, h:mm"
        // );
        obj[isRTL ? "الرسوم" : "Fees"] = (
          <>
            <Box>{item.chamber_fees}</Box>

            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.chamber_fees == 0
                          ? ""
                          : "• " + `${type.chamber_fees}`}
                      </Typography>
                    );
                  })
                : ""}
              {item.coo_mr_additional_request?.length
                ? item.coo_mr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.chamber_fees == 0
                          ? ""
                          : "• " + `${type.chamber_fees}`}
                      </Typography>
                    );
                  })
                : ""}
            </Box>
          </>
        );
        obj[isRTL ? "رقم الفاتورة" : "Invoice No"] = item.invoice_no;
        obj[isRTL ? "الحالة" : "Status"] = ReqStatus(item);
        obj[isRTL ? "الدفع" : "Payment"] =
          item.status_name == "PaidNotApproved_" ? (
            <IconButton
              onClick={() =>
                store.dispatch(
                  push(
                    `/services-form/paid_receipt/${item.online_payment_code}`
                  )
                )
              }
            >
              <VscFiles style={{ color: "#4b68b4" }} />
            </IconButton>
          ) : item.status_name == "ApprovedNotPaid_" ? (
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  onChange={(event) =>
                    paymentDetails(item, event.target.checked)
                  }
                  checked={item.checked == true}
                  disabled={!item.checked && numberOfCheckedItems == 10}
                />
              }
              label={isRTL ? "دفع" : "Pay"}
              labelPlacement="bottom"
            />
          ) : (
            ""
          );
        obj[isRTL ? "عرض" : "View"] = (
          <IconButton onClick={() => store.dispatch(push(ReqTypePage(item)))}>
            <CgFileDocument style={{ color: "#b1cbe7" }} />
          </IconButton>
        );
        obj[isRTL ? "تعديل" : "Edit"] =
          item.status_name == "Pending_" ||
          item.status_name == "NotesAdded_" ? (
            <IconButton
              onClick={() => store.dispatch(push(ReqTypeEditPage(item)))}
            >
              <BiEdit style={{ color: "#bddac4" }} />
            </IconButton>
          ) : (
            ""
          );
        obj[isRTL ? "حذف" : "Delete"] =
          item.status_name == "Pending_" ||
          item.status_name == "NotesAdded_" ? (
            <IconButton onClick={() => handleModalOpen(item)}>
              <TiDocumentDelete style={{ color: "#e9818b" }} />
            </IconButton>
          ) : (
            ""
          );
        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };
  const createPaymentColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      obj[isRTL ? "الوصف" : "Description"] = isRTL ? "عدد" : "Count";
      obj[isRTL ? "شهادة المنشأ" : "Certificate of Origin"] = arr?.Coos?.length;
      obj[isRTL ? "نسخ إضافية" : "Additional Copies"] = totalCopies;
      obj[isRTL ? "أختام إضافية" : "Additional Seals"] = totalStamps;
      obj[isRTL ? "تعديل شهادة منشأ" : "Amendment COO"] = arr?.EditCoos?.length;
      obj[isRTL ? "تصديقات" : "Ratifications"] = arr?.Ratifications?.length;
      obj[isRTL ? "المبلغ الإجمالي" : "Total Amount"] = totalFees;
      array.push(obj);

      return array;
    }
  };
  const newData = createColumn(requestsList);
  const paymentdata = createPaymentColumn(requests);
  var order_id = "";
  var order_reference = "";
  const sendPayDetail = () => {
    var chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      length = 10;
    for (var i = length; i > 0; --i) {
      order_id += chars[Math.round(Math.random() * (chars.length - 1))];
      order_reference += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    setOrderId(order_id);
    setOrderReference(order_reference);
    let data = {
      ...requests,
      company_code: loggedType == "1" ? profile?.company_code : 0,
      person_code: loggedType == "1" ? 0 : profile?.code,
      total_fees: totalFees,
      username: profile?.username,
      Online_payment: [
        {
          order_reference: order_reference,
          online_payment_code: order_id,
        },
      ],
    };
    dispatch(sendPaymentRequestData({ data: { ...data } }));
    setClicked(true);
  };
  const options = {
    filterType: "checkbox",
    selectToolbarPlacement: "none",
    // tableBodyHeight: "450px",
    onCellClick: (colData, cellMeta) => {
      props.onCellClick && props.onCellClick(cellMeta.rowIndex);
    },
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    fixedHeader: false,
    sort: false,
    pagination: false,
  };
  const components = {
    TableFooter: () => <></>,
  };
  const columnsLTR = [
    {
      name: "Payment",
      label: "Payment",
      options: {
        filter: false,
      },
    },
    {
      name: "Request No",
      label: "Request No",
      options: {
        filter: false,
      },
    },
    {
      name: "Request Type",
      label: "Request Type",
      options: {
        filter: false,
      },
    },
    {
      name: "Request Date",
      label: "Request Date",
      options: {
        filter: false,
        sort: true,
        sortDirection: "asc",
        customBodyRender: (value) =>
          moment(new Date(value)).format("YYYY-MM-DD h:mm a"),
      },
    },

    {
      name: "Fees",
      label: "Fees",
      options: {
        filter: false,
      },
    },
    {
      name: "Invoice No",
      label: "Invoice No",
      options: {
        filter: false,
      },
    },
    {
      name: "Status",
      label: "Status",
      options: {
        filter: false,
      },
    },

    {
      name: "View",
      label: "View",
      options: {
        filter: false,
      },
    },
    {
      name: "Edit",
      label: "Edit",
      options: {
        filter: false,
      },
    },
    {
      name: "Delete",
      label: "Delete",
      options: {
        filter: false,
      },
    },
  ];

  const columnsRTL = [
    {
      name: "الدفع",
      label: "الدفع",
      options: {
        filter: false,
      },
    },
    {
      name: "رقم الطلب",
      label: "رقم الطلب",
      options: {
        filter: false,
      },
    },
    {
      name: "نوع الطلب",
      label: "نوع الطلب",
      options: {
        filter: false,
      },
    },
    {
      name: "تاريخ الطلب",
      label: "تاريخ الطلب",
      options: {
        filter: false,
        sort: true,
        sortDirection: "asc",
        customBodyRender: (value) =>
          moment(new Date(value)).format("YYYY-MM-DD h:mm a"),
      },
    },

    {
      name: "الرسوم",
      label: "الرسوم",
      options: {
        filter: false,
      },
    },
    {
      name: "رقم الفاتورة",
      label: "رقم الفاتورة",
      options: {
        filter: false,
      },
    },
    {
      name: "الحالة",
      label: "الحالة",
      options: {
        filter: false,
      },
    },

    {
      name: "عرض",
      label: "عرض",
      options: {
        filter: false,
      },
    },
    {
      name: "تعديل",
      label: "تعديل",
      options: {
        filter: false,
      },
    },
    {
      name: "حذف",
      label: "حذف",
      options: {
        filter: false,
      },
    },
  ];

  const payColumnsLTR = [
    { name: "Description" },
    { name: "Certificate of Origin" },
    { name: "Additional Copies" },
    { name: "Additional Seals" },
    { name: "Amendment COO" },
    { name: "Ratifications" },
    { name: "Total Amount" },
  ];

  const payColumnsRTL = [
    { name: "الوصف" },
    { name: "شهادة المنشأ" },
    { name: "نسخ إضافية" },
    { name: "أختام إضافية" },
    { name: "تعديل شهادة منشأ" },
    { name: "تصديقات" },
    { name: "المبلغ الإجمالي" },
  ];

  const columns = isRTL ? columnsRTL : columnsLTR;
  const payColumns = isRTL ? payColumnsRTL : payColumnsLTR;

  return (
    <Fragment>
      <Box paddingY={2} width="100%">
        <Box className={classes.tableTitle}>
          <Typography>
            {isRTL
              ? "يرجى تحديد الطلبات المراد دفعها:"
              : "Please Select the Request to be paid :"}
          </Typography>
        </Box>
        <MUIDataTable
          data={paymentdata}
          columns={payColumns}
          options={options}
          components={components}
          className={clsx(classes.root, classes.requestList)}
        />
        <Box className={classes.tableTitle} display="flex" alignItems="center">
          <Typography>
            {" "}
            {isRTL
              ? "يمكنكم دفع الطلبات المعتمدة فقط"
              : "You Can Pay Online For Your Approved Requests"}{" "}
          </Typography>{" "}
          {/* <Button
            onClick={() =>
              setRequestsList(
                data.filter((i) => i.status_name == "ApprovedNotPaid_")
              )
            }
            className={classes.btnFilter}
          >
            Approved not Paid
          </Button> */}
          <Button
            variant="contained"
            className={classes.send}
            disableElevation
            endIcon={<HiCreditCard />}
            onClick={sendPayDetail}
            disabled={totalFees == 0 ? true : false}
          >
            {isRTL ? "دفع" : "Pay"}
          </Button>
        </Box>
      </Box>
      <Box className={classes.tableTitle} display="flex" alignItems="center">
        <Button onClick={props.refreshList} className="refreshBtn">
          <FcRefresh />
        </Button>
        <Typography>
          {isRTL ? "طلباتكم للأسبوعين السابقين" : "Your Last Two Week Request"}
        </Typography>
      </Box>
      <MUIDataTable
        className={clsx(classes.root, classes.requestList)}
        data={newData}
        columns={columns}
        components={components}
        options={options}
      />
      <Dialog
        maxWidth="sm"
        open={open}
        aria-labelledby="form-dialog-title"
        className={classes.replyDialog}
        style={{ direction: isRTL ? "rtl" : "ltr", textAlign: "start" }}
      >
        <DialogTitle id="form-dialog-title">
          <Typography className="label1">
            {t("SERVICESPAGES.DIALOG.WARNING")}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography className="label2">
            {t("SERVICESPAGES.DIALOG.MRMS")}{" "}
            {isRTL ? profile?.name : profile?.name_e}
          </Typography>
          <Typography className="label3">
            {t("SERVICESPAGES.DIALOG.REQNOM")}: {selectedReq} ({selectedReqName}
            ) {t("SERVICESPAGES.DIALOG.DELETEREQ")}
          </Typography>
          <Typography className="label3">
            {t("SERVICESPAGES.DIALOG.REASON")}
          </Typography>
          <TextField
            style={{ marginTop: 8 }}
            multiline
            placeholder={isRTL ? "ملاحظات العميل" : "Client Notes"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography className="label3">
            {t("SERVICESPAGES.DIALOG.SURE")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModalClose}
            color="primary"
            className={[classes.button, classes.contained]}
          >
            {isRTL ? "إلغاء" : "Cancel"}
          </Button>
          <Button
            disabled={description == "" ? true : false}
            onClick={sendDeleteNote}
            color="primary"
            className={[classes.button, classes.contained]}
          >
            {isRTL ? "حذف" : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
