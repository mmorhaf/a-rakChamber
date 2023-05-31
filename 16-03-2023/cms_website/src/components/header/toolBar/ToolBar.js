import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import DirectionsOutlinedIcon from "@material-ui/icons/DirectionsOutlined";
import LanguageIcon from "@material-ui/icons/Language";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import SearchIcon from "@material-ui/icons/Search";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import introJs from "intro.js";
import "intro.js/introjs.css";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { RiDashboardLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { switchLanguages } from "../../../components/shared/utils";
import { BASE_URL, REDIRECT_URL } from "../../../constants/constant";
import { setDirection } from "../../../redux/actionCreators/theme";
import actions from "../../../redux/actions";
import useStyles from "../../../styles/components/header/header";
import "../../../styles/components/header/intro.css";
import Dialog2 from "../../shared/dialog/Dialog";
import SettingsModal from "./SettingsModal";
const { logOut, doSearch, doSearchReturned, serviceLoginDone,getAll } = actions;

function ToolBar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [startSearch, setStartSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openConfirmLogout, setOpenConfirmLogout] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [message, setMessage] = useState("");
  const { searchDataReturned } = useSelector((state) => state.search);

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { serviceLogInDone } = useSelector((state) => state.APIServices);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    let loggedType = sessionStorage.getItem("loggedType");
    dispatch(serviceLoginDone({ status: loggedType }));
  }, []);

  useLayoutEffect(() => {
    if (searchDataReturned) {
      if (searchDataReturned.success)
        history.push(isRTL ? "/ar/search" : "/en/search");
      else {
        setOpen2(true);
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Sorry, something wrong try again later"
        );

        dispatch(doSearchReturned({ data: false }));
      }
    }
  }, [searchDataReturned]);

  const toggleSettingModal = useCallback(() => {
    setOpen(!open);
  }, [open]);

  const toggleSearchField = () => {
    setSearchValue("");
    setStartSearch(!startSearch);
  };

  const handleClose = () => {
    const language = isRTL ? "ar" : "en";
    dispatch(doSearch({ data: false, language }));

    dispatch(dispatch(doSearchReturned({ data: false })));
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    if (!searchValue.length) {
      return;
    } else {
      const language = isRTL ? "ar" : "en";
      dispatch(doSearch({ data: {phrase:searchValue}, language }));
    }
  };

  const handleClickOpenConfirmLogout = () => {
    setOpenConfirmLogout(true);
  };

  const handleCloseConfirmLogout = () => {
    setOpenConfirmLogout(false);
  };

  const handleConfirmLogout = async () => {
    setOpenConfirmLogout(false);
    dispatch(serviceLoginDone({ status: 0 }));
    sessionStorage.setItem("loggedType", 0);
    sessionStorage.removeItem("memberType");
    sessionStorage.removeItem("updateUser");
    sessionStorage.removeItem("uaePassUserInfo");
    sessionStorage.removeItem("supplierAuthUserSession");
    sessionStorage.removeItem("supplierProfile");
    window.location.href = `${BASE_URL}/idshub/logout?redirect_uri=${REDIRECT_URL}`;
  };

  const handleIntro = () => {
    introJs()
      .setOptions({
        disableInteraction: true,
        keyboardNavigation: true,
        autoPosition: true,
        showButtons: true,
        scrollToElement: true,
        scrollPadding: 1000,
        overlayOpacity: 0.9,
        position: "right",
        steps: [
          {
            element: document.getElementById("introLogo"),
            title: t("HEADER.TOOLS.INTRO_WELCOME"),
            intro: t("HEADER.TOOLS.LOGO_INTRO_PHRASE"),
            position: "left",
          },
          {
            element: document.getElementById("introNavbar"),
            title: t("HEADER.TOOLS.MAIN_MENU"),
            intro: t("HEADER.TOOLS.MAIN_MENU_PHRASE"),
          },
          {
            element: document.getElementById("introToolBar"),
            title: t("HEADER.TOOLS.PERSONALIZATION"),
            intro: t("HEADER.TOOLS.PERSONALIZATION_PHRASE"),
          },
          {
            element: document.getElementById("introServicesTabs"),
            title: t("HEADER.TOOLS.MAIN_BANNER"),
            intro: t("HEADER.TOOLS.MAIN_BANNER_PHRASE"),
          },
          {
            element: document.getElementById("introMediaCenter"),
            title: t("HEADER.TOOLS.MEDIA_CENTER"),
            intro: t("HEADER.TOOLS.MEDIA_CENTER_PHRASE"),
          },
          {
            element: document.getElementById("introInitiatives"),
            title: t("HEADER.TOOLS.OPPORTUNITY_INITIATIVE"),
            intro: t("HEADER.TOOLS.OPPORTUNITY_INITIATIVE_PHRASE"),
          },
          {
            element: document.getElementById("introEvents"),
            title: t("HEADER.TOOLS.EVENTS"),
            intro: t("HEADER.TOOLS.EVENTS_PHRASE"),
          },
          {
            element: document.getElementById("introContactUs"),
            title: t("HEADER.TOOLS.CONTACT_US"),
            intro: t("HEADER.TOOLS.CONTACT_US_PHRASE"),
          },
        ],

        nextLabel: isRTL
          ? ` ${t("HEADER.TOOLS.NEXT")} <span>&#8592;</span>`
          : `<span>&#8594;</span> ${t("HEADER.TOOLS.NEXT")} `,

        prevLabel: isRTL
          ? `<span>&#8594;</span> ${t("HEADER.TOOLS.BACK")} `
          : ` ${t("HEADER.TOOLS.BACK")} <span>&#8592;</span>`,

        doneLabel: t("HEADER.TOOLS.END_TOUR"),
      })
      .start();
  };

  const classes = useStyles();
  return (
    <Box className="toolBar">
      <Box className="toolsContainer">
        <div
          className={`${classes.search}`}
          style={{ display: startSearch ? "flex" : "none" }}
        >
          <IconButton className={classes.searchIcon} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder={t("HEADER.TOOLS.SEARCH")}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={handleChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            value={searchValue}
          />
          <IconButton
            className="close"
            onClick={() => {
              toggleSearchField();
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <Box style={{ display: startSearch ? "none" : "flex" }} className="bar">
          <IconButton className="searchIcon" onClick={toggleSearchField}>
            <SearchIcon />
          </IconButton>
          {serviceLogInDone && serviceLogInDone != 0 ? (
            <IconButton
              onClick={() => {
                handleClickOpenConfirmLogout();
              }}
            >
              <PersonOutlineIcon />
              <Box component="span">{t("HEADER.TOOLS.LOGOUT")}</Box>
            </IconButton>
          ) : (
            <Link to="/login">
              <IconButton>
                <PersonOutlineIcon />
                <Box component="span">{t("HEADER.TOOLS.LOGIN")}</Box>
              </IconButton>
            </Link>
          )}

          {serviceLogInDone && serviceLogInDone != 0 ? (
            <Link to="/services/rak-chamber/dashboard">
              <Tooltip
                title={t("SERVICESPAGES.SIDEMENU.DASHBOARD")}
                placement="bottom"
                arrow
              >
                <IconButton>
                  <RiDashboardLine />
                </IconButton>
              </Tooltip>
            </Link>
          ) : null}
          {history?.location?.pathname == "/en/home" ||
          history?.location?.pathname == "/ar/home" ? (
            <Tooltip title={t("HEADER.TOOLS.TOUR")} placement="bottom" arrow>
              <IconButton
                onClick={() => handleIntro()}
                className={classes.virtualTour}
              >
                <DirectionsOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : null}

          <IconButton onClick={toggleSettingModal}>
            <SettingsOutlinedIcon />
            <Box component="span">{t("HEADER.TOOLS.SETTINGS")}</Box>
          </IconButton>

          <IconButton
            onClick={() => {
              dispatch(setDirection({ isRTL: !isRTL }));
              window.chatbotlang = isRTL ? "en" : "ar";
              i18n.changeLanguage(isRTL ? "en" : "ar");
              localStorage.setItem("isRTL", isRTL ? true : false);
              switchLanguages();
            }}
          >
            <LanguageIcon />
            <Box component="span" className={classes.language}>
              {t("HEADER.TOOLS.LANGUAGE")}
            </Box>
          </IconButton>
        </Box>
      </Box>
      <SettingsModal
        open={open}
        toggleSettingModal={toggleSettingModal}
        popoverTitle={t("HEADER.SETTINGS.TITLE")}
        popoverTitle2={t("HEADER.SETTINGS.COLORS")}
      />
      <Dialog
        open={openConfirmLogout}
        onClose={handleCloseConfirmLogout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={classes.dialog}
        style={{ direction: isRTL ? "rtl" : "ltr" }}
      >
        <DialogTitle id="alert-dialog-title">
          {t("SERVICESPAGES.SIDEMENU.LOGOUT")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("SERVICESPAGES.PROFILE.CONFIRMLOGOUT")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmLogout} color="primary">
            {t("SERVICESPAGES.COOVERIFY.CANCEL")}
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            {t("SERVICESPAGES.PROFILE.OK")}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog2 open={open2} message={message} />
    </Box>
  );
}

export default memo(ToolBar);
