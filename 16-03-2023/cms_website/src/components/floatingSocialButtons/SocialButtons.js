import React, { useCallback, useState, useEffect } from "react";
import HappinessMetter from "./HappinessMetter";
import { Button, ButtonGroup } from "@material-ui/core";
import useStyles from "../../styles/components/floatingSocialButtons/socialButtons";
import { useSelector } from "react-redux";

export default function FloatingSocial() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const { contactLinksReturned } = useSelector((state) => state.contactLinks);
  const [tel, setTel] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!contactLinksReturned.length > 0) return;
    else {
      setData(contactLinksReturned);
    }
  }, [contactLinksReturned]);

  useEffect(() => {
    data &&
      data?.map((item) => {
        if (item?.key === "PHONE") setTel(item?.value);
      });
  }, [data]);

  const handleClick = (link) => {
    window.location.href = link;
  };

  const classes = useStyles();
  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        className={classes.root}
      >
        <Button onClick={handleClickOpen}>
          <img
            src="/assets/images/floatingBtns/1.png"
            alt="happiness meter"
            loading="lazy"
          />
        </Button>
        <Button onClick={() => handleClick("/contactus/contactus")}>
          <img
            src="/assets/images/floatingBtns/2.png"
            alt="chat"
            loading="lazy"
          />
        </Button>
        <Button onClick={() => window.open(`tel:${tel}`)}>
          <img
            src="/assets/images/floatingBtns/3.png"
            alt="contact us"
            loading="lazy"
          />
        </Button>
      </ButtonGroup>
      <HappinessMetter open={open} setOpen={setOpen} />
    </>
  );
}
