import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { push } from "connected-react-router";
import { store } from "../../../../redux/store";
import { useStyles } from "../../../../styles/components/openData/table";

import { IconButton, Popover, Typography, Box } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { FaInfo } from "react-icons/fa";
import { CgFileDocument } from "react-icons/cg";

import clsx from "clsx";

export default function Table(props) {
  const { t } = useTranslation();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const data = props.data;
  //Divide the total array into the required part
  const classes = useStyles();
  const [requestsList, setRequestsList] = useState([]);

  useEffect(() => {
    setRequestsList(data);
  }, [data]);

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
        return `/services-form/business-services/new-coo/${item.coo_code}/view`;
      case 54:
        return `/services-form/business-services/additional-request/${item.code}/view/deleted`;
      case 56:
        return `/services-form/business-services/amendment-coo-request/${item.coo_code}/${item.code}/view`;
      case 55:
        return `/services-form/business-services/additional-request/${item.code}/view/deleted`;
      case 51:
        return `/services-form/business-services/ratification-request/${item.code}/view/deleted`;
        case 59:
          return `/services-form/business-services/other-request/${item.code}/view/deleted`;
          case 60:
            return `/services-form/business-services/other-request/${item.code}/view/deleted`;
            case 61:
              return `/services-form/business-services/other-request/${item.code}/view/deleted`;
              case 62:
                return `/services-form/business-services/other-request/${item.code}/view/deleted`;
      default:
        return "";
    }
  };
  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj[t("SERVICESPAGES.DELETED.REQNUM")] = item.code
          ? item.code
          : item.coo_code;
        obj[t("SERVICESPAGES.DELETED.REQTYPE")] = (
          <>
            <Box>
              {ReqType(item)} {item.srv_count != 0 ? `(${item.srv_count})` : ""}
            </Box>
            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
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
        obj[t("SERVICESPAGES.DELETED.REQDATE")] = moment(
          item.issue_date
        ).format("YYYY-MM-DD h:mm a");
        obj[t("SERVICESPAGES.DELETED.DELETEDATE")] = item.cancel_date;
        obj[t("SERVICESPAGES.ADDITIONALREQ.FEES")] = (
          <>
            <Box>{item.chamber_fees}</Box>

            <Box>
              {item.coo_cr_additional_request?.length
                ? item.coo_cr_additional_request.map((type) => {
                    return (
                      <Typography style={{ fontSize: 13, color: "#b8b8b8" }}>
                        {type.chamber_fees == 0
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
        obj[t("SERVICESPAGES.DELETED.INVOICENUM")] = item.invoice_no;
        obj[t("SERVICESPAGES.DELETED.STATUS")] = (
          <Box
            style={{ backgroundColor: "#a88add" }}
            className={classes.statusBox}
          >
            {isRTL ? "ملغية" : "Canceled"}
          </Box>
        );
        obj[t("SERVICESPAGES.DELETED.REASON")] = (
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <IconButton {...bindTrigger(popupState)}>
                  <FaInfo style={{ color: "#d8ccee" }} />
                </IconButton>
                <Popover
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    // vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <Box p={2}>
                    <Typography>{item.cancel_remark}</Typography>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>
        );
        obj[t("SERVICESPAGES.DELETED.VIEW")] = (
          <IconButton onClick={() => store.dispatch(push(ReqTypePage(item)))}>
            <CgFileDocument style={{ color: "#b1cbe7" }} />
          </IconButton>
        );
        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };

  const newData = createColumn(requestsList);

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
  const columns = [
    {
      name: t("SERVICESPAGES.DELETED.REQNUM"),
      label: t("SERVICESPAGES.DELETED.REQNUM"),
      options: {
        filter: false,
      },
    },

    {
      name: t("SERVICESPAGES.DELETED.REQTYPE"),
      label: t("SERVICESPAGES.DELETED.REQTYPE"),
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.REQDATE"),
      label: t("SERVICESPAGES.DELETED.REQDATE"),
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.DELETEDATE"),
      label: t("SERVICESPAGES.DELETED.DELETEDATE"),
      options: {
        filter: false,
        sort: true,
        sortDirection: "asc",
        customBodyRender: (value) =>
          moment(new Date(value)).format("YYYY-MM-DD h:mm a"),
      },
    },
    {
      name: t("SERVICESPAGES.ADDITIONALREQ.FEES"),
      label: t("SERVICESPAGES.ADDITIONALREQ.FEES"),
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.INVOICENUM"),
      label: t("SERVICESPAGES.DELETED.INVOICENUM"),
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.STATUS"),
      label: t("SERVICESPAGES.DELETED.STATUS"),
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.REASON"),
      label: "",
      options: {
        filter: false,
      },
    },
    {
      name: t("SERVICESPAGES.DELETED.VIEW"),
      label: "",
      options: {
        filter: false,
      },
    },
  ];
  return (
    <Fragment>
      <MUIDataTable
        className={clsx(classes.root, classes.requestList)}
        data={newData}
        columns={columns}
        components={components}
        options={options}
      />
    </Fragment>
  );
}
