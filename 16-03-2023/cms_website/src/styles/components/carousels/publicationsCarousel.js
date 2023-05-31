import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    marginRight: "auto",
    marginLeft: "auto",

    [theme.breakpoints.down(1300)]: {
      width: "100%",
    },

    "& button.slick-prev": {
      left: 0,
    },
    "& div.slick-list": {
      direction: "ltr!important",

      "& div.slick-track": {
        direction: "ltr!important",

        "& div.slick-slide": {
          float: "left!important",

          // "& div.cardContainer": {
          //   paddingBottom: 20,
          //   flexBasis: "unset!important",
          //   flexGrow: "unset!important",

          //   "& div.card": {
          //     width: "100%",
          //     maxWidth: 345,
          //     marginRight: "auto",
          //     marginLeft: "auto",
          //     marginBottom: "20px",
          //     marginTop: "20px",
          //     height: "315px",
          //     background: theme.globals.colors.white,
          //     boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
          //     borderRadius: "10px",
          //     alignItems: "center",
          //     padding: "24px 0 0 0",
          //     border: "0",

          //     [theme.breakpoints.between(900, 1000)]: {
          //       width: "250px",
          //     },

          //     "& div.cardImage": {
          //       width: 152,
          //       marginLeft: "auto",
          //       marginRight: "auto",
          //       height: 150,
          //       backgroundPosition: "center",
          //       backgroundSize: "contain",
          //       backgroundRepeat: "no-repeat",
          //       flexBasis: "unset!important",
          //       flexGrow: "unset!important",
          //     },

          //     "& div.card-body": {
          //       display: "flex",
          //       flexWrap: "wrap",
          //       flexDirection: "column",
          //       padding: "17px",
          //       width: "100%",
          //       textAlign: "start",
          //       direction:
          //         theme.direction === "rtl" ? "rtl!important" : "ltr!important",

          //       "& h2": {
          //         fontFamily:
          //           theme.direction === "rtl"
          //             ? theme.globals.fontFamily.ar
          //             : theme.globals.fontFamily.en,
          //         fontStyle: "normal",
          //         fontWeight: "600",
          //         fontSize: theme.globals.fontSize.m - 2,
          //         lineHeight: "23px",
          //         textTransform: "capitalize",
          //         color: theme.globals.colors.textMed,
          //         overflow: "hidden",
          //         display: "-webkit-box",
          //         "-webkitLineClamp": 1,
          //         "-webkitBoxOrient": "vertical",
          //       },

          //       "& p": {
          //         fontFamily:
          //           theme.direction === "rtl"
          //             ? theme.globals.fontFamily.ar
          //             : theme.globals.fontFamily.en,
          //         fontStyle: "normal",
          //         fontWeight: "600",
          //         fontSize: theme.globals.fontSize.xs,
          //         lineHeight: "16px",
          //         textTransform: "capitalize",
          //         color: theme.globals.colors.textMed,
          //         overflow: "hidden",
          //         display: "-webkit-box",
          //         "-webkitLineClamp": 2,
          //         "-webkitBoxOrient": "vertical",
          //       },

          //       "& div.btnContainer": {
          //         display: "flex",
          //         justifyContent: "center",

          //         "& button": {
          //           height: 30,
          //           textTransform: "capitalize",
          //           justifyContent: "center",
          //           alignItems: "center",
          //           color: theme.palette.secondary.main,
          //           border: "1px solid",
          //           display: "flex",
          //           minWidth: 80,
          //           position: "relative",
          //           "&:hover": {
          //             backgroundImage: "url(/assets/images/home/btn.png)",

          //             "& span.MuiButton-label": {
          //               color: theme.globals.colors.white,
          //             },
          //           },
          //           "& .MuiButton-label": {
          //             width: "auto",
          //             fontFamily:
          //               theme.direction === "rtl"
          //                 ? theme.globals.fontFamily.ar
          //                 : theme.globals.fontFamily.en,
          //             fontStyle: "normal",
          //             fontWeight: "600",
          //             fontSize: theme.globals.fontSize.s - 2,
          //             lineHeight: "19px",
          //             textTransform: "capitalize",
          //             color: theme.palette.primary.main,
          //           },
          //         },
          //       },
          //     },
          //   },
          // },
        },
      },
    },
  },
}));

export default useStyles;
