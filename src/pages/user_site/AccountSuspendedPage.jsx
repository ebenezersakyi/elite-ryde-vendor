import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Icon } from "@iconify/react";
// import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { loginWithRedirect, logout } = useAuth0();
  //   const Nav = useNavigate();

  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem] grid place-items-center">
      <div className="block mx-auto">
        {/* <img src={success} alt="" className="w-[100px] block mx-auto mb-4" /> */}
        <Icon
          icon="material-symbols:close"
          width={10}
          color="#FFF"
          className="w-[100px] h-[100px] rounded-full  block mx-auto mb-4, bg-egreen"
        />
        <p className="font-[100] text-center text-[1.2rem]">
          Your account has been suspended.
          <br />
          {/* You would receive a confirmation email shortly. */}
          <br />
        </p>
      </div>
      <p className="font-[100] text-center text-[1.2rem]">
        Click{" "}
        <span
          className="text-egreen  cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          here
        </span>{" "}
        to log out
      </p>
    </div>
  );
};

export default SuccessPage;
