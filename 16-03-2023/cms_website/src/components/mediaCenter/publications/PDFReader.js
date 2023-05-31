import React, { memo } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { TextDirection } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import ar_AE from "@react-pdf-viewer/locales/lib/ar_AE.json";

function PDFReader({ fileUrl }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const defaultPageNavigationPlugin = pageNavigationPlugin();
  return (
    <Viewer
      fileUrl={fileUrl}
      localization={ar_AE}
      theme={{
        direction: TextDirection.RightToLeft,
      }}
      plugins={[defaultLayoutPluginInstance, defaultPageNavigationPlugin]}
    />
  );
}

export default memo(PDFReader);
