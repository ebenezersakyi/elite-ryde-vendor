import React from "react";
import DetailTab from "../shared/InfoTab";
import {
  set_plate_number,
  set_location,
  set_vehicle_identification_number,
} from "../../../../store/dashboard_state_slice";
import { useSelector } from "react-redux";
const Additional_Info = () => {
  const { location, plate_number, vehicle_identification_number } = useSelector(
    (_) => _.details
  );
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <DetailTab
          icon={"material-symbols:location-on-outline"}
          title={"Location"}
          value={location}
          setState={set_location}
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

      <div>map</div>
    </div>
  );
};

export default Additional_Info;
