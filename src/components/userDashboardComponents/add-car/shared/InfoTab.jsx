import React from "react";
import { Icon } from "@iconify/react";
const DetailTab = ({ icon, title, value }) => {
  return (
    <div className="border-bgrey border-[1px] flex px-4 py-2 items-center gap-3 rounded-md">
      <span className="bg-[#ffffff] w-[3rem] h-[3rem] rounded-full grid place-items-center">
        <Icon icon={icon} className="text-egreen text-[1.5rem]" />
      </span>

      <span className="flex-1 font-[500] ">
        <h4 className="font-[500] mb-2 text-[1.1rem] ">{title}:</h4>
        <input type="text" placeholder={value} className=" border-bgrey px-3 py-2 border-[1px] bg-[transparent] outline-none focus:border-[#fff] rounded-md"/>
      </span>
    </div>
  );
};

export default DetailTab;