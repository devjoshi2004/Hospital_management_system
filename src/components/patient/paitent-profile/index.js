"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";

const PatientProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

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

  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedUserId = JSON.parse(localStorage.getItem("user"));

    if (storedUserId) {
      setUserId(storedUserId);

      axiosInstance(`/patient/${storedUserId.id}`)
        .then((response) => {
          const userData = response.data;
          setProfile({
            fullName: userData?.fullName || "",
            email: userData?.email || "",
            phone: userData?.phone || "",
          });
          setCurrentPassword(userData?.password)
        })
        .catch((error) => console.error("Error fetching user data:", error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);
  

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await axiosCoInstance.patch(`/patient/${userId.id}`, {
        fullName: profile.fullName,
        email: profile.email,
        phone: profile.phone,
      });

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const updatedUser = { ...storedUser, ...profile };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!userId) return;

    if(currentPassword !== passwordData.currentPassword){
      console.log("password is not match with Current Password");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      console.log("password is not match with confirm password");
      
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/patient/${userId.id}`,
        {
          // currentPassword: passwordData.currentPassword,
          password: passwordData.newPassword,
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
        setMessage({ type: "error", text: "Failed to update password!" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error updating password!" });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary hover:text-primary/90"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Full Name */}
                <div className="flex items-center">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={profile.fullName}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="mt-1 block w-full text-black dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-900"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="mt-1 block w-full text-black dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-900"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      readOnly={!isEditing}
                      className="mt-1 block w-full text-black dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-gray-900"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-primary text-white px-4 py-2 rounded-lg"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </form>

            {/* Change Password Section */}
            <div className="border-t dark:border-gray-700 pt-6 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Change Password
              </h2>

              {/* {passwordMessage && (
                <p
                  className={`text-sm ${
                    passwordMessage.type === "error"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {passwordMessage.text}
                </p>
              )} */}

              <form onSubmit={handlePasswordChange} className="space-y-4">
                {/* Current Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.currentPassword ? "text" : "password"}
                    placeholder="Current Password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full text-black dark:text-gray-100 pl-10 pr-10 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 dark:bg-gray-900"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility("currentPassword")}
                  >
                    {showPassword.currentPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.newPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full text-black dark:text-gray-100 pl-10 pr-10 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 dark:bg-gray-900"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility("newPassword")}
                  >
                    {showPassword.newPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                {/* Confirm New Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full pl-10 pr-10 text-black dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 dark:bg-gray-900"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>

                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
