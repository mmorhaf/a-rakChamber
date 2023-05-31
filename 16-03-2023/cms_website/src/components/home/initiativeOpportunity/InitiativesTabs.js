import { Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import React, { lazy, memo, Suspense } from "react";
import { useTranslation } from "react-i18next";
import useStyles from "../../../styles/components/home/common/tabs";
const InitiativesCarousel = lazy(() =>
  import("../carousels/InitiativesCarousel")
);
const InvestmentsCarousel = lazy(() =>
  import("../carousels/InvestmentsCarousel")
);

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

function InitiativesTabs() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={`${classes.root} ${classes.initiativeTab}`}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label={t("HOME.INITIATIVE.HEADER")}
        >
          <Tab
            label={t("HOME.INITIATIVE.TABS.OPPORTUNITY")}
            {...a11yProps(0)}
          />
          <Tab label={t("HOME.INITIATIVE.TABS.INITIATIVE")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Suspense fallback={<div className="loading..." />}>
        <TabPanel value={value} index={0} className="tabPanel">
          <InvestmentsCarousel />
        </TabPanel>
        <TabPanel value={value} index={1} className="tabPanel">
          <InitiativesCarousel />
        </TabPanel>
      </Suspense>
    </div>
  );
}

export default memo(InitiativesTabs);
