import React from "react";
import DetailTab from "../shared/InfoTab";
import { useSelector } from "react-redux";
import {
  set_car_brand,
  set_milage,
  set_car_model,
  set_body_style,
  set_engine_size,
  set_engine_type,
  set_registration_year,
  set_transmisson,
  set_number_of_seats,
} from "../../../../store/dashboard_state_slice";
const BasicInfo = () => {
  const {
    car_brand,
    milage,
    car_model,
    transmission,
    engine_type,
    body_style,
    engine_size,
    registration_year,
    number_of_seats,
  } = useSelector((_) => _.details);
  
  function allFilled() {
    if (
      !car_brand ||
      !milage ||
      !car_model ||
      !transmission ||
      !engine_size ||
      !engine_type ||
      !registration_year ||
      !number_of_seats ||
      !body_style
    ) {
      return false
    }

    return true
  }
  const detailsInfo = [
    {
      icon: "ic:baseline-directions-car",
      title: "Car brand",
      value: car_brand,
      func: set_car_brand,
    },
    {
      icon: "ic:baseline-directions-car",
      title: "Car model",
      value: car_model,
      func: set_car_model,
    },
    {
      icon: "mdi:engine-outline",
      title: "Engine size",
      value: engine_size,
      func: set_engine_size,
    },
    {
      icon: "simple-line-icons:calender",
      title: "Year",
      value: registration_year,
      func: set_registration_year,
    },
    {
      icon: "ic:baseline-directions-car",
      title: "Type of car",
      value: body_style,
      func: set_body_style,
    },
    {
      icon: "material-symbols:format-list-numbered",
      title: "Number of seats",
      value: number_of_seats,
      func: set_number_of_seats,
    },
    {
      icon: "ph:road-horizon-thin",
      title: "Milage",
      value: milage,
      func: set_milage,
    },
    {
      icon: "mdi:petrol-pump",
      title: "Engine type",
      value: engine_type,
      func: set_engine_type,
    },
    {
      icon: "solar:transmission-linear",
      title: "Transmission",
      value: transmission,
      func: set_transmisson,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {detailsInfo.map(({ icon, title, value, func }, inx) => {
        return (
          <DetailTab
            icon={icon}
            title={title}
            value={value}
            key={inx}
            setState={func}
          />
        );
      })}
    </div>
  );
};

export default BasicInfo;
