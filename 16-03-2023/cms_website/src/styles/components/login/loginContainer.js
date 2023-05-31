import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: "1 1 auto",
    minHeight: " 75.5vh",
    marginTop: "112px",
    "& div.breadcrumbContainer": {
      marginBottom: "25px",
      marginTop: "5px",

      "& nav": {
        width: "80%",
        marginRight: "auto",
        marginLeft: "auto",
      },
    },
    "& div.hiddenOverflow": {
      overflowX: "hidden",
    },
    "& div.formContainer": {
      // display: "flex",
      position: "relative",
      alignItems: "center",
      background: "url('/assets/images/login.jpg')",
      width: "100%",
      backgroundSize: "cover",
    },
  },
}));

export default useStyles;
