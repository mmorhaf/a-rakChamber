import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../redux/actions";

const { getAll } = actions;

function Map(props) {
  let { lat, lng } = props;
  const center = {
    lat: lat ? Number(lat) : 25.8007,
    lng: lng ? Number(lng) : 55.9762,
  };
  let latitude = lat ? Number(lat) : 25.8007;
  let longitude = lng ? Number(lng) : 55.9762;
  const dispatch = useDispatch();
  const reducers = useSelector((state) => state);
  const [key, setKey] = useState("");
  useEffect(() => {
    let sort = "configuration";
    dispatch(getAll({ sort }));
  }, []);
  useEffect(async () => {
    if (
      reducers?.crudReducers?.allReturned?.configurations &&
      reducers.crudReducers?.allReturned.configurations?.filter(
        (item) => item?.key === "MAP_KEY"
      )[0]?.value
    ) {
      await setKey(
        reducers.crudReducers?.allReturned.configurations?.filter(
          (item) => item?.key === "MAP_KEY"
        )[0]?.value
      );
    }
  }, [reducers]);
  return (
    <LoadScript googleMapsApiKey={key}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={7}
      >
        <Marker
          position={center}
          clickable={true}
          onClick={(e) =>
            (window.location.href = `http://maps.google.com/?q=${latitude},${longitude}`)
          }
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default memo(Map);
