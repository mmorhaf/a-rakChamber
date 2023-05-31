import { IconButton } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { push } from "connected-react-router";
import MUIDataTable from "mui-datatables";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FcViewDetails } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../../../redux/store";
import { useStyles } from "../../../../styles/components/openData/table";
import usePaginationStyles from "../../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../../shared/utils";
export default function TradesTable(props) {
  const { t } = useTranslation();

  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const data = props.data;
  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    count: 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const displayedContent = [];

    {
      data &&
        data.length &&
        data.map((item) => {
          displayedContent.push(item);
          return null;
        });
      const { count, requiredArr } = pagination(displayedContent, 8, pageNum);

      setPaginate({ requiredArr, count });
    }
  }, [pageNum, data]);

  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj["Trade Name (English)"] = item.company_name_e;
        obj["Trade Name (Arabic)"] = item.company_name;
        obj["Phone"] = item.tel1;
        obj["P.O.Box"] = item.pobox;
        obj["View"] = (
          <IconButton
            onClick={() =>
              store.dispatch(
                push(
                  `/services-form/business-services/establishment-preview/${item.company_code}`
                )
              )
            }
          >
            <FcViewDetails />
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

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

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
  const paginationClasses = usePaginationStyles();
  const columns = [
    {
      name: "Trade Name (English)",
      label: "Trade Name (English)",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "Trade Name (Arabic)",
      label: "Trade Name (Arabic)",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "Phone",
      label: "Phone",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "P.O.Box",
      label: "P.O.Box",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "View",
      label: "View",
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
