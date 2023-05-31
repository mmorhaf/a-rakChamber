import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import React from "react";
import useStyles from "../../styles/components/contactForm/contactForm";
import { useSelector } from "react-redux";

export default function ContactCard({ links, cards }) {
  const classes = useStyles();
  const {
    theme_reducer: {
      basicTheme: { isRTL },
    },
  } = useSelector((state) => state);
  const isExternal = links.value ? links.value.startsWith("http") : false;

  const renderContent = () => (
    <CardActionArea>
      <CardMedia className={classes.media} image={cards} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.position}
        >
          {isRTL ? links?.title?.ar : links?.title?.en}
        </Typography>
      </CardContent>
    </CardActionArea>
  );

  return (
    <Card className={classes.social}>
      {isExternal ? (
        <a href={links.value} target="_blank" rel="noreferrer">
          {renderContent()}
        </a>
      ) : (
        <span
          onClick={() =>
            links?.type === "phone"
              ? window.open(`tel:${links.value}`)
              : links?.type === "email"
              ? window.open(`mailto:${links.value}`)
              : "#"
          }
        >
          {renderContent()}
        </span>
      )}
    </Card>
  );
}
