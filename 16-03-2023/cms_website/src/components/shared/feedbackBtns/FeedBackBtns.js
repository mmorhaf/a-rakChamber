import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import BlockOutlinedIcon from "@material-ui/icons/BlockOutlined";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import * as htmlToImage from "html-to-image";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import actions from "../../../redux/actions";
import Dialog from "../dialog/Dialog";
import ReportForm from "./ReportForm";
import SharingBtns from "./SharingBtns";
const { addReportReturned, addIsusefulReturned } = actions;
function FeedBackBtns({ componentRef, anchorRef }) {
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [openSharing, setOpenSharing] = React.useState(false);
  const [openReport, setOpenReport] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [dots, setDots] = useState(false);
  const {
    rate,
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const { loadingActionReturned } = useSelector((state) => state.loading);

  useEffect(() => {
    if (!rate.sendReportReturned) setOpen(false);
    if (!rate.sendIsUsefullReturned) setOpen(false);
  }, [rate.sendReportReturned, rate?.sendIsUsefullReturned]);

  useEffect(() => {
    dispatch(addReportReturned({ data: false }));
    dispatch(addIsusefulReturned({ data: false }));
  }, []);

  useEffect(() => {
    const result = rate.sendReportReturned;

    if (!result) return;
    if (result) {
      if (result?.data?.success) {
        setMessage(
          isRTL ? "شكرا لإرسالك ملاحظاتك " : "Thanks for your feedback"
        );
        setOpen(true);
      } else {
        setMessage(
          isRTL
            ? "عذرا حدث خطأ ما , يرجى المحاولة لاحقا "
            : "Something went wrong , please try again"
        );
        setOpen(true);
      }
    }
  }, [rate.sendReportReturned]);

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleReportClose = () => {
    setOpenReport(false);
  };

  const handleToggle = () => {
    setOpenSharing((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenSharing(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSharing(false);
    }
  }
  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
    >
      <Button onClick={handleOpenReport}>
        <BlockOutlinedIcon />
      </Button>
      <ReportForm open={openReport} handleClose={handleReportClose} />
      <Button
        ref={anchorRef}
        aria-controls={openSharing ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <ShareOutlinedIcon />
      </Button>
      <SharingBtns
        open={openSharing}
        anchorRef={anchorRef}
        handleClose={handleClose}
        handleListKeyDown={handleListKeyDown}
      />
      <ReactToPrint
        onBeforeGetContent={(e) =>
          htmlToImage
            .toPng(document.getElementById("full-page"))
            .then(function (dataUrl) {
              setData(dataUrl);
            })
        }
        onAfterPrint={() => {
          setOpen(false);
          setMessage("");
          setDots(false);
        }}
        trigger={() => (
          <Button className="printBtn">
            <PrintOutlinedIcon
              onClick={(e) => {
                setOpen(true);
                setDots(true);
                setMessage(
                  isRTL
                    ? " يتم تجهيز الصفحة , يرجى الانتظار"
                    : "Page is prepared , please wait "
                );
              }}
            />
          </Button>
        )}
        content={() => document.getElementById("img")}
      />
      {/* <Button
        className="printBtn"
        onClick={() => {
          console.log("11111");
          window.print();
          console.log("22222");
        }}
      >
        <PrintOutlinedIcon />
      </Button> */}
      <img src={data} id="img" className="image-to-print" />
      <Dialog open={open} message={message} dots={dots} />
    </ButtonGroup>
  );
}

export default FeedBackBtns;
