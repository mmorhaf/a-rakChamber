import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  ourPartner: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: 50,
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.globals.colors.textMed,
    fontWeight: 600,
    textTransform: "capitalize",
    textAlign: "start",
    display: "block",
    [theme.breakpoints.down(600)]: {
      fontSize: 40,
    },
  },
  title: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: 18,
    fontWeight: 600,
    color:
      theme.palette.type === "dark"
        ? theme.globals.colors.white
        : theme.globals.colors.textMed,
    marginBottom: 20,
    "& > p": {
      marginTop: 16,
      textAlign: "left",
    },
  },
  categories: {
    margin: "15px 0px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiCardMedia-img": {
      objectFit: "contain",
      width: "100%",
      height: "76px",
      objectPosition: "center",
      marginTop: "20px",
      marginBottom: "5px",
    },
    "& .MuiTypography-h5": {
      color: "#505050",
      height: "45px",
      display: "flex",
      overflow: "hidden",
      fontSize: "18px",
      fontWeight: "600",
      textOverflow: "ellipsis",
      WebkitBoxOrient: "horizontal",
      WebkitLineClamp: "2",
      alignItems: "center",
      textTransform: "capitalize",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .part": {
      borderBottom: "2px solid",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .no": {
      fontSize: "40px",
      display: "flex",
      alignItems: "center",
    },
    " & .MuiCardContent-root": {
      padding: "0px 16px 16px 16px",
      width: "100%",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .MuiGrid-item": {
      margin: "7px 0px",
      marginBottom: 30,
    },
    "& .parper": {
      margin: "0px 7px",
      width: "70px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "& .MuiCardActionArea-root": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  total: {
    display: "flex",
    alignItems: "center",
    "& .MuiCardMedia-img": {
      objectFit: "contain",
      width: "100%",
      height: "76px",
      objectPosition: "center",
      marginTop: "20px",
      marginBottom: "5px",
    },
    "& .MuiCardActionArea-root": {
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    "& .part": {
      borderBottom: "2px solid",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiTypography-h5": {
      fontSize: "18px",
      fontWeight: "600",
      color: "#505050",
      textTransform: "capitalize",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .parper": {
      margin: "0px 7px",
      width: "70px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    "& .no": {
      fontSize: "40px",
      display: "flex",
      alignItems: "center",
    },
    " & .MuiCardContent-root": {
      padding: "0px 16px 16px 16px",
    },
  },
  category: {
    "& div.MuiPaper-root": {
      background: theme.globals.colors.white,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      width: 295,
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.down(675)]: {
        width: 260,
      },
    },

    "& .percent": {
      fontWeight: 600,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "&:first-child": {
      "& .no": { color: "#B2C900" },
      "& .percent": {
        color: "#B2C900",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .part": {
        borderColor: "#B2C900",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "&:nth-child(2) ": {
      "& .no": {
        color: "#DC4569",
      },
      "& .percent": {
        color: "#DC4569",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .part": {
        borderColor: "#DC4569",
      },
    },
    "&:nth-child(3) ": {
      "& .no": {
        color: "#55ACEE",
      },
      "& .percent": {
        color: "#55ACEE",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .part": {
        borderColor: "#55ACEE",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
    "&:nth-child(4) ": {
      "& .no": {
        color: "#395185",
      },
      "& .percent": {
        color: "#395185",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .part": {
        borderColor: "#395185",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },

  category1: {
    "& div.MuiPaper-root": {
      background: theme.globals.colors.white,
      boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px",
      width: 295,
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.down(675)]: {
        width: 260,
      },
      " & .MuiCardContent-root": {
        padding: "0px 16px 16px 16px",
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      },
    },

    "& .percent": {
      fontWeight: 600,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "&:first-child": {
      "& .no": { color: "#939EBD" },
      "& .percent": {
        color: "#939EBD",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .part": {
        borderColor: "#939EBD",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
    },
  },
  button: {
    height: 30,
    textTransform: "capitalize",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.secondary.main,
    border: "1px solid",
    display: "flex",

    minWidth: 100,
    position: "relative",
    "&:hover": {
      backgroundImage: "url(/assets/images/home/btn.png)",
      color: "white",
    },
    "& .MuiButton-label": {
      width: "auto",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },

  allBtn: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "10px",
    marginBottom: "15px",

    "& button": {
      "& span.MuiButton-label": {
        "& span.collaBtn": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontSize: theme.globals.fontSize.s - 2,
          color: theme.palette.primary.main,
          fontStyle: "normal",
          fontWeight: "600",
          lineHeight: "27px",
          textTransform: "capitalize",
          display: "flex",
          alignItems: "canter",

          "& span": {
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",

            "& svg": {
              fontSize: theme.globals.fontSize.m - 2,
            },
          },
        },
      },
    },
  },
  partnerAcc: {
    "& .acc": {
      boxShadow: "0px 4px 30px rgb(0 0 0 / 10%)",
      borderRadius: "8px",
      margin: "16px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      [theme.breakpoints.down(600)]: {
        flexDirection: "column",
      },
    },
    "& .MuiButton-root": {
      backgroundColor: "white",
    },

    "& .MuiButton-root:hover": {
      backgroundColor: "white",
    },

    "& button": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
    },
    "& img": {
      width: "150px",
      height: "100px",
      objectFit: "contain",
    },
    "& .MuiTypography-h3": {
      fontSize: theme.globals.fontSize.s - 2,
      color: "#444444",
      fontWeight: 600,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      marginTop: 8,
      marginLeft: 8,
      textAlign: "justify",
      [theme.breakpoints.down(600)]: {
        marginLeft: 0,
      },
    },
  },
}));
export default useStyles;
