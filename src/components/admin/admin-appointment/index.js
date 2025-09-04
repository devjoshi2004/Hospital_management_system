"use client";

import { useState } from "react";
import { Calendar, Clock, Search, UserPlus, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
      <div className="mb-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Appointments Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Schedule and manage patient appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md text-center">
            <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Today's Appointments</h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">24</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md text-center">
            <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Pending Confirmation</h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">8</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md text-center">
            <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Completed Today</h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">16</p>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-900"
              />
            </div>
            <Link
              href="/admin/add-appointment"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
            >
              <UserPlus className="w-5 h-5" />
              <span>New Appointment</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Doctor</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100">John Doe</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Dr. Sarah Johnson</td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>2024-02-20</span>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>10:00 AM</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Regular Checkup</td>
                  <td className="px-4 sm:px-6 py-4 text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm">
                    <div className="flex space-x-2">
                      <button className="text-green-600 hover:text-green-800" onClick={() => console.log("confirmed")}>
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" onClick={() => console.log("declined")}>
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default Appointments;
