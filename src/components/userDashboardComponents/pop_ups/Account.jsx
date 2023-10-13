import React, { useState } from "react";
import { Icon } from "@iconify/react";
import sample from "../../../assets/dashboard/sample_pp.svg";
import MainAccount from "./accounts/MainAccount";
import Billing from "./accounts/Billing";
import { useAuth0 } from "@auth0/auth0-react";
const Account = () => {
  const { user } = useAuth0();
  const [active, setActive] = useState(0);
  const menuItems = [
    {
      icon: "mdi:user",
      title: "Account",
      func: "",
    },
    {
      icon: "mdi:bell-notification",
      title: "Notification",
      func: "",
    },
    {
      icon: "mdi:cash",
      title: "Billing",
      func: "",
    },
  ];

  return (
    <div className="text-[#fff] border-bgrey border-[1px] max-h-[100vh] overflow-y-scroll rounded-xl bg-[#000] grid grid-cols-3 gap-[3rem]">
      <div className="p-6 h-fit">
        <div className="flex gap-3 items-center">
          <img
            src={user?.picture}
            alt="user picture"
            className="h-[50px] rounded-full"
          />
          <h4 className="font-bold text-[1.3rem]">
            {user?.name.split(" ")[1]}
          </h4>
        </div>

        {/* menu */}
        <div className="mt-7 ">
          <h4 className="text-bgrey text-[1.3rem]">Menu</h4>
          <div className="grid grid-cols-1 gap-3 mt-6 sm:flex-row col-span-1 ">
            {menuItems.map(({ title, icon }, inx) => {
              return (
                <span
                  onClick={() => {
                    setActive(inx);
                  }}
                  key={inx}
                  className={`${
                    inx == active ? "text-egreen" : "text-bgrey"
                  }  text-[1.2rem] text-center flex pl-[3rem] items-center gap-2 cursor-pointer`}
                >
                  <Icon icon={icon} />

                  <h4 className="font-[100]">{title}</h4>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-span-3 sm:col-span-2">
        {active == 0 ? <MainAccount /> : active == 2 ? <Billing /> : ""}
      </div>
    </div>
  );
};

export default Account;
