'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, XCircle } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppointmentDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, fetch from API using params.id
  const mockAppointments = [
    {
      id: 1,
      patientName: 'John Doe',
      patientEmail: 'john.doe@email.com',
      patientPhone: '+1 (555) 123-4567',
      date: '2024-02-25',
      time: '10:00 AM',
      type: 'Regular Checkup',
      status: 'Confirmed',
      notes: 'First time visit. Patient has been experiencing mild headaches for the past week.',
      symptoms: 'Headaches, mild fatigue',
      previousHistory: 'No significant medical history',
      doctorNotes: '',
      prescription: '',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      patientEmail: 'jane.smith@email.com',
      patientPhone: '+1 (555) 987-6543',
      date: '2024-02-25',
      time: '11:30 AM',
      type: 'Follow-up',
      status: 'Pending',
      notes: 'Follow-up for previous treatment. Patient reports improvement in symptoms.',
      symptoms: 'Improved condition',
      previousHistory: 'Previous treatment for skin condition',
      doctorNotes: '',
      prescription: '',
    },
  ];

  useEffect(() => {
    // Simulate API call
    const fetchAppointment = () => {
      const foundAppointment = mockAppointments.find(apt => apt.id === parseInt(params.id));
      setAppointment(foundAppointment);
      setLoading(false);
    };

    setTimeout(fetchAppointment, 500); // Simulate loading delay
  }, [params.id]);

  const handleStatusChange = (newStatus) => {
    setAppointment(prev => ({ ...prev, status: newStatus }));
    // In real app, make API call to update status
  };

  const handleSaveNotes = () => {
    // In real app, make API call to save notes
    toast.success('Notes saved successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Appointment Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The appointment you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/doctor/appointments')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Appointment Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              appointment.status === 'Confirmed' 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : appointment.status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
              {appointment.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Information */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Patient Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <p className="text-gray-900 dark:text-gray-100">{appointment.patientName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <p className="text-gray-900 dark:text-gray-100 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {appointment.patientEmail}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                  <p className="text-gray-900 dark:text-gray-100 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {appointment.patientPhone}
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Appointment Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                  <p className="text-gray-900 dark:text-gray-100">{appointment.date}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
                  <p className="text-gray-900 dark:text-gray-100 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {appointment.time}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                  <p className="text-gray-900 dark:text-gray-100">{appointment.type}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Medical Information
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Patient Notes</label>
                  <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                    {appointment.notes}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Symptoms</label>
                  <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                    {appointment.symptoms}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Previous History</label>
                  <p className="text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 p-3 rounded-md">
                    {appointment.previousHistory}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Doctor Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                    rows="4"
                    placeholder="Add your notes here..."
                    value={appointment.doctorNotes}
                    onChange={(e) => setAppointment(prev => ({ ...prev, doctorNotes: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prescription</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                    rows="3"
                    placeholder="Add prescription details here..."
                    value={appointment.prescription}
                    onChange={(e) => setAppointment(prev => ({ ...prev, prescription: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleStatusChange('Confirmed')}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange('Cancelled')}
                  className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </button>
              </div>
              <button
                onClick={handleSaveNotes}
                className="flex-1 sm:flex-none bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentDetails;
