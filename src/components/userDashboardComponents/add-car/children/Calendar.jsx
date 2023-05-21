import React, { useState } from 'react'
import CustomCalender from '../../shared/Calender'
import { Icon } from "@iconify/react";
const Calendar = () => {
    const [selected, setSelected] = useState(0)
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
    <div className="grid grid-cols-3 gap-[2rem] px-[4rem] py-[2rem] items-center">
    <div className="col-span-2 text-[1.1rem] font-[500]">
      <h4 className="mb-6">Available for booking from</h4>
      <span className="flex gap-4">
        <CustomCalender />
        <CustomCalender />
      </span>
    </div>

    <div className="flex flex-col gap-6">
      <h4 className=" text-[1.1rem] font-[500]">Standard Price</h4>
      <p className="px-2 py-1 border-[0.7px] border-[#fff] rounded-md">
        GHC 1234 /day
      </p>
      <span className="flex flex-col gap-4">
        <h4 className="text-[0.9rem] font-[300]">Available for booking</h4>
        <div className="flex flex-col gap-3">
          {Available.map(({ day, value }, inx) => (
            <div
            onClick={() => setSelected(inx)}
              className={`flex items-center px-2 py-1 border-[1px] gap-3 rounded-md ${
                inx == selected ? " border-egreen" : "border-bgrey"
              }`}
            >
              {inx == selected ? (
                <Icon
                  icon={"material-symbols:check-box-sharp"}
                  className={`text-[16px] ${
                    inx != selected  ? "text-bgrey" : "text-egreen"
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
        <h4 className="text-[0.9rem] font-[300] mb-4">Available for rent from:</h4>
        <span className="flex justify-between items-center">
          <p className="px-2 py-1 border-[1px] border-[#fff] rounded-md font-[100] text-[0.9rem]">
            Mar 1 2023
          </p>
          <p>to</p>
          <p className="px-2 py-1 border-[1px] border-[#fff] rounded-md font-[100] text-[0.9rem]">
            Mar 8 2023
          </p>
        </span>
      </span>
    </div>
  </div>

  )
}

export default Calendar