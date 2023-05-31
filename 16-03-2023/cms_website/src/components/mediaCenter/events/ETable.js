import { Button } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import Pagination from "@material-ui/lab/Pagination";
import * as moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DEVELOPMENT, PRODUCTION } from "../../../constants/config.json";
import { useStyles } from "../../../styles/components/openData/table";
import usePaginationStyles from "../../../styles/components/shared/pagination/pagination";
import { pagination } from "../../shared/utils";

export default function Ntable() {
  const getFileUrl = async (fileName) =>
    fetch(`/api/file/download/${fileName}`)
      .then((res) => res.blob())
      .then((res) => URL.createObjectURL(res));

  const autoDownloadDocument = (href, fileName) => {
    if (!href || !fileName) return;
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  };

  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { events: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );

  const [data, setData] = useState([]);
  const [displayedFiles, setDisplayedFiles] = useState([]);

  let BASE_URL =
    process.env.NODE_ENV === "development" ? DEVELOPMENT : PRODUCTION;

  const getFile = (files, isRTL) => {
    const file = files?.find((file) => {
      if (file) {
        const { publishMode, extension } = file;

        if (isRTL && publishMode === 1 && extension.match(/^(.pdf)$/))
          return true;
        else if (!isRTL && publishMode === 2 && extension.match(/^(.pdf)$/))
          return true;
      }

      return false;
    });

    return {
      uuid: file ? file.uuid : "",
    };
  };

  useLayoutEffect(() => {
    if (!posts.length) return;
    setData(posts);
  }, [posts]);

  //Divide the total array into the required part
  const [pageNum, setPageNum] = useState(1);
  const [paginate, setPaginate] = useState({
    requiredArr: [],
    count: 0,
  });

  useLayoutEffect(() => {
    let filesArray = [];
    data &&
      data.map(
        (item) =>
          item.files &&
          item.files.length > 0 &&
          item.files.map((file) => {
            if (
              isRTL &&
              file.publishMode === 1 &&
              file.mimetype.includes("application")
            )
              filesArray.push(file);
            if (
              !isRTL &&
              file.publishMode === 2 &&
              file.mimetype.includes("application")
            )
              filesArray.push(file);
          })
      );
    setDisplayedFiles(filesArray);
  }, [data]);
  useLayoutEffect(() => {
    const displayedContent = displayedFiles;
    const { count, requiredArr } = pagination(displayedContent, 6, pageNum);

    setPaginate({ requiredArr, count });
  }, [pageNum, displayedFiles]);

  const createColumn = (arr) => {
    if (arr) {
      let array = [];
      let obj = {};
      arr.map((item) => {
        obj["id"] = item?.id;
        obj[`${t("OPENDATA.PAGE.TABLEHEAD.TITLE")}`] =
          isRTL && item?.publishMode === 1
            ? item?.title?.ar || "لا يوجد عنوان"
            : item?.title?.en || "No Title";

        obj[`${t("OPENDATA.PAGE.TABLEHEAD.TYPE")}`] = item?.mimetype?.includes(
          "pdf"
        ) ? (
          <img src="/assets/icons/newpdf.png" className="icon" />
        ) : (
          <img src="/assets/icons/xls.png" className="icon" />
        );

        obj[`${t("OPENDATA.PAGE.TABLEHEAD.YAER")}`] = moment(item?.createdAt)
          .format("DD-MM-YYYY")
          .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

        obj[`${t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD")}`] = (
          <Button
            className="button second"
            onClick={async () => {
              await autoDownloadDocument(
                await getFileUrl(item?.uuid),
                item?.uuid
              );
            }}
          >
            <GetAppIcon className="icon" />
          </Button>
          // <a
          //   href={`${BASE_URL}/api/file/download/${getFile(arr, isRTL)}}`}
          //   rel="noreferrer"
          //   download
          // >
          //   <GetAppIcon className="icon" />
          // </a>
        );

        array.push(obj);
        obj = {};
        return null;
      });
      return array;
    }
  };
  const columns = [
    t("OPENDATA.PAGE.TABLEHEAD.TITLE"),
    t("OPENDATA.PAGE.TABLEHEAD.TYPE"),
    t("OPENDATA.PAGE.TABLEHEAD.YAER"),
    t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD"),
  ];
  const newData = createColumn(paginate.requiredArr);

  //End dividing process

  const handlePaginationClick = (e, num) => {
    setPageNum(num);
  };

  const options = {
    filterType: "checkbox",
    selectToolbarPlacement: "none",
    // tableBodyHeight: "450px",
    // onRowClick: (rowData, rowMeta) =>
    //   store.dispatch(push(`/open-data/page/${data[rowMeta.rowIndex][7]}`)),
    download: false,
    filter: false,
    print: false,
    search: false,
    viewColumns: false,
    selectableRows: "none",
    responsive: "standard",
    fixedHeader: false,
    textLabels: {
      filter: {
        title: t("TABLE.FILTERS"),
        reset: t("TABLE.RESET"),
      },
      pagination: {
        rowsPerPage: t("TABLE.PAGEROWS"),
        displayRows: t("TABLE.OF"),
      },
      selectedRows: {
        text: t("TABLE.SELECTED"),
      },
      body: {
        noMatch: t("TABLE.NOMATCH"),
      },
    },
  };

  const classes = useStyles();
  const paginationClasses = usePaginationStyles();

  return (
    <Fragment>
      <MUIDataTable
        className={classes.root}
        data={newData}
        columns={columns}
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
