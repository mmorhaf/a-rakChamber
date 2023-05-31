import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    justifyContent: "flex-end",

    [theme.breakpoints.down(1280)]: {
      "& div.ad": {
        order: 3,
      },
      "& div.initiatives": {
        order: 2,
      },
    },

    [theme.breakpoints.down(768)]: {
      justifyContent: "space-around",
    },

    "& div.initiativeDivi": {
      [theme.breakpoints.down(960)]: {
        display: "none!important",
      },
    },

    "& div.initiativeTitl": {
      position: "relative",
      // "& .MuiTypography-h1": {
      //   "&:before": {
      //     flex: "none!important",
      //   },
      // },
    },

    "& div.MuiGrid-root.hiddenTitle": {
      display: "none",
      [theme.breakpoints.down(600)]: {
        display: "flex",
        marginBottom: "16px",
      },
    },
    "& div.MuiGrid-root.hiddenOnSmall": {
      [theme.breakpoints.down(600)]: {
        display: "none",
      },
    },
    "& div.MuiGrid-root.title": {
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
        color: theme.globals.colors.blackColor,
        position: "relative",
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
    },
  },

  tabsContainer: {
    marginTop: "45px",
  },

  eventContentContainer: {
    marginTop: "8%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "url('/assets/images/events/background.webp') fixed",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "calc(100% - 100px)",

    [theme.breakpoints.down(800)]: {
      marginTop: "13%",
    },

    [theme.breakpoints.down(572)]: {
      marginTop: "17%",
    },

    [theme.breakpoints.down(430)]: {
      marginTop: "21%",
    },

    [theme.breakpoints.down(360)]: {
      marginTop: "28%",
    },
  },
}));

export default useStyles;
