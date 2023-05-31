import MUIDataTable from "mui-datatables";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useStyles } from "../../../../styles/components/openData/table";

export default function MembershipFeesTable(props) {
  const { t } = useTranslation();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const data = props.data;
  //Divide the total array into the required part
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const displayedContent = [];

    {
      data &&
        data.length &&
        data.map((item) => {
          displayedContent.push(item);
          return null;
        });

      setTableData(displayedContent);
    }
  }, [data]);

  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj["Fees Description"] = isRTL ? item.name : item.name_e;
        obj["Amount"] = item.amount;

        array.push(obj);
        obj = {};
        return null;
      });

      return array;
    }
  };

  const newData = createColumn(tableData);

  const options = {
    filterType: "checkbox",
    selectToolbarPlacement: "none",
    tableBodyHeight: "auto",
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
  };
  const components = {
    TableFooter: () => <></>,
  };
  const classes = useStyles();
  const columns = [
    {
      name: "Fees Description",
      label: t("SERVICESPAGES.NEWMEMBERSHIP.FEESDESC"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "Amount",
      label: t("SERVICESPAGES.NEWMEMBERSHIP.AMOUNT"),
      options: {
        filter: false,
        sort: true,
      },
    },
  ];
  return (
    <Fragment>
      <MUIDataTable
        className={classes.root}
        data={newData}
        columns={columns}
        components={components}
        options={options}
      />
    </Fragment>
  );
}
