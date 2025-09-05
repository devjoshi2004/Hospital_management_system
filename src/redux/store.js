import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import patientReducer from "@/redux/slices/patientSlice"
import adminReducer from "@/redux/slices/adminSlice"
import doctorReducer from "@/redux/slices/doctorSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    patient: patientReducer,
    admin: adminReducer,
    doctor: doctorReducer,
  },
});
