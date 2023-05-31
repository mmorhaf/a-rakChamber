import { Box, IconButton, Typography } from "@material-ui/core";
import clsx from "clsx";
import Pagination from "@material-ui/lab/Pagination";
import { push } from "connected-react-router";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { Fragment, useEffect, useState } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FiPrinter } from "react-icons/fi";
import { useSelector } from "react-redux";
import { store } from "../../../../redux/store";
import { useStyles } from "../../../../styles/components/openData/table";
import usePaginationStyles from "../../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../../shared/utils";
const columnsLTR = [
  {
    name: "Request No",
    label: "Request No",
    options: {
      filter: false,
    },
  },
  {
    name: "Issue No",
    label: "Issue No",
    options: {
      filter: false,
    },
  },
  {
    name: "Request Type",
    label: "Request Type",
    options: {
      filter: false,
    },
  },
  {
    name: "Request Date",
    label: "Request Date",
    options: {
      filter: false,
    },
    options: {
      filter: false,
      sort: true,
      sortDirection: "asc",
      customBodyRender: (value) =>
        moment(new Date(value)).format("YYYY-MM-DD h:mm a"),
    },
  },

  {
    name: "Fees",
    label: "Fees",
    options: {
      filter: false,
    },
  },
  {
    name: "Invoice No",
    label: "Invoice No",
    options: {
      filter: false,
    },
  },
  {
    name: "Status",
    label: "Status",
    options: {
      filter: false,
    },
  },
  {
    name: "View",
    label: "View",
    options: {
      filter: false,
    },
  },
  {
    name: "Print",
    label: "Print",
    options: {
      filter: false,
    },
  },
];
const columnsRTL = [
  {
    name: "رقم الطلب",
    label: "رقم الطلب",
    options: {
      filter: false,
    },
  },
  {
    name: "رقم الطلب المعتمد",
    label: "رقم الطلب المعتمد",
    options: {
      filter: false,
    },
  },
  {
    name: "نوع الطلب",
    label: "نوع الطلب",
    options: {
      filter: false,
    },
  },
  {
    name: "تاريخ الطلب",
    label: "تاريخ الطلب",
    options: {
      filter: false,
    },
    options: {
      filter: false,
      sort: true,
      sortDirection: "asc",
      customBodyRender: (value) =>
        moment(new Date(value)).format("YYYY-MM-DD h:mm a"),
    },
  },

  {
    name: "الرسوم",
    label: "الرسوم",
    options: {
      filter: false,
    },
  },
  {
    name: "رقم الفاتورة",
    label: "رقم الفاتورة",
    options: {
      filter: false,
    },
  },
  {
    name: "الحالة",
    label: "الحالة",
    options: {
      filter: false,
    },
  },
  {
    name: "معاينة",
    label: "معاينة",
    options: {
      filter: false,
    },
  },
  {
    name: "طباعة",
    label: "طباعة",
    options: {
      filter: false,
    },
  },
];

