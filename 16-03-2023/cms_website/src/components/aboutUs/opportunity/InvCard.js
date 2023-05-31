/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import clsx from "clsx";
import { push } from "connected-react-router";
import HtmlParser from "html-react-parser";
import moment from "moment";
import React, { useState } from "react";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import actions from "../../../redux/actions";
import store from "../../../redux/store";
import { getImage } from "../../shared/utils";
import useStyles from "./style";
import "moment/locale/ar-sa";
import "moment/locale/en-au";

const { getPostViewers } = actions;
export default function InvCard({ item }) {
  const classes = useStyles();
  const [itemFile, setitemFile] = useState(null);

  const dispatch = useDispatch();

  function handleClick(id) {
    dispatch(getPostViewers({ id }));
  }
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const image = getImage(item?.files, isRTL);
  moment.locale(isRTL ? "ar-sa" : "en-au");

  return (
    <Card key={uid(item)} className={clsx(classes.root, classes.card)}>
      <Box className={classes.imgContainer}>
        <CardMedia
          className="media"
          image={`/api/file/download/${image?.uuid}?size=small`}
          title={image?.alt}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <>
          <CardHeader
            className={classes.CardHeader}
            title={` ${moment(item.startDate)
              .format("DD MMM YYYY")
              .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))} `}
            subheader={HtmlParser(`${item?.title?.en || item?.title || ""}`)}
          />

          <span className={classes.counters}>
            <span className={classes.readCount}>
              {item?.viewCount}

              <BsEyeFill />
            </span>
          </span>
        </>
      </Box>
      <CardActions className={classes.CardActions}>
        <Button
          className="button second"
          onClick={() => {
            handleClick(item.id);
            store.dispatch(
              push(`/aboutus/InvestmentOpportunity/${item.alias}`)
            );
          }}
        >
          {isRTL ? "المزيد" : "More"}
        </Button>
      </CardActions>
    </Card>
  );
}
