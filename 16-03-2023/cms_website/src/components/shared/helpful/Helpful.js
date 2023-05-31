import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";
import Dialog from "../../shared/dialog/Dialog";
import DialogForm from "./DialogForm";

const { addIsuseful, addIsusefulReturned, addReportReturned } = actions;

function Helpful() {
  const { t } = useTranslation();
  const {
    sendIsUsefullReturned,
    askingForRatingReturned: { askForIsUseFull },
  } = useSelector((state) => state.rate);
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [message, setMessage] = useState("");

  useLayoutEffect(() => {
    if (askForIsUseFull) {
      setDisabled(false);
      return;
    }

    setDisabled(true);
  }, [askForIsUseFull]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleYesClick = () => {
    const data = {};
    data["url"] = `${window.location.href}`;
    data["isUsefull"] = Boolean(true);
    data["reason"] = "reason";

    dispatch(addIsuseful({ data }));
  };

  useEffect(() => {
    if (!sendIsUsefullReturned) setOpen1(false);
  }, [sendIsUsefullReturned]);

  useEffect(() => {
    dispatch(addIsusefulReturned({ data: false }));
  }, []);

  useEffect(() => {
    const result = sendIsUsefullReturned;
    if (!result) return;

    if (result?.data?.success) {
      setDisabled(true);
      setOpen1(true);
      setMessage(isRTL ? "شكرا لإرسالك ملاحظاتك " : "Thanks for your feedback");
    } else {
      setOpen1(true);
      setMessage(
        isRTL
          ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
          : "Something went wrong , please try again"
      );
    }
  }, [sendIsUsefullReturned]);

  return (
    <Box className="helpfulContainer">
      <Typography variant="h3">{t("HELPFUL.GEUS")}</Typography>
      <Box className="btnContainer">
        <Button variant="outlined" onClick={handleYesClick} disabled={disabled}>
          {t("HELPFUL.YES")}
        </Button>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          {t("HELPFUL.NO")}
        </Button>
      </Box>
      {open && <DialogForm open={open} handleClose={handleClose} />}
      <Dialog open={open1} message={message} />
    </Box>
  );
}

export default memo(Helpful);
