import React, { memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useStyles from "../../../styles/components/home/services/tabs";
import { useTranslation } from "react-i18next";
const MostUsedCarousel = lazy(() =>
  import("../carousels/MostUsedServicesCarousel")
);
const FPBobySerach = lazy(() => import("./Search"));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={0.5} pb={3}>
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

function ServicesTabs() {
  const { t } = useTranslation();
  const classes = useStyles();
  // const mediaQuery = useMediaQuery();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.container} id="introServicesTabs">
        <AppBar
          position="static"
          //  className={mediaQuery.tabs}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="services tabs"
          >
            <Tab label={t("HOME.SERVICES.USED.TAB")} {...a11yProps(0)} />
            <Tab label={t("HOME.SERVICES.SEARCH.TAB")} {...a11yProps(1)} />
            {/* <Tab label={t("HOME.SERVICES.SERVICES.TAB")} {...a11yProps(2)} /> */}
          </Tabs>
        </AppBar>
        <Suspense fallback={<div className="loading..." />}>
          <TabPanel value={value} index={0}>
            <MostUsedCarousel />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FPBobySerach />
          </TabPanel>
        </Suspense>
      </div>
    </div>
  );
}

export default memo(ServicesTabs);
