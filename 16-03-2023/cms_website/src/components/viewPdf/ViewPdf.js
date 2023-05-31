import { Container, Box } from "@material-ui/core";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
import { default as React } from "react";
import { useParams } from "react-router";
import useStyles from "../../styles/components/viewPdf/viewPdf";
import MainImage from "../shared/mainImage/MainImage";
import { useTranslation } from "react-i18next";

const ViewPdf = () => {
  const item = useParams().uuid;
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box>
      <MainImage uuid={null} title={t("LABEL.VIEWPDF")} />
      <Container maxWidth="lg" className={classes.root}>
        {item ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer
              fileUrl={`/api/file/download/${item}`}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        ) : null}
      </Container>
    </Box>
  );
};

export default ViewPdf;
