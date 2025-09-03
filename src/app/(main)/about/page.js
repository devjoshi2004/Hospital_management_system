// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
import { Award, Users, Building2, Clock } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Patients Served",
  },
  {
    icon: Award,
    value: "50+",
    label: "Specialist Doctors",
  },
  {
    icon: Building2,
    value: "15+",
    label: "Departments",
  },
  {
    icon: Clock,
    value: "24/7",
    label: "Emergency Service",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      

      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">About MediCare</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Providing quality healthcare services with compassion and excellence since 2000.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                To provide exceptional healthcare services that improve the quality of life for our patients and their families through compassionate care, innovative technology, and evidence-based practices.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We strive to be the healthcare provider of choice by delivering excellence in patient care, medical education, and clinical research.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Expert Doctors</h3>
                <p className="text-gray-600 dark:text-gray-300">Our team consists of highly qualified and experienced medical professionals dedicated to your care.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Modern Technology</h3>
                <p className="text-gray-600 dark:text-gray-300">We utilize the latest medical technology and equipment to provide the best possible care.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Patient-Centered Care</h3>
                <p className="text-gray-600 dark:text-gray-300">We prioritize patient comfort and satisfaction in every aspect of our service.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default About;
