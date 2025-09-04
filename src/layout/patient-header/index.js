"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, Calendar, FileText, Home } from "lucide-react";
import Logout from "../../components/auth/logout/Logout";
import ThemeToggle from "@/components/theme/ThemeToggle";

const PatientHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const router = useRouter();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/patient" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/patient"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/patient/patient-bookings"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <FileText size={18} />

              <span>My Bookings</span>
            </Link>
            <Link
              href="/patient/book-doctor"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Calendar size={18} />

              <span>Book Appointment</span>
            </Link>
            <Link
              href="/patient/profile"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>

            <ThemeToggle />
            <Logout />
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-gray-600 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/patient"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Home size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/patient/patient-bookings"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <Calendar size={18} />
              <span>My Bookings</span>
            </Link>
            <Link
              href="/patient/book-doctor"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <FileText size={18} />
              <span>Book Appointment</span>
            </Link>
            <Link
              href="/patient/profile"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full justify-center"
            >
              <User size={18} />
              <span>Profile</span>
            </Link>

            <Logout />

          </div>
        )}
      </nav>
    </header>
  );
};

export default PatientHeader;
