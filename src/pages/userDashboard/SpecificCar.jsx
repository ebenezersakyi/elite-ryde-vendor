import React, { useEffect, useState } from "react";
import car from "../../assets/dashboard/cars/car.svg";
import arrow from "../../assets/dashboard/vendor/back.svg";
import { toast } from "react-toastify";
import { setData } from "../../store/selected_car";
import Loader from "../../components/shared_components/Loader";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AmountLayout } from "./Dashboard";
import RentalHistoryTable from "../../components/userDashboardComponents/specific-car/RentalHistoryTable";
const SpecificCar = () => {
  const [tloading, setTloading] = useState(false);
  const [tdata, setTData] = useState();
  const [amount, setAmount] = useState();
  async function getCarHistory(id) {
    try {
      setTloading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/car-history?id=${id}`,
        method: "get",
      });
      if (response?.data?.status) {
        setTData(response?.data?.data);
        setAmount(response?.data?.amount);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured \n Try again");
    } finally {
      setTloading(false);
    }
  }

  const [loading, setLoading] = React.useState(false);
  const { data } = useSelector((d) => d?.selected_car);
  const [status, setStatus] = React.useState({});
  const dispatch = useDispatch();
  async function getCar(id) {
    try {
      setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/specific-car?id=${id}`,
        method: "get",
      });

      if (response?.data?.status) {
        console.log(response?.data?.data);
        dispatch(setData(response?.data?.data));
      } else {
        nav("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    } finally {
      setLoading(false);
    }
  }
  async function getRentalStatus(id) {
    try {
      setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/book-a-ride?id=${id}`,
        method: "get",
      });

      if (response?.data?.status) {
        console.log("Rental status", response?.data?.data);
        setStatus(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error occured");
    } finally {
      setLoading(false);
    }
  }
  const [param] = useSearchParams();

  useEffect(() => {
    if (param.get("id")) {
      getCar(param.get("id"));
      getRentalStatus(param.get("id"));
      getCarHistory(param.get("id"));
    } else {
      nav("/");
    }
  }, []);
  const nav = useNavigate();

  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[1.5rem] pt-[2rem]">
      {loading ? (
        <Loader />
      ) : (
        data && (
          <div className="px-[10px]  flex flex-col gap-4">
            <span
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <img src={arrow} alt="" className="h-5" />
              <h4 className="font-bold text-[1.4rem]">Back</h4>
            </span>

            <div className="px-[10px] py-[10px] rounded-xl border-[#fff] bg-[#000000b9] border-[2px]">
              <h4 className="font-[500] text-[1.8rem] mb-6">
                {data?.basicInformation?.make} {data?.basicInformation?.model}
              </h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-6">
                <span className="rounded-lg overflow-hidden hidden md:flex">
                  <img
                    src={data?.photos[0] || car}
                    alt=""
                    className="rounded-lg h-full object-contain "
                  />
                </span>

                <div className="col-span-3 grid grid-rows-2 gap-3 sm:col-span-2">
                  <span className="rounded-lg overflow-hidden  bg-egreen md:hidden">
                    <img
                      src={data?.photos[0] || car}
                      alt=""
                      className="rounded-lg h-full w-[100%] object-contain "
                    />
                  </span>
                  <AmountLayout>
                    <p className="text-[1.2rem] font-[100]">
                      Total income earned from this car
                    </p>
                    <p className="text-[2.2rem] font-[600]">
                      GHS {amount?.toFixed(2)}
                    </p>
                  </AmountLayout>
                  <div className="border-bgrey border-2 h-full rounded-xl font-[100] flex flex-col gap-4 text-[1.3rem]  p-5 ">
                    <p>
                      Rental Status: {status?.status ? "Active" : "Non Active"}
                    </p>
                    {status?.status && (
                      <>
                        <p>Current User: {status?.data?.user || "n/a"}</p>
                        <p>
                          Duration:{" "}
                          {status?.data?.duration == 1
                            ? `${status?.data?.duration} day`
                            : `${status?.data?.duration} days`}
                        </p>
                        <p>location: {status?.data?.scope}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="col-span-3">
                  <RentalHistoryTable data={tdata} loading={tloading} />
                </div>
              </div>
            </div>

            <button className="border-[#fff] self-end  w-fit font-[100] rounded-md text-center text-[1.3rem] border-[1px] px-2 py-1">
              Update
            </button>
          </div>
        )
      )}
    </div>
  );
};
// {
//   "status": true,
//   "message": "Rental info retrieved.",
//   "data": {
//     "rented": true,
//     "name": "test frimps",
//     "duration": 10,
//     "within_accra": true
//   }
// }
export default SpecificCar;
