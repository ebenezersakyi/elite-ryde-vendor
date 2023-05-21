import React from "react";
import HeaderTabs from "../shared/HeaderTabs";
import { useSelector, useDispatch } from "react-redux";
import { nextTab, prevTab } from "../../../../store/active_tab";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import {toast} from 'react-toastify'
const AddCarLayout = ({ children }) => {
  const active = useSelector((d) => d.active_tab.value);
  const dispatch = useDispatch();
  const tabs = [
    "Basic Information",
    "Additional Information",
    "Car Photos",
    "Car Features",
    "Calendar",
  ];
  const {user }= useAuth0()
  const info = useSelector((_) => _.details)
  const features = useSelector((_) => _.features)
  const rental_condition = useSelector((_) => _.rental_condition)
  const arrayOfFeatures = []

  console.log(info);

  for(const a in features){
    if(features[a]){
      arrayOfFeatures.push(String(a))
    }
  }

  const array_of_rentalConditions = []

  for(let b in rental_condition){
    if(rental_condition[b]){
      array_of_rentalConditions.push(String(b))
    }
  }

async function addCar(){
  try {
    const response = await axios({
      url: 'https://elite-ryde-management-api.azurewebsites.net/api/car',
      method: 'post',
      data: {
        "basicInformation": {
           "make": info?.car_brand,
           "model": info?.car_model,
           "year": Number(info?.registration_year),
           "mileage": Number(info?.milage),
           "engineType": info?.engine_type,
           "engineSize": info?.engine_size,
           "numberOfSeats": 5,
           "transmission":  info?.transmission.capi
       },
       "additionalInformation": {
           "geolocation": {
               "long": info?.location.long,
               "lat": info?.location.lat
           },
           "licensePlate": info?.plate_number,
           "vehicleIdentificationNumber": info?.vehicle_identification_number
       },
       "features": arrayOfFeatures,
       "rentalConditions": array_of_rentalConditions,
       "photos": [],
       "vendorId": user?.sub
   }
    })

    if(response?.data?.status){
      dispatch(nextTab());
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
    console.log(error);
  }
}
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-3">
        {tabs.map((element, index) => {
          return (
            <HeaderTabs
              title={element}
              number={`0${index + 1}`}
              key={index}
              active={active == index}
              hasPassed={active > index}
            />
          );
        })}
      </div>

      <div className="border-[#fff] border-[1px] rounded-2xl px-8 py-8 bg-[#000000d7]">
        {children}
      </div>

      <div className={`flex  items-center w-full ${active == 0  ? ' justify-end ' : 'justify-between' }`}>
        {(active > 0 && active < tabs.length - 1) && (
          <button
            className="border-[#fff] w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              dispatch(prevTab());
            }}
          >
            Previous
          </button>
        )}
        {active < tabs.length - 1 && (
          <button
            className="border-[#fff] self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              dispatch(nextTab());
            }}
          >
            Next
          </button>
        )}
        {active == tabs.length - 1 && (
          <button
            className="border-[#fff] self-end  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] px-8 py-2"
            onClick={() => {
              addCar()
            }}
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCarLayout;
