import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    pointerEvents: "none",

    "& div.MuiPaper-root": {
      padding: theme.spacing(3),
      border: `4px solid ${theme.palette.secondary.main}`,
      borderRadius: "13px!important",
      width: "100%",
      top: "95px !important",

      [theme.breakpoints.down(900)]: {
        top: "42px !important",
      },

      [theme.breakpoints.down(600)]: {
        background: theme.palette.primary.main,
        border: `2px solid ${theme.palette.secondary.main}`,
        paddingTop: "40px",
        paddingBottom: 0,
      },
    },
  },
}));

export default useStyles;
