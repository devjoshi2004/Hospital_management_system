"use client";

import AdminLayout from '@/layout/admin-layout';
import { setDoctors, setPatients } from '@/redux/slices/adminSlice';
import axiosInstance from '@/utils/axiosInstance';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  BarChart, LineChart, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  // Mock data for charts
  const monthlyData = [
    { month: 'Jan', appointments: 150, revenue: 15000, patients: 120 },
    { month: 'Feb', appointments: 200, revenue: 20000, patients: 150 },
    { month: 'Mar', appointments: 180, revenue: 18000, patients: 140 },
    { month: 'Apr', appointments: 250, revenue: 25000, patients: 200 },
    { month: 'May', appointments: 280, revenue: 28000, patients: 220 },
    { month: 'Jun', appointments: 300, revenue: 30000, patients: 250 },
  ];

  const departmentData = [
    { name: 'Cardiology', patients: 150 },
    { name: 'Pediatrics', patients: 120 },
    { name: 'Neurology', patients: 90 },
    { name: 'Orthopedics', patients: 110 },
    { name: 'Dermatology', patients: 80 },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorsRes, patientsRes] = await Promise.all([
          axiosInstance.get('/doctor'),
          axiosInstance.get('/patient')
        ]);

        dispatch(setDoctors(doctorsRes.data));
        dispatch(setPatients(patientsRes.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const patients = useSelector((state) => state.admin.patients);
  const doctors = useSelector((state) =>  state.admin.doctors);

  return (
    // <AdminLayout>
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Monitor hospital performance and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Patients</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{patients.length}</p>
          {/* <p className="text-sm text-green-600 mt-1">+12.5% from last month</p> */}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Appointments</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">1,345</p>
          {/* <p className="text-sm text-green-600 mt-1">+8.2% from last month</p> */}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">$136,250</p>
          {/* <p className="text-sm text-green-600 mt-1">+15.3% from last month</p> */}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-600 dark:text-gray-300 text-sm font-medium">Active Doctors</h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">{doctors.length}</p>
          {/* <p className="text-sm text-green-600 mt-1">+2 from last month</p> */}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Monthly Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="appointments" stroke="#4AC4AC" />
                <Line type="monotone" dataKey="patients" stroke="#FF6B6B" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Patients by Department
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#4AC4AC" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
    // </AdminLayout>
  );
};

export default AdminDashboard;
