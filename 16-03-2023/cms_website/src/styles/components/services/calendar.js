import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  calendar: {
    width: "100%",
    boxShadow: "none!important",
    border: `1px solid ${theme.palette.primary.main}`,
    direction: theme.direction === "rtl" ? "rtl" : "ltr",
    "& .MuiPaper-root": {
      width: "100%",
      overflowX: "hidden",
    },
    "& .MuiSnackbarContent-root": {
      backgroundColor: "red",
    },
    "& div": {
      "& div": {
        "&.OverlayBase-absolutePosition": {
          zIndex: "100!important",
        },
      },
    },
    "& td": {
      borderRight: "1px solid rgba(224, 224, 224, 1)",
      borderLeft: "1px solid rgba(224, 224, 224, 1)",
    },
    "& .MuiToolbar-root": {
      paddingBottom: 15,
      "& .MuiTypography-root": {
        [theme.breakpoints.down(600)]: {
          display: "none",
        },
      },
      "& > div": {
        display: theme.direction === "rtl" ? "flex" : "block",
        flexDirection: theme.direction === "rtl" ? "row" : "row-reverse",
      },
      "& .MuiInputBase-root": {
        color: "#666666",
        maxWidth: "auto",
        width: 125,
        fontWeight: 600,
        border: "1px solid #1f627f",
        height: 50,
        fontSize: "14px!important",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        marginLeft: 10,
        paddingLeft: 8,
        borderRadius: 8,
        paddingRight: 8,
        overflow: "hidden",
        fontSize: 16,
        padding: 10,
        maxHeight: 40,
        // wordBreak: "break-all",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 1,
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0,0,0,0)!important",
        },
      },
      "& .MuiButton-outlined": {
        color: "#666666",
        width: 87,
        border: "1px solid #1f627f",
        height: 50,
        fontSize: "14px!important",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        marginLeft: 10,
        paddingLeft: 8,
        borderRadius: 8,
        paddingRight: 8,
      },
      "& .MuiButtonBase-root": {
        color: "#666666",
        fontSize: 14,
        fontWeight: 600,
      },
      "& .MuiIconButton-root": {
        color: "white",
        width: 30,
        height: 30,
        marginLeft: 10,
        backgroundColor: "#1f627f",
        "& .MuiSvgIcon-root": {
          marginLeft: "0!important",
          marginRight: "0!important",
        },
      },
    },
    "& .MuiPaper-root .MuiFab-root": {
      backgroundColor: "#146A99!important",
      color: "white",
      position: "absolute",
      bottom: 24,
      right: 32,
      "& .MuiSvgIcon-root": {
        marginRight: "18px!important",
        marginLeft: "18px!important",
      },
    },
    "& .MuiGrid-root .MuiPaper-root .MuiToolbar-root .MuiOutlinedInput-root": {
      width: "9%",
      borderRadius: "8px",
      border: `1px solid #1f627f`,
      color: "#666666",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.direction == "rtl" ? "16px!important" : "14px!important",
      borderRadius: 8,
      "& .MuiSvgIcon-root": {
        marginLeft: "0px!important",
        marginRight: "9px!important",
      },
    },
    "& .MuiGrid-root .MuiPaper-root .MuiToolbar-root .MuiButton-outlined": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontSize: theme.direction == "rtl" ? "16px!important" : "14px!important",
      paddingLeft: 8,
      borderRadius: 8,
      paddingRight: 8,
      width: 87,
      height: 50,
      marginLeft: 10,
      border: `1px solid #1f627f`,
      color: "#666666",
    },
    "& .MuiGrid-root .MuiPaper-root .MuiToolbar-root .MuiIconButton-root": {
      color: "#666666",
      fontSize: theme.direction == "rtl" ? "16px!important" : "14px!important",
    },
    "& .MuiGrid-root .MuiPaper-root .MuiToolbar-root .MuiOutlinedInput-notchedOutline":
      { border: "none!important" },
    "& .MuiGrid-root .MuiPaper-root .MuiToolbar-root .MuiIconButton-root": {
      height: 5,
      color: "white",
      backgroundColor: "#1f627f",
      marginLeft: 10,
      width: 5,
      "& .MuiSvgIcon-root": {
        marginLeft: "0px!important",
        marginRight: "0px!important",
      },
    },
    "& .container": {
      width: "150%",
    },
    // "& .MuiTableCell-root": {
    //   height: 65,
    //   "& > div": {
    //     height: 60,
    //   },
    // },
  },
  block: {
    display: "block",
  },
  cell: {
    height: "110px",
  },
  accordionIcon: {
    color: "#bbb",
    fontSize: 35,
    padding: 4,
  },
  accordion: {
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
  heading: {
    fontWeight: "700",
    fontSize: theme.globals.fontSize.s,
    color: "#B2C900",
    position: "relative",
  },
  paddingTop5: {
    paddingTop: 5,
  },
  paddingLeft25: {
    paddingLeft: 25,
  },
  green: {
    color: "#B2C900",
  },
  accTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  error: {
    color: "#f44336",
    fontSize: "14px!important",
  },
  phoneNumber: {
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
  picker: {
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
  inpuContainer: {
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
  },
  input: {
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
  closeButton: {
    float: "right",
    right: "-35px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    "& .MuiSvgIcon-root": {
      padding: 4,
      fontSize: 35,
    },
  },
  btn: {
    textTransform: "capitalize",
    cursor: "pointer!important",
    border: "none!important",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.direction == "rtl" ? "16px!important" : "14px!important",
    height: "40px!important",
    minWidth: "130px",
    fontWeight: "600!important",
    lineHeight: "24px!important",
    textAlign: "center!important",
    boxShadow: "0px 0px 4px rgb(0 0 0 / 25%)!important",
    borderRadius: "8px!important",
  },
  blueBtn: {
    color: "#FFFFFF!important",
    background: "#263661!important",
    "&:hover": {
      border: "none!important",
      color: "#263661!important",
      backgroundColor: "#FFFFFF!important",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 30%), 0px 4px 5px 0px rgb(0 0 0 / 20%), 0px 1px 10px 0px rgb(0 0 0 / 15%)!important",
    },
  },
  marginTop10: {
    marginTop: "10px",
  },
  marginBottom10: {
    marginBottom: 10,
  },
  header: {
    color: "#263661",
    fontWeight: 600,
    [theme.breakpoints.down(600)]: {
      fontSize:
        theme.direction == "rtl"
          ? theme.globals.fontSize.s - 2
          : theme.globals.fontSize.s,
    },
    fontSize: theme.globals.fontSize.s,
  },
  down: {
    position: "relative",
    top: 16,
  },
  select: {
    fontFamily:
      theme.direction == "ltr" ? "poppins!important" : "tajawal!important",
    fontSize:
      theme.direction == "rtl"
        ? theme.globals.fontSize.s
        : theme.globals.fontSize.s - 2,
    background: "#ffffff",
    height: "41px",
    width: "100%",
    "& .MuiSelect-icon": {
      color: "rgba(0, 0, 0, 0.23)",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "0.5px solid rgba(0, 0, 0, 0.23)!important",
      borderRadius: "5px",
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    "& .MuiFormControl-root .MuiInputBase-root": {
      height: "41px",
      paddingTop: "1px!important",
      "& .MuiChip-root": {
        fontFamily:
          theme.direction == "ltr" ? "poppins!important" : "tajawal!important",
        fontSize:
          theme.direction == "rtl" ? "16px!important" : "14px!important",
        backgroundColor: "#ffffff",
        border: "0.5px solid #989898",
        borderRadius: "8px",
        fontWeight: "300",
        position: "relative",
        "& .MuiChip-deleteIcon": {
          position: "absolute",
          color: "#FFFFFF",
          marginLeft: "-7px!important",
          marginRight: "0px!important",
          width: "17px",
          height: "17px",
          backgroundColor: " #146A99",
          borderRadius: "9px",
          left: "1px!important",
          top: "-4px!important",
        },
      },
    },
  },
  marginBottom20: {
    marginBottom: "20px",
  },
  calendarError: {
    height: "80%",
    "& .MuiSnackbar-anchorOriginTopRight": {
      top: "16%",
      right: "10%",
    },
  },
  spinner: {
    display: "flex",
    top: 0,
    bottom: 0,
    zIndex: 1500,
    backdropFilter: "blur(2px)",
    right: 0,
    backgroundColor: "#ffffff1a",
    left: 0,
    position: "fixed",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default useStyles;
