import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  listBox: {
    top: 36,
    right: 0,
    zIndex: 1500,
    boxShadow: "rgb(33 35 38 / 52%) 0px 10px 10px -10px",
    width: "100%",
    border: "1px solid #C4C4C4",
    position: "absolute!important",
    maxWidth: 372,
    minWidth: 259,
    background: "#fff",
    maxHeight: 257,
    borderRadius: 5,
    "& .MuiListItem-root": {
      display: "block",
    },
  },
  list: {
    overflow: "auto",
    height: 250,
    // zIndex: 3000,
    "&::-webkit-scrollbar": {
      width: "0.8em",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#263661",
      borderRadius: 6,
      border: "2px solid #f9f9ff",
    },
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#263661",
      borderRadius: 6,
      border: "2px solid #f9f9ff",
    },
    "& >li": {
      flexDirection: "column",
      borderBottom: "2px dashed #e5e5e5",
    },
    "& >li >a >ul": {
      padding: 0,
      borderBottom: "1px solid #C4C4C4",

      "& > li": {
        flexDirection: "column",
        alignItems: "flex-end",
      },
    },
    "& >li:last-child": {
      "& >ul": { borderBottom: "none" },
    },
  },
  date: {
    color: theme.palette.primary.main,
    fontSize: 12,
    textAlign: "end",
  },
  message: {
    color: "#666666",
    "& > span": {
      fontSize: "14px",
    },
  },
  links: {
    textDecoration: "none",
    color: "#1f627f",
  },
  center: {
    display: "flex",
    justifyContent: "center",
  },
}));
