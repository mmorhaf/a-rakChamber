import React, { useState, Fragment, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MUIDataTable from "mui-datatables";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useTranslation } from "react-i18next";
import * as moment from "moment";
import { useStyles } from "../../styles/components/openData/table";
import { getFileUrl } from "../shared/utils";
import actions from "../../redux/actions";

const { downloadCount } = actions;

export default function Ntable({ details }) {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const { downloadCountCompleted } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const [newData, setNewData] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!downloadCountCompleted?.success) return;
    const file = downloadCountCompleted.file;
    if (!file) return;
    let newFiles = files?.map((item) =>
      item?.id === file?.id
        ? { ...item, downloaded: file.downloaded }
        : { ...item, downloaded: item?.downloaded }
    );
    setFiles(newFiles);
  }, [downloadCountCompleted]);

  const getFiles = (files) => {
    const itemFiles = files?.filter((file) => {
      if (file) {
        const { publishMode, mimetype } = file;

        if (mimetype.includes("image")) return false;

        if (isRTL && publishMode === 1) return true;
        else if (!isRTL && publishMode === 2) return true;
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
    [isRTL, files]
  );

  useEffect(() => {
    if (!details.files) return;
    if (!details.files.length) return;

    const newsFiles = getFiles(details.files);
    setFiles(newsFiles);
  }, [details]);

  useEffect(() => {
    if (files) {
      const data = createColumn(files);
      setNewData(data);
    }
  }, [files]);

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
