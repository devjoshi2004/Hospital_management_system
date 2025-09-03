import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

// Fetch patient data from API
export const fetchPatientProfile = createAsyncThunk(
  "patient/fetchProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/patient/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update patient profile
export const updatePatientProfile = createAsyncThunk(
  "patient/updateProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      await axiosInstance.patch(`/patient/${userId}`, profileData);

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      localStorage.setItem("user", JSON.stringify({ ...storedUser, ...profileData }));

      return profileData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  "patient/changePassword",
  async ({ userId, currentPassword, newPassword }, { getState, rejectWithValue }) => {
    const { patient } = getState();
    
    if (patient.password !== currentPassword) {
      return rejectWithValue("Current password is incorrect.");
    }

    try {
      await axiosInstance.patch(`/patient/${userId}`, { password: newPassword });
      return newPassword;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    userId: null,
    fullName: "",
    email: "",
    phone: "",
    password: "",
    isLoading: false,
    error: null,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatientProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
        state.password = action.payload.password;
      })
      .addCase(fetchPatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.fullName = action.payload.fullName;
        state.email = action.payload.email;
        state.phone = action.payload.phone;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.password = action.payload;
      });
  },
});

export const { setUserId } = patientSlice.actions;
export default patientSlice.reducer;
