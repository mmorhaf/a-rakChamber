import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardMedia, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "../../../styles/components/shared/mainImage/mainImage";

export default function MediaCard({ uuid, item, title, link }) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        image={
          uuid
            ? uuid?.includes("/assets")
              ? uuid
              : `/api/file/download/${uuid}?size=medium`
            : "/assets/images/default.jpg"
        }
      />
      <Container maxWidth="lg">
        <Link to={link}>
          <Button>{title}</Button>
        </Link>
      </Container>
    </Card>
  );
}

MediaCard.propTypes = {
  link: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
};
