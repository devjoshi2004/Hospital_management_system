import { Stethoscope, Brain, Syringe, Pill, Microscope, HeartPulse } from "lucide-react";

const services = [
  {
    icon: Stethoscope,
    title: "General Health Checkup",
    description: "Comprehensive health screenings and preventive care services.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Expert diagnosis and treatment of neurological conditions.",
  },
  {
    icon: HeartPulse,
    title: "Cardiology",
    description: "Advanced cardiac care and heart disease treatment.",
  },
  {
    icon: Pill,
    title: "Emergency Care",
    description: "24/7 emergency medical services with rapid response.",
  },
  {
    icon: Microscope,
    title: "Laboratory Services",
    description: "State-of-the-art diagnostic testing and lab work.",
  },
  {
    icon: Syringe,
    title: "Vaccination",
    description: "Complete range of vaccines for all age groups.",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              We provide comprehensive healthcare services with state-of-the-art facilities and experienced medical professionals.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <service.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Services;
