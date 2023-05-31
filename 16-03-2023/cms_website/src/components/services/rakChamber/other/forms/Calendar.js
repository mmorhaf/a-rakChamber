import { EditingState, ViewState } from "@devexpress/dx-react-scheduler";
import {
  AllDayPanel,
  AppointmentForm,
  Appointments,
  DateNavigator,
  DragDropProvider,
  EditRecurrenceMenu,
  MonthView,
  Resources,
  Scheduler,
  Toolbar,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  InputLabel,
  TextField as TextField2,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { Add, Remove } from "@material-ui/icons";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import Close from "@material-ui/icons/Close";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Autocomplete from "@material-ui/lab/Autocomplete";
import clsx from "clsx";
import { Field, Form, Formik } from "formik";
import { Checkbox as FormikCheckbox, TextField } from "formik-material-ui";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLogIn } from "react-icons/io5";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { arLab, enLabels } from "../../../../../constants/labels";
import actions from "../../../../../redux/actions";
import useStyles from "../../../../../styles/components/services/calendar";
import { initialValues } from "../../../../../utils/index";
import DateTimePicker from "../../../../dateTimePicker/DateTimePicker";
import ServicesResultModal from "../../ServicesResultModal";
import DropDownTree from "./dropDownTree";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const styles = (theme) => ({
  roomTitle: {
    color: "#B2C900",
    fontSize: "16px!important",
    textTransform: "capitalize",
  },
  flexibleSpace: {
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    fontWeight: 600,
    flex: "1 1",
    overflowX: "auto",
    marginRight: 20,
    color: "#bf9e66",
    "& .MuiTypography-root": {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  weekendCell: {
    height: "110px",
  },
  calendar: {
    "& > div": {
      position: "absolute",
    },
  },
  button: {
    fontFamily:
      // theme.direction == "ltr" ? "poppins!important" : "tajawal!important",
      "poppins!important",
    paddingLeft: 8,
    marginBottom: 5,
    borderRadius: 8,
    paddingRight: 8,
    maxWidth: "auto",
    width: 125,
    height: 50,
    marginLeft: 10,
    border: `1px solid #1f627f`,
    color: "#554A4F",
    fontSize: "14px",
    fontWeight: "500",
    overflow: "hidden",
    fontSize: 16,
    padding: 10,
    maxHeight: 40,
    // wordBreak: "break-all",
    fontFamily: "OpenSansRegular",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    "@media (max-width: 800px)": {
      width: 16,
      fontSize: "0.75rem",
    },
    "&:hover": {
      backgroundColor: "#1f627f!important",
      border: "none!important",
      color: "white!important",
    },
    "&:focus": {
      backgroundColor: "#1f627f!important",
      border: "none!important",
      color: "white!important",
    },
    "&:active": {
      backgroundColor: "#1f627f!important",
      border: "none!important",
      color: "white!important",
    },
  },
  selectedButton: {
    borderRadius: 8,
    fontFamily:
      // theme.direction == "ltr" ? "poppins!important" : "tajawal!important",
      "poppins!important",
    color: "white!important",
    width: "auto",
    backgroundColor: "#1f627f",
    border: "none!important",
    "&:focus": {
      backgroundColor: "#1f627f!important",
      color: "white!important",
    },
    "&:hover": {
      backgroundColor: "white!important",
      border: "1px solid #1f627f !important",
      color: "#1f627f!important",
    },
    "&:first-child": {
      width: 85,
      "&:focus": {
        backgroundColor: "#1f627f!important",
      },
    },
  },
});
const AppointmentFormContainerBasic1 = ({
  reservation,
  editingAppointment,
  addedAppointment,
  setEditingAppointment,
  previousAppointment,
  setIsNewAppointment,
  toggleEditingFormVisibility,
  commitDeletedAppointment,
  setEditingFormVisible,
  room,
  id,
  setClicked,
  ...props
}) => {
  const classes = useStyles();
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [facilities, setFacilities] = useState([]);
  const [roomId, setRoomId] = useState();
  const [appointmentData, setAppointmentData] = useState({
    ...props.appointmentData,
  });
  const { t } = useTranslation();
  const [expanded2, setExpanded2] = useState(false);

  const [loading, setLoading] = useState(false);

  const { createNew, created, loadingAction } = actions;
  const reducers = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    setFacilities(room.facilites);
  }, [room]);

  useEffect(() => {
    setRoomId(room.id);
  }, [room]);

  const currentAppointment =
    reservation?.filter(
      (appointment) =>
        editingAppointment && appointment.id === editingAppointment.id
    ) || addedAppointment;

  const cancelAppointment = () => {
    if (isNewAppointment) {
      setEditingAppointment(previousAppointment);
      setIsNewAppointment(false);
    }
  };

  const changeAppointment = ({ field, changes }) => {
    const nextChanges = {
      ...appointmentChanges,
      [field]: changes,
    };
    setAppointmentChanges(nextChanges);
  };
  const commitAppointment = (type, values) => {
    const { commitChanges } = props;
    const appointment = {
      ...appointmentData,
      ...appointmentChanges,
    };
    if (type === "deleted") {
      commitChanges({ [type]: appointment.id });
    } else if (type === "changed") {
      commitChanges({ [type]: { [appointment.id]: appointment } });
    } else {
      commitChanges({ [type]: appointment, values });
    }
    setAppointmentChanges({});
  };
  const { visible, visibleChange, target, onHide } = props;
  const displayAppointmentData = {
    ...appointmentData,
    ...appointmentChanges,
  };

  const isNewAppointment = appointmentData?.id === undefined;
  const applyChanges = (values) =>
    isNewAppointment
      ? (visibleChange(), commitAppointment("added", values))
      : (commitAppointment("changed", values), visibleChange());

  const textEditorProps = (field, setFieldValue) => ({
    variant: "outlined",
    onChange: ({ target: change }) => (
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
      setAppointmentData({ ...appointmentData, title: change.value }),
      setFieldValue("eventTitle", change.value),
      setFieldValue("roomId", room.id)
    ),
    value: displayAppointmentData[field] || "",
    className: classes.input,
  });
  const NameEditorProps = (field, setFieldValue, formik) => ({
    variant: "outlined",
    type: "text",
    onChange: ({ target: change }) => (
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
      setAppointmentData({ ...appointmentData, name: change.value }),
      setFieldValue("name", change.value)
    ),
    value: displayAppointmentData[field] || "",
    className: classes.input,
  });
  const emailEditorProps = (field, setFieldValue) => ({
    variant: "outlined",
    type: "email",
    onChange: ({ target: change }) => (
      changeAppointment({
        field: [field],
        changes: change.value,
      }),
      setAppointmentData({ ...appointmentData, email: change.value }),
      setFieldValue("email", change.value)
    ),
    value: displayAppointmentData[field] || "",
    className: classes.input,
  });
  const cancelChanges = () => {
    setAppointmentChanges({});
    toggleEditingFormVisibility();
    cancelAppointment();
    dispatch(created({ data: {} }));
  };
  const reservationValidationSchema = () => {
    return Yup.object({
      eventTitle: Yup.string().required(t("HOME.SERVICES.REQUIRED")),
      orgName: Yup.string(),
      name: Yup.string().required(t("HOME.SERVICES.REQUIRED")),
      email: Yup.string()
        .email(t("HOME.SERVICES.EMAILVALID"))
        .required(t("HOME.SERVICES.REQUIRED")),
      phoneNumber: Yup.string()
        .test(
          "len",
          t("HOME.SERVICES.REQUIRED"),

          (val) => val && val.length > 8
        )
        .nullable(),
      endDate: Yup.date()
        .nullable()
        .when("startDate", (startDate, schema) => {
          if (startDate) {
            return schema.min(
              moment(startDate),
              isRTL
                ? "يجب أن يكون بعد تاريخ بداية الحجز"
                : "End Date Should Be After Start Date"
            );
          } else {
            return schema;
          }
        }),
    });
  };
  let eventStartDate = new Date();
  const reservationInitialValues = initialValues("reservation");
  const onSubmit = async (values) => {
    let payload = values;
    let sort = "service/request/booking";
    setLoading(true);
    dispatch(loadingAction({ loading: true }));
    dispatch(createNew({ payload, sort, id }));
  };

  let today = new Date();
  today = today.toISOString().substring(0, 16);
  return (
    <Formik
      initialValues={reservationInitialValues}
      validationSchema={reservationValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
    >
      {function MyForm({
        formik,
        errors,
        submitForm,
        values,
        setFieldValue,
        touched,
        initialValues,
      }) {
        useEffect(() => {
          if (appointmentData?.startDate) {
            let startDate = new Date(
              Date.UTC(
                appointmentData?.startDate.getFullYear(),
                appointmentData?.startDate.getMonth(),
                appointmentData?.startDate.getDate()
              )
            );
            startDate.setUTCHours(8);
            startDate.setUTCMinutes(0);
            let formattedDateStartDate = startDate
              .toISOString()
              .substring(0, 16);
            setFieldValue("startDate", formattedDateStartDate);
          }
          if (appointmentData?.endDate) {
            let endDate = new Date(
              Date.UTC(
                appointmentData?.endDate.getFullYear(),
                appointmentData?.endDate.getMonth(),
                appointmentData?.endDate.getDate()
              )
            );
            endDate.setUTCHours(16);
            endDate.setUTCMinutes(0);
            let formattedDateEndDate = endDate.toISOString().substring(0, 16);
            setFieldValue("endDate", formattedDateEndDate);
          }
        }, [initialValues]);
        return (
          <AppointmentForm.Overlay
            visible={visible}
            target={target}
            fullSize
            onHide={onHide}
          >
            <Form
              className={classes.fullForm}
              autoComplete="off"
              variant="outlined"
              style={{
                textAlign: isRTL ? "right" : "left",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              <Container maxWidth="xl" className={classes.root}>
                <div className={classes.header}>
                  <IconButton
                    className={classes.closeButton}
                    onClick={cancelChanges}
                  >
                    <Close color="action" />
                  </IconButton>
                  <Typography
                    variant="h5"
                    className={clsx(classes.header, classes.down)}
                  >
                    {t("HOME.SERVICES.BOOKINFO")}
                  </Typography>
                </div>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel
                      htmlFor="title"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.EVENTTITLE")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      name="eventTitle"
                      {...textEditorProps("eventTitle", setFieldValue, formik)}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel htmlFor="orgName" className={classes.label}>
                      {t("HOME.SERVICES.ORGNAME")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      name="orgName"
                      variant="outlined"
                      onChange={(e) =>
                        setFieldValue("orgName", e?.target?.value)
                      }
                      value={formik?.values?.orgName}
                      className={classes.input}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel htmlFor="startDate" className={classes.label}>
                      {t("HOME.SERVICES.STARTDATE")}
                    </InputLabel>
                    <DateTimePicker
                      name="startDate"
                      variant="outlined"
                      className={classes.input}
                      value={values?.startDate}
                      min={today}
                      onChange={(e) => {
                        setFieldValue("startDate", e?.target?.value);
                      }}
                    />
                    {errors.startDate && formik?.touched.startDate ? (
                      <div className={classes.error}>{errors.startDate}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel htmlFor="endDate" className={classes.label}>
                      {t("HOME.SERVICES.ENDDATE")}
                    </InputLabel>
                    <DateTimePicker
                      name="endDate"
                      minDate={new Date()}
                      variant="outlined"
                      className={classes.input}
                      min={values?.startDate ? values?.startDate : today}
                      value={values?.endDate}
                      onChange={(e) => {
                        setFieldValue("endDate", e?.target?.value);
                      }}
                    />
                    {errors?.endDate ? (
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#f44336",
                        }}
                      >
                        {errors?.endDate}
                      </div>
                    ) : null}
                  </Grid>
                </Grid>
                {facilities && facilities?.length > 0 && (
                  <Grid container className={classes.marginBottom20}>
                    <Grid item sm={6} xs={12}>
                      <InputLabel
                        htmlFor="facilities"
                        className={classes.label}
                      >
                        {t("HOME.SERVICES.FACILITIES")}
                      </InputLabel>
                      {facilities && facilities?.length > 0 ? (
                        <Field
                          component={Autocomplete}
                          disabled={props.disabled}
                          multiple
                          options={facilities}
                          freeSolo
                          name={"facilites"}
                          value={values?.facilites}
                          className={classes.input}
                          PaperComponent={({ children }) => (
                            <Paper
                              style={{
                                textTransform: "capitalize",
                                direction: isRTL ? "rtl" : "ltr",
                              }}
                            >
                              {children}
                            </Paper>
                          )}
                          onChange={(event, value) => {
                            setFieldValue("facilites", value);
                          }}
                          filterSelectedOptions={true}
                          getOptionLabel={(option) =>
                            option.title
                              ? isRTL
                                ? option.title?.ar
                                : option.title?.en
                              : ""
                          }
                          renderOption={(option, { selected }) => (
                            <React.Fragment>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ color: "#1f627f" }}
                                checked={selected}
                              />
                              {option.title
                                ? isRTL
                                  ? option.title?.ar
                                  : option.title?.en
                                : ""}
                            </React.Fragment>
                          )}
                          renderInput={(params) => (
                            <TextField2 {...params} variant="outlined" />
                          )}
                        />
                      ) : (
                        <Typography
                          style={{
                            height: 45,
                            color: "#979797",
                            fontSize: 14,
                            padding: 15,
                            backgroundColor: "#f3f3f3",
                          }}
                        >
                          There is no Facilities for this Venue
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                )}
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel htmlFor="roomId" className={classes.label}>
                      {t("HOME.SERVICES.VENUE")}
                    </InputLabel>

                    <Field
                      component={DropDownTree}
                      value={roomId}
                      data={[room]}
                      formik={formik}
                      name="roomId"
                      className={classes.select}
                      isUserGroup={true}
                      disabled={true}
                      isRTL={isRTL}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item sm={6} xs={12}>
                    <Typography variant="h5" className={classes.header}>
                      {t("HOME.SERVICES.CONTACTINFO")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel
                      htmlFor="name"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.NAME")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      name="name"
                      {...NameEditorProps("name", setFieldValue, formik)}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12}>
                    <InputLabel
                      htmlFor="email"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.EMAIL")}
                    </InputLabel>
                    <Field
                      component={TextField}
                      name="email"
                      {...emailEditorProps("email", setFieldValue, formik)}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="phoneNumber"
                      className={classes.label}
                      required
                    >
                      {t("HOME.SERVICES.PHONE1")}
                    </InputLabel>
                    <Field
                      component={PhoneInput}
                      labels={isRTL ? arLab : enLabels}
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      onChange={(e) => {
                        if (e) {
                          setFieldValue("phoneNumber", e);
                          if (!isPossiblePhoneNumber(e))
                            formik?.setFieldError(
                              "phoneNumber",
                              isRTL
                                ? "الرجاء إضافة رقم الهاتف"
                                : "Please Add phone Number"
                            );
                        }
                      }}
                      variant="outlined"
                      defaultCountry="AE"
                      international
                    />
                    {errors?.phoneNumber ||
                    !isPossiblePhoneNumber(values.phoneNumber) ? (
                      <div className={classes.error}>{errors.phoneNumber}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12} className={classes.inpuContainer}>
                    <InputLabel
                      htmlFor="phoneNumber2"
                      className={classes.label}
                    >
                      {t("HOME.SERVICES.PHONE2")}
                    </InputLabel>

                    <Field
                      component={PhoneInput}
                      labels={isRTL ? arLab : enLabels}
                      name="phoneNumber2"
                      type="text"
                      id="phoneNumber2"
                      onChange={(e) => {
                        if (e) {
                          setFieldValue("phoneNumber2", e);
                          if (!isPossiblePhoneNumber(e))
                            formik?.setFieldError(
                              "phoneNumber2",
                              isRTL
                                ? "الرجاء إضافة رقم الهاتف"
                                : "Please Add phone Number"
                            );
                        }
                      }}
                      variant="outlined"
                      defaultCountry="AE"
                      international
                    />
                    {errors?.phoneNumber2 ||
                    !isPossiblePhoneNumber(values.phoneNumber2) ? (
                      <div className={classes.error}>{errors.phoneNumber2}</div>
                    ) : null}
                  </Grid>
                </Grid>
                <Grid container className={classes.marginBottom20}>
                  <Grid item sm={6} xs={12} className={classes.ckeck}>
                    <label className={classes.text}>
                      <Field
                        type="checkbox"
                        component={FormikCheckbox}
                        name="needSupport"
                        value="true"
                      />
                      {t("HOME.SERVICES.NEEDSUPPORT")}
                    </label>
                  </Grid>
                </Grid>
                {facilities && facilities?.length > 0 ? (
                  <Grid
                    container
                    className={clsx(classes.block, classes.marginBottom20)}
                  >
                    <Accordion
                      expanded={expanded2}
                      onChange={() => setExpanded2(!expanded2)}
                      className={classes.accordion}
                    >
                      <AccordionSummary
                        expandIcon={
                          expanded2 ? (
                            <Remove className={classes.accordionIcon} />
                          ) : (
                            <Add className={classes.accordionIcon} />
                          )
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {t("HOME.SERVICES.FACILITIES")}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {facilities &&
                          facilities.map((facility) => (
                            <>
                              {isRTL ? (
                                <>
                                  <Grid container item xs={12}>
                                    <FiberManualRecordIcon
                                      className={clsx(
                                        classes.marginLeft27,
                                        classes.green
                                      )}
                                    />
                                    <InputLabel
                                      className={clsx(
                                        classes.paddingTop5,
                                        classes.accTitle
                                      )}
                                    >
                                      {facility.title.ar}
                                    </InputLabel>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={12}
                                    className={classes.block}
                                  >
                                    <Typography
                                      variant="body1"
                                      className={classes.paddingLeft25}
                                    >
                                      {facility.description.ar}
                                    </Typography>
                                  </Grid>
                                </>
                              ) : (
                                <>
                                  <Grid container item xs={12}>
                                    <FiberManualRecordIcon
                                      className={clsx(
                                        classes.marginLeft27,
                                        classes.green
                                      )}
                                    />
                                    <InputLabel
                                      className={clsx(
                                        classes.paddingTop5,
                                        classes.accTitle
                                      )}
                                    >
                                      {facility.title.en}
                                    </InputLabel>
                                  </Grid>
                                  <Grid
                                    container
                                    item
                                    xs={12}
                                    className={classes.block}
                                  >
                                    <Typography
                                      variant="body1"
                                      className={classes.paddingLeft25}
                                    >
                                      {facility.description.en}
                                    </Typography>
                                  </Grid>
                                </>
                              )}
                            </>
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  </Grid>
                ) : null}
                <div
                  className={clsx(classes.marginTop10, classes.marginBottom10)}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.send}
                    endIcon={<IoLogIn />}
                    onClick={(e) => {
                      submitForm();
                      // setClicked(true);
                    }}
                  >
                    {t("HOME.SERVICES.BOOK")}
                  </Button>
                </div>
              </Container>
            </Form>
          </AppointmentForm.Overlay>
        );
      }}
    </Formik>
  );
};
export default function Demo(props) {
  const [data, setData] = useState();
  const [reservations, setReservations] = useState([]);
  const [room, setRoom] = useState({});
  const [currentDate, setCurrentDate] = useState();
  const [appointmentChanges, setAppointmentChanges] = useState({});
  const [appointmentData, setAppointmentData] = useState({});
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [deletedAppointmentId, setDeletedAppointmentId] = useState(undefined);
  const [editingAppointment, setEditingAppointment] = useState(undefined);
  const [previousAppointment, setPreviousAppointment] = useState(undefined);
  const [addedAppointment, setAddedAppointment] = useState({});
  const [close, setClose] = useState(false);
  const [isNewAppointment, setIsNewAppointment] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("");
  const [locations, setLocations] = useState([]);
  const reducers = useSelector((state) => state);
  const [reservation, setReservation] = useState([]);
  const [editingFormVisible, setEditingFormVisible] = useState(false);
  const [onCurrentDateChange, setOnCurrentDateChange] = useState();
  const [onCurrentViewNameChange, setOnCurrentViewNameChange] = useState("");
  const [currentViewName, setCurrentViewName] = useState("");
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [message, setMessage] = useState("");
  const { getReservations, clear } = actions;
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const { loadingAction } = actions;
  const id = useParams().id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [resources, setResources] = useState([
    {
      fieldName: "status",
      title: "status",
      instances: [
        { id: 1, text: "dd" },
        { id: 2, text: "xxx" },
      ],
    },
  ]);

  useEffect(() => {
    if (
      // clicked &&
      reducers.crudReducers.created &&
      reducers.crudReducers.created?.success
    ) {
      setOpen(true);
      setMessage(
        isRTL
          ? `رقم طلبك لحجز القاعة هو ${reducers?.crudReducers?.created?.id}`
          : `Your Application Number for Booking Venue is ${reducers?.crudReducers?.created?.id} .`
      );
      dispatch(loadingAction({ loading: false }));
    } else {
      if (
        // clicked &&
        reducers?.crudReducers?.created?.code === 0
      ) {
        setOpen(true);
        setMessage(isRTL ? "خطأ سيرفر داخلي" : "Internal server error!");
        dispatch(loadingAction({ loading: false }));
      }
      if (
        // clicked &&
        reducers?.crudReducers?.created?.success === false
      ) {
        setOpen(true);
        setMessage(reducers?.crudReducers?.created?.message);
        dispatch(loadingAction({ loading: false }));
      }
    }
  }, [reducers.crudReducers.created, clicked]);

  useEffect(() => {
    if (close) {
      toggleEditingFormVisibility();
    }
  }, [close]);

  useEffect(() => {
    if (
      reducers.crudReducers.created &&
      reducers.crudReducers.created?.success
    ) {
      dispatch(clear({ data: {} }));
      setClicked(false);
      dispatch(getReservations({ sort: "reservation", id: id }));
    }
  }, [reducers.crudReducers.created?.success]);

  useEffect(() => {
    setReservations(props.reservations);
    setRoom(props.room);
  }, [props]);

  const getColor = (status) => {
    switch (status) {
      case "reserved":
        return "#E57373";
      case "unavilable":
        return "#b2c900";
      case "approved":
        return "#7986CB";
      case "rejected":
        return "#9575CD";
      default:
        return "#7986CB";
    }
  };

  useEffect(async () => {
    let instanceObject = { id: "", text: "" };
    let instanceArray = [];
    reservations?.map((item) => {
      instanceObject = {
        id: item.status,
        text: item.status,
        color: getColor(item.status),
      };
      instanceArray.push(instanceObject);
    });
    setResources([{ ...resources[0], instances: instanceArray }]);
  }, [reservations]);

  useEffect(async () => {
    setEditingFormVisible(isNewAppointment);
  }, [editingFormVisible]);

  // useEffect(() => {
  //   setStartDayHour(room.roomSetting?.startDayHour);
  //   setEndDayHour(room.roomSetting?.endDayHour);
  //   setExcludedDays(room.roomSetting?.excludedDays);
  //   setCellDuration(room.roomSetting?.cellDuration);
  // }, [room]);

  const FlexibleSpace = withStyles(styles, { name: "FlexibleSpace" })(
    ({ classes, ...restProps }) => (
      <Toolbar.FlexibleSpace {...restProps} className={classes.flexibleSpace}>
        <Typography variant="h5" className={classes.roomTitle}>
          {room ? (isRTL ? room.title?.ar : room.title?.en) : ""}
        </Typography>
      </Toolbar.FlexibleSpace>
    )
  );

  const isRestTime = (date) =>
    date.getDay() === 0 ||
    date.getDay() === 6 ||
    date.getHours() < 9 ||
    date.getHours() >= 18;

  const TimeTableCell = withStyles(styles, { name: "TimeTableCell" })(
    ({ classes, ...restProps }) => {
      const { startDate } = restProps;
      if (isRestTime(startDate)) {
        return (
          <WeekView.TimeTableCell
            {...restProps}
            className={classes.weekendCell}
          />
        );
      }
      return <WeekView.TimeTableCell {...restProps} />;
    }
  );

  const DayScaleCell = withStyles(styles, { name: "DayScaleCell" })(
    ({ classes, ...restProps }) => {
      const { startDate } = restProps;
      if (startDate.getDay() === 0 || startDate.getDay() === 6) {
        return (
          <WeekView.DayScaleCell {...restProps} className={classes.weekEnd} />
        );
      }
      return <WeekView.DayScaleCell {...restProps} />;
    }
  );

  const getStatus = (status) => {
    switch (status) {
      case "reserved":
        return isRTL ? "محجوز" : "Reserved";
      case "unavilable":
        return isRTL ? "غير متاح" : "Unavailable";
      case "approved":
        return isRTL ? "مقبول" : "Approved";
      case "rejected":
        return isRTL ? "مرفوض" : "Rejected";
      default:
        return status;
    }
  };
  const AppointmentContent = withStyles(styles, { name: "AppointmentContent" })(
    ({ classes, data, formatDate, ...restProps }) => (
      <Appointments.AppointmentContent
        {...restProps}
        formatDate={formatDate}
        data={data}
      >
        <div className={classes.container}>
          <div className={classes.title}>{data.title}</div>
          <div className={classes.text}>{getStatus(data.status)}</div>
        </div>
      </Appointments.AppointmentContent>
    )
  );

  // const commitChanges = ({ deleted }) => {
  //   //save reservation id in state an open confirmation dialog
  //   if (deleted !== undefined) {
  //     setDeletedAppointmentId(deleted);
  //     toggleConfirmationVisible();
  //   }
  // };
  //open and close editing form
  const toggleEditingFormVisibility = () => {
    setEditingFormVisible(!editingFormVisible);
  };

  const onEditingAppointmentChange = (editingAppointment) => {
    // toggleEditingFormVisibility();
    // setEditingFormVisible(!editingFormVisible);
    setIsNewAppointment(false);
    setEditingAppointment(editingAppointment);
    //reservation fields value if edit reservation fetch data from reservation array by filtering due id
    const currentAppointment =
      reservation?.filter(
        (appointment) =>
          editingAppointment && appointment.id === editingAppointment.id
      ) || addedAppointment;
    //current Appointment is an array containing one object
    setAppointmentData(currentAppointment[0]);
  };

  //Add Appointment
  const onAddedAppointmentChange = (addedAppointment) => {
    if (
      moment(addedAppointment.startDate).isAfter(moment(new Date())) ||
      (moment(addedAppointment.startDate).isSame(moment(new Date()), "day") &&
        moment(addedAppointment.startDate).isSame(
          moment(new Date()),
          "month"
        ) &&
        moment(addedAppointment.startDate).isSame(moment(new Date()), "year"))
    )
      setIsNewAppointment(true);
    else setClose(true);
    //set fields value when add new appointment
    addedAppointment = {
      ...addedAppointment,
      endDate: addedAppointment?.startDate,
    };
    setAppointmentData(addedAppointment);
    setAddedAppointment(addedAppointment);

    if (editingAppointment !== undefined) {
      setPreviousAppointment(editingAppointment);
    }
    setEditingAppointment(undefined);
  };

  //confirmation Dialog visibility
  // const toggleConfirmationVisible = () => {
  //   setConfirmationVisible(!confirmationVisible);
  // };
  //Delete Appointment
  // const commitDeletedAppointment = () => {
  //   dispatch(
  //     cancelItem({
  //       sort: "service/request/booking/",
  //       id: deletedAppointmentId,
  //     })
  //   );
  //   setLoading(true);
  //   setDeletedAppointmentId(null);
  //   toggleConfirmationVisible();
  // };

  let newReservationsss = reservations?.map((res) => {
    const newReservation = {
      ...res,
      startDate: moment(res.startDate)
        .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
        .format("YYYY-MM-DD HH:mm"),
      endDate: moment(res.endDate)
        .set({ hour: 12, minute: 0, second: 0, millisecond: 0 })
        .format("YYYY-MM-DD HH:mm"),
    };
    if (moment(newReservation.endDate).isSame(newReservation.startDate)) {
      newReservation.endDate = moment(res.endDate)
        .set({ hour: 13, minute: 0, second: 0, millisecond: 0 })
        .format("YYYY-MM-DD HH:mm");
    }

    return newReservation;
  });

  return (
    <Paper className={classes.calendar}>
      <Scheduler data={newReservationsss}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={onCurrentDateChange}
          currentViewName={currentViewName}
          onCurrentViewNameChange={onCurrentViewNameChange}
        />
        <EditingState
          onEditingAppointmentChange={onEditingAppointmentChange}
          onAddedAppointmentChange={onAddedAppointmentChange}
        />
        {/* <WeekView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          excludedDays={excludedDays}
          cellDuration={cellDuration}
        />{" "}
        <DayView startDayHour={startDayHour} endDayHour={endDayHour} /> */}
        <MonthView />
        <AllDayPanel />
        <EditRecurrenceMenu />
        <Appointments appointmentContentComponent={AppointmentContent} />{" "}
        <Resources data={resources} />
        {/* <AppointmentTooltip showOpenButton showCloseButton showDeleteButton /> */}
        {/* <AppointmentTooltip showOpenButton /> */}
        {/* <Toolbar flexibleSpaceComponent={FlexibleSpace} locations={locations} /> */}
        <Toolbar flexibleSpaceComponent={FlexibleSpace} />
        {/* <ViewSwitcher /> */}
        <DateNavigator />
        <AppointmentForm
          overlayComponent={(props) =>
            AppointmentFormContainerBasic1({
              ...props,
              reservation: reservation,
              editingAppointment: editingAppointment,
              addedAppointment: addedAppointment,
              setEditingAppointment: setEditingAppointment,
              previousAppointment: previousAppointment,
              setIsNewAppointment: setIsNewAppointment,
              toggleEditingFormVisibility: toggleEditingFormVisibility,
              appointmentData: appointmentData,
              setAppointmentData: setAppointmentData,
              setEditingFormVisible: setEditingFormVisible,
              setClicked: setClicked,
              room: room,
              id: id,
            })
          }
          visible={editingFormVisible}
          onVisibilityChange={toggleEditingFormVisibility}
        />
        <DragDropProvider />
      </Scheduler>
      <ServicesResultModal
        open={open}
        message={message}
        setOpen={setOpen}
        setIsNewAppointment={setIsNewAppointment}
        setEditingFormVisible={setEditingFormVisible}
      />
      {/* <Dialog open={confirmationVisible} onClose={cancelDelete}> */}
      {/* <Dialog open={confirmationVisible}>
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel this Reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleConfirmationVisible}
            className={clsx(classes.btn, classes.blueBtn, classes.smallBtn)}
          >
            No
          </Button>
          <Button
            onClick={commitDeletedAppointment}
            className={clsx(classes.btn, classes.whiteBtn)}
          >
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* <Fab
        className={classes.addButton}
        onClick={() => {
          setEditingFormVisible(true);
          onEditingAppointmentChange(undefined);
          onAddedAppointmentChange({
            startDate: new Date(currentDate).setHours(startDayHour),
            endDate: new Date(currentDate).setHours(startDayHour + 1),
          });
        }}
      >
        <AddIcon />
      </Fab> */}
    </Paper>
  );
}
