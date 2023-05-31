import React, { memo } from "react";

function FaceBook({ num }) {
  return (
    <div>
      <iframe
        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FRakChamber.ae%2F&tabs=timeline&width=370&height=540&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId"
        width={`${num}px`}
        height="540"
        style={{ border: "none", overflow: "hidden" }}
        scrolling="no"
        frameborder="0"
        allowfullscreen="true"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="facebook"
      ></iframe>
    </div>
  );
}

export default memo(FaceBook);
