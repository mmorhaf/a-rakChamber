import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: "3000!important",
    "& div.MuiDialog-paper": {
      // position: "fixed",
      width: "100%",
      maxWidth: "unset",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 0,
      zIndex: 3000,
      background: "rgba(255, 255, 255, 0.9)",
      overflowY: "hidden",

      "& div.siteMapContainer": {
        height: "100%",
        width: "100%",
        alignContent: "flex-start",
        flexDirection: "row",
        marginTop: 50,
        overflow: "auto",
        paddingBottom: 50,
        "& span.closeBtn": {
          width: 43,
          height: 43,
          background: "#263661",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)!important",
          borderRadius: "3px 0px 0px 3px",
          position: "absolute",
          top: "105px",
          right: 0,
          display: "grid",
          placeItems: "center",
          cursor: "pointer",

          "& svg": {
            fontSize: theme.globals.fontSize.m,
            color: theme.globals.colors.white,
          },
        },

        "& div.listContainer": {
          display: "flex",
          justifyContent: "center",
          marginBottom: 30,

          "& ul": {
            width: 230,

            "& p.title": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: theme.globals.fontSize.xl - 4,
              lineHeight: "33px",
              color: theme.palette.secondary.main,
              position: "unset",
              textAlign: "start",
              direction: theme.direction === "rtl" ? "rtl!important" : "ltr",
              textTransform: "capitalize",

              [theme.breakpoints.down(600)]: {
                // color: theme.globals.colors.white,
                fontSize: theme.globals.fontSize.s - 2,
                // lineHeight: "19px",
                // fontWeight: "normal",
              },

              [theme.breakpoints.down(515)]: {
                paddingRight: "5px",
              },
            },

            "& svg": {
              float: "right",
            },

            "& li": {
              paddingTop: 0,
              paddingBottom: 0,
              background: "transparent!important",
              marginBottom: 7,
              direction: theme.direction === "rtl" ? "rtl!important" : "ltr",

              "& div.MuiListItemIcon-root": {
                minWidth: "12px",
                "& svg": {
                  fontSize: theme.globals.fontSize.lg,
                  color: theme.palette.secondary.main,
                },
              },
              "& .smaller > span": {
                fontSize: theme.globals.fontSize.s,
              },
              "& .bold > span": {
                fontWeight: "bold",
              },
              "& span": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "normal",
                fontSize: theme.globals.fontSize.s + 2,
                lineHeight: "22px",
                color: theme.palette.primary.main,
                textTransform: "capitalize",
                [theme.breakpoints.down(600)]: {
                  // color: theme.globals.colors.white,
                  fontSize: theme.globals.fontSize.xs + 1,
                  // lineHeight: "19px",
                  // fontWeight: "normal",
                },
              },
            },

            "& li:first-of-type": {
              marginTop: "0px!important",
            },
          },

          "& ul:before": {
            // [theme.breakpoints.down(600)]: {
            //   content: "''",
            //   width: "95%",
            //   height: "1px",
            //   background: "rgba(255,255,255,0.5)",
            //   position: "absolute",
            //   top: "25px",
            //   left: "12px",
            // },
          },
        },
      },
    },
  },
}));

export default useStyles;
