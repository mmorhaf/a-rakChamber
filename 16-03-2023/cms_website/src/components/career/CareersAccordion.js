import { Box, Button, Grid, Typography } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowsCollapse, BsArrowsExpand } from "react-icons/bs";
import { useSelector } from "react-redux";
import useStyles from "../aboutUs/law/LawStyle";

export default function SimpleAccordion({ career }) {
  const { t } = useTranslation();

  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const [expanded, setExpanded] = useState(false);
  const [collapse, setCollapse] = useState(true);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();
  return (
    <div>
      <Grid item xs={12} className={classes.allBtn}>
        <Button
          onClick={() => {
            setCollapse(!collapse);
            setExpanded(!expanded);
          }}
        >
          {collapse ? (
            <Box component="span" className="collaBtn">
              {t("FAQ.EXPAND")}
              <Box component="span">
                <BsArrowsExpand />
              </Box>
            </Box>
          ) : (
            <Box component="span" className="collaBtn">
              {t("FAQ.COLLAPSE")}
              <Box component="span">
                <BsArrowsCollapse />
              </Box>
            </Box>
          )}
        </Button>
      </Grid>
      <Accordion
        expanded={expanded === `panel${1}` || !collapse}
        onChange={handleChange(`panel${1}`)}
        className={classes.Accordion}
      >
        <AccordionSummary
          expandIcon=" "
          aria-controls="panel1a-content"
          id={`panel${1}-header`}
          className={expanded === `panel${1}` ? "border-bottom" : ""}
        >
          <Typography className={classes.heading}>
            {t("CAREER.QUALIFICATION")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.title}>
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: `${career?.qualification}`,
                }}
              ></span>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === `panel${2}` || !collapse}
        onChange={handleChange(`panel${2}`)}
        className={classes.Accordion}
      >
        <AccordionSummary
          expandIcon=" "
          aria-controls="panel1a-content"
          id={`panel${2}-header`}
          className={expanded === `panel${2}` ? "border-bottom" : ""}
        >
          <Typography className={classes.heading}>
            {t("CAREER.CONDITIONS")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.title}>
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: `${career?.conditions}`,
                }}
              ></span>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === `panel${3}` || !collapse}
        onChange={handleChange(`panel${3}`)}
        className={classes.Accordion}
      >
        <AccordionSummary
          expandIcon=" "
          aria-controls="panel1a-content"
          id={`panel${3}-header`}
          className={expanded === `panel${3}` ? "border-bottom" : ""}
        >
          <Typography className={classes.heading}>
            {t("CAREER.SKILLS")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.title}>
            {" "}
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: `${career?.skills}`,
                }}
              ></span>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === `panel${4}` || !collapse}
        onChange={handleChange(`panel${4}`)}
        className={classes.Accordion}
      >
        <AccordionSummary
          expandIcon=" "
          aria-controls="panel1a-content"
          id={`panel${4}-header`}
          className={expanded === `panel${4}` ? "border-bottom" : ""}
        >
          <Typography className={classes.heading}>
            {t("CAREER.TASKS")}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className={classes.title}>
            {
              <span
                dangerouslySetInnerHTML={{
                  __html: `${career?.tasksAndResponsibilities}`,
                }}
              ></span>
            }
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
