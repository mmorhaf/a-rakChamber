import React, { memo } from "react";
import { useSelector } from "react-redux";
import CommentForm from "../../../eParticipation/opinion/CommentForm";
import useStyles from "../../../../styles/components/openData/commentPopUp";
import { Typography, Dialog, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function CommentPopUp({ open, handleClose, id, fileId, title }) {
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);

  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <Typography variant="h1" className="dialogTitl">
        {isRTL ? "أضف تعليق" : "comment"}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={(e) => handleClose()}
        >
          <CloseIcon />
        </IconButton>
      </Typography>
      <CommentForm
        id={id}
        fileId={fileId}
        popUp={true}
        handleClose={handleClose}
        title={title}
      />
    </Dialog>
  );
}

export default memo(CommentPopUp);
