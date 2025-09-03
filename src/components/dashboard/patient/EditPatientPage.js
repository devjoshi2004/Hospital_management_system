'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, Calendar } from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance';
import { useDispatch } from 'react-redux';

const EditPatientPage = ({patientId}) => {

  // console.log("edit form id ", patientId);
  const [patientData, setPatientData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    lastVisit: "",
  });
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {

    axiosInstance(`/patient/${patientId}`)
    .then((response) => {
      const userData = response.data;
      setPatientData({
        fullName: userData?.fullName || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        age: userData?.age || "",
        lastVisit: userData?.lastVisit || "",
      })
    })

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const res = await axiosInstance.patch(`patient/${patientId}`,{
        fullName: patientData.fullName,
        email: patientData.email,
        phone: patientData.phone,
        age: patientData.age,
        lastVisit: patientData.lastVisit,
      })
      console.log(res);
      
    }catch(error){
      console.log("editpatientPage", error);
      
    }

    router.push('/admin/patients'); // Navigate back to admin dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Patient</h1>
              {/* <button onClick={() => router.push('/admin/patients')} className="text-gray-600 hover:text-gray-900">
                Cancel
              </button> */}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    type="text"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                    className="mt-1 block text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 w-full rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={patientData.email}
                    onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                    className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                    className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                  />
                </div>
              </div>


              <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Visit</label>
                  <input
                    type="date"
                    value={patientData.lastVisit}
                    onChange={(e) => setPatientData({ ...patientData, lastVisit: e.target.value })}
                    className="mt-1 block w-full text-gray-700 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:focus:border-primary dark:focus:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin/patients')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;
