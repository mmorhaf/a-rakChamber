import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uid } from "react-uid";
import { Card, CardBody, Col } from "reactstrap";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { getImage } from "../../shared/utils";
import useCardStyles from "../../../styles/components/aboutUs/initiativesCards";

function InitiativeCard({ item }) {
  const { t } = useTranslation();
  const {
    basicTheme: { isRTL },
  } = useSelector((state) => state.theme_reducer);
  const cardStyles = useCardStyles();

  const image = getImage(item.files, isRTL);

  return (
    <Col key={uid(item)} className={cardStyles.cardContainer}>
      <Card className={cardStyles.card}>
        <Col
          className="cardImage"
          title={image.alt}
          style={{
            backgroundImage: `url(/api/file/download/${image.uuid}?size=small)`,
          }}
        ></Col>
        <CardBody>
          <Link to={`/aboutus/initiatives/${item.alias}`} className="link">
            <h2>{item.title}</h2>
          </Link>

          <Col className="btnContainer">
            <Link to={`/aboutus/initiatives/${item.alias}`}>
              <Button>{t("HOME.CAROUSEL.INITIATIVE.MOREBUTTON")}</Button>
            </Link>
          </Col>
        </CardBody>
      </Card>
    </Col>
  );
}

export default InitiativeCard;
