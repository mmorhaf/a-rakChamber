import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  initiativeTab: {
    "& .tabPanel": {
      width: "85%",
      paddingLeft: "16px",
      [theme.breakpoints.up(1540)]: {
        width: "72%",
      },
      [theme.breakpoints.down(1390)]: {
        width: "100%",
      },
    },
    "& header": {
      "& .MuiTabs-root": {
        width: "70%",
        [theme.breakpoints.down(960)]: {
          width: "100%",
        },
      },
    },
  },
  root: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "space-between",
    "& h1.MuiTypography-h1": {
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontWeight: "bold",
      fontSize: theme.globals.fontSize.xl + 2,
      color: "#000",
      position: "relative",
      top: "-40px",
      "&:before , &:after": {
        content: '""',
        flex: "1 1 auto",

        top: "50%",
        height: 1,
        backgroundColor: theme.palette.primary.main,
      },
      "&:before": { right: 0, marginRight: theme.spacing(3) },
      " &:after": { left: 0, marginLeft: theme.spacing(3) },
      [theme.breakpoints.down(768)]: {
        fontSize: theme.globals.fontSize.lg,
      },

      [theme.breakpoints.down(400)]: {
        fontSize: theme.globals.fontSize.m,
      },
    },
    "& header": {
      zIndex: "unset",
      marginBottom: theme.spacing(3),
      backgroundColor: "transparent",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontWeight: "600",
      fontSize: theme.globals.fontSize.m,
      position: "relative",
      color: theme.palette.primary.main,
      boxShadow: "unset",
      "& div.MuiTabs-flexContainer": {
        justifyContent: "center",

        [theme.breakpoints.down(650)]: {
          flexWrap: "wrap",
        },
      },

      "& button.MuiTab-root": {
        width: "fit-content",
        padding: "16px 20px",
        maxWidth: "unset",
        minWidth: "unset",
        height: "42px",
        minHeight: "unset",
        backgroundColor: "transparent",
        marginRight: "5px",
        opacity: "1",
        boxSizing: "border-box",
        borderRadius: "35px",

        // [theme.breakpoints.down(910)]: {
        //   padding: "16px 8px",
        // },

        [theme.breakpoints.down(845)]: {
          margin: "0 5px",
        },

        "& span.MuiTab-wrapper": {
          color: theme.palette.primary.main,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          whiteSpace: "nowrap",
          fontSize: theme.globals.fontSize.m,
          lineHeight: "27px",
          padding: "0",
          textTransform: "capitalize",

          [theme.breakpoints.between(600, 910)]: {
            fontSize: theme.globals.fontSize.s - 2,
          },

          [theme.breakpoints.down(650)]: {
            fontSize: theme.globals.fontSize.xs + 2,
            lineHeight: "17px",
          },

          [theme.breakpoints.down(400)]: {
            fontSize: theme.globals.fontSize.xs + 1,
            lineHeight: "17px",
          },
        },
      },

      "& button.Mui-selected.MuiTab-root": {
        border: `1px solid ${theme.palette.primary.main}`,

        "& span.MuiTab-wrapper": {
          fontWeight: "600",
        },
      },

      "& span.MuiTabs-indicator": {
        height: "0",
      },
    },

    // "& div[role='tabpanel']": {
    //   minHeight: 530,
    // },
  },

  eventsRoot: { minHeight: "50vh", "& header": { top: -70 } },
}));

export default useStyles;
