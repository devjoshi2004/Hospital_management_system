import EditPatientPage from "@/components/dashboard/patient/EditPatientPage";

export default async function EditPatient({params}) {
  const patientId = (await params).editPatient
  return <EditPatientPage patientId={patientId} />;
}
