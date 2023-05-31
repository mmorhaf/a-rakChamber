import React, { useState, memo,useEffect } from "react";
import Complete from "../CompletedPayment";
import Cancel from "../PaymentCancelled";
import Error from "../PaymentError"
export default function Payment(props) {
 const params = new URL(window.location.href).searchParams;
  switch(params.get('status')){
    case "cancel":return <Cancel/>  
    case "error":return <Error/> 
    case "complete":return <Complete/>
}

}