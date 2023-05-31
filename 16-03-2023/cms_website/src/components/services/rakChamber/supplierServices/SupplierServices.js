import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  Grid,
  Avatar,
  CardHeader,
  Divider,
} from "@material-ui/core";

import useStyles from "../../../../styles/components/services/servicesTabPane";
import useCardStyles from "../../../../styles/components/services/serviceCard";
import { supplierServicesData } from "./supplierServicesData";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";
function IndividualsServices() {
  const { t } = useTranslation();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const classes = useStyles();
  const cardClasses = useCardStyles();

  const services = () =>
    supplierServicesData.map((item) => (
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
                pathname: `/services-form/supplier-services/${item.heading}`,
                id: item.id,
              }}
            >
              <BsPlay />
            </Link>
            <Divider orientation="vertical" />
            <Link className="moreInfoBtn">
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

export default memo(IndividualsServices);
