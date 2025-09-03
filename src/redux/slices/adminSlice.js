import axiosInstance from "@/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const deleteDoctor = createAsyncThunk(
    "admin/deleteDoctor",
    async(doctorId, {rejectWithValue}) => {
        try{
            await axiosInstance.delete(`/doctor/${doctorId}`)
        }catch(error){
            return rejectWithValue(error.response?.data || "Error deleting doctor");
        }
    }
)

export const editDoctor = createAsyncThunk(
    "admin/editDoctor",
    async({doctorId, updatedData}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch(`/doctor/${doctorId}`, updatedData)
            return{doctorId, updatedDoctor: response.data}
        }catch(error){
            console.log(error);
        }
    }
)

export const deletePatient = createAsyncThunk(
    "admin/deletePatient",
    async(patientId, {rejectWithValue}) => {
        try{
            await axiosInstance.delete(`/patient/${patientId}`)
        }catch(error){
            return rejectWithValue(error.response?.data || "Error deleting doctor");
        }
    }
)

export const editPatient = createAsyncThunk(
    "admin/editPatient",
    async({patientId, updatedData}, {rejectWithValue}) => {
        try{
            const response = await axiosInstance.patch(`/patient/${patientId}`, updatedData)
            return{patientId, updatedPatient: response.data}
        }catch(error){
            console.log(error);
            
        }
    }
)

const initialState = {
doctors: [],
patients:[],
status: "idle",
error: null
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers:{
        setDoctors:(state, action) => {
            state.doctors = action.payload;
        },
        setPatients:(state, action) => {
            state.patients = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(deleteDoctor.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deleteDoctor.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.doctors = state.doctors.filter(
              (doc) => doc.id !== action.meta.arg
            );
          })
          .addCase(deleteDoctor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(editDoctor.pending, (state) => {
            state.status = "loading";
          })
          .addCase(editDoctor.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.doctors.findIndex(
              (doc) => doc.id === action.payload.doctorId
            );
            if (index !== -1) {
              state.doctors[index] = action.payload.updatedDoctor;
            }
          })
          .addCase(editDoctor.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(deletePatient.pending, (state) => {
            state.status = "loading";
          })
          .addCase(deletePatient.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.patients = state.patients.filter(
              (pat) => pat.id !== action.meta.arg
            );
          })
          .addCase(deletePatient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          })
          .addCase(editPatient.pending, (state) => {
            state.status = "loading";
          })
          .addCase(editPatient.fulfilled, (state, action) => {
            state.status = "succeeded";
            const index = state.patients.findIndex(
              (doc) => doc.id === action.payload.patientId
            );
            if (index !== -1) {
              state.patients[index] = action.payload.updatedPatient;
            }
          })
          .addCase(editPatient.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
          });
    }
})

export const { setDoctors, setPatients } = adminSlice.actions;
export default adminSlice.reducer
