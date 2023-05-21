import React from "react";
import HeaderTabs from "../shared/HeaderTabs";

const AddCarLayout = ({ children }) => {
  const tabs = [
    "Basic Information",
    "Additional Information",
    "Car Photos",
    "Car Features",
    "Calendar",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        {tabs.map((element, index) => {
          return (
            <HeaderTabs title={element} number={`0${index + 1}`} key={index} />
          );
        })}
      </div>

      <div className="border-[#fff] border-2 rounded-2xl px-8 py-8 bg-[#000000d7]">
        {children}
      </div>

      <div className="flex justify-between items-center">
        <button className="border-[#fff] w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2">
          Previous
        </button>
        <button className="border-[#fff]  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2">
          Next
        </button>
      </div>
    </div>
  );
};

export default AddCarLayout;
