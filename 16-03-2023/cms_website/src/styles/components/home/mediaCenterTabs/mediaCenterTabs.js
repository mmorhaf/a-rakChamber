import { makeStyles } from "@material-ui/styles";

const useMediaQuery = makeStyles((theme) => ({
  tabs: {
    "& div.MuiTabs-root": {
      "& button.MuiTab-root": {
        [theme.breakpoints.down(768)]: {
          width: "35%",
          marginBottom: " 15px",
          fontSize: theme.globals.fontSize.m - 1,
        },

        [theme.breakpoints.between(600, 700)]: {
          fontSize: theme.globals.fontSize.m - 2,
        },
      },
    },
  },

  tabPanel: {
    "& > div.MuiBox-root": {
      [theme.breakpoints.between(768, 1000)]: {
        padding: "0",
      },

      [theme.breakpoints.down(450)]: {
        padding: "0",
      },
    },
  },
}));

export default useMediaQuery;
