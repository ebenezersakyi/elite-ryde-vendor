import React, { useEffect, useState } from "react";
import DetailTab from "../shared/InfoTab";
import { useSelector } from "react-redux";
import {
  set_car_brand,
  set_milage,
  set_car_model,
  set_body_style,
  set_engine_size,
  set_engine_type,
  set_registration_year,
  set_transmisson,
  set_number_of_seats,
} from "../../../../store/dashboard_state_slice";
import { toast } from "react-toastify";
import axios from "axios";

// input type 0->text 1->dropdown 2->locationPicker
const BasicInfo = () => {
  const [brandDetails, setBrandDetails] = useState([
    {
      _id: "1qq",
      brand: "none",
      models: [],
    },
  ]);
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
  } = useSelector((_) => _.details);

  function allFilled() {
    if (
      !car_brand ||
      !milage ||
      !car_model ||
      !transmission ||
      !engine_size ||
      !engine_type ||
      !registration_year ||
      !number_of_seats ||
      !body_style
    ) {
      return false;
    }

    return true;
  }

  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {
    try {
      const url = "https://elite-ryde-management-api.azurewebsites.net/api";
      const response = await axios.get(`${url}/getBrands`);
      console.log("Response:", response.data.data);
      // setBrandDetails(brandDetails.push(response.data?.data));
      setBrandDetails([...brandDetails, ...response.data?.data]);
    } catch (error) {
      toast.error("Error");
    }
  };

  // const brandDetails = [
  //   {
  //     id: "1qq",
  //     brand: "none",
  //     models: [],
  //   },
  //   {
  //     id: 1,
  //     brand: "Toyota",
  //     models: [
  //       "Camry",
  //       "Corolla",
  //       "Rav4",
  //       "Highlander",
  //       "Tacoma",
  //       "Sienna",
  //       "Prius",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     brand: "Ford",
  //     models: [
  //       "F-150",
  //       "Escape",
  //       "Explorer",
  //       "Mustang",
  //       "Focus",
  //       "Edge",
  //       "Ranger",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     brand: "Honda",
  //     models: ["Civic", "Accord", "CR-V", "Pilot", "Fit", "HR-V", "Odyssey"],
  //   },
  //   {
  //     id: 4,
  //     brand: "Chevrolet",
  //     models: [
  //       "Silverado",
  //       "Equinox",
  //       "Malibu",
  //       "Traverse",
  //       "Cruze",
  //       "Tahoe",
  //       "Suburban",
  //     ],
  //   },
  //   {
  //     id: 5,
  //     brand: "Volkswagen",
  //     models: [
  //       "Jetta",
  //       "Passat",
  //       "Tiguan",
  //       "Golf",
  //       "Atlas",
  //       "Beetle",
  //       "Arteon",
  //     ],
  //   },
  //   {
  //     id: 6,
  //     brand: "Nissan",
  //     models: [
  //       "Altima",
  //       "Rogue",
  //       "Sentra",
  //       "Maxima",
  //       "Murano",
  //       "Frontier",
  //       "Pathfinder",
  //     ],
  //   },
  //   {
  //     id: 7,
  //     brand: "BMW",
  //     models: ["3 Series", "5 Series", "X5", "7 Series", "X3", "M3", "X7"],
  //   },
  //   {
  //     id: 8,
  //     brand: "Mercedes-Benz",
  //     models: [
  //       "C-Class",
  //       "E-Class",
  //       "GLC",
  //       "S-Class",
  //       "A-Class",
  //       "GLE",
  //       "G-Class",
  //     ],
  //   },
  //   {
  //     id: 9,
  //     brand: "Audi",
  //     models: ["A3", "A4", "Q5", "A6", "Q7", "S4", "Q3"],
  //   },
  //   {
  //     id: 10,
  //     brand: "Hyundai",
  //     models: [
  //       "Elantra",
  //       "Sonata",
  //       "Tucson",
  //       "Santa Fe",
  //       "Kona",
  //       "Accent",
  //       "Veloster",
  //     ],
  //   },
  //   {
  //     id: 11,
  //     brand: "Kia",
  //     models: [
  //       "Optima",
  //       "Sorento",
  //       "Sportage",
  //       "Forte",
  //       "Soul",
  //       "Stinger",
  //       "Cadenza",
  //     ],
  //   },
  //   {
  //     id: 12,
  //     brand: "Subaru",
  //     models: [
  //       "Outback",
  //       "Forester",
  //       "Impreza",
  //       "Legacy",
  //       "Crosstrek",
  //       "WRX",
  //       "BRZ",
  //     ],
  //   },
  //   {
  //     id: 13,
  //     brand: "Mitsubishi",
  //     models: [
  //       "Outlander",
  //       "Eclipse Cross",
  //       "Mirage",
  //       "Lancer",
  //       "Pajero",
  //       "ASX",
  //       "Strada",
  //     ],
  //   },
  //   {
  //     id: 14,
  //     brand: "Lexus",
  //     models: ["RX", "IS", "ES", "NX", "GX", "LS", "RC"],
  //   },
  //   {
  //     id: 15,
  //     brand: "Porsche",
  //     models: [
  //       "911",
  //       "Cayenne",
  //       "Panamera",
  //       "Macan",
  //       "Boxster",
  //       "Cayman",
  //       "Taycan",
  //     ],
  //   },
  //   {
  //     id: 16,
  //     brand: "Jeep",
  //     models: [
  //       "Wrangler",
  //       "Cherokee",
  //       "Grand Cherokee",
  //       "Renegade",
  //       "Compass",
  //       "Gladiator",
  //       "Wagoneer",
  //     ],
  //   },
  //   {
  //     id: 17,
  //     brand: "Ram",
  //     models: [
  //       "1500",
  //       "2500",
  //       "3500",
  //       "Promaster",
  //       "Promaster City",
  //       "Ramcharger",
  //       "Dakota",
  //     ],
  //   },
  //   {
  //     id: 18,
  //     brand: "Tesla",
  //     models: [
  //       "Model 3",
  //       "Model S",
  //       "Model X",
  //       "Model Y",
  //       "Cybertruck",
  //       "Roadster",
  //       "Semi",
  //     ],
  //   },
  //   {
  //     id: 19,
  //     brand: "Volvo",
  //     models: ["XC90", "XC60", "S60", "V60", "XC40", "V90", "S90"],
  //   },
  //   {
  //     id: 20,
  //     brand: "Mazda",
  //     models: ["CX-5", "Mazda3", "Mazda6", "CX-3", "CX-9", "MX-5 Miata", "MPV"],
  //   },
  //   {
  //     id: 21,
  //     brand: "Buick",
  //     models: [
  //       "Encore",
  //       "Envision",
  //       "Enclave",
  //       "Regal",
  //       "LaCrosse",
  //       "Cascada",
  //       "Electra",
  //     ],
  //   },
  //   {
  //     id: 22,
  //     brand: "Cadillac",
  //     models: ["Escalade", "CTS", "XT5", "CT6", "XT4", "ATS", "XT6"],
  //   },
  //   {
  //     id: 23,
  //     brand: "Chrysler",
  //     models: [
  //       "300",
  //       "Pacifica",
  //       "Voyager",
  //       "Aspen",
  //       "Concorde",
  //       "Sebring",
  //       "LHS",
  //     ],
  //   },
  //   {
  //     id: 24,
  //     brand: "Dodge",
  //     models: [
  //       "Charger",
  //       "Challenger",
  //       "Durango",
  //       "Grand Caravan",
  //       "Journey",
  //       "Viper",
  //       "Magnum",
  //     ],
  //   },
  //   {
  //     id: 25,
  //     brand: "Fiat",
  //     models: ["500", "500X", "500L", "124 Spider", "Punto", "Doblo", "Tipo"],
  //   },
  //   {
  //     id: 26,
  //     brand: "GMC",
  //     models: [
  //       "Sierra",
  //       "Terrain",
  //       "Acadia",
  //       "Yukon",
  //       "Canyon",
  //       "Savana",
  //       "Envoy",
  //     ],
  //   },
  //   {
  //     id: 27,
  //     brand: "Jaguar",
  //     models: ["F-PACE", "XE", "XF", "XJ", "E-PACE", "I-PACE", "F-TYPE"],
  //   },
  //   {
  //     id: 28,
  //     brand: "Land Rover",
  //     models: [
  //       "Range Rover",
  //       "Discovery",
  //       "Defender",
  //       "Evoque",
  //       "Sport",
  //       "Velar",
  //       "Freelander",
  //     ],
  //   },
  //   {
  //     id: 29,
  //     brand: "Mini",
  //     models: [
  //       "Cooper",
  //       "Countryman",
  //       "Clubman",
  //       "Paceman",
  //       "Roadster",
  //       "Coupe",
  //       "Convertible",
  //     ],
  //   },
  //   {
  //     id: 30,
  //     brand: "Maserati",
  //     models: [
  //       "Ghibli",
  //       "Quattroporte",
  //       "Levante",
  //       "GranTurismo",
  //       "GranCabrio",
  //       "Kyalami",
  //       "Biturbo",
  //     ],
  //   },
  //   {
  //     id: 31,
  //     brand: "Rolls-Royce",
  //     models: [
  //       "Phantom",
  //       "Cullinan",
  //       "Ghost",
  //       "Wraith",
  //       "Dawn",
  //       "Silver Shadow",
  //       "Camargue",
  //     ],
  //   },
  //   {
  //     id: 32,
  //     brand: "Ferrari",
  //     models: [
  //       "F8 Tributo",
  //       "488 GTB",
  //       "Portofino",
  //       "812 Superfast",
  //       "Roma",
  //       "SF90 Stradale",
  //       "GTC4Lusso",
  //     ],
  //   },
  //   {
  //     id: 33,
  //     brand: "Lamborghini",
  //     models: [
  //       "Aventador",
  //       "Huracán",
  //       "Urus",
  //       "Gallardo",
  //       "Diablo",
  //       "Murciélago",
  //       "Reventón",
  //     ],
  //   },
  //   {
  //     id: 34,
  //     brand: "Bugatti",
  //     models: [
  //       "Chiron",
  //       "Veyron",
  //       "Divo",
  //       "La Voiture Noire",
  //       "Centodieci",
  //       "EB110",
  //       "Type 57",
  //     ],
  //   },
  // ];

  const detailsInfo = [
    {
      icon: "ic:baseline-directions-car",
      title: "Car brand",
      value: car_brand,
      func: set_car_brand,
      tooltip: "eg: Ford",
      inputType: 3,
      options: brandDetails,
    },
    {
      icon: "ic:baseline-directions-car",
      title: "Car model",
      value: car_model,
      func: set_car_model,
      tooltip: "eg: Escape",
      inputType: 4,
      options: brandDetails,
    },
    {
      icon: "mdi:engine-outline",
      title: "Engine size",
      value: engine_size,
      func: set_engine_size,
      tooltip: "Engine size in liters",
      type: "number",
    },
    {
      icon: "simple-line-icons:calender",
      title: "Year",
      value: registration_year,
      func: set_registration_year,
      tooltip: "Year of make",
      type: "number",
    },
    {
      icon: "ic:baseline-directions-car",
      title: "Type of car",
      value: body_style,
      func: set_body_style,
      tooltip: "Pick up | Salon | SUV | Bus",
      inputType: 2,
      options: ["Pick up", "Salon", "SUV", "Bus"],
    },
    {
      icon: "material-symbols:format-list-numbered",
      title: "Number of seats",
      value: number_of_seats,
      func: set_number_of_seats,
      tooltip: "eg: 5",
      type: "number",
    },
    {
      icon: "ph:road-horizon-thin",
      title: "Mileage",
      value: milage,
      func: set_milage,
      tooltip: "Mileage in km",
      type: "number",
    },
    {
      icon: "mdi:petrol-pump",
      title: "Engine type",
      value: engine_type,
      func: set_engine_type,
      tooltip: "Petrol | Diesel | Kerosene",
      inputType: 2,
      options: ["Petrol", "Diesel", "Kerosene"],
    },
    {
      icon: "solar:transmission-linear",
      title: "Transmission",
      value: transmission,
      func: set_transmisson,
      tooltip: "Automatic | Manual",
      inputType: 2,
      options: ["Automatic", "Manual"],
    },
  ];
  return (
    <div className="flex flex-wrap w-full justify-center items-center">
      {detailsInfo.map(
        (
          { icon, title, value, func, tooltip, type, inputType, options },
          inx
        ) => {
          return (
            <DetailTab
              icon={icon}
              title={title}
              value={value}
              key={inx}
              setState={func}
              tooltip={tooltip}
              type={type}
              inputType={inputType || 0}
              opt={options}
            />
          );
        }
      )}
    </div>
  );
};

export default BasicInfo;
