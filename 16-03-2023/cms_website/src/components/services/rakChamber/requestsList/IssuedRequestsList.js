import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";
import IssuedRequestTable from "./IssuedRequestTable";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
const { getRakIssuedRequestsList } = actions;

export default function IssuedRequestsList() {
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
    const day_number = 180;

    dispatch(
      getRakIssuedRequestsList(
        company_code
          ? { data: { company_code, day_number } }
          : { data: { code, day_number } }
      )
    );
  }, []);
  useEffect(() => {
    if (APIServices.rakIssuedRequestListDone) {
      const ratificationsRequests = APIServices.rakIssuedRequestListDone
        ?.ratification_request?.length
        ? APIServices.rakIssuedRequestListDone?.ratification_request.map(
            (item) => {
              item["income_code"] = 51;
              return item;
            }
          )
        : [];
      const subArray = [];
      const array = subArray.concat(
        APIServices.rakIssuedRequestListDone?.coo_list_CR
          ? APIServices.rakIssuedRequestListDone?.coo_list_CR
          : [],
        APIServices.rakIssuedRequestListDone?.additional_request_list_C
          ? APIServices.rakIssuedRequestListDone?.additional_request_list_C
          : [],
        APIServices.rakIssuedRequestListDone?.additional_MR_list
          ? APIServices.rakIssuedRequestListDone?.additional_MR_list
          : [],
        APIServices.rakIssuedRequestListDone?.p_coo_by_emp
          ? APIServices.rakIssuedRequestListDone?.p_coo_by_emp
          : [],
        APIServices.rakIssuedRequestListDone?.ratification
          ? APIServices.rakIssuedRequestListDone?.ratification
          : [],
        ratificationsRequests ? ratificationsRequests : []
      );
      setMyRequests(array?.filter((req) => req.status !== 5));
      setSearchResults(array?.filter((req) => req.status !== 5));
    }
  }, [APIServices.rakIssuedRequestListDone]);

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
        {isRTL ? "الطلبات المنجزه لآخر 6 أشهر" : "6 Months Issued Requests"}
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
      <IssuedRequestTable data={searchResults}></IssuedRequestTable>
    </Grid>
  );
}
