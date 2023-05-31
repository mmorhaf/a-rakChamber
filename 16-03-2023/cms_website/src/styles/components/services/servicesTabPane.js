import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  flexRoot: {
    flex: "1 1 auto",
    marginTop: "135px",
    marginBottom: "40px",
    // minHeight: "70.5vh",
    [theme.breakpoints.down(450)]: {
      "& .MuiContainer-root": {
        margin: "0px !important",
        padding: "0px !important",
      },
    },
  },
  dateBoxHeight: {
    height: "26px",
  },
  displayPrint: {
    display: "none",
    [theme.breakpoints.down(1070)]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  hidePrint: {
    [theme.breakpoints.down(1070)]: {
      display: "none",
    },
  },
  noMarginTop: {
    marginTop: "0px!important",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  ratingIcon: {
    fontSize: 24,
    cursor: "pointer",
  },
  cancelBtn: {
    position: "absolute",
    right: 20,
    top: 15,
    fontSize: 23,
    cursor: "pointer",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    width: "98%!important",
    maxWidth: "98%!important",
  },
  marginLeft16: {
    marginLeft: 16,
    [theme.breakpoints.down(500)]: {
      marginLeft: "0px!important",
    },
  },
  space: {
    [theme.breakpoints.down(500)]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },
  exportText: {
    [theme.breakpoints.down(700)]: {
      display: "none",
    },
  },
  exportIcon: {
    display: "none",
    [theme.breakpoints.down(700)]: {
      display: "block",
    },
  },
  smallerBtn: {
    [theme.breakpoints.down(700)]: {
      minWidth: "50px!important",
    },
  },
  closeBtn: {
    position: "absolute",
    right: 40,
    top: 8,
  },
  relative: {
    position: "relative",
  },
  disabledIcon: {
    cursor: "inherit",
    color: "#c4c4c4",
    position: "relative",
    fontSize: 23,
  },
  marginRight16: {
    marginRight: 16,
    [theme.breakpoints.down(500)]: {
      marginRight: "0px!important",
    },
  },
  replyDialog: {
    "& .MuiDialog-container .MuiPaper-root": {
      display: "block",
      "& .MuiDialogTitle-root .MuiTypography-root": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
  noSearch: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: `${theme.palette.primary.main}!important`,
    width: "100%",
    textAlign: "center",
    textTransform: "capitalize",
    fontSize: theme.globals.fontSize.s,
    paddingTop: "8px",
    paddingBottom: "8px",
    [theme.breakpoints.down(400)]: {
      paddingLeft: "8px",
      textAlign: "left",
    },
  },
  noBorderTop: {
    borderTop: "none!important",
  },
  paddingTop15: {
    paddingTop: 15,
  },
  updateIconBox: {
    position: "relative",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  updateIcon: {
    fontSize: 24,
    color: theme.globals.colors.pollInnerBox,
    position: "absolute",
    right: 0,
  },
  fullWidth: {
    [theme.breakpoints.down(600)]: {
      maxWidth: "100%!important",
      flexBasis: "100%!important",
    },
  },
  biggerLabel: {
    fontSize: "14px!important",
  },
  account: {
    fontSize: 13,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: `${theme.palette.primary.main}!important`,
    fontWeight: 600,
    "&:hover": {
      cursor: "pointer",
    },
  },
  text: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.s,
    textAlign: "start",
    "& a": { color: "rgba(0, 0, 0, 0.87)!important" },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  printBtn: {
    marginRight: 24,
  },
  fontFamily: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  btnsContainer: {
    display: "flex",
    justifyContent: "start",
    overflow: "auto",
  },
  dashboardSideCon: {
    marginRight: "16px",
    [theme.breakpoints.down(960)]: {
      marginRight: "0px",
      marginBottom: "16px",
    },
  },
  dashboardCardsCon: {
    [theme.breakpoints.down(960)]: {
      margin: "0px",
    },
    "& .MuiGrid-item": {
      [theme.breakpoints.down(600)]: {
        margin: "0px",
      },
    },
  },
  boxCon: {
    background: theme.globals.colors.white,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.07)",
    borderRadius: "10px",
    height: "100%",
    "& .infoBox": {
      [theme.breakpoints.between(600, 960)]: {
        display: "flex",
        flexDirection: "row",
      },
    },
  },
  companyStatusBox: {
    height: "220px",
    borderRadius: "10px 10px 0 0",
    position: "relative",
    [theme.breakpoints.between(600, 960)]: {
      height: "100%",
      borderRadius: "10px 0 0 10px",
      padding: 8,
    },
    [theme.breakpoints.down(600)]: {
      height: "175px",
    },
  },
  supplierImgBox: {
    boxShadow: "0px 4px 4px rgb(0 0 0 / 25%)",
    height: 150,
    width: 290,
    display: "flex",
    flexDirection: "column",
    padding: 12,
    [theme.breakpoints.down(600)]: {
      width: 212,
      height: 100,
      padding: "12px!important",
      alignItems: "center",
      marginTop: 10,
      marginLeft: 40,
      justifyContent: "center",
    },
  },
  subTitle: {
    color: "#444",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
    [theme.breakpoints.down(768)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  subHeading: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
  },
  subNum: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  ListItemButton: {
    border: "2px dashed #eeeeee",
    margin: "10px 0",
    borderRadius: "29px",
    color: "#bbb",
    "&:hover": { color: "#b2c901" },
    "& .MuiListItemText-root span": {
      color: "#444",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },
  },
  centerCheckBox: {
    display: "flex",
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
  },
  boxConTitle: {
    height: "70px",
    borderBottom: "2px dashed rgba(68, 68, 68, 0.14)",
    display: "flex",
    alignItems: "center",
    padding: "0px 16px",
    textAlign: "start",
    "& p": {
      color: "#444",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontWeight: 600,
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },
  },
  customBtn: {
    outline: "none",
    width: "130px",
    height: "40px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: 500,
    transition: "all 0.3s ease",
    position: "relative",
    display: "inline-block",
    background: theme.palette.primary.main,
    color: "#fff",
    lineHeight: "42px",
    padding: 0,
    border: "none",
    borderRadius: "5px",
    "&:hover": {
      background: "transparent",
      color: theme.palette.primary.main,
    },
    "&:before , &:after": {
      content: "''",
      position: "absolute",
      top: "0",
      right: "0",
      height: "2px",
      width: "0",
      background: theme.palette.primary.main,
      transition: "400ms ease all",
    },
    "&:after": {
      right: "inherit",
      top: "inherit",
      left: "0",
      bottom: "0",
    },

    "&:hover:before , &:hover:after": {
      width: "100%",
      transition: "800ms ease all",
    },
    [theme.breakpoints.down(768)]: {
      width: "110px",
      fontSize: theme.globals.fontSize.xs,
    },
  },
  avatarIcon: {
    position: "absolute !important",
    margin: "0% auto",
    right: 0,
    left: 0,
    bottom: "-75px",
    width: "150px !important",
    height: "150px !important",
    textTransform: "capitalize",
    fontSize: "4rem  !important",
    boxShadow: "0px 0px 10px 2px rgb(0 0 0 / 7%)",
    border: "4px solid #fff",
    [theme.breakpoints.between(600, 960)]: {
      width: "90px !important",
      height: "90px !important",
      bottom: "8px",
      fontSize: "3rem  !important",
    },
    [theme.breakpoints.down(600)]: {
      width: "100px !important",
      height: "100px !important",
      fontSize: "3rem  !important",
      bottom: "-45px",
    },
  },
  name: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontSize: theme.globals.fontSize.lg,
    color: theme.globals.colors.white,
    fontWeight: "700",
    textAlign: "center",
    paddingTop: 40,
    [theme.breakpoints.between(600, 960)]: {
      paddingTop: 8,
    },
    [theme.breakpoints.down(768)]: {
      fontSize: theme.globals.fontSize.m,
    },
  },
  companyName: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontStyle: "normal",
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
    textAlign: "start",
    paddingTop: 8,
    [theme.breakpoints.down(768)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "none",
    "& .MuiTab-root": {
      color: `${theme.palette.primary.main} !important`,
      textTransform: "none",
      fontWeight: 600,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      [theme.breakpoints.down(768)]: {
        maxWidth: "fit-content",
        minWidth: "auto",
      },
    },
    "& .MuiTabs-flexContainer": {
      justifyContent: "center",
      [theme.breakpoints.down(768)]: {
        justifyContent: "unset",
      },
    },
    "& .MuiTabs-indicator": { display: "none" },
    "& .MuiTab-textColorInherit.Mui-selected": {
      borderRadius: "25px",
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  serviceItem: {
    background: "#FFFFFF",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 10%)",
    borderRadius: "5px",
    padding: "16px 8px",
    display: "flex",
    textAlign: "start",
    "& .title": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: theme.palette.primary.main,
      fontWeight: 600,
      lineHeight: "24px",
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },
    "& .blockedTitle": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: "#c4c4c4!important",
      fontWeight: 600,
      lineHeight: "24px",
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },
  },
  serviceIcon: { width: "10%", fontSize: "24px", color: "#ddd" },
  serviceHeading: {
    width: "80%",
    display: "-webkit-box",
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",
    textOverflow: "ellipsis",
    textAlign: "start",
    marginLeft: 5,
    [theme.breakpoints.between(600, 768)]: {
      width: "70%",
    },
    [theme.breakpoints.down(400)]: {
      width: "70%",
    },
  },
  serviceBtns: {
    width: "10%",
    display: "flex",
    justifyContent: "space-between",
    "& .disabledBtn": {
      color: "#E4E4E4",
      fontSize: "20px",
      WebkitTransition: "all 0.1s ease",
      MozTransition: "all 0.1s ease",
      transition: "all 0.1s ease",
      transform: theme.direction === "rtl" ? "rotate(180deg)" : "unset",
      "&:hover": { fontSize: "23px" },
    },
    "& a": {
      color: "#b2c901",
      fontSize: "20px",
      WebkitTransition: "all 0.1s ease",
      MozTransition: "all 0.1s ease",
      transition: "all 0.1s ease",
      transform: theme.direction === "rtl" ? "rotate(180deg)" : "unset",
      "&:hover": { fontSize: "23px" },
    },
  },
  timeBoxHeight: {
    [theme.breakpoints.between(650, 960)]: {
      height: 48,
    },
  },
  billBoxHeight: {
    [theme.breakpoints.between(650, 960)]: {
      height: 45,
    },
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  fingerImg: {
    maxWidth: "9%",
    height: "auto",
    marginRight: 5,
  },
  messageBox: {
    border: `1px solid ${theme.palette.primary.main}!important`,
    borderRadius: 5,
    padding: "15px 10px",
    minHeight: 60,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  supplier: {
    textAlign: "start",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.s,
    color: "red",
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  formRoot: {
    // overflowX: "scroll",
    backgroundColor: theme.globals.colors.bgWhite,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    width: "95%",
    marginLeft: "auto",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(1185)]: {
      overflow: "visible",
    },
    "& .MuiBox-root": {
      maxWidth: "100%",
      // [theme.breakpoints.down(380)]: {
      //   maxWidth: "80%",
      // },
    },
    "& .ng-binding": {
      [theme.breakpoints.down(535)]: {
        width: "98%",
      },
    },
    "& .searchResultItem": {
      cursor: "pointer",
      border: "1px solid #eee",
      borderRadius: "12px",
      padding: "8px",
      backgroundColor: "#eee",
      textAlign: "start",
      maxWidth: "100%!important",
      letterSpacing: "normal",
      "& > p": {
        color: theme.palette.primary.main,
        // display: "flex",
        marginBottom: 8,
        fontWeight: "bold",
        fontSize: theme.globals.fontSize.s - 2,
        letterSpacing: "normal",
        "& > span": {
          maxWidth: "200px",
          fontWeight: "normal",
          letterSpacing: "normal",
        },
      },
      "& > p:nth-child(3)": {
        marginBottom: 0,
      },
    },
    "& p": {
      // fontSize: theme.globals.fontSize.s - 2,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      [theme.breakpoints.down(700)]: {
        position: "relative!important",
        textAlign: "start!important",
      },
    },
    "& h5": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .tradesTabs": {
      borderTop: `2px dashed ${theme.globals.colors.pollOuterBox}`,
      width: "100%",
      marginTop: "16px",
      "& button": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "& .serviceFormIcon": {
      display: "flex",
      paddingRight: 0,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      maxWidth: "140px",
    },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.m - 2,
      padding: "16px",
    },
    [theme.breakpoints.down(500)]: {
      width: "100%",
    },
  },
  // trxRoot: {
  page: {
    // "& #printSection_aura": {
    // maxWidth: "25cm",
    // height: "100%",
    flex: "auto",
    // height: "100%",
    // padding: "20mm",
    margin: "10px auto",
    // border: "1px #D3D3D3 solid",
    // borderRadius: "5px",
    backgroundColor: "red",
    // boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
    "& .subpage": {
      margin: "10px",
      width: "100%",
      // height: "100%",
      background: "blue",
      border: "1px #000 solid",
      // outline: "2cm #FFEAEA solid",
    },
    // },
  },
  // },
  trxPage: {
    backgroundColor: "#ffffff",
    backgroundImage: "url(/assets/images/services/chamber_bg.png)",
    maxWidth: "21cm",
    padding: "7px",
    backgroundSize: "97%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    border: "1px solid #ccc",
    margin: "10px auto",
    direction: "rtl!important",

    "& .header": {
      // height: "115px",
      "& .header-img": {
        display: "block",
        width: "70%",
        height: "auto",
        float: "right",
      },
      "& .header-title-bg": {
        backgroundColor: "#e1f5fe",
        "& .header-title": {
          color: "#01579b",
          fontSize: "1.5rem",
        },
      },
      "& .header-border": {
        border: "3px solid #e1f5fe",
        marginTop: "4px",
        width: "100%",
      },
    },
    "& .bold": { fontWeight: "700" },
    "& .ar": { fontFamily: theme.globals.fontFamily.ar },
    "& .en": { fontFamily: theme.globals.fontFamily.en },
    "& .trx-details": {
      display: "flex",
      fontSize: "14px",
      alignItems: "center",
      padding: " 4px 0",
      "& p": { fontSize: "14px", padding: "0 4px" },
    },
    "& .trx-details-en": {
      display: "flex",
      fontSize: "14px",
      direction: "ltr",
      alignItems: "center",
      padding: " 4px 0",
      "& p": { fontSize: "14px", padding: "0 4px" },
    },
    "& .paid": {
      color: "#fff",
      backgroundColor: `${theme.globals.colors.pollInnerBox}!important`,
      borderRadius: "4px",
    },
  },
  otherContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    width: "95%",
    marginLeft: "auto",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    [theme.breakpoints.down(600)]: {
      width: "100%",
      padding: "24px 16px",
    },
  },
  supplierRoot: {
    background: theme.globals.colors.white,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    width: "95%",
    marginLeft: "auto",
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      [theme.breakpoints.down(900)]: {
        position: "relative!important",
        textAlign: "start!important",
      },
    },

    [theme.breakpoints.down(600)]: {
      width: "100%",
      padding: "24px 16px",
    },
  },
  licenceInfoButtons: {
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
    "& label": {
      width: 200,
      display: "flex",
      alignItems: "center",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,

      "& input[type='radio']": {
        width: "15px",
        height: "15px",
        borderRadius: "15px",
        left: "2px",
        position: "relative",
        marginRight: 12,
        border: "2px solid #bbb",
        backgroundClip: "content-box",
        appearance: "none",
      },
      "& input[type='radio']:checked": {
        backgroundColor: theme.palette.secondary.main,
      },
    },
  },
  serviceTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.m,
    color: theme.palette.primary.main,
    fontWeight: "700",
    textAlign: "start",
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.m - 2,
    },
    [theme.breakpoints.down(500)]: {
      fontSize: theme.globals.fontSize.s,
    },
  },
  requestDate: {
    left: "5%",
    position: "absolute",
    [theme.breakpoints.down(800)]: {
      left: "unset",
      textAlign: "center!important",
    },
  },
  stepper: {
    backgroundColor: "inherit",
    "& .MuiStep-root": {
      "& .MuiStepLabel-root": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        "& .MuiTypography-root": {
          color: "#fff",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
        "& .MuiSvgIcon-root": {
          color: "#C4C4C4",
        },
        "& .MuiStepLabel-iconContainer": {
          "& .MuiStepIcon-completed": {
            color: "#BACF1A!important",
          },
          "& .MuiStepIcon-active": {
            color: "#1f627f",
          },
          "& .Mui-error": {
            color: "#f44336",
          },
        },
      },
    },
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    marginLeft: 0,
  },
  badgeBox: {
    right: "5%",
    top: 7,
    position: "absolute",
    "& .MuiBadge-root .MuiBadge-badge": {
      backgroundColor: theme.globals.colors.pollInnerBox,
      border: "1px solid #fff",
    },
  },
  "@keyframes ring": {
    "0%": {
      transform: "rotate(0)",
    },
    "1%": {
      transform: "rotate(30deg)",
    },
    "3%": {
      transform: "rotate(-28deg)",
    },
    "5%": {
      transform: "rotate(34deg)",
    },
    "7%": {
      transform: "rotate(-32deg)",
    },
    "9%": {
      transform: "rotate(30deg)",
    },
    "11%": {
      transform: "rotate(-28deg)",
    },
    "13%": {
      transform: "rotate(26deg)",
    },
    " 15%": {
      transform: "rotate(-24deg)",
    },
    "17% ": {
      transform: "rotate(22deg)",
    },
    "19%": {
      transform: "rotate(-20deg)",
    },
    "21%": {
      transform: "rotate(18deg)",
    },
    "23%": {
      transform: "rotate(-16deg)",
    },
    "25%": {
      transform: "rotate(14deg)",
    },
    " 27%": {
      transform: "rotate(-12deg)",
    },
    "29%": {
      transform: "rotate(10deg)",
    },
    " 31%": {
      transform: "rotate(-8deg)",
    },
    "33%": {
      transform: "rotate(6deg)",
    },
    "35%": {
      transform: "rotate(-4deg)",
    },
    "37%": {
      transform: "rotate(2deg)",
    },
    "39%": {
      transform: "rotate(-1deg)",
    },
    "41%": {
      transform: "rotate(1deg)",
    },

    "43%": {
      transform: "rotate(0)",
    },
    "100%": {
      transform: "rotate(0)",
    },
  },
  animation: {
    animation: "$ring 4s .7s ease-in-out infinite",
    transformOrigin: "50% 4px",
  },
  bell: {
    fontSize: 23,
    position: "relative",
    cursor: "pointer",
    color: theme.globals.colors.pollInnerBox,
  },
  status: {
    minHeight: 45,
    textTransform: "capitalize",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.m,
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    padding: 10,
    borderRadius: 12,
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.m - 2,
    },
    [theme.breakpoints.down(500)]: {
      fontSize: theme.globals.fontSize.s,
      overflowX: "scroll",
    },
  },
  desc: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
    marginBottom: 20,
    [theme.breakpoints.down(600)]: {
      marginBottom: 10,
    },
  },
  label: {
    textAlign: "start",
    fontSize: theme.globals.fontSize.xs + 1,
    color: theme.palette.primary.main,
    fontWeight: "600",
    marginTop: theme.spacing(0.5),
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  labelCheckbox: {
    textAlign: "start",
    fontSize: theme.globals.fontSize.xs + 1,
    color: theme.palette.primary.main,
    fontWeight: "600",
    marginTop: theme.spacing(0.5),
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    position: "relative",
    lineHeight: "1.5",
    "&:before": {
      position: "absolute",
      content: '""',
      width: 35,
      height: 2,
      bottom: 0,
      backgroundColor: theme.globals.colors.pollInnerBox,
    },
  },
  textFieldNumberd: {
    width: "100%",
    border: `1px solid #ccc`,
    borderRadius: "5px",
    padding: 5,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.xs,
    },
    "&:focus-visible": { outlineColor: theme.palette.secondary.main },
  },
  helperText: {
    color: "#686868",
    margin: 0,
    fontSize: "0.75rem",
    marginTop: "3px",
    textAlign: "left",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
  },
  textField: {
    width: "100%",
    "& .MuiFormHelperText-root": {
      marginLeft: 0,
    },
    "&  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      // border: " 1px solid rgb(0 0 0 / 23%)",
    },
    "&:hover": {
      "&  .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    "&  .MuiOutlinedInput-input , .MuiInput-input": {
      borderRadius: "5px",
      padding: "8px !important",
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },

    "& p.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error": {
      marginLeft: "0",
      fontSize: theme.globals.fontSize.xs,
      color: "red",
      marginTop: "4px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiInputBase-input.Mui-disabled": {
      backgroundColor: theme.globals.colors.bgGray,
    },
    "& .MuiAutocomplete-inputRoot": {
      padding: "0px !important",
    },
    "& .MuiAutocomplete-tag": {
      height: "25px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 30px white inset !important",
      WebkitTextFillColor: "#000!important",
    },
  },
  textFieldError: {
    "&  .MuiOutlinedInput-input , .MuiInput-input": {
      border: "1px solid #ff4444",
      boxShadow: "0 0 0 0.2rem rgb(255 68 68 / 25%)",
    },
  },
  supplierDate: {
    width: "100%",
    borderRadius: "5px",
    border: " 1px solid rgb(0 0 0 / 23%)",
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-input": {
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  dateIcon: {
    fontSize: 22,
    color: theme.palette.primary.main,
  },
  textFieldDate: {
    width: "100%",
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-input": {
      borderRadius: "5px",
      padding: "8px",
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      border: " 1px solid rgb(0 0 0 / 23%)",
    },
  },
  textFieldDate2: {
    width: "100%",
    "& .MuiInputBase-root": {
      borderRadius: "5px",
      border: " 1px solid rgb(0 0 0 / 23%)",
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiInput-input": {
      padding: "7px",
      textAlign: "start",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  errorMess: {
    marginLeft: "0",
    fontSize: theme.globals.fontSize.xs,
    color: "red",
    marginTop: "4px",
  },
  fullContainerWidth: {
    [theme.breakpoints.down(900)]: { maxWidth: "100%", flexBasis: "100%" },
  },
  inpuContainerLessMargin: {
    margin: "4px 0px !important",
  },
  inpuContainer: {
    margin: "14px 0",
    alignItems: "center",
    textAlign: "start",
    [theme.breakpoints.down(900)]: {
      display: "block",
    },
    "& .Mui-disabled": {
      backgroundColor: `${theme.globals.colors.bgGray}!important`,
      color: "#686868",
    },
    "& .MuiInputBase-root": {
      padding: 0,
    },
    "&  .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    "& .PhoneInput--disabled": {
      justifyContent: "center",
      padding: "5px",
      marginRight: "0px!important",
      boxShadow: "none",
    },
    "& .PhoneInput .PhoneInputCountry": {
      justifyContent: "center",
      padding: "5px",
      marginRight: "0px!important",
      boxShadow: "0px 0px 20px rgb(0,0,0,10%)",
      "& .PhoneInputCountrySelect[disabled], .PhoneInputCountrySelect[readonly]":
        {
          cursor: "default",
        },
      "& .PhoneInputCountrySelect": {
        cursor: "pointer",
      },
    },
    "& .PhoneInputInput": {
      outline: "none",
      padding: "4px 8px !important",
      textAlign: "start",
      borderRadius: "3px",
      border: `1px solid ${theme.globals.colors.grayBorder}`,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      width: "100%",
      backgroundColor: theme.globals.colors.bgWhite,
      color: theme.globals.colors.black,
      position: "relative",
      direction: theme.direction === "rtl" ? "rtl" : "inherit",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "none",

      "& .PhoneInputCountry .PhoneInputCountryIcon": {
        boxShadow: "none!important",
      },
      "& .PhoneInputCountry .PhoneInputCountryIcon .PhoneInputCountryIconImg": {
        height: "17px",
        width: "30px",
        color: theme.palette.primary.main,
      },
      "& .focus-visible": {
        background: "none",
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        outline: "none",
      },
      "& input": {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        background: "none!important",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        height: "32px",
        width: "100%",
        // webkitBoxShadow: "none!important",
        boxShadow: "none",
        "& .MuiFormHelperText-root": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
      "& :-webkit-autofill": {
        transition: "background-color 5000s ease-in-out 0s",
        boxShadow: "none",
      },
    },
    "&  p.info": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: "#aaa",
      textAlign: "start",
    },
    "& .radioButtons": {
      flexWrap: "wrap",
      "& label": {
        minWidth: 150,
        display: "flex",
        alignItems: "center",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        [theme.breakpoints.down(600)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
        "& input[type='radio']": {
          width: "15px",
          height: "15px",
          borderRadius: "15px",
          left: "2px",
          position: "relative",
          marginRight: 12,
          border: "2px solid #bbb",
          backgroundClip: "content-box",
          appearance: "none",
        },
        "& input[type='radio']:checked": {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    "& .passwordNote": {
      "& p": {
        color: "red",
        marginBottom: 0,
        fontSize: 12,
        textAlign: "start",
      },
    },
  },
  supplierPhone: {
    "& .PhoneInput .PhoneInputCountry": {
      justifyContent: "center",
      padding: "5px",
      marginRight: "0px!important",
      "& .PhoneInputCountrySelect[disabled], .PhoneInputCountrySelect[readonly]":
        {
          cursor: "default",
        },
      "& .PhoneInputCountrySelect": {
        cursor: "pointer",
      },
    },
    "& .PhoneInputInput": {
      outline: "none",
      padding: "4px 8px !important",
      textAlign: "start",
      borderRadius: "3px",
      border: `1px solid ${theme.globals.colors.grayBorder}`,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      width: "100%",
      backgroundColor: theme.globals.colors.bgWhite,
      color: theme.globals.colors.black,
      position: "relative",
      direction: theme.direction === "rtl" ? "rtl" : "inherit",
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "none",

      "& .PhoneInputCountry .PhoneInputCountryIcon": {
        boxShadow: "none!important",
      },
      "& .PhoneInputCountry .PhoneInputCountryIcon .PhoneInputCountryIconImg": {
        height: "17px",
        width: "30px",
        color: theme.palette.primary.main,
      },
    },
  },
  passwordNote: {
    "& p": {
      color: "red",
      marginBottom: 0,
      fontSize: 12,
      textAlign: "start",
    },
  },
  errorNote: {
    "& p": {
      color: "red",
      marginBottom: 0,
      fontWeight: "600",
      textAlign: "start",
    },
  },
  messageInput: {
    width: "100%",
    "& .MuiInputBase-root": {
      width: "100%",
      border: `1px solid #ccc`,
      borderRadius: "5px",
      background: "inherit",
      padding: "8px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      "& textarea": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "& .MuiInput-underline:before, & .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      border: "none",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  blockCheckbox: {
    "& label": {
      display: "block!important",
    },
  },
  icon: {
    color: theme.globals.colors.pollInnerBox,
  },
  iconButton: {
    height: "35px",
    width: "35px",
    "& > img": {
      height: "100%",
    },
  },
  tabs: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButtonBase-root": {
      textTransform: "capitalize",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .Mui-selected": {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: 24,
    },
    "& .MuiTabs-indicator": {
      background: "none",
    },
  },
  detailsTabs: {
    "& .tabs span svg": { fontSize: "24px" },
  },
  check: {
    [theme.breakpoints.down(350)]: {
      display: "block",
    },
    "& .Mui-disabled": {
      backgroundColor: "inherit!important",
    },
    "& .MuiCheckbox-root .MuiIconButton-label .MuiSvgIcon-root": {
      color: theme.palette.secondary.main,
    },
    "& svg.MuiSvgIcon-root": {
      background: theme.globals.colors.pollOuterBox,
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "3px",
      width: "20px",
      height: "20px",
      "& path": {
        color: "transparent",
      },
    },
    "& span.Mui-checked span.MuiIconButton-label svg.MuiSvgIcon-root": {
      "& path": {
        color: theme.palette.secondary.main,
      },
    },
    "& label": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      minWidth: 138,
      fontWeight: "600",
      fontSize: theme.globals.fontSize.s - 2,
      color: theme.palette.primary.main,
      textTransform: "capitalize",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
  },
  controlLabel: {
    margin: "16px 0",
    "& .captch-div": { display: "flex" },
    "& > div > div > div > div > iframe": {
      [theme.breakpoints.down(370)]: {
        WebkitTransform: "scale(0.75) !important",
        WebkitTransformOrigin: "0 0 !important",
      },
    },
  },
  grayBtn: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 110,
    height: 34,
    padding: "0 16px",
    marginTop: "20px",
    backgroundColor: "#838383",
    textTransform: "capitalize",
    borderRadius: 5,
    overflow: "hidden",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      transition: "all 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      top: "50%",
      left: "0",
      right: "0",
      display: "flex",
      justifyContent: "center",
      margin: "0",
      padding: "0",
      listStyleType: "none",
      transform: "translateY(-175%)",
      width: "100%",
      "& svg": {
        fontSize: 26,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: "#fff",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: "#838383",
      },
    },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  send: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 110,
    height: 34,
    padding: "0 16px",
    marginTop: "20px",
    backgroundColor: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: 5,
    overflow: "hidden",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      transition: "all 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      top: "50%",
      left: "0",
      right: "0",
      display: "flex",
      justifyContent: "center",
      margin: "0",
      padding: "0",
      listStyleType: "none",
      transform: "translateY(-175%)",
      width: "100%",
      "& svg": {
        fontSize: 26,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: "#fff",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: theme.palette.primary.main,
      },
    },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },

  addBtn: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 85,
    padding: "0 16px",
    marginTop: "24px",
    backgroundColor: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: 5,
    overflow: "hidden",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      transition: "all 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      top: "50%",
      left: "0",
      right: "0",
      display: "flex",
      justifyContent: "center",
      margin: "0",
      padding: "0",
      listStyleType: "none",
      transform: "translateY(-175%)",
      width: "100%",
      "& svg": {
        fontSize: 26,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: "#fff",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: theme.palette.primary.main,
      },
    },
  },
  loginTypeBtn: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    width: "150px",
    padding: "5px",
    marginRight: theme.spacing(0.75),
    backgroundColor: theme.palette.primary.main,
    textTransform: "none",
    borderRadius: "5px",
    position: "relative",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "&:before": {
      position: "absolute",
      content: '""',
      borderStyle: "solid",
      borderWidth: "10px 10px 0 10px",

      borderColor: `${theme.palette.primary.main} transparent transparent transparent `,

      bottom: -10,
    },
    "&:hover": { backgroundColor: theme.palette.primary.main },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
      width: "100px",
    },
    "& > span > svg": {
      [theme.breakpoints.down(380)]: {
        display: "none",
      },
    },
  },
  loginTypeBtnOutlined: {
    fontSize: theme.globals.fontSize.s,
    color: theme.palette.primary.main,
    width: "150px",
    padding: "5px",
    marginRight: theme.spacing(0.75),
    backgroundColor: theme.globals.colors.white,
    border: `1px solid ${theme.palette.primary.main}`,
    textTransform: "none",
    borderRadius: "5px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
      width: "100px",
    },
    "& > span > svg": {
      [theme.breakpoints.down(380)]: {
        display: "none",
      },
    },
  },
  uaePassBtnBox: {
    "& .MuiBox-root": {
      [theme.breakpoints.down(600)]: {
        padding: "0px",
        maxWidth: "100%!important",
      },
    },
  },
  uaePassBtn: {
    border: "1px solid",
    padding: "6px",
    borderRadius: 3,
    boxShadow: "0 2px 5px 0 rgb(0 0 0 / 26%)",
    width: "86%",
    marginBottom: 8,
    color: theme.globals.colors.blackColor,
    textAlign: "center",
    fontWeight: "bold",
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
      width: "98%",
    },
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgb(0 0 0 / 40%)",
      WebkitTransform: "translate3d(0, -1px, 0)",
      transform: "translate3d(0, -1px, 0)",
    },
  },
  noBorder: {
    border: "none!important",
  },
  fullForm: {
    width: "100%",
    margin: theme.spacing(1.375, 0),
    paddingTop: theme.spacing(1),
    borderTop: `2px dashed ${theme.globals.colors.pollOuterBox}`,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "&  p.info": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: "#aaa",
      textAlign: "start",
    },
    "& .MuiTypography-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiFormControlLabel-root": { margin: 0 },
    "& .serviceFormIcon": {
      display: "flex",
      paddingRight: 0,
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      maxWidth: "140px",
    },
    // [theme.breakpoints.down(380)]: {
    //   width: "80%",
    // },
    "& .tabCon .MuiBox-root": {
      padding: 0,
      margin: "16px 8px",
    },
    "& .MuiPaper-rounded": {
      borderRadius: "15px",
    },
    "& .addNote": {
      margin: "24px 0px !important",
      border: "1px solid #eee",
      padding: " 16px !important",
      borderRadius: "15px",
      "& textarea": {
        width: "100%",
        borderRadius: "8px",
        border: " 1px solid #88b5ce",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontWeight: "bold",
        boxShadow: " 0px 0px 4px rgba(0, 0, 0, 0.25)",
        minHeight: "100px",
        color: "#666",
        padding: "8px",
        "&:focus-visible": { outline: "none" },
      },
      "& .addBtn": {
        backgroundColor: theme.palette.primary.main,
        color: "#fff",
      },
      "& .Mui-disabled": {
        backgroundColor: "rgba(0, 0, 0, 0.12)",
      },
    },
    "& .tables": {
      marginTop: "24px",
      "& .MuiTabs-root": {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
      },
      "& .MuiTab-root": {
        background: "#fff",
        margin: "0 8px",
        borderRadius: "10px  10px 0px 0px",
        fontWeight: "bold",
        textTransform: "none",
        fontSize: "16px",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,

        "&.Mui-selected": {
          border: `1px solid ${theme.palette.primary.main}`,
          borderBottom: "none",
          color: theme.palette.primary.main,
        },
      },
      "& .MuiTabs-indicator": { display: "none" },
      "& .MuiTable-root": {
        "& .MuiTableHead-root": {
          background: "#fff",
          "& .MuiTableCell-head": {
            fontWeight: "bold",
          },
        },
        "& .MuiTableCell-root": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
    },
  },
  closeButton: {
    backgroundColor: `${theme.palette.primary.main}!important`,
    color: "#fff",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  signUpForm: {
    [theme.breakpoints.down(380)]: {
      width: "100%!imporant",
    },
  },
  requestListRoot: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "32px",
    paddingTop: "8px",
    marginRight: "auto",
    marginLeft: "auto",
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: theme.palette.primary.main,
      fontSize: theme.globals.fontSize.s,
      [theme.breakpoints.down(500)]: {
        fontSize: theme.globals.fontSize.s - 1,
      },
    },
    [theme.breakpoints.down(600)]: {
      paddingLeft: "0px",
    },
  },
  searchBox: {
    padding: "16px",
    background: "#fff",
    boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
    borderRadius: 5,
    marginBottom: 16,
    width: "100%",
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& .MuiFormControl-root .MuiInput-underline:before": {
      borderBottom: `1px solid ${theme.globals.colors.bgGray}`,
    },
  },
  requestDetailsRoot: {
    "& .head": {
      background: "#ffff",
      boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
      borderRadius: "20px",
      position: "relative",
      "& .headContainer": {
        padding: 16,
        "& p": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
        "& .MuiSvgIcon-root": {
          margin: "8px 12px",
          color: theme.palette.primary.main,
        },
      },
    },
    "& .body": {
      background: "#fff",
      borderRadius: "20px",
      marginTop: "16px",
      boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
      "& .bodyContainer": {
        padding: 16,
        flexDirection: "column",
        "& p": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
        },
      },
    },
    "& .label": { padding: "0 8px", fontWeight: "600 !important" },
    "& .label2": { padding: "8px", fontWeight: "600 !important" },
  },
  activities: {
    border: `1px solid ${theme.globals.colors.pollOuterBox}`,
    borderRadius: "5px",
    padding: "10px",
    "& input": {
      border: `1px solid ${theme.globals.colors.textLight}`,
      borderRadius: "5px",
      margin: "4px 0",
      width: "100%",
      padding: "8px",
      "&:focus-visible": { outline: "none" },
    },
    "& .delete": {
      backgroundColor: "transparent",
      border: "none",
      color: theme.palette.primary.main,
    },
    "& .addActivity": {
      border: "none",
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      padding: "4px 10px",
      borderRadius: " 5px",
      margin: "8px 0",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  divider: {
    height: " 60px",
    display: "flex",
    alignItems: "center",
    borderTop: `2px dashed ${theme.globals.colors.pollOuterBox}`,
    width: "100%",
    marginTop: "24px",
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: "#aaa",
    },
  },
  divider2: {
    borderTop: `2px dashed ${theme.globals.colors.pollOuterBox}`,
    width: "100%",
    margin: "24px 0px",
  },
  reverse: {
    [theme.breakpoints.down(960)]: {
      flexDirection: "column-reverse",
    },
  },
  serviceDetailsRoot: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
    display: "flex",
    backgroundColor: " #fff",
    padding: "16px",
    boxShadow: " 0px 4px 20px rgb(0 0 0 / 10%)",
    borderRadius: "15px",
    marginBottom: "50px",
    [theme.breakpoints.down(960)]: {
      flexDirection: "column",
    },
    "& .MuiAccordion-rounded": {
      margin: "16px 0",
      boxShadow: "none",
      backgroundColor: "transparent",
      "& .MuiAccordionSummary-root": {
        minHeight: "64px",
        borderRadius: "5px",
        border: "1px solid #E4E4E4",

        "& .MuiAccordionSummary-expandIcon": {
          marginRight: 0,
          color: theme.palette.primary.main,
        },
      },
      "& .MuiAccordionSummary-root.Mui-expanded": {
        backgroundColor: theme.palette.type === "dark" ? "#000" : "#E4E4E4",
        borderRadius: "5px",
        "& .MuiTypography-body1": {
          color: theme.palette.secondary.main,
        },
        "& .MuiAccordionSummary-expandIcon": {
          color: theme.palette.secondary.main,
        },
      },
      "& .MuiAccordionSummary-root .MuiTypography-body1": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
      "& .MuiAccordionDetails-root  .MuiTypography-body1": {
        color: theme.palette.primary.main,
      },
    },
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textAlign: "start",
    },
    "& span": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.xs,
    },
    "& a": {
      color: theme.palette.secondary.main,
    },
    "& .attachLink": {
      padding: "8px",
      margin: "4px",
      borderRadius: "5px",
      border: "1px solid #eee",
      "&:hover": {
        backgroundColor: "#eee",
      },
    },
  },
  serviceHeader: {
    [theme.breakpoints.down(500)]: {
      display: "block",
    },
  },
  serviceHeaderCards: {
    position: "relative",
    paddingLeft: 10,
    paddingRight: 20,
    [theme.breakpoints.down(600)]: {
      marginBottom: 16,
    },
    "&:after": {
      top: "14px",
      left: "-5px",
      bottom: "12px",
      content: '" "',
      borderLeft: "1px solid #CFCFCF",
      position: "absolute",
    },
  },
  rightBorderBox: {
    position: "relative",
    "&:after": {
      top: "14px !important",
      left: "-5px !important",
      bottom: "12px !important",
      content: '" "',
      borderLeft: "1px solid #CFCFCF !important",
      position: "absolute !important",
    },
    [theme.breakpoints.down(960)]: {
      display: "none",
    },
  },
  rightBorder: {
    position: "relative",
    "&:after": {
      top: "14px !important",
      left: "-5px !important",
      bottom: "12px !important",
      content: '" "',
      borderLeft: "1px solid #CFCFCF !important",
      position: "absolute !important",
      [theme.breakpoints.down(960)]: {
        bottom: "6px !important",
      },
    },
  },
  sideMenuCard: {
    [theme.breakpoints.down(960)]: {
      maxWidth: "24%!important",
      flexBasis: "24%!important",
    },
    [theme.breakpoints.down(650)]: {
      maxWidth: "100%!important",
      flexBasis: "100%!important",
    },
  },

  lessWidth: {
    maxWidth: "31%",
    flexBasis: "31%",
    marginLeft: 17,
    borderRadius: 15,
    [theme.breakpoints.down(960)]: {
      maxWidth: "100%",
      flexBasis: "100%",
      marginLeft: 0,
    },
    "& .MuiPaper-root": {
      backgroundColor: "none!important",
    },
  },

  rating: {
    display: "flex",
    justifyContent: "flex-start",
  },

  cardsTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "#444444",
    fontSize: theme.globals.fontSize.s,
    fontWeight: 700,
    textAlign: "start",
  },
  flex: {
    display: "flex",
  },
  flexBox: {
    display: "flex",
    [theme.breakpoints.down(690)]: {
      display: "block",
    },
  },
  cardsSubTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.xs,
    fontWeight: 400,
    color: "#161616",
    textAlign: "start",
  },
  paddingTop8: {
    paddingTop: "8px",
  },
  marginLeft12: {
    marginLeft: "-12px",
  },
  block: {
    display: "block",
  },
  gold: { color: theme.palette.secondary.main },
  cards: {
    paddingRight: 25,
    paddingLeft: 25,
    padding: "15px",
    position: "relative",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down(960)]: {
      display: "flex!important",
      padding: "16px 8px !important",
      marginBottom: 16,
    },
  },
  leftServiceBtn: {
    [theme.breakpoints.down(960)]: {
      display: "none",
    },
    [theme.breakpoints.down(650)]: {
      display: "flex",
    },
  },
  rightServiceBtn: {
    display: "none",
    [theme.breakpoints.down(960)]: {
      display: "block",
    },
    [theme.breakpoints.down(650)]: {
      display: "none",
    },
  },
  maxHeight24: {
    [theme.breakpoints.between(500, 635)]: {
      maxHeight: 24,
    },
  },
  centered: {
    [theme.breakpoints.down(650)]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  RightQrCode: {
    justifyContent: "center",
    display: "flex",
    marginTop: 25,
    width: "100%",
    marginBottom: 30,
    position: "relative",
    display: "none",
    [theme.breakpoints.down(960)]: {
      position: "absolute",
      right: theme.direction === "rtl" ? "13%" : "1%",
      top: 40,
      display: "block",
    },
    [theme.breakpoints.down(925)]: {
      right: theme.direction === "rtl" ? "11%" : "1%",
    },
    [theme.breakpoints.down(790)]: {
      right: theme.direction === "rtl" ? "9%" : "1%",
    },
    [theme.breakpoints.down(745)]: {
      right: theme.direction === "rtl" ? "7%" : "1%",
    },
    [theme.breakpoints.down(665)]: {
      right: theme.direction === "rtl" ? "5%" : "1%",
    },
    [theme.breakpoints.down(650)]: {
      display: "none",
    },
    "& > img": {
      width: "100px",
      height: "100px",
      [theme.breakpoints.down(645)]: {
        width: "80px",
        height: "80px",
      },
    },
  },
  qrCode: {
    justifyContent: "center",
    display: "flex",
    marginTop: 25,
    width: "100%",
    marginBottom: 30,
    position: "relative",
    [theme.breakpoints.down(960)]: {
      display: "none",
    },
    [theme.breakpoints.down(500)]: {
      display: "flex",
    },
    "& > img": {
      width: "100px",
      height: "100px",
      [theme.breakpoints.down(960)]: {
        width: "80px",
        height: "80px",
      },
      [theme.breakpoints.down(500)]: {
        width: "100px",
        height: "100px",
      },
    },
  },
  button: {
    color: "white",
    display: "flex",
    width: 192,
    height: 36,
    borderRadius: 9,
    backgroundColor: "rgba(255,255,255,0.23)",
    marginLeft: 8,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.xs + 2,
    [theme.breakpoints.down(960)]: {
      width: 135,
    },
    [theme.breakpoints.down(905)]: {
      fontSize: theme.globals.fontSize.xs - 1,
    },
    [theme.breakpoints.down(735)]: {
      marginLeft: 8,
    },
    [theme.breakpoints.down(655)]: {
      marginLeft: -2,
    },
    [theme.breakpoints.down(625)]: {
      marginLeft: -16,
    },
    [theme.breakpoints.down(550)]: {
      marginLeft: -27,
    },
    [theme.breakpoints.down(500)]: {
      marginLeft: 8,
      width: 192,
    },
  },
  sideBarTitle: {
    marginBottom: "10px",
    fontSize: 14,
    color: "#9F9F9F",
    textAlign: "start",
    [theme.breakpoints.down(750)]: {
      fontSize: 12,
    },
    [theme.breakpoints.down(650)]: {
      fontSize: 14,
    },
    [theme.breakpoints.down(400)]: {
      fontSize: 12,
    },
  },
  sideBarBody: {
    color: "white!important",
    fontSize: theme.globals.fontSize.s,
    fontWeight: 600,
    width: "92%",
    maxWidth: "92%",
    wordBreak: "break-word",
    textAlign: "start",
    [theme.breakpoints.down(960)]: {
      fontSize: theme.globals.fontSize.xs,
    },
    [theme.breakpoints.down(775)]: {
      fontWeight: 400,
    },
    [theme.breakpoints.down(750)]: {
      fontSize: theme.globals.fontSize.xs - 1,
    },
    [theme.breakpoints.down(650)]: {
      fontWeight: 400,
      fontSize: theme.globals.fontSize.xs,
    },
    [theme.breakpoints.down(450)]: {
      fontSize: theme.globals.fontSize.xs - 1,
    },
  },
  sideBarParagraph: {
    marginBottom: 20,
    borderBottom: "1px dashed #7F7F7F",
    borderWidth: 2,
    paddingBottom: "8px",
    [theme.breakpoints.down(960)]: {
      borderBottom: "none",
    },
    [theme.breakpoints.down(650)]: {
      borderBottom: "1px dashed #7F7F7F",
    },
  },
  edges: {
    position: "relative",

    "&:before , &:after": {
      content: '""',
      position: "absolute",
      width: 18,
      height: 18,
      top: -28,
      borderRadius: "50%",
      backgroundColor: "white",
      [theme.breakpoints.down(960)]: {
        display: "none",
      },
      [theme.breakpoints.down(650)]: {
        display: "block",
      },
    },
    "&:before ": {
      left: -33,
      [theme.breakpoints.down(650)]: {
        left: -18,
      },
    },
    " &:after": {
      right: -33,
      [theme.breakpoints.down(650)]: {
        right: -18,
      },
    },
  },
  link: {
    textAlign: "start",
    color: "white!important",
    textDecoration: "underline",
    fontSize: 14,
    fontWeight: 600,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(960)]: {
      fontSize: theme.globals.fontSize.xs,
    },

    [theme.breakpoints.down(750)]: {
      fontWeight: 400,
      fontSize: theme.globals.fontSize.xs - 1,
    },
    [theme.breakpoints.down(650)]: {
      fontWeight: 400,
      fontSize: theme.globals.fontSize.xs,
    },
    [theme.breakpoints.down(450)]: {
      fontSize: theme.globals.fontSize.xs - 1,
    },
  },
  noBottomBorder: {
    borderBottom: "none!important",
  },
  marginLeft11: {
    marginLeft: "-11px",
    [theme.breakpoints.down(960)]: {
      marginLeft: "17px",
    },
    [theme.breakpoints.down(650)]: {
      marginLeft: "-11px",
    },
  },
  pdfRead: {
    margin: "16px 0",
    width: "max-content",
    backgroundColor: "#fff",
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "&:hover": { backgroundColor: theme.palette.primary.main, color: "#fff" },
  },
  inputfeedback: {
    textAlign: "start",
    color: "red",
    fontSize: " 12px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  menuItems: {
    display: "flex",
    justifyContent: theme.direction === "rtl" ? "flex-end" : "",
  },
  accordionStep: {
    boxShadow: "none",
    marginBottom: "10px!important",
    borderRadius: "6px!important",
    border: `1px solid ${theme.globals.colors.pollOuterBox}`,
    "& .MuiAccordionDetails-root": {
      borderTop: `1px solid ${theme.globals.colors.pollOuterBox}`,
      paddingTop: theme.spacing(2),
      "& .Mui-disabled": {
        "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #f1f1f1" },
      },
      "& .Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": { borderWidth: 1 },
      },
    },
    "& .MuiAccordionSummary-content": {
      "& p": {
        textAlign: "start",
        color: theme.globals.colors.textMed,
        fontSize: theme.globals.fontSize.s,
        fontWeight: "600",
        textTransform: "capitalize",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        [theme.breakpoints.down(600)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
      },
    },
  },
  infoBox: {
    borderTop: `1px solid ${theme.globals.colors.pollOuterBox}`,
    paddingTop: theme.spacing(2),
  },
  heading: {
    fontWeight: "500",
    fontSize: theme.globals.fontSize.s - 1,
    marginBottom: theme.spacing(2),
    position: "relative",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 3,
    },
    "&:before": {
      position: "absolute",
      content: '""',
      width: 35,
      height: 2,
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
    },
  },
  table: {
    marginBottom: theme.spacing(2),
    "& .MuiTable-root .MuiTableHead-root": {
      backgroundColor: "#EAEAEA",
      "& .MuiTableRow-root .MuiTableCell-root .MuiButtonBase-root": {
        fontWeight: 600,
        color: theme.palette.secondary.main,
      },
    },
    "& .MuiTable-root .MuiTableBody-root .MuiTableRow-root .MuiTableCell-root":
      {
        color: theme.palette.secondary.main,
      },
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiTableCell-head": {
      color: theme.palette.secondary.main,
      padding: theme.spacing(2),
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(2, 1),
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      minWidth: "150px",
    },
  },
  paymentTable: {
    marginTop: theme.spacing(3),
    "& .MuiTableCell-head": {
      color: theme.palette.secondary.main,
      padding: theme.spacing(2, 0),
      fontWeight: 600,
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(2, 0),
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiTableRow-root:last-child": {
      "& .MuiTableCell-body": {
        fontWeight: 600,
      },
    },
  },
  receiptLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  logoImg: { width: "75px" },
  note: {
    color: theme.palette.info.main,
    textAlign: "start",
    // padding: theme.spacing(1.25),
    marginBottom: theme.spacing(2),
    borderRadius: 10,
    position: "relative",
    "& svg": {
      fontSize: 32,
    },
  },
  address: {
    color: theme.globals.colors.pollInnerBox,
    fontSize: theme.globals.fontSize.s + 2,
    marginRight: theme.spacing(1),
  },
  serviceCards: {
    padding: 16,
    [theme.breakpoints.down(768)]: {
      padding: 0,
    },
    "& .MuiAccordion-root:before": { display: "none" },
    "& .MuiAccordion-rounded": {
      margin: "16px 0",
      boxShadow: "none",
      "& .MuiAccordionSummary-root": {
        minHeight: "64px",
        borderRadius: "5px",
        border: "1px solid #E4E4E4",
        [theme.breakpoints.down(768)]: {
          minHeight: "50px",
        },
        "& .MuiAccordionSummary-expandIcon": {
          marginRight: 0,
          color: theme.palette.primary.main,
        },
      },
      "& .MuiAccordionSummary-root.Mui-expanded": {
        backgroundColor: "#E4E4E4",
        borderRadius: "5px",
        "& .MuiTypography-body1": {
          color: theme.palette.secondary.main,
        },
        "& .MuiAccordionSummary-expandIcon": {
          color: theme.palette.secondary.main,
        },
        "& .MuiAccordionSummary-content.Mui-expanded": {
          margin: "12px 0",
        },
      },
      "& .MuiAccordionSummary-root .MuiTypography-body1": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color: theme.palette.primary.main,
        fontWeight: 600,
        textAlign: "start",
        [theme.breakpoints.down(768)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
      },
      "& .MuiAccordionDetails-root": {
        backgroundColor: " #fafafa !important",
        "& .MuiTypography-body1": {
          color: theme.palette.primary.main,
        },
      },
    },
    "& .noResults": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: theme.globals.fontSize.s,
      color: theme.palette.primary.main,
      marginTop: "15px",
      marginBottom: "15px",
    },
  },
  filterBtn: {
    textTransform: "capitalize",
    borderRadius: 18,
    margin: "24px 8px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    minWidth: "fit-content",
  },
  channels: {
    "& svg": {
      fontSize: "32px",
      color: "#c7c7c7",
      // margin: "0 8px",
    },
  },
  signUp: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& a": { color: theme.palette.primary.main, fontWeight: 600 },
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s - 2,
    },
  },
  logoTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  receiptLoc: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.palette.primary.main,
    textAlign: "start",
  },
  orderDetails: {
    backgroundColor: "#fafafa",
    padding: "16px",
    borderRadius: "15px",
    "& p": {
      color: "#555",
    },
  },
  loginRoot: {
    width: "50%",
    margin: "auto",
    position: "absolute",
    top: "0",
    bottom: "0",
    height: "fit-content",
    left: theme.direction === "rtl" ? "unset" : "10%",
    right: theme.direction === "rtl" ? "10%" : "unset",
    [theme.breakpoints.down(1375)]: {
      width: "65%",
    },
    [theme.breakpoints.down(1125)]: {
      width: "75%",
    },

    [theme.breakpoints.down(960)]: {
      width: "80%",
      padding: "24px",
      left: "unset",
      right: "unset",
      marginBottom: 10,
      position: "relative",
      marginTop: 10,
    },

    [theme.breakpoints.down(445)]: {
      width: "92%",
    },
  },
  profileRoot: {
    "& .sectionTitle": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.m - 2,
      color: theme.palette.primary.main,
      fontWeight: "700",
      paddingBottom: theme.spacing(1),
      borderBottom: `3px dashed ${theme.globals.colors.pollOuterBox}`,
      marginTop: theme.spacing(3),
      textAlign: "start",
    },
    "& .companyInfo": {
      display: "flex",
      "& .label1": {
        position: "relative",
        fontWeight: 600,
        fontSize: theme.globals.fontSize.s - 1,
        color: theme.palette.primary.main,
        textAlign: "start",
        "&:before": {
          position: "absolute",
          content: '""',
          width: 35,
          height: 2,
          bottom: 0,
          backgroundColor: theme.globals.colors.pollInnerBox,
        },
      },
      "& .label2": {
        paddingLeft: theme.spacing(2),
        fontSize: theme.globals.fontSize.s - 1,
        color: theme.palette.primary.main,
        textAlign: "start",
      },
    },
    "& .label3": {
      fontSize: theme.globals.fontSize.s - 1,
      color: theme.palette.primary.main,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textAlign: "start",
    },
    "& .textField2": {
      width: "100%",
      "&  .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
        // border: " 1px solid rgb(0 0 0 / 23%)",
      },
      "&:hover": {
        "&  .MuiOutlinedInput-notchedOutline": {
          borderColor: "#ccc",
          borderWidth: 1,
        },
      },
      "&  .MuiOutlinedInput-input , .MuiInput-input": {
        borderRadius: "5px",
        padding: "8px !important",
        textAlign: "start",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiInput-underline:before, & .MuiInput-underline:after": {
        border: "none",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        border: "none",
      },

      "& p.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error": {
        marginLeft: "0",
        fontSize: theme.globals.fontSize.xs,
        color: "red",
        marginTop: "4px",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiInputBase-input.Mui-disabled": {
        backgroundColor: `${theme.globals.colors.bgGray}!important`,
      },
      "& .MuiAutocomplete-inputRoot": {
        padding: "0px !important",
      },
      "& .MuiAutocomplete-tag": {
        height: "25px",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiInputBase-root": {
        padding: 0,
      },
    },
    "& .radioButtons": {
      [theme.breakpoints.down(600)]: {
        display: "block",
      },
      "& label": {
        minWidth: 150,
        display: "flex",
        alignItems: "center",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        [theme.breakpoints.down(600)]: {
          fontSize: theme.globals.fontSize.s - 2,
        },
        "& input[type='radio']": {
          width: "15px",
          height: "15px",
          borderRadius: "15px",
          left: "2px",
          position: "relative",
          marginRight: 12,
          border: "2px solid #bbb",
          backgroundClip: "content-box",
          appearance: "none",
        },
        "& input[type='radio']:checked": {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
  },
  replyDialog: {
    "& .MuiDialogTitle-root": { borderBottom: `2px dashed #e5e5e5` },
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textAlign: "start",
    },
    "& .label1": { color: "#fcc100 " },
    "& .tableBox": {
      borderTop: `2px dashed #e5e5e5`,
      marginTop: "24px",
      "& .MuiTableHead-root": { backgroundColor: "#eee" },
      "& .MuiTableCell-root": { padding: "16px" },
    },
    "& .modalButton , & .MuiAlert-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  dialog: {
    "& .MuiDialogTitle-root": {
      borderBottom: "2px dashed #eee",
      "& h2": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        textAlign: "center",
      },
    },
    "& .MuiDialogContentText-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-label": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  seeManage: {
    "& p": {
      color: "rgba(255, 255, 255, 0.87)",
      backgroundColor: "#f44455",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      borderRadius: "3px",
      textAlign: "center",
      padding: "4px 0",
      width: "100%",
    },
  },
  menuItem: {
    fontFamily: `${
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en
    } !important`,
    textAlign: "start",
    whiteSpace: "unset",
  },
  uaeLogin: {
    flex: "1 1 auto",
    background: theme.palette.primary.main,
  },
  checkUndertraking: {
    margin: "16px 0",
    "& label": {
      display: "flex",
      alignItems: "start",

      [theme.breakpoints.down(600)]: {
        fontSize: theme.globals.fontSize.xs,
      },
    },
  },
  popoverContent: {
    textAlign: "start",
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.s - 2,
    },
    "& .popoverContentTitle": {
      position: "relative",
      marginBottom: "8px",
      fontSize: theme.globals.fontSize.s,
      "&:before": {
        position: "absolute",
        content: '""',
        width: 35,
        height: 2,
        bottom: 0,
        backgroundColor: "#B2C900",
      },
    },
    "& .popoverContentList": {
      borderBottom: "2px dashed #eee",
      marginBottom: "8px",
    },
    "& .popoverContentSub": {
      fontWeight: "bold",
      marginBottom: "8px",
    },
  },
  checkoutDetails: {
    padding: "16px 32px",
    width: "95%",
    marginLeft: "auto",
    background: "#ffffff",
    boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
    flexBasis: "unset",
    borderRadius: "15px",
    "& .dialogHead": {
      alignItems: "center",
      justifyContent: "space-around",
      padding: "16px 0",
      borderBottom: "2px dashed #eee",
      "& p": {
        color: "#fcc100",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& img": { width: "50px" },
    },
    "& .dialogRow": {
      padding: "8px 0",
      "& p": {
        textAlign: "center",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .dialogRowTitle": {
        textAlign: "start !important",
      },
      "& .popupIcon": {
        backgroundColor: "#eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        width: "30px",
        height: "30px",
        margin: "0 8px",
      },
    },
    "& button": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      margin: "16px auto",
    },
  },
  uaepassRegister: {
    background: theme.globals.colors.white,
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: "24px 32px",
    width: "75%",
    margin: "auto",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
    "& .serviceTitle": {
      borderBottom: "2px dashed rgba(68, 68, 68, 0.14)",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.m,
      color: theme.palette.primary.main,
      fontWeight: "700",
      textAlign: "start",
      paddingBottom: theme.spacing(1),
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down(600)]: {
        fontSize: theme.globals.fontSize.m - 2,
      },
      [theme.breakpoints.down(500)]: {
        fontSize: theme.globals.fontSize.s,
      },
    },
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .chooseBtn": {
      color: "white",
      borderRadius: 5,
      border: `1px solid ${theme.palette.primary.main}`,

      backgroundColor: theme.palette.primary.main,
      marginTop: 24,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.xs + 2,
      textTransform: "none",
      "&:hover": {
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: "#fff",
      },
    },
    "& .newBtn": {
      color: theme.palette.primary.main,
      borderRadius: 5,
      border: `1px solid ${theme.palette.primary.main}`,
      backgroundColor: "#fff",
      marginTop: 24,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.xs + 2,
      "&:hover": {
        color: "white",
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  alertMsg: {
    padding: "8px",
    textAlign: "start",
    backgroundColor: "#ff7e7e24",
    color: "#b60000",
    border: "1px solid #b6000059",
    borderRadius: "5px",
    marginBottom: "16px",
  },

  marginRight45: {
    "& > div > div > div > div > iframe": {
      [theme.breakpoints.down(370)]: {
        marginLeft: theme.direction === "rtl" ? "-75px" : "-45px",
      },
    },
  },
  notifiTitle: {
    color: "#263661",
    fontWeight: 600,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
    fontSize: theme.globals.fontSize.xs + 2,
  },
  notifiDesc: {
    display: "-webkit-box",
    overflow: "hidden",
    textAlign: "start",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "3",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.xs + 2,
  },
}));

export default useStyles;
