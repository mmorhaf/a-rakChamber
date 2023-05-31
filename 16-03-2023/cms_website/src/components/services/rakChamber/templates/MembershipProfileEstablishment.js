import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";

const { getMembershipProfile, getMembershipProfileDone } = actions;

const previewCooModelAr = {
  img: "/assets/images/logoCoo.png",
  copy: "/assets/images/watermark.png",
};

function MembershipProfileEstablishment(props) {
  const { t } = useTranslation();
  const componentRef = useRef();

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [activities, setActivities] = useState([]);
  const [company_profile, setCompany_profile] = useState([]);
  const classes = useStyles();
  let { cancelBtn, code } = props;

  useEffect(() => {
    if (code != null)
      dispatch(getMembershipProfile({ data: { code }, dataType: 1 }));
  }, [props.code]);
  useLayoutEffect(() => {
    return () => dispatch(getMembershipProfileDone({ data: {} }));
  }, []);

  useEffect(() => {
    const result = APIServices.membershipProfile;
    if (result) {
      if (result && result.activities && result.company_profile) {
        setActivities(result?.activities?.length ? result?.activities : []);
        setCompany_profile(
          result.company_profile?.length ? result?.company_profile[0] : []
        );
      }
    }
  }, [APIServices.membershipProfile]);
  return (
    <Dialog
      maxWidth="md"
      open={props.openModal}
      aria-labelledby="form-dialog-title"
      className={classes.replyDialog}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <DialogTitle id="form-dialog-title">
        <Typography className="label1">
          {t("SERVICESPAGES.DIRECTORY.COMPANYDET")}
        </Typography>
        <div>
          <ReactToPrint
            trigger={() => (
              <Button className={classes.closeBtn}>
                <PrintOutlinedIcon />
              </Button>
            )}
            content={() => componentRef.current}
          />
          {cancelBtn ? (
            <MdOutlineCancel
              className={classes.cancelBtn}
              onClick={(e) => props?.openModal && props?.setOpenModal(false)}
            />
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent ref={componentRef}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.DIRECTORY.TRADECODE")} :
              {company_profile?.company_code}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.SUPPLIER.NAME")} :{" "}
              {isRTL
                ? company_profile?.company_name
                : company_profile?.company_name_e}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.DIRECTORY.LEGAL")} :{" "}
              {isRTL
                ? company_profile?.company_legal_status
                : company_profile?.company_legal_status_e}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.DIRECTORY.TRADEREG")} :{" "}
              {company_profile?.trade_registration_no}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("CAREERS.CVFORM.PHONE")} : {company_profile?.telephone}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("OPENDATA.PAGE.FORM.MOBILE")} :{" "}
              {company_profile?.mobile_contact}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.FORMS.FORM.FAX")} : {company_profile?.fax}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.AMEND.ADRESS")} :
              {isRTL
                ? company_profile?.emirate_name +
                  " , " +
                  company_profile?.company_city +
                  " , " +
                  company_profile?.street_name
                : company_profile?.emirate_name_e +
                  " , " +
                  company_profile?.company_city_e +
                  " , " +
                  company_profile?.street_name_e}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.FORMS.FORM.EMAIL")} : {company_profile?.email}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            <Typography>
              {t("SERVICESPAGES.DIRECTORY.BOX")} : {company_profile?.pobox}
            </Typography>
          </Grid>
        </Grid>
        <Box className="tableBox">
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {t("SERVICESPAGES.DIRECTORY.ACTIVITYCODE")}
                  </TableCell>
                  <TableCell>
                    {t("SERVICESPAGES.DIRECTORY.ACTIVTYNAME")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities?.map((activity, index) => (
                  <TableRow key={activity.code}>
                    <TableCell>{activity.activity_code}</TableCell>
                    <TableCell>
                      {isRTL
                        ? activity.activity_name
                        : activity.activity_name_e}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Typography>
          {isRTL
            ? "ملاحظة: تصدر هذه البيانات دون أي مسؤولية من غرفة تجارة وصناعة رأس الخيمة وظهور اسم الشركة في نتائج البحث لا يعني بالضرورة أن المنشأة مازالت سارية فقد تكون الشركة منتهية."
            : "Note : This information is issued without any responsibility on RAK Chamber of Commerce & Industry, and the appearance of company’s name in search results does not necessarily mean that the registration of the company at RAK Chamber is still valid, company registration might be expired."}
        </Typography>
      </DialogContent>
      <DialogActions>
        {cancelBtn ? null : (
          <Button
            onClick={() => props?.openModal && props?.setOpenModal(false)}
            // color="primary"
            className="modalButton"
          >
            {t("SERVICESPAGES.COOVERIFY.CANCEL")}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default memo(MembershipProfileEstablishment);
