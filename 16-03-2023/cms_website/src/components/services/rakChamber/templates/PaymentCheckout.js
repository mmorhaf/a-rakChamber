import { Box, Button, Grid, Popover, Typography } from "@material-ui/core";
import axios from "axios";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaInfo } from "react-icons/fa";
import { useSelector } from "react-redux";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";

function PaymentTemp(props) {
  const classes = useStyles();
  const serviceProfile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const [cooSumFees, setCooSumFees] = useState(0);
  const [stampsSumFees, setStampsSumFees] = useState(0);
  const [copiesSumFees, setCopiesSumFees] = useState(0);
  const [editSumFees, setEditSumFees] = useState(0);
  const [ratifiSumFees, setRatifiSumFees] = useState(0);
  const [loggedType] = useState(sessionStorage.getItem("loggedType"));
  let updateUser = sessionStorage.getItem("updateUser");
  let cooFees = 0;
  let stampsFees = 0;
  let copiesFees = 0;
  let editFees = 0;
  let ratifiFees = 0;
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  let onlinePaymentDetails = JSON.parse(
    sessionStorage.getItem("onlinePaymentDetails")
  );
  useEffect(() => {
    onlinePaymentDetails &&
      onlinePaymentDetails[0]?.Coos?.map(
        (i) => (cooFees = cooFees + Number(i.fees))
      );
    onlinePaymentDetails &&
      onlinePaymentDetails[0]?.Stamps?.map(
        (i) => (stampsFees = stampsFees + Number(i.fees))
      );
    onlinePaymentDetails &&
      onlinePaymentDetails[0]?.Copies?.map(
        (i) => (copiesFees = copiesFees + Number(i.fees))
      );
    onlinePaymentDetails &&
      onlinePaymentDetails[0]?.EditCoos?.map(
        (i) => (editFees = editFees + Number(i.fees))
      );
    onlinePaymentDetails &&
      onlinePaymentDetails[0]?.Ratifications?.map(
        (i) => (ratifiFees = ratifiFees + Number(i.fees))
      );
    setCooSumFees(cooFees);
    setStampsSumFees(stampsFees);
    setCopiesSumFees(copiesFees);
    setEditSumFees(editFees);
    setRatifiSumFees(ratifiFees);
    sessionStorage.removeItem("HostedCheckout_sessionId");
    sessionStorage.removeItem("HostedCheckout_embedContainer");
    sessionStorage.removeItem("HostedCheckout_merchantState");
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

  const { t } = useTranslation();
  const payCheckout = async () => {
    var url = `${window.location.protocol}//${window.location.hostname}`;
    await axios
      .post(`/api/payment/test/session`, {
        url: url,
        amount: onlinePaymentDetails[0]?.total_after_adjustment,
        currency: "AED",
        payment_code: onlinePaymentDetails[0]?.payment_code,
        order_id: onlinePaymentDetails[0]?.online_peyment_code,
        order_reference: onlinePaymentDetails[0]?.orderReference,
        adjustment_flag: onlinePaymentDetails[0]?.adjustment_flag,
        onlinePayments: onlinePaymentDetails,
        language: isRTL ? "ar" : "en",
      })
      .then((response) => {
        sessionStorage.removeItem("onlinePaymentDetails");
        if (
          onlinePaymentDetails[0]?.total_after_adjustment == 0 &&
          onlinePaymentDetails[0]?.adjustment_flag == 1
        )
          store.dispatch(
            push(`/services-form/payment-confirm/SUCCESS/${response.data.uuid}`)
          );
        else
          window.open(
            `${response.data.server_url}/payment/test/checkout?uuid=${response.data.uuid}`,
            "_self"
          );
      });
  };
  return (
    <Grid container>
      <Grid container className={classes.checkoutDetails}>
        <Grid container item className="dialogHead">
          <img alt="site logo" src="/assets/images/logo.png" />

          <Typography className="label1">
            {t("SERVICESPAGES.CHECKOUT.CHECKOUT")}
          </Typography>
        </Grid>
        <Grid
          container
          item
          className="dialogRow"
          style={{ borderBottom: "1px dashed #eee" }}
        >
          <Grid md={6}>
            <Typography className="dialogRowTitle" style={{ fontWeight: 600 }}>
              {t("SERVICESPAGES.PAID.FEESDESC")}
            </Typography>
          </Grid>
          <Grid container md={6}>
            <Grid md={6}>
              <Typography style={{ fontWeight: 600 }}>
                {t("SERVICESPAGES.NEWMEMBERSHIP.AMOUNT")}{" "}
              </Typography>
            </Grid>
            <Grid md={6}>
              <Typography style={{ fontWeight: 600 }}>
                {t("SERVICESPAGES.AMEND.QUANTITY")}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item className="dialogRow">
          <Grid md={6}>
            <Typography className="dialogRowTitle">
              {onlinePaymentDetails &&
              onlinePaymentDetails[0]?.adjustment_flag != 0
                ? t("SERVICESPAGES.CHECKOUT.TOTALAFTERADJ")
                : t("SERVICESPAGES.CHECKOUT.TOTAL")}
            </Typography>
          </Grid>
          <Grid container md={6}>
            <Grid md={6}>
              <Typography>
                {onlinePaymentDetails &&
                  onlinePaymentDetails[0]?.total_after_adjustment}
              </Typography>
            </Grid>
            <Grid md={6}></Grid>
          </Grid>
        </Grid>
        <Grid container item className="dialogRow">
          <Grid md={6}>
            <Typography className="dialogRowTitle">
              {t("SERVICESPAGES.CHECKOUT.CURRENCY")}
            </Typography>
          </Grid>
          <Grid container md={6}>
            <Grid md={6}>
              <Typography>{t("SERVICESPAGES.CHECKOUT.AED")}</Typography>
            </Grid>
            <Grid md={6}></Grid>
          </Grid>
        </Grid>
        {onlinePaymentDetails && onlinePaymentDetails[0]?.Coos?.length > 0 && (
          <Grid container item className="dialogRow">
            <Grid md={6}>
              <Box display={"flex"} alignItems={"center"}>
                <Typography className="dialogRowTitle">
                  {t("SERVICESPAGES.CHECKOUT.NOCOO")}
                </Typography>{" "}
                {onlinePaymentDetails &&
                  onlinePaymentDetails[0]?.Coos?.length > 0 && (
                    <PopupState variant="popover" popupId="demo-popup-popover">
                      {(popupState) => (
                        <>
                          <Box
                            className="popupIcon"
                            {...bindTrigger(popupState)}
                          >
                            <div>
                              {" "}
                              <FaInfo style={{ color: "#B2C900" }} />
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
                            <Box
                              p={2}
                              style={{ direction: isRTL ? "rtl" : "ltr" }}
                              className={classes.popoverContent}
                            >
                              <Typography className="popoverContentTitle">
                                {" "}
                                {t("SERVICESPAGES.CHECKOUT.COODETAILS")}
                              </Typography>
                              <Typography className="popoverContentList">
                                {t("SERVICESPAGES.CHECKOUT.COOLIST")}
                              </Typography>
                              {onlinePaymentDetails &&
                                onlinePaymentDetails[0]?.Coos?.map((i) => (
                                  <Typography>
                                    {" "}
                                    - {t("SERVICESPAGES.CHECKOUT.COOCODE")}{" "}
                                    {i.code} {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                    {i.fees}
                                  </Typography>
                                ))}
                            </Box>
                          </Popover>
                        </>
                      )}
                    </PopupState>
                  )}
              </Box>
            </Grid>
            <Grid container md={6}>
              <Grid md={6}>
                <Typography>{cooSumFees}</Typography>
              </Grid>
              <Grid md={6}>
                <Typography>
                  {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Coos?.length}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.Stamps?.length > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography className="dialogRowTitle">
                    {t("SERVICESPAGES.CHECKOUT.NOSTAMPS")}
                  </Typography>
                  {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Stamps?.length > 0 && (
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <>
                            <Box
                              className="popupIcon"
                              {...bindTrigger(popupState)}
                            >
                              <div>
                                {" "}
                                <FaInfo style={{ color: "#B2C900" }} />
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
                              <Box
                                p={2}
                                style={{ direction: isRTL ? "rtl" : "ltr" }}
                                className={classes.popoverContent}
                              >
                                <Typography className="popoverContentTitle">
                                  {" "}
                                  {t("SERVICESPAGES.CHECKOUT.STAMPSDETAILS")}
                                </Typography>
                                <Typography className="popoverContentList">
                                  {t("SERVICESPAGES.CHECKOUT.STAMPSLIST")}
                                </Typography>
                                {onlinePaymentDetails &&
                                onlinePaymentDetails[0]?.Stamps.length &&
                                onlinePaymentDetails[0]?.Stamps?.filter(
                                  (i) => i?.isCooSuccessor
                                )?.length > 0 ? (
                                  <>
                                    <Typography className="popoverContentSub">
                                      {t(
                                        "SERVICESPAGES.CHECKOUT.COOSTAMPSLIST"
                                      )}
                                    </Typography>
                                    {onlinePaymentDetails &&
                                      onlinePaymentDetails[0]?.Stamps.length &&
                                      onlinePaymentDetails[0]?.Stamps?.filter(
                                        (i) => i?.isCooSuccessor
                                      )?.map((i) => (
                                        <Typography>
                                          {" "}
                                          - {t(
                                            "SERVICESPAGES.CHECKOUT.COOREQ"
                                          )}{" "}
                                          {i?.coo_code}
                                          <br />{" "}
                                          {t(
                                            "SERVICESPAGES.CHECKOUT.CODE"
                                          )}{" "}
                                          {i?.code}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                          {i?.fees}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.NUM")}{" "}
                                          {i?.srv_count}
                                        </Typography>
                                      ))}
                                  </>
                                ) : null}
                                {onlinePaymentDetails &&
                                onlinePaymentDetails[0]?.Stamps.length &&
                                onlinePaymentDetails[0]?.Stamps?.filter(
                                  (i) => !i?.isCooSuccessor
                                )?.length > 0 ? (
                                  <>
                                    <Typography className="popoverContentSub">
                                      {t(
                                        "SERVICESPAGES.CHECKOUT.COOISSUEDSTAMPSLIST"
                                      )}
                                    </Typography>
                                    {onlinePaymentDetails &&
                                      onlinePaymentDetails[0]?.Stamps.length &&
                                      onlinePaymentDetails[0]?.Stamps?.filter(
                                        (i) => !i?.isCooSuccessor
                                      )?.map((i) => (
                                        <Typography>
                                          {" "}
                                          - {t(
                                            "SERVICESPAGES.CHECKOUT.COOREQ"
                                          )}{" "}
                                          {i?.coo_code}
                                          <br />{" "}
                                          {t(
                                            "SERVICESPAGES.CHECKOUT.CODE"
                                          )}{" "}
                                          {i?.code}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                          {i?.fees}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.NUM")}{" "}
                                          {i?.srv_count}
                                        </Typography>
                                      ))}
                                  </>
                                ) : null}
                              </Box>
                            </Popover>
                          </>
                        )}
                      </PopupState>
                    )}
                </Box>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>{stampsSumFees}</Typography>
                </Grid>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Stamps?.length > 0
                      ? onlinePaymentDetails[0]?.Stamps?.map(
                          (item) => item?.srv_count
                        )?.reduce(
                          (prev, current) => Number(prev) + Number(current)
                        )
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.Copies?.length > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography className="dialogRowTitle">
                    {t("SERVICESPAGES.CHECKOUT.NOCOPIES")}
                  </Typography>
                  {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Copies?.length > 0 && (
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <>
                            <Box
                              className="popupIcon"
                              {...bindTrigger(popupState)}
                            >
                              <div>
                                {" "}
                                <FaInfo style={{ color: "#B2C900" }} />
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
                              <Box
                                p={2}
                                style={{ direction: isRTL ? "rtl" : "ltr" }}
                                className={classes.popoverContent}
                              >
                                <Typography className="popoverContentTitle">
                                  {" "}
                                  {t("SERVICESPAGES.CHECKOUT.COPIESDETAILS")}
                                </Typography>
                                <Typography className="popoverContentList">
                                  {t("SERVICESPAGES.CHECKOUT.COPIESLIST")}
                                </Typography>
                                {onlinePaymentDetails &&
                                onlinePaymentDetails[0]?.Copies.length &&
                                onlinePaymentDetails[0]?.Copies?.filter(
                                  (i) => i?.isCooSuccessor
                                )?.length > 0 ? (
                                  <>
                                    <Typography className="popoverContentSub">
                                      {t(
                                        "SERVICESPAGES.CHECKOUT.COOCOPIESLIST"
                                      )}
                                    </Typography>
                                    {onlinePaymentDetails &&
                                      onlinePaymentDetails[0]?.Copies.length &&
                                      onlinePaymentDetails[0]?.Copies?.filter(
                                        (i) => i?.isCooSuccessor
                                      )?.map((i) => (
                                        <Typography>
                                          {" "}
                                          - {t(
                                            "SERVICESPAGES.CHECKOUT.COOREQ"
                                          )}{" "}
                                          {i?.coo_code}
                                          <br />
                                          {t(
                                            "SERVICESPAGES.CHECKOUT.CODE"
                                          )}{" "}
                                          {i?.code}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                          {i?.fees}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.NUM")}{" "}
                                          {i?.srv_count}
                                        </Typography>
                                      ))}
                                  </>
                                ) : null}
                                {onlinePaymentDetails &&
                                onlinePaymentDetails[0]?.Copies.length &&
                                onlinePaymentDetails[0]?.Copies?.filter(
                                  (i) => !i?.isCooSuccessor
                                )?.length > 0 ? (
                                  <>
                                    <Typography className="popoverContentSub">
                                      {t(
                                        "SERVICESPAGES.CHECKOUT.COOISSUEDCOPIESLIST"
                                      )}
                                    </Typography>
                                    {onlinePaymentDetails &&
                                      onlinePaymentDetails[0]?.Copies.length &&
                                      onlinePaymentDetails[0]?.Copies?.filter(
                                        (i) => !i?.isCooSuccessor
                                      )?.map((i) => (
                                        <Typography>
                                          {" "}
                                          - {t(
                                            "SERVICESPAGES.CHECKOUT.COOREQ"
                                          )}{" "}
                                          {i?.coo_code}
                                          <br />
                                          {t(
                                            "SERVICESPAGES.CHECKOUT.CODE"
                                          )}{" "}
                                          {i?.code}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                          {i?.fees}{" "}
                                          {t("SERVICESPAGES.CHECKOUT.NUM")}{" "}
                                          {i?.srv_count}
                                        </Typography>
                                      ))}
                                  </>
                                ) : null}
                              </Box>
                            </Popover>
                          </>
                        )}
                      </PopupState>
                    )}
                </Box>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>{copiesSumFees}</Typography>
                </Grid>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Copies?.length > 0
                      ? onlinePaymentDetails[0]?.Copies?.map(
                          (item) => item?.srv_count
                        )?.reduce(
                          (prev, current) => Number(prev) + Number(current)
                        )
                      : 0}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        {loggedType == 1 &&
          onlinePaymentDetails &&
          onlinePaymentDetails[0]?.EditCoos?.length > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography className="dialogRowTitle">
                    {t("SERVICESPAGES.CHECKOUT.NOAMEND")}
                  </Typography>
                  {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.EditCoos?.length > 0 && (
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <>
                            <Box
                              className="popupIcon"
                              {...bindTrigger(popupState)}
                            >
                              <div>
                                {" "}
                                <FaInfo style={{ color: "#B2C900" }} />
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
                              <Box
                                p={2}
                                style={{ direction: isRTL ? "rtl" : "ltr" }}
                                className={classes.popoverContent}
                              >
                                <Typography className="popoverContentTitle">
                                  {" "}
                                  {t("SERVICESPAGES.CHECKOUT.EDITDETAILS")}
                                </Typography>
                                <Typography className="popoverContentList">
                                  {t("SERVICESPAGES.CHECKOUT.EDITLIST")}
                                </Typography>
                                {onlinePaymentDetails &&
                                  onlinePaymentDetails[0]?.EditCoos?.map(
                                    (i) => (
                                      <Typography>
                                        {" "}
                                        {t("SERVICESPAGES.CHECKOUT.CODE")}{" "}
                                        {i.code}{" "}
                                        {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                        {i.fees}{" "}
                                      </Typography>
                                    )
                                  )}
                              </Box>
                            </Popover>
                          </>
                        )}
                      </PopupState>
                    )}
                </Box>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>{editSumFees}</Typography>
                </Grid>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                      onlinePaymentDetails[0]?.EditCoos?.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.Ratifications?.length > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Box display={"flex"} alignItems={"center"}>
                  <Typography className="dialogRowTitle">
                    {t("SERVICESPAGES.CHECKOUT.NORATI")}
                  </Typography>
                  {onlinePaymentDetails &&
                    onlinePaymentDetails[0]?.Ratifications?.length > 0 && (
                      <PopupState
                        variant="popover"
                        popupId="demo-popup-popover"
                      >
                        {(popupState) => (
                          <>
                            <Box
                              className="popupIcon"
                              {...bindTrigger(popupState)}
                            >
                              <div>
                                {" "}
                                <FaInfo style={{ color: "#B2C900" }} />
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
                              <Box
                                p={2}
                                style={{ direction: isRTL ? "rtl" : "ltr" }}
                                className={classes.popoverContent}
                              >
                                <Typography className="popoverContentTitle">
                                  {" "}
                                  {t("SERVICESPAGES.CHECKOUT.RATIDETAILS")}
                                </Typography>
                                <Typography className="popoverContentList">
                                  {t("SERVICESPAGES.CHECKOUT.RATILIST")}
                                </Typography>
                                {onlinePaymentDetails &&
                                  onlinePaymentDetails[0]?.Ratifications?.map(
                                    (i) => (
                                      <Typography>
                                        {" "}
                                        {t("SERVICESPAGES.CHECKOUT.CODE")}{" "}
                                        {i.code}{" "}
                                        {t("SERVICESPAGES.CHECKOUT.FEES")}{" "}
                                        {i.fees}{" "}
                                      </Typography>
                                    )
                                  )}
                              </Box>
                            </Popover>
                          </>
                        )}
                      </PopupState>
                    )}
                </Box>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>{ratifiSumFees}</Typography>
                </Grid>
                <Grid md={6}>
                  <Typography>
                    {" "}
                    {onlinePaymentDetails &&
                      onlinePaymentDetails[0]?.Ratifications?.length}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.adjustment_flag != 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Typography className="dialogRowTitle">
                  {t("SERVICESPAGES.CHECKOUT.TOTAL")}
                </Typography>
              </Grid>
              <Grid md={6}>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                      onlinePaymentDetails[0]?.total_before_adjustment}
                  </Typography>
                </Grid>

                <Grid md={6}></Grid>
              </Grid>
            </Grid>
          )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.adjustment_flag != 0 &&
          onlinePaymentDetails[0]?.fees_for_custumer > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Typography className="dialogRowTitle">
                  {t("SERVICESPAGES.CHECKOUT.REFUNDAMOUNTS")}
                </Typography>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                      onlinePaymentDetails[0]?.fees_for_custumer}
                  </Typography>
                </Grid>

                <Grid md={6}></Grid>
              </Grid>
            </Grid>
          )}
        {onlinePaymentDetails &&
          onlinePaymentDetails[0]?.adjustment_flag != 0 &&
          onlinePaymentDetails[0]?.fees_for_chamber > 0 && (
            <Grid container item className="dialogRow">
              <Grid md={6}>
                <Typography className="dialogRowTitle">
                  {t("SERVICESPAGES.CHECKOUT.NOTCOLLECTEDAMOUNTS")}
                </Typography>
              </Grid>
              <Grid container md={6}>
                <Grid md={6}>
                  <Typography>
                    {onlinePaymentDetails &&
                      onlinePaymentDetails[0]?.fees_for_chamber}
                  </Typography>
                </Grid>

                <Grid md={6}>
                  <Typography></Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        <Button
          onClick={payCheckout}
          color="primary"
          variant="outlined"
          disabled={
            !(
              onlinePaymentDetails &&
              onlinePaymentDetails[0] &&
              onlinePaymentDetails[0]?.total_after_adjustment
            )
          }
        >
          {t("SERVICESPAGES.CHECKOUT.PAY")}
        </Button>
      </Grid>
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

export default memo(PaymentTemp);
