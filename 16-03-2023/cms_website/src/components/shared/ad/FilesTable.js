import React, { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useTranslation } from "react-i18next";
import * as moment from "moment";
import { useStyles } from "../../../styles/components/openData/table";
import { getFileUrl } from "../utils";
import actions from "../../../redux/actions";

const { downloadCount } = actions;

export default function FilesTable(props) {
  const { t } = useTranslation();
  let { files, setFiles } = props;
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { downloadCountCompleted } = useSelector((state) => state.files);
  const [tableFiles, setTableFiles] = useState([]);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (!downloadCountCompleted?.success) return;
    const file = downloadCountCompleted.file;
    if (!file) return;
    let newFiles = tableFiles?.map((item) =>
      item?.id === file?.id
        ? { ...item, downloaded: file.downloaded }
        : { ...item, downloaded: item?.downloaded }
    );
    setTableFiles(newFiles);
  }, [downloadCountCompleted]);

  const getFiles = (files) => {
    const itemFiles = files?.filter((file) => {
      if (file) {
        const { publishMode, mimetype } = file;

        if (mimetype && mimetype.includes("image")) return false;
        return true;
      }

      return false;
    });
    return itemFiles;
  };

  const handleClick = (url, title) => {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", isRTL ? title?.ar : title?.en);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const columns = [
    t("OPENDATA.PAGE.TABLEHEAD.TITLE"),
    t("OPENDATA.PAGE.TABLEHEAD.TYPE"),
    t("OPENDATA.PAGE.TABLEHEAD.YAER"),
    t("OPENDATA.PAGE.TABLEHEAD.DOWNLOADED"),
    t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD"),
  ];

  const createColumn = useCallback(
    (arr) => {
      if (arr) {
        let array = [];
        let obj = {};

        arr.map((item) => {
          obj["id"] = item?.id;
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.TITLE")}`] =
            isRTL && item?.publishMode === 1
              ? item?.title?.ar || "لا يوجد عنوان"
              : item?.title?.en || "No Title";

          obj[`${t("OPENDATA.PAGE.TABLEHEAD.TYPE")}`] =
            item?.mimetype?.includes("pdf") ? (
              <img
                src="/assets/icons/newpdf.png"
                className="icon"
                alt="pdf icon"
              />
            ) : item?.mimetype?.includes("image") ? (
              <img
                src="/assets/images/img.png"
                className="icon"
                alt="img icon"
              />
            ) : (
              <img
                src="/assets/icons/xls.png"
                className="icon"
                alt="excel icon"
              />
            );

          obj[`${t("OPENDATA.PAGE.TABLEHEAD.YAER")}`] = moment(item?.createdAt)
            .format("YYYY")
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

          obj[`${t("OPENDATA.PAGE.TABLEHEAD.DOWNLOADED")}`] = item.downloaded;

          obj[`${t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD")}`] = (
            <span
              onClick={async () => {
                dispatch(downloadCount({ id: item.id }));
                const url = await getFileUrl(item.uuid);
                handleClick(url, item.title);
              }}
            >
              <GetAppIcon className="icon" />
            </span>
          );

          array.push(obj);
          obj = {};
          return null;
        });
        return array;
      }
    },
    [isRTL]
  );

  useEffect(() => {
    if (!files) return;
    if (!files?.length) return;
    setTableFiles(files);
  }, [files]);

  useEffect(() => {
    if (!tableFiles) return;
    if (!tableFiles?.length) return;
    const newFiles = getFiles(tableFiles);
    const data = createColumn(newFiles);
    setNewData(data);
  }, [tableFiles, createColumn]);

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
  return (
    <Fragment>
      <MUIDataTable
        className={`${classes.root} ${classes.news}`}
        data={newData}
        columns={columns}
        options={options}
      />
    </Fragment>
  );
}
