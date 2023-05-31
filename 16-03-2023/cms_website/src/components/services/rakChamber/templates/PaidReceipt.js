import React, { useState, memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import useStyles from "../../../../styles/components/services/servicesTabPane";

import actions from "../../../../redux/actions";

const { getPaymentDetailsData } = actions;

export default function PaidReceipt(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const id = useParams().id;
  const { t } = useTranslation();
  const [paymentDetails, setPaymentDetails] = useState([]);

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  useEffect(() => {
    const order_id = id;
    dispatch(getPaymentDetailsData({ data: { order_id } }));
  }, []);

  useEffect(() => {
    if (APIServices.paymentDetails) {
      if (APIServices.paymentDetails.o_result)
        setPaymentDetails(APIServices.paymentDetails.o_result[0]);
    }
  }, [APIServices.paymentDetails]);

  return (
    <Grid container className={classes.formRoot}>
      <Grid item xs={12}>
        <Box className={classes.receiptLogo}>
          <Box className={classes.logoImg}>
            <img src="/assets/images/logo.png" alt="" />
          </Box>
          <p className={classes.logoTitle}>{t("RAKCHAMBER_FULLNAME")}</p>
        </Box>
      </Grid>
      <Grid xs={12}>
        <p className={classes.receiptLoc}>
          {t("RAKCHAMBER_STREET")} <br />
          {t("RAKCHAMBER_NAME")}
          <br />
          {t("UAE")}
        </p>
        <p className={classes.receiptLoc}>
          {t("FORM.PHONE")}: <span dir="ltr"> 00971 7 2260000</span> <br />
          {t("FORM.FAX")}: <span dir="ltr"> 00971 7 2260112</span>
        </p>
        <Box className={classes.divider2}></Box>
      </Grid>

      <Grid container item xs={12} className={classes.orderDetails}>
        <Grid item xs={3}>
          <p>{t("SERVICESPAGES.PAID.ID")} :</p>
        </Grid>
        <Grid item xs={9}>
          <p>{id}</p>
        </Grid>
        <Grid item xs={3}>
          <p>{t("SERVICESPAGES.PAID.CURRENCR")} :</p>
        </Grid>
        <Grid item xs={9}>
          <p>{t("SERVICESPAGES.PAID.AED")}</p>
        </Grid>
        <Grid item xs={3}>
          <p>{t("SERVICESPAGES.PAID.AMOUNT")} :</p>
        </Grid>
        <Grid item xs={9}>
          <p>{paymentDetails?.all_request?.[0]?.fees}</p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table className={classes.paymentTable} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{t("SERVICESPAGES.PAID.FEESDESC")}</TableCell>
                <TableCell>{t("SERVICESPAGES.DELETED.REQNUM")}</TableCell>
                <TableCell>{t("SERVICESPAGES.AMEND.QUANTITY")}</TableCell>
                <TableCell>{t("SERVICESPAGES.PAID.AMOUNT")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentDetails?.coo_request?.length
                ? paymentDetails?.coo_request?.map((row) => (
                    <TableRow key={row.narration}>
                      <TableCell>{t("SERVICESPAGES.PAID.ORIGINCER")}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.srv_count}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                    </TableRow>
                  ))
                : ""}

              {paymentDetails?.copies_request?.length
                ? paymentDetails?.copies_request?.map((row) => (
                    <TableRow key={row.narration}>
                      <TableCell>
                        {t("SERVICESPAGES.ADDITIONALREQ.COPY")}
                      </TableCell>
                      <TableCell>
                        {row.remarks
                          ? `${t("SERVICESPAGES.PAID.FORCOOREQ")}(${
                              row.coo_code
                            })`
                          : row.code}
                      </TableCell>
                      <TableCell>{row.srv_count}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                    </TableRow>
                  ))
                : ""}

              {paymentDetails?.stamps_request?.length
                ? paymentDetails?.stamps_request?.map((row) => (
                    <TableRow key={row.narration}>
                      <TableCell>
                        {t("SERVICESPAGES.ADDITIONALREQ.SEAL")}
                      </TableCell>
                      <TableCell>
                        {row.remarks
                          ? `${t("SERVICESPAGES.PAID.FORCOOREQ")}(${
                              row.coo_code
                            })`
                          : row.code}
                      </TableCell>
                      <TableCell>{row.srv_count}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                    </TableRow>
                  ))
                : ""}
              {paymentDetails?.edit_coo_request?.length
                ? paymentDetails?.edit_coo_request?.map((row) => (
                    <TableRow key={row.narration}>
                      <TableCell>{t("SERVICESPAGES.PAID.AMEN")}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.srv_count}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                    </TableRow>
                  ))
                : ""}
              {paymentDetails?.ratification_request?.length
                ? paymentDetails?.ratification_request?.map((row) => (
                    <TableRow key={row.narration}>
                      <TableCell>{t("SERVICESPAGES.PAID.RATI")}</TableCell>
                      <TableCell>{row.code}</TableCell>
                      <TableCell>{row.srv_count}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                    </TableRow>
                  ))
                : ""}
              <TableRow key={paymentDetails?.all_request?.[0]?.narration}>
                <TableCell colSpan={3}>
                  {t("SERVICESPAGES.PAID.TATAL")}
                </TableCell>

                <TableCell>
                  {paymentDetails?.all_request?.[0]?.fees}{" "}
                  {t("SERVICESPAGES.PAID.AED")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
