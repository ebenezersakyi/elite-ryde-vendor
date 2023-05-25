import React from "react";
import DetailTab from "../shared/InfoTab";
import {
  set_plate_number,
  set_location,
  set_vehicle_identification_number,
} from "../../../../store/dashboard_state_slice";
import GoogleMapReact from 'google-map-react';

import { useSelector } from "react-redux";
const AnyReactComponent = ({ text }) => <div className="h-12 w-12 bg-egreen">{text}</div>;
const Additional_Info = () => {
  const { location, plate_number, vehicle_identification_number } = useSelector(
    (_) => _.details
  );

  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const defaultProps = {
    center: {
      lat:5.6037168,
      lng:-0.1869644
    },
    zoom: 11
  };
const center ={
  lat:5.6037168,
  lng:-0.1869644
}
  const position = {
    lat: location?.lat,
    lng: location?.long
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DetailTab
          icon={"material-symbols:location-on-outline"}
          title={"Location"}
          value={location}
          setState={set_location}
          loc={true}
        />
        <DetailTab
          icon={"material-symbols:directions-car"}
          title={"License plate number"}
          value={plate_number}
          setState={set_plate_number}
        />
        <DetailTab
          icon={"material-symbols:directions-car"}
          title={"Vehicle identification number"}
          value={vehicle_identification_number}
          setState={set_vehicle_identification_number}
        />
      </div>

      <div>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAKT8LXpv2aVfHyHKo8N9LzQmzCSktAYQQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          {...center}
          text="My Marker"
        />
      </GoogleMapReact> */}
      </div>
    </div>
  );
};

export default Additional_Info;
