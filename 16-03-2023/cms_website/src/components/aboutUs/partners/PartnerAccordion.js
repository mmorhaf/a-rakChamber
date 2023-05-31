import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { getImage } from "../../shared/utils";
import useStyles from "../law/LawStyle";

export default function SimpleAccordion({
  item,
  isRTL,
  expanded,
  collapse,
  handleChange,
  index,
}) {
  const classes = useStyles();

  return (
    <div>
      <Accordion
        className={classes.Accordion}
        expanded={expanded === `panel${index}` || !collapse}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          id="panel1a-header"
          expandIcon=" "
          aria-controls={`panel${index}-content`}
        >
          <Typography className={classes.heading}>
            {isRTL ? item?.title?.ar : item?.title?.en}
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ flexDirection: "column" }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                {(isRTL && item?.description?.ar) ||
                (!isRTL && item?.description?.en) ? (
                  <span
                    dangerouslySetInnerHTML={{
                      __html: `${
                        isRTL ? item?.description?.ar : item?.description?.en
                      }`,
                    }}
                  ></span>
                ) : (
                  ""
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            {item?.posts.map((post) => {
              const image = getImage(post.files, isRTL);
              return (
                <Grid item sm={5} xs={12} className="acc">
                  {post.newsLink ? (
                    <a
                      href={post.newsLink}
                      target="_blank"
                      rel="noreferrer"
                      className={classes.accContent}
                    >
                      <Typography variant="span">
                        <img
                          src={`/api/file/download/${image.uuid}?size=small`}
                          alt={image.alt}
                        />
                      </Typography>
                      <Typography variant="h3">
                        {isRTL ? post?.title?.ar : post?.title?.en}
                      </Typography>
                    </a>
                  ) : (
                    <div className={classes.accContent}>
                      <Typography variant="span">
                        <img
                          src={`/api/file/download/${image.uuid}?size=small`}
                          alt={image.alt}
                        />
                      </Typography>
                      <Typography variant="h3">
                        {isRTL ? post?.title?.ar : post?.title?.en}
                      </Typography>
                    </div>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
