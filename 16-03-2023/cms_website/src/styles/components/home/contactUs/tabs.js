import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    flex: "1 1 auto",
    [theme.breakpoints.down(960)]: {
      width: "90%",
      marginRight: "auto",
      marginLeft: "auto",
      marginBottom: "100px",
    },

    "& h1": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: theme.globals.fontSize.lg,
      lineHeight: "41px",
      color:
        theme.palette.type === "dark"
          ? theme.globals.colors.darkPrimary
          : theme.globals.colors.textMed,
      marginBottom: "20px",
      position: "relative",
      textAlign: "start",

      [theme.breakpoints.down(1250)]: {
        fontSize: theme.globals.fontSize.lg,
      },

      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.lg,
      },
    },

    "& h1:before": {
      content: '""',
      position: "absolute",
      top: "-9px",
      width: "95%",
      height: 1,
      backgroundColor: theme.palette.primary.main,

      [theme.breakpoints.down(1450)]: {
        width: "100%",
      },
    },

    "& ul.nav.nav-tabs": {
      width: "93%",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "unset",
      marginBottom: "10px",

      [theme.breakpoints.down(960)]: {
        maxWidth: "360px",
        marginRight: "auto",
        marginLeft: "auto",
      },

      "& li": {
        width: "25%",

        cursor: "pointer",

        "& a.nav-link": {
          textAlign: "center",
          border: 0,

          "& h2": {
            textAlign: "center",
            borderRadius: "2px",
            border: "0",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s + 1,
            lineHeight: "25px",
            color: theme.palette.primary.main,
            textTransform: "capitalize",

            [theme.breakpoints.down(1250)]: {
              fontSize: theme.globals.fontSize.s - 2,
            },
          },
        },

        "& a.active.nav-link": {
          boxSizing: "border-box",
          background: "transparent",
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: "35px",
          width: "fit-content",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 8,
        },
      },

      "& li.instagram a": {
        paddingTop: "0.8rem",

        "& span.insta": {
          backgroundImage: "url(/assets/images/insta.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          width: 23,
          height: 20,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },

    "& ul.nav.nav-tabs.participation": {
      "& li": {
        width: "33%",

        [theme.breakpoints.between(960, 1500)]: {
          width: "90px",
        },
      },
    },

    "& div.tab-content": {
      // height: 500,
      width: "100%",
      overflow: "hidden",
      boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.1)",
      background: theme.globals.colors.white,
      borderRadius: "10px",

      [theme.breakpoints.down(960)]: {
        width: "100%",
        maxWidth: "450px",
        marginLeft: "auto",
        marginRight: "auto",
      },
      [theme.breakpoints.down(600)]: {
        height: 580,
      },
      "& div.tab-pane": {
        height: 500,
        // overflowY: "auto",
      },

      "& div.tab-pane.social": {
        overflowY: "unset",
      },

      "& div.tab-pane.active": {
        height: 500,
        borderRadius: "10px",

        "& div.row": {
          padding: "10px 0px",
          width: "100%",
          minHeight: "500px",
          height: "100%",
          marginRight: "auto",
          marginLeft: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down(960)]: {
            minHeight: "300px",
            height: "100%",
          },
          // [theme.breakpoints.between(960, 1220)]: {
          //   width: "300px",
          // },
          [theme.breakpoints.down(768)]: {
            width: "100%",
          },
          "& .div": {
            flex: "1 1 auto",
            "& .div": {
              "& .div": {
                width: "fit-content",
              },
            },
          },
        },

        "& div.row.polls": {
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
          // "& .MuiGrid-container": {
          //   height: "100%",
          //   flex: "1 1 auto",
          // },
        },
      },
    },
  },
  instaBox: {
    margin: 16,
    borderRadius: 8,
    padding: 12,
    border: "1px solid #0000001f",
    boxShadow: "0 1px 2px #0000001f",
  },
  top: {
    alignItems: "center",
    flexDirection: "row!important",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "0.6em",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "6px",
    },
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
  },
  twitter: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",
  },
}));

export default useStyles;
