import React, { Fragment, memo } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

function SideBarLinks({
  isOpen = false,
  secondaryPage,
  subPage,
  routes,
  category,
}) {
  const { t } = useTranslation();
  return (
    <Fragment>
      <Typography variant="h1">{secondaryPage}</Typography>

      <List
        component="nav"
        aria-label={`${subPage} sidebar`}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {t("SIDEBAR.SIDEBARLINKS.RELATED")}
          </ListSubheader>
        }
      >
        {routes.map((route, index) => {
          return (
            <Link key={Math.random()} to={route.path}>
              <ListItem button selected={category === route.category}>
                <ListItemText primary={route.secondary} />
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Fragment>
  );
}

export default memo(SideBarLinks);
