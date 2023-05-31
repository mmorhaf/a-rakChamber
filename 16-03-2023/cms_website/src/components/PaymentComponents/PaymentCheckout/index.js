import React, { useState, memo,useEffect } from "react";
import axios  from "axios";
export default function Payment(props) {
  useEffect(() => {
    ;(async () => {
      var url=`${window.location.protocol }//${window.location.hostname}:${window.location.port==80?"":window.location.port}`
      var requestData = {
        url:url,
        amount:120,
        currency:"AED"
      }
      await axios
      .post(
        `/api/payment/get-session`,requestData)
      .then((response) => { 
          window.open(`${response.data.server_url}/payment/checkout`)
      });
    })()
}, []);

return(<></>)
}