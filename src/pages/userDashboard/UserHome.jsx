import React, { useEffect, useState } from "react";
import CarCard from "../../components/userDashboardComponents/shared/CarCard";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../../components/shared_components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { NoData } from "../../components/shared_components/NoData";
const UserHome = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const { user } = useAuth0();

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
        setData(response?.data?.data);
        console.log(response?.data?.data);
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
    <div className="text-[#fff] 2xl:container 2xl:mx-auto pt-[2rem]">
      <div className="px-[20px]">
        <h1 className="text-egreen text-end font-bold text-[2.3rem] mb-2">
          YOUR CARS
        </h1>

        {loading ? (
          <Loading />
        ) : data?.length === 0 ? (
          <NoData data="cars" />
        ) : (
          <div className="max-h-[75vh] overflow-y-scroll scrollbar-hide gap-[1.5rem]  grid grid-cols-1 col-span-1 mb-2 md:grid-cols-3">
            {data?.map((d, inx) => {
              let {
                basicInformation: { make, model, year, transmission },
                additionalInformation: {
                  geolocation: { long, lat },
                  location,
                },
                _id,
                photos,
                booking,
              } = d;
              return (
                <CarCard
                  name={`${make} ${model}`}
                  user_ratings={0}
                  key={inx}
                  location={location}
                  year={year}
                  transmission={transmission}
                  image={photos[0]}
                  id={_id}
                  price_per_day={booking?.price?.within_accra || 1000}
                  data={d}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHome;
