import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import { push } from "connected-react-router";
import HtmlParser from "html-react-parser";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsEyeFill } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import { DEVELOPMENT, PRODUCTION } from "../../../constants/config.json";
import actions from "../../../redux/actions";
import store from "../../../redux/store";
import useStyles from "../../../styles/components/mediaCenter/publicationCard";
import { getFile, getFileUrl, getImage } from "../../shared/utils";
import "moment/locale/ar-sa";
import "moment/locale/en-au";
const BASE_URL =
  process.env.NODE_ENV === "development" ? DEVELOPMENT : PRODUCTION;
const { readFileAction, downloadCount, loadingAction, setPagination } = actions;

export default function PublicationCard({ item, search }) {
  const { t } = useTranslation();
   const {
     basicTheme: { isRTL },
   } = useSelector((state) => state.theme_reducer);
   const classes = useStyles();
   const [itemFile, setitemFile] = useState(null);
   const dispatch = useDispatch();
   const [download, setDownload] = useState(0);
   const [file, setFile] = useState({});

   const { downloadCountCompleted } = useSelector((state) => state.files);

   useEffect(() => {
     setitemFile(item.files ? getFile(item.files, isRTL) : {});
   }, [item, isRTL]);

 

  const reducer = useSelector((state) => state);

  const autoDownloadDocument = (href, fileName) => {
    if (!href || !fileName) return;
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    dispatch(loadingAction({ loading: false }));
  };

  useEffect(() => {
    if (!downloadCountCompleted.success) return;
    setFile(downloadCountCompleted);
  }, [downloadCountCompleted]);

  useEffect(() => {
    if (downloadCountCompleted.success) {
      setDownload(download + 1);
    }
  }, [downloadCountCompleted]);

  const image = getImage(item?.files, isRTL);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Card key={uid(item)} className={classes.cardRoot}>
      <Box className={classes.imgContainer}>
        <CardMedia
          className="media"
          image={`/api/file/download/${image?.uuid}?size=small`}
          title={image?.alt}
        />
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          direction: isRTL ? "rtl" : "ltr",
          textAlign: "start",
          flexDirection: "column-reverse",
        }}
      >
        {" "}
        {item.id ? (
          <>
            <CardHeader
              className={classes.CardHeader}
              title={HtmlParser(
                `${
                  typeof item.title === "string"
                    ? item.title
                    : isRTL
                    ? item.title?.ar
                    : item.title?.en
                }`
              )}
            />
            <Box className={classes.subHeader}>
              <span className={classes.date}>
                {moment(item.privateDate)
                  .format("DD MMM YYYY")
                  .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))}
              </span>
              <span className={classes.counters}>
                <span className={classes.readCount}>
                  {itemFile?.readCount ? itemFile?.readCount : 0}

                  <BsEyeFill />
                </span>
                <span className={classes.downloadCount}>
                  {download != 0 ? download : itemFile?.downloadCount}

                  <IoMdDownload />
                </span>
              </span>
            </Box>
          </>
        ) : null}
      </Box>
      <CardActions className={classes.CardActions}>
        <Button
          className="button first"
          onClick={() => {
            let id = itemFile.fileId;
            if (search) dispatch(setPagination({ data: 1 }));
            if (file) {
              dispatch(readFileAction({ id: id }));
              store.dispatch(
                push(
                  `/${isRTL ? "ar" : "en"}/media/publications/publications/${
                    item.alias
                  }/read`
                )
              );
            } else {
              <p>{isRTL ? "لا يوجد ملفات " : "no files"}</p>;
            }
          }}
        >
          {t("PUBLICATIONS.READ")}
        </Button>

        <Button
          className="button second"
          onClick={async (e) => {
            let id = itemFile.fileId;
            await dispatch(downloadCount({ id: id }));
            setDownload(download + 1);
            if (itemFile && itemFile?.uuid) {
              dispatch(loadingAction({ loading: true }));
              setDownload(itemFile.downloadCount);

              let url = await getFileUrl(itemFile.uuid);
              await autoDownloadDocument(url, itemFile.uuid);
            }
          }}
          endIcon={<MdFileDownload />}
        >
          {t("PUBLICATIONS.DOWNLOAD")}
        </Button>
      </CardActions>
    </Card>
  );
}