export default function Table(props) {
  let loggedType = sessionStorage.getItem("loggedType");
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const data = props.data;
  const [requestsList, setRequestsList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    count: 0,
  });
  const classes = useStyles();
  // useEffect(() => {
  //   setRequestsList(data);
  // }, [data]);

  useEffect(() => {
    const displayedContent = [];
    const sortedDates =
      data &&
      data.length &&
      data
        .map((obj) => {
          return { ...obj, date: new Date(obj.issue_date) };
        })
        .sort((a, b) => b.date - a.date);

    {
      sortedDates &&
        sortedDates.length &&
        sortedDates.map((item) => {
          displayedContent.push(item);
          return null;
        });
      const { count, requiredArr } = pagination(displayedContent, 8, pageNum);

      setPaginate({ requiredArr, count });
    }
  }, [pageNum, data]);

  const ReqType = (item) => {
    switch (item.income_code) {
      case 50:
        return isRTL ? "شهادة منشأ" : "Certificate of Origin";
      case 54:
        return isRTL ? "نسخة إضافية" : "Additional Copy";
      case 56:
        return isRTL
          ? "تعديل شهادة منشأ"
          : "Amendment of Certificate of Origin";
      case 55:
        return isRTL ? "ختم" : "Seal";
      case 51:
        return isRTL ? "تصديق" : "Ratification";
      default:
        return "";
    }
  };

  const ReqTypePage = (item) => {
    switch (item.income_code) {
      case 50:
        return `/services-form/business-services/new-coo/${
          item.ref_code != null ? item.ref_code : item.coo_code
        }/view`;
      case 54:
        return `/services-form/business-services/additional-request/${item.code}/view/issued`;
      case 56:
        return `/services-form/business-services/amendment-coo-request/${
          item.ref_code ? item.ref_code : item.coo_code
        }/${item.code}/view`;
      case 55:
        return `/services-form/business-services/additional-request/${item.code}/view/issued`;
      case 51:
        return `/services-form/business-services/ratification-request/${item.code}/view/issued`;
        case 59:
          return `/services-form/business-services/other-request/${item.code}/view/issued`;
          case 60:
            return `/services-form/business-services/other-request/${item.code}/view/issued`;
            case 61:
              return `/services-form/business-services/other-request/${item.code}/view/issued`;
              case 62:
                return `/services-form/business-services/other-request/${item.code}/view/issued`;
      default:
        return "";
    }
  };
  const ReqTypePrintPage = (item) => {
    switch (item.income_code) {
      case 50:
        return `/services-form/business-services/coo-preview/print_issued/${
          item.coo_code
        }/0/${item.income_code}/${
          item.coo_cr_additional_request?.length
            ? item.coo_cr_additional_request.filter(
                (type) => type.income_code == 54
              )[0]
              ? item.coo_cr_additional_request.filter(
                  (type) => type.income_code == 54
                )[0].srv_count
              : 0
            : 0
        }/${loggedType == "1" ? item.payment_code : item.trx_code}`;
      case 54:
        return `/services-form/business-services/coo-preview/print_issued/${
          item.coo_code
        }/${item.code}/${item.income_code}/${item.srv_count}/${
          loggedType == "1" ? item.payment_code : item.trx_code
        }`;
      case 56:
        return `/services-form/business-services/coo-preview/print_issued/${
          item.coo_code
        }/${item.code}/${item.income_code}/${
          item.coo_mr_additional_request?.length
            ? item.coo_mr_additional_request.filter(
                (type) => type.income_code == 54
              )[0]
              ? item.coo_mr_additional_request.filter(
                  (type) => type.income_code == 54
                )[0].srv_count
              : 0
            : 0
        }/${loggedType == "1" ? item.payment_code : item.trx_code}`;
      case 55:
        return `/services-form/business-services/additional-request/${item.code}/view/issued`;
      case 51:
        return `/services-form/business-services/ratification-request/${item.code}/view/print_issued`;
      case 59:
        return `/services-form/business-services/other-request/${item.code}/view/issued`;
      case 60:
        return `/services-form/business-services/other-request/${item.code}/view/issued`;
      case 61:
        return `/services-form/business-services/other-request/${item.code}/view/issued`;
      case 62:
        return `/services-form/business-services/other-request/${item.code}/view/issued`;
      default:
        return "";
    }
  };
  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj[isRTL ? "رقم الطلب" : "Request No"] = item.request_code
          ? item.request_code
          : item.code
          ? item.code
          : item.ref_code;
        obj[isRTL ? "رقم الطلب المعتمد" : "Issue No"] = item.coo_code
          ? item.coo_code
          : item.code;
        obj[isRTL ? "نوع الطلب" : "Request Type"] = (
          <>
            <Box>
              {ReqType(item)}{" "}
              {item.srv_count && item.srv_count != 0
                ? `(${item.srv_count})`
                : ""}
            </Box>
            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {item.income_code == 51
                          ? `•  ${isRTL ? " ختم" : "Seal "}(${
                              type.approved_count
                            })`
                          : type.srv_count == 0
                          ? ""
                          : `• ${
                              type.income_code == 54
                                ? isRTL
                                  ? "نسخة إضافية"
                                  : "Additional Copy"
                                : isRTL
                                ? "ختم"
                                : "Seal"
                            } (${type.srv_count})`}
                        {}
                      </Typography>
                    );
                  })
                : ""}
              {item.coo_mr_additional_request?.length
                ? item.coo_mr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.srv_count == 0
                          ? ""
                          : `• ${
                              type.income_code == 54
                                ? isRTL
                                  ? "نسخة إضافية"
                                  : "Additional Copy"
                                : isRTL
                                ? "ختم"
                                : "Seal"
                            } (${type.srv_count})`}
                      </Typography>
                    );
                  })
                : ""}
            </Box>
          </>
        );
        obj[isRTL ? "تاريخ الطلب" : "Request Date"] = item.issue_date;
        obj[isRTL ? "الرسوم" : "Fees"] = (
          <>
            <Box>{item.chamber_fees}</Box>

            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {item.income_code == 51
                          ? "• " + `${type.seal_fees}`
                          : type.chamber_fees == 0
                          ? ""
                          : "• " + `${type.chamber_fees}`}
                      </Typography>
                    );
                  })
                : ""}
              {item.coo_mr_additional_request?.length
                ? item.coo_mr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.chamber_fees == 0
                          ? ""
                          : "• " + `${type.chamber_fees}`}
                      </Typography>
                    );
                  })
                : ""}
            </Box>
          </>
        );
        obj[isRTL ? "رقم الفاتورة" : "Invoice No"] = item.invoice_no;
        obj[isRTL ? "الحالة" : "Status"] = (
          <Box
            style={{ backgroundColor: "#01579b" }}
            className={classes.statusBox}
          >
            {" "}
            {isRTL ? "معتمدة " : "Approved"}{" "}
          </Box>
        );
        obj[isRTL ? "معاينة" : "View"] = (
          <IconButton onClick={() => store.dispatch(push(ReqTypePage(item)))}>
            <CgFileDocument style={{ color: "#b1cbe7" }} />
          </IconButton>
        );
        obj[isRTL ? "طباعة" : "Print"] = (
          <IconButton
            onClick={() => store.dispatch(push(ReqTypePrintPage(item)))}
          >
            <FiPrinter style={{ color: "#5d83ab" }} />
          </IconButton>
        );
        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };

  const newData = createColumn(paginate.requiredArr);

  const columns = isRTL ? columnsRTL : columnsLTR;

  //End dividing process

  const options = {
    filterType: "checkbox",
    selectToolbarPlacement: "none",
    // tableBodyHeight: "450px",
    onCellClick: (colData, cellMeta) => {
      props.onCellClick && props.onCellClick(cellMeta.rowIndex);
    },
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    fixedHeader: false,
    sort: false,
    pagination: false,
  };
  const components = {
    TableFooter: () => <></>,
  };
  const paginationClasses = usePaginationStyles();
  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };
  return (
    <Fragment>
      <MUIDataTable
        className={clsx(classes.root, classes.requestList)}
        data={newData}
        columns={columns}
        components={components}
        options={options}
      />
      <Pagination
        className={paginationClasses.root}
        count={paginate.count}
        variant="outlined"
        shape="rounded"
        onChange={handlePaginationClick}
      />
    </Fragment>
  );
}
