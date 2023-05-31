import {
  Box,
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { memo, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../ServicesResultModal";
import RequestsTable from "./RequestTable";
import { useInterval } from "../../../../utils/Hooks";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";

const { getRakRequestsList } = actions;

export default function RequestsList() {
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
  const [requests, setRequests] = useState({
    Coos: [],
    Copies: [],
    EditCoos: [],
    Ratifications: [],
    Stamps: [],
  });
  const [totalFees, setTotalFees] = useState(0);
  const [totalStamps, setTotalStamps] = useState(0);
  const [totalCopies, setTotalCopies] = useState(0);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const classes = useStyles();
  const profile = JSON.parse(sessionStorage.getItem("serviceProfile"));
  let updateUser = sessionStorage.getItem("updateUser");
  const filterBtns = [
    {
      title_ar: "الكل",
      title_en: "All",
      value: "",
      color: "#78909c",
    },
    {
      title_ar: "قيد الانتظار",
      title_en: "Pending",
      value: "Pending_",
      color: "#e4c358",
    },
    {
      title_ar: "توجد ملاحظة",
      title_en: "Note Added",
      value: "NotesAdded_",
      color: "#ee6774",
    },
    {
      title_ar: "معتمدة غير مدفوعة",
      title_en: "Approved Not Paid",
      value: "ApprovedNotPaid_",
      color: "#529dd8",
    },
    {
      title_ar: "مدفوعة إلكترونياً",
      title_en: "Paid Online",
      value: "PaidNotApproved_",
      color: "#98ae4f",
    },
    {
      title_ar: "مجمدة",
      title_en: "Suspended",
      value: "Suspended_",
      color: "#9e9e9e",
    },
  ];

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

  useInterval(async () => {
    const company_code = profile?.company_code;
    const code = profile?.code;
    const day_number = 15;
    setRequests({
      Coos: [],
      Copies: [],
      EditCoos: [],
      Ratifications: [],
      Stamps: [],
    });
    setTotalFees(0);
    setTotalStamps(0);
    setTotalCopies(0);
    dispatch(
      getRakRequestsList(
        company_code
          ? { data: { company_code, day_number } }
          : { data: { code, day_number } }
      )
    );
  }, 120000);

  const refreshList = () => {
    const company_code = profile?.company_code;
    const code = profile?.code;
    const day_number = 15;
    setRequests({
      Coos: [],
      Copies: [],
      EditCoos: [],
      Ratifications: [],
      Stamps: [],
    });
    setTotalFees(0);
    setTotalStamps(0);
    setTotalCopies(0);
    dispatch(
      getRakRequestsList(
        company_code
          ? { data: { company_code, day_number } }
          : { data: { code, day_number } }
      )
    );
  };
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
          : [],
          APIServices.rakRequestListDone?.other_request_result
          ? APIServices.rakRequestListDone?.other_request_result
          : []
      );
      setMyRequests(array?.filter((req) => req.status !== 5));
      setSearchResults(array?.filter((req) => req.status !== 5));
    }
  }, [APIServices.rakRequestListDone]);

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
  }, [APIServices.requestDeleted]);

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
  const filterBtn = (arr, val, title) => {
    setSearchValue(val);
    let selected = [];
    if (val.value == "") setSearchResults(arr);
    else {
      arr.map((a) => {
        if (a.status_name == val.value) {
          selected.push(a);
        }
      });

      return setSearchResults(selected);
    }
  };
  return (
    <Grid container className={classes.requestListRoot}>
      <Typography className={classes.serviceTitle}>
        {isRTL ? "قائمة الطلبات" : "Request List"}
      </Typography>
      <Box className={classes.searchBox}>
        <TextField
          id="standard-basic"
          placeholder={isRTL ? "البحث" : "Search"}
          value={
            searchValue?.title_en
              ? isRTL
                ? searchValue?.title_ar
                : searchValue?.title_en
              : searchValue
          }
          onChange={(e) => filter(myRequests, e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <GoSearch color={"#969696"} />
              </InputAdornment>
            ),
          }}
        />
        <Box className={classes.btnsContainer}>
          {filterBtns.map((btn) => (
            <Button
              variant="outlined"
              className={classes.filterBtn}
              style={
                btn.value == searchValue.value
                  ? {
                      borderColor: `${btn.color}`,
                      color: "#fff",
                      backgroundColor: `${btn.color}`,
                    }
                  : { borderColor: `${btn.color}`, color: `${btn.color}` }
              }
              onClick={(e) => filterBtn(myRequests, btn)}
            >
              {isRTL ? btn.title_ar : btn.title_en}
            </Button>
          ))}
        </Box>
      </Box>

      <RequestsTable
        data={searchResults}
        refreshList={refreshList}
        requests={requests}
        setRequests={setRequests}
        totalFees={totalFees}
        setTotalFees={setTotalFees}
        totalStamps={totalStamps}
        setTotalStamps={setTotalStamps}
        totalCopies={totalCopies}
        setTotalCopies={setTotalCopies}
      ></RequestsTable>
      <ServicesResultModal
        open={open}
        setOpen={setOpen}
        message={message}
        routing={routing}
        noThanks={noThanks}
      />
    </Grid>
  );
}
