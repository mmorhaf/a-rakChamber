import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles/components/error404/error404";
import Grid from "@material-ui/core/Grid";
const Error404 = () => {
  const classes = useStyles();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  return (
    <>
      <Box className={classes.blueBox} />
      <Container className={classes.root}>
        <Grid container>
          <Grid
            item
            md={5}
            sm={8}
            xs={8}
            className={classes.notFoundContentBox}
          >
            <h1 className={classes.errorHeader}>
              {isRTL ? "عذرا !" : "SORRY!"}
            </h1>
            <Box variant="span" className={classes.errorMessage}>
              {isRTL ? "الصفحة التي تبحث عنها " : "The Page You Are Looking"}
              <br /> <br />
              {isRTL ? "غير موجودة" : "For Doesn't Exist"}.
            </Box>
            <Button
              href="/home"
              variant="contained"
              className={classes.errorRedirectingBtn}
            >
              {isRTL ? "الرئيسية" : "Home"}
            </Button>
            <Button
              href="/contactus/contactus"
              variant="contained"
              className={classes.errorRedirectingBtn}
            >
              {isRTL ? "تواصل معنا" : "Contact Us"}
            </Button>
          </Grid>
          <Grid item md={7} sm={4} xs={4} className={classes.pageNotFound}>
            <h1 className={classes.gold}>404</h1>
            <Box variant="span" className={classes.errorMessage}>
              {isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Error404;
