import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { getImage } from "../../shared/utils";
import useStyles from "./LawStyle";

export default function SimpleAccordion({
  data,
  type,
  expanded,
  collapse,
  handleChange,
  index,
}) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const classes = useStyles();
  return (
    <div>
      {isRTL && (data.publishMode === 1 || data.publishMode === 3) ? (
        <Accordion
          className={classes.Accordion}
          expanded={expanded === `panel${index}` || !collapse}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon=" "
            aria-controls={`panel${index}-content`}
            id="panel1a-header"
          >
            <div className={classes.accImgBox}>
              {" "}
              {data.files && data.files.length > 0 ? (
                <img
                  className={classes.accImg}
                  src={`/api/file/download/${
                    getImage(data?.files).uuid
                  }?size=small`}
                  alt="img"
                />
              ) : null}
            </div>
            <Typography className={classes.heading}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${data?.title?.ar ? data?.title?.ar : data?.title}`,
                }}
              ></span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.title}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${
                    data?.description?.ar
                      ? data?.description?.ar
                      : data?.description
                  }`,
                }}
              ></span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : !isRTL && (data.publishMode === 2 || data.publishMode === 3) ? (
        <Accordion
          className={classes.Accordion}
          expanded={expanded === `panel${index}` || !collapse}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon=" "
            aria-controls={`panel${index}-content`}
            id="panel1a-header"
          >
            {" "}
            <div className={classes.accImgBox}>
              {" "}
              {data.files && data.files.length > 0 ? (
                <img
                  className={classes.accImg}
                  src={`/api/file/download/${
                    getImage(data?.files).uuid
                  }?size=small`}
                  alt="img"
                />
              ) : null}
            </div>
            <Typography className={classes.heading}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${data?.title?.en ? data?.title?.en : data?.title}`,
                }}
              ></span>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={classes.title}>
              <span
                dangerouslySetInnerHTML={{
                  __html: `${
                    data?.description?.en
                      ? data?.description?.en
                      : data?.description
                  }`,
                }}
              ></span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ) : null}
    </div>
  );
}
