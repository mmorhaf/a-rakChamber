import React, { useState, useEffect } from "react";
import useStyles from "../../../styles/components/home/contactUs/tabs";
import axios from "axios";

const InstagramFeed = () => {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState([]);
  const classes = useStyles();

  useEffect(async () => {
    await axios.get("/api/instagram/feeds").then((response) => {
      if (response?.data?.feeds?.length > 0) {
        setFeed(response?.data?.feeds);
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <div className={classes.loading}>Loading...</div>;
  } else {
    return (
      <div style={{ width: "100%" }}>
        {feed.map((item) => (
          <div key={item.id} className={classes.instaBox}>
            {item?.media_type === "IMAGE" ? (
              <img src={item.media_url} alt={item.caption} />
            ) : item?.media_type === "VIDEO" ? (
              <video
                width="320"
                height="240"
                controls
                controlsList="nodownload"
                className={classes.video}
              >
                <source src={item.media_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null}
            {item.caption && (
              <p
                style={{
                  textAlign: "right",
                }}
              >
                {item.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }
};

export default InstagramFeed;
