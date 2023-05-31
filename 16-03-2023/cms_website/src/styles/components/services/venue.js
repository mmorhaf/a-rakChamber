import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: "30px",
    marginLeft: "30px",
    [theme.breakpoints.down(600)]: {
      marginLeft: "auto",
    },
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  title: {
    fontSize: theme.globals.fontSize.m - 4,
    color: "#000",
    position: "relative",
  },
  block: {
    display: "block",
  },
  square: {
    color: theme.palette.primary.main,
  },
  heading: {
    fontWeight: "700",
    fontSize: theme.globals.fontSize.m,
    color: theme.globals.colors.pollInnerBox,
    position: "relative",
  },
  accordionIcon: {
    color: "#bbb",
    fontSize: 35,
    padding: 4,
  },
  accordion: {
    boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
    paddingTop: "10px",
    borderRadius: "6px!important",
    "& .MuiCollapse-entered": {
      borderTop: "1px solid #bbb",
      borderTopWidth: "1px!important",
    },
    "& .MuiAccordionDetails-root": {
      display: "block",
      padding: "25px",
      paddingLeft: "40px!important",
    },
  },
  marginBottom30: {
    marginBottom: "30px",
  },
  blue: {
    paddingTop: 5,
    fontWeight: 600,
    fontSize: theme.globals.fontSize.xs + 2,
    color: theme.palette.primary.main,
  },
  gray: {
    fontWeight: 600,
    fontSize: theme.globals.fontSize.xs + 2,
    color: theme.globals.colors.textLight,
    textAlign: "start",
  },
  marginBottom20: {
    marginBottom: "20px",
  },
  paddingLeft37: {
    paddingLeft: "37px",
  },
  paddingLeft35: {
    paddingLeft: "35px",
  },
  marginLeft27: {
    marginLeft: "-27px",
  },
  marginLeft30: {
    marginLeft: "30px",
  },
  green: {
    color: theme.globals.colors.pollInnerBox,
  },
}));

export default useStyles;
