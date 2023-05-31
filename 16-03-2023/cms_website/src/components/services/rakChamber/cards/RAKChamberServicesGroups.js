import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Container,
  Box,
  Grid,
  Card,
  CardActions,
  CardHeader,
  Avatar,
  Divider,
  Typography,
} from "@material-ui/core";
import { BsPlay } from "react-icons/bs";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";
import ServicesCards from "./ServicesCards";
import useStyles from "../../../../styles/components/services/rakChamberTabs";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { otherServicesData } from "../other/otherServicesData";
import { supplierServicesData } from "../supplierServices/supplierServicesData";
import { businessServicesData } from "../businessServices/businessServicesData";
import { individualsServicesData } from "../individualsServices/individualsServicesData";
import useCardStyles from "../../../../styles/components/services/serviceCard";

export default function RAKChamberServicesGroups() {
  const { t } = useTranslation();
  const { group } = useParams();
  const [data, setData] = useState([]);

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    switch (group) {
      case "1":
        return setData({
          title: "Business Services",
          title_ar: "خدمات الأعمال",
          submenu: businessServicesData,
        });
      case "2":
        return setData({
          title: "Individuals Services",
          title_ar: "خدمات الأفراد",
          submenu: individualsServicesData,
        });
      case "3":
        return setData({
          title: "Supplier Services",
          title_ar: "خدمات الموردين",
          submenu: supplierServicesData,
        });
      case "4":
        return setData({
          title: "Other Services",
          title_ar: "خدمات أخرى",
          submenu: otherServicesData,
        });
    }
  }, [group]);
  const classes = useStyles();
  const cardClasses = useCardStyles();

  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <div className={classes.root}>
        <Typography className={classes.serviceTitle}>
          {isRTL ? data?.title_ar : data?.title}{" "}
        </Typography>
        <Grid container spacing={4}>
          {data?.submenu?.map((item) => (
            <Grid item lg={3} md={4} sm={6} xs={12}>
              <Card
                key={item.serviceId}
                variant="outlined"
                className={cardClasses.root}
              >
                <CardHeader
                  avatar={
                    <Avatar aria-label="serviceIcon" className={classes.avatar}>
                      {item.icon}
                    </Avatar>
                  }
                  title={isRTL ? item.heading_ar : item.heading}
                />

                <CardActions>
                  {item.link && (
                    <>
                      <Link
                        variant="outlined"
                        className="startBtn"
                        to={{
                          pathname: `/services-form${item.link}`,
                          name: isRTL ? item.heading_ar : item.heading,
                        }}
                        style={{
                          transform: isRTL ? "rotateY(180deg)" : "none",
                        }}
                      >
                        <BsPlay />
                      </Link>
                      <Divider orientation="vertical" />
                    </>
                  )}
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
          ))}
        </Grid>
      </div>
    </Container>
  );
}
