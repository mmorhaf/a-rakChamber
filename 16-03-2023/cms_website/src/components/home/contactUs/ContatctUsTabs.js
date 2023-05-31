import React, { useState, memo, useEffect } from "react";
import VideosCarousel from "../carousels/VideosCarousel";
import Facebook from "../carousels/FaceBook";
import Twitter from "../carousels/Twitter";
import Typography from "@material-ui/core/Typography";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from "reactstrap";
import classnames from "classnames";
import useStyles from "../../../styles/components/home/contactUs/tabs";
import { useTranslation } from "react-i18next";
import InstagramFeed from "./InstagramFeed";

function ContactTabs(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState("1");
  const [num, setNum] = useState(370);

  useEffect(() => {
    const setCardWidth = () => {
      return window.innerWidth < 420 && num !== 210 ? setNum(210) : null;
    };

    setCardWidth();
    window.addEventListener("resize", () => setCardWidth());

    return () => {
      window.removeEventListener("resize", () => setCardWidth());
    };
  }, [num]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const YoutubeVideos = [
    "https://www.youtube.com/embed/Uj3Wyf216DM",
    "https://www.youtube.com/embed/R8x5rHqM6Cs",
    "https://www.youtube.com/embed/p03uWmgzBQI",
  ];

  return (
    <div className={classes.root}>
      <Typography variant="h1">{t("HOME.CONTACTUS.HEADER")}</Typography>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            <TwitterIcon className="twitter" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            <YouTubeIcon className="youtube" />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            <FacebookIcon className="facebook" />
          </NavLink>
        </NavItem>
        <NavItem className="instagram">
          <NavLink
            className={classnames({ active: activeTab === "4" })}
            onClick={() => {
              toggle("4");
            }}
          >
            <span className="insta"></span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1" className="social">
          <Row>
            <Twitter num={num} />
          </Row>
        </TabPane>
        <TabPane tabId="2" className="social">
          <Row>
            <VideosCarousel items={YoutubeVideos} />
          </Row>
        </TabPane>
        <TabPane tabId="3" className="social">
          <Row>
            <Facebook num={num} />
          </Row>
        </TabPane>
        <TabPane tabId="4" className="social">
          <Row className={classes.top}>
            <Button className={classes.followBtn}>
              <a
                href="https://instagram.com/rakchamber?igshid=NmNmNjAwNzg="
                target="_blank"
                rel="noreferrer"
              >
                {t("HOME.CONTACTUS.INSTAFOLLOW")}
              </a>
            </Button>
            <InstagramFeed />
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default memo(ContactTabs);
