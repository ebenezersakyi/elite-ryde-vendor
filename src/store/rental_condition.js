import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    _18_plus: false,
    smoking_allowed: false,
    outside_accra: false,
    deliver_car: false,
}

const rental_condition_slice  = createSlice({
    name: 'rental-condition',
    initialState, 
    reducers: {
        toggleFeature_r: (state, action) => {
            const feature = action.payload;
            state[feature] = !state[feature];
          },
    }
})

export const {
    toggleFeature_r
} = rental_condition_slice.actions


export default rental_condition_slice.reducer