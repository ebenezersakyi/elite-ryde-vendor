import React, { useEffect } from "react";
import car from "../../assets/dashboard/cars/car.svg";
import arrow from "../../assets/dashboard/vendor/back.svg";
import { toast } from "react-toastify";
import { setData } from "../../store/selected_car";
import Loader from "../../components/shared_components/Loader";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AmountLayout } from "./Dashboard";
import RentalHistoryTable from '../../components/userDashboardComponents/specific-car/RentalHistoryTable'
const SpecificCar = () => {
  const mock_list = [
    {
      id: "#1330",
      user: "Elon Musk",
      status: "On going",
      date: ["2nd August", "10th August"],
      car: "Tesla Model S",
      amount: 9876.54,
    },
    {
      id: "#1423",
      user: "Mark Johnson",
      status: "On going",
      date: ["18th September", "ongoing"],
      car: "Audi A8",
      amount: 7532.1,
    },
    {
      id: "#1765",
      user: "Robert Davis",
      status: "On going",
      date: ["30th October", "ongoing"],
      car: "Ferrari 488 GTB",
      amount: 8765.43,
    },
]
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
        // console.log(response?.data?.data);
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
        console.log(response?.data?.data);
        setStatus(response?.data?.data);
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
      // make req
      // console.log(param.get("id"));
      getCar(param.get("id"));
      getRentalStatus(param.get("id"));
    } else {
      nav("/");
    }
  }, []);
  const nav = useNavigate();

  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
      {loading ? (
        <Loader />
      ) : (
        data && (
          <div className="px-[2rem]  flex flex-col gap-4">
            <span
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                nav("/dashboard");
              }}
            >
              <img src={arrow} alt="" className="h-5" />
              <h4 className="font-bold text-[1.4rem]">Back</h4>
            </span>

            <div className="px-8 py-10 rounded-xl border-[#fff] bg-[#000000b9] border-[2px]">
              <h4 className="font-[500] text-[1.8rem] mb-6">
                {data?.basicInformation?.make} {data?.basicInformation?.model}
              </h4>
              <div className="grid grid-cols-6  gap-3">
                <span>
                  <img
                    src={data?.photos[0] || car}
                    alt=""
                    className="rounded-[20px] border-bgrey border-2"
                  />
                  <p className="text-[1.3rem] text-[#808080] font-light mt-3">
                    {data?.additionalInformation?.location},{" "}
                    {data?.basicInformation?.year},{" "}
                    {data?.basicInformation?.transmission}
                  </p>

                  {/* <span className="flex flex-col mt-5"> */}
                  {/* <p className="font-light">
                  <span className="text-[#808080] text-[1.1rem]">
                    User rating -{" "}
                  </span>{" "}
                  9.0/10
                </p> */}
                  {/* <p className="font-semibold text-egreen text-[1.4rem]">
                  Ghc{data?.booking?.price?.within_accra}/day
                </p>
              </span> */}
                </span>

                <div className="col-span-2 grid gap-3">
                  <AmountLayout>
                    <p className="text-[1.2rem] font-[100]">Total income earned from this car</p>
                    <p className="text-[2.2rem] font-[600]">GHS 39.00</p>
                  </AmountLayout>
                  <div className="border-bgrey border-2 rounded-xl font-[100] flex flex-col gap-4 text-[1.3rem] h-fit p-5 ">
                    <p>
                      Rental Status:{" "}
                      {status?.rentalStatus ? "Active" : "Non Active"}
                    </p>
                    <p>Current User: {status?.user || "n/a"}</p>
                    <p>Duration: {status?.duration + " days" || "n/a"}</p>
                    <p>
                      Within Accra: {status?.within_accra ? "True" : "False"}
                    </p>
                  </div>
                </div>
                <div className="col-span-3">
                  {/* <h4 className="font-[500] text-[1.5rem] mb-4">Status:</h4> */}
                 <RentalHistoryTable data={mock_list}/>
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
