import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.globals.colors.bgWhite,
    borderRadius: 10,
    padding: theme.spacing(2),
    "& .MuiInputBase-root .MuiInputBase-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px white inset",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderWidth: "1px!important",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.globals.colors.pollOuterBox,
        },
      },
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

    "& .MuiGrid-root .captch-div canvas": {
      borderRadius: "10px",
      width: "175px",
    },
    "& .MuiGrid-root .MuiInput-underline:before": {
      borderBottom: "none",
    },
    "& .MuiButton-label": {
      display: "block",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },

    "& .MuiGrid-root .captch-div": {
      display: "flex",
      width: "250px",

      "& canvas": {
        borderRadius: "5px 0 0 5px",
      },

      "& button": {
        margin: 0,
        background: theme.globals.colors.secondaryDark,
      },
    },

    "& div.controlContainer": {
      display: "flex",
      marginBottom: "15px",
      alignItems: "center",

      "& .MuiFormControl-root": {
        width: "100%",
      },
      [theme.breakpoints.down(1300)]: {
        width: "48%",
        display: "unset",
      },

      [theme.breakpoints.down(550)]: {
        width: "100%",
        display: "unset",
      },
      "& .MuiOutlinedInput-adornedEnd": {
        borderLeft: "3px solid",
      },
      "& div.inputLabel": {
        width: "19%",

        [theme.breakpoints.down(1300)]: {
          width: "150px",
          marginBottom: "8px",
        },
      },

      "& div.inputLabel + div": {
        width: "80%",

        [theme.breakpoints.down(750)]: {
          width: "95%",
          display: "unset",
        },

        "& input": {
          color: theme.palette.primary.main,
        },

        "& .MuiInput-underline:before, & .MuiInput-underline:after": {
          border: "unset!important",
        },
      },

      "& div.datePicker": {
        "& div.MuiFormControl-root": {
          width: "100%!important",

          [theme.breakpoints.up(1300)]: {
            width: "70%!important",
          },

          [theme.breakpoints.down(1200)]: {
            width: "100%!important",
          },

          "& div.MuiInputBase-root": {
            height: "41px",
            color: theme.palette.secondary.main,
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,

            "& input::placeholder": {
              color: theme.palette.secondary.main,
            },

            "& input": {
              padding: "18.5px 24px",
              borderLeft: `3px solid ${theme.palette.primary.main}!important`,
            },

            "& fieldset": {
              border: `0.5px solid ${theme.palette.secondary.main}`,
            },
          },
        },

        "& p": {
          marginLeft: "14px",
        },
      },
    },

    "& p.errorMess": {
      height: "20px",
      marginTop: "10px",
      color: "#f44336",
      fontSize: "0.75rem",
    },

    "& input.MuiInputBase-input, & div.MuiSelect-selectMenu": {
      height: 50,
      padding: "0px 16px !important",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  phoneNumber: {
    position: "relative",
    outline: "none",
    padding: "4px 0px !important",
    paddingInlineStart: "10px",
    textAlign: "start",
    border: "0.5px solid #989898",
    // borderColor: "rgba(0, 0, 0, 0.23)",
    borderLeft: `3px solid ${theme.palette.primary.main}!important`,
    borderRadius: 4,
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
    "& .PhoneInputCountry": {
      marginInlineStart: "10px",
      // display: "none",
    },
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
      border: "2px solid #1f627f!important",
      outline: "none",
    },
    "& input": {
      background: "none!important",
      border: "none!important",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      height: "52px",
      width: "100%",
      color: theme.globals.colors.black,
      // webkitBoxShadow: "none!important",
      boxShadow: "none",
      outline: "none!important",
    },
    "& :-webkit-autofill": {
      transition: "background-color 5000s ease-in-out 0s",
      boxShadow: "none",
      WebkitTextFillColor: "#000!important",
    },
  },
  codeError: {
    color: "#f44336",
    fontSize: "0.75rem",
    marginLeft: "14px",
    marginRight: "14px",
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
    marginBottom: "1%",

    [theme.breakpoints.down(1300)]: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  },

  header: {
    fontWeight: 600,
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.s + 2,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontWeight: "600",
  },

  secondHeader: {
    width: "100%",
    fontSize: theme.globals.fontSize.s + 2,
    margin: theme.spacing(3, 0),
    paddingBottom: theme.spacing(2),
    borderBottom: `1px dashed ${theme.globals.colors.pollOuterBox}`,

    "& h5.header": {
      color: "#444444",
      fontSize: theme.globals.fontSize.s + 2,

      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  sectionHeader: {
    marginTop: theme.spacing(2),
    width: "100%",

    [theme.breakpoints.down(1300)]: {
      textAlign: "center",
    },
  },

  captcha: {
    width: "100%",
    "& > div > div > div > div > iframe": {
      [theme.breakpoints.down(335)]: {
        WebkitTransform: "scale(0.85) !important",
        WebkitTransformOrigin: "0 0 !important",
        marginLeft: theme.direction === "rtl" ? "-42px" : "0px",
      },
    },
    "& .MuiBox-root .captch-div": {
      display: "flex",
      width: "230px",

      [theme.breakpoints.down(1300)]: {
        marginRight: "auto",
        marginLeft: "auto",
      },

      "& canvas": {
        borderRadius: "5px 0 0 5px",
      },

      "& button": {
        margin: 0,
        background: theme.globals.colors.secondaryDark,
        borderRadius: "0 5px 5px 0",
      },
    },

    "& div.captchaInput": {
      width: "230px",
      marginTop: "20px",

      [theme.breakpoints.down(1300)]: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    "& div.captchaInput > div": {
      height: "34px",
    },
  },

  warnText: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.palette.primary.main,
    fontSize: theme.globals.fontSize.xs + 2,
    fontWeight: 600,
  },

  label: {
    fontWeight: "600",
    lineHeight: "19px",
    fontSize: theme.globals.fontSize.xs + 2,

    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  helperText: {
    fontWeight: "500",
    lineHeight: "19px",
    color: "#444444",
    marginTop: "10px",
    fontSize: theme.globals.fontSize.xs,

    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  textdropZone: {
    fontWeight: "600",
    lineHeight: "19px",
    fontSize: theme.globals.fontSize.xs + 2,

    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },

  cvPhotoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderTop: `1px dashed ${theme.globals.colors.pollOuterBox}`,

    "& div.cvPhoto": {
      width: "400px",
      display: "flex",
      justifyContent: "space-between",

      [theme.breakpoints.down(525)]: {
        display: "block",
      },

      [theme.breakpoints.down(450)]: {
        width: "350px",
      },

      "& div.MuiBox-root": {
        "& label": {
          "& span.MuiButtonBase-root": {
            width: 190,
            height: 190,
          },
        },
      },
    },
  },

  captchLabel: {
    marginBottom: "20px",
  },
  direction: {
    "& .MuiInputBase-root .MuiInputBase-input": {
      direction: "ltr!important",
    },
  },
  TextField: {
    width: "100%",

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "&  .MuiOutlinedInput-input": {
      borderLeft: `3px solid ${theme.palette.primary.main}`,
      borderRadius: "5px",
      padding: "6px 22px 7px 22px",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  container: {
    marginBottom: theme.spacing(2),
  },
  rootDropZone: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  dropZoneNoIcon: {
    "& .MuiDropzoneArea-root": {
      boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",

      width: "190px!important",
      height: "190px!important",
      backgroundColor: `${theme.globals.colors.bgWhite}!important`,
      borderColor: `${theme.globals.colors.bgWhite}!important`,
      textAlign: "center",
      paddingLeft: "0px",
      paddingRight: "0px",

      overflow: "auto",
      borderRadius: 10,

      zIndex: 1,
      "& .MuiDropzonePreviewList-root": {
        "& .MuiDropzonePreviewList-imageContainer": {
          maxWidth: "60%!important",
          flexBasis: "60%!important",
          "& > .MuiTypography-root ": {
            textOverflow: "ellipsis",
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            padding: "3px",
            paddingBottom: "0px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "1",
            textOverflow: "ellipsis",
          },
        },
      },
      "& .MuiDropzoneArea-textContainer": {
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      },
      "& .MuiDropzoneArea-text": {
        display: "none!important",
      },
      "& .MuiDropzoneArea-icon": {
        display: "none!important",
      },
      "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
        padding: "10px",

        "& .MuiDropzonePreviewList-removeButton": {
          backgroundColor: "white",
          color: "rgba(144,8,8,1)",
        },
        "&:hover": {
          "& .MuiDropzonePreviewList-removeButton": {
            right: "14px",
          },
          "& .MuiSvgIcon-root": {
            marginRight: "0px!important",
            marginLeft: "0px!important",
          },
        },
        "& .MuiDropzonePreviewList-image": {
          height: "70px",
          width: "110px",
          backgroundColor: "#1f627f",
        },
      },
      "& .MuiGrid-spacing-xs-8": {
        width: "100%",
        margin: "0px",
        display: "flex",
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
      },
      "&:focus": {
        outline: "none!important",
        border: "0.5px solid #1f627f!important",
      },
    },
  },

  gridDropZone: {
    "& .MuiDropzoneArea-root": {
      boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",

      width: "190px!important",
      height: "190px!important",
      backgroundColor: `${theme.globals.colors.white}!important`,
      borderColor: `${theme.globals.colors.white}!important`,
      textAlign: "center",
      paddingLeft: "0px",
      paddingRight: "0px",

      overflow: "auto",
      borderRadius: 10,

      zIndex: 1,
      "& .MuiDropzoneArea-textContainer": {
        textAlign: "left",
        display: "flex",
        alignItems: "center",
      },
      "& .MuiDropzoneArea-text": {
        display: "none",
      },
      "& .MuiDropzoneArea-icon": {
        right: "40px!important",
        top: "40px!important",
        height: "95px!important",

        position: "absolute",
        // marginTop: 35,

        width: "95px!important",
        color: "#ABABAB!important",
      },
      "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
        padding: "10px",
        "& .MuiDropzonePreviewList-removeButton": {
          backgroundColor: "white",
          color: "rgba(144,8,8,1)",
        },
        "&:hover": {
          "& .MuiDropzonePreviewList-removeButton": {
            right: "14px",
          },
          "& .MuiSvgIcon-root": {
            marginRight: "0px!important",
            marginLeft: "0px!important",
          },
        },
        "& .MuiDropzonePreviewList-image": {
          height: "70px",
          width: "110px",
          backgroundColor: "#1f627f",
        },
      },
      "& .MuiGrid-spacing-xs-8": {
        width: "100%",
        margin: "0px",
        display: "flex",
        width: "100%",
        height: "90%",
        alignItems: "center",
        justifyContent: "center",
      },
      "&:focus": {
        outline: "none!important",
        border: "0.5px solid #1f627f!important",
      },
    },
  },

  select: {
    border: `1px solid ${theme.globals.colors.pollOuterBox}`,
    borderRadius: "5px",
    width: "100%",
    borderLeft: `3px solid ${theme.palette.primary.main}`,

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "&:after": {
      display: "none",
    },

    "& div.MuiSelect-root": {
      paddingLeft: "24px",
      display: "flex",
      alignItems: "center",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },

    "& + p": {
      marginLeft: "14px",
    },

    "& .MuiSelect-icon": {
      color: theme.globals.colors.pollOuterBox,
    },
    "& .MuiFormControl-root .MuiInputBase-root": {
      height: "54px",
    },
  },
  toRight: {
    paddingLeft: "130px",
  },
  down5: {
    marginTop: "5%",
  },
  down20: {
    marginTop: "20%",
  },
  down50: {
    marginTop: "50%",
  },
  hidden: {
    display: "none",
  },

  upload: {
    boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
    // border: `1px solid ${theme.globals.colors.pollOuterBox}`,
    width: "190px",
    height: "190px",
    backgroundColor: theme.globals.colors.bgWhite,
    textAlign: "center",
    paddingLeft: "0px",
    paddingRight: "0px",
    // boxShadow: "none",
    overflow: "auto",
    borderRadius: 10,

    "&::-webkit-scrollbar": {
      width: "0.4em",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "6px",
    },

    "& span.MuiButton-label": {
      color: "#444444",
      fontSize: "14px",
      color: theme.palette.primary.main,
      fontWeight: "600",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      textTransform: "capitalize",
    },
  },

  uploaded: {
    position: "relative",
    padding: "17px 5px 5px 5px",
    color: theme.palette.primary.main,
    fontWeight: "600",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textTransform: "capitalize",
    cursor: "pointer",
    borderRadius: "4px",

    "&:hover": {
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

      "& svg": {
        opacity: 1,
      },
    },

    "& svg:nth-child(2)": {
      marginBottom: "30px",
    },
  },

  icon: {
    fontSize: "95px",
    color: "#ABABAB",

    marginBottom: "33px",
  },

  success: {
    marginBottom: "12px",
  },

  cancel: {
    color: theme.palette.secondary.main,
    position: "absolute",
    top: 0,
    right: 0,
    opacity: 0,
    transition: "opacity 1s",

    "&:hover": {
      cursor: "pointer",
    },
  },

  send: {
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "40px",
    fontSize: theme.globals.fontSize.m,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: theme.globals.colors.white,
    width: "110px",
    padding: "5px",
    backgroundColor: theme.palette.secondary.main,
    textTransform: "none",

    [theme.breakpoints.down(1300)]: {
      textAlign: "center",
    },
  },

  send: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 110,
    height: 34,
    padding: "0 16px",

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
        color: theme.palette.primary.main,
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
  datePicker: {
    width: "100%!important",
  },
  label: {
    width: "220px",
    minWidth: "220px",
    maxWidth: "220px",
    color: "#444444",
    fontSize: "16px",
    marginInlineEnd: "20px",
    fontWeight: "600",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    [theme.breakpoints.down(1300)]: {
      margin: "16px 0px",
    },
  },
  image: {
    width: "220px",
    height: "170px",
    marginTop: "51px",
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  error: {
    fontSize: "11px",
    color: "red",
  },
}));
export default useStyles;
