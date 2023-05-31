import React from "react";
import { useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

export default function PositionedSnackbar(props) {
  const [open, setOpen] = React.useState(false);
  const { basicTheme } = useSelector((state) => state);
  const handleClose = () => {
    setOpen(false);
  };
  const slideTransition = (props) => {
    return <Slide {...props} direction="left" />;
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: basicTheme ? "left" : "right",
        }}
        open={props.open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={props.message}
        className={props.className}
      />
    </div>
  );
}
