import React, { memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useStyles from "../../../styles/components/home/common/tabs";
import { useTranslation } from "react-i18next";
const NewsSlider = lazy(() => import("../carousels/NewsSlider"));
const PhotosCarousel = lazy(() => import("../carousels/PhotosCarousel"));
const VideosGallery = lazy(() => import("../carousels/VideosGallery"));
const PublicationsCarousel = lazy(() =>
  import("../carousels/PublicationsCarousel")
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { t } = useTranslation();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MediaCenterTabs() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="media center tabs"
        >
          <Tab label={t("HOME.MEDIA.TABS.NEWS")} {...a11yProps(0)} />
          <Tab label={t("HOME.MEDIA.TABS.PHOTOS")} {...a11yProps(1)} />
          <Tab label={t("HOME.MEDIA.TABS.VIDEOS")} {...a11yProps(2)} />
          <Tab label={t("HOME.MEDIA.TABS.PUPLICATIONS")} {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <Suspense fallback={<div className="loading..." />}>
        <TabPanel value={value} index={0} className="newsTab">
          <NewsSlider />
        </TabPanel>
        <TabPanel value={value} index={1} className="photosTab">
          <PhotosCarousel />
        </TabPanel>
        <TabPanel value={value} index={2} className="videosTab">
          <VideosGallery />
        </TabPanel>
        <TabPanel value={value} index={3} className="publicationsTab">
          <PublicationsCarousel />
        </TabPanel>
      </Suspense>
    </div>
  );
}

export default memo(MediaCenterTabs);
