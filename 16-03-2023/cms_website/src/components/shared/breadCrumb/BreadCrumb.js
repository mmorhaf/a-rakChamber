import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

function BreadCrumb({
  secondaryPagePath,
  main,
  mainPath,
  secondaryPage,
  detailsPage,
  alias,
  apply,
  name,
  singlePage,
  dynamic,
  pageName,
  secondaryPageName,
  link,
  secondaryPageLink,
}) {
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  return (
    <>
      {dynamic ? (
        <Breadcrumbs
          separator={
            isRTL ? <ChevronLeftIcon /> : <NavigateNextIcon fontSize="small" />
          }
          aria-label="breadcrumb"
        >
          <Link to="/home">{t("SIDEBAR.BREADCRUMB.HOME")}</Link>
          {pageName ? <Link to={`${link}`}>{pageName}</Link> : null}
          {secondaryPageName && (
            <Link to={`${secondaryPageLink}`}>{secondaryPageName}</Link>
          )}
        </Breadcrumbs>
      ) : !singlePage ? (
        <Breadcrumbs
          separator={
            isRTL ? <ChevronLeftIcon /> : <NavigateNextIcon fontSize="small" />
          }
          aria-label="breadcrumb"
        >
          <Link to="/home">{t("SIDEBAR.BREADCRUMB.HOME")}</Link>
          <Link to={`${mainPath}`}>{main}</Link>
          {secondaryPage && (
            <Link to={`${secondaryPagePath}`}>{secondaryPage}</Link>
          )}
          {alias && !apply && (
            <Typography color="textPrimary">{detailsPage}</Typography>
          )}
          {alias && apply && (
            <Typography color="textPrimary">{name}</Typography>
          )}
        </Breadcrumbs>
      ) : (
        <Breadcrumbs
          separator={
            isRTL ? <ChevronLeftIcon /> : <NavigateNextIcon fontSize="small" />
          }
          aria-label="breadcrumb"
        >
          <Link to="/home">{t("SIDEBAR.BREADCRUMB.HOME")}</Link>
          <Typography color="textPrimary">{main}</Typography>
        </Breadcrumbs>
      )}
    </>
  );
}

export default memo(BreadCrumb);
