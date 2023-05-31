import { Grid, Typography, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStyles from "../../../styles/components/aboutUs/strategicPlan";
import { getFiles, getImage, getFileUrl } from "../../shared/utils";
import { useTranslation } from "react-i18next";
import { HiDownload, HiOutlineBookOpen } from "react-icons/hi";
import store from "../../../redux/store";
import { push } from "connected-react-router";

function PlanCard({ item }) {
  let [image, setImage] = useState([]);
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  useEffect(() => {
    setImage(getImage(item?.files, isRTL));
  }, [item]);
  const classes = useStyles();
  const handleClick = (url, title) => {
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", title);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
  return (
    <div>
      <Grid container item className={classes.content}>
        <img
          src={`/api/file/download/${image?.uuid}?size=small`}
          className={classes.image}
          alt="pic"
        />
        <Typography className={classes.value}>
          {isRTL ? item.title.ar : item.title.en}
        </Typography>
      </Grid>
      <Typography className={classes.discription}>
        <span
          dangerouslySetInnerHTML={{
            __html: `${isRTL ? item?.description.ar : item?.description.en}`,
          }}
        ></span>
        {getFiles(item?.files, isRTL)?.length > 0 ? (
          <Box className={classes.boxContainer}>
            {getFiles(item?.files, isRTL)?.length > 0 &&
              getFiles(item?.files, isRTL)?.map((subItem) => (
                <Box className={classes.box}>
                  <Box>
                    <div className={classes.pdfIcon}>
                      <img
                        src="/assets/icons/pdfIcon.png"
                        className="icon"
                        alt="pdf icon"
                      />
                    </div>
                  </Box>
                  <Box className={classes.marginTop5}>
                    <span>{isRTL ? "تحميل" : "Download"}</span>
                    <span
                      onClick={async () => {
                        const url = await getFileUrl(subItem?.uuid);
                        handleClick(url, subItem?.alt);
                      }}
                    >
                      <HiDownload className={classes.icon} />
                    </span>
                  </Box>
                  <Box className={classes.marginTop5}>
                    {" "}
                    <span>{isRTL ? "قراءة" : "Read"}</span>
                    <span
                      onClick={(e) =>
                        store.dispatch(push(`/view/${subItem.uuid}`))
                      }
                    >
                      <HiOutlineBookOpen className={classes.icon} />
                    </span>
                  </Box>
                </Box>
              ))}
          </Box>
        ) : null}
      </Typography>
    </div>
  );
}

export default PlanCard;
