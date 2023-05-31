import React, { useEffect, useState, Fragment, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentPopUp from "./CommentPopUp";
import FileRating from "./FileRating";
import MUIDataTable from "mui-datatables";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useTranslation } from "react-i18next";
import { content } from "../openDataData";
import { FaRegCommentAlt } from "react-icons/fa";
import { getFileUrl } from "../../../shared/utils";
import { useStyles } from "../../../../styles/components/openData/table";
import actions from "../../../../redux/actions";

const { downloadCount, loadingAction } = actions;

export default function Table({ searchData, setSearchData }) {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const { downloadCountCompleted } = useSelector((state) => state.files);

  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [details, setDetails] = useState({ id: 0, fileId: 0, title: "" });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!downloadCountCompleted?.success) return;
    const file = downloadCountCompleted.file;
    if (!file) return;
    let newData = searchData?.map((subItem) =>
      subItem
        ? {
            ...subItem,
            files: subItem?.files?.map((file1) =>
              file1?.id === file?.id ? file : file1
            ),
          }
        : subItem
    );
    setSearchData(newData);
  }, [downloadCountCompleted]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (url, uuid, title) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const {
    openData: { ltrColumns, rtlColumns },
  } = content;

  const reBuildData = useCallback(
    (items) => {
      const data = [];

      items.map((item) => {
        if (!item?.files?.length) return null;

        let file = item.files.find((file) => {
          if (file.mimetype.includes("image")) return null;

          if (isRTL && file.publishMode === 1) return true;
          else if (!isRTL && file.publishMode === 2) return true;
        });

        if (!file) return null;

        const title = item.categoryTitle
          ? isRTL
            ? item.categoryTitle.ar
            : item.categoryTitle.en
          : null;
        file &&
          data.push([
            file.id,
            item.startDate.split("-")[0],
            title,
            item.title,
            `${Math.ceil(file.size / 1024)} kb`,
            file.extension,
            file.uuid,
            file.downloaded,
            item.files,
            item.alias,
            item.id,
          ]);

        return null;
      });

      return data;
    },
    [isRTL]
  );

  const createColumn = useCallback(
    (arr) => {
      if (arr) {
        let array = [];
        let obj = {};

        arr.map((item) => {
          obj["id"] = item[0];
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.YAER")}`] = item[1];
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.SECTOR")}`] = item[2] || "";
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.TITLE")}`] = item[3];
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.SIZE")}`] = item[4];
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.TYPE")}`] =
            item[5] === ".pdf" ? (
              <img
                src="/assets/icons/newpdf.png"
                className="icon"
                alt="pdf icon"
              />
            ) : item[5] === ".doc" ? (
              <img
                src="/assets/icons/doc.png"
                className="icon"
                alt="excel icon"
              />
            ) : (
              <img
                src="/assets/icons/xls.png"
                className="icon"
                alt="excel icon"
              />
            );
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.COMMENTS")}`] = (
            <FaRegCommentAlt
              className="comment"
              id={item[10]}
              fileId={item[0]}
              title={item[3]}
            />
          );
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.DOWNLOADED")}`] = item[7];

          obj[`${t("OPENDATA.PAGE.TABLEHEAD.RATING")}`] = (
            <FileRating id={item[0]} />
          );
          obj[`${t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD")}`] = (
            <span
              onClick={async () => {
                dispatch(downloadCount({ id: item[0] }));
                const url = await getFileUrl(item[6]);
                handleClick(url, item[6], item[3]);
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
    [t]
  );

  useEffect(() => {
    const data = searchData;

    if (data) {
      const returnedData = reBuildData(data);
      const newData = createColumn(returnedData);
      setData(newData);
      dispatch(loadingAction({ loading: false }));
    }
  }, [reBuildData, createColumn, searchData]);

  const options = {
    filterType: "checkbox",
    selectToolbarPlacement: "none",
    onCellClick: (colData, cellMeta) => {
      const { colIndex } = cellMeta;

      if (colIndex !== 5) return;

      setDetails({
        id: colData.props.id,
        fileId: colData.props.fileId,
        title: colData.props.title,
      });

      handleOpen(true);
    },
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

  const components = {
    TableFooter: () => <></>,
  };

  const classes = useStyles();

  return (
    <Fragment>
      <MUIDataTable
        className={classes.root}
        data={data}
        columns={isRTL ? rtlColumns : ltrColumns}
        options={options}
        components={components}
      />
      {open && (
        <CommentPopUp
          open={open}
          handleClose={handleClose}
          id={details.id}
          fileId={details.fileId}
          title={details.title}
        />
      )}
    </Fragment>
  );
}
