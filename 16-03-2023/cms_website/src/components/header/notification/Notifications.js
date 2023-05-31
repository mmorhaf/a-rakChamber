import React, { useState, memo } from "react";
import NotificationSlider from "./NotificationSlider";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

function Notifications() {
  const { t } = useTranslation();

  const [show, setShow] = useState(true);
  const { notifications: { posts = [] } = {} } = useSelector(
    (state) => state.posts_reducers.allPostsReturned
  );
  const handleClick = () => {
    setShow(!show);
  };

  return posts && posts?.length > 0 && show ? (
    <Slide direction="down" in={show} mountOnEnter unmountOnExit>
      <Box className="notifiContainer">
        <Box className="title">
          <Box component="span">{t("HEADER.NOTIFICATION")}</Box>
        </Box>
        <Box className="content">
          <NotificationSlider />
          <IconButton className="close" onClick={handleClick}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Slide>
  ) : (
    <Box className="notifiContainer" />
  );
}

export default memo(Notifications);
