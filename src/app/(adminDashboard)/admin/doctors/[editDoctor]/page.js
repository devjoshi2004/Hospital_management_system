import EditDoctor from "@/components/admin/admin-edit-doctor";

export default async function EditPatient({ params }) {
  const doctorId = (await params).editDoctor
  return <EditDoctor doctorId={doctorId} />;
}
