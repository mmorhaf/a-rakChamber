import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.MuiDialog-container": {
      "& div.MuiPaper-root": {
        backgroundImage: "url(/assets/images/exit.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        maxWidth: "700px",
        overflow: "hidden",
        border: "2px solid #FF0000",
        padding: 16,
        [theme.breakpoints.down(600)]: {
          height: 285,
        },
        "& div.close": {
          // width: "19px",
          height: "28px",
          color: "#FF0000",
          opacity: 1,
          cursor: "pointer",
          padding: "7px 30px 5px 0",
          "& > svg": {
            position: "absolute",
            right: "8px",
          },
        },

        "& div.content": {
          [theme.breakpoints.down(600)]: {
            position: "absolute",
            zIndex: 1000,
            backdropFilter: "blur(3px)",
            backgroundColor: "#ffffff1a",
            marginTop: 16,
            maxWidth: "100%",
            flexBasis: "100%",
          },
          "& div.MuiDialogTitle-root": {
            paddingTop: 0,
            paddingBottom: 0,
            direction: theme.direction === "rtl" ? "rtl" : "ltr",
            textAlign: "start",
            "& h2": {
              textAlign: "left",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: theme.globals.fontSize.lg,
              lineHeight: "41px",
              color: "#FF0000",
              [theme.breakpoints.down(600)]: {
                fontSize: theme.globals.fontSize.lg - 4,
                lineHeight: "23px",
              },
            },
          },

          "& div.MuiDialogContent-root": {
            direction: theme.direction === "rtl" ? "rtl" : "ltr",
            textAlign: "left",
            padding: "8px 24px 3px",
            "& p:first-of-type": {
              fontWeight: 900,
              fontSize: theme.globals.fontSize.m + 4,
            },
            "& p:last-of-type": {
              fontSize: theme.globals.fontSize.s - 2,
              fontWeight: 400,
            },
            "& p": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontSize: theme.globals.fontSize.m - 4,
              fontWeight: 900,
              lineHeight: "33px",
              color: "#FF0000",
              [theme.breakpoints.down(600)]: {
                fontSize: theme.globals.fontSize.m - 4,
                lineHeight: "24px",
              },
            },
            "& .message": {
              fontSize: theme.globals.fontSize.s,
              fontWeight: 500,
            },
          },

          "& div.btnContainer": {
            display: "flex",
            flexDirection: "row",
            padding: "0px 27px 40px",
            justifyContent: "left",
            [theme.breakpoints.down(600)]: {
              padding: "8px 24px",
            },
            "& button": {
              width: 112,
              height: 30,
              border: "1px solid #ABABAB",
              boxSizing: "border-box",
              borderRadius: "5px",

              "& span.MuiButton-label": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: "#FF0000",
                textTransform: "capitalize",
              },
            },

            "& button:first-of-type": {
              marginRight: theme.direction === "rtl" ? 0 : 20,
              marginLeft: theme.direction === "rtl" ? 20 : 0,
            },
          },
        },

        "& div.icon": {
          // display: "flex",
          // alignItems: "self-start",
          [theme.breakpoints.down(600)]: {
            minHeight: 200,
            minWidth: 245,
          },
          "& .MuiBox-root": {
            [theme.breakpoints.down(600)]: {
              right: 0,
              position: "absolute",
              width: 110,
              height: 173,
            },
          },
          "& svg": {
            color: "#FFCC33",
            fontSize: 115,
            [theme.breakpoints.down(600)]: {
              display: "none",
            },
          },
        },
      },
    },
  },
  end: {
    display: "flex",
    justifyContent: "end",
  },
  link: {
    width: 112,
    height: 30,
    border: "1px solid #FF0000",
    boxSizing: "border-box",
    borderRadius: "5px",
    color: "#FF0000 !important",
    textAlign: "center",
  },
  bgImg: {
    backgroundImage: "url(/assets/images/home/category.webp)",
    backgroundSize: "cover",
    "& .MuiButton-label": {
      color: "#fff!important",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
}));

export default useStyles;
