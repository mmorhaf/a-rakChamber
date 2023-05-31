import { makeStyles } from "@material-ui/styles";

const useCardStyles = makeStyles((theme) => ({
  cardContainer: {
    boxShadow: "unset!important",
  },
  card: {
    width: "100%",
    maxWidth: "345px",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "20px",
    marginTop: "20px",
    height: "330px",
    background: theme.globals.colors.white,
    boxShadow: "0px 0 18px rgb(0 0 0 / 8%)",
    borderRadius: "10px",
    alignItems: "center",
    padding: "24px 0 0 0",
    border: "0",

    [theme.breakpoints.between(900, 1000)]: {
      width: "250px",
    },

    "& div.cardImage": {
      width: "69%",
      height: 106,
      backgroundPosition: "center",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    },

    "& div.card-body": {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "end",
      height: "21%",
      padding: "17px",
      width: "100%",
      textAlign: "start",
      direction: theme.direction === "rtl" ? "rtl!important" : "ltr!important",

      "& a.link": {
        width: "100%",

        "& h2": {
          height: 48,
          width: "100%",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s + 2,
          lineHeight: "24px",
          textTransform: "capitalize",
          color: theme.globals.colors.textMed,
          textAlign: "center",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkitLineClamp": 2,
          "-webkitBoxOrient": "vertical",
        },
      },

      "& p": {
        width: "100%",
        fontFamily:
          theme.direction === "rtl"
            ? theme.globals.fontFamily.ar
            : theme.globals.fontFamily.en,
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: theme.globals.fontSize.xs,
        lineHeight: "16px",
        color: theme.palette.primary.main,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkitLineClamp": 2,
        "-webkitBoxOrient": "vertical",
      },

      "& div.btnContainer": {
        display: "flex",
        justifyContent: "center",

        "& button": {
          height: 30,
          textTransform: "capitalize",
          justifyContent: "center",
          alignItems: "center",
          color: theme.palette.secondary.main,
          border: "1px solid",
          display: "flex",
          minWidth: 80,
          position: "relative",
          "&:hover": {
            backgroundImage: "url(/assets/images/home/btn.png)",

            "& span.MuiButton-label": {
              color: theme.globals.colors.white,
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
            },
          },
          "& .MuiButton-label": {
            width: "auto",
            fontFamily:
              theme.direction === "rtl"
                ? theme.globals.fontFamily.ar
                : theme.globals.fontFamily.en,
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: theme.globals.fontSize.s - 2,
            lineHeight: "19px",
            textTransform: "capitalize",
            color: theme.palette.primary.main,
          },
        },
      },
    },
  },
}));

export default useCardStyles;
