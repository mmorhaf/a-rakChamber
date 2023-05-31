import React, { memo } from "react";
import Box from "@material-ui/core/Box";
import useStyles from "../../../styles/components/header/headerLogo";

function HeaderLogo({ uuid }) {
  const classes = useStyles();

  return (
    <Box className={classes.root} id="introLogo">
      <img alt="site logo" src={uuid} />
    </Box>
  );
}

export default memo(HeaderLogo);
