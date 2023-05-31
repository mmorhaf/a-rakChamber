import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardActions,
  CardHeader,
  Avatar,
  Divider,
  Container,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import useStyles from "../../../styles/components/services/servicesTabPane";
import useCardStyles from "../../../styles/components/services/serviceCard";
import { useParams } from "react-router";

import actions from "../../../redux/actions";
import { ServicesCardsData } from "../../services/rakChamber/cards/ServicesCardsData";
import { Link } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { HiChevronDoubleRight } from "react-icons/hi";
import { HiChevronDoubleLeft } from "react-icons/hi";
import ServicesSearch from "../../services/rakChamber/cards/Search";
const { getEservicesGroups, getEservicesList } = actions;
function SearchServicesCards(props) {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const { group } = useParams();
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [servicesGroups, setServicesGroups] = useState(null);
  const [servicesList, setServicesList] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let loggedType = sessionStorage.getItem("loggedType");

  useEffect(() => {
    const params = { lang: isRTL ? "ar" : "en", ID: 16 };
    dispatch(getEservicesGroups({ data: { ...params } }));
    dispatch(getEservicesList({ data: { ...params } }));
  }, [isRTL]);

  useEffect(() => {
    const result = APIServices.searchByKeywordData;
    let resultByGroup = [];
    if (group != "null") {
      if (result?.result) {
        resultByGroup = result?.result.filter(
          (item) => item.department_id == "16"
        );
        setSearchResult(
          resultByGroup?.filter((item) => item.service_group_id == group)
        );
      } else {
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
      }
    } else if (result?.result) {
      setSearchResult(
        result?.result.filter((item) => item.department_id == "16")
      );
    }
  }, [APIServices.searchByKeywordData, APIServices.eServicesListReturned]);
  useEffect(() => {
    const result = APIServices.eServicesGroupsReturned;
    if (result) {
      if (group != "null") {
        setServicesGroups(
          APIServices.eServicesGroupsReturned?.filter(
            (item) => item.ID == group
          )
        );
      } else {
        let mainGroups = [];
        let searchedGroups = [];
        mainGroups = result?.filter(
          (item) => item.ID != "59" && item.ID != "61" && item.ID != "62"
        );
        searchResult?.map((item) =>
          mainGroups?.map((i) =>
            item.service_group_id == i.ID && searchedGroups?.indexOf(i) === -1
              ? (searchedGroups = [...searchedGroups, i])
              : searchedGroups
          )
        );
        setServicesGroups(searchedGroups);
      }
    }
  }, [APIServices.eServicesGroupsReturned, searchResult]);

  useEffect(() => {
    let array = searchResult;
    if (searchResult) {
      array?.length > 0 &&
        array?.map((item) => {
          ServicesCardsData?.map((i) => {
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
  }, [searchResult]);
  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <ServicesSearch />

      <Grid container className={classes.serviceCards}>
        <Grid container item className={classes.block}>
          {servicesGroups?.length ? (
            servicesGroups?.map((category) => (
              <Accordion expanded>
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
                              title={item.service_name}
                            />

                            <CardActions>
                              {item.service_form && (
                                <>
                                  {" "}
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
                                      id: item.id,
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
                                {isRTL ? (
                                  <HiChevronDoubleLeft />
                                ) : (
                                  <HiChevronDoubleRight />
                                )}
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
                                title={i.service_name}
                              />

                              <CardActions>
                                {i.service_form && (
                                  <>
                                    {" "}
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
                                  {isRTL ? (
                                    <HiChevronDoubleLeft />
                                  ) : (
                                    <HiChevronDoubleRight />
                                  )}
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
          ) : (
            <p className="noResults">No reasults found</p>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(SearchServicesCards);
