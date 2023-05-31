import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

export default function CustomToolBar() {
  return (
    <Tooltip title="Download">
      <Button variant="outlined" className="downloadBtn">
        Download{" "}
      </Button>
    </Tooltip>
  );
}
