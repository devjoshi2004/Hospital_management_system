"use client";

import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { editDoctor } from "@/redux/slices/adminSlice";
import axiosInstance from "@/utils/axiosInstance";

const EditDoctorPage = ({doctorId}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.admin.doctors);
  
  const [doctorData, setDoctorData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
  });

  useEffect(() => {
    
    const existingDoctor = doctors.find((doc) => doc.id === doctorId);
    if (existingDoctor) {
      setDoctorData(existingDoctor);
    } else {
      axiosInstance.get(`/doctor/${doctorId}`).then((response) => {
        setDoctorData(response.data);
      });
    }
  }, [doctorId, doctors]);

  const handleChange = (e) => {
    setDoctorData({
      ...doctorData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editDoctor({ doctorId, updatedData: doctorData })).unwrap();
      router.push("/admin/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Doctor Profile</h1>
          <button onClick={() => router.push("/admin/doctors")} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                value={doctorData.fullName} 
                onChange={handleChange} 
                className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input 
                type="email" 
                name="email" 
                value={doctorData.email} 
                onChange={handleChange} 
                className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input 
                type="tel" 
                name="phone" 
                value={doctorData.phone} 
                onChange={handleChange} 
                className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialty</label>
              <input 
                type="text" 
                name="specialty" 
                value={doctorData.specialty} 
                onChange={handleChange} 
                className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience (Years)</label>
              <input 
                type="number" 
                name="experience" 
                value={doctorData.experience} 
                onChange={handleChange} 
                className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary" 
              />
            </div>
            <div className="flex space-x-3">
              <button type="submit" className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">Save Changes</button>
              <button type="button" onClick={() => router.push("/admin/doctors")} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditDoctorPage;
