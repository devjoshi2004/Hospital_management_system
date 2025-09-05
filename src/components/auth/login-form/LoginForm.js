"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("Select Role");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: userRole,
  });

  useEffect(() => {
    if (auth) {
      router.push(`/${auth.role}`);
    }
  }, [auth, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if(formData.role){
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role || formData.role === "Select Role") {
      setError("please select a valid role");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:3001/${formData.role}`
      );
      const users = response.data;

      if (!users || users.length === 0) {
        setError("No user found");
        return;
      }

      const user = users.find(
        (u) => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password");
        return;
      }

      dispatch(login(user));
      setError("");

      router.push(`/${user.role}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Or{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary/80"
          >
            create a new account
          </Link>
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <p className="text-red-500 text-center text-sm mb-3">{error}</p>
        )}

        <div className="space-y-4">
          {/* User Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Login As
            </label>
            <select
              value={formData.role}
              name="role"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary text-black dark:text-gray-100 dark:bg-gray-900"
            >
              <option>Select Role</option>
              <option value="admin">Admin</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 text-black dark:text-gray-100 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900"
                placeholder="Email address"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 text-black dark:text-gray-100 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-primary focus:border-primary dark:bg-gray-900"
                placeholder="Password"
              />
              <button
                type="button"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-primary"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
