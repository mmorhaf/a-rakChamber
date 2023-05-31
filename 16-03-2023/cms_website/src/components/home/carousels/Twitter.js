import React, { memo } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Twitter({ num }) {
  return (
    <div>
      <TwitterTimelineEmbed
        sourceType="profile"
        noScrollbar
        screenName="RAKCCI"
        options={{ height: 480, width: "100%", id: "profile:TwitterDev" }}
      />
    </div>
  );
}

export default memo(Twitter);
