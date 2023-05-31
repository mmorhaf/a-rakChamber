import { Grid, InputLabel, Button } from "@material-ui/core";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import actions from "../../../../redux/actions";
import useStyles from "../../../../styles/components/services/servicesTabPane";
import ServicesResultModal from "../../../services/rakChamber/ServicesResultModal";
import { IoLogIn } from "react-icons/io5";

const { getFileList, fileStamp, finishFileStamp } = actions;
export default function ReStamping() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [files, setFiles] = useState(false);
  const [allFiles, setAllFiles] = useState(false);
  const [trxDetails, setTrxDetails] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [routing, setRoting] = useState(null);
  const [noThanks, setNoThanks] = useState(false);
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    if (
      APIServices.getFileListDone &&
      APIServices?.getFileListDone?.items?.length
    )
      setFiles(APIServices?.getFileListDone?.items);
    else if (
      APIServices.getFileListDone &&
      APIServices?.getFileListDone?.items?.length === 0
    ) {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? "عذرا, لا يوجد ملفات مرفقة ليتم ختمها"
          : "Sorry, there isn't any Files to be Stamped."
      );
      setNoThanks(true);
    }
    if (!APIServices.fileStampDone) {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? ".لم يتم ختم الملفات بنجاح, يرجى إعادة المحاولة لاحقا"
          : "Files didnot Stamp Successfully, Please try again later."
      );
      setNoThanks(true);
    }
  }, [APIServices.getFileListDone]);

  useEffect(() => {
    if (files && files?.length) {
      let array = [];
      files?.map((item) => {
        if (item?.coo_to_stamp?.length)
          array = array?.concat(item?.coo_to_stamp);
        if (item?.request_to_stamp?.length)
          array = array?.concat(item?.request_to_stamp);

        if (item?.ratification_to_stamp?.length)
          array = array?.concat(item?.ratification_to_stamp);
      });
      setAllFiles(array);
    }
  }, [files]);

  useEffect(() => {
    if (allFiles && allFiles?.length)
      dispatch(
        fileStamp({ data: allFiles, code: trxDetails.code, fileType: "stamp" })
      );
  }, [allFiles]);

  useEffect(() => {
    if (APIServices.fileStampDone && APIServices.fileStampDone?.length) {
      dispatch(finishFileStamp({ data: APIServices.fileStampDone }));
    } else if (!APIServices.fileStampDone) {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? ".لم يتم ختم الملفات بنجاح, يرجى إعادة المحاولة لاحقا"
          : "Files didnot Stamp Successfully, Please try again later."
      );
      setNoThanks(true);
    }
  }, [APIServices.fileStampDone]);

  useEffect(() => {
    if (
      APIServices?.finishFileStampDone &&
      APIServices?.finishFileStampDone?.items
    ) {
      setOpenPopup(true);
      setMessage(
        isRTL ? "تم ختم الملفات بنجاح" : "Files Stamped Successfully "
      );
      setNoThanks(true);
    } else if (!APIServices?.finishFileStampDone) {
      setOpenPopup(true);
      setMessage(
        isRTL
          ? ".لم يتم ختم الملفات بنجاح, يرجى إعادة المحاولة لاحقا"
          : "Files didnot Stamp Successfully, Please try again later."
      );
      setNoThanks(true);
    }
  }, [APIServices?.finishFileStampDone]);

  const initialValues = {
    receipt: "",
  };
  let validationSchema = Yup.object({
    receipt: Yup.string().required(isRTL ? "مطلوب" : "Required"),
  });

  const doSubmit = async (values) => {
    setTrxDetails({ code: values?.receipt });
    dispatch(
      getFileList({
        data: {
          code: values?.receipt,
        },
      })
    );
  };

  return (
    <Grid container className={classes.formRoot}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={doSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form className={classes.fullForm} variant="outlined">
            <Grid container spacing={1}>
              <Grid item md={6} xs={12} className={classes.inpuContainer}>
                <InputLabel
                  htmlFor="receipt"
                  className={classes.label}
                  required
                >
                  {isRTL ? "سند القبض" : "Receipt"}
                </InputLabel>

                <Field
                  component={TextField}
                  className={classes.textField}
                  id="receipt"
                  name="receipt"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              onClick={(e) => {
                formik.submitForm();
              }}
              color="primary"
              className={classes.send}
              endIcon={<IoLogIn />}
            >
              {t("HOME.SERVICES.SEND")}
            </Button>
          </Form>
        )}
      </Formik>
      <ServicesResultModal
        open={openPopup}
        setOpen={setOpenPopup}
        message={message}
        noThanks={noThanks}
      />
    </Grid>
  );
}
