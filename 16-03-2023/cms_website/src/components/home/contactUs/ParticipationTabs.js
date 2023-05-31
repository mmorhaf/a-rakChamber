import React, { useState, memo, Suspense, lazy } from "react";
import Typography from "@material-ui/core/Typography";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import useStyles from "../../../styles/components/home/contactUs/tabs";
import { useTranslation } from "react-i18next";
const Polls = lazy(() => import("./Polls"));
const Ideas = lazy(() => import("./Ideas"));
const Opinions = lazy(() => import("./Opinions"));

function ContactTabs() {
  const { t } = useTranslation();
  const classes = useStyles();

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">{t("HOME.PARTICIPATION.HEADER")}</Typography>
      <Nav tabs className="participation">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <Typography variant="h6" component="h2">
              {t("HOME.PARTICIPATION.POLLS.TAB")}
            </Typography>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            <Typography variant="h6" component="h2">
              {t("HOME.PARTICIPATION.OPINIONS.TAB")}
            </Typography>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <Typography variant="h6" component="h2">
              {t("HOME.PARTICIPATION.IDEAS.TAB")}
            </Typography>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <Suspense fallback={<div className="loading..." />}>
          <TabPane tabId="1">
            <Row className="polls">
              <Polls />
            </Row>
          </TabPane>

          <TabPane tabId="3">
            <Row>
              <Opinions />
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Ideas />
            </Row>
          </TabPane>
        </Suspense>
      </TabContent>
    </div>
  );
}

export default memo(ContactTabs);
