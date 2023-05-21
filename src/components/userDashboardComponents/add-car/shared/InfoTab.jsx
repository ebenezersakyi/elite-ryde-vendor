import React from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
const DetailTab = ({ icon, title, value, setState }) => {
  const dispatch = useDispatch();
  return (
    <div className="border-bgrey border-[1px] flex px-4 py-2 items-center gap-3 rounded-md">
      <span className="bg-[#ffffff] w-[3rem] h-[3rem] rounded-full grid place-items-center">
        <Icon icon={icon} className="text-egreen text-[1.5rem]" />
      </span>

      <span className=" font-[500] ">
        <h4 className="font-[500] mb-2 text-[1.1rem] ">{title}:</h4>
        <input
          onChange={(e) => {
            dispatch(setState(e.currentTarget.value))
          }}
          type="text"
          placeholder={"Type..."}
          value={value}
          className=" border-bgrey px-3 py-2 border-[1px] bg-[transparent] outline-none focus:border-[#fff] rounded-md"
        />
      </span>
    </div>
  );
};

export default DetailTab;
