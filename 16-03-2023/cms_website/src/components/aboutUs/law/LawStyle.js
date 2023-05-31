import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  Accordion: {
    boxShadow: "0px 10px 20px rgb(0 0 0 / 10%)",
    marginBottom: "20px",
    borderRadius: "10px",
    marginBottom: "15px",
    backgroundColor: "#fff",
    "&:before": {
      backgroundColor: "transparent",
    },
    "&:first-child": {
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    "&:last-child": {
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },

    "& > div.MuiCollapse-container": {
      borderTop: "1px solid #DFDBD2",
    },
    "& > div.MuiAccordionSummary-root": {
      minHeight: "65px",
      height: "auto",
      "& > div.MuiAccordionSummary-expandIcon.Mui-expanded": {
        "& > span.MuiIconButton-label": {
          width: 20,
          height: 20,

          "&:after": {
            content: "'_'",
            fontSize: "30px",
            fontWeight: "600",
            marginTop: "-30px",
          },
        },
      },
      "& > div.MuiAccordionSummary-expandIcon": {
        color: theme.globals.colors.textMed,
        "& > span.MuiIconButton-label:after": {
          content: "'+'",
          fontSize: 34,
          width: 20,
          height: 20,
        },
      },
    },
    "& .MuiAccordionSummary-expandIcon": {
      fontSize: "1.1rem",
    },
    "& .MuiCollapse-entered": {
      marginBottom: "8px",
    },
  },
  accContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: "8px",
    [theme.breakpoints.down(600)]: {
      flexDirection: "column",
      // paddingLeft: 0,
    },
  },
  heading: {
    fontSize: "16px",
    textTransform: "capitalize",
    color: theme.globals.colors.textMed,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  title: {
    color: "#505050",
    fontSize: 14,
    padding: "0px 16px",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    textAlign: "start",
    // wordBreak: "break-all",
    "& ul": {
      marginLeft: "16px",
    },
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? `${theme.globals.fontFamily.ar}!important`
          : `${theme.globals.fontFamily.en}!important`,
    },
  },
  icon: {
    fontSize: "31px",
    margin: "10px",
    color: "#47799C",
  },
  allBtn: {
    display: "flex",
    margin: "0 0 0 auto",
    width: "100%",
    justifyContent: "flex-start",
    marginTop: "10px",
    marginBottom: "15px",

    "& button": {
      "& span.MuiButton-label": {
        "& span.collaBtn": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s - 2,
          color: theme.palette.primary.main,
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "27px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "canter",

          "& span": {
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",

            "& svg": {
              fontSize: theme.globals.fontSize.m - 2,
            },
          },
        },
      },
    },
  },
  accImgBox: {
    width: "35px",
    height: "35px",
    margin: "0 8px",
    display: "flex",
    alignItems: "center",
  },
  accHead: {
    borderBottom: "1px solid #DFDBD2",
    "& .MuiAccordionSummary-content": {
      alignItems: "center",
    },
  },
}));
export default useStyles;
