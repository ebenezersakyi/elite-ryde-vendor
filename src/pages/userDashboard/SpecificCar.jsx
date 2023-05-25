import React, { useEffect } from "react";
import car from "../../assets/dashboard/cars/car.svg";
import arrow from "../../assets/dashboard/vendor/back.svg";
import CustomCalender from "../../components/userDashboardComponents/shared/Calender";
import { useNavigate, useSearchParams } from "react-router-dom";
const SpecificCar = () => {
  const [param, setSearchParam] = useSearchParams()
  const id = param.get('id')
  useEffect(() => {
    nav('/dashboard')
  }, [])
  const nav = useNavigate()
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
      <div className="px-[10rem]  flex flex-col gap-4">
        <span className="flex items-center gap-4 cursor-pointer" onClick={() => {
          nav('/dashboard')
        }}>
          <img src={arrow} alt="" className="h-5" />
          <h4 className="font-bold text-[1.4rem]">Back</h4>
        </span>

        <div className="px-8 py-10 rounded-xl border-[#fff] bg-[#000000b9] border-[2px]">
          <h4 className="font-[500] text-[1.8rem] mb-6">CHEVROLET corvette</h4>
          <div className="grid grid-cols-3  gap-6">
            <span>
              <img
                src={car}
                alt=""
                className="rounded-[20px] border-bgrey border-2"
              />
              <p className="text-[1.3rem] text-[#808080] font-light mt-3">
                East Legon, 2002, Manual
              </p>

              <span className="flex flex-col mt-5">
                <p className="font-light">
                  <span className="text-[#808080] text-[1.1rem]">
                    User rating -{" "}
                  </span>{" "}
                  9.0/10
                </p>
                <p className="font-semibold text-egreen text-[1.4rem]">
                  Ghc 700.00/day
                </p>
              </span>
            </span>

            <CustomCalender />

            <div className="border-bgrey border-2 rounded-xl font-[100] flex flex-col gap-4 text-[1.3rem] h-fit p-5">
              <h4 className="font-[500] text-[1.5rem]">Status</h4>
              <p>Rental Status: Active</p>
              <p>Current User: n/a</p>
              <p>Insurance: n/a</p>
              <p>Total Profit: n/a</p>
            </div>
          </div>
        </div>

        <button className="border-[#fff] self-end  w-fit font-[100] rounded-md text-center text-[1.3rem] border-[1px] px-2 py-1">
            Update
          </button>
      </div>
    </div>
  );
};

export default SpecificCar;
