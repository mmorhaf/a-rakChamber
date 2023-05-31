import { List, ListItem, ListItemText } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import * as React from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./listStyle";

export default function NotificationList(props) {
  const classes = useStyles();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  return (
    <Box className={classes.listBox}>
      <List className={classes.list}>
        {props?.items.map((item) => (
          <li key={`section-${item?.id}`}>
            <ul>
              <ListItem
                key={`item-${item?.id}-${item?.message}`}
                style={{
                  backgroundColor: item?.seenByUSer
                    ? "#FFF"
                    : "rgb(201 225 241)",
                }}
              >
                <ListItemText
                  primary={isRTL ? item?.message?.ar : item?.message?.en}
                  className={classes.message}
                />
                <Box className={classes.date}>{item?.createdAt}</Box>
              </ListItem>
            </ul>
          </li>
        ))}
      </List>
    </Box>
  );
}
