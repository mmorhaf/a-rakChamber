import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React, { memo, useEffect, useState } from "react";
import { BsPlay, BsInfoCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import actions from "../../../../redux/actions";
import useCardStyles from "../../../../styles/components/services/serviceCard";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { ServicesCardsData } from "./ServicesCardsData";

const { getEservicesGroups, getEservicesList } = actions;
function ServicesCards(props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const {
    APIServices,
    services,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [servicesGroups, setServicesGroups] = useState(null);
  const [servicesList, setServicesList] = useState(null);
  const [expanded, setExpanded] = useState("panel0");
  const [collapse, setCollapse] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  useEffect(() => {
    const params = { lang: isRTL ? "ar" : "en", ID: 16 };
    dispatch(getEservicesGroups({ data: { ...params } }));
    dispatch(getEservicesList({ data: { ...params } }));
  }, [isRTL]);

  useEffect(() => {
    const result = APIServices.eServicesGroupsReturned;
    if (result) {
      switch (props.type) {
        case "chamber":
          return setServicesGroups(
            result?.filter(
              (item) => item.ID != "59" && item.ID != "61" && item.ID != "62"
            )
          );
        case "arb":
          return setServicesGroups(result?.filter((item) => item.ID == "59"));
        case "SME":
          return setServicesGroups(result?.filter((item) => item.ID == "61"));
        case "EX":
          return setServicesGroups(result?.filter((item) => item.ID == "62"));
        default:
          return setServicesGroups(result);
      }
    }
  }, [APIServices.eServicesGroupsReturned]);

  useEffect(() => {
    const listResult = APIServices.eServicesListReturned;
    let array = listResult?.services_list;
    let arrayitem = {};
    if (listResult) {
      array?.length > 0 &&
        array?.map((item) => {
          ServicesCardsData.map((i) => {
            if (Number(item.service_id) == i.serviceId) {
              Object.assign(item, i);
            }
            item.sub_services?.length > 0 &&
              item.sub_services?.map((el) => {
                if (Number(el.service_id) == i.serviceId) {
                  Object.assign(el, i);
                }
              });
          });
        });
      setServicesList(array);
    }
  }, [APIServices.eServicesListReturned]);
  return (
    <Grid container className={classes.serviceCards}>
      <Grid container item className={classes.block}>
        {servicesGroups?.length
          ? servicesGroups?.map((category, index) => (
              <Accordion
                expanded={expanded === `panel${index}` || !collapse}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{category.Title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={4}>
                    {servicesList?.map((item) =>
                      !item.sub_services &&
                      category.ID == item.service_group_id ? (
                        <Grid item lg={3} md={4} sm={6} xs={12}>
                          <Card
                            key={item.service_code}
                            variant="outlined"
                            className={cardClasses.root}
                          >
                            <CardHeader
                              avatar={
                                <Avatar
                                  aria-label="serviceIcon"
                                  className={classes.avatar}
                                >
                                  {item.icon}
                                </Avatar>
                              }
                              className={
                                item.public == false &&
                                profile &&
                                profile?.blocked == 1 &&
                                "disabledTitle"
                              }
                              title={item.service_name}
                            />

                            <CardActions>
                              {item.service_form && (
                                <>
                                  {!item.public &&
                                  profile &&
                                  profile?.blocked == 1 ? (
                                    <Box
                                      variant="outlined"
                                      className="disabledBtn"
                                      style={{
                                        transform: isRTL
                                          ? "rotateY(180deg)"
                                          : "none",
                                      }}
                                    >
                                      <BsPlay />
                                    </Box>
                                  ) : (
                                    <Link
                                      variant="outlined"
                                      className="startBtn"
                                      to={{
                                        pathname: !item.public
                                          ? profile == null
                                            ? "/login"
                                            : profile &&
                                              item.roles?.includes(
                                                parseInt(loggedType)
                                              )
                                            ? `/services-form${item.link}`
                                            : "/login"
                                          : `/services-form${item.link}`,
                                        id: item.serviceId,
                                        name: item.heading,
                                      }}
                                      style={{
                                        transform: isRTL
                                          ? "rotateY(180deg)"
                                          : "none",
                                      }}
                                    >
                                      <BsPlay />
                                    </Link>
                                  )}
                                  <Divider orientation="vertical" />
                                </>
                              )}
                              <Link
                                variant="outlined"
                                className="moreInfoBtn"
                                to={{
                                  pathname: isRTL
                                    ? `/ar/services/rak-chamber/services-details/${item.service_id}`
                                    : `/en/services/rak-chamber/services-details/${item.service_id}`,
                                  state: item.link
                                    ? `/services-form${item.link}`
                                    : false,
                                }}
                              >
                                <BsInfoCircle />
                              </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      ) : item.sub_services &&
                        item.sub_services?.length > 0 &&
                        category.ID == item.service_group_id ? (
                        item.sub_services.map((i) => (
                          <Grid item lg={3} md={4} sm={6} xs={12}>
                            <Card
                              key={i.service_code}
                              variant="outlined"
                              className={cardClasses.root}
                            >
                              <CardHeader
                                avatar={
                                  <Avatar
                                    aria-label="serviceIcon"
                                    className={classes.avatar}
                                  >
                                    {i.icon}
                                  </Avatar>
                                }
                                className={
                                  !i.public &&
                                  profile &&
                                  profile?.blocked == 1 &&
                                  "disabledTitle"
                                }
                                title={i.service_name}
                              />
                              <CardActions>
                                {i.service_form && (
                                  <>
                                    {!i.public &&
                                    profile &&
                                    profile?.blocked == 1 ? (
                                      <Box
                                        variant="outlined"
                                        className="disabledBtn"
                                        style={{
                                          transform: isRTL
                                            ? "rotateY(180deg)"
                                            : "none",
                                        }}
                                      >
                                        <BsPlay />
                                      </Box>
                                    ) : (
                                      <Link
                                        variant="outlined"
                                        className="startBtn"
                                        to={{
                                          pathname: !i.public
                                            ? profile == null
                                              ? "/login"
                                              : profile &&
                                                i.roles?.includes(
                                                  parseInt(loggedType)
                                                )
                                              ? `/services-form${i.link}`
                                              : "/login"
                                            : `/services-form${i.link}`,
                                          id: i.id,
                                          name: i.heading,
                                        }}
                                        style={{
                                          transform: isRTL
                                            ? "rotateY(180deg)"
                                            : "none",
                                        }}
                                      >
                                        <BsPlay />
                                      </Link>
                                    )}
                                    <Divider orientation="vertical" />
                                  </>
                                )}
                                <Link
                                  variant="outlined"
                                  className="moreInfoBtn"
                                  to={{
                                    pathname: isRTL
                                      ? `/ar/services/rak-chamber/services-details/${i.service_id}`
                                      : `/en/services/rak-chamber/services-details/${i.service_id}`,
                                    state: i.link
                                      ? `/services-form${i.link}`
                                      : false,
                                  }}
                                >
                                  <BsInfoCircle />
                                </Link>
                              </CardActions>
                            </Card>
                          </Grid>
                        ))
                      ) : null
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            ))
          : null}
      </Grid>
    </Grid>
  );
}

export default memo(ServicesCards);
