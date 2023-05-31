import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 49,
    background: `${theme.globals.colors.white}B3`,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",

    [theme.breakpoints.down(600)]: {
      width: 40,
    },

    "& button.MuiButtonGroup-groupedContainedHorizontal:not(:last-child)": {
      borderRight: "unset",
    },

    "& button": {
      height: 52,
      borderRadius: 0,
      background: "transparent",
      padding: "6px 10px",

      [theme.breakpoints.down(600)]: {
        height: 40,
      },

      "& img": {
        transform: "scale(1)",
        transition: "transform 0.4s",
      },

      "&:hover": {
        background: "transparent",
        boxShadow: "unset",

        "& img": {
          transform: "scale(1.5)",
        },
      },
    },
  },
}));

export default useStyles;
