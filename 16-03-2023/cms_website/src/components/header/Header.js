import React, { memo, useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Notifications from "./notification/Notifications";
import Navbar from "./navBar/Navbar";
import ToolBar from "./toolBar/ToolBar";
import Logo from "../shared/logo/Logo";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import useStyles from "../../styles/components/header/header";
import { useLocation } from "react-router-dom";
import actions from "../../redux/actions";

const { isServicePage, servicePage } = actions;
function Header() {
  const { menuReturned } = useSelector((state) => state.menu);
  const { servicePageCheck } = useSelector((state) => state.services);

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(true);
  const baseUrl = window.location.href.split("/")[4];

  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const returnedData = menuReturned || [];

    if (!returnedData?.length) return;
    const data = returnedData.find((item) => item.title.en === "header");
    setData(data?.childrens);
  }, [menuReturned]);

  useLayoutEffect(() => {
    if (
      location?.pathname.includes("/services/rak-chamber") ||
      location?.pathname.includes("/services-form") ||
      location?.pathname.includes("/services/search-services") ||
      location?.pathname.includes("/login") ||
      location?.pathname.includes("/uaepasslogin") ||
      location?.pathname.includes("/confirm-email") ||
      location?.pathname.includes("/reset-password") ||
      location?.pathname.includes("/resend-code")
    ) {
      dispatch(isServicePage());
    } else dispatch(servicePage());
  }, [location]);

  useEffect(() => {
    let fromTop = document.documentElement.scrollTop;

    if (fromTop === 0) setVisible(true);
  }, [visible]);

  useEffect(() => {
    window.addEventListener(
      "scroll",
      function () {
        let fromTop = document.documentElement.scrollTop;
        if (fromTop === 0) setVisible(true);
        if (fromTop >= 40) setVisible(false);
      },
      true
    );
  }, []);

  const classes = useStyles();
  return (
    <Grid
      container
      id="header"
      className={`${visible ? classes.headerRoot : classes.onScroll} ${
        servicePageCheck && classes.servicesHeader
      }`}
    >
      <Box className="header">
        <Grid container>
          <Grid item xs={12} className="notificationContainer">
            <Notifications />
          </Grid>
          <Grid container item className="headerContainer">
            <Grid item xs={12} lg={9} className="navBarC" id="introNavbar">
              {data?.length > 0 && <Navbar data={data} baseUrl={baseUrl} />}
            </Grid>
            <Grid item xs={9} md={3} className="toolBarC" id="introToolBar">
              <ToolBar />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} className="logoContainer">
        <a href="/home">
          <Logo
            uuid={
              visible
                ? "/assets/images/logo/newLogo.png"
                : "/assets/images/logo/logo.png"
            }
          />
        </a>
      </Grid>
    </Grid>
  );
}

export default memo(Header);
