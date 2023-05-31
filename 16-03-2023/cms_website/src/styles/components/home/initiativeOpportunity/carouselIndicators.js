import { makeStyles } from "@material-ui/styles";

const useIndicatorsStyles = makeStyles((theme) => ({
  root: {
    "& button.slick-arrow:before": {
      content: "unset",
    },

    "& button.slick-arrow": {
      "& svg.MuiSvgIcon-root": {
        color: "#000",
        fontSize: "20px",
        [theme.breakpoints.up(900)]: {
          visibility: "hidden",
        },
      },
    },

    "& button.slick-next": {
      right: "-19px",
    },

    "& button.slick-prev": {
      left: "-13px",
    },

    "& ul.slick-dots": {
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr",
      width: "100%",
      right: "0",
      left: "0",
      textAlign: "start",
      display: "flex!important",
      justifyContent: "center",

      "& li": {
        background: theme.palette.primary.main,
        transform: "matrix(1, 0, 0, -1, 0, 0)",
        borderBottom: "unset",
        borderTop: "unset",
        opacity: "1",
        width: 30,
        height: 6,
        borderRadius: 0,

        "& button:before": {
          fontFamily: "unset",
          fontSize: "unset",
        },
      },

      "& li.slick-active": {
        background: theme.palette.secondary.main,
      },
    },
  },
}));

export default useIndicatorsStyles;
