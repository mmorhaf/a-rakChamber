import { Container, IconButton, Typography } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { Fragment, memo, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../redux/actions";
import { useStyles } from "../../../../styles/components/openData/table";
import { getFileUrl } from "../../../shared/utils";

const { getCirculars, downloadCount } = actions;

function Circulars(props) {
  const { t } = useTranslation();
  const classes = useStyles();

  const [data, setData] = useState("");

  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const { downloadCountCompleted } = useSelector((state) => state.files);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCirculars());
  }, []);

  useEffect(() => {
    if (APIServices.getCircularsDone.res)
      setData(APIServices.getCircularsDone.res?.attachments);
  }, [APIServices.getCircularsDone]);

  useEffect(() => {
    if (!downloadCountCompleted?.success) return;
    const downloadedFile = downloadCountCompleted.file;
    if (!downloadedFile) return;
    let newData = data?.map((subItem) =>
      subItem
        ? {
            ...subItem,
            file:
              subItem?.file?.id === downloadedFile?.id
                ? downloadedFile
                : subItem?.file,
          }
        : subItem
    );
    setData(newData);
  }, [downloadCountCompleted]);

  const columns = [
    {
      name: "title",
      label: t("OPENDATA.PAGE.TABLEHEAD.TITLE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "type",
      label: t("OPENDATA.PAGE.TABLEHEAD.TYPE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "date",
      label: t("OPENDATA.PAGE.TABLEHEAD.DATE"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "downloaded",
      label: t("OPENDATA.PAGE.TABLEHEAD.DOWNLOADED"),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: "download",
      label: t("OPENDATA.PAGE.TABLEHEAD.DOWNLOAD"),
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  const options = {
    tableBodyHeight: "auto",
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
  const createColumn = useCallback(
    (arr) => {
      if (arr) {
        let array = [];
        let obj = {};
        arr.map((item) => {
          obj["title"] = isRTL ? item.title?.ar : item.title?.en;
          obj["type"] = (
            <img
              src="/assets/icons/newpdf.png"
              className="icon"
              alt="pdf icon"
            />
          );
          obj["date"] = (
            <span style={{ direction: isRTL ? "ltr" : "ltr" }}>
              {moment(item?.file?.createdAt).format("YYYY-MM-DD h:mm a")}
            </span>
          );
          obj["downloaded"] = item?.file?.downloaded;
          obj["download"] = (
            <IconButton
              onClick={async () => {
                dispatch(downloadCount({ id: item?.file?.id }));
                const url = await getFileUrl(item?.file?.uuid);
                handleClick(url, item?.file?.title);
              }}
            >
              <GetAppIcon className="icon" />
            </IconButton>
          );

          array.push(obj);
          obj = {};
          return null;
        });

        return array;
      }
    },
    [isRTL, data]
  );

  const handleClick = (url, title) => {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", isRTL ? title?.ar : title?.en);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const newData = createColumn(data);
  return (
    <Container maxWidth="lg" className={classes.flexRoot}>
      <Typography className={classes.serviceTitle}>
        {t("SERVICESPAGES.SIDEMENU.CIRCULARS")}
      </Typography>
      <Fragment>
        <MUIDataTable
          className={classes.root}
          data={newData}
          columns={columns}
          options={options}
          components={components}
        />
      </Fragment>{" "}
    </Container>
  );
}

export default memo(Circulars);
