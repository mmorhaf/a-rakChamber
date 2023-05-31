import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "50px",
    paddingTop: "100px",
    marginRight: "auto",
    marginLeft: "auto",

    [theme.breakpoints.down(1300)]: {
      position: "relative",
    },

    [theme.breakpoints.down(960)]: {
      width: "100%",
    },
  },

  // bcrumbRatingRoot: {
  //   height: "30px",
  //   marginBottom: "20px",

  //   "& div.bcrContainer": {
  //     display: "flex",
  //     width: "90%",
  //     marginRight: "auto",
  //     marginLeft: "auto",
  //     height: "100%",
  //     justifyContent: "space-between",

  //     "& div.breadCrumb": {
  //       display: "flex",
  //       justifyContent: "space-between",

  //       "& nav": {
  //         display: "flex",
  //         alignItems: "center",
  //         textTransform: "capitalize",

  //         [theme.breakpoints.down(960)]: {
  //           width: "90%",
  //           marginRight: "auto",
  //           marginLeft: "auto",
  //         },

  //         "& ol li:nth-child(odd) a": {
  //           fontFamily:
  //             theme.direction === "rtl"
  //               ? theme.globals.fontFamily.ar
  //               : theme.globals.fontFamily.en,
  //           fontStyle: "normal",
  //           fontWeight: "600",
  //           fontSize: theme.globals.fontSize.s - 2,
  //           lineHeight: "19px",
  //           color: theme.palette.primary.main,
  //         },

  //         "& ol li:nth-child(odd) p": {
  //           fontFamily:
  //             theme.direction === "rtl"
  //               ? theme.globals.fontFamily.ar
  //               : theme.globals.fontFamily.en,
  //           fontStyle: "normal",
  //           fontWeight: "600",
  //           fontSize: theme.globals.fontSize.s - 2,
  //           lineHeight: "19px",
  //           color: theme.palette.primary.main,
  //         },

  //         "& ol li:nth-child(even) ": {
  //           color: theme.palette.secondary.main,
  //         },
  //       },
  //     },

  //     "& div.ratingNBtns": {
  //       display: "flex",
  //       justifyContent: "space-between",

  //       "& div.rtaing": {
  //         display: "flex",
  //         width: "220px",
  //         marginRight: "15px",
  //         justifyContent: "space-between",

  //         "& h2.rateTitle": {
  //           display: "flex",
  //           alignItems: "center",
  //           fontFamily:
  //             theme.direction === "rtl"
  //               ? theme.globals.fontFamily.ar
  //               : theme.globals.fontFamily.en,
  //           fontStyle: "normal",
  //           fontWeight: "normal",
  //           fontSize: theme.globals.fontSize.xs + 2,
  //           lineHeight: "19px",
  //           color: theme.palette.primary.main,
  //         },

  //         "& span.MuiRating-root": {
  //           width: "110px",
  //           justifyContent: "space-between",
  //           alignItems: "center",

  //           "& label": {
  //             marginBottom: 0,

  //             "& svg": {
  //               width: "20px",
  //               height: "20px",
  //             },
  //           },
  //         },
  //       },

  //       "& div.btns": {
  //         "& div.MuiButtonGroup-groupedContainedPrimary:not(:last-child)": {
  //           borderColor: "transparent",
  //         },

  //         "& div.MuiButtonGroup-root": {
  //           height: "25px",

  //           "& > div": {
  //             zIndex: 1000,

  //             "& ul li": {
  //               paddingTop: 0,
  //               paddingBottom: 0,

  //               "& button": {
  //                 "&:hover": {
  //                   backgroundColor: "transparent",
  //                 },

  //                 "& span.MuiButton-label": {
  //                   "& svg": {
  //                     width: "30px",
  //                     height: "30px",
  //                   },
  //                 },
  //               },
  //             },
  //           },

  //           "& button": {
  //             "& span.MuiButton-label": {
  //               "& svg": {
  //                 width: "17px",
  //                 height: "17px",
  //               },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },

  // sidebarSmallRoot: {
  //   position: "absolute",
  //   top: "75px",
  //   width: "85%",
  //   maxWidth: "350px",
  //   zIndex: "1000",
  //   background: theme.palette.primary.main,
  //   borderRadius: "0px 10px 10px 0px",

  //   [theme.breakpoints.up(1300)]: {
  //     display: "none",
  //   },

  //   "& div.sidebarLinks": {
  //     boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
  //     width: "100%",
  //     height: "fit-content",
  //     paddingLeft: "15px",
  //     paddingRight: "15px",
  //     paddingTop: "10px",
  //     paddingBottom: "5px",
  //     borderRadius: "0px 10px 10px 0px",
  //     textAlign: "start",

  //     "& h1.smallScr": {
  //       height: "33px",
  //       marginBottom: "8px",
  //       fontFamily:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontFamily.ar
  //           : theme.globals.fontFamily.en,
  //       fontStyle: "normal",
  //       fontWeight: "bold",
  //       fontSize:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontSize.m + 1
  //           : theme.globals.fontSize.m,
  //       lineHeight: "27px",
  //       color: theme.globals.colors.white,
  //       cursor: "pointer",

  //       "& svg": {
  //         float: "right",
  //       },
  //     },

  //     "& h1:not( h1.smallScr)": {
  //       display: "none",
  //     },

  //     "& nav": {
  //       display: "block",

  //       "& > div": {
  //         paddingLeft: "12px",
  //         boxShadow: `inset 3px 0 ${theme.palette.secondary.main}`,
  //         position: "static",
  //         fontFamily:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontFamily.ar
  //             : theme.globals.fontFamily.en,
  //         fontStyle: "normal",
  //         fontWeight: "600",
  //         fontSize:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontSize.s + 2
  //             : theme.globals.fontSize.s,
  //         lineHeight: "25px",
  //         color: theme.globals.colors.white,
  //         marginBottom: "10px",
  //       },

  //       "& a": {
  //         textDecoration: "none",

  //         "& div.MuiListItemText-root": {
  //           borderRadius: "5px",
  //           paddingLeft: "10px",
  //         },

  //         "& div:hover": {
  //           background: theme.globals.colors.darkPrimary,
  //         },

  //         "& div": {
  //           paddingLeft: "0",
  //           paddingTop: "0",
  //           paddingBottom: "0",
  //           "& span": {
  //             fontFamily:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontFamily.ar
  //                 : theme.globals.fontFamily.en,
  //             fontStyle: "normal",
  //             fontWeight: "normal",
  //             fontSize:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontSize.s + 1
  //                 : theme.globals.fontSize.s,
  //             lineHeight: "208.69%",
  //             color: theme.globals.colors.white,
  //           },
  //         },
  //       },

  //       "& a div.MuiListItem-root.Mui-selected": {
  //         backgroundColor: "unset",
  //         "& span": {
  //           color: theme.palette.secondary.main,
  //         },
  //       },

  //       "& a div.MuiListItem-root:hover": {
  //         backgroundColor: "unset",
  //       },
  //     },
  //   },
  // },

  // sidebarLargeRoot: {
  //   width: "310px",
  //   flexBasis: "unset",

  //   [theme.breakpoints.down(1300)]: {
  //     display: "none",
  //   },

  //   "& div.sidebarLinks": {
  //     background: theme.globals.colors.white,
  //     boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
  //     width: "100%",
  //     height: "fit-content",
  //     paddingLeft: "15px",
  //     paddingRight: "15px",
  //     paddingTop: "10px",
  //     paddingBottom: "30px",
  //     borderRadius: "15px",

  //     "& h1": {
  //       marginBottom: "25px",
  //       fontFamily:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontFamily.ar
  //           : theme.globals.fontFamily.en,
  //       fontStyle: "normal",
  //       fontWeight: "800",
  //       fontSize: theme.globals.fontSize.xl + 14,

  //       color: theme.palette.primary.main,
  //       textAlign: "start",
  //     },

  //     "& nav": {
  //       "& > div": {
  //         paddingLeft: "12px",
  //         boxShadow: `inset 3px 0 ${theme.palette.secondary.main}`,
  //         marginBottom: "15px",
  //         position: "static",
  //         fontFamily:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontFamily.ar
  //             : theme.globals.fontFamily.en,
  //         fontStyle: "normal",
  //         fontWeight: "600",
  //         fontSize:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontSize.m + 1
  //             : theme.globals.fontSize.m - 2,
  //         lineHeight: "25px",
  //         color: theme.palette.primary.main,
  //         textAlign: "start",
  //       },

  //       "& a": {
  //         textDecoration: "none",

  //         "& div": {
  //           paddingLeft: "0",
  //           paddingTop: "0",
  //           paddingBottom: "0",
  //           "& span": {
  //             fontFamily:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontFamily.ar
  //                 : theme.globals.fontFamily.en,
  //             fontStyle: "normal",
  //             fontWeight: "normal",
  //             fontSize:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontSize.m - 2
  //                 : theme.globals.fontSize.s,
  //             lineHeight: "208.69%",
  //             color: theme.palette.primary.main,
  //           },
  //         },
  //       },

  //       "& a div.MuiListItem-root.Mui-selected": {
  //         backgroundColor: "unset",
  //         "& span": {
  //           color: theme.palette.secondary.main,
  //         },
  //       },

  //       "& a div.MuiListItem-root:hover": {
  //         backgroundColor: "unset",
  //       },
  //     },
  //   },

  //   "& div.adSection.large": {
  //     width: "310px",
  //     borderRadius: "15px",
  //     background: theme.globals.colors.white,
  //     boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
  //     paddingLeft: "15px",
  //     paddingRight: "15px",
  //     marginTop: "50px",
  //     paddingTop: "25px",
  //     paddingBottom: "20px",
  //     textAlign: "start",

  //     [theme.breakpoints.between(1300, 1600)]: {
  //       width: "100%",
  //     },

  //     [theme.breakpoints.down(1300)]: {
  //       display: "none",
  //     },

  //     "& div": {
  //       "& h1": {
  //         fontFamily:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontFamily.ar
  //             : theme.globals.fontFamily.en,
  //         fontStyle: "normal",
  //         fontWeight: "600",
  //         fontSize:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontSize.m - 1
  //             : theme.globals.fontSize.m - 2,
  //         lineHeight: "25px",
  //         color: theme.palette.primary.main,
  //         boxShadow: `inset 3px 0 ${theme.palette.secondary.main}`,
  //         paddingLeft: "12px",
  //         marginBottom: "20px",
  //         textAlign: "start",
  //       },

  //       "& p": {
  //         width: "90%",
  //         display: "block",
  //         marginRight: "auto",
  //         marginLeft: "auto",
  //         fontFamily:
  //           theme.direction === "rtl"
  //             ? theme.globals.fontFamily.ar
  //             : theme.globals.fontFamily.en,
  //         fontStyle: "normal",
  //         fontWeight: "normal",
  //         fontSize: theme.globals.fontSize.s - 2,
  //         lineHeight: "19px",
  //         color: theme.palette.primary.main,
  //       },

  //       "& div.imgContainer": {
  //         width: "90%",
  //         marginRight: "auto",
  //         marginLeft: "auto",
  //         marginTop: "25px",
  //       },

  //       "& div.btnContainer": {
  //         marginTop: "25px",
  //         display: "flex",
  //         justifyContent: "center",

  //         "& button": {
  //           height: "35px",
  //           width: "152px",
  //           borderRadius: 10,
  //           border: `1px solid ${theme.palette.secondary.main}`,
  //           textTransform: "capitalize",

  //           "& span": {
  //             fontFamily:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontFamily.ar
  //                 : theme.globals.fontFamily.en,
  //             fontStyle: "normal",
  //             fontWeight: "500",
  //             fontSize:
  //               theme.direction === "rtl"
  //                 ? theme.globals.fontSize.m
  //                 : theme.globals.fontSize.s,
  //             lineHeight: "19px",
  //             textAlign: "center",
  //             color: theme.palette.primary.main,
  //           },
  //         },
  //       },
  //     },
  //   },
  // },

  // adSectionSmall: {
  //   [theme.breakpoints.up(1300)]: {
  //     display: "none",
  //   },

  //   width: "310px",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   borderRadius: "15px",
  //   background: theme.globals.colors.white,
  //   boxShadow: "0px 4px 20px rgb(0 0 0 / 10%)",
  //   paddingLeft: "15px",
  //   paddingRight: "15px",
  //   marginTop: "50px",
  //   paddingTop: "25px",
  //   paddingBottom: "20px",
  //   textAlign: "start",

  //   [theme.breakpoints.between(1230, 1280)]: {
  //     width: "350px",
  //   },

  //   "& div": {
  //     "& h1": {
  //       fontFamily:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontFamily.ar
  //           : theme.globals.fontFamily.en,
  //       fontStyle: "normal",
  //       fontWeight: "600",
  //       fontSize:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontSize.m - 1
  //           : theme.globals.fontSize.m - 2,
  //       lineHeight: "25px",
  //       color: theme.palette.primary.main,
  //       boxShadow: `inset 3px 0 ${theme.palette.secondary.main}`,
  //       paddingLeft: "12px",
  //       marginBottom: "20px",
  //       textAlign: "start",
  //     },

  //     "& p": {
  //       width: "90%",
  //       display: "block",
  //       marginRight: "auto",
  //       marginLeft: "auto",
  //       fontFamily:
  //         theme.direction === "rtl"
  //           ? theme.globals.fontFamily.ar
  //           : theme.globals.fontFamily.en,
  //       fontStyle: "normal",
  //       fontWeight: "normal",
  //       fontSize: theme.globals.fontSize.s - 2,
  //       lineHeight: "19px",
  //       color: theme.palette.primary.main,
  //     },

  //     "& div.imgContainer": {
  //       width: "90%",
  //       marginRight: "auto",
  //       marginLeft: "auto",
  //       marginTop: "25px",
  //     },

  //     "& div.btnContainer": {
  //       marginTop: "25px",
  //       display: "flex",
  //       justifyContent: "center",

  //       "& button": {
  //         height: "35px",
  //         width: "152px",
  //         borderRadius: "5px",
  //         border: `1px solid ${theme.palette.secondary.main}`,
  //         textTransform: "capitalize",

  //         "& span": {
  //           fontFamily:
  //             theme.direction === "rtl"
  //               ? theme.globals.fontFamily.ar
  //               : theme.globals.fontFamily.en,
  //           fontStyle: "normal",
  //           fontWeight: "500",
  //           fontSize:
  //             theme.direction === "rtl"
  //               ? theme.globals.fontSize.m
  //               : theme.globals.fontSize.s,
  //           lineHeight: "19px",
  //           textAlign: "center",
  //           color: theme.palette.primary.main,
  //         },
  //       },
  //     },
  //   },
  // },

  routing: {
    [theme.breakpoints.between(1280, 1300)]: {
      width: "100%",
      maxWidth: "unset",
      flexBasis: "unset",
    },
  },
}));

export default useStyles;
