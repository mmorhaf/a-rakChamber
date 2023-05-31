import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Typography, Tab, Grid, Paper } from "@material-ui/core";
import { BiHomeAlt } from "react-icons/bi";
import actions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Map from "../shared/map/Map";
import useStyles from "../../styles/components/contactForm/contactForm";
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
        <Box sx={{ p: 3 }}>
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

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const { getAllCenters, loadingAction } = actions;
export default function ContactTabs() {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();

  // const reducers = useSelector((state) => state);
  const { allCentersReturned } = useSelector((state) => state.happinessCenter);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    dispatch(loadingAction({ loading: true }));
    const language = isRTL ? "ar" : "en";
    dispatch(getAllCenters({ language }));
  }, [isRTL]);

  useEffect(() => {
    const returnedData = allCentersReturned || [];

    if (returnedData.length)
      setData(
        returnedData?.sort((a, b) => (a?.branchNum > b?.branchNum ? 1 : -1))
      );
    dispatch(loadingAction({ loading: false }));
  }, [allCentersReturned]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          {data?.map((item, i) => {
            return (
              <Tab
                label={
                  item?.branchNum === 0 ? (
                    <BiHomeAlt />
                  ) : item?.branchNum ? (
                    isRTL ? (
                      `الفرع ${item?.branchNum}`
                    ) : (
                      `Branch ${item?.branchNum}`
                    )
                  ) : isRTL ? (
                    "الفرع"
                  ) : (
                    "Branch"
                  )
                }
                className={classes.tabs}
                {...a11yProps(i)}
              />
            );
          })}
        </Tabs>
      </Box>
      {data?.map((item, i) => {
        return (
          <TabPanel value={value} index={i}>
            <Box className={classes.centers}>
              {item.title && (
                <Typography className="locTitle">{item.title}</Typography>
              )}
              {item.description ? (
                <Typography
                  className="locDesc"
                  dangerouslySetInnerHTML={{
                    __html: `${item.description}`,
                  }}
                />
              ) : (
                <Box className="locDesc"></Box>
              )}
              <Box display="flex" alignItems="center" paddingY={0.5}>
                <Typography className="locLabel">
                  {isRTL ? "الهاتف" : "Telephone"}:{" "}
                </Typography>
                <Typography className="locValue tele">
                  {" "}
                  {item.telePhone}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" paddingY={0.5}>
                <Typography className="locLabel">
                  {isRTL ? "البريد الإلكتروني" : "Email"}:{" "}
                </Typography>
                <Typography className="locValue"> {item.email}</Typography>
              </Box>
              <Box display="flex" alignItems="center" paddingY={0.5}>
                <Typography className="locLabel">
                  {isRTL ? "الموقع" : "Location"}:{" "}
                </Typography>
                <Typography
                  className="locValue"
                  dangerouslySetInnerHTML={{
                    __html: `${item?.location}`,
                  }}
                ></Typography>
              </Box>
              {item?.workingHours ? (
                <Box display="flex" alignItems="center" paddingY={0.5}>
                  <Typography className={"locLabel"}>
                    {isRTL ? "ساعات العمل" : "Working Hours"}:{" "}
                  </Typography>
                  <Typography
                    className="locValue"
                    dangerouslySetInnerHTML={{
                      __html: `${item?.workingHours}`,
                    }}
                  />
                </Box>
              ) : (
                <Box className={classes.minHeight48}></Box>
              )}
              {item?.latitude && item?.longitude && (
                <Grid
                  container
                  className={(classes.container, classes.down5)}
                  spacing={0}
                  direction="row"
                >
                  <Paper className={classes.map}>
                    <Map lat={item?.latitude} lng={item?.longitude} />
                  </Paper>
                </Grid>
              )}
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
}
