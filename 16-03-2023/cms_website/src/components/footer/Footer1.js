import React, { memo } from "react";
import { Link } from "react-router-dom";
import Map from "../shared/map/Map";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CallIcon from "@material-ui/icons/Call";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import EmailIcon from "@material-ui/icons/Email";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PictureAsPdfOutlinedIcon from "@material-ui/icons/PictureAsPdfOutlined";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import Paper from "@material-ui/core/Paper";
import useStyles from "../../styles/components/footer/footer";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className="footerOverlay"></Grid>
      <Grid item xs={12} className="footerBackground"></Grid>
      <Grid container item className="footerDetails">
        <Grid item xs={12} md={4} lg={3}>
          <List
            className="contactInfo"
            subheader={
              <ListSubheader component="h1">
                {t("FOOTER.1STBLOCK.HEADER")}
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <CallIcon />
              </ListItemIcon>
              <ListItemText primary="00971 7 2260000" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SmartphoneIcon />
              </ListItemIcon>
              <ListItemText primary="00971 7 2260112" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary="info@rakchamber.ae" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Al Jaz'ah Road, R.A.K., U.A.E." />
            </ListItem>
            <ListItem className="mapContainer">
              <Paper className="map">
                <Map />
              </Paper>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={4} lg={3} className="quickLinks">
          <List
            subheader={
              <ListSubheader component="h1">
                {t("FOOTER.2NDBLOCK.HEADER")}
              </ListSubheader>
            }
          >
            <ListItem>
              <Link to="#">
                <ListItemText primary="About the room" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Our Services" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Media Center" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Connect with us" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="E-Particiption" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Publications" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Initiatives" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Careers" />
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={6} md={4} lg={3} className="quickLinks">
          <List
            subheader={
              <ListSubheader component="h1">
                {t("FOOTER.3RDBLOCK.HEADER")}
              </ListSubheader>
            }
          >
            <ListItem>
              <Link to="#">
                <ListItemText primary="About the room" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Our Services" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Media Center" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Connect with us" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="E-Particiption" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Publications" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Initiatives" />
              </Link>
            </ListItem>
            <ListItem>
              <Link to="#">
                <ListItemText primary="Careers" />
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={12} lg={3} className="about">
          <List
            subheader={
              <ListSubheader component="h1">
                {t("FOOTER.4THBLOCK.HEADER")}
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemText primary="Support: Chrome,IE 9.0+,Firefox, Safari, Opera" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Programs you may need:" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PictureAsPdfOutlinedIcon />
              </ListItemIcon>
              <ListItemIcon>
                <PictureAsPdfOutlinedIcon />
              </ListItemIcon>
            </ListItem>

            <ListItem>
              <ListItemText primary="Report URL" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Website last updated on 2020/10/31" />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} className="social-rights">
          <Box className="socialLinks">
            <IconButton>
              <ThumbUpAltIcon />
            </IconButton>
            <IconButton>
              <FacebookIcon />
            </IconButton>
            <IconButton>
              <InstagramIcon />
            </IconButton>
            <IconButton>
              <TwitterIcon />
            </IconButton>
          </Box>
          <Box component="span" className="rights">
            {t("FOOTER.RIGHTS")}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default memo(Footer);
