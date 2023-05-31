import React, { useState, useEffect, memo } from "react";
import { Box } from "@material-ui/core";

const Spinner = memo(({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [counter, setCounter] = useState(100);
  useEffect(() => {
    (async () => {
      setDisplayValue(value);
    })();
  }, [value]);

  useEffect(() => {
    (async () => {
      if (counter < 95 && value === 1)
        setTimeout(() => setCounter(counter + 1), 200 + counter * 2);

      if (counter < 100 && value === 2)
        setTimeout(() => setCounter(counter + 5 > 100 ? 100 : counter + 5), 1);

      if (counter === 100) {
        setCounter(0);
        setDisplayValue(0);
      }
    })();
  }, [counter, value]);

  let theme = localStorage.getItem("theme");
  if (theme) theme = JSON.parse(theme);

  return (
    displayValue !== 0 && (
      <Box
        style={{
          position: "fixed",
          display: "flex",
          top: 0,
          bottom: 0,
          zIndex: 1500,
          backdropFilter: "blur(5px)",
          right: 0,
          backgroundColor: "#ffffff1a",
          left: 0,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <video width="200" height="200" autoplay="autoplay" loop="true" muted>
            <source src="/assets/images/spinner.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
          <h2
            style={{
              color: "#194F90",
              fontSize: 21,
            }}
          >
            {counter + "%"}
          </h2>
        </Box>
      </Box>
    )
  );
});
export default Spinner;
