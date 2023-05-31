import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  dropZone: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "35px",
      height: "auto",
      border: "none",
      borderRadius: "8px",
      zIndex: 1,
      background: "none",
      border: `1px solid ${theme.globals.colors.grayBorder}`,
      "& .MuiDropzoneArea-textContainer": {
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        marginTop: "7px",
        // borderBottom: "1px solid #47799c",
        "&::before": {
          borderBottom: "2px solid red",
        },
        "& > svg": {
          color: theme.palette.secondary.main,
          margin: 0,
        },
      },
      "& .MuiDropzoneArea-text": {
        marginTop: "0px",
        marginBottom: "0px",
        fontSize: `${theme.globals.fontSize.s - 2}px!important`,
        // fontSize: "14px!important",
        fontWeight: "400",
        color: "#22293D80",
        [theme.breakpoints.down(350)]: {
          fontSize: `${theme.globals.fontSize.s - 6}px!important`,
        },
      },
      "& .MuiDropzoneArea-icon": {
        right: "-5px",
        height: "26px",
        color: "#9C9C9C",
        position: "absolute",
        marginRight: "-10px",
      },
      "& .MuiGrid-spacing-xs-8 > .MuiGrid-item": {
        padding: "10px",
        "& .MuiDropzonePreviewList-removeButton": {
          backgroundColor: "white",
          color: "rgba(144,8,8,1)",
        },
        "&:hover": {
          "& .MuiDropzonePreviewList-removeButton": {
            right: "14px",
          },
          "& .MuiSvgIcon-root": {
            marginRight: "0px!important",
            marginLeft: "0px!important",
          },
        },
        "& .MuiDropzonePreviewList-image": {
          height: "70px",
          width: "110px",
        },
      },
      "& .MuiGrid-spacing-xs-8": {
        width: "100%",
        margin: "0px",
      },
      "&:focus": {
        outline: "none!important",
        // border: "0.5px solid #1f627f!important",
      },
    },
    "& .MuiTypography-root": {
      color: "#9C9C9C",
      marginTop: 0,
      fontWeight: "400!important",
      marginBottom: 0,
      padding: "6px",
      // overflowWrap: "anywhere",
      // display: "-webkit-box",
      // WebkitBoxOrient: "vertical",
      // WebkitLineClamp: 2,
      // overflow: "hidden",
    },
  },
  widtherFileName: {
    "& > .MuiGrid-root > .MuiDropzoneArea-root > .MuiDropzonePreviewList-root >.MuiDropzonePreviewList-imageContainer":
      {
        maxWidth: "60%!important",
        flexBasis: "60%!important",
        "& > .MuiTypography-root ": {
          textOverflow: "ellipsis",
          maxWidth: "100%",
          overflow: "hidden",
          paddingBottom: "0px!important",
          textOverflow: "ellipsis",
          padding: "3px",
          paddingBottom: "0px",
          display: "-webkit-box",
          overflow: "hidden",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "1",
          textOverflow: "ellipsis",
        },
      },
  },
  floatHelperText: {
    position: "absolute",
    left: 0,
    // top: 30,
    // [theme.breakpoints.down(600)]: {
    //   top: 65,
    // },
  },
  previewIcon: {
    fontSize: 75,
    padding: 14,
    boxShadow: "-20px 0px 20px 8px rgb(0 0 0 / 5%)",
    color: theme.palette.primary.main,
  },
  bigDropZone: {
    "&.MuiDropzoneArea-root": {
      marginTop: 15,
    },
  },
  icon: {
    color: theme.palette.primary.main,
    marginTop: 10,
  },
  helperText: {
    color: theme.globals.colors.textGeneral,
    fontSize: theme.globals.fontSize.s - 3,
    [theme.breakpoints.down(450)]: {
      fontSize: theme.globals.fontSize.xs - 1,
    },
  },
  flex: {
    display: "flex",
  },
}));

export default useStyles;
