import { Box, Button, Grid, Typography } from "@material-ui/core";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import React, { memo, useEffect, useRef, useState } from "react";
import HTML_PARSER from "react-html-parser";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { HtmlMembershipProfile } from "./HtmlMembershipProfile";
import HappinessMetter from "../../../floatingSocialButtons/HappinessMetter";
import { CiFaceSmile } from "react-icons/ci";
import clsx from "clsx";

const { getMembershipVerify, getMembershipVerifyDone, postPrintTracking } =
  actions;

const previewCooModelAr = {
  img: "/assets/images/logo/logo.png",
  copy: "/assets/images/watermark.png",
};

function MembershipProfile(props) {
  const { APIServices } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { code, CompanyDate } = useParams();
  const [activities, setActivities] = useState([]);
  const [open, setOpen] = useState(false);
  const [company_profile, setCompany_profile] = useState([]);
  const componentRef = useRef();
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  let loggedType = sessionStorage.getItem("loggedType");
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  const classes = useStyles();

  const rateValues = {
    req_code: null,
    ref_code: null,
    income_code: "59",
    service_step: 5,
    inserted_by: null,
    company_code: loggedType == "1" ? profile?.company_code : 0,
    person_code: loggedType == "2" ? profile?.code : 0,
    service_code: "111",
    chamber_remarks: code,
  };

  useEffect(() => {
    dispatch(getMembershipVerify({ data: { code, CompanyDate } }));
  }, [code, CompanyDate]);

  useEffect(() => {
    const result = APIServices.membershipVerify;
    if (result) {
      if (result && result.activities && result.company_profile) {
        setActivities(result?.activities?.length ? result?.activities : []);
        setCompany_profile(
          result?.company_profile?.length ? result?.company_profile[0] : []
        );
      }
    }
  }, [APIServices.membershipVerify]);

  return (
    <Grid container className={clsx(classes.formRoot, classes.scroll)}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={classes.serviceHeader}
      >
        <Typography className={classes.serviceTitle}>
          {t("SERVICESPAGES.SIGNUP.MEMBERSHIPCER")}
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
            onBeforePrint={(e) => {
              let data = {
                certificate_no: code,
                trx_code: "0",
                certificate_type: "membership_certificate",
                user_type: loggedType ? loggedType : null,
                branch_serial_no: "0",
                operation_type: "8",
                income_type: "0",
                user_name: profile ? profile?.username : null,
              };
              dispatch(postPrintTracking({ data }));
            }}
            trigger={() => (
              <Button className="printBtn">
                <PrintOutlinedIcon />
              </Button>
            )}
            content={() => document.getElementById("membr_printSection_aura")}
          />
        </Box>
      </Box>
      <Box ref={componentRef}>
        {" "}
        {HTML_PARSER(
          HtmlMembershipProfile(
            company_profile,
            activities,
            previewCooModelAr,
            isRTL
          )
        )}
      </Box>
      <HappinessMetter open={open} setOpen={setOpen} rateValues={rateValues} />
    </Grid>
  );
}

export default memo(MembershipProfile);
