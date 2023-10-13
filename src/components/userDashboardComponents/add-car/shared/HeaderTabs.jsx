import React from "react";
import { Icon } from "@iconify/react";

const HeaderTabs = ({ title, number, active, hasPassed }) => {
  return (
    <div
      className={`${hasPassed && "relative flex border-egreen text-egreen"} ${
        active ? "border-[#fff]" : "border-bgrey"
      } items-center justify-center text-center border-2 rounded-2xl py-[10px] px-6 text-[200]`}
      style={{ minWidth: "220px", height: "50px" }}
    >
      {/* {hasPassed && (
        <div className="absolute left-[10px] p-[10px] bg-white rounded-full">
          <Icon icon="material-symbols:check" width={20} color="#FFF" />
        </div>
      )} */}
      <h4>{title}</h4>
    </div>
  );
};

export default HeaderTabs;
