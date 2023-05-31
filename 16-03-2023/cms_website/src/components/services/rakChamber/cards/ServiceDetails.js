import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Tab,
  Tabs,
  Typography,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Add, Remove } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import clsx from "clsx";
import { push } from "connected-react-router";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMobile } from "react-icons/ai";
import { BiLinkAlt } from "react-icons/bi";
import { CgLaptop } from "react-icons/cg";
import {
  HiOutlineEmojiHappy,
  HiOutlineMail,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { IoCallOutline, IoEarth } from "react-icons/io5";
import {
  MdMiscellaneousServices,
  MdFormatListNumbered,
  MdOutlineChecklist,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import actions from "../../../../redux/actions";
import { store } from "../../../../redux/store";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { ServicesCardsData } from "./ServicesCardsData";
import { PRODUCTION } from "../../../../constants/config.json";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const { getEservicesDetails, getQrcode } = actions;

function ServiceDetails(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [expanded1, setExpanded1] = useState(true);
  const [expanded2, setExpanded2] = useState(true);
  const [expanded3, setExpanded3] = useState(true);
  const [expanded4, setExpanded4] = useState(true);
  const [expanded5, setExpanded5] = useState(true);
  const [expanded6, setExpanded6] = useState(true);
  const [expanded7, setExpanded7] = useState(true);
  const [expanded8, setExpanded8] = useState(true);
  const [expanded9, setExpanded9] = useState(true);
  const [expanded10, setExpanded10] = useState(true);
  const [expanded11, setExpanded11] = useState(true);
  const [expanded12, setExpanded12] = useState(true);
  const [data, setData] = useState("");
  const [QRCode, setQRCode] = useState("");
  const [value, setValue] = useState(0);
  const [link, setLink] = useState(false);
  const [publicService, setPublicService] = useState(false);
  const {
    APIServices,
    services,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  let profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let { serviceName, id } = useParams();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const params = { lang: isRTL ? "ar" : "en", ID: id };
    dispatch(getEservicesDetails({ data: { ...params } }));
  }, [isRTL]);

  useEffect(() => {
    const result = services.QRCode;
    if (result) setQRCode(result?.result);
  }, [services.QRCode]);

  useEffect(() => {
    const result = APIServices.eServicesDetailsReturned;
    if (result) {
      setData(result);

      ServicesCardsData.map((i) => {
        if (id == i.serviceId) {
          if (i?.public) setPublicService(i?.public);
          if (i.link) {
            setLink(`/services-form${i.link}`);

            dispatch(
              getQrcode({
                data: {
                  text: `${PRODUCTION}/services-form${i.link}`,
                },
              })
            );
          }
        }
      });
    }
  }, [APIServices.eServicesDetailsReturned]);
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      "aria-controls": `scrollable-force-tabpanel-${index}`,
    };
  }
  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <Grid container className={classes.serviceDetailsRoot}>
        <Grid container item xs={12} style={{ marginBottom: 32 }}>
          {/* <Grid
            container
            item
            md={3}
            sm={5}
            xs={12}
            className={classes.serviceHeaderCards}
          >
            <Grid item xs={12}>
              <Typography className={classes.cardsTitle}>
                {t("SERVICESPAGES.SERVICEDETAILS.SECTOR")}
              </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.flex}>
              <Grid item sm={3} xs={2} className={classes.marginLeft12}>
                <img
                  src="/assets/icons/building.png"
                  alt="RAK Chamber Department"
                />
              </Grid>
              <Grid item sm={9} xs={10} className={classes.paddingTop8}>
                <Typography className={classes.cardsSubTitle}>
                  {data.department_name}
                </Typography>
              </Grid>
            </Grid>
          </Grid> */}
          <Grid
            container
            item
            md={4}
            sm={5}
            xs={12}
            className={classes.serviceHeaderCards}
          >
            {" "}
            <Grid item xs={12}>
              <Typography className={classes.cardsTitle}>
                {t("SERVICESPAGES.SERVICEDETAILS.TYPE")}
              </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.flex}>
              <Grid item sm={3} xs={2} className={classes.marginLeft12}>
                <img src="/assets/icons/edit.png" alt="Service Type" />
              </Grid>
              <Grid item sm={9} xs={10} className={classes.paddingTop8}>
                <Typography className={classes.cardsSubTitle}>
                  {data.service_type}
                </Typography>
              </Grid>
            </Grid>
          </Grid>{" "}
          <Grid
            container
            item
            md={4}
            sm={5}
            xs={12}
            className={classes.serviceHeaderCards}
          >
            {" "}
            <Grid item xs={12}>
              <Typography className={classes.cardsTitle}>
                {t("SERVICESPAGES.SERVICEDETAILS.CHANELS")}
              </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.flex}>
              <Box className={classes.channels}>
                {data.service_channels?.length &&
                  data.service_channels.map((item) =>
                    item.id == 18 ? (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <HiOutlineEmojiHappy />
                        </IconButton>
                      </Tooltip>
                    ) : item.id == 19 ? (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <CgLaptop />
                        </IconButton>
                      </Tooltip>
                    ) : item.id == 20 ? (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <AiOutlineMobile />
                        </IconButton>
                      </Tooltip>
                    ) : item.id == 21 ? (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <HiOutlineMail />
                        </IconButton>
                      </Tooltip>
                    ) : item.id == 22 ? (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <IoCallOutline />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title={item.title}>
                        <IconButton>
                          <IoEarth />
                        </IconButton>
                      </Tooltip>
                    )
                  )}
              </Box>
            </Grid>
          </Grid>{" "}
          <Grid
            container
            item
            md={4}
            sm={5}
            xs={12}
            className={clsx(classes.serviceHeaderCards, classes.rightBorder)}
          >
            {" "}
            <Grid item xs={12}>
              <Typography className={classes.cardsTitle}>
                {t("SERVICESPAGES.SERVICEDETAILS.RATING")}
              </Typography>
            </Grid>
            <Grid container item xs={12} className={classes.flex}>
              <Grid item xs={12} className={classes.rating}>
                <Rating value="2" className={classes.gold} />
              </Grid>
            </Grid>
          </Grid>
          <div className={classes.rightBorderBox}></div>
        </Grid>
        <Grid container item xs={12} className={classes.reverse}>
          <Grid
            container
            item
            md={8}
            lg={8}
            sm={12}
            xs={12}
            className={classes.block}
          >
            <Typography className={classes.serviceTitle}>
              {data.service_name}
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              className={classes.detailsTabs}
            >
              <Tab
                label={t("SERVICESPAGES.SERVICEDETAILS.SERVICEINFO")}
                className="tabs"
                {...a11yProps(0)}
                icon={<MdMiscellaneousServices />}
              />
              <Tab
                label={t("SERVICESPAGES.SERVICEDETAILS.STEPSS")}
                className="tabs"
                {...a11yProps(1)}
                icon={<MdFormatListNumbered />}
              />
              <Tab
                label={t("SERVICESPAGES.SERVICEDETAILS.TERMSS")}
                className="tabs"
                icon={<MdOutlineChecklist />}
                {...a11yProps(2)}
              />
              <Tab
                label={t("SERVICESPAGES.SERVICEDETAILS.OTHERS")}
                className="tabs"
                icon={<HiOutlineInformationCircle />}
                {...a11yProps(3)}
              />
            </Tabs>
            <TabPanel value={value} index={0} className={classes.paddingTop15}>
              <Accordion
                expanded={expanded1}
                onChange={() => setExpanded1(!expanded1)}
              >
                <AccordionSummary
                  expandIcon={expanded1 ? <Remove /> : <Add />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.STRUCTURING")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_description && (
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: `${data.service_description}`,
                        }}
                      ></Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded2}
                onChange={() => setExpanded2(!expanded2)}
              >
                <AccordionSummary
                  expandIcon={expanded2 ? <Remove /> : <Add />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.PROVIDER")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_group_name && (
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: `${data.service_group_name}`,
                        }}
                      ></Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded3}
                onChange={() => setExpanded3(!expanded3)}
              >
                <AccordionSummary
                  expandIcon={expanded3 ? <Remove /> : <Add />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.CATEGORY")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_customer_type?.length ? (
                      <Box
                        className={classes.flexBox}
                        display="flex"
                        width="100%"
                        justifyContent="space-around"
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                data.service_customer_type.filter(
                                  (item) => item.main.id == 11
                                )[0]
                                  ? true
                                  : false
                              }
                              disabled
                              name="Goverment"
                            />
                          }
                          label={isRTL ? "الحكومة" : "Government"}
                        />

                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                data.service_customer_type.filter(
                                  (item) => item.main.id == 13
                                )[0]
                                  ? true
                                  : false
                              }
                              disabled
                              name="Business"
                            />
                          }
                          label={isRTL ? "الأعمال" : "Business"}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                data.service_customer_type.filter(
                                  (item) => item.main.id == 12
                                )[0]
                                  ? true
                                  : false
                              }
                              disabled
                              name="Customers"
                            />
                          }
                          label={isRTL ? "الأفراد" : "Individuals"}
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                data.service_customer_type.filter(
                                  (item) => item.main.id == 61
                                )[0]
                                  ? true
                                  : false
                              }
                              disabled
                              name="Public"
                            />
                          }
                          label={isRTL ? "المجتمع" : "Community"}
                        />
                      </Box>
                    ) : (
                      ""
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded5}
                onChange={() => setExpanded5(!expanded5)}
              >
                <AccordionSummary
                  expandIcon={expanded5 ? <Remove /> : <Add />}
                  aria-controls="panel5a-content"
                  id="panel5a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.DOCUMENTS")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {data.service_required_documents?.length &&
                      data.service_required_documents.map((item) => (
                        <Typography
                          dangerouslySetInnerHTML={{
                            __html: `- ${item.document_description?.replace(
                              /\n/g,
                              "<br/>"
                            )}`,
                          }}
                        ></Typography>
                      ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded9}
                onChange={() => setExpanded9(!expanded9)}
              >
                <AccordionSummary
                  expandIcon={expanded9 ? <Remove /> : <Add />}
                  aria-controls="panel9a-content"
                  id="panel9a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.RELATEDSERVICES")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {data.service_related_services?.length &&
                      data.service_related_services.map(
                        (item) =>
                          item.service_name != null && (
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: `- ${item.service_name}`,
                              }}
                            ></Typography>
                          )
                      )}
                  </Box>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded10}
                onChange={() => setExpanded10(!expanded10)}
              >
                <AccordionSummary
                  expandIcon={expanded10 ? <Remove /> : <Add />}
                  aria-controls="panel10a-content"
                  id="panel10a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.PREVIOUSSERVICES")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {data.service_previous_services?.length &&
                      data.service_previous_services.map(
                        (item) =>
                          item.service_name != null && (
                            <Typography
                              dangerouslySetInnerHTML={{
                                __html: `- ${item.service_name}`,
                              }}
                            ></Typography>
                          )
                      )}
                  </Box>
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={expanded7}
                onChange={() => setExpanded7(!expanded7)}
              >
                <AccordionSummary
                  expandIcon={expanded7 ? <Remove /> : <Add />}
                  aria-controls="panel7a-content"
                  id="panel7a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.APPLCATION")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_forms && (
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: `${data.service_forms}`,
                        }}
                      ></Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded8}
                onChange={() => setExpanded8(!expanded8)}
              >
                <AccordionSummary
                  expandIcon={expanded8 ? <Remove /> : <Add />}
                  aria-controls="panel8a-content"
                  id="panel8a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.LIMITATION")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_limitation && (
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: `${data.service_limitation}`,
                        }}
                      ></Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.paddingTop15}>
              <Accordion
                expanded={expanded6}
                onChange={() => setExpanded6(!expanded6)}
              >
                <AccordionSummary
                  expandIcon={expanded6 ? <Remove /> : <Add />}
                  aria-controls="panel6a-content"
                  id="panel6a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.STEPS")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Box>
                      {data.service_steps?.length &&
                        data.service_steps.map((item, index) => (
                          <Typography
                            dangerouslySetInnerHTML={{
                              __html: `${index + 1} - ${item.description}`,
                            }}
                          ></Typography>
                        ))}
                    </Box>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.paddingTop15}>
              <Accordion
                expanded={expanded4}
                onChange={() => setExpanded4(!expanded4)}
              >
                <AccordionSummary
                  expandIcon={expanded4 ? <Remove /> : <Add />}
                  aria-controls="panel4a-content"
                  id="panel4a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.TERMS")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    {data.service_terms && (
                      <Typography
                        dangerouslySetInnerHTML={{
                          __html: `${data.service_terms}`,
                        }}
                      ></Typography>
                    )}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </TabPanel>
            <TabPanel value={value} index={3} className={classes.paddingTop15}>
              <Accordion
                expanded={expanded11}
                onChange={() => setExpanded11(!expanded11)}
              >
                <AccordionSummary
                  expandIcon={expanded11 ? <Remove /> : <Add />}
                  aria-controls="panel11a-content"
                  id="panel11a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.RATIFICATION.ATTACH")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data.service_attachments?.length &&
                    data.service_attachments?.map((item) => (
                      <a href={item.url} rel="noreferrer" target="_blank">
                        <Box className="attachLink">
                          <BiLinkAlt />
                          {"   "}
                          {item.description}
                        </Box>{" "}
                      </a>
                    ))}
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded12}
                onChange={() => setExpanded12(!expanded12)}
              >
                <AccordionSummary
                  expandIcon={expanded12 ? <Remove /> : <Add />}
                  aria-controls="panel12a-content"
                  id="panel12a-header"
                >
                  <Typography>
                    {t("SERVICESPAGES.SERVICEDETAILS.LINKS")}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {data.service_useful_links && (
                    <Typography
                      dangerouslySetInnerHTML={{
                        __html: ` ${data.service_useful_links}`,
                      }}
                    ></Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            </TabPanel>
          </Grid>
          <Grid
            container
            item
            xs={4}
            className={clsx(classes.block, classes.cards, classes.lessWidth)}
          >
            {link && (
              <Grid
                container
                item
                sm={12}
                xs={3}
                className={clsx(
                  classes.center,
                  classes.sideMenuCard,
                  classes.leftServiceBtn
                )}
              >
                <Button
                  onClick={() => {
                    store.dispatch(push(link));
                  }}
                  className={classes.button}
                  disabled={
                    profile && profile?.blocked === 1 && publicService == false
                  }
                >
                  {t("SERVICESPAGES.SERVICEDETAILS.STARTSERVICE")}
                </Button>
              </Grid>
            )}
            {QRCode && (
              <Grid
                container
                item
                sm={12}
                xs={3}
                className={clsx(classes.qrCode, classes.sideMenuCard)}
              >
                <img src={QRCode} alt="RAK Chamber Department" />
              </Grid>
            )}
            <Grid
              container
              item
              sm={12}
              xs={3}
              className={clsx(
                classes.sideBarParagraph,
                classes.edges,
                classes.sideMenuCard
              )}
            >
              <Grid
                container
                item
                xs={12}
                className={clsx(classes.billBoxHeight, classes.centered)}
              >
                <img
                  src="/assets/icons/money.png"
                  alt="money Icon"
                  className={classes.marginLeft11}
                />
              </Grid>
              <Grid container item xs={12} className={classes.centered}>
                <Typography className={classes.sideBarTitle}>
                  {t("SERVICESPAGES.SERVICEDETAILS.CHARGES")}
                </Typography>
              </Grid>
              <Grid container item xs={12} className={classes.centered}>
                {data?.service_fees_description?.includes("https") ||
                data?.service_fees_description?.includes("http") ? (
                  <Typography className={classes.sideBarBody}>
                    <a
                      href={data.service_fees_description.substring(
                        data.service_fees_description.lastIndexOf("http"),

                        data.service_fees_description?.length
                      )}
                      className={classes.sideBarBody}
                    >
                      {data.service_fees_description}
                    </a>
                  </Typography>
                ) : (
                  <Typography className={classes.sideBarBody}>
                    {data.service_fees_description}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={3}
              className={clsx(
                classes.sideBarParagraph,
                classes.edges,
                classes.sideMenuCard
              )}
            >
              <Grid
                container
                item
                xs={12}
                className={clsx(classes.timeBoxHeight, classes.centered)}
              >
                <img
                  src="/assets/icons/time.png"
                  alt="Time icon"
                  className={classes.marginLeft11}
                />
              </Grid>
              <Grid container item xs={12} className={classes.centered}>
                <Typography className={classes.sideBarTitle}>
                  {t("SERVICESPAGES.SERVICEDETAILS.DURATION")}
                </Typography>
              </Grid>
              <Grid container item xs={12} className={classes.centered}>
                <Typography className={classes.sideBarBody}>
                  {data.service_processing_time}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sm={12}
              xs={3}
              className={clsx(
                classes.sideBarParagraph,
                classes.noBottomBorder,
                classes.edges,
                classes.sideMenuCard
              )}
            >
              <Grid container item xs={12} className={classes.centered}>
                <img
                  src="/assets/icons/phone.png"
                  alt="phone icon"
                  className={classes.marginLeft11}
                />
              </Grid>
              <Grid
                container
                item
                xs={12}
                className={clsx(classes.maxHeight24, classes.centered)}
              >
                <Link
                  to={{
                    pathname: isRTL
                      ? "/ar/contactus/contactus"
                      : "/en/contactus/contactus",
                    state: "inquiry",
                  }}
                  className={classes.link}
                >
                  {t("SERVICESPAGES.SERVICEDETAILS.INQUIRIES")}
                </Link>
              </Grid>

              <Grid container item xs={12} className={classes.centered}>
                <Box mt={2}>
                  <a
                    href="/services-form/OtherServicesForm/Technical Support"
                    className={classes.link}
                  >
                    {t("SERVICESPAGES.SERVICEDETAILS.TECHNICALSUPPORT")}
                  </a>
                </Box>
              </Grid>
            </Grid>
            {link && (
              <Grid
                container
                item
                sm={12}
                xs={3}
                className={clsx(
                  classes.center,
                  classes.sideMenuCard,
                  classes.rightServiceBtn
                )}
              >
                <Button
                  onClick={() => {
                    store.dispatch(push(link));
                  }}
                  className={classes.button}
                  disabled={
                    profile && profile?.blocked === 1 && publicService == false
                  }
                >
                  {t("SERVICESPAGES.SERVICEDETAILS.STARTSERVICE")}
                </Button>
              </Grid>
            )}
            <Grid
              container
              item
              sm={12}
              xs={3}
              className={clsx(classes.RightQrCode, classes.sideMenuCard)}
            >
              <img src={QRCode} alt="RAK Chamber Department" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default memo(ServiceDetails);
