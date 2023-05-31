import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import clsx from "clsx";
import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/venue";
import Calendar from "./Calendar";
const { getReservations, getById } = actions;

function Venue(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const [reservations, setReservations] = useState([]);
  const [room, setRoom] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const id = useParams().id;
  const [expanded1, setExpanded1] = useState(true);
  const reducers = useSelector((state) => state);
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(getById({ sort: "post", id }));
  }, []);

  useEffect(() => {
    dispatch(getReservations({ sort: "reservation", id: id }));
  }, []);

  useEffect(async () => {
    if (reducers.crudReducers.byIdReturned.result) {
      setRoom(reducers.crudReducers.byIdReturned.result);
    }
  }, [reducers.crudReducers]);

  useEffect(async () => {
    let roomFacilities = [];
    roomFacilities = room?.facilites?.filter((facility) =>
      isRTL
        ? [1, 3].includes(facility.publishMode)
        : [2, 3].includes(facility.publishMode)
    );
    setFacilities(roomFacilities);
  }, [room]);

  useEffect(async () => {
    setReservations(reducers.crudReducers.allReservationsReturned.reservations);
  }, [reducers.crudReducers]);
  return (
    <Grid container className={classes.root}>
      <Grid
        container
        item
        xs={12}
        className={clsx(classes.block, classes.marginBottom30)}
      >
        <Accordion
          expanded={expanded1}
          onChange={() => setExpanded1(!expanded1)}
          className={classes.accordion}
        >
          <AccordionSummary
            expandIcon={
              expanded1 ? (
                <Remove className={classes.accordionIcon} />
              ) : (
                <Add className={classes.accordionIcon} />
              )
            }
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {t("HOME.SERVICES.SPACES")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <Typography className={classes.title}>
                {t("HOME.SERVICES.VENUEBOOKING")}
              </Typography>
              <Calendar
                reservations={reservations}
                room={room}
                editingFormVisible={editingFormVisible}
                setEditingFormVisible={setEditingFormVisible}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
}

export default memo(Venue);
