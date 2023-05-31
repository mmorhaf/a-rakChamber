import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React from "react";
import { useSelector } from "react-redux";
import useStyles from "../styles/components/noTranslationPage/noTranslationPage";
import Grid from "@material-ui/core/Grid";
import MainImage from "../components/shared/mainImage/MainImage";
import UpperSection from "../components/shared/upperSection/UpperSection";

const NoTranslationPage = () => {
  const classes = useStyles();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  return (
    <Grid container>
      <Grid item xs={12}>
        <MainImage
          uuid={"/assets/images/default.jpg"}
          title={isRTL ? "الصفحة غير موجودة" : "Page Not Found"}
        />
      </Grid>
      <Container maxWidth="lg">
        <Box className={classes.content}>
          <span className={classes.sorry}>{isRTL ? "عذرا !" : "Sorry ! "}</span>

          <br />
          {isRTL
            ? " المحتوى غير متوفر بهذه اللغة !"
            : "Content is not available in This language !"}
        </Box>
      </Container>
    </Grid>
  );
};

export default NoTranslationPage;
