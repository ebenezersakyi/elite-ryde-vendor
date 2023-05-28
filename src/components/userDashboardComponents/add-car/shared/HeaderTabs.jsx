import React from "react";

const HeaderTabs = ({ title, number, active, hasPassed }) => {
  return (
    <div
      className={`${hasPassed && "border-egreen text-egreen"} ${
        active ? "border-[#fff]" : "border-bgrey"
      } text-center border-2 rounded-2xl py-4 px-6 text-[200]`}
    >
      <h4>
        {number} {title}
      </h4>
    </div>
  );
};

export default HeaderTabs;
