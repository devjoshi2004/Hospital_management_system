"use client";

import { useEffect, useState } from "react";
import { UserPlus, Search, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination"; //  Import MUI Pagination
import { useDispatch, useSelector } from "react-redux";
import { deletePatient, setPatients } from "@/redux/slices/adminSlice";

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1); // Pagination state
  const rowsPerPage = 5; //  Number of patients per page
  const dispatch = useDispatch();
  const router = useRouter();
  const patients = useSelector((state) => state.admin.patients)

  useEffect(() => {
    try {
      axiosInstance("/patient").then((response) => {
        dispatch(setPatients(response.data));
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Apply search filter first
  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply pagination AFTER search
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, startIndex + rowsPerPage);

  const handleDelete = async (patientId) => {
    try {
      await dispatch(deletePatient(patientId)).unwrap();
    } catch (error) {
      console.error("Failed to delete patient:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Patient Management</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage and oversee all patients in the system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
            {filteredPatients.length} {/* Show filtered count */}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        {/* Actions Bar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); // Reset to first page on search
              }}
              className="pl-10 pr-4 py-2 text-black dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <Link
            href="/admin/add-patient"
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="w-5 h-5" />
            <span>Add Patient</span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Last Visit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    {patient.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button
                        className="text-gray-600 dark:text-gray-300 hover:text-primary"
                        onClick={() => router.push(`/admin/patients/${patient.id}`)}
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        id={patient.id}
                        onClick={() => handleDelete(patient.id)}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-500"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*  Pagination */}
        {filteredPatients.length > rowsPerPage && ( //  Only show if needed
          <div className="flex justify-center p-4">
            <Pagination
              count={Math.ceil(filteredPatients.length / rowsPerPage)}
              shape="rounded"
              page={page}
              onChange={(event, value) => setPage(value)} //  Handle page change
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientManagement;
