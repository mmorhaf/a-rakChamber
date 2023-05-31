import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleList from "./List";
import { Fade, Dialog, Grid, Box } from "@material-ui/core";
import useStyles from "../../../styles/components/header/siteMap";
import { uid } from "react-uid";
import { MdClose } from "react-icons/md";

function SiteMap({ open, handleSiteMapClick, handleCloseSiteMap }) {
  const { menuReturned } = useSelector((state) => state.menu);

  const [data, setData] = useState([]);

  useEffect(() => {
    const returnedData = menuReturned || [];

    if (!returnedData.length) return;
    const data = returnedData.find((item) => item.title.en === "header");
    setData(data?.childrens);
  }, [menuReturned]);

  const classes = useStyles();

  return (
    <Dialog
      open={open}
      scroll="body"
      onClose={handleCloseSiteMap}
      aria-labelledby="simple-dialog-title"
      className={classes.root}
    >
      <Fade in={true} timeout={600}>
        <Grid container className="siteMapContainer">
          {data?.length &&
            data.map((item) => {
              return (
                <Grid
                  item
                  key={uid(item)}
                  xs={12}
                  sm={6}
                  md={3}
                  className="listContainer"
                >
                  <SingleList
                    item={item}
                    handleCloseSiteMap={handleCloseSiteMap}
                  />
                </Grid>
              );
            })}
          <Box
            component="span"
            className="closeBtn"
            onClick={handleCloseSiteMap}
          >
            <MdClose />
          </Box>
        </Grid>
      </Fade>
    </Dialog>
  );
}

export default memo(SiteMap);
