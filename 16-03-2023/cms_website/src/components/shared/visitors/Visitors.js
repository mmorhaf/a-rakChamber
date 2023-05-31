import React from "react";
import Box from "@material-ui/core/Box";
import { useTranslation } from "react-i18next";

function Visitors() {
  const { t } = useTranslation();

  return (
    <Box component="span" className="visitors">
      {t("VISITORS")}: 5000
    </Box>
  );
}

export default Visitors;
