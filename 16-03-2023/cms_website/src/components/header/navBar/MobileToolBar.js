import React, { memo, useState } from "react";
// import MobileLogIn from "./MobileLogIn";
import MobileLogInContainer from "./MobileLogInContainer";
import MobileSettings from "./MobileSettings";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import DirectionsOutlinedIcon from "@material-ui/icons/DirectionsOutlined";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import useStyles from "../../../styles/components/header/mobileToolBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function MoblieNavBar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab icon={<SettingsOutlinedIcon />} {...a11yProps(0)} />
        <Tab icon={<PersonOutlineIcon />} {...a11yProps(1)} />
        <Tab icon={<DirectionsOutlinedIcon />} {...a11yProps(2)} />
      </Tabs>
      <TabPanel className="tabContainer" value={value} index={0}>
        <MobileSettings />
      </TabPanel>
      <TabPanel className="tabContainer" value={value} index={1}>
        <MobileLogInContainer />
      </TabPanel>
      <TabPanel className="tabContainer" value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

export default memo(MoblieNavBar);
