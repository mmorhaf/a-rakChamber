import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.formContainer": {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "75%",
      marginRight: "auto",
      marginLeft: "auto",

      // [theme.breakpoints.down(650)]: {
      //   width: "100%",
      // },

      "& div.formItem": {
        width: "49%",
        marginBottom: "7px",

        "& div.labelContainer": {
          // width: "90%",
          marginRight: "auto",
          marginLeft: "auto",

          "& label": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.m - 2,
            color: theme.globals.colors.white,
            marginBottom: "8px",
            textTransform: "capitalize",
            textAlign: "start",

            [theme.breakpoints.down(450)]: {
              fontSize: theme.globals.fontSize.s - 1,
            },
          },
        },

        "& div.hintContainer": {
          // display: "flex",
          // justifyContent: "center",
          "& div.MuiInput-underline:before": {
            bottom: "-1px",
          },

          "& div.MuiInputBase-root": {
            width: "96%",
            height: "35px",
            border: `1px solid ${theme.globals.colors.pollOuterBox}`,
            background: "rgb(255, 255, 255)",
            borderRadius: "5px",
            paddingLeft: "8px",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            // [theme.breakpoints.down(650)]: {
            //   width: "100%",
            // },

            "& div.MuiSelect-root": {
              paddingLeft: "15px",
              paddingTop: 0,
              paddingBottom: 0,
              height: "100%",
              alignItems: "center",
              opacity: "0.7",
              display: "flex",

              [theme.breakpoints.down(450)]: {
                fontSize: theme.globals.fontSize.xs,
                paddingLeft: "5px",
              },
            },

            "& svg.MuiSelect-icon": {
              position: theme.direction === "rtl" ? "static" : "absolute",
            },
          },
          "& .searchTextField": {
            width: "100%",
            "& .MuiInputBase-root": {
              width: "98%",
              "& .MuiInputAdornment-root": { color: "#888" },
            },
          },
        },
      },

      "& div.btnContainer": {
        marginTop: "10px",
        textAlign: "center",

        "& button:first-of-type": {
          marginRight: "15px",
        },

        "& button": {
          position: "relative",
          width: "115px",
          height: "40px",
          background: "rgba(255, 255, 255, 0.78)",
          borderRadius: "5px",

          [theme.breakpoints.down(450)]: {
            width: "106px",
            height: "32px",
          },

          "&:before": {
            content: '""',
            width: "12px",
            height: "12px",
            borderTop: `2px solid ${theme.palette.primary.main}`,
            borderLeft: `2px solid ${theme.palette.primary.main}`,
            borderTopLeftRadius: "5px",
            position: "absolute",
            top: "5px",
            left: "5px",
          },

          "& span.MuiButton-label": {
            fontSize: theme.globals.fontSize.s,
            fontWeight: "600",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            textTransform: "capitalize",
            color: theme.palette.primary.main,

            [theme.breakpoints.down(450)]: {
              fontSize: theme.globals.fontSize.s - 2,
            },
          },
        },
      },
    },
  },
  searchServicesRoot: {
    boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    padding: "16px",
    marginBottom: "32px",
    "& .MuiFormControl-root": {
      width: "100%",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiInputBase-root , .MuiInputLabel-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.s - 2,
      },
    },
    "& .MuiButton-contained": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px solid #ababab",
      color: "#5e5e5e",
      borderRadius: "5px",
      textTransform: "unset",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      width: "160px",
      margin: "0 16px",
      padding: "4px",
    },
    "& .labelContainer": {
      marginRight: "24px",
      marginTop: "24px",
      textAlign: "start",
    },
    "& .my-navbar-collapse": {
      transition: "height 1s ease",
      minHeight: "90px",
      overflow: "hidden",
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
  },
}));

export default useStyles;
