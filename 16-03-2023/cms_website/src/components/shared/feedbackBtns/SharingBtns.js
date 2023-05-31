import React, { memo } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Button from "@material-ui/core/Button";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { MdContentCopy } from "react-icons/md";

function SharingBtns({ open, anchorRef, handleClose, handleListKeyDown }) {
  const url = window.location.href;

  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={handleClose}>
                  <FacebookShareButton url={url}>
                    <Button className="socialBtn">
                      <FacebookIcon round={true} size={32} />
                    </Button>
                  </FacebookShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <TwitterShareButton url={url}>
                    <Button className="socialBtn">
                      <TwitterIcon round={true} />
                    </Button>
                  </TwitterShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <LinkedinShareButton url={url}>
                    <Button className="socialBtn">
                      <LinkedinIcon round={true} />
                    </Button>
                  </LinkedinShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <EmailShareButton url={url}>
                    <Button className="socialBtn">
                      <EmailIcon round={true} />
                    </Button>
                  </EmailShareButton>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <CopyToClipboard text={url}>
                    <Button className="socialBtn">
                      <MdContentCopy />
                    </Button>
                  </CopyToClipboard>
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default memo(SharingBtns);
