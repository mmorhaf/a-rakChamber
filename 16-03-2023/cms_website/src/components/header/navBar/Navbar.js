import React, { memo, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MobileToolBar from "./MobileToolBar";
import AppBar from "@material-ui/core/AppBar";
import SiteMap from "../siteMap/SiteMap";
import Toolbar from "@material-ui/core/Toolbar";
import SmToolBar from "../toolBar/ToolBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import { Box } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { useTranslation } from "react-i18next";
import { uid } from "react-uid";
import { BsThreeDotsVertical } from "react-icons/bs";

function HeaderNavBar({ data, baseUrl }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [isSettingsOpen, setIsSettinsOpen] = useState(false);
  const [openSiteMap, setOpenSiteMap] = useState(false);

  const { t } = useTranslation();

  const handleSiteMapClick = () => {
    setOpenSiteMap(true);
  };

  const handleCloseSiteMap = () => {
    setOpenSiteMap(false);
  };

  const handleSettingsClick = useCallback(() => {
    setIsSettinsOpen(!isSettingsOpen);
  }, [isSettingsOpen]);

  const renderChildren = useCallback(
    (children) => (
      <Box className="childrenContainer">
        {children.length &&
          children?.map((link) => {
            return link.childrens.length > 0 ? (
              <Box className="navItemWithChilds">
                <Link
                  key={uid(link)}
                  to={link.link}
                  className="navLink navLinkParent"
                >
                  <Typography variant="h6" className="title">
                    {isRTL ? link.title.ar : link.title.en}
                  </Typography>
                </Link>
                {link.childrens.length > 0 &&
                  link.childrens?.map((e) => {
                    return (
                      <Link key={uid(e)} to={e.link} className="navLink">
                        <Typography variant="h6" className="title">
                          {isRTL ? e.title.ar : e.title.en}
                        </Typography>
                      </Link>
                    );
                  })}
              </Box>
            ) : (
              <Link key={uid(link)} to={link.link} className="navLink">
                <Typography variant="h6" className="title">
                  {isRTL ? link.title.ar : link.title.en}
                </Typography>
              </Link>
            );
          })}
      </Box>
    ),
    [isRTL]
  );

  const renderMenu = useMemo(() => {
    return data.map((item) => (
      <Box
        key={uid(item)}
        className={`itemContainer ${!item.childrens.length && "no"}`}
      >
        <Link
          key={uid(item)}
          to={item.link}
          className={`navLink baseLink ${
            baseUrl === item.link.split("/")[1] && "active"
          }`}
        >
          <Typography variant="h6" className="title">
            {isRTL ? item.title.ar : item.title.en}
          </Typography>
        </Link>
        {item.childrens && renderChildren(item.childrens)}
      </Box>
    ));
  }, [data, isRTL, renderChildren, baseUrl]);

  return (
    <Box className="navBar">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className="siteMapBtn"
            color="inherit"
            aria-label="menu"
            onClick={handleSiteMapClick}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/home" key={"kkkkk"} className="navLink">
            <IconButton
              edge="start"
              className="homeBtn"
              color="inherit"
              aria-label="menu"
              onClick={handleSettingsClick}
            >
              <HomeOutlinedIcon />
            </IconButton>
          </Link>

          <Box className="forDesktop">
            {renderMenu}
            <IconButton
              className="settingsBtn"
              aria-label="settings"
            ></IconButton>
          </Box>
          <Box className="smtoolBar">
            <SmToolBar />
          </Box>
        </Toolbar>
      </AppBar>
      <Box className="sitemap">
        {openSiteMap && (
          <SiteMap
            open={openSiteMap}
            handleSiteMapClick={handleSiteMapClick}
            handleCloseSiteMap={handleCloseSiteMap}
          />
        )}
      </Box>
      <Collapse in={isSettingsOpen} className="smallScreens">
        <MobileToolBar />
      </Collapse>
    </Box>
  );
}

export default memo(HeaderNavBar);
