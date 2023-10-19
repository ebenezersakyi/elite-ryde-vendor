import React, { useState } from "react";
import logo from "../../../assets/logo.svg";
import arrow from "../../../assets/dashboard/vendor/arrow.svg";
import HeaderBtn from "../../header-components/HeaderBtn";
import Notification from "../notification-tab/Notification";
import { show_log_out, show_settings } from "../../../store/modal_slide";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";

const Dashboardheader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { pathname } = useLocation();
  const nav_links = [
    {
      title: "Cars",
      link: "/dashboard",
    },
    {
      title: "History",
      link: "/dashboard/transactions",
    },
    {
      title: "Finance",
      link: "/dashboard/finance",
    },
  ];
  const nav = useNavigate();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="2xl:container 2xl:mx-auto">
      <header className="text-[#fff] flex justify-between px-[15px] py-[15px] items-center">
        <div className="hidden lg:flex items-center gap-4">
          {nav_links.map(({ title, link }, indx) => {
            return (
              <p
                onClick={() => {
                  nav(link);
                }}
                className={`text-[1.3rem]  font-[400] hover:text-egreen cursor-pointer  ${
                  pathname == link && "border-b-2 border-egreen text-egreen "
                }`}
                key={indx}
              >
                {title}
              </p>
            );
          })}
        </div>
        <div className="flex justify-between lg:hidden">
          <div
            onClick={toggleMenu}
            className="flex  justify-center items-center  border-[1px] border-[#FFF] p-[6px] m-[10px] rounded-lg "
          >
            <Icon icon="material-symbols:menu" width={20} color="#FFF" />
            {/* <h1 className="text-egreen">Helloooo</h1> */}
          </div>
          {/* <div className="self-center flex m-[10px] lg:hidden">
            <img src={logo} alt="logo" className="h-[30px]" />
          </div> */}
        </div>
        <img
          src={logo}
          alt="logo"
          className="h-[30px] lg:h-[100%] cursor-pointer self-center justify-center"
          onClick={() => {
            nav("/dashboard");
          }}
        />
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex">
            <Notification />
          </div>
          <div className="hidden lg:flex">
            <HeaderBtn text={"Add new car"} link={"/dashboard/add"} />
          </div>
          <UserTab />
        </div>
      </header>

      <div
        className={`lg:hidden flex flex-col col-span-2 p-8 grid grid-rows-6 h-[100vh] min-w-[50vw] fixed top-0 bottom-0 z-10 bg-white items-center justify-center transition-transform transform ${
          menuVisible ? "translate-x-0" : "-translate-x-full"
        } bg-[#FFF]`}
      >
        <div
          onClick={toggleMenu}
          className="block absolute top-[10px] border-[1px] left-[10px] p-[6px] rounded-lg "
        >
          <Icon icon="material-symbols:close" width={20} />
        </div>

        <div className=" row-span-6 self-center flex flex-col gap-6 pb-8 ">
          {nav_links.map(({ title, link }, indx) => {
            return (
              <p
                onClick={() => {
                  nav(link);
                }}
                className={`text-[1.3rem]  font-[400] hover:text-egreen cursor-pointer  ${
                  pathname == link && "border-b-2 border-egreen text-egreen "
                }`}
                key={indx}
              >
                {title}
              </p>
            );
          })}
        </div>

        <div className="flex gap-4">
          <HeaderBtn text={"Add new car"} link={"/dashboard/add"} />
        </div>
      </div>
    </div>
  );
};

function UserTab() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const list = [
    {
      name: "Settings",
      func: show_settings,
    },
    {
      name: "Help",
      child: "",
    },
    {
      name: "Log out",
      func: show_log_out,
    },
  ];
  return (
    <div className="flex relative z-40 rounded-lg border-[1px] border-bgrey gap-4 items-center  py-1 pl-2 pr-2 backdrop-blur-lg bg-[#00000070]">
      <img
        src={user?.picture}
        alt="user picture"
        className="h-[30px] rounded-full"
        onClick={() => {
          setShow(!show);
        }}
      />
      <span
        className="hidden lg:flex gap-2 cursor-pointer mr-2"
        onClick={() => {
          setShow(!show);
        }}
      >
        <p className="text-[15px] font-thin">
          Hello, <span className="font-bold ">{user?.name.split(" ")[1]}</span>
        </p>
        <img
          src={arrow}
          alt=""
          className={`${show && "rotate-180"} duration-700`}
        />
      </span>

      <div
        className={`${
          show ? "block " : "hidden "
        } z-[1000000] duration-300 absolute top-[100%] mt-2 py-2 rounded-lg border-[1px] border-bgrey right-0 backdrop-blur-[20px] bg-[#000000dd]`}
      >
        <ul className="flex flex-col gap-2 text-[1.1rem] px-3">
          {list.map(({ name, func }, inx) => {
            return (
              <div
                className="hover:bg-[#ffffff13] cursor-pointer hover:text-egreen duration-700 p-2 flex gap-2 rounded"
                key={inx}
                onClick={() => {
                  if (func) {
                    dispatch(func());
                  }
                  setShow(false);
                }}
              >
                <p>•</p>
                <li key={inx} className="">
                  {name}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Dashboardheader;
