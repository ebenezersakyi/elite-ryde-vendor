import React, { useState } from "react";
import Calendar from "react-calendar";
import { Icon } from "@iconify/react";
import {
  set_start_date,
  set_end_date,
  set_available,
  set_price,
  set_outside_accra,
  set_cross_country,
} from "../../../../store/dashboard_state_slice";
import { useSelector, useDispatch } from "react-redux";
import "react-calendar/dist/Calendar.css";
const CalendarComp = () => {
  const dispatch = useDispatch();
  const { available, start_date, end_date, price, outsideAccra, crossCountry } =
    useSelector((_) => _.details);
  const Available = [
    {
      day: "Weekday",
      value: true,
    },
    {
      day: "Weekend",
      value: false,
    },
    {
      day: "Both",
      value: false,
    },
  ];
  return (
    <div className="  grid grid-cols-1 gap-[2rem] px-8 py-0 items-center justify-center md:grid-cols-2 lg:grid-cols-3">
      <div className=" col-span-2 text-[1.1rem] font-[500]">
        <h4 className="mb-6">Available for booking from</h4>
        <span className="justify-center items-center md:flex gap-4 flex-col md:flex-row w-full ">
          {/* <CustomCalender setDate={set_start_date} p={start_date}/>
        <CustomCalender setDate={set_end_date} start={start_date} p={end_date}/> */}
          <Calendar
            className={"text-[#000] bg-[#000] w-full md:col-span-3"}
            value={start_date}
            minDate={new Date()}
            onChange={(val) => {
              dispatch(set_start_date(val));
            }}
          />
          <Calendar
            className={"text-[#000] bg-[#000] w-full md:col-span-1"}
            value={end_date}
            defaultActiveStartDate={start_date}
            minDate={start_date}
            onChange={(val) => {
              dispatch(set_end_date(val));
            }}
          />
        </span>
      </div>

      <div className="flex flex-col gap-6 w-full col-span-3 md:col-span-1">
        {/* <h4 className=" text-[1.1rem] font-[500]">Standard Price</h4> */}
        <span>
          <p>Outside Accra</p>
          <p className="px-2 py-2 border-[0.7px] border-[#fff] rounded-md">
            GHC{" "}
            <input
              type="number"
              className="outline-none bg-[transparent] max-w-[70px] pl-1"
              value={outsideAccra}
              onChange={(e) => {
                dispatch(set_outside_accra(e?.currentTarget.value));
              }}
            />
            /day
          </p>
        </span>
        <span>
          <p>Within Accra</p>
          <p className="px-2 py-2 border-[0.7px] border-[#fff] rounded-md">
            GHC{" "}
            <input
              type="number"
              className="outline-none bg-[transparent] max-w-[70px] pl-1"
              value={price}
              onChange={(e) => {
                dispatch(set_price(e?.currentTarget.value));
              }}
            />
            /day
          </p>
        </span>
        <span>
          <p>Cross Country</p>
          <p className="px-2 py-2 border-[0.7px] border-[#fff] rounded-md">
            GHC{" "}
            <input
              type="number"
              className="outline-none bg-[transparent] max-w-[70px] pl-1"
              value={crossCountry}
              onChange={(e) => {
                dispatch(set_cross_country(e?.currentTarget.value));
              }}
            />
            /day
          </p>
        </span>
        <span className="flex flex-col gap-4">
          <h4 className="text-[0.9rem] font-[300]">Available for booking</h4>
          <div className="flex flex-col gap-3">
            {Available.map(({ day, value }, inx) => (
              <div
                onClick={() => dispatch(set_available(inx))}
                className={`flex items-center px-2 py-1 border-[1px] gap-3  cursor-pointer rounded-md ${
                  inx == available ? " border-egreen" : "border-bgrey"
                }`}
              >
                {inx == available ? (
                  <Icon
                    icon={"material-symbols:check-box-sharp"}
                    className={`text-[16px] ${
                      inx != available ? "text-bgrey" : "text-egreen"
                    }`}
                  />
                ) : (
                  <div className="p-[5px] ml-[2px] border-bgrey border-[1px]"></div>
                )}
                <p className="text-[0.8rem] font-[100]">{day}</p>
              </div>
            ))}
          </div>
        </span>

        <span>
          <h4 className="text-[0.9rem] font-[300] mb-4">
            Available for rent from:
          </h4>
          <span className="flex gap-3 items-center flex-col sm:flex-row">
            <p className="py-1 border-[1px] border-[#fff] rounded-md font-[100] text-center text-[0.9rem] flex-1">
              {String(start_date).split(" ").slice(0, 4).join(" ")}
            </p>
            <p>to</p>
            <p className="py-1 border-[1px] border-[#fff] rounded-md font-[100] text-center text-[0.9rem] flex-1">
              {end_date
                ? String(end_date).split(" ").slice(0, 4).join(" ")
                : String(start_date).split(" ").slice(0, 4).join(" ")}
            </p>
          </span>
        </span>
      </div>
    </div>
  );
};

export default CalendarComp;
