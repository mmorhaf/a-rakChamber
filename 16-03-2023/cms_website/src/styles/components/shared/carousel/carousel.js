import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  sharedCarouselRoot: {
    marginBottom: "50px",
    marginTop: "50px",
    // width: 800,
    "& .carousel-indicators": {
      display: "none!important",
    },
    "& ol.carousel-indicators": {
      "& li": {
        width: "4px",
        height: "24px",
        opacity: "1",
        transform: "rotate(-90deg)",
        marginLeft: "unset",
        marginRight: "31px",
      },
      "& li.active": {
        backgroundColor: theme.palette.secondary.main,
      },
    },

    "& div.carousel-inner": {
      width: "34%",
      marginLeft: "auto",
      marginRight: "auto",
      [theme.breakpoints.down(1220)]: {
        width: "47%",
      },
      [theme.breakpoints.down(900)]: {
        width: "50%",
      },
      [theme.breakpoints.down(700)]: {
        width: "90%",
      },
      [theme.breakpoints.down(500)]: {
        width: "100%",
      },
      "& div.carousel-item": {
        height: "310px",
        // width: "400px",
        // [theme.breakpoints.down(700)]: {
        //   width: "500px",
        // },
        [theme.breakpoints.down(500)]: {
          width: "100%",
        },
        "& img": {
          height: "100%",
          marginRight: "auto",
          marginLeft: "auto",
          borderRadius: 5,
          objectFit: "cover",
        },
      },
    },
    "& a.carousel-control-prev": {
      left: theme.direction === "rtl" ? "inherit" : "-6%",
      [theme.breakpoints.down(700)]: {
        left: theme.direction === "rtl" ? "92%" : "-35px",
      },
    },
    "& a.carousel-control-next": {
      right: "-100px",
      [theme.breakpoints.down(700)]: {
        right: theme.direction === "rtl" ? "inherit" : "-27px",
      },
    },
    "& a.carousel-control-prev, & a.carousel-control-next": {
      [theme.breakpoints.down(500)]: {
        display: "none",
      },
      "& span.sr-only": {
        clip: "unset",
        width: "fit-content",
        height: "fit-content",

        "& svg": {
          color: "#000000",
          fontSize: theme.globals.fontSize.m,
        },
      },
    },
  },
}));

export default useStyles;
