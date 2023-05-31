import React, { memo, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import useStyles from "../../../styles/components/home/common/tabs";
import useTbsBackGroundStyles from "../../../styles/components/home/common/tabs";
import { useTranslation } from "react-i18next";
import Container from "@material-ui/core/Container";
const OnThisDay = lazy(() => import("../carousels/OnThisDay"));
const TimeLine = lazy(() => import("./TimeLine"));

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
        <Box p={3}>
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

function EventsTabs() {
  const { t } = useTranslation();
  const classes = useStyles();
  const backgroungClasses = useTbsBackGroundStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container
      maxWidth="lg"
      className={`${classes.root} ${classes.eventsRoot}`}
    >
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label={t("HOME.EVENTS.HEADER")}
        >
          <Tab label={t("HOME.EVENTS.TABS.EVENTS")} {...a11yProps(0)} />
          <Tab label={t("HOME.EVENTS.TABS.THISDAY")} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <Box className={backgroungClasses.tabs}>
        <Suspense fallback={<div className="loading..." />}>
          <TabPanel value={value} index={0}>
            <TimeLine />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <OnThisDay />
          </TabPanel>
        </Suspense>
      </Box>
    </Container>
  );
}

export default memo(EventsTabs);
