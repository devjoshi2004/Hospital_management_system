import EditPatient from "@/components/admin/admin-edit-patient";

export default async function EditPatientPage({params}) {
  const patientId = (await params).editPatient
  return <EditPatient patientId={patientId} />;
}
