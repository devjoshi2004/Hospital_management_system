"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Clock, Search, Star, User } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchDoctors,
  fetchDoctorSchedule,
  clearError,
  clearSuccess,
} from "@/redux/slices/doctorSlice";

const BookDoctor = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error, success } = useSelector((state) => state.doctor);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [doctorSchedules, setDoctorSchedules] = useState({});
  const [expandedDoctor, setExpandedDoctor] = useState(null);

  // Load doctors on component mount
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // Handle success and error messages
  useEffect(() => {
    if (success) {
      toast.success('Operation completed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      dispatch(clearError());
    }
  }, [success, error, dispatch]);

  // Get unique specialties from doctors
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];

  // Load doctor schedule when doctor is selected
  const loadDoctorSchedule = async (doctorId) => {
    try {
      const result = await dispatch(fetchDoctorSchedule(doctorId)).unwrap();
      if (result && result.length > 0) {
        setDoctorSchedules(prev => ({
          ...prev,
          [doctorId]: result[0].schedule
        }));
      }
    } catch (error) {
      console.error('Failed to load doctor schedule:', error);
    }
  };

  // Get available slots for selected date
  const getAvailableSlots = (doctor) => {
    if (!selectedDate || !doctorSchedules[doctor.id]) return [];
    
    const dayName = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'lowercase' });
    const daySchedule = doctorSchedules[doctor.id][dayName];
    
    if (!daySchedule || !daySchedule.isWorking) return [];
    
    return daySchedule.slots || [];
  };

  // Check if doctor is available on selected date
  const isDoctorAvailable = (doctor) => {
    if (!selectedDate || !doctorSchedules[doctor.id]) return false;
    
    const dayName = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'lowercase' });
    const daySchedule = doctorSchedules[doctor.id][dayName];
    
    return daySchedule && daySchedule.isWorking && daySchedule.slots.length > 0;
  };

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleSlotSelection = (doctorId, slot) => {
    setSelectedDoctorId(doctorId);
    setSelectedSlot(slot);
  };

  const handleBookAppointment = (doctorId) => {
    if (!selectedSlot) {
      toast.error("Please select a time slot", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (!selectedDate) {
      toast.error("Please select a date", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    const doctor = doctors.find((d) => d.id === doctorId);
    toast.success(`Appointment booked with ${doctor.fullName} for ${selectedDate} at ${selectedSlot}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    // Reset selections
    setSelectedDoctorId(null);
    setSelectedSlot(null);
    setSelectedDate("");
  };

  const handleDoctorExpand = (doctorId) => {
    if (expandedDoctor === doctorId) {
      setExpandedDoctor(null);
    } else {
      setExpandedDoctor(doctorId);
      if (!doctorSchedules[doctorId]) {
        loadDoctorSchedule(doctorId);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading doctors...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Book an Appointment</h1>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search Doctor</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 text-gray-700 dark:text-gray-100 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full text-gray-700 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-900"
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{doctor.fullName}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.experience} years experience</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDoctorExpand(doctor.id)}
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  {expandedDoctor === doctor.id ? 'Hide Schedule' : 'View Schedule'}
                </button>
              </div>

              {/* Doctor Schedule */}
              {expandedDoctor === doctor.id && doctorSchedules[doctor.id] && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Weekly Schedule</h4>
                  <div className="space-y-2">
                    {Object.entries(doctorSchedules[doctor.id]).map(([day, schedule]) => (
                      <div key={day} className="flex items-center justify-between text-sm">
                        <span className="capitalize text-gray-600 dark:text-gray-400">{day}</span>
                        <div className="flex items-center space-x-2">
                          {schedule.isWorking ? (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-gray-600 dark:text-gray-400">
                                {schedule.slots.length} slot{schedule.slots.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-gray-600 dark:text-gray-400">Not available</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Slots for Selected Date */}
              {selectedDate && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Available Slots for {new Date(selectedDate).toLocaleDateString()}
                  </h4>
                  {isDoctorAvailable(doctor) ? (
                    <div className="grid grid-cols-2 gap-2">
                      {getAvailableSlots(doctor).map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSlotSelection(doctor.id, slot)}
                          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                            selectedDoctorId === doctor.id && selectedSlot === slot
                              ? "bg-primary text-white border-primary"
                              : "text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <Clock className="inline-block w-4 h-4 mr-1" />
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                      {doctorSchedules[doctor.id] ? 'No available slots for this date' : 'Schedule not loaded'}
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleBookAppointment(doctor.id)}
                className="w-full mt-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                disabled={!selectedDate || !selectedSlot || selectedDoctorId !== doctor.id}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No doctors found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default BookDoctor;
