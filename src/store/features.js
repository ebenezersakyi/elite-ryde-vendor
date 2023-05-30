import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    gps: false, 
    aux: false,
    sun_roof: false,
    child_seat: false,
    bluetooth: false,
    bike_rack: false, 
    third_row_seat: false,
    mud_tyres: false,
    chains: false,
    car_taint: false,
    roof_box: false, 
    _18_plus: false,
    smoking_allowed: false,
    outside_accra: false,
    deliver_car: false,
    usb: false
}

const feature_slice  = createSlice({
    name: 'features',
    initialState, 
    reducers: {
        toggleFeature: (state, action) => {
            const feature = action.payload;
            state[feature] = !state[feature];
          },
          clear_2 : (state) => {
            state = {
                gps: false, 
                aux: false,
                sun_roof: false,
                child_seat: false,
                bluetooth: false,
                bike_rack: false, 
                third_row_seat: false,
                mud_tyres: false,
                chains: false,
                car_taint: false,
                roof_box: false, 
                _18_plus: false,
                smoking_allowed: false,
                outside_accra: false,
                deliver_car: false,
                usb: false
            }
          }
    }
})

export const {
    toggleFeature,
    clear_2
} = feature_slice.actions


export default feature_slice.reducer