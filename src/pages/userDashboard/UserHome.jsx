import React from "react";
import CarCard from "../../components/userDashboardComponents/shared/CarCard";
import {cars} from '../../utils/car'

const UserHome = () => {
  return (
    <div className="text-[#fff] 2xl:container 2xl:mx-auto px-[2.5rem] pt-[2rem]">
        <div className="px-[8rem]">
          <h1 className="text-egreen text-end font-bold text-[2.3rem] mb-2">YOUR CARS</h1>

          <div className="max-h-[75vh] overflow-y-scroll scrollbar-hide gap-[1.5rem]  grid grid-cols-3 mb-2">
          {cars.map(({name, year, user_ratings, transmission, location, image, price_per_day}, inx) => {
            return(
              <CarCard name={name} price_per_day={price_per_day} user_ratings={user_ratings} key={inx} location={location} year={year} transmission={transmission} image={image}/>
            )
        })}
          </div>
        </div>
    </div>
  );
};

export default UserHome;
