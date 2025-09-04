"use client";

import Link from "next/link";
import { Users, Heart, Calendar, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "@/redux/slices/authSlice";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import Logout from "../../components/auth/logout/Logout";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useState } from "react";

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold text-primary">MediCare Admin</h2>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Toggle navigation"
            onClick={() => setSidebarOpen((v) => !v)}
            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Sidebar: right on mobile, left on desktop */}
      <aside
        className={`fixed top-0 h-screen w-64 bg-white dark:bg-gray-800 border-l md:border-l-0 md:border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 z-50 right-0 md:right-auto md:left-0 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-6 flex items-center justify-between md:justify-start md:gap-3">
          <h2 className="text-xl font-bold text-primary">MediCare Admin</h2>
          <div className="md:ml-auto">
            <ThemeToggle />
          </div>
          <button
            onClick={closeSidebar}
            className="md:hidden ml-2 p-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>
        <nav className="mt-2">
          <div className="px-4 space-y-2">
            <Link
              href="/admin"
              onClick={closeSidebar}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                pathname === "/admin"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/doctors"
              onClick={closeSidebar}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                pathname === "/admin/doctors"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Doctors</span>
            </Link>

            <Link
              href="/admin/patients"
              onClick={closeSidebar}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                pathname === "/admin/patients"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className="w-5 h-5" />
              <span>Patients</span>
            </Link>

            <Link
              href="/admin/appointments"
              onClick={closeSidebar}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                pathname === "/admin/appointments"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </Link>

            <Link
              href="/admin/settings"
              onClick={closeSidebar}
              className={`w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-colors ${
                pathname === "/admin/settings"
                  ? "bg-primary text-white"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="absolute bottom-8 left-0 right-0 px-4">
            <Logout className="w-5 h-5" />
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Page Content (reserve space on left for desktop sidebar) */}
      <main className="w-full md:ml-64 pt-14 md:pt-8 p-4 md:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
