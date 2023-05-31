import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    marginBottom: "50px",
    height: "100%",
    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },
}));

export default useStyles;
