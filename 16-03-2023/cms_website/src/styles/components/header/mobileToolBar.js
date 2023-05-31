import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.globals.colors.darkPrimary,
    display: "flex",
    height: "calc(80vh)",
    flexDirection: "row-reverse",

    "& div.tabContainer": {
      width: "100%",
    },

    "& div.MuiTabs-root": {
      "& div.MuiTabs-scroller": {
        "& div.MuiTabs-flexContainer": {
          "& button.Mui-selected": {
            "& svg": {
              color: theme.palette.secondary.main,
            },
          },

          "& button.MuiTab-root": {
            minWidth: "unset",
            opacity: 1,
            padding: "6px 9px",

            "& svg": {
              color: theme.globals.colors.white,
            },
          },
        },
      },
    },
  },

  tabs: {
    borderLeft: `1px solid ${theme.palette.divider}`,
    background: theme.palette.primary.main,

    "& div.MuiTabs-scroller.MuiTabs-fixed": {
      marginTop: "30px",

      "& span.MuiTabs-indicator": {
        width: "3px!important",
        height: "48px!important",
      },
    },
  },
}));

export default useStyles;
