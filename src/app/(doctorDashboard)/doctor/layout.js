import DoctorHeader from "@/layout/doctor-header";

export default function PatientDahsboardLayout({ children }) {
    return (
    
      <div>
      <main>
      <DoctorHeader />
      {children}</main>
      </div>
    
    )
  }