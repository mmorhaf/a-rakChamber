import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SiteMap from "../header/siteMap/SiteMap";
import Settings from "./Settings";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import EmailIcon from "@material-ui/icons/Email";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useTranslation } from "react-i18next";

function FooterList({ data }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [openSiteMap, setOpenSiteMap] = useState(false);

  const handleSiteMapClick = () => {
    setOpenSiteMap(true);
  };

  const handleCloseSiteMap = () => {
    setOpenSiteMap(false);
  };
  useEffect(() => {
    data &&
      data?.map((item) => {
        if (item?.key === "EMAIL") setEmail(item?.value);
        if (item?.key === "PHONE") setPhone(item?.value);
      });
  }, [data]);
  return (
    <>
      <List className="contactInfo">
        <ListItem className="phone" onClick={() => window.open(`tel:${phone}`)}>
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText primary={phone} />
        </ListItem>
        <ListItem onClick={() => window.open(`mailto:${email}`)}>
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary={email} className="email" />
        </ListItem>
        <ListItem>
          <a
            href={`https://www.google.com/maps/search/%D8%B4%D8%A7%D8%B1%D8%B9+%D8%A7%D9%84%D8%AC%D8%B2%D8%B9%D8%A9%D8%8C+%D8%B1%D8%A3%D8%B3+%D8%A7%D9%84%D8%AE%D9%8A%D9%85%D8%A9%E2%80%AD/@25.7874383,55.9839365,14z/data=!3m1!4b1?hl=${
              isRTL ? "ar" : "en"
            }`}
            target="_blank"
            rel="noreferrer"
            style={{ display: "flex" }}
          >
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={t("FOOTER.LOCATION")} />
          </a>
        </ListItem>

        <ListItem component="li">
          <Link to="/customer-charter">
            <ListItemText primary={t("FOOTER.CHARTER")} />
          </Link>
        </ListItem>
        <ListItem component="li">
          <Link to="/privacy-policy">
            <ListItemText primary={t("FOOTER.PRIVACY")} />
          </Link>
        </ListItem>
        <ListItem component="li">
          <Link to="/participation/faq">
            <ListItemText primary={t("FOOTER.FAQ")} />
          </Link>
        </ListItem>
        <ListItem component="li">
          <Link to="/sitemap">
            <ListItemText primary={t("FOOTER.SITEMAP")} />
          </Link>
        </ListItem>
        <ListItem component="li">
          <Link to="/terms-conditions">
            <ListItemText primary={t("FOOTER.TERMS")} />
          </Link>
        </ListItem>
        <ListItem component="li">
          <Settings />
        </ListItem>
      </List>
      <Box className="sitemap">
        <SiteMap
          open={openSiteMap}
          handleSiteMapClick={handleSiteMapClick}
          handleCloseSiteMap={handleCloseSiteMap}
        />
      </Box>
    </>
  );
}

export default FooterList;
