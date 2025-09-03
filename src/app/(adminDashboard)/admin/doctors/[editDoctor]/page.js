import EditDoctorPage from "@/components/dashboard/doctor/EditDoctorPage";

export default async function EditPatient({ params }) {
  const doctorId = (await params).editDoctor
  return <EditDoctorPage doctorId={doctorId} />;
}
