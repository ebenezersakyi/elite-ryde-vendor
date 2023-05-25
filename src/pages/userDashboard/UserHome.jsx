import React, { useEffect, useState } from "react";
import CarCard from "../../components/userDashboardComponents/shared/CarCard";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../components/shared_components/Loader";
import { toast } from "react-toastify";
import axios from "axios";
const UserHome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useAuth0();
  //user?.sub.slice(6)

  async function fetchCars() {
    try {
      setLoading(true);
      const response = await axios({
        url: `https://elite-ryde-management-api.azurewebsites.net/api/car?vendorId=${user?.sub.slice(
          6
        )}`,
        method: "get",
      });

      if (response?.data?.status) {
        console.log(response?.data?.data);
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
      <div className="px-[8rem]">
        <h1 className="text-egreen text-end font-bold text-[2.3rem] mb-2">
          YOUR CARS
        </h1>

        {loading ? (
          <Loader />
        ) : data?.length === 0 ? (
          <p>No cars</p>
        ) : (
          <div className="max-h-[75vh] overflow-y-scroll scrollbar-hide gap-[1.5rem]  grid grid-cols-3 mb-2">
            {data?.map(
              (
                {
                  // name,
                  // year,
                  // user_ratings,
                  // transmission,
                  // location,
                  // image,
                  // price_per_day,
                  basicInformation: {make, model, year, transmission},
                  additionalInformation: {geolocation: {long, lat}},
                  _id
                },
                inx
              ) => {
                return (
                  <CarCard
                    name={`${make} ${model}`}
                    price_per_day={1000}
                    user_ratings={0}
                    key={inx}
                    location={{long, lat}}
                    year={year}
                    transmission={transmission}
                    image={''}
                    id={_id}
                  />
                  // <div>
                  //     <p>{make} - {model}</p>
                  //     <p>long: {long} lat: {lat}</p>
                  // </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
