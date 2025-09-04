"use client";

import { useState } from "react";
import { Calendar, Clock, Search } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

const BookDoctor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  // const { toast } = useToast();

  // Mock data for doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15 years",
      rating: 4.8,
      availableDates: ["2024-02-25", "2024-02-26", "2024-02-27"],
      availableSlots: ["09:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"],
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Dermatologist",
      experience: "10 years",
      rating: 4.5,
      availableDates: ["2024-02-25", "2024-02-26", "2024-02-27"],
      availableSlots: ["11:00 AM", "1:00 PM", "4:00 PM"],
    },
  ];

  const specialties = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Orthopedic",
  ];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleSlotSelection = (doctorId, slot) => {
    setSelectedDoctorId(doctorId);
    setSelectedSlot(slot);
  };

  const handleBookAppointment = (doctorId) => {
    if (!selectedSlot) {
      // toast({ title: "Please select a time slot", variant: "destructive" });
      return;
    }
    if (!selectedDate) {
      // toast({ title: "Please select a date", variant: "destructive" });
      return;
    }
    const doctor = doctors.find((d) => d.id === doctorId);
    // Success message and reset could go here
    setSelectedDoctorId(null);
    setSelectedSlot(null);
  };

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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{doctor.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{doctor.specialty}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{doctor.experience} experience</p>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Slots</h4>
                <div className="grid grid-cols-2 gap-2">
                  {doctor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelection(doctor.id, slot)}
                      className={`px-3 py-2 text-sm border rounded-lg transition-colors ${selectedDoctorId === doctor.id && selectedSlot === slot ? "bg-primary text-white border-primary" : "text-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                    >
                      <Clock className="inline-block w-4 h-4 mr-1" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
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
      </div>
    </div>
  );
};

export default BookDoctor;
