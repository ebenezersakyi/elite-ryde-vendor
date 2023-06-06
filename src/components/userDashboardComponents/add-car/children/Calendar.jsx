import React, { useState } from 'react'
import CustomCalender from '../../shared/Calender'
import { Icon } from "@iconify/react";
import { set_start_date, set_end_date, set_available, set_price, set_outside_accra} from '../../../../store/dashboard_state_slice';
import { useSelector , useDispatch} from 'react-redux';
const Calendar = () => {
    const dispatch = useDispatch()
    const {available, start_date, end_date, price, outsideAccra } =  useSelector((_) => _.details)
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
    <div className="grid grid-cols-3 gap-[2rem] px-8 py-4 items-center">
    <div className="col-span-2 text-[1.1rem] font-[500]">
      <h4 className="mb-6">Available for booking from</h4>
      <span className="flex gap-4">
        <CustomCalender setDate={set_start_date} p={start_date}/>
        <CustomCalender setDate={set_end_date} start={start_date} p={end_date}/>
      </span>
    </div>

    <div className="flex flex-col gap-6">
      {/* <h4 className=" text-[1.1rem] font-[500]">Standard Price</h4> */}
      <span>
        <p>Outside Accra</p>
      <p className="px-2 py-2 border-[0.7px] border-[#fff] rounded-md">
        GHC <input type='number' className='outline-none bg-[transparent] max-w-[70px] pl-1' value={outsideAccra} onChange={(e) => {
          dispatch(set_outside_accra(e?.currentTarget.value))
        }}/>/day
      </p>
      </span>
      <span>
        <p>Within Accra</p>
      <p className="px-2 py-2 border-[0.7px] border-[#fff] rounded-md">
        GHC <input type='number' className='outline-none bg-[transparent] max-w-[70px] pl-1' value={price} onChange={(e) => {
          dispatch(set_price(e?.currentTarget.value))
        }}/>/day
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
                    inx != available  ? "text-bgrey" : "text-egreen"
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
            {String(start_date).split(' ').slice(1).join(' ')}
          </p>
          <p>to</p>
          <p className="px-2 py-1 border-[1px] border-[#fff] rounded-md font-[100] text-[0.9rem]">
            {String(end_date).split(' ').slice(1).join(' ')}
          </p>
        </span>
      </span>
    </div>
  </div>

  )
}

export default Calendar