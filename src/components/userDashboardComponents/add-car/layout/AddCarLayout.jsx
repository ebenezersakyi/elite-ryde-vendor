import React from "react";
import HeaderTabs from "../shared/HeaderTabs";
import { useSelector, useDispatch } from "react-redux";
import { nextTab, prevTab } from "../../../../store/active_tab";
import IconLoadingWhite from "../../../shared_components/IconLoadingWhite";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { Box, Step, StepLabel, Stepper } from "@mui/material";
import { Icon } from "@iconify/react";

const AddCarLayout = ({ children }) => {
  const active = useSelector((d) => d.active_tab.value);
  const dispatch = useDispatch();
  const tabs = [
    "Basic Information",
    "Additional Information",
    "Add Driver",
    "Car Photos",
    "Car Features",
    "Calendar",
  ];
  const { user } = useAuth0();
  const [isLoading, setLoading] = React.useState(false);
  const info = useSelector((_) => _.details);
  const features = useSelector((_) => _.features);
  const rental_condition = useSelector((_) => _.rental_condition);

  const {
    car_brand,
    milage,
    car_model,
    transmission,
    engine_type,
    body_style,
    engine_size,
    registration_year,
    number_of_seats,
    location,
    plate_number,
    vehicle_identification_number,
    images,
    reg_doc,
    insurance_doc,
  } = useSelector((_) => _.details);

  function allBasicFilled() {
    if (
      !car_brand.trim() ||
      !milage.trim() ||
      !car_model.trim() ||
      !transmission.trim() ||
      !engine_size.trim() ||
      !engine_type.trim() ||
      !registration_year.trim() ||
      !number_of_seats.trim() ||
      !body_style.trim()
    ) {
      return false;
    }
    return true;
  }
  function allDriverDetails() {
    if (
      !info?.driver?.name.trim() ||
      !info?.driver?.email.trim() ||
      !info?.driver?.phoneNumber.trim() ||
      !info?.driver?.idNumber.trim() ||
      !info?.driver?.image.trim() ||
      !info?.driver?.idImage.trim()
    ) {
      return false;
    }
    return true;
  }
  function allAdditionalFixed() {
    if (
      (!location ||
        !plate_number.trim() ||
        !vehicle_identification_number.trim(),
      !reg_doc,
      !insurance_doc)
    ) {
      return false;
    }

    return true;
  }

  const arrayOfFeatures = [];

  for (const a in features) {
    if (features[a]) {
      arrayOfFeatures.push(String(a));
    }
  }

  const array_of_rentalConditions = [];

  for (let b in rental_condition) {
    if (rental_condition[b]) {
      array_of_rentalConditions.push(String(b));
    }
  }

  const availability = ["Weekdays", "Weekends", "Both"];

  async function addCar() {
    try {
      setLoading(true);
      // console.log({
      //   type: "add_car",
      //   content: {
      //     basicInformation: {
      //       make: info?.car_brand,
      //       model: info?.car_model,
      //       year: Number(info?.registration_year),
      //       mileage: Number(info?.milage),
      //       engineType: info?.engine_type,
      //       engineSize: info?.engine_size,
      //       numberOfSeats: 5,
      //       transmission: info?.transmission,
      //       bodyStyle: info?.body_style,
      //     },
      //     additionalInformation: {
      //       geolocation: {
      //         long: info?.location.long,
      //         lat: info?.location.lat,
      //       },
      //       licensePlate: info?.plate_number,
      //       vehicleIdentificationNumber: info?.vehicle_identification_number,
      //       location: info?.location.location,
      //     },
      //     features: arrayOfFeatures,
      //     rentalConditions: array_of_rentalConditions,
      //     photos: images,
      //     vendorId: user?.sub.slice(6),
      //     booking: {
      //       price: {
      //         within_accra: info?.price,
      //         outside_accra: info?.outsideAccra,
      //         cross_country: info?.crossCountry,
      //       },
      //       availability: availability[info?.available],
      //       dates: {
      //         startDate: info?.["start_date"],
      //         endDate: info?.["end_date"],
      //       },
      //     },
      //     driver: {
      //       image: info?.driver.image,
      //       name: info?.driver.name,
      //       idImage: info?.driver.idImage,
      //       email: info?.driver.email,
      //       phoneNumber: info?.driver?.phoneNumber,
      //       idNumber: info?.driver.idNumber,
      //     },
      //   },
      // });
      const response = await axios({
        // url: "https://elite-ryde-management-api.azurewebsites.net/api/car",
        url: `https://elite-ryde-user-api.azurewebsites.net/api/approval`,
        method: "post",
        data: {
          type: "add_car",
          content: JSON.stringify({
            basicInformation: {
              make: info?.car_brand,
              model: info?.car_model,
              year: Number(info?.registration_year),
              mileage: Number(info?.milage),
              engineType: info?.engine_type,
              engineSize: info?.engine_size,
              numberOfSeats: 5,
              transmission: info?.transmission,
              bodyStyle: info?.body_style,
            },
            additionalInformation: {
              geolocation: {
                long: info?.location.long,
                lat: info?.location.lat,
              },
              licensePlate: info?.plate_number,
              vehicleIdentificationNumber: info?.vehicle_identification_number,
              location: info?.location.location,
              insuranceDocument: insurance_doc,
              carRegistrationDocument: reg_doc,
            },
            features: arrayOfFeatures,
            rentalConditions: array_of_rentalConditions,
            photos: images,
            vendorId: user?.sub.slice(6),
            booking: {
              price: {
                within_accra: info?.price,
                outside_accra: info?.outsideAccra,
                cross_country: info?.crossCountry,
              },
              availability: availability[info?.available],
              dates: {
                startDate: info?.["start_date"],
                endDate: info?.["end_date"],
              },
            },
            driver: {
              image: info?.driver.image,
              name: info?.driver.name,
              idImage: info?.driver.idImage,
              email: info?.driver.email,
              phoneNumber: info?.driver?.phoneNumber,
              idNumber: info?.driver.idNumber,
            },
          }),
        },
      });

      if (response?.data?.status) {
        dispatch(nextTab());
      }
    } catch (error) {
      toast.error("An error occured \n Try again");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="flex flex-col">
      {/* <Box sx={{ width: "100%" }}>
        <Stepper
          activeStep={active}
          alternativeLabel
          sx={{ backgroundColor: "#8a8a8a", padding: 2, borderRadius: 10 }}
        >
          {tabs.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box> */}
      <div className="flex pt-6 row-span-0 scrollbar-hide gap-3 overflow-x-scroll">
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
      <section className="row-span-6 flex flex-col justify-between w-[85vw] sm:w-[100%] mt-[20px]">
        <div className="border-[#fff] border-[1px] rounded-2xl p-[10px]  bg-[#000000d7] max-w-[100%] sm:p-8">
          {children}
        </div>

        <div
          className={`flex mt-3  items-center w-full ${
            active == 0 ? " justify-end " : "justify-between"
          }`}
        >
          {active > 0 && active < tabs.length && (
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
                if (active == 0) {
                  if (allBasicFilled()) {
                    dispatch(nextTab());
                  } else {
                    toast.error("Fill all fields");
                  }
                } else if (active == 1) {
                  if (allAdditionalFixed()) {
                    dispatch(nextTab());
                  } else {
                    toast.error("Fill all fields And upload All documents");
                  }
                } else if (active == 2) {
                  if (allDriverDetails()) {
                    dispatch(nextTab());
                  } else {
                    toast.error("Fill all fields And upload All documents");
                  }
                } else if (active == 3) {
                  if (images.length !== 0) {
                    dispatch(nextTab());
                  } else {
                    toast.error("Add image");
                  }
                } else {
                  dispatch(nextTab());
                }
              }}
            >
              Next
            </button>
          )}
          {active == tabs.length - 1 && (
            <button
              className={`border-[#fff] self-end grid place-items-center  w-fit font-[100] rounded-2xl text-center text-[1.3rem] border-[1px] ${
                isLoading ? "px-14 py-3" : "px-8 py-2"
              }`}
              onClick={() => {
                addCar();
              }}
            >
              {isLoading ? <IconLoadingWhite /> : "Complete"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default AddCarLayout;
