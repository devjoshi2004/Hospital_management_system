"use client"

import React from "react";
import { LogOut } from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


const Logout = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/");
      };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 dark:bg-emerald-500 bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-500 transition-colors"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default Logout;
