import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeletedRequestTable from "./DeletedRequestTable";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
import {
  Grid,
  TextField,
  Box,
  InputAdornment,
  Button,
  Typography,
} from "@material-ui/core";
import actions from "../../../../redux/actions";
import { GoSearch } from "react-icons/go";
import { useTranslation } from "react-i18next";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";

const { getRakRequestsList } = actions;

export default function DeletedRequestsList() {
  const { t } = useTranslation();

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [myRequests, setMyRequests] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const classes = useStyles();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let updateUser = sessionStorage.getItem("updateUser");
  useEffect(() => {
    setTimeout(() => {
      let clear = sessionStorage.getItem("clear");
      if (clear) {
        setOpen(true);
        setMessage(
          isRTL
            ? ".انتهت صلاحية الجلسة , أعد تسجيل الدخول من فضلك"
            : "Your Session has Expired , Please Log in again."
        );
        setRoting("/login");
        setNoThanks(true);
      } else if (profile == null) store.dispatch(push("/login"));
      if (updateUser) store.dispatch(push("/services-form/profile"));
    }, 1000);
  }, [APIServices.serviceLogInDone]);

  useEffect(() => {
    const company_code = profile?.company_code;
    const code = profile?.code;
    const day_number = 15;

    dispatch(
      getRakRequestsList(
        company_code
          ? { data: { company_code, day_number } }
          : { data: { code, day_number } }
      )
    );
  }, []);
  useEffect(() => {
    if (APIServices.rakRequestListDone) {
      const subArray = [];
      const array = subArray.concat(
        APIServices.rakRequestListDone?.coo_list_CR
          ? APIServices.rakRequestListDone?.coo_list_CR
          : [],
        APIServices.rakRequestListDone?.additional_request_list_C
          ? APIServices.rakRequestListDone?.additional_request_list_C
          : [],
        APIServices.rakRequestListDone?.additional_MR_list
          ? APIServices.rakRequestListDone?.additional_MR_list
          : [],
        APIServices.rakRequestListDone?.ratification_by_emp
          ? APIServices.rakRequestListDone?.ratification_by_emp
          : [],
        APIServices.rakRequestListDone?.ratification_request
          ? APIServices.rakRequestListDone?.ratification_request
          : [],
        APIServices.rakRequestListDone?.ratification
          ? APIServices.rakRequestListDone?.ratification
          : [],
        APIServices.rakRequestListDone?.coo_by_emp
          ? APIServices.rakRequestListDone?.coo_by_emp
          : [],
        APIServices.rakRequestListDone?.p_coo_by_emp
          ? APIServices.rakRequestListDone?.p_coo_by_emp
          : []
      );
      setMyRequests(array?.filter((req) => req.status === 5));
      setSearchResults(array?.filter((req) => req.status === 5));
    }
  }, [APIServices.rakRequestListDone]);

  const filter = (arr, val) => {
    setSearchValue(val);
    let selected = [];
    if (!val) setSearchResults(arr);
    arr.map((a) => {
      for (var p in a) {
        if (JSON.stringify(a[p]).includes(val)) {
          selected.push(a);
          break;
        }
      }
    });

    return setSearchResults(selected);
  };

  return (
    <Grid container className={classes.requestListRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.DELETED.TITLE")}
      </Typography>
      <Box className={classes.searchBox}>
        <TextField
          id="standard-basic"
          placeholder={isRTL ? "البحث" : "Search"}
          value={searchValue}
          onChange={(e) => filter(myRequests, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GoSearch color={"#969696"} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <ServicesResultModal
        open={open}
        setOpen={setOpen}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
      <DeletedRequestTable data={searchResults}></DeletedRequestTable>
    </Grid>
  );
}
