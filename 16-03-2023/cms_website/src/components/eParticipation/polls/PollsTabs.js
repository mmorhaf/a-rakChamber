import React, { memo, useState } from "react";
import Archived from "./Archived";
import ActivePoll from "./activePoll/ActivePoll";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

function PollsTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="tabContainer">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            {t("PARTICIPATION.POLLS.TABS.ACTIVE")}
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            {t("PARTICIPATION.POLLS.TABS.ARCHIVED")}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12" className="actualContent">
              {activeTab === "1" && <ActivePoll />}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12" className="actualContent">
              {activeTab === "2" && <Archived />}
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default memo(PollsTabs);
