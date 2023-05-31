import { makeStyles } from "@material-ui/styles";

const usePaginationStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
    marginBottom: "30px",

    "& ul.MuiPagination-ul": {
      "& li:first-child button": {
        background: "transparent",
      },

      "& li:last-child button": {
        background: "transparent",
      },
    },

    "& li": {
      "& button.MuiPaginationItem-page": {
        borderRadius: "5px",
        background: theme.globals.colors.pollOuterBox,
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "600",
        fontSize: theme.globals.fontSize.s - 2,
        lineHeight: "19px",
        color: theme.palette.primary.main,
        boxSizing: "border-box",
        border: "none",
      },

      "& button.Mui-selected": {
        color: theme.globals.colors.white,
        boxShadow: "0px 1px 4px -2px #ccc",

        background: theme.palette.primary.main,
      },
    },
  },
}));

export default usePaginationStyles;
