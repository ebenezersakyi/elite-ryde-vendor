import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { usePlacesWidget } from "react-google-autocomplete";
import Tooltip from "@mui/material/Tooltip";
const DetailTab = ({
  icon,
  title,
  value,
  setState,
  tooltip,
  type,
  inputType,
  opt,
}) => {
  const [error, isError] = useState(false);
  const dispatch = useDispatch();
  const options = {
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
    types: ["establishment"],
  };
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyAKT8LXpv2aVfHyHKo8N9LzQmzCSktAYQQ",
    options,
    onPlaceSelected: (place) => {
      dispatch(
        setState({
          lat: place?.geometry?.location?.lat(),
          long: place?.geometry?.location?.lng(),
          location: place?.name
        })
      );
    },
  });

  return (
    <div
      className={`border-bgrey border-[1px] px-4 py-2 flex relative w-full items-center gap-[2rem]  text-[#fff] rounded-md`}
    >
      <span className="bg-[#ffffff]  rounded-full grid place-items-center p-[1.2rem] ">
        <Icon icon={icon} className="text-egreen text-[1.8rem]" />
      </span>

      <span className=" font-[500] w-full ">
        <h4 className="font-[500] mb-2 text-[1.1rem]  ">{title}:</h4>
        <div>
          {inputType == 0 ? (
            <input
              onChange={(e) => {
                dispatch(setState(e.currentTarget.value));
              }}
              type={type || "text"}
              placeholder={"Type..."}
              value={value}
              className={` ${
                error ? "border-[red]" : "border-bgrey"
              } px-3 py-2 border-[1px] bg-[transparent] outline-none focus:border-[#fff] rounded-md w-full`}
            />
          ) : inputType == 1 ? (
            <input
              ref={ref}
              className={` ${
                error ? "border-[red]" : "border-bgrey"
              } px-3 py-2 border-[1px] bg-[transparent] outline-none focus:border-[#fff] rounded-md w-full`}
            />
          ) : (
            <select className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
              onChange={(e) => {
                dispatch(setState(e.currentTarget.value))
              }}
            >
              {opt?.map((elem, inx) => {
                return (
                  <option value={elem} key={inx}>
                    {elem}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </span>

      <Tooltip title={tooltip}>
        <Icon
          icon="ph:info-thin"
          className="absolute top-[0.75rem] right-[0.75rem] cursor-pointer"
        />
      </Tooltip>
    </div>
  );
};

export default DetailTab;
