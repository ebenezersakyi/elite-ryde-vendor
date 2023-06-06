import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const initialState = {
  milage: "",
  car_brand: "",
  car_model: "",
  transmission: 'Automatic',
  engine_type: 'Petrol',
  body_style: 'Pick up',
  engine_size: "",
  registration_year: "",
  color: "",
  number_of_seats: "",
  location: "",
  start_date: dayjs().toDate().toDateString(),
  end_date: dayjs().toDate().toDateString(),
  plate_number: '',
  location: '',
  vehicle_identification_number: '',
  available: 0,
  price: 0, 
  images: [],
  outsideAccra: 0
};

export const details_slice = createSlice({
  name: "details selectors",
  initialState,
  reducers: {
    set_car_brand: (state, action) => {
      state.car_brand = action.payload;
    },
    set_milage: (state, action) => {
      state.milage = action.payload;
    },
    set_car_model: (state, action) => {
      state.car_model = action.payload;
    },
    set_transmisson: (state, action) => {
      state.transmission = action.payload;
    },
    set_engine_type: (state, action) => {
      state.engine_type = action.payload;
    },
    set_body_style: (state, action) => {
      state.body_style = action.payload;
    },
    set_engine_size: (state, action) => {
      state.engine_size = action.payload;
    },
    set_registration_year: (state, action) => {
      state.registration_year = action.payload;
    },
    set_location: (state, action) => {
      state.location = action.payload;
    },
    set_start_date: (state, action) => {
      state.start_date = action.payload;
    },
    set_end_date: (state, action) => {
      state.end_date = action.payload;
    },
    set_color: (state, action) => {
      state.color= action.payload;
    },
    set_number_of_seats: (state, action) => {
      state.number_of_seats = action.payload;
    },
    set_plate_number: (state, action) => {
      state.plate_number = action.payload
    },
    set_vehicle_identification_number: (state, action) => {
      state.vehicle_identification_number = action.payload
    },
    set_available: (state, action) => {
      state.available = action.payload
    },
    set_price: (state, action) => {
      state.price = action.payload
    },
    set_outside_accra: (state, actiom) => {
      state.outsideAccra = actiom.payload
    },
    clear_1: (state) => {   
      state = {
        milage: "",
        car_brand: "",
        car_model: "",
        transmission: 'Automatic',
        engine_type: 'Petrol',
        body_style: 'Pick up',
        engine_size: "",
        registration_year: "",
        color: "",
        number_of_seats: "",
        location: "",
        start_date: dayjs().toDate().toDateString(),
        end_date: dayjs().toDate().toDateString(),
        plate_number: '',
        location: '',
        vehicle_identification_number: '',
        available: 0,
        price: 0, 
        images: [],
        outsideAccra: 0
      }
    },
    set_image: (state, action) => {
      state.images = [...state.images, action.payload]
    }
  },
});

export const {
  set_car_brand,
  set_milage,
  set_car_model,
  set_body_style,
  set_engine_size,
  set_engine_type,
  set_location,
  set_start_date,
  set_registration_year,
  set_end_date,
  set_transmisson,
  set_number_of_seats,
  set_color,
  set_plate_number,
  set_vehicle_identification_number,
  set_available,
  set_price,
  clear_1,
  set_image,
  set_outside_accra
} = details_slice.actions;

export default details_slice.reducer;
