import React from "react";
import HeaderTabs from "../shared/HeaderTabs";
import { useSelector, useDispatch } from "react-redux";
import { nextTab, prevTab } from "../../../../store/active_tab";
const AddCarLayout = ({ children }) => {
  const active = useSelector((d) => d.active_tab.value);
  const dispatch = useDispatch();
  const tabs = [
    "Basic Information",
    "Additional Information",
    "Car Photos",
    "Car Features",
    "Calendar",
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-3">
        {tabs.map((element, index) => {
          return (
            <HeaderTabs
              title={element}
              number={`0${index + 1}`}
              key={index}
              active={active == index}
              hasPassed={active > index}
            />
          );
        })}
      </div>

      <div className="border-[#fff] border-[1px] rounded-2xl px-8 py-8 bg-[#000000d7]">
        {children}
      </div>

      <div className={`flex  items-center w-full ${active == 0  ? ' justify-end ' : 'justify-between' }`}>
        {active > 0 && (
          <button
            className="border-[#fff] w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              dispatch(prevTab());
            }}
          >
            Previous
          </button>
        )}
        {active < tabs.length - 1 && (
          <button
            className="border-[#fff] self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              dispatch(nextTab());
            }}
          >
            Next
          </button>
        )}
        {active == tabs.length - 1 && (
          <button
            className="border-[#fff] self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              dispatch(nextTab());
            }}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCarLayout;
