// "use client";

import Link from "next/link";
import { Calendar, Clock, User, FileText } from "lucide-react";
// import PatientHeader from "@/components/PatientHeader";

const PatientDashboard = () => {
  // Mock data
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-02-25",
      time: "10:00 AM",
      status: "Confirmed",
    },
    // Add more appointments as needed
  ];

  return (<>

    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Link
            href="/patient/profile"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <User className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Profile</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and edit your profile</p>
          </Link>

          <Link
            href="/patient/patient-bookings"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Calendar className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">My Bookings</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View your appointment history</p>
          </Link>

          <Link
            href="/patient/book-doctor"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Clock className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Book Appointment</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Schedule a new appointment</p>
          </Link>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <FileText className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Medical Records</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View your medical history</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Upcoming Appointments</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Doctor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Specialty
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {appointment.doctorName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">{appointment.specialty}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {appointment.date} at {appointment.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default PatientDashboard;
