import { Box, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import { Field } from "formik";
import { DropzoneArea } from "material-ui-dropzone";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "react-tooltip/dist/react-tooltip.css";
import { BsChatSquareQuote } from "react-icons/bs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import ReactDOMServer from "react-dom/server";
import { makeStyles } from "@material-ui/core/styles";
import { CgAttachment } from "react-icons/cg";
import { useSelector } from "react-redux";
import useStyles from "../../../styles/components/shared/dropZone/dropZoneStyle";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.primary.main,
  },
  tooltip: {
    backgroundColor: theme.palette.primary.main,
  },
}));

// function BootstrapTooltip(props) {
//   const classes = useStylesBootstrap();

//   return <Tooltip arrow classes={classes} {...props} />;
// }
function DropZone(props) {
  let { noPreviewImg, classes, showImage } = props;

  const handlePreviewIcon = (fileObject) => {
    if (noPreviewImg) return null;
    else if (showImage) return <img src={fileObject?.data} />;
    else return <CgAttachment className={classes.previewIcon} />;
  };

  return props.initialFiles && props.initialFiles.length ? (
    <DropzoneArea
      acceptedFiles={props.acceptedFiles}
      dropzoneText={props.dropzoneText}
      onChange={props.handleChange}
      initialFiles={props.initialFiles}
      filesLimit={props.filesLimit}
      showFileNames={props.showFileNames}
      setFieldValue={props.binaryData}
      key={props.key}
      maxFileSize={props.maxFileSize ? props.maxFileSize : 30000000}
      Icon={props.Icon}
      onDrop={props.onDrop}
      getPreviewIcon={handlePreviewIcon}
    />
  ) : (
    <DropzoneArea
      acceptedFiles={props.acceptedFiles}
      dropzoneText={props.dropzoneText}
      onChange={props.handleChange}
      key={props.key}
      filesLimit={props.filesLimit}
      showFileNames={props.showFileNames}
      initialFiles={props.initialFiles}
      maxFileSize={props.maxFileSize ? props.maxFileSize : 30000000}
      setFieldValue={props.binaryData}
      Icon={props.Icon}
      onDrop={props.onDrop}
      getPreviewIcon={handlePreviewIcon}
    />
  );
}
export default function DropZoneWithFields(props) {
  const classes = useStyles();
  const { t } = useTranslation();
  let fieldProp = props.fieldProp;
  let { page, name, noPreviewImg, showImage } = props;
  const [fileSettings, setFileSettings] = useState({});
  const reducers = useSelector((state) => state);
  useEffect(() => {
    if (
      reducers?.crudReducers?.allReturned?.configurations &&
      reducers.crudReducers?.allReturned.configurations?.filter(
        (item) => item?.key === "FILE_CONFIG"
      )[0]?.value
    ) {
      setFileSettings(
        JSON.parse(
          reducers.crudReducers?.allReturned.configurations?.filter(
            (item) => item?.key === "FILE_CONFIG"
          )[0]?.value
        )
      );
    }
  }, [reducers]);

  return (
    <React.Fragment>
      <Grid
        container
        className={
          noPreviewImg
            ? clsx(
                classes.dropZone,
                classes.marginBottom20,
                classes.widtherFileName
              )
            : clsx(classes.dropZone, classes.marginBottom20)
        }
      >
        <Grid item xs={12}>
          <Field
            component={DropZone}
            handleChange={props.onChange}
            initialFiles={props.initialFiles}
            dropzoneText={props.dropzoneText}
            acceptedFiles={
              fileSettings &&
              `${page}-${props?.field?.name}` in fileSettings &&
              fileSettings[`${page}-${props?.field?.name}`]["allowed-type"]
                ? fileSettings[`${page}-${props?.field?.name}`]["allowed-type"]
                : props.acceptedFiles
            }
            filesLimit={props.filesLimit ? props.filesLimit : 10}
            showFileNames={props.showFileNames}
            Icon={props.Icon}
            noPreviewImg={noPreviewImg}
            showImage={showImage}
            classes={classes}
            maxFileSize={
              fileSettings &&
              fileSettings[`${page}-${props?.field?.name}`]?.maxSize
                ? fileSettings[`${page}-${props?.field?.name}`]?.maxSize
                : props?.maxFileSize
                ? props?.maxFileSize
                : 25000000
            }
            onDrop={props.onDrop}
          />
          {props.helperText && props.toolHelper ? (
            <p
              id="my-element"
              style={{ backgroundColor: "red!important" }}
              data-tooltip-html={ReactDOMServer.renderToString(
                <div className={classes.helperText}>
                  {t("HELPERTEXT.ALLOWEDEXTENSIONS")}
                  {`${page}-${props?.field?.name}` in fileSettings &&
                  fileSettings[`${page}-${props?.field?.name}`]["allowed-type"]
                    ? fileSettings[`${page}-${props?.field?.name}`][
                        "allowed-type"
                      ]
                    : props.acceptedFiles}{" "}
                  {t("HELPERTEXT.MAXFILESIZE")}{" "}
                  {fileSettings &&
                  fileSettings[`${page}-${props?.field?.name}`]?.maxSize
                    ? fileSettings[`${page}-${props?.field?.name}`]?.maxSize /
                      1000000
                    : props?.maxFileSize
                    ? props?.maxFileSize / 1000000
                    : 25}
                  {" MB"}
                </div>
              )}
            >
              <ReactTooltip anchorId="my-element" />
              <Box
                className={
                  noPreviewImg
                    ? clsx(
                        classes.flex,
                        classes.floatHelperText,
                        props.helperStyle
                      )
                    : classes.flex
                }
              >
                <BsChatSquareQuote className={classes.icon} />

                <Typography component="div" className={classes.helperText}>
                  {t("HELPERTEXT.ALLOWEDEXTENSIONS")}
                  {`${page}-${props?.field?.name}` in fileSettings &&
                  fileSettings[`${page}-${props?.field?.name}`]["allowed-type"]
                    ? fileSettings[`${page}-${props?.field?.name}`][
                        "allowed-type"
                      ]
                    : props.acceptedFiles}{" "}
                  {t("HELPERTEXT.MAXFILESIZE")}{" "}
                  {fileSettings &&
                  fileSettings[`${page}-${props?.field?.name}`]?.maxSize
                    ? fileSettings[`${page}-${props?.field?.name}`]?.maxSize /
                      1000000
                    : props?.maxFileSize
                    ? props?.maxFileSize / 1000000
                    : 25}
                  {" MB"}
                </Typography>
              </Box>
            </p>
          ) : props.helperText ? (
            <Box
              className={
                noPreviewImg
                  ? clsx(
                      classes.flex,
                      classes.floatHelperText,
                      props.helperStyle
                    )
                  : classes.flex
              }
            >
              <BsChatSquareQuote className={classes.icon} />

              <Typography component="div" className={classes.helperText}>
                {t("HELPERTEXT.ALLOWEDEXTENSIONS")}
                {`${page}-${props?.field?.name}` in fileSettings &&
                fileSettings[`${page}-${props?.field?.name}`]["allowed-type"]
                  ? fileSettings[`${page}-${props?.field?.name}`][
                      "allowed-type"
                    ]
                  : props.acceptedFiles}{" "}
                {t("HELPERTEXT.MAXFILESIZE")}{" "}
                {fileSettings &&
                fileSettings[`${page}-${props?.field?.name}`]?.maxSize
                  ? fileSettings[`${page}-${props?.field?.name}`]?.maxSize /
                    1000000
                  : props?.maxFileSize
                  ? props?.maxFileSize / 1000000
                  : 25}
                {" MB"}
              </Typography>
            </Box>
          ) : null}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
