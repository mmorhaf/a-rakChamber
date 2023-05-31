import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { TextField } from "formik-material-ui";
import InputLabel from "@material-ui/core/InputLabel";
import { Field } from "formik";
import Button from "@material-ui/core/Button";
import { TextField as TextField2, InputAdornment } from "@material-ui/core";
import useStyles from "../../../styles/components/home/services/search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import actions from "../../../redux/actions";
import store from "../../../redux/store";
import { push } from "connected-react-router";
import { ServicesCardsData } from "../../services/rakChamber/cards/ServicesCardsData";

const {
  postSearchKeyword,
  getEservicesGroups,
  getEservicesList,
  postSearchKeywordData,
} = actions;

function FPBobySerach() {
  const { t } = useTranslation();
  const [servicesGroups, setServicesGroups] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [servicesByGroupList, setServicesByGroupList] = useState([]);

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = { lang: isRTL ? "ar" : "en", ID: 16 };
    dispatch(getEservicesGroups({ data: { ...params } }));
    dispatch(getEservicesList({ data: { ...params } }));
  }, [isRTL]);

  useEffect(() => {
    const result = APIServices.eServicesGroupsReturned;

    if (result) {
      setServicesGroups(
        result?.filter(
          (item) => item.ID != "59" && item.ID != "61" && item.ID != "62"
        )
      );
    }
  }, [APIServices.eServicesGroupsReturned]);

  useEffect(() => {
    const listResult = APIServices.eServicesListReturned;
    let arr1 = [];
    let arr2 = [];
    if (listResult?.services_list) {
      arr1 = listResult?.services_list?.filter(
        (item) =>
          item.service_group_id != "59" &&
          item.service_group_id != "61" &&
          item.service_group_id != "62"
      );
      arr1?.map((item) =>
        !item.sub_services
          ? (arr2 = [...arr2, item])
          : item.sub_services?.length > 0 &&
            item.sub_services?.map((el) => {
              arr2 = [...arr2, el];
            })
      );
    }
    setServicesList(arr2);

    arr2?.map((item) => {
      ServicesCardsData.map((i) => {
        if (Number(item.service_id) == i.serviceId) {
          Object.assign(item, i);
        }
      });
    });
    setServicesByGroupList(arr2);
  }, [APIServices.eServicesListReturned]);

  const initialValues = {
    searchText: "",
    groups: "",
    services: "",
  };

  const doSubmit = async (values, { resetForm }) => {
    const params = { lang: isRTL ? "ar" : "en", keyword: values.searchText };
    values.searchText != ""
      ? dispatch(postSearchKeyword({ data: { ...params } }))
      : dispatch(postSearchKeywordData({ data: [] }));
    store.dispatch(
      push(
        isRTL
          ? `/ar/services/search-services/${
              values.groups ? values.groups.ID : null
            }`
          : `/en/services/search-services/${
              values.groups ? values.groups.ID : null
            }`
      )
    );
  };
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Formik initialValues={initialValues} onSubmit={doSubmit}>
        {({ values, dirty, submitForm, setFieldValue }) => (
          <Form>
            <Grid container className="formContainer">
              <Grid item xs={12} className="formItem">
                <Box className="hintContainer">
                  <Field
                    component={TextField}
                    id="searchText"
                    name="searchText"
                    className="searchTextField"
                    placeholder={t("HEADER.TOOLS.SEARCH")}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid item sm={6} xs={12} className="formItem">
                <Box className="labelContainer">
                  <InputLabel htmlFor="groups">
                    {t("SERVICES.GROUPS")}{" "}
                  </InputLabel>
                </Box>
                <Box className="hintContainer">
                  <Autocomplete
                    component={Autocomplete}
                    id="groups"
                    name="groups"
                    value={values.groups}
                    key="groups"
                    options={servicesGroups ? servicesGroups : []}
                    getOptionLabel={(option) => option?.Title}
                    onChange={(e, value) => {
                      let serviceByGroup = servicesList;
                      value &&
                        (serviceByGroup = servicesList?.filter(
                          (item) => item.service_group_id == value?.ID
                        ));
                      setServicesByGroupList(serviceByGroup);
                      setFieldValue("groups", value);
                    }}
                    renderInput={(params) => (
                      <TextField2
                        {...params}
                        variant="standard"
                        fullWidth
                        placeholder={t("SERVICES.SELECTGROUP")}
                      />
                    )}
                    PaperComponent={({ children }) => (
                      <Paper
                        style={{
                          textTransform: "capitalize",
                          direction: isRTL ? "rtl" : "ltr",
                          fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                        }}
                      >
                        {children}
                      </Paper>
                    )}
                    className={classes.autoComplete}
                  />
                </Box>
              </Grid>{" "}
              <Grid item sm={6} xs={12} className="formItem">
                <Box className="labelContainer">
                  <InputLabel htmlFor="services">
                    {t("SERVICES.SERVICENAME")}
                  </InputLabel>
                </Box>
                <Box className="hintContainer">
                  <Autocomplete
                    component={Autocomplete}
                    id="services"
                    name="services"
                    options={servicesByGroupList ? servicesByGroupList : []}
                    getOptionLabel={(option) =>
                      option?.service_name ? option?.service_name : ""
                    }
                    onChange={(e, value) => {
                      setFieldValue("services", value);
                      let groupService = null;
                      value &&
                        (groupService = servicesGroups?.find(
                          (item) => item.ID == value?.service_group_id
                        ));
                      !value && setServicesByGroupList(servicesList);
                      setFieldValue("groups", groupService);
                    }}
                    renderInput={(params) => (
                      <TextField2
                        {...params}
                        variant="standard"
                        fullWidth
                        placeholder={t("SERVICES.SELECTSERVICE")}
                      />
                    )}
                    PaperComponent={({ children }) => (
                      <Paper
                        style={{
                          textTransform: "capitalize",
                          direction: isRTL ? "rtl" : "ltr",
                          fontFamily: isRTL ? "Noto" : "OpenSansRegular",
                        }}
                      >
                        {children}
                      </Paper>
                    )}
                    className={classes.autoComplete}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} className="btnContainer">
                <Button
                  onClick={
                    values.services
                      ? () =>
                          store.dispatch(
                            push({
                              pathname: isRTL
                                ? `/ar/services/rak-chamber/services-details/${values.services.service_id}`
                                : `/en/services/rak-chamber/services-details/${values.services.service_id}`,
                              state: values.services.link
                                ? `/services-form${values.services.link}`
                                : false,
                            })
                          )
                      : submitForm
                  }
                  variant="contained"
                  disabled={
                    values.searchText == "" &&
                    !values.services &&
                    !values.groups
                  }
                >
                  {t("HOME.SERVICES.SEARCH.BUTTONS.SEARCH")}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => store.dispatch(push("/services/rak-chamber"))}
                >
                  {t("HOME.SERVICES.SEARCH.BUTTONS.VIEWALL")}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default memo(FPBobySerach);
