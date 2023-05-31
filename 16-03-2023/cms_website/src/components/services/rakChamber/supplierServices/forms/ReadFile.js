import { Container, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../../../styles/components/mediaCenter/readPublication";
import PDFReader from "../../../../../components/mediaCenter/publications/PDFReader";

const ReadFile = ({ match }) => {
  const { uuid } = match.params;
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { askingForRatingReturned } = useSelector((state) => state.rate);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid item xs={12}>
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
    </Container>
  );
};

export default memo(ReadFile);
