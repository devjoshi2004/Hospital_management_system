"use client";

import Link from "next/link";
import RegistrationPatientForm from "../register-patient-form/RegistrationPatientForm";
import { useEffect, useState } from "react";
import RegistrationDoctorForm from "../register-doctor-form/RegistrationDoctorForm";

const Register = () => {

  const [userRole, setUserRole] = useState("patient");

  return (
    <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:text-primary/80"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Register As
        </label>
        <select
          value={userRole}
          name="role"
          onChange={(e) => setUserRole(e.target.value)}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 dark:bg-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>
      </div>

      {userRole === "patient" ? <RegistrationPatientForm /> : <RegistrationDoctorForm />}
    </div>
  );
};

export default Register;
