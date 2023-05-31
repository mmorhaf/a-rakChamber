import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  flexRoot: {
    flex: "1 1 auto",
    marginTop: "135px",
    marginBottom: "40px",
    // minHeight: "70.5vh",
  },
  root: {
    "& header": {
      backgroundColor: "inherit",
      boxShadow: "unset",
      borderBottom: `2px solid ${theme.palette.secondary.main}`,

      "& div.MuiTabs-root": {
        marginBottom: "-1px",

        "& button": {
          color: theme.palette.primary.main,
          opacity: 1,
          textTransform: "capitalize",
          maxWidth: "fit-content",
          // [theme.breakpoints.between(600, 700)]: {
          //   minWidth: "120px!important",
          // },

          "& span.MuiTab-wrapper": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: 600,
            fontSize: theme.globals.fontSize.s,
            lineHeight: "22px",
            textAlign: "center",
            // width: "100px",
            padding: "0px 8px 15px",
            justifyContent: "unset",
            // height: "103px",
            whiteSpace: "nowrap",

            [theme.breakpoints.down(768)]: {
              fontSize: theme.globals.fontSize.s - 2,
              padding: "0px 8px 8px",
            },

            // [theme.breakpoints.down(500)]: {
            //     fontSize: theme.globals.fontSize.s - 2,
            //     width: "75px",
            //     height: "95px",
            //   },

            // [theme.breakpoints.down(400)]: {
            //   fontSize: theme.globals.fontSize.xs + 1,
            //   width: "60px",
            //   height: "90px",
            // },

            "& svg": {
              marginBottom: "15px",
              fontSize: "30px",

              [theme.breakpoints.down(500)]: {
                marginBottom: "10px",
                fontSize: "25px",
              },

              [theme.breakpoints.down(500)]: {
                marginBottom: "10px",
                fontSize: "20px",
              },
            },
          },
        },

        "& button.Mui-selected": {
          color: theme.palette.secondary.main,
        },
      },

      "& span.MuiTabs-indicator": {
        height: "7px",
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
    borderBottom: `2px dashed ${theme.globals.colors.pollOuterBox}`,
    width: "100%",
    marginBottom: "24px",
  },
}));

export default useStyles;
