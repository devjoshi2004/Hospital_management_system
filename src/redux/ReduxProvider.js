"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";

function UserInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize user from cookies on app load
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie));
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, [dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <UserInitializer />
      {children}
    </Provider>
  );
}
