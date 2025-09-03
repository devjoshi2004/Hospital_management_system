"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookOpen, Calendar, User, FileSymlink } from "lucide-react";

const HomePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Fetch user from localStorage

    if (user) {
      // 🚀 Redirect based on role
      if (user.role === "admin") {
        router.replace("/admin");
      } else if (user.role === "doctor") {
        router.replace("/doctor");
      } else if (user.role === "patient") {
        router.replace("/patient");
      }
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="text-center py-6">Checking authentication...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#d4edda] to-white dark:from-gray-800 dark:to-gray-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Your Health Is Our
                <span className="text-primary"> Top Priority</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Experience world-class healthcare with our team of experienced
                medical professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/appointments"
                  className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
                >
                  Book Appointment
                </Link>
                <Link
                  href="/services"
                  className="bg-white dark:bg-gray-800 text-primary px-6 py-3 rounded-full border border-primary dark:border-primary hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Why Choose MediCare?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                We provide comprehensive healthcare services with a focus on
                patient comfort and advanced medical technologies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <User className="w-8 h-8 text-primary" />,
                  title: "Expert Doctors",
                  description:
                    "Our team consists of highly qualified and experienced medical professionals.",
                },
                {
                  icon: <Calendar className="w-8 h-8 text-primary" />,
                  title: "Easy Scheduling",
                  description:
                    "Book appointments online with our convenient scheduling system.",
                },
                {
                  icon: <FileSymlink className="w-8 h-8 text-primary" />,
                  title: "Digital Records",
                  description:
                    "Access your medical records and test results securely online.",
                },
                {
                  icon: <BookOpen className="w-8 h-8 text-primary" />,
                  title: "Health Resources",
                  description:
                    "Access our extensive library of health information and resources.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who trust us with their
              healthcare needs.
            </p>
            <Link
              href="/login"
              className="inline-block bg-white dark:bg-gray-900 text-primary dark:text-white px-8 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
