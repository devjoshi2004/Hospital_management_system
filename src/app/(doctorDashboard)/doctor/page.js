'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, FileClock } from 'lucide-react';

const DoctorDashboard = () => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie));
        if (user.role === "doctor") {
          setAuthorized(true);
        } else {
          router.push("/"); // Redirect unauthorized users
        }
      } catch (error) {
        router.push("/"); // Handle invalid cookie
      }
    } else {
      router.push("/"); // Redirect if no user found
    }
  }, [router]);

  if (!authorized) return null; // Prevent rendering before auth check

  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      time: '10:00 AM',
      date: '2024-02-25',
      type: 'Regular Checkup',
      status: 'Confirmed',
    },
    // Add more appointments as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link href="/doctor/profile" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <User className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and edit your profile</p>
          </Link>

          <Link href="/doctor/schedule" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Calendar className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Schedule</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your availability</p>
          </Link>

          <Link href="/doctor/appointments" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Appointments</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage appointments</p>
          </Link>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <FileClock className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Patient History</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Access patient records</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Today's Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{appointment.patientName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link href={`/doctor/appointments/${appointment.id}`} className="text-primary hover:text-primary/90">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
