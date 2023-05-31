import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../shared/logo/Logo";
import LastUpdate from "../shared/lastUpdate/LastUpdate";
import List from "./List";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import useStyles from "../../styles/components/footer/footer";
import { useTranslation } from "react-i18next";
import actions from "../../redux/actions";

const { getContactLinks } = actions;

function Footer() {
  const { contactLinksReturned } = useSelector((state) => state.contactLinks);
  const [links, setLinks] = useState([]);
  const [twitter, setTwitter] = useState("");
  const [faceBook, setFaceBook] = useState("");
  const [insta, setInsta] = useState("");
  const [youtube, setYoutube] = useState("");
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const classes = useStyles();

  useEffect(() => {
    // dispatch(loadingAction({ loading: true }));
    dispatch(getContactLinks());
  }, []);

  useEffect(() => {
    if (!contactLinksReturned.length > 0) return;
    else {
      // dispatch(loadingAction({ loading: false }));
      setLinks(contactLinksReturned);
    }
  }, [contactLinksReturned]);

  useEffect(() => {
    links &&
      links?.map((item) => {
        if (item?.key === "FACE_BOOK") setFaceBook(item?.value);
        if (item?.key === "TWITTER") setTwitter(item?.value);
        if (item?.key === "INSTAGRAM") setInsta(item?.value);
        if (item?.key === "YOU_TUBE") setYoutube(item?.value);
      });
  }, [links]);

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className="actualContent">
        <Grid item lg={1} sm={2} xs={1} className="logoContainer">
          <a href="/home">
            {" "}
            <Logo uuid="/assets/images/logo/newLogo.png" />
          </a>
        </Grid>

        <Grid item xs={11} className="importantLinks">
          <List data={links} />
        </Grid>
      </Grid>

      <Grid item xs={10} className="lastSection">
        <Box className="social-rights">
          <Box className="socialLinks">
            <IconButton>
              <a href={youtube} target="_blank" rel="noreferrer">
                <YouTubeIcon />
              </a>
            </IconButton>
            <IconButton>
              <a href={faceBook} target="_blank" rel="noreferrer">
                <FacebookIcon />
              </a>
            </IconButton>
            <IconButton>
              <a href={insta} target="_blank" rel="noreferrer">
                <InstagramIcon />
              </a>
            </IconButton>
            <IconButton>
              <a href={twitter} target="_blank" rel="noreferrer">
                <TwitterIcon />
              </a>
            </IconButton>
          </Box>
          <Box className="rights">
            <Box component="span">{t("FOOTER.RIGHTS")}</Box>
          </Box>
        </Box>
        <Box className="lastUpdate">
          <LastUpdate
            pageLastUpdate={null}
            location={isRTL ? "للموقع" : "Website"}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default memo(Footer);
