"use client";

import { useEffect, useState } from "react";
import { UserPlus, Search, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoctor, setDoctors } from "@/redux/slices/adminSlice";

const DoctorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const dispatch = useDispatch();
  const router = useRouter();
  const doctors = useSelector((state) => state.admin.doctors)

  useEffect(() => {
    try{
      axiosInstance("/doctor").then((response) => {
        dispatch(setDoctors(response.data))
      })
    }catch(error){
      console.log("doctor",error);
    }
  },[])

  const handleDelete = async (doctorId) => {
    try {
      await dispatch(deleteDoctor(doctorId)).unwrap();
    } catch (error) {
      console.error("Failed to delete doctor:", error);
    }
  };

  const filteredDoctors = doctors.filter((doctor) => doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase()))

  const startIndex = (page - 1) * rowsPerPage;
  const paginatedDoctors = filteredDoctors.slice(startIndex, startIndex + rowsPerPage);

  return (
<div> 
<div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">Doctor Management</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage and oversee all doctors in the system
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 md:p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Doctors</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {filteredDoctors.length}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Actions Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 border text-black dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-900 w-full sm:w-72"
            />
          </div>
          <Link
            href="/admin/add-doctor"
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full sm:w-auto justify-center"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Doctor</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Name
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Specialty
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Email
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Phone
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {doctor.fullName}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {doctor.specialty}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {doctor.email}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {doctor.phone}
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-gray-600 dark:text-gray-300 hover:text-primary" onClick={() => router.push(`/admin/doctors/${doctor.id}`)}>
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600 dark:text-gray-300 hover:text-red-500" onClick={() => handleDelete(doctor.id)}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDoctors.length > rowsPerPage && (
          <div className="flex justify-center p-4">
            <Pagination
              count={Math.ceil(filteredDoctors.length / rowsPerPage)}
              shape="rounded"
              page={page}
              onChange={(event, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorManagement;
