import { AppBar, Box, Container, Tab, Tabs } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useStyles from "../../../../styles/components/services/rakChamberTabs";
import ServicesSearch from "./Search";
import ServicesCards from "./ServicesCards";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tabpanel-${index}`}
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
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function RAKChamberServicesTabs() {
  const { t } = useTranslation();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <div className={classes.root}>
        <ServicesSearch />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label={t("RAKCHAMBER")} {...a11yProps(0)} />
            <Tab label={t("RAKEX")} {...a11yProps(1)} />
            <Tab label={t("RAKAR")} {...a11yProps(2)} />
            <Tab label={t("RAKSME")} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ServicesCards type="chamber" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ServicesCards type="EX" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ServicesCards type="arb" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ServicesCards type="SME" />
        </TabPanel>
      </div>
    </Container>
  );
}
