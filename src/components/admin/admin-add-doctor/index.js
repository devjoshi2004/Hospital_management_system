"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import axios from "axios";
import autoId from "@/utils/autoId";

const AddDoctor = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    specialty: "",
    experience: "",
  });

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]:e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const addPatient = await axios
        .post("http://localhost:3001/doctor", {
          id: autoId(),
          fullName: formData?.fullName || "",
          email: formData?.email || "",
          role: "doctor",
          phone: formData?.phone || "",
          gender: formData?.gender || "",
          specialty: formData?.specialty || "",
          experience: formData?.experience || "",
          password: formData?.password || "",
        })
        .then((res) => {
          return res;
        });
    }catch(error){
      console.log("addDoctor", error);
      
    }


    router.push("/admin/doctors");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Add New Doctor</h1>
          <button onClick={() => router.push("/admin/doctors")} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Honeypot fields to discourage browser autofill/password managers */}
            <input
              type="text"
              name="username"
              autoComplete="username"
              tabIndex="-1"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, opacity: 0 }}
            />
            <input
              type="password"
              name="current-password"
              autoComplete="current-password"
              tabIndex="-1"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", top: "-9999px", height: 0, width: 0, opacity: 0 }}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter your email"
                autoComplete="new-email"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                autoComplete="new-password"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                placeholder="Enter your phone number"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Gender</label>
              <select
                value={formData.gender}
                name="gender"
                placeholder="Select your gender"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
               
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Specialty</label>
              <select
                value={formData.specialty}
                name="specialty"
                placeholder="Select your specialty"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Specialty</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="neurology">Neurology</option>
                <option value="orthopedics">Orthopedics</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                placeholder="Enter your years of experience"
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:ring-primary bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex-1 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Add Doctor
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/doctors")}
                className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
