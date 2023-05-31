import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: "auto",
    marginLeft: "auto",

    "& div.strategic": {
      marginTop: "50px",
      "& div.content": {
        minHeight: "calc(100vh - 370px)",

        "& div.containerBox": {
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
        },

        "& div.outerBox": {
          width: "46px",
          height: "44px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: `1px solid ${theme.palette.secondary.main}`,

          "& div.iconContainer": {
            width: "37px",
            height: "35px",
            borderRadius: "50%",
            background: theme.palette.secondary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            "& svg": {
              fontSize: "20px",
              color: theme.globals.colors.white,
            },
          },
        },

        "& p.heading": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "600",
          fontSize: theme.globals.fontSize.s,
          lineHeight: "208.69%",
          color: theme.palette.secondary.main,
          marginLeft: "20px",
          marginRight: "20px",
        },

        "& p.description": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            theme.direction === "rtl"
              ? theme.globals.fontFamily.ar
              : theme.globals.fontFamily.en,
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: theme.globals.fontSize.s - 2,
          lineHeight: "19px",
          color: theme.palette.primary.main,
        },
      },

      "& div.block1": {
        marginTop: "50px",
      },

      "& div.block2": {
        marginTop: "50px",
        paddingLeft: "16px",

        "& ul": {
          listStyleType: "decimal",

          "& div.listItemContainer": {
            height: "55px",
            background: theme.globals.colors.white,
            boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.07)",
            borderRadius: "5px",
            marginBottom: "10px",
            display: "flex",

            "& div.leftRectangle": {
              position: "relative",
              background: theme.palette.primary.main,
              marginRight: "45px",
              width: "100px",
              height: "100%",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              "& svg": {
                color: theme.globals.colors.white,
                fontSize: "35px",
              },
            },

            "& div.leftRectangle::after": {
              content: "''",
              position: "absolute",
              top: "8px",
              right: "-19px",
              width: 0,
              height: 0,
              borderTop: `10px solid transparent`,
              borderBottom: `10px solid transparent`,
              borderLeft: `20px solid ${theme.palette.primary.main}`,
            },

            "& li": {
              fontFamily:
                theme.direction === "rtl"
                  ? theme.globals.fontFamily.ar
                  : theme.globals.fontFamily.en,
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: theme.globals.fontSize.s - 2,
              lineHeight: "19px",
              color: theme.palette.primary.main,
              marginTop: "5px",
            },
          },
        },
      },
    },
  },
  boxContainer: {
    borderTop: "1px solid #ccc",
  },
  box: {
    paddingTop: 16,
    display: "flex",
    "& .MuiBox-root": {
      marginRight: 20,
      display: "flex",
    },
  },
  marginTop5: {
    marginTop: 5,
    "& > span": {
      fontSize: 12,
      fontFamily:
        theme.direction === "rtl"
          ? theme.globals.fontFamily.ar
          : theme.globals.fontFamily.en,
    },
  },
  icon: {
    fontSize: 20,
    marginLeft: 10,
    cursor: "pointer",
  },
  pdfIcon: {
    height: 30,
    width: 20,
  },
  image: {
    width: "35px",
    height: "30px",
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
  },
  value: {
    marginLeft: "18px",
    color: "#263661",
    fontSize: 16,
    fontWeight: 800,
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
  },
  discription: {
    boxShadow: "0px 15px 19px -8px rgb(160 112 112 / 8%)",
    background: "white",
    marginBottom: "18px",
    paddingLeft: "57px !important",
    padding: "13px",
    borderRadius: "6px",
    fontSize: 14,
    color: "#444444",
    textAlign: "start",
    // wordBreak: "break-word",
    fontFamily:
      theme.direction === "rtl"
        ? theme.globals.fontFamily.ar
        : theme.globals.fontFamily.en,
    "& *": {
      fontFamily:
        theme.direction === "rtl"
          ? `${theme.globals.fontFamily.ar}!important`
          : `${theme.globals.fontFamily.en}!important`,
    },
  },
}));

export default useStyles;
