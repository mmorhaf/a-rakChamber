import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { push } from "connected-react-router";
import moment from "moment";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiListUl } from "react-icons/bi";
import { BsBuilding, BsInfoCircle, BsPlay } from "react-icons/bs";
import { CgPlayListCheck, CgPlayListRemove } from "react-icons/cg";
import { FcList, FcSms, FcStatistics } from "react-icons/fc";
import { MdAttachFile, MdDateRange } from "react-icons/md";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL, REDIRECT_URL } from "../../../constants/constant";
import actions from "../../../redux/actions";
import { store } from "../../../redux/store";
import useStyles from "../../../styles/components/services/servicesTabPane";
import { businessServicesData } from "./businessServices/businessServicesData";
import { individualsServicesData } from "./individualsServices/individualsServicesData";
import { otherServicesData } from "./other/otherServicesData";
import ServicesResultModal from "./ServicesResultModal";
import { supplierServicesData } from "./supplierServices/supplierServicesData";
const { serviceLoginDone, getTotalsData, getNotification } = actions;
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tabpanel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function Dashboard() {
  const { t } = useTranslation();
  const [loggedType] = useState(sessionStorage.getItem("loggedType"));
  let serviceProfile =
    loggedType === "3"
      ? null
      : JSON.parse(sessionStorage.getItem("serviceProfile"));
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [value, setValue] = useState(0);
  const [statistics, setStatistics] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let clear = sessionStorage.getItem("clear");
    if (clear) {
      setOpenDialog(true);
      setMessage(
        isRTL
          ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
          : "Your Session has Expired , Please Log in again."
      );
      setRoting("/login");
    } else if (serviceProfile == null) store.dispatch(push("/login"));
    if (updateUser) store.dispatch(push("/services-form/profile"));
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const company_code = serviceProfile?.company_code
      ? serviceProfile?.company_code
      : 0;
    const code = serviceProfile?.code;
    const person_code = serviceProfile?.company_code ? 0 : serviceProfile?.code;
    const user_name = serviceProfile?.username;
    dispatch(
      getTotalsData(
        serviceProfile?.company_code
          ? { data: { company_code } }
          : { data: { code } }
      )
    );
    dispatch(
      getNotification({ data: { company_code, user_name, person_code } })
    );
  }, []);

  useEffect(() => {
    if (APIServices.totalRequests) {
      const result = APIServices.totalRequests?.no_of_request;
      if (result) setStatistics(result[0]);
    }
    if (APIServices.getNotificationDone) {
      const res = APIServices.getNotificationDone?.item;
      if (res) setNotifications(res);
    }
  }, [APIServices.totalRequests, APIServices.getNotificationDone]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const statusBG = (data) => {
    if (
      memberType == "expired" ||
      memberType == "canceled" ||
      memberType == "activeExpired"
    ) {
      return "#b5312d";
    }
    if (memberType == "active") {
      return "#74b355";
    } else {
      return "#596a87";
    }
  };

  const status = (memberType) => {
    if (memberType == "expired" || memberType == "activeExpired") {
      return (
        <Box display="flex" flexDirection="row" padding={{ xs: 1, md: 2 }}>
          <Box style={{ minWidth: 56 }}>
            <Avatar style={{ backgroundColor: "transparent" }}>
              <img alt="site logo" src="/assets/images/services/expired.png" />
            </Avatar>
          </Box>
          <Typography
            className={classes.companyName}
            style={{ color: "#b5312d" }}
          >
            {isRTL ? "منتهية" : "Expired"}
          </Typography>
        </Box>
      );
    }
    if (memberType == "active") {
      return (
        <Box display="flex" flexDirection="row" paddingX={2} paddingY={1}>
          <Box style={{ minWidth: 56 }}>
            <Avatar style={{ backgroundColor: "transparent" }}>
              <img alt="site logo" src="/assets/images/services/active.png" />
            </Avatar>
          </Box>
          <Typography
            className={classes.companyName}
            style={{ color: "#74b355" }}
          >
            {isRTL ? "نشطة" : "Active"}
          </Typography>
        </Box>
      );
    }
    if (memberType == "canceled") {
      return (
        <Box display="flex" flexDirection="row" paddingX={2} paddingY={1}>
          <Box style={{ minWidth: 56 }}>
            <Avatar style={{ backgroundColor: "transparent" }}>
              <img alt="site logo" src="/assets/images/services/canceled.png" />
            </Avatar>
          </Box>
          <Typography
            className={classes.companyName}
            style={{ color: "#b5312d" }}
          >
            {isRTL ? "ملغية" : "Canceled"}
          </Typography>
        </Box>
      );
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirmLogout = () => {
    setOpen(false);
    dispatch(serviceLoginDone({ status: 0 }));
    sessionStorage.setItem("loggedType", 0);
    sessionStorage.removeItem("memberType");
    sessionStorage.removeItem("updateUser");
    sessionStorage.removeItem("uaePassUserInfo");
    window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
  };
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <Grid container item xs={12}>
        {serviceProfile?.blocked == 1 && (
          <Box
            display="flex"
            justifyContent="center"
            paddingY={1}
            width={"100%"}
            className={classes.seeManage}
          >
            <Typography>
              {isRTL
                ? "عذراً، لن تتمكن من تقديم أي طلب جديد حتى تراجع أقرب مركز إسعاد متعاملين"
                : "Sorry, you will not be able to add any new requests until you visit nearest Customers Happiness Center"}
            </Typography>
          </Box>
        )}
      </Grid>
      <Grid container>
        <Grid container item style={{ minHeight: 700 }}>
          <Grid item xs={12} md={4} className={classes.dashboardSideCon}>
            <Box className={classes.boxCon}>
              {serviceProfile && (
                <Box height="100%" className="infoBox">
                  <Box
                    className={classes.companyStatusBox}
                    style={{ backgroundColor: statusBG(memberType) }}
                  >
                    {" "}
                    <Typography className={classes.name}>
                      {isRTL ? `مرحباً` : "Welcome"}{" "}
                      {loggedType == "1"
                        ? serviceProfile?.contact_name
                        : isRTL
                        ? serviceProfile?.name
                        : serviceProfile?.name_e}
                    </Typography>
                    <Avatar className={classes.avatarIcon}>
                      {serviceProfile?.contact_name?.charAt(0)}
                    </Avatar>
                  </Box>
                  <Box marginTop={{ xs: 4, sm: 0, md: 10 }}>
                    {status(memberType)}
                    {serviceProfile?.blocked == 1 && (
                      <Box
                        display="flex"
                        justifyContent="center"
                        paddingX={4}
                        paddingY={1}
                        className={classes.seeManage}
                      >
                        <Typography>
                          {isRTL
                            ? "يرجى مراجعة أقرب مركز إسعاد متعاملين"
                            : "Kindly visit nearest Customers Happiness Center"}
                        </Typography>
                      </Box>
                    )}
                    {loggedType != "2" && (
                      <>
                        <Box
                          display="flex"
                          flexDirection="row"
                          paddingX={{ xs: 1, md: 2 }}
                          paddingY={1}
                        >
                          <Box style={{ minWidth: 56 }}>
                            <Avatar>
                              <BsBuilding />
                            </Avatar>
                          </Box>
                          <Typography
                            className={classes.companyName}
                            style={{ color: "#444" }}
                          >
                            {isRTL
                              ? serviceProfile?.name
                              : serviceProfile?.name_e}
                          </Typography>
                        </Box>

                        {serviceProfile?.membership_expiry_date && (
                          <Box
                            display="flex"
                            flexDirection="row"
                            paddingX={{ xs: 1, md: 2 }}
                            paddingY={1}
                          >
                            <Box style={{ minWidth: 56 }}>
                              <Avatar>
                                <MdDateRange />
                              </Avatar>
                            </Box>
                            <Typography
                              className={classes.companyName}
                              style={{ color: "#444" }}
                            >
                              {t("SERVICESPAGES.SIDEMENU.EXPIRE")}:{" "}
                              {moment(serviceProfile?.membership_expiry_date)
                                .format("DD-MM-YYYY")
                                .replace(/[٠-٩]/g, (d) =>
                                  "٠١٢٣٤٥٦٧٨٩".indexOf(d)
                                )}
                            </Typography>
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                  <Box padding={2}>
                    <Box display="flex" justifyContent="center" paddingY={2}>
                      <button
                        className={classes.customBtn}
                        onClick={() => {
                          dispatch(push("/services-form/profile"));
                        }}
                      >
                        <span>{t("SERVICESPAGES.SIDEMENU.PROFILE")}</span>
                      </button>
                    </Box>
                    <Box display="flex" justifyContent="center" paddingY={2}>
                      <button
                        className={classes.customBtn}
                        onClick={() => {
                          handleClickOpen();
                        }}
                      >
                        <span>{t("SERVICESPAGES.SIDEMENU.LOGOUT")}</span>
                      </button>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            md={8}
            spacing={2}
            className={classes.dashboardCardsCon}
          >
            <Grid item sm={6} xs={12}>
              <Box className={classes.boxCon}>
                <Box className={classes.boxConTitle}>
                  <Box style={{ minWidth: 56 }}>
                    <FcStatistics size="2em" />
                  </Box>
                  <Typography>
                    {t("SERVICESPAGES.SIDEMENU.MYSTATISTICS")}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    {" "}
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.MYREQUESTS")}
                    </Typography>{" "}
                    <Typography className={classes.subNum}>
                      {statistics.total_requests}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.PAYMENTS")}
                    </Typography>
                    <Typography className={classes.subNum}>
                      {statistics.total_payment}{" "}
                      {t("SERVICESPAGES.SIDEMENU.AED")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box
                className={classes.boxCon}
                style={{ overflow: "hidden", maxHeight: "335px" }}
              >
                <Box className={classes.boxConTitle}>
                  <Box style={{ minWidth: 56 }}>
                    <FcSms size="2em" />
                  </Box>
                  <Typography>
                    {t("SERVICESPAGES.SIDEMENU.NITIFICATIONS")}
                  </Typography>
                </Box>
                <Box style={{ overflow: "auto", height: "100%" }}>
                  {notifications?.length ? (
                    notifications.map((item) => (
                      <Box paddingX={2} paddingY={1}>
                        {" "}
                        <Typography className={classes.notifiTitle}>
                          {item.subject}
                        </Typography>{" "}
                        <Typography className={classes.notifiDesc}>
                          {item.email_body}
                        </Typography>
                      </Box>
                    ))
                  ) : (
                    <Box paddingX={2} paddingY={1}>
                      <Typography className={classes.subTitle}>
                        {isRTL
                          ? "لا يوجد تنبيهات بالبريد الإلكتروني بعد!"
                          : "No Email Notifications Yet!"}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={classes.boxCon}>
                <Box className={classes.boxConTitle}>
                  {" "}
                  <Box style={{ minWidth: 56 }}>
                    <FcList size="2em" />
                  </Box>
                  <Typography>
                    {t("SERVICESPAGES.SIDEMENU.MYREQDETAILS")}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    {" "}
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.COOREQ")}
                    </Typography>{" "}
                    <Typography className={classes.subNum}>
                      {statistics.coo_request}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.AMEND")}
                    </Typography>
                    <Typography className={classes.subNum}>
                      {statistics.coo_edit_request}
                    </Typography>
                  </Box>{" "}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.COPIES")}
                    </Typography>
                    <Typography className={classes.subNum}>
                      {statistics.coo_copy_request}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.STAMPS")}
                    </Typography>
                    <Typography className={classes.subNum}>
                      {statistics.coo_seal_request}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    padding={2}
                  >
                    <Typography className={classes.subTitle}>
                      {t("SERVICESPAGES.SIDEMENU.RATIFIREQ")}
                    </Typography>
                    <Typography className={classes.subNum}>
                      {statistics.ratification_request}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Box className={classes.boxCon} padding={2}>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  className={classes.list}
                >
                  <ListItem
                    component={Link}
                    button
                    to={`/services-form/requests-list`}
                    className={classes.ListItemButton}
                  >
                    <BiListUl size="2em" />{" "}
                    <ListItemText
                      primary={t("SERVICESPAGES.SIDEMENU.REQUESTSLIST")}
                    />
                    {isRTL ? (
                      <RiArrowDropLeftLine size="2em" />
                    ) : (
                      <RiArrowDropRightLine size="2em" />
                    )}
                  </ListItem>
                  <ListItem
                    component={Link}
                    button
                    to={`/services-form/issued-requests-list`}
                    className={classes.ListItemButton}
                  >
                    <CgPlayListCheck size="2em" />
                    <ListItemText
                      primary={t("SERVICESPAGES.SIDEMENU.REQUESTISSUED")}
                    />
                    {isRTL ? (
                      <RiArrowDropLeftLine size="2em" />
                    ) : (
                      <RiArrowDropRightLine size="2em" />
                    )}
                  </ListItem>
                  <ListItem
                    component={Link}
                    button
                    to={`/services-form/deleted-requests-list`}
                    className={classes.ListItemButton}
                  >
                    <CgPlayListRemove size="2em" />
                    <ListItemText
                      primary={t("SERVICESPAGES.SIDEMENU.REQUESTDELETED")}
                    />
                    {isRTL ? (
                      <RiArrowDropLeftLine size="2em" />
                    ) : (
                      <RiArrowDropRightLine size="2em" />
                    )}
                  </ListItem>
                  <ListItem
                    component={Link}
                    button
                    to={`/services-form/circulars`}
                    className={classes.ListItemButton}
                  >
                    <MdAttachFile size="2em" />
                    <ListItemText
                      primary={t("SERVICESPAGES.SIDEMENU.CIRCULARS")}
                    />
                    {isRTL ? (
                      <RiArrowDropLeftLine size="2em" />
                    ) : (
                      <RiArrowDropRightLine size="2em" />
                    )}
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12}>
        <Box
          className={classes.boxCon}
          width="100%"
          padding={{ xs: 2, md: 3 }}
          marginTop={3}
        >
          <AppBar position="static" className={classes.appBar} color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
            >
              <Tab
                label={
                  loggedType == "1"
                    ? t("SERVICESPAGES.SIDEMENU.BUSINESS")
                    : t("SERVICESPAGES.SIDEMENU.INDIVIDUAL")
                }
                {...a11yProps(0)}
              />
              <Tab
                label={t("SERVICESPAGES.SIDEMENU.SUPPLIER")}
                {...a11yProps(1)}
              />
              <Tab
                label={t("SERVICESPAGES.SIDEMENU.OTHER")}
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Box width="100%" paddingX={{ md: 1 }} paddingY={{ xs: 2, md: 4 }}>
              <Grid container spacing={2}>
                {(loggedType == "1"
                  ? businessServicesData
                  : individualsServicesData
                )?.map((item) => (
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <Box className={classes.serviceItem}>
                      <Box className={classes.serviceIcon}>{item.icon}</Box>
                      <Box className={classes.serviceHeading}>
                        <Typography
                          className={
                            !item.public &&
                            serviceProfile &&
                            serviceProfile?.blocked == 1
                              ? "blockedTitle"
                              : "title"
                          }
                        >
                          {isRTL ? item.heading_ar : item.heading}
                        </Typography>
                      </Box>
                      <Box className={classes.serviceBtns}>
                        {!item.public &&
                        serviceProfile &&
                        serviceProfile?.blocked == 1 ? (
                          <Box
                            variant="outlined"
                            className="disabledBtn"
                            style={{
                              transform: isRTL ? "rotateY(180deg)" : "none",
                            }}
                          >
                            <BsPlay />
                          </Box>
                        ) : (
                          <Link
                            variant="outlined"
                            to={{
                              pathname: !item.public
                                ? serviceProfile == null
                                  ? "/login"
                                  : serviceProfile &&
                                    item.roles?.includes(parseInt(loggedType))
                                  ? `/services-form${item.link}`
                                  : "/login"
                                : `/services-form${item.link}`,
                              id: item.id,
                              name: isRTL ? item.heading_ar : item.heading,
                            }}
                          >
                            <BsPlay />
                          </Link>
                        )}
                        <Link
                          variant="outlined"
                          to={{
                            pathname: isRTL
                              ? `/ar/services/rak-chamber/services-details/${item.serviceId}`
                              : `/en/services/rak-chamber/services-details/${item.serviceId}`,
                            state: item.link
                              ? `/services-form${item.link}`
                              : false,
                          }}
                        >
                          <BsInfoCircle />
                        </Link>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box width="100%" paddingX={2} paddingY={4}>
              <Grid container spacing={2}>
                {supplierServicesData?.map((item) => (
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <Box className={classes.serviceItem}>
                      <Box className={classes.serviceIcon}>{item.icon}</Box>
                      <Box className={classes.serviceHeading}>
                        <Typography
                          className={
                            !item.public &&
                            serviceProfile &&
                            serviceProfile?.blocked == 1
                              ? "blockedTitle"
                              : "title"
                          }
                        >
                          {isRTL ? item.heading_ar : item.heading}
                        </Typography>
                      </Box>
                      <Box className={classes.serviceBtns}>
                        {!item.public &&
                        serviceProfile &&
                        serviceProfile?.blocked == 1 ? (
                          <Box
                            variant="outlined"
                            className="disabledBtn"
                            style={{
                              transform: isRTL ? "rotateY(180deg)" : "none",
                            }}
                          >
                            <BsPlay />
                          </Box>
                        ) : (
                          <Link
                            variant="outlined"
                            to={{
                              pathname: !item.public
                                ? serviceProfile == null
                                  ? "/login"
                                  : serviceProfile &&
                                    item.roles?.includes(parseInt(loggedType))
                                  ? `/services-form${item.link}`
                                  : "/login"
                                : `/services-form${item.link}`,
                              id: item.id,
                              name: isRTL ? item.heading_ar : item.heading,
                            }}
                          >
                            <BsPlay />
                          </Link>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box width="100%" paddingX={2} paddingY={4}>
              <Grid container spacing={2}>
                {otherServicesData?.map((item) => (
                  <Grid item sm={6} xs={12}>
                    {" "}
                    <Box className={classes.serviceItem}>
                      <Box className={classes.serviceIcon}>{item.icon}</Box>
                      <Box className={classes.serviceHeading}>
                        <Typography
                          className={
                            !item.public &&
                            serviceProfile &&
                            serviceProfile?.blocked == 1
                              ? "blockedTitle"
                              : "title"
                          }
                        >
                          {isRTL ? item.heading_ar : item.heading}
                        </Typography>
                      </Box>
                      <Box className={classes.serviceBtns}>
                        <Link
                          variant="outlined"
                          to={{
                            pathname: !item.public
                              ? serviceProfile == null
                                ? "/login"
                                : serviceProfile &&
                                  item.roles?.includes(parseInt(loggedType))
                                ? `/services-form${item.link}`
                                : "/login"
                              : `/services-form${item.link}`,
                            id: item.id,
                            name: isRTL ? item.heading_ar : item.heading,
                          }}
                        >
                          <BsPlay />
                        </Link>
                        {/* <Link
                            variant="outlined"
                            to={{
                              pathname: `/services/rak-chamber/services-details/${item.heading}/${item.serviceId}`,
                              start: `/services-form${item.link}`,
                            }}
                          >
                            {isRTL ? (
                              <HiChevronDoubleLeft />
                            ) : (
                              <HiChevronDoubleRight />
                            )}
                          </Link> */}
                      </Box>
                    </Box>
                  </Grid>
                ))}{" "}
              </Grid>
            </Box>
          </TabPanel>
        </Box>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">
          {t("SERVICESPAGES.SIDEMENU.LOGOUT")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("SERVICESPAGES.PROFILE.CONFIRMLOGOUT")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("SERVICESPAGES.COOVERIFY.CANCEL")}
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            {t("SERVICESPAGES.PROFILE.OK")}
          </Button>
        </DialogActions>
      </Dialog>
      <ServicesResultModal
        open={openDialog}
        setOpen={setOpenDialog}
        message={message}
        routing={routing}
        noThanks={true}
      />
    </Container>
  );
}
