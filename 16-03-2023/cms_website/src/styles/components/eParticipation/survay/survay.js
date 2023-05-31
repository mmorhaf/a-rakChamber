import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& div.sv_container": {
      "& div.sv_body": {
        padding: 0,
        border: "unset!important",
      },
    },
    "& .MuiContainer-root": {
      [theme.breakpoints.down(328)]: {
        padding: "5px !important",
        justifyContent: "center",
        alignItems: "center",
      },
    },
    "& div.contentContainer": {
      marginTop: "30px",
      marginBottom: "50px",

      "& div.title": {
        marginTop: "35px",
        marginBottom: "30px",
        textAlign: "start",

        "& h2": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: theme.globals.fontSize.m - 2,
          lineHeight: "25px",
          color: theme.palette.primary.main,
          marginBottom: "5px",

          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
        },

        "& span": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          color: theme.globals.colors.textLighter,
          display: "flex",
          "& .dateDirection": {
            display: "flex",
          },
        },
      },
    },

    "& div.actualSurvey": {
      "& .sv_main .sv_qstn textarea": {
        "&:focus": {
          borderColor: theme.palette.primary.main,
        },
      },

      "& .sv_q_required_text": {
        color: "red",
      },
      "& .sv_q sv_qstn": {
        "& div.div.sv_q_erbox sv_qstn_error_top": {
          margin: "0px !important",
        },
      },
      "& h5.sv_q_title": {
        borderBottom: `1px solid #DFDBD2`,
        padding: "10px",
        marginBottom: "23px!important",
        textTransform: "capitalize",

        "& span.sv-string-viewer, & span.sv_q_num": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "22px",
          color: theme.globals.colors.black,
          [theme.breakpoints.down(700)]: {
            fontSize: `${theme.globals.fontSize.xs + 2}px !important`,
          },
        },
      },

      "& .sv_main.sv_default_css .sv_q_rating_item.active .sv_q_rating_item_text":
        {
          backgroundColor: theme.palette.primary.main,
        },
      "& .sv_main.sv_default_css .sv_q_rating_item .sv_q_rating_item_text:hover":
        {
          border: `1px solid ${theme.palette.primary.main} !important`,
        },
      "& .sv_q_text_root:focus": {
        borderColor: `${theme.palette.primary.main}!important`,
      },

      "& .sv_main.sv_main .checked input": {
        accentColor: theme.palette.primary.main,
        color: "#fff",
        backgroundColor: theme.palette.primary.main,
        outline: "none!important",
      },
      "& .sv_main.sv_main .sv-boolean__switch": {
        backgroundColor: "#ccc",
        outlineColor: "#ccc",
      },

      "& .sv_main.sv_main .sv-boolean--checked .sv-boolean__switch": {
        backgroundColor: theme.palette.primary.main,
        outlineColor: theme.palette.primary.main,
      },

      "& .sv_main .sv_p_root .sv_q input[type=radio]": {
        outline: "none!important",
      },
      "& .sv_row .sv_qstn:last-child": {
        backgroundColor: "white",
      },

      "& div.sv_row": {
        background: "#FFFFFF",
        border: "1px solid #FFFFFF",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        marginBottom: "15px",
        margin: "0px",
      },
      "& .sv_main.sv_default_css .sv_container": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        color: theme.globals.colors.black,
        "& *": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          color: theme.globals.colors.black,
        },
      },
      "& div.sv_container": {
        "& div.sv_body": {
          padding: 0,
          border: "unset!important",
          backgroundColor: `${theme.globals.colors.white} !important`,
          "& .sv-action-bar ": {
            padding: "0px!important",
          },
        },
      },

      "& *": {
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
      },
      minHeight: "calc(100vh - 370px)",
      marginBottom: 50,
      textAlign: "start",
      "& div.sv_custom_header": {
        background: "none!important",
        width: "100%",
      },
      "& div.sv_header": {
        "& div.sv_header__text": {
          "& h3": {
            "& span.sv-string-viewer": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: theme.globals.fontSize.m - 2,
              lineHeight: "25px",
              color: theme.palette.primary.main,
              marginBottom: "5px",
              textTransform: "capitalize",
            },
          },

          "& h5 span.sv-string-viewer": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: "#444444",
          },
        },
      },

      "& div.sv_p_root": {
        "& h4.sv_page_title": {
          marginBottom: "0px!important",

          "& span.sv-string-viewer": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: `${theme.globals.fontSize.s + 1}px!important`,
            lineHeight: "36px",
            color: theme.palette.primary.main,
            textTransform: "capitalize",
            marginBottom: "0px!important",
          },
        },

        "& h4.sv_page_title + div span.sv-string-viewer": {
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: theme.globals.fontSize.m - 2,
          lineHeight: "36px",
          color: theme.palette.primary.main,
          marginBottom: "10px",
          display: "block",
        },
      },

      "& div.sv_row": {
        background: `${theme.globals.colors.white}!important`,
        border: `1px solid ${theme.globals.colors.white}`,
        boxSizing: "border-box",
        boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        marginBottom: "20px",

        "& div.sv_p_container": {
          padding: "0 1rem 0 1rem",
        },

        "& h4.sv_p_title": {
          marginBottom: "0px!important",
          paddingLeft: 0,

          "& span.sv-string-viewer": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: `${theme.globals.fontSize.s + 1}px!important`,
            lineHeight: "36px",
            color: theme.palette.primary.main,
            textTransform: "capitalize",
            marginBottom: "0px!important",
          },
        },

        "& div.sv_q.sv_qstn": {
          "& fieldset.sv_qcbc": {
            paddingLeft: 10,
          },

          "& div.sv_qcbc.sv_qbln": {
            paddingLeft: 10,
          },

          "& div.br-wrapper.br-theme-css-stars": {
            paddingLeft: 10,
          },
        },

        "& h5.sv_q_title": {
          borderBottom: `1px solid #DFDBD2`,
          padding: "10px",
          marginBottom: "23px!important",

          "& span.sv-string-viewer, & span.sv_q_num": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s,
            lineHeight: "22px",
            color: "#444444",
          },
        },

        "& table.sv_q_matrix": {
          "& span.sv-string-viewer": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: "#444444",
            textTransform: "capitalize",
          },
        },

        "& label.sv-boolean": {
          "& div.sv-boolean__switch": {
            backgroundColor: theme.palette.primary.main,
            outlineColor: theme.palette.primary.main,
          },

          "& span.sv-boolean__label span.sv-string-viewer": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            color: "#444444",
            textTransform: "capitalize",
          },
        },

        "&  fieldset.sv_qcbc": {
          "& div.sv_q_radiogroup": {
            "& label.sv_q_radiogroup_label": {
              "& input": {
                marginRight:
                  theme.direction === "rtl"
                    ? "0.55em!important"
                    : "0!important",
                marginLeft:
                  theme.direction === "rtl"
                    ? "0!important"
                    : "0.55em!important",
              },

              "& span.sv-string-viewer": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: "#444444",
                textTransform: "capitalize",
                marginLeft: "5px",
              },
            },
          },
        },

        "& fieldset.sv_qcbc.sv_qcbx": {
          paddingLeft: 10,

          "& div.sv_q_checkbox": {
            "& label": {
              "& span.sv_q_checkbox_control_label span.sv-string-viewer": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: "#444444",
                textTransform: "capitalize",
              },
            },
          },
        },

        "& div.sv_select_wrapper": {
          "&::before": {
            backgroundColor: theme.palette.primary.main,
          },

          "& select": {
            "& option": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s,
              lineHeight: "22px",
              color: "#444444",

              "&:hover": {
                backgroundColor: `${theme.palette.primary.main}!important`,
              },
            },
          },
        },

        "& div.sv-ranking": {
          "& div.sv-ranking-item__content": {
            "& div.sv-ranking-item__text": {
              "& span.sv-string-viewer": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "19px",
                color: "#444444",
                textTransform: "capitalize",
              },
            },
          },
        },
      },

      "& div.sv_nav": {
        display: "flex",
        justifyContent: "start",

        "& input": {
          display: "block",
          width: 115,
          height: 31,
          textTransform: "capitalize",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.primary.main,
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 5,
          background: "transparent!important",

          "&:hover": {
            backgroundImage: "url(/assets/images/home/btn.png)!important",
            color: "white",
          },
        },
      },
    },
  },
}));

export default useStyles;
