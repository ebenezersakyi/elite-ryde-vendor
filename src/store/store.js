import { configureStore } from "@reduxjs/toolkit";
import modal_slide from "./modal_slide";
import details_slice from "./dashboard_state_slice";
import feature_slice from "./features";
import active_tab from "./active_tab";
export const store = configureStore({
  reducer: {
    features: feature_slice,
    details: details_slice,
    modal: modal_slide,
    active_tab: active_tab, 
  },
});
