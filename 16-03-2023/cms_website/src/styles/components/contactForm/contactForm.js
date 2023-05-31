import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "start",
    width: "100%",
    "& div.upperContainer": {
      display: "flex",
      justifyContent: "flex-end",
      [theme.breakpoints.down(500)]: {
        justifyContent: "flex-start",
      },
    },

    "& div.third": {
      marginBottom: "93px",
    },

    "& .MuiFormGroup-row > .MuiFormControlLabel-root > .MuiTypography-body1": {
      fontSize: theme.globals.fontSize.xs + 2,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: theme.palette.primary.main,
      fontWeight: "600",
    },
    "& .MuiFormGroup-row > .MuiFormControlLabel-root > .MuiCheckbox-root .MuiIconButton-label .MuiSvgIcon-root":
      {
        color: theme.palette.secondary.main,
      },
    "& .MuiGrid-root .captch-div": {
      display: "flex",
      width: "250px",

      "& button": {
        margin: 0,
        background: theme.globals.colors.secondaryDark,
      },
    },

    "& .MuiGrid-root .captch-div canvas": {
      borderRadius: "5px 0 0 5px",
      width: "220px",
      height: "34px",
    },

    "& .MuiGrid-root .MuiInput-underline:before": {
      borderBottom: "none",
    },

    "& #dataFormat, & #response": {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",

      [theme.breakpoints.down(750)]: {
        flexWrap: "wrap",
      },

      "& label": {
        width: "50%",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize:
          theme.direction === "rtl"
            ? theme.globals.fontSize.s - 1
            : theme.globals.fontSize.s - 2,
        lineHeight: "19px",
        color: theme.palette.primary.main,
        textTransform: "capitalize",

        [theme.breakpoints.down(750)]: {
          width: "100%",
        },

        "& span.MuiCheckbox-root": {
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
        },

        "& span.MuiRadio-root": {
          "& svg.MuiSvgIcon-root": {
            background: theme.globals.colors.pollOuterBox,
            border: `1px solid ${theme.palette.secondary.main}`,
            borderRadius: "20px",
            width: "20px",
            height: "20px",

            "& path": {
              color: "transparent",
            },
          },
        },

        "& span.Mui-checked span.MuiIconButton-label svg.MuiSvgIcon-root": {
          "& path": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },

    "& #response": {
      width: "75%",
      justifyContent: "space-between",
      [theme.breakpoints.down(960)]: {
        width: "50%",
      },
      [theme.breakpoints.down(600)]: {
        width: "100%",
      },
    },

    "& div.btnContainer": {
      "& button": {
        height: 42,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        textTransform: "capitalize",
        justifyContent: "center",
        alignItems: "center",
        color: theme.palette.secondary.main,
        border: "1px solid",
        display: "flex",

        minWidth: 80,
        position: "relative",
        "&:hover": {
          backgroundImage: "url(/assets/images/home/btn.png)",
          color: "white",
        },
        "& .MuiButton-label": {
          width: "auto",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s - 2,
        },
      },
    },

    "& p.errorMess": {
      color: "red",
      height: "20px",
      marginTop: "10px",
    },
  },
  cardContainer: {
    [theme.breakpoints.down(600)]: {
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
  },
  captcha: {
    "& > div > div > div > div > iframe": {
      position: "inherit",
      [theme.breakpoints.down(450)]: {
        WebkitTransform: "scale(0.85) !important",
        WebkitTransformOrigin: "0 0 !important",
        left: theme.direction === "rtl" ? "-40px" : "0px",
        position: "relative",
      },
      [theme.breakpoints.down(405)]: {
        WebkitTransform: "scale(0.70) !important",
        WebkitTransformOrigin: "0 0 !important",
        left: theme.direction === "rtl" ? "-85px" : "0px",
      },
      [theme.breakpoints.down(345)]: {
        WebkitTransform: "scale(0.60) !important",
        WebkitTransformOrigin: "0 0 !important",
        left: theme.direction === "rtl" ? "-118px" : "0px",
      },
    },
  },
  fullRow: {
    [theme.breakpoints.down(1100)]: {
      maxWidth: "100%",
      flexBasis: "100%",
    },
  },
  inputfeedback: {
    color: "red",
    fontSize: " 12px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  fullForm: {
    width: "100%",
  },

  header: {
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.s + 4,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: "600",
    textTransform: "capitalize",
    [theme.breakpoints.down(600)]: {
      fontSize: theme.globals.fontSize.s,
    },
  },

  warnText: {
    color: theme.palette.primary.main,
    fontSize:
      theme.direction === "rtl"
        ? theme.globals.fontSize.s
        : theme.globals.fontSize.s,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: 600,
    marginTop: 12,
  },

  label: {
    fontWeight: "600",
    lineHeight: "19px",
    fontSize:
      theme.direction === "rtl"
        ? theme.globals.fontSize.s
        : theme.globals.fontSize.xs + 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.palette.primary.main,
  },

  textField: {
    width: "100%",
    "&  .MuiOutlinedInput-input": {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "5px",
      padding: "6px 22px 7px 22px",
      borderLeft: "5px solid #263661",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& :-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 30px white inset !important",
      WebkitTextFillColor: "#000!important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.secondary.main,
    },

    "& p.MuiFormHelperText-root.MuiFormHelperText-contained.Mui-error": {
      marginLeft: "0",
      fontSize: theme.globals.fontSize.xs - 1,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      color: "red",
      height: "27px",
    },
  },

  captchInput: {
    width: "250px",
  },
  smallContainer: {
    height: "70px",
    [theme.breakpoints.down(960)]: {
      height: "80px",
    },
    [theme.breakpoints.down(600)]: {
      height: "37px",
    },
  },
  container: {
    height: "70px",
    [theme.breakpoints.down(960)]: {
      height: "80px",
    },
  },

  select: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "5px",
    width: "100%",
    textAlign: "start",
    borderLeft: "5px solid #263661",
    "& div.MuiSelect-root": {
      paddingLeft: "24px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  messageInput: {
    width: "100%",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "5px",
    background: "inherit",
    "& textarea": {
      padding: "10px 10px 10px 20px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  controlLabel: {
    marginTop: "50px",
    marginBottom: "10px",
  },

  down5: {
    marginTop: "15px",
    marginBottom: "50px",
  },

  send: {
    fontSize: theme.globals.fontSize.m,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.globals.colors.white,
    width: "150px",
    padding: "5px",
    marginTop: "20px",
    // backgroundColor: theme.palette.secondary.main,
    textTransform: "none",
  },

  map: {
    width: "100%",
    height: "300px",
    filter: "drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.2))",
    borderRadius: "10px",
  },

  box: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "10px",
    width: "60%",
    paddingTop: "30px",
    paddingBottom: "20px",
    [theme.breakpoints.down(600)]: {
      display: "none!important",
    },
  },

  iconColor: {
    color: theme.palette.secondary.main,
  },
  marginTop50: {
    marginTop: "50px",
  },
  bgContainer: {
    backgroundColor: theme.globals.colors.bgWhite,
    borderRadius: "10px",
    position: "relative",
    padding: "25px",
    boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
    margin: "15px",
    [theme.breakpoints.down(600)]: {
      margin: "16px 0px",
    },
  },
  tabs: {
    minWidth: 100,
    "& .MuiBox-root .MuiBox-root": {
      [theme.breakpoints.down(600)]: {
        padding: 0,
      },
      "& .MuiTabs-root .Mui-disabled": {
        [theme.breakpoints.down(600)]: {
          display: "none",
        },
      },
    },
    "& .MuiTabs-root": {
      marginBottom: 15,
    },

    "& .Mui-selected": {
      "& .MuiTab-wrapper": {
        fontSize: theme.globals.fontSize.s - 4,
        textTransform: "capitalize",
        border: "1px solid #3B4A72",
        padding: "5px",
        borderRadius: "23px",
        width: "100px",
        [theme.breakpoints.down(420)]: {
          width: "80px",
        },
      },
    },
    "& .MuiTab-wrapper": {
      fontSize: theme.globals.fontSize.s - 4,
      textTransform: "capitalize",
      color: " #263661",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },

    "& .MuiTabs-indicator": {
      backgroundColor: "white",
    },

    "& p": {
      color:
        theme.palette.type === "dark"
          ? theme.palette.textMed.main
          : theme.globals.colors.white,
    },
  },
  titleText: {
    display: "flex",
    // [theme.breakpoints.down(1100)]: {
    //   display: "block",
    // },
    "& > .MuiBox-root": {
      "& p": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontSize: theme.globals.fontSize.m + 156,
        color: "#263661",
        lineHeight: 1.1,
        [theme.breakpoints.down(380)]: {
          fontSize: theme.globals.fontSize.m + 60,
        },
      },
    },
  },
  secondText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 16px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& p:first-child": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.lg * 2,
      fontWeight: "700",
      marginBottom: theme.direction === "rtl" ? 8 : 0,
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      textAlign: "justify",
      "@media only screen and (max-device-width:1000px) and (max-device-height: 1500px)":
        {
          fontSize: theme.globals.fontSize.lg + 4,
        },
      "@media only screen and (max-device-width:1500px) and (max-device-height: 1000px)":
        {
          fontSize: theme.globals.fontSize.lg + 4,
        },
      [theme.breakpoints.down(695)]: {
        fontSize: theme.globals.fontSize.lg + 4,
      },
    },
    "& p:last-child": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.globals.fontSize.s + 2,
      fontWeight: "700",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      "@media only screen and (max-device-width:1000px) and (max-device-height: 1500px)":
        {
          fontSize: theme.globals.fontSize.s,
        },
      "@media only screen and (max-device-width:1500px) and (max-device-height: 1000px)":
        {
          fontSize: theme.globals.fontSize.s,
        },
      [theme.breakpoints.down(695)]: {
        fontSize: theme.globals.fontSize.s,
        fontWeight: "400",
      },
    },
  },
  media: {
    backgroundSize: "contain",
    width: "27px",
    height: "24px",
    backgroundSize: "contain !important",
    margin: "15px 0px 0px 1px",
  },
  social: {
    width: "140px",
    margin: "10px",
    height: "100px",
    boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
    [theme.breakpoints.between(1099, 1200)]: {
      width: "115px",
    },
    [theme.breakpoints.down(330)]: {
      width: "130px",
    },
    "& .MuiCardContent-root": {
      "&  .MuiTypography-gutterBottom": {
        fontSize: theme.globals.fontSize.xs,
        fontWeight: 600,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color: "#263661",
      },
    },

    "& .MuiCardActionArea-root": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      height: "100%",
      background: theme.globals.colors.white,
      "& .MuiCardContent-root": {
        padding: "16px 2px",
      },
    },
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    [theme.breakpoints.down(600)]: {
      display: "block",
    },
  },
  section: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down(1100)]: {
      maxWidth: "100%",
      flexBasis: "100%",
    },
    [theme.breakpoints.down(600)]: {
      marginBottom: "16px",
    },
  },
  allSections: {
    margin: 30,
    [theme.breakpoints.down(500)]: {
      margin: 0,
    },
  },
  computer: {
    top: "210px",
    left: "0px",
    position: "absolute",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  tabsBox: {
    [theme.breakpoints.down(600)]: {
      padding: 0,
    },
  },
  centers: {
    "& .MuiBox-root": {
      alignItems: "flex-start",
      [theme.breakpoints.down(450)]: {
        display: "block",
        paddingTop: 0,
        paddingBottom: 0,
      },
    },

    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? `${theme.globals.fontFamily.ar}!important`
          : `${theme.globals.fontFamily.en}!important`,
      color:
        theme.palette.type === "dark"
          ? `${theme.globals.colors.white}!important`
          : `${theme.palette.textMed.main}!important`,
      marginBottom: 0,
      fontSize: `${theme.globals.fontSize.s - 2}px !important`,
    },
    "& .locTitle": { color: theme.palette.primary.main, fontWeight: "bold" },
    "& .locDesc": {
      minHeight: 40,
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      padding: "8px 0",
    },
    "& .tele": {
      direction: "ltr!important",
      textAlign: "start",
    },
    "& .locLabel": {
      minWidth: "140px",
      width: "auto",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      fontWeight: "bold",
      "@media only screen and (max-device-width:1000px) and (max-device-height: 1500px)":
        {
          minWidth: "150px",
        },
      "@media only screen and (max-device-width: 1500px) and (max-device-height: 1000px)":
        {
          minWidth: "150px",
        },
      [theme.breakpoints.down(450)]: {
        width: 140,
        marginTop: 8,
      },
    },
    "& .locValue": {
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.white
          : theme.palette.textMed.main,
      marginRight: 24,
      [theme.breakpoints.down(450)]: {
        marginRight: 0,
      },
      "& > p": {
        color:
          theme.palette.type === "dark"
            ? theme.globals.colors.white
            : theme.palette.textMed.main,
      },
    },
  },
  marginTop16: {
    marginTop: "-16px",
  },
  minHeight48: {
    minHeight: 48,
  },
  grid: {
    [theme.breakpoints.down(960)]: {
      flexDirection: "column-reverse",
    },
  },
}));
export default useStyles;
