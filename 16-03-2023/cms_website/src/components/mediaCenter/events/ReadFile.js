import { Box, Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../styles/components/mediaCenter/readPublication";
import MainImage from "../../shared/mainImage/MainImage";
import PDFReader from "../publications/PDFReader";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import ar_AE from "@react-pdf-viewer/locales/lib/ar_AE.json";

const ReadFile = ({ match }) => {
  const { uuid } = match.params;
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const classes = useStyles();
  return (
    <Box>
      <Grid item xs={12}>
        <MainImage
          uuid={askingForRatingReturned?.pagePicture?.uuid}
          title={isRTL ? "ملف الفعالية" : "Event File"}
          link="/media/events"
        />
      </Grid>
      {/* <Container className={classes.root}>
        <Grid item xs={12} className={classes.pdfBox}>
          {uuid ? (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <PDFReader fileUrl={`/api/file/download/${uuid}`} />
            </Worker>
          ) : (
            <Typography variant="p" className={classes.description}>
              {isRTL ? "لا يجد ملف لعرضه" : "There is No File to Show"}
            </Typography>
          )}
        </Grid>
      </Container> */}
      {uuid ? (
        <Container className={classes.root}>
          <Grid container>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Grid container className={classes.pdfViewrRoot}>
                <Viewer
                  fileUrl={`/api/file/download/${uuid}`}
                  plugins={[defaultLayoutPluginInstance]}
                  localization={ar_AE}
                  theme={{
                    direction: isRTL ? "rtl" : "ltr",
                  }}
                />
              </Grid>
            </Worker>
          </Grid>
        </Container>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default memo(ReadFile);
