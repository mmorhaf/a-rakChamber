import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "calc(100vh - 370px)",
    marginRight: "auto",
    marginLeft: "auto",
    textAlign: "start",
    marginBottom: "30px",
    marginTop: 30,

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& h1": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: theme.globals.fontSize.m - 2,
      color: theme.palette.primary.main,
      marginBottom: "20px",
      marginTop: "20px",
    },

    "& div.rpv-core-inner-page": {
      padding: 0,
      background: "inherit",
    },

    "& div.rpv-default-layout-container": {
      height: "800px",
    },

    "& div.rpv-default-layout-body": {
      paddingBottom: "20px",
      paddingTop: "20px",
    },
    "& .MuiGrid-root > .rpv-core__viewer > div > .rpv-default-layout__container > .rpv-default-layout__main > .rpv-default-layout__body > div":
      {
        height: "1620px!important",
      },
  },
  pdfBox: {
    maxHeight: "1490px!important",
    overflow: "hidden!important",
    "& .rpv-default-layout__container": {
      height: "1490px!important",
    },
  },
  pdfViewrRoot: {
    marginBottom: "20px",
    "& .rpv-default-layout__container": {
      height: "800px",
    },
  },

  description: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "#a52222",
    fontSize: theme.globals.fontSize.s,
  },
}));

export default useStyles;
