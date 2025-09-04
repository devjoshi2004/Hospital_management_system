"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar as CalendarIcon, Clock, Plus, X, Save, Trash2 } from "lucide-react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  fetchDoctorSchedule,
  addDoctorSchedule,
  updateDoctorSchedule,
  fetchDoctorHolidays,
  addDoctorHoliday,
  deleteDoctorHoliday,
  clearError,
  clearSuccess,
  updateLocalSchedule,
  addLocalHoliday,
  removeLocalHoliday,
} from "@/redux/slices/doctorSlice";

const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const { 
    doctorSchedule, 
    doctorHolidays, 
    loading, 
    error, 
    success,
    currentDoctor,
    currentScheduleId 
  } = useSelector((state) => state.doctor);

  const [selectedDay, setSelectedDay] = useState(null);
  const [editingSlots, setEditingSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [newHoliday, setNewHoliday] = useState({ date: "", reason: "" });

  // Initialize default schedule structure
  const defaultSchedule = {
    monday: { isWorking: true, slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"] },
    tuesday: { isWorking: true, slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"] },
    wednesday: { isWorking: true, slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"] },
    thursday: { isWorking: true, slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"] },
    friday: { isWorking: true, slots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM"] },
    saturday: { isWorking: false, slots: [] },
    sunday: { isWorking: false, slots: [] },
  };

  const schedule = Object.keys(doctorSchedule).length > 0 ? doctorSchedule : defaultSchedule;

  // Load doctor data and schedule on component mount
  useEffect(() => {
    const doctorId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    if (doctorId) {
      // Try to load schedule even if userRole is not 'doctor' (fallback)
      dispatch(fetchDoctorSchedule(doctorId));
      dispatch(fetchDoctorHolidays(doctorId));
      
      if (userRole !== 'doctor') {
        console.warn("User role is not 'doctor', but attempting to load schedule with doctorId:", doctorId);
      }
    } else {
      console.error("No userId found in localStorage");
      // Show a more user-friendly error message
      toast.error("Please login to access schedule management", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
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

  const handleEditSlots = (day) => {
    setSelectedDay(day);
    setEditingSlots([...schedule[day].slots]);
  };

  const handleAddSlot = () => {
    if (newSlot.start && newSlot.end) {
      // Convert to 12-hour format for display
      const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
      };

      const slotString = `${formatTime(newSlot.start)} - ${formatTime(newSlot.end)}`;
      
      // Check for overlapping slots
      const hasOverlap = editingSlots.some(slot => {
        // Simple overlap check - in a real app, you'd want more sophisticated validation
        return slot.includes(newSlot.start) || slot.includes(newSlot.end);
      });

      if (!hasOverlap) {
        setEditingSlots([...editingSlots, slotString]);
        setNewSlot({ start: "", end: "" });
        toast.success('Time slot added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('Time slot overlaps with existing slot. Please choose different times.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleRemoveSlot = (index) => {
    setEditingSlots(editingSlots.filter((_, i) => i !== index));
  };

  const handleSaveSlots = async () => {
    const doctorId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    
    // More flexible authentication check - allow if userRole is 'doctor' or if we have a valid doctorId
    if (!doctorId) {
      console.error("No doctor ID found in localStorage");
      toast.error("Please login to manage your schedule", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    // If userRole is not 'doctor', try to use the doctorId anyway (fallback)
    if (userRole && userRole !== 'doctor') {
      console.warn("User role is not 'doctor', but proceeding with doctorId:", doctorId);
    }

    const updatedSchedule = {
      ...schedule,
      [selectedDay]: {
        ...schedule[selectedDay],
        slots: editingSlots,
        isWorking: editingSlots.length > 0
      }
    };


    // Update local state immediately for better UX
    dispatch(updateLocalSchedule({ day: selectedDay, schedule: updatedSchedule[selectedDay] }));

    try {
      if (currentScheduleId) {
        // Update existing schedule
        await dispatch(updateDoctorSchedule({ 
          id: currentScheduleId, 
          scheduleData: { 
            doctorId, 
            schedule: updatedSchedule 
          } 
        })).unwrap();
      } else {
        // Create new schedule
        await dispatch(addDoctorSchedule({ 
          doctorId, 
          schedule: updatedSchedule 
        })).unwrap();
      }
    } catch (error) {
      console.error('Failed to save schedule:', error);
    }

    setSelectedDay(null);
    setEditingSlots([]);
  };

  const handleCancelEdit = () => {
    setSelectedDay(null);
    setEditingSlots([]);
    setNewSlot({ start: "", end: "" });
  };

  const handleAddHoliday = async () => {
    if (newHoliday.date && newHoliday.reason) {
      const doctorId = localStorage.getItem('userId');
      if (!doctorId) return;

      // Check for duplicate dates
      const isDuplicate = doctorHolidays.some(holiday => holiday.date === newHoliday.date);
      
      if (!isDuplicate) {
        try {
          const holidayData = {
            doctorId,
            date: newHoliday.date,
            reason: newHoliday.reason
          };
          
          await dispatch(addDoctorHoliday(holidayData)).unwrap();
          setNewHoliday({ date: "", reason: "" });
          setShowHolidayModal(false);
        } catch (error) {
          console.error('Failed to add holiday:', error);
        }
      } else {
        toast.error('A holiday already exists for this date. Please choose a different date.', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  const handleRemoveHoliday = async (id) => {
    try {
      await dispatch(deleteDoctorHoliday(id)).unwrap();
    } catch (error) {
      console.error('Failed to remove holiday:', error);
    }
  };

  const handleCancelHoliday = () => {
    setNewHoliday({ date: "", reason: "" });
    setShowHolidayModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading schedule...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">Schedule Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Schedule */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Weekly Schedule</h2>
            <div className="space-y-4">
              {Object.entries(schedule).map(([day, { isWorking, slots }]) => (
                <div key={day} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isWorking}
                        className="rounded border-gray-300 dark:border-gray-700 text-primary focus:ring-primary"
                        readOnly
                      />
                      <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">{day}</span>
                    </div>
                    <button
                      onClick={() => handleEditSlots(day)}
                      className="text-primary hover:text-primary/90"
                    >
                      Edit Slots
                    </button>
                  </div>
                  {isWorking && (
                    <div className="pl-8 space-y-2">
                      {slots.map((slot, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="w-4 h-4 mr-2" />
                          {slot}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Holidays and Leave */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Holidays & Leave</h2>
              <button 
                onClick={() => setShowHolidayModal(true)}
                className="flex items-center text-primary hover:text-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Holiday
              </button>
            </div>
            <div className="space-y-4">
              {doctorHolidays.map((holiday) => (
                <div
                  key={holiday.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <CalendarIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{holiday.date}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{holiday.reason}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveHoliday(holiday.id)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="Remove holiday"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
              {doctorHolidays.length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No holidays scheduled</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Click "Add Holiday" to schedule time off</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit Slots Modal */}
        {selectedDay && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Edit Slots - {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
                  </h3>
                  <button
                    onClick={handleCancelEdit}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Current Slots */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Time Slots
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {editingSlots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                        <span className="text-sm text-gray-900 dark:text-gray-100">{slot}</span>
                        <button
                          onClick={() => handleRemoveSlot(index)}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {editingSlots.length === 0 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">No time slots added</p>
                    )}
                  </div>
                </div>

                {/* Add New Slot */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add New Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="time"
                        value={newSlot.start}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, start: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                        placeholder="Start time"
                      />
                    </div>
                    <div>
                      <input
                        type="time"
                        value={newSlot.end}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, end: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                        placeholder="End time"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleAddSlot}
                    className="mt-2 flex items-center text-primary hover:text-primary/90 text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Slot
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelEdit}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSaveSlots();
                    }}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Holiday Modal */}
        {showHolidayModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Add Holiday / Leave
                  </h3>
                  <button
                    onClick={handleCancelHoliday}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newHoliday.date}
                      onChange={(e) => setNewHoliday(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary"
                      min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Reason
                    </label>
                    <input
                      type="text"
                      value={newHoliday.reason}
                      onChange={(e) => setNewHoliday(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="e.g., Personal Leave, Conference, Vacation"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-primary focus:border-primary placeholder-gray-500 dark:placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleCancelHoliday}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddHoliday}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Holiday
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorSchedule;
