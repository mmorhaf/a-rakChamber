import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import Button from "@material-ui/core/Button";
import { getImage } from "../utils";
import { useTranslation } from "react-i18next";
import useStyles from "../../../styles/components/shared/cards/publicationCard";

function PublicationCard({ item, isRTL }) {
  const { t } = useTranslation();

  const image = getImage(item.files, isRTL);

  const classes = useStyles();

  return (
    <Col className={classes.root}>
      <Card>
        <Col
          className="cardImage"
          title={image.alt}
          style={{
            backgroundImage: `url(/api/file/download/${image.uuid}?size=medium)`,
          }}
        ></Col>
        <CardBody>
          <Link to={`/media/publications/publications/${item.alias}`}>
            <h2>{item.title}</h2>
          </Link>
          <p
            className="description"
            dangerouslySetInnerHTML={{
              __html: `${item?.description || ""}`,
            }}
          ></p>
          <Col className="btnContainer">
            <Link to={`/media/publications/publications/${item.alias}`}>
              <Button>{t("HOME.CAROUSEL.INITIATIVE.MOREBUTTON")}</Button>
            </Link>
          </Col>
        </CardBody>
      </Card>
    </Col>
  );
}

export default memo(PublicationCard);
