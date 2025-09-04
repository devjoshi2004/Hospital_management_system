import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/utils/axiosInstance';

// Async thunks for doctor operations
export const fetchDoctors = createAsyncThunk(
  'doctor/fetchDoctors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/doctor');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDoctorById = createAsyncThunk(
  'doctor/fetchDoctorById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/doctor/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addDoctor = createAsyncThunk(
  'doctor/addDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/doctor', doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  'doctor/updateDoctor',
  async ({ id, doctorData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/doctor/${id}`, doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'doctor/deleteDoctor',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/doctor/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Doctor Schedule Async Thunks
export const fetchDoctorSchedule = createAsyncThunk(
  'doctor/fetchDoctorSchedule',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/doctorSchedule?doctorId=${doctorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addDoctorSchedule = createAsyncThunk(
  'doctor/addDoctorSchedule',
  async (scheduleData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/doctorSchedule', scheduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateDoctorSchedule = createAsyncThunk(
  'doctor/updateDoctorSchedule',
  async ({ id, scheduleData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/doctorSchedule/${id}`, scheduleData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDoctorSchedule = createAsyncThunk(
  'doctor/deleteDoctorSchedule',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/doctorSchedule/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Doctor Holidays Async Thunks
export const fetchDoctorHolidays = createAsyncThunk(
  'doctor/fetchDoctorHolidays',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/doctorHolidays?doctorId=${doctorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addDoctorHoliday = createAsyncThunk(
  'doctor/addDoctorHoliday',
  async (holidayData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/doctorHolidays', holidayData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteDoctorHoliday = createAsyncThunk(
  'doctor/deleteDoctorHoliday',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/doctorHolidays/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Doctor Appointments Async Thunks
export const fetchDoctorAppointments = createAsyncThunk(
  'doctor/fetchDoctorAppointments',
  async (doctorId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/appointment?doctorId=${doctorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateAppointmentStatus = createAsyncThunk(
  'doctor/updateAppointmentStatus',
  async ({ id, status, notes }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/appointment/${id}`, { status, notes });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  doctors: [],
  currentDoctor: null,
  doctorSchedule: {},
  currentScheduleId: null,
  doctorHolidays: [],
  doctorAppointments: [],
  loading: false,
  error: null,
  success: false,
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentDoctor: (state, action) => {
      state.currentDoctor = action.payload;
    },
    clearCurrentDoctor: (state) => {
      state.currentDoctor = null;
    },
    // Local schedule management for immediate UI updates
    updateLocalSchedule: (state, action) => {
      const { day, schedule } = action.payload;
      state.doctorSchedule[day] = schedule;
    },
    addLocalHoliday: (state, action) => {
      state.doctorHolidays.push(action.payload);
    },
    removeLocalHoliday: (state, action) => {
      state.doctorHolidays = state.doctorHolidays.filter(
        holiday => holiday.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Doctor by ID
      .addCase(fetchDoctorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDoctor = action.payload;
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add Doctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload);
        state.success = true;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Doctor
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctors.findIndex(doctor => doctor.id === action.payload.id);
        if (index !== -1) {
          state.doctors[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Doctor
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(doctor => doctor.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Doctor Schedule
      .addCase(fetchDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          const schedule = action.payload[0];
          state.doctorSchedule = schedule.schedule || {};
          state.currentScheduleId = schedule.id;
        }
      })
      .addCase(fetchDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(addDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorSchedule = action.payload.schedule;
        state.currentScheduleId = action.payload.id;
        state.success = true;
      })
      .addCase(addDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorSchedule = action.payload.schedule;
        state.success = true;
      })
      .addCase(updateDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteDoctorSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctorSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorSchedule = {};
        state.success = true;
      })
      .addCase(deleteDoctorSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Doctor Holidays
      .addCase(fetchDoctorHolidays.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorHolidays.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorHolidays = action.payload;
      })
      .addCase(fetchDoctorHolidays.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(addDoctorHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctorHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorHolidays.push(action.payload);
        state.success = true;
      })
      .addCase(addDoctorHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteDoctorHoliday.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDoctorHoliday.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorHolidays = state.doctorHolidays.filter(
          holiday => holiday.id !== action.payload
        );
        state.success = true;
      })
      .addCase(deleteDoctorHoliday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Doctor Appointments
      .addCase(fetchDoctorAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.doctorAppointments = action.payload;
      })
      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.doctorAppointments.findIndex(
          appointment => appointment.id === action.payload.id
        );
        if (index !== -1) {
          state.doctorAppointments[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearSuccess,
  setCurrentDoctor,
  clearCurrentDoctor,
  updateLocalSchedule,
  addLocalHoliday,
  removeLocalHoliday,
} = doctorSlice.actions;

export default doctorSlice.reducer;
