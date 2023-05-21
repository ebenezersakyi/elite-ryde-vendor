import React from "react";
import {clear} from '../../../../store/active_tab'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const FinishScreen = () => {
  const nav = useNavigate();
  const dispatch = useDispatch()
  return (
    <div className="w-full h-full flex flex-col justify-center items-center  gap-3 py-[2.5rem]">
      <h4 className="text-[4rem] text-egreen ">Thank You</h4>
      <span>
        <p className="text-[1.8rem] font-[300]">Your Car has been placed</p>
        <p className="text-[1.4rem] font-[100]">
          Our manager will call you shortly
        </p>
      </span>

      <span className="flex gap-2 mt-4">
        <button className="border-[#fff] hover:bg-egreen hover:border-egreen duration-700  self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
        onClick={() => {
            dispatch(clear())
        }}
        >
          Add another car
        </button>
        <button className="border-[#fff] hover:bg-egreen hover:border-egreen duration-700 self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
                onClick={() => {
                    nav('/dashboard')
                }}
        >
          Return home
        </button>
      </span>
    </div>
  );
};

export default FinishScreen;
