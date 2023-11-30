import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { usePlacesWidget } from "react-google-autocomplete";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";
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
  const { car_brand } = useSelector((_) => _.details);
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
          location: place?.name,
        })
      );
    },
  });

  return (
    <div
      className={`border-bgrey border-[1px] px-4 py-2 w-[300px] m-[5px] flex relative items-center gap-[2rem]  text-[#fff] rounded-md`}
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
          ) : inputType == 3 ? (
            <select
              className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
              onChange={(e) => {
                dispatch(setState(e.currentTarget.value));
                console.log("e.currentTarget.value", e.currentTarget.value);
              }}
            >
              {opt?.map((elem, inx) => {
                return (
                  <option value={elem.brand} key={inx}>
                    {elem.brand}
                  </option>
                );
              })}
            </select>
          ) : inputType == 4 ? (
            <>
              {car_brand.length > 0 && car_brand !== "none" ? (
                <select
                  className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
                  onChange={(e) => {
                    dispatch(setState(e.currentTarget.value));
                    console.log("e.currentTarget.value", e.currentTarget.value);
                  }}
                >
                  {opt
                    ?.filter((item) => {
                      return item.brand == car_brand;
                    })
                    .flat(1)[0]
                    .models.map((elem, inx) => {
                      return (
                        <option value={elem} key={inx}>
                          {elem}
                        </option>
                      );
                    })}
                </select>
              ) : (
                <div
                  className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
                  onClick={() => toast.error("Please select a car brand")}
                >
                  Select a car brand
                </div>
              )}
            </>
          ) : inputType == 5 ? (
            <>
              <select
                className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
                onChange={(e) => {
                  dispatch(setState(e.currentTarget.value));
                  console.log("e.currentTarget.value", e.currentTarget.value);
                }}
              >
                {["Self Drive", "Chauffeur Driven", "Both"].map(
                  (item, index) => {
                    return (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    );
                  }
                )}
              </select>
            </>
          ) : (
            <select
              className="select px-3 py-2 border-[1px] bg-[transparent] outline-none border-bgrey items-stretch  rounded-md w-full"
              onChange={(e) => {
                dispatch(setState(e.currentTarget.value));
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
