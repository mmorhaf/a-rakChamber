import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import { RxDotFilled, RxDot } from "react-icons/rx";
import React, { Fragment, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";

function SingleList({ item, handleCloseSiteMap }) {
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);

  const [isOpen, setIsOpen] = useState(true);
  const [disapled, setDisabled] = useState(false);

  useEffect(() => {
    const setOpen = () => {
      if (window.innerWidth < 600) {
        setDisabled(false);
        setIsOpen(false);
      } else {
        setDisabled(true);
        setIsOpen(true);
      }
    };
    setOpen();
    window.addEventListener("resize", () => setOpen());
  }, []);

  const handleClick = () => {
    if (!disapled) {
      setIsOpen(!isOpen);
    }
  };

  const CustomTag = item.childrens.length ? Fragment : Link;

  return (
    <List
      component="ul"
      aria-label={`site map for ${item.title} pages`}
      subheader={
        <CustomTag to={item.childrens.length ? null : item.link}>
          <ListSubheader
            className="title"
            component="p"
            id="nested-list-subheader"
          >
            {isRTL ? item.title.ar : item.title.en}
            {/* {!disapled ? (
              !isOpen ? (
                <KeyboardArrowDownIcon />
              ) : (
                <ExpandLessIcon />
              )
            ) : null} */}
          </ListSubheader>
        </CustomTag>
      }
      onClick={handleClick}
    >
      {item.childrens.map((page) => {
        return (
          <>
            {" "}
            <Link key={uid(page)} to={page.link} onClick={handleCloseSiteMap}>
              <ListItem key={uid(page)} button={false}>
                <ListItemIcon>
                  <RxDotFilled />
                </ListItemIcon>
                <ListItemText
                  class="bold"
                  primary={isRTL ? page.title.ar : page.title.en}
                />
              </ListItem>
            </Link>
            {page?.childrens && page?.childrens?.length > 0
              ? page?.childrens?.map((subItem) => (
                  <Link
                    key={uid(subItem)}
                    to={subItem.link}
                    onClick={handleCloseSiteMap}
                  >
                    <ListItem key={uid(page)} button={false}>
                      <ListItemIcon>
                        <RxDot />
                      </ListItemIcon>
                      <ListItemText
                        class="smaller"
                        primary={isRTL ? subItem.title.ar : subItem.title.en}
                      />
                    </ListItem>
                  </Link>
                ))
              : null}
          </>
        );
      })}
    </List>
  );
}

export default memo(SingleList);
