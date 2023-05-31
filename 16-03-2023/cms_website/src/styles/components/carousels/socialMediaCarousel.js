import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",

    "& div.carousel-inner": {
      height: "90%",

      [theme.breakpoints.between(960, 1450)]: {
        maxWidth: "396px",
        marginLeft: "auto",
        marginRight: "auto",
      },

      "& div.carousel-item": {
        height: "100%",

        "& div.card": {
          height: "100%",
          border: "0",

          "& img": {
            alignSelf: "center",

            [theme.breakpoints.up(1250)]: {
              width: "76%",
              height: "auto",
            },

            [theme.breakpoints.down(1250)]: {
              width: "80%",
              height: "auto",
            },
          },

          "& div.card-body": {
            paddingBottom: "1px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",

            "& p": {
              marginBottom: "31px",
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "normal",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color: theme.palette.primary.main,
              paddingRight: "21px",
              paddingLeft: "19px",
              marginTop: "20px",
              overflow: "hidden",
              display: "-webkit-box",
              "-webkitLineClamp": 4,
              "-webkitBoxOrient": "vertical",

              [theme.breakpoints.down(960)]: {
                marginTop: "10px",
                marginBottom: "50px",
              },
            },

            "& button": {
              width: "115px",
              height: "33px",
              background: theme.globals.colors.white,
              border: `1px solid ${theme.globals.colors.textLight}`,
              borderRadius: "10px",
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",

              [theme.breakpoints.down(1250)]: {
                width: "110px",
                height: "35px",
                fontSize: theme.globals.fontSize.s - 2,
              },

              [theme.breakpoints.down(600)]: {
                width: "95px",
                height: "25px",
                borderRadius: "5px",
                padding: "0px 8px",
              },

              "& span.MuiButton-label": {
                fontWeight: "600",
                fontSize: theme.globals.fontSize.s,
                lineHeight: "22px",
                textAlign: "center",
                color: theme.globals.colors.textMed,
                textTransform: "capitalize",
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",

                [theme.breakpoints.down(600)]: {
                  fontSize: theme.globals.fontSize.s - 2,
                },
              },
            },

            "& button:hover": {
              backgroundImage: "url(/assets/images/home/btn.png)",
              backgroundSize: "cover",
              transition: "all 2s",

              "& span.MuiButton-label": {
                color: theme.globals.colors.white,
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
              },
            },
          },
        },
      },
    },

    "& a.carousel-control-prev": {
      left: "-10px",
      bottom: "120px",

      "& span": {
        filter: "invert(1)",
        width: "10px",
        height: "14px",
      },
    },

    "& a.carousel-control-next": {
      right: "-10px",
      bottom: "120px",

      "& span": {
        filter: "invert(1)",
        width: "10px",
        height: "14px",
      },
    },
  },
}));

export default useStyles;
