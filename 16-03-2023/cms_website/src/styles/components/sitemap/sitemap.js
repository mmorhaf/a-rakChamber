import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    textAlign: "start",

    "& div.navLink": {
      padding: 15,
      marginBottom: 20,

      "& > h2": {
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
        background: theme.globals.colors.white,
        borderRadius: "5px",
        height: 50,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: theme.globals.fontSize.m - 2,
        lineHeight: "25px",
        color: theme.palette.primary.main,
        marginBottom: 25,
      },

      "& div.childList": {
        "& div.navLinkChild": {
          marginBottom: 7,

          "& > a": {
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: theme.globals.fontSize.m - 2,
            lineHeight: "25px",
            color: theme.palette.primary.main,
            display: "flex",
            justifyContent: "flex-start",
            "&  svg.icon": {
              fontSize: theme.globals.fontSize.lg - 1,
              transform: theme.direction === "rtl" ? "rotate(180deg)" : "unset",
            },
          },

          "& div.childList": {
            marginLeft: 15,
            marginBottom: 10,
            marginTop: 5,

            "& div.navLinkChild": {
              marginBottom: 3,

              "& a": {
                fontFamily:
                  theme.direction === "rtl"
                    ? theme.globals.fontFamily.ar
                    : theme.globals.fontFamily.en,
                fontStyle: "normal",
                fontWeight: "400",
                fontSize: theme.globals.fontSize.s - 2,
                lineHeight: "22px",
                color: theme.palette.primary.main,

                "& svg.grandchild": {
                  fontSize: theme.globals.fontSize.md,
                },
              },
            },
          },
        },
      },
    },
  },
}));

export default useStyles;
