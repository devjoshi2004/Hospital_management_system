import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Store user info in cookies
      document.cookie = `user=${encodeURIComponent(
        JSON.stringify(action.payload)
      )}; path=/; max-age=86400`;

      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
        localStorage.setItem("userId", action.payload.id);
        localStorage.setItem("userRole", action.payload.role);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      // Clear cookies
      document.cookie = "user=; path=/; max-age=0";
      document.cookie = "lastPage=; path=/; max-age=0";

      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
      }
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      
      // Also set userId and userRole in localStorage when setting user from cookies
      if (action.payload && typeof window !== "undefined") {
        localStorage.setItem("userId", action.payload.id);
        localStorage.setItem("userRole", action.payload.role);
      }
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
