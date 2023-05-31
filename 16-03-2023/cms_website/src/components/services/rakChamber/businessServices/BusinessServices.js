import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Tooltip,
} from "@material-ui/core";

import useStyles from "../../../../styles/components/services/servicesTabPane";
import useCardStyles from "../../../../styles/components/services/serviceCard";
import { businessServicesData } from "./businessServicesData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";

function BusinessServices() {
  const { t } = useTranslation();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const classes = useStyles();
  const cardClasses = useCardStyles();

  const services = () =>
    businessServicesData.map((item) => (
      <Grid item lg={3} md={4} sm={6} xs={12}>
        <Card key={item.id} variant="outlined" className={cardClasses.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="serviceIcon" className={classes.avatar}>
                {item.icon}
              </Avatar>
            }
            title={item.heading}
          />

          <CardActions>
            <Link
              variant="outlined"
              className="startBtn"
              to={{
                pathname: !item.public
                  ? profile == null
                    ? "/login"
                    : profile && item.roles?.includes(parseInt(loggedType))
                    ? `/services-form${item.link}`
                    : "/login"
                  : `/services-form${item.link}`,
                id: item.id,
                name: item.heading,
              }}
            >
              <BsPlay />
            </Link>
            <Divider orientation="vertical" />
            <Link
              variant="outlined"
              className="moreInfoBtn"
              to={{
                pathname: isRTL
                  ? `/ar/services/rak-chamber/services-details/${item.serviceId}`
                  : `/en/services/rak-chamber/services-details/${item.serviceId}`,
                state: item.link ? `/services-form${item.link}` : false,
              }}
            >
              {isRTL ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
            </Link>
          </CardActions>
        </Card>
      </Grid>
    ));

  const liteServices = useMemo(services, [services]);

  return (
    <Grid container spacing={7} className={classes.root}>
      {liteServices}
    </Grid>
  );
}

export default memo(BusinessServices);
