import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "55px",

    [theme.breakpoints.down(900)]: {
      display: "none",
    },

    "& header": {
      background: theme.globals.colors.white,
      height: "100%",
      display: "flex",
      justifyContent: "center",

      "& div.MuiToolbar-root": {
        marginLeft: "16%",
        padding: "0!important",
        minHeight: "40px",
        height: "40px",

        [theme.breakpoints.down(1500)]: {
          marginLeft: "16%",
        },

        [theme.breakpoints.down(1250)]: {
          marginLeft: "17%",
          paddingRight: 0,
        },

        [theme.breakpoints.down(1070)]: {
          marginLeft: "18%",
        },

        [theme.breakpoints.down(980)]: {
          marginLeft: "19%",
        },

        [theme.breakpoints.down(900)]: {
          paddingRight: "0",
        },
      },
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  search: {
    position: "relative",
    borderRadius: "20px",
    backgroundColor: theme.globals.colors.pollOuterBox,
    flexGrow: 1,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  searchIcon: {
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: "40px",
    zIndex: "1000",

    "& svg": {
      color: theme.globals.colors.textLight,
      fontSize: "20px",
    },
  },

  inputRoot: {
    color: "inherit",
    fontSize: "unset",
    width: "100%",

    "& input": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs + 1,
      lineHeight: "16px",
      color: theme.globals.colors.textLight,
    },

    "& input::placeholder": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.xs + 1,
      lineHeight: "16px",
      color: theme.globals.colors.textLight,
    },
  },

  inputInput: {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    height: "100%",
    padding: "4px 0 7px",
  },

  grow: {
    flexGrow: 1,
  },

  sectionDesktop: {
    display: "none",

    [theme.breakpoints.up(900)]: {
      display: "flex",
    },

    "& div.tools": {
      "& a": {
        textDecoration: "none",

        [theme.breakpoints.down(1100)]: {
          marginRight: "6px",
        },

        "& button": {
          marginRight: "0",
        },
      },
      "& button": {
        borderRadius: "10px",
        marginRight: "10px",

        [theme.breakpoints.down(1100)]: {
          marginRight: "8px",
          padding: "4px",
        },

        "& span.MuiBox-root": {
          fontSize: theme.globals.fontSize.xs,
          color: theme.palette.primary.main,
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          textTransform: "none",
          lineHeight: "16px",
          marginLeft: "4px",

          [theme.breakpoints.down(1100)]: {
            marginLeft: "0",
          },
        },

        "& svg": {
          color: theme.palette.primary.main,
          marginRight: "2px",

          [theme.breakpoints.down(1100)]: {
            fontSize: theme.globals.fontSize.s + 2,
          },
        },
      },
    },

    "& div.customizFonts": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",

      "& button": {
        [theme.breakpoints.down(1022)]: {
          padding: "7px",
        },

        "& span.MuiIconButton-label": {
          lineHeight: "21px",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          color: theme.palette.primary.main,
          fontWeight: "bold",
        },
      },

      "& button:nth-child(-n+2)": {
        fontSize: theme.globals.fontSize.s,
      },
      "& button:nth-child(3)": {
        "& span svg": {
          fontSize: theme.globals.fontSize.s,
        },
      },
      "& button:nth-child(4)": {
        "& span svg": {
          fontSize: theme.globals.fontSize.s,
        },
      },
    },
  },

  sectionMobile: {
    display: "none",

    "& button": {
      "& svg": {
        color: theme.globals.colors.white,
      },
    },
  },
}));

export default useStyles;
