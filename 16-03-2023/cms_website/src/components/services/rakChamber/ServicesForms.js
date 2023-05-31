import {
  Avatar,
  Box,
  Container,
  Drawer,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineSetting } from "react-icons/ai";
import { GoTasklist, GoListUnordered } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  RiDashboardLine,
  RiListSettingsLine,
  RiFileEditLine,
} from "react-icons/ri";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { setDirection } from "../../../redux/actionCreators/theme";
import actions from "../../../redux/actions";
import Spinner from "../../../routes/Spinner";
import useStyles from "../../../styles/components/services/servicesSideBar";
import { buildCanonicalUrl } from "../../shared/utils";
import { businessServicesData } from "./businessServices/businessServicesData";
import { individualsServicesData } from "./individualsServices/individualsServicesData";
import { otherServicesData } from "./other/otherServicesData";
import Router from "./ServicesRouting";
import { supplierServicesData } from "./supplierServices/supplierServicesData";

const { serviceLoginDone, isLoading, loadingDone, loadingAction } = actions;

function ResponsiveDrawer(props) {
  const { t, i18n } = useTranslation();
  const {
    APIServices,
    services,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const match = useRouteMatch();
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginType, setLoginType] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("Our Services");
  const [processed, setProcessed] = useState(false);
  const currentLanguage = isRTL ? "ar" : "en";
  const { pathname: currentUrl } = useLocation();
  let loggedType = sessionStorage.getItem("loggedType");
  let haveRequest = JSON.parse(sessionStorage.getItem("haveRequest"));
  const serviceProfile = sessionStorage.getItem("serviceProfile")
    ? JSON.parse(sessionStorage.getItem("serviceProfile"))
    : sessionStorage.getItem("supplierProfile")
    ? JSON.parse(sessionStorage.getItem("supplierProfile"))
    : null;
  let memberType = sessionStorage.getItem("memberType");
  let updateUser = sessionStorage.getItem("updateUser");
  const dispatch = useDispatch();

  const servicesGroups = [
    {
      title: "Business Services",
      title_ar: "خدمات الأعمال",
      submenu: businessServicesData,
      public:
        !APIServices.serviceLogInDone || APIServices.serviceLogInDone == 0
          ? true
          : false,
      type: 1,
    },
    {
      title: "Individuals Services",
      title_ar: "خدمات الأفراد",
      submenu: individualsServicesData,
      type: 2,
    },
    {
      title: "Supplier Services",
      title_ar: "خدمات الموردين",
      submenu: supplierServicesData,
      public: true,
    },
    {
      title: "Other Services",
      title_ar: "خدمات أخرى",
      submenu: otherServicesData,
      public: true,
    },
  ];

  useEffect(() => {
    let loggedType = sessionStorage.getItem("loggedType");
    dispatch(serviceLoginDone({ status: loggedType }));
  }, []);

  useEffect(() => {
    (async () => {
      setProcessed(false);
      let { canonicalUrl, canonicalLanguage } = await buildCanonicalUrl(
        currentUrl,
        currentLanguage
      );
      if (currentLanguage !== canonicalLanguage) {
        dispatch(setDirection({ isRTL: !isRTL }));
        i18n.changeLanguage(isRTL ? "en" : "ar");
      }

      if (canonicalUrl === currentUrl) {
        setProcessed(true);
        return;
      }

      window.location.replace(canonicalUrl);
    })();
  }, [currentUrl]);

  useEffect(() => {
    if (
      APIServices.postBusinessDirectoryForm ||
      APIServices.getEServicesDetails ||
      APIServices.postCooVerificationForm ||
      APIServices.getRatificationVerification ||
      APIServices.serviceLogIn ||
      APIServices.selectMenuData ||
      APIServices.calculateFees ||
      APIServices.sendNewCOOForm ||
      APIServices.uploadRakFile ||
      APIServices.getRakRequestList ||
      APIServices.getCooVerificationData ||
      APIServices.getCooAccreditedList ||
      APIServices.sendCooAdditionalRequest ||
      APIServices.sendOtherRequest ||
      APIServices.sendCooEditRequest ||
      APIServices.getGoodsDetailsList ||
      APIServices.sendCooGoodsEditRequest ||
      APIServices.getRatificationType ||
      APIServices.getRatificationDocType ||
      APIServices.sendRatificationReq ||
      APIServices.getMembershipVerify ||
      APIServices.getMembershipFees ||
      APIServices.getMembershipProfile ||
      APIServices.sendCooAttachments ||
      APIServices.sendDeleteRequestInfo ||
      APIServices.getRakIssuedRequestList ||
      APIServices.getTotals ||
      APIServices.sendPaymentRequest ||
      APIServices.getPaymentDetails ||
      APIServices.sendPaymentConfirm ||
      APIServices.getRatificationRequestDetails ||
      APIServices.getRatificationRequestAttach ||
      APIServices.sendRatificationReqUpdate ||
      APIServices.getCooAdditionalRequestDetails ||
      APIServices.getOtherRequestDetails ||
      APIServices.getCooEditRequestDetails ||
      APIServices.getCooEditRequestOriginDetails ||
      APIServices.getCooGoodsEditData ||
      APIServices.getCooStamps ||
      APIServices.checkInvoiceNo ||
      APIServices.sendDeletedAttachments ||
      APIServices.sendCooAdditionalRequestUpdate ||
      APIServices.sendOtherRequestUpdate ||
      APIServices.getEServicesList ||
      APIServices.getEServicesGroups ||
      APIServices.getCooRequestDetails ||
      APIServices.sendCooRequestUpdate ||
      APIServices.isicActivityData ||
      APIServices.postBusinessDirectoryByActivity ||
      APIServices.searchByKeyword ||
      APIServices.getPaymentTrx ||
      APIServices.sendMemberRegister ||
      APIServices.sendMemberProfileUpdate ||
      APIServices.sendUpdatedPassword ||
      services.postServiceForm ||
      APIServices.sendNotification ||
      APIServices.sendEmail ||
      APIServices.getFileList ||
      APIServices.fileStamp ||
      APIServices.finishFileStamp ||
      APIServices.getNotification ||
      APIServices.getServiceStep ||
      APIServices.uploadFileAction
    ) {
      dispatch(loadingAction({ loading: true }));
    } else dispatch(loadingAction({ loading: false }));
  }, [APIServices, services]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClick = (index) => {
    if (selectedIndex === index) {
      setSelectedIndex("");
    } else {
      setSelectedIndex(index);
    }
  };
  const drawer = (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.list}
    >
      {loggedType !== "3" ? (
        <>
          <ListItem
            component={Link}
            button
            to={`/services/rak-chamber/dashboard`}
            onClick={() => {
              setSelectedTitle("My Dashboard");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone == 0 ||
              updateUser
            }
          >
            <RiDashboardLine />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.DASHBOARD")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/requests-list`}
            onClick={() => {
              setSelectedTitle("Requests List");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone == 0 ||
              updateUser
            }
          >
            {" "}
            <GoListUnordered />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.REQUESTSLIST")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/issued-requests-list`}
            onClick={() => {
              setSelectedTitle("Issued Requests List");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone == 0 ||
              updateUser
            }
          >
            {" "}
            <GoTasklist />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.REQUESTISSUED")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services/rak-chamber`}
            className={classes.ListItemButton}
          >
            {" "}
            <AiOutlineSetting />
            <ListItemText primary={t("HOME.SERVICES.HEADER")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/OtherServicesForm/Technical Support`}
            className={classes.ListItemButton}
          >
            {" "}
            <RiListSettingsLine />
            <ListItemText
              primary={t("SERVICESPAGES.SERVICEDETAILS.TECHNICALSUPPORT")}
            />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/page/User-Manual`}
            className={classes.ListItemButton}
          >
            {" "}
            <BsJournalBookmarkFill />
            <ListItemText
              primary={t("SERVICESPAGES.SERVICEDETAILS.USERMANUAL")}
            />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem
            component={Link}
            button
            to={`/services-form/profile`}
            onClick={() => {
              setSelectedTitle("Profile");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone || APIServices.serviceLogInDone == 0
            }
          >
            <RiDashboardLine />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.PROFILE")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/supplier-services/Supplier Registration`}
            onClick={() => {
              setSelectedTitle("Supplier Request");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone == 0 ||
              haveRequest
            }
          >
            {" "}
            <GoTasklist />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.REGISTERATION")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/supplier-services/Supplier Registration/view`}
            onClick={() => {
              setSelectedTitle("Supplier Request");
            }}
            className={classes.ListItemButton}
            disabled={
              !APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone == 0 ||
              !haveRequest
            }
          >
            {" "}
            <RiFileEditLine />
            <ListItemText primary={t("SERVICESPAGES.SIDEMENU.MYREQUEST")} />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/services-form/OtherServicesForm/Technical Support`}
            className={classes.ListItemButton}
          >
            {" "}
            <RiListSettingsLine />
            <ListItemText
              primary={t("SERVICESPAGES.SERVICEDETAILS.TECHNICALSUPPORT")}
            />
          </ListItem>
          <ListItem
            component={Link}
            button
            to={`/page/User-Manual`}
            className={classes.ListItemButton}
          >
            {" "}
            <BsJournalBookmarkFill />
            <ListItemText
              primary={t("SERVICESPAGES.SERVICEDETAILS.USERMANUAL")}
            />
          </ListItem>
        </>
      )}
    </List>
  );
  const status = (memberType) => {
    if (memberType == "expired" || memberType == "activeExpired") {
      return (
        <Box display="flex" flexDirection="row" padding={2}>
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

  const container =
    window !== undefined ? () => window().document.body : undefined;

  if (!processed) {
    return <Spinner />;
  }

  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <Grid container>
        <Grid item xs={12} sm={2} md={1} className={classes.sideBar}>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === "rtl" ? "right" : "left"}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
        </Grid>
        <Grid item xs={12} sm={12} md={11}>
          <main className={classes.content}>
            {(APIServices.serviceLogInDone ||
              APIServices.serviceLogInDone != 0) && (
              <Box
                display="flex"
                flexDirection="row"
                ml={{ xs: 0, sm: 4 }}
                mb={2}
                pb={1}
                style={{ borderBottom: "2px dashed #eee" }}
              >
                <Box px={2}>
                  <IoPersonCircleOutline size={32} color="#596a87" />{" "}
                </Box>
                <Typography className={classes.name}>
                  {isRTL ? `مرحباً` : "Welcome"}{" "}
                  {loggedType == "3"
                    ? serviceProfile?.userName
                    : loggedType == "1"
                    ? serviceProfile?.contact_name
                    : isRTL
                    ? serviceProfile?.name
                    : serviceProfile?.name_e}
                </Typography>
              </Box>
            )}
            <Switch>
              <Route path="/:language/" component={Router} />
            </Switch>
          </main>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ResponsiveDrawer;
