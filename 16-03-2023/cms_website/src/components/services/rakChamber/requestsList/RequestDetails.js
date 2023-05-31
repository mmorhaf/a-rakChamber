import React, { useState, useEffect } from "react";
import moment from "moment";
import actions from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import { useParams } from "react-router-dom";
import {
  DescriptionOutlined,
  CreateOutlined,
  PersonOutlineOutlined,
  EventAvailableOutlined,
  EventBusyOutlined,
  SettingsOutlined,
} from "@material-ui/icons";

const {
  getRequestDetails,
  getRequestStatusChanges,
  addRequestNote,
  getRequestNotes,
} = actions;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function RequestDetails(props) {
  const classes = useStyles();
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [statusChanges, setStatusChanges] = useState([]);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [value, setValue] = useState(0);

  const { services } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addNote = () => {
    let data = {
      body: {
        note: note,
        type: "external",
      },
      id: id,
    };
    dispatch(addRequestNote({ data }));
    setNote("");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    dispatch(getRequestDetails({ id }));
    dispatch(getRequestStatusChanges({ id }));
    dispatch(getRequestNotes({ id }));
  }, []);

  useEffect(() => {
    if (services.requestDetails) {
      setData(services.requestDetails);
    }

    if (services.requestStatusChanges) {
      setStatusChanges(services.requestStatusChanges);
    }

    if (services.requestNotes) {
      setNotes(services.requestNotes);
    }
  }, [
    services.requestDetails,
    services.requestNotes,
    services.requestStatusChanges,
  ]);

  useEffect(() => {
    dispatch(getRequestNotes({ id }));
  }, [services.requestNoteAdded]);

  return data.length != 0 ? (
    <Container maxWidth="xl" className={classes.requestDetailsRoot}>
      <Box className="head">
        <Grid container className="headContainer">
          <Grid item md={6}>
            <Box display="flex" alignItems="center">
              <DescriptionOutlined />
              <Typography className="label">Request No. : </Typography>
              <Typography> {id}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <SettingsOutlined />
              <Typography className="label">Service Name :</Typography>
              <Typography> {data.serviceTitle.en}</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PersonOutlineOutlined />
              <Typography className="label">Applicant's Name :</Typography>
              <Typography>{data.name}</Typography>
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box display="flex" alignItems="center">
              <CreateOutlined />
              <Typography className="label">Request Status :</Typography>
              <Typography>{data.status} </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EventAvailableOutlined />
              <Typography className="label">Submission Date :</Typography>
              <Typography>
                {moment(data.createdAt).format("YYYY-MM-DD  HH:MM A")}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <EventBusyOutlined />
              <Typography className="label">Expire Date :</Typography>
              <Typography></Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="body">
        <Grid container className="bodyContainer">
          {data.companyName && (
            <Box display="flex" alignItems="center">
              <Typography className="label2">Company Name : </Typography>
              <Typography>{data.companyName}</Typography>
            </Box>
          )}
          {data.phoneNumber && (
            <Box display="flex" alignItems="center">
              <Typography className="label2">Phone Number : </Typography>
              <Typography>{data.phoneNumber}</Typography>
            </Box>
          )}
          {data.fax && (
            <Box display="flex" alignItems="center">
              <Typography className="label2">Fax : </Typography>
              <Typography>{data.fax}</Typography>
            </Box>
          )}
          {data.Email && (
            <Box display="flex" alignItems="center">
              <Typography className="label2">Email : </Typography>
              <Typography>{data.Email}</Typography>
            </Box>
          )}
          {data.subject && (
            <Box display="flex" alignItems="center">
              <Typography className="label2">Subject : </Typography>
              <Typography>{data.subject}</Typography>
            </Box>
          )}
          {data.message && (
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <Typography className="label2">Details : </Typography>
              <Typography style={{ paddingLeft: 40, paddingBottom: 12 }}>
                {data.message}
              </Typography>
            </Box>
          )}
          {data.dataNatures?.length ? (
            <Box display="flex" alignItems="flex-start" flexDirection="column">
              <Typography className="label2">
                Nature of the requierd data :
              </Typography>
              <Box display="flex" flexDirection="column" paddingLeft={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.dataNatures.filter(
                          (item) => item == "Statistical Reports"
                        )[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Statistical"
                    />
                  }
                  label="Statistical Reports"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.dataNatures.filter(
                          (item) => item == "General Information"
                        )[0]
                          ? true
                          : false
                      }
                      disabled
                      name="General"
                    />
                  }
                  label="General Information"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.dataNatures.filter(
                          (item) => item == "Print Materials"
                        )[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Print"
                    />
                  }
                  label="Print Materials"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.dataNatures.filter(
                          (item) => item == "Companies Lists"
                        )[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Companies"
                    />
                  }
                  label="Companies Lists"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.dataNatures.filter(
                          (item) => item == "Cosultancy"
                        )[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Cosultancy"
                    />
                  }
                  label="Cosultancy"
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
          {data.responseType?.length ? (
            <Box display="flex" alignItems="flex-start" flexDirection="column">
              <Typography className="label2">Response Type : </Typography>
              <Box display="flex" flexDirection="column" paddingLeft={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.responseType.filter((item) => item == "Phone")[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Phone"
                    />
                  }
                  label="Phone"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.responseType.filter((item) => item == "E-Mail")[0]
                          ? true
                          : false
                      }
                      disabled
                      name="E-Mail"
                    />
                  }
                  label="E-Mail"
                />{" "}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        data.responseType.filter((item) => item == "Fax")[0]
                          ? true
                          : false
                      }
                      disabled
                      name="Fax"
                    />
                  }
                  label="Fax"
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Grid>
      </Box>
      <Box className="tables">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Attachments" />
          <Tab label="Notes" />
          <Tab label="Status" />
        </Tabs>
        <TabPanel value={value} index={0} className="tabCon">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Attachment's Name </TableCell>
                  <TableCell>Type </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        <TabPanel value={value} index={1} className="tabCon">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Note </TableCell>
                  <TableCell>Added By </TableCell>
                  <TableCell>Added Date </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notes.map((item) => (
                  <TableRow>
                    <TableCell>{item.note}</TableCell>
                    <TableCell>{item.createdBy}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="addNote">
            <textarea
              placeHolder="Enter Your Notes"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <Button className="addBtn" variant="contained" onClick={addNote}>
              Add Note
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2} className="tabCon">
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>From </TableCell>
                  <TableCell>To </TableCell>
                  <TableCell>Date </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statusChanges.map((item) => (
                  <TableRow>
                    <TableCell>{item.from}</TableCell>
                    <TableCell>{item.to}</TableCell>
                    <TableCell>{item.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Box>
    </Container>
  ) : null;
}
export default RequestDetails;
