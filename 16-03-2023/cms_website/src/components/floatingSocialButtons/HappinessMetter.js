import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Slider,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../redux/actions";
import useStyles from "../../styles/components/floatingSocialButtons/happinessMetter";
import debounce from "lodash.debounce";
import { push } from "connected-react-router";
import { store } from "../../redux/store";
import { MdOutlineCancel } from "react-icons/md";

const { sendCustomerRate } = actions;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  setOpen,
  rateValues,
  isPayment,
  closeBtn,
}) {
  const { t } = useTranslation();

  const [step, setStep] = useState(90);
  const [startRating, setStartRating] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const dispatch = useDispatch();
  const {
    APIServices,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const handleClose = () => {
    setStep(50);
    setOpen(false);
    setStartRating(false);
    setShowNotes(false);
    setNotes("");
    isPayment && store.dispatch(push("/services-form/issued-requests-list"));
  };

  const handleShowNotes = (e) => {
    setStartRating(true);
    setStep(step);
    setShowNotes(true);
  };
  const changeStepValue = () => {
    setShowNotes(true);
  };
  const handleChange = (e, value) => {
    setStep(value);

    if (startRating) return;
    setStartRating(true);
  };
  const debouncedChangeHandler = useCallback(
    debounce(changeStepValue, 2000),
    []
  );

  const sendRate = () => {
    setStep(50);
    setOpen(false);
    setStartRating(false);
    setShowNotes(false);
    setNotes("");
    if (rateValues) {
      rateValues["rate"] = step;
      rateValues["cust_remarks"] = notes;
      dispatch(sendCustomerRate({ data: { ...rateValues } }));
    } else {
      const values = {
        req_code: null,
        ref_code: null,
        income_code: null,
        rate: step,
        service_step: 0,
        cust_remarks: notes,
        inserted_by: "",
        company_code: 0,
        person_code: 0,
        service_code: 101,
      };
      dispatch(sendCustomerRate({ data: { ...values } }));
    }
  };

  useEffect(() => {
    if (isPayment && APIServices.sendCustomerRateData.networkSuccess) {
      store.dispatch(push("/services-form/issued-requests-list"));
    }
  }, [APIServices.sendCustomerRateData]);

  const classes = useStyles();
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      className={open ? classes.root : null}
      PaperProps={{
        style: {
          backgroundPosition: `0px ${step}%`,
          backgroundImage:
            "linear-gradient(to bottom,#e5b85999 0,#f9c94699 20%,#aac26899 40%,#82bf7a99 62%,#70c08199 81%,#21c09d99 100%)",
        },
      }}
    >
      {isPayment || closeBtn ? (
        <MdOutlineCancel
          onClick={(e) => handleClose()}
          className={classes.cancelBtn}
        />
      ) : null}
      {!showNotes ? (
        <Box
          className={clsx(
            "contentContainer",
            startRating && "afterStartRating"
          )}
        >
          <DialogTitle>
            {rateValues
              ? isRTL
                ? "بشكل عام، ما مدى سعادتك عن تجربتك في الحصول على الخدمة؟"
                : "In general, how happy were you with the overall experience with this service delivery? "
              : isRTL
              ? "ما مدى سعادتك عن تجربتك في استخدام موقعنا ؟"
              : "Kindly rate your experience using our website"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {isRTL
                ? "اضغط واسحب المؤشر إلى الوجه الذي يمثل مستوى سعادتك"
                : " Hold and swipe to the face that best represents your level of happiness."}
            </DialogContentText>

            <Box className="slider">
              <Slider
                aria-label="Temperature"
                defaultValue={50}
                value={step}
                onChange={handleChange}
                onChangeCommitted={debouncedChangeHandler}
                valueLabelDisplay="on"
                step={1}
                marks
                min={0}
                max={100}
              />
              {isPayment || closeBtn ? (
                <Button
                  className={classes.closeBtn}
                  onClick={(e) => {
                    handleClose();
                  }}
                >
                  <span className={classes.exportText}>
                    {t("SERVICESPAGES.SUPPLIER.CLOSE")}
                  </span>
                </Button>
              ) : null}
            </Box>
          </DialogContent>
        </Box>
      ) : (
        <Box
          className={clsx(
            "contentContainer",
            startRating && "afterStartRating"
          )}
        >
          <DialogTitle>
            {isRTL ? "شكرا لك على ملاحظاتك" : "Thank you for your feedback"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {isRTL
                ? "لا تتردد في إضافة ملاحظاتك"
                : "Feel free to add your notes"}
            </DialogContentText>

            <textarea
              rows={3}
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
            ></textarea>
            <Button onClick={sendRate} className="sendBtn" variant="outlined">
              {t("CONTACTUS.BTN")}
            </Button>
            {/* <Button
              onClick={handleClose}
              className="sendBtn"
              variant="outlined"
            >
              {t("HEADER.LOGIN.BTN.CANCEL")}
            </Button> */}
          </DialogContent>
        </Box>
      )}

      <Box className={clsx("iconContainer", startRating && "afterStartRating")}>
        <Box
          className="icon"
          style={{
            backgroundPositionY: `${
              step * -150 + (step % 2 !== 0 ? 150 : 0)
            }px`,
          }}
        ></Box>
        <Box className="percentage">{`${step}%`}</Box>
      </Box>
    </Dialog>
  );
}
