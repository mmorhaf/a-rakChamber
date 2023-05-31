import { makeStyles } from "@material-ui/styles";

const useCardStyles = makeStyles((theme) => ({
  root: {
    background: theme.globals.colors.white,
    boxShadow: "0px 11px 20px -12px rgba(0, 0 , 0 , 0.25)",
    borderRadius: 10,
    border: "unset",
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    transition: "all 400ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
    "&:hover": {
      background: theme.palette.primary.main,
      "& .MuiCardHeader-avatar": {
        transform: "scale(1.2)",
      },
      "& .MuiTypography-body2 , & .MuiAvatar-root": {
        color: `${theme.globals.colors.white}!important`,
      },
      "& .MuiDivider-root": {
        backgroundColor: theme.globals.colors.white,
      },
    },
    "& .disabledTitle .MuiCardHeader-content .MuiTypography-body2": {
      color: "#c4c4c4!important",
    },
    "& .MuiCardHeader-root": {
      flexDirection: "column",
      padding: "8px 16px",
      flex: "1 1 auto",

      "& .MuiTypography-body2": {
        color: theme.palette.primary.main,
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s - 2,
        textAlign: "center",
        textTransform: "capitalize",
        padding: theme.spacing(0.75, 0),
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 2,
        "-webkitBoxOrient": "vertical",
        height: 50,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiCardHeader-avatar": {
        marginRight: 0,
        transition: "all 600ms cubic-bezier(0.445, 0.05, 0.55, 0.95)",
        transform: "scale(1)",
        "& .MuiAvatar-fallback": {
          width: "30%",
          height: "auto",
        },
        "& .MuiAvatar-root": {
          color: "#e5e5e5",
          backgroundColor: "transparent",
          width: "auto",
          height: "auto",
          borderRadius: 0,
          fontSize: 65,
        },
      },
    },
    // [theme.breakpoints.down(520)]: {
    //   width: "300px",
    //   marginRight: "auto",
    //   marginLeft: "auto",
    // },

    "& div.MuiCardActions-root": {
      borderTop: "1px dashed #ccc",
      width: "75%",
      height: 45,
      padding: 0,
      margin: "auto",
      "& .MuiDivider-vertical": {
        height: "35%",
      },
      "& .disabledBtn": {
        borderRadius: 10,
        width: 30,
        height: 30,
        fontWeight: "600",
        fontSize: theme.globals.fontSize.m + 3,
        color: "#E4E4E4",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 0,
        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.palette.primary.main,
          color: "#E4E4E4",
        },
      },
      "& .startBtn": {
        borderRadius: 10,
        width: 30,
        height: 30,

        fontWeight: "600",
        fontSize: theme.globals.fontSize.m + 3,
        color: "#B2C900",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 0,

        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
        },
      },

      "& a.moreInfoBtn": {
        borderRadius: 10,
        width: 30,
        height: 30,
        marginRight: 0,

        fontSize: theme.globals.fontSize.s + 4,
        color: "#B2C900",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.palette.primary.main,
          color: "#fff",
        },
      },
    },
  },
}));

export default useCardStyles;
