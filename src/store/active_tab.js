import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

const active_tab_slice = createSlice({
    name: 'active-tab', 
    initialState,
    reducers: {
        nextTab: (state) => {
            state.value = state.value +1
        },
        prevTab: (state) => {
            state.value = state.value - 1
        },
        clear: (state) => {
            state.value = 0
        }
    }
})


export const {nextTab, prevTab, clear} = active_tab_slice.actions

export default active_tab_slice.reducer