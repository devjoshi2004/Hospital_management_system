"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Wallet, Award, Lock, Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
  });

  const [isLoading, setIsLoading] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("")
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  // const [passwordMessage, setPasswordMessage] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem("user"));

    if(storedUserId){
      setUserId(storedUserId);

      axiosInstance(`/doctor/${storedUserId.id}`)
      .then((response) => {
        const userData = response.data;
        setProfileData({
          fullName: userData?.fullName || "",
          email: userData?.email || "",
          phone: userData?.phone || "",
          specialty: userData?.specialty || "",
          experience: userData?.experience || "",
        });
        setCurrentPassword(userData?.password)
      })
      .catch((error) => console.error("Error fetching user data:", error))
      .finally(() => setIsLoading(false));
    }else{
      setIsLoading(false);
    }

  },[])

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    })
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!userId) return;

    try {
      
      await axiosInstance.patch(`/doctor/${userId.id}`, {
        fullName: profileData.fullName,
        email: profileData.email,
        phone: profileData.phone,
        specialty: profileData.specialty,
        experience: profileData.experience,
      });

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...storedUser, ...profileData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditing(false);

    } catch (error) {
      console.log(error);
      
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if(!userId) return;

    if(currentPassword !== passwordData.currentPassword){
      console.log("password is not match with Current Password");
      return;
    }


    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.log("New passwords do not match with confirm password!");
      return;
    }

    try {
      const response = await axiosInstance.patch(`/doctor/${userId.id}`,{
       password: passwordData.newPassword 
      }
    );

    if (response.status === 200) {
      // setMessage({ type: "success", text: "Password updated successfully!" });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      console.log({ type: "error", text: "Failed to update password!" });
    }
      
    } catch (error) {
      console.log(error);
    }


    // Clear password fields
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Doctor Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary hover:text-primary/90"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={profileData.email}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      readOnly={!isEditing}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                    />
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Change Password Section */}
            <div className="border-t dark:border-gray-700 pt-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Change Password</h2>

              {/* {passwordMessage && (
                <p className={`text-sm ${passwordMessage.type === "error" ? "text-red-500" : "text-green-500"}`}>
                  {passwordMessage.text}
                </p>
              )} */}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* Current Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.currentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 pl-10 pr-10 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility("currentPassword")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword.currentPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    placeholder="New Password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 pl-10 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility("newPassword")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword.newPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white dark:bg-gray-900 pl-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2"
                  />
                  <button type="button" onClick={() => togglePasswordVisibility("confirmPassword")} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {showPassword.confirmPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                  </button>
                </div>

                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg">Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
