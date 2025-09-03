import PatientHeader from "@/layout/patient-header";

export default function PatientDahsboardLayout({ children }) {
    return (
    
      <div>
      <main>
      <PatientHeader />
      {children}</main>
      </div>
    
    )
  }