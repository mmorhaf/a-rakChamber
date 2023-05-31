import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  requestList: {
    "& table": {
      "& tbody": {
        "& tr": {
          "& td": {
            padding: "10px",

            "& .MuiFormControlLabel-root ": {
              marginBottom: 0,
              "& span": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                color: theme.palette.primary.main,
                fontSize: theme.globals.fontSize.xs,
              },
              "& span.Mui-disabled": {
                color: "#00000042 !important",
              },
              "& span.Mui-disabled span": {
                color: "#00000042 !important",
              },
              "& .MuiCheckbox-colorSecondary.Mui-checked span": {
                color: "#aaa",
              },
            },
          },
        },
      },
    },
  },
  tableTitle: {
    padding: "8px",
    margin: "8px 0",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    textAlign: "start",
    "& .refreshBtn": {
      backgroundColor: "#d4d4d4",
      margin: "0 8px",
      fontSize: "17px",
    },
  },
  btnFilter: {
    backgroundColor: "#5b8fca",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    color: "#fff",
    padding: "0px 8px",
    margin: "0px 8px",
    textTransform: "capitalize",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#5b8fca",
      border: "1px solid #5b8fca",
    },
  },
  statusBox: {
    color: "#fff",
    padding: "2px ",
    textAlign: "center",
    borderRadius: " 5px",
    fontWeight: 500,
    width: "max-content",
    fontSize: 12,
    width: 75,
    margin: "2px 0px",
  },
  replyDialog: {
    "& p": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .label1": { color: "#fcc100 " },
    "& .label2": {
      color: theme.palette.secondary.main,
      fontWeight: 600,
      paddingBottom: "8px",
      borderBottom: `2px dashed #e5e5e5`,
    },
    "& .label3": { paddingTop: "8px", color: theme.palette.primary.main },
    "& .dialogRow": {
      padding: "16px 0px",
    },
    "& .dialogHead": {
      "& h2": {
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "2px dashed #ccc",
        paddingBottom: "8px",
        alignItems: "center",
      },
      "& img": { width: "50px" },
    },
    "& button ,  & .MuiInput-root, & .MuiAlert-root": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  root: {
    width: "100%",
    boxShadow: "unset",
    backgroundColor: "unset",

    [theme.breakpoints.down(960)]: {
      // width: "95%",
      // marginRight: "auto",
      // marginLeft: "auto",
    },

    "& button.downloadBtn": {
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: theme.globals.fontSize.s - 2,
      lineHeight: "19px",
      color: theme.palette.secondary.main,
      border: `1px solid ${theme.palette.secondary.main}`,
      boxSizing: "border-box",
      borderRadius: "3px",
      marginBottom: "15px",
      textTransform: "capitalize",
    },

    "& table": {
      "& img": { width: "30px" },
      "& svg.icon": {
        color: theme.palette.primary.main,
        fontSize: theme.globals.fontSize.lg,
      },

      "& svg.comment": {
        color: theme.palette.primary.main,
        fontSize: theme.globals.fontSize.lg - 2,
      },

      "& span.MuiRating-icon svg": {
        fontSize: "20px",
      },

      "& span.MuiRating-iconFilled svg": {
        color: "#BC9738",
      },

      "& thead": {
        background: theme.globals.colors.pollOuterBox,

        "& th.MuiTableCell-root": {
          borderBottom: "0",

          "& button": {
            marginLeft: "auto",
            marginRight: "auto",

            "& span.MuiButton-label div": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              color: theme.palette.primary.main,
              fontSize: theme.globals.fontSize.xs,
            },
          },
        },

        "& th:first-of-type": {
          borderRadius: "4px 0px 0px 4px",
        },

        "& th:last-of-type": {
          borderRadius: "0 4px 4px 0",
        },

        "& tr th": {
          background: "unset",
          textAlign: "start",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontWeight: "600",
          color: theme.palette.primary.main,
          padding: "16px",
          "& span": {
            "& button": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "16px",
              color: "#444444",
              marginRight: "unset",
              marginLeft: "unset",
            },
          },
          "& div": { width: "max-content" },
        },
      },

      "& tbody": {
        "& tr": {
          "& td": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",

            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "16px",
            color:
              theme.palette.type === "dark"
                ? theme.globals.colors.white
                : theme.palette.textMed.main,
            textAlign: "start",

            "& > div": {
              display: "grid",
              placeItems: "center",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              color:
                theme.palette.type === "dark"
                  ? theme.globals.colors.white
                  : theme.palette.textMed.main,
              fontSize: theme.globals.fontSize.xs,
            },
          },

          "& td:nth-child(6), & td:nth-child(9)": {
            cursor: "pointer",

            "& div svg": {
              transform: "scale(1)",
              transition: "transform 0.4s",
            },

            "&:hover div svg": {
              transform: "scale(1.3)",
            },
          },
        },
      },
    },
  },

  news: {
    "& tbody": {
      "& tr": {
        "& td:nth-child(2)": {
          "& > div": {
            height: 40,
            width: 40,
            marginLeft: "auto",
            marginRight: "auto",
          },
        },

        "& td:nth-child(5)": {
          cursor: "pointer",

          "& div svg": {
            transform: "scale(1)",
            transition: "transform 0.4s",
          },

          "&:hover div svg": {
            transform: "scale(1.3)",
          },
        },
      },
    },
  },

  send: {
    fontSize: theme.globals.fontSize.s,
    color: theme.globals.colors.white,
    minWidth: 110,
    height: 34,
    padding: "0 16px",
    backgroundColor: theme.palette.primary.main,
    textTransform: "capitalize",
    borderRadius: 5,
    overflow: "hidden",
    margin: "0 0 0 auto",
    transition: "background-color 500ms cubic-bezier(0.215, 0.61, 0.355, 1)",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& .MuiButton-label": {
      transition: "color 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      color: "#fff",
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
    "& .MuiButton-endIcon": {
      position: "absolute",
      transition: "all 500ms  cubic-bezier(0.215, 0.61, 0.355, 1)",
      top: "50%",
      left: "0",
      right: "0",
      display: "flex",
      justifyContent: "center",
      margin: "0",
      padding: "0",
      listStyleType: "none",
      transform: "translateY(-175%)",
      width: "100%",
      "& svg": {
        fontSize: 26,
      },
    },
    "&:hover": {
      backgroundColor: "#fff",
      boxShadow: "none",
      border: "1px dashed #ccc",
      "& .MuiButton-label": {
        color: "#fff",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      "& .MuiButton-endIcon": {
        transform: "translateY(-50%)",
        color: theme.palette.primary.main,
      },
    },
  },
  serviceTitle: {
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    fontSize: theme.globals.fontSize.m,
    color: theme.palette.primary.main,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: theme.spacing(2),
  },
}));
