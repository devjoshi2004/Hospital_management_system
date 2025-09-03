"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, LogOut, UserPlus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        dispatch(setUser(JSON.parse(storedUser)));
      }
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold">MediCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`transition-colors font-medium ${
                  pathname === item.path
                    ? "text-[#4AC4AC]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#4AC4AC]"
                }`}
              >
                {item.name}
              </Link>
            ))}

            <ThemeToggle />

            <Link
              href="/login"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <User size={18} />
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <UserPlus size={18} />
              <span>Register</span>
            </Link>
          </div>

          {/* Mobile Right Controls */}
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
          <div className="md:hidden py-4 space-y-4 animate-fadeIn">
            {[
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block transition-colors font-medium ${
                  pathname === item.path
                    ? "text-[#4AC4AC]"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#4AC4AC]"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/login"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors w-full justify-center"
            >
              
              <span>Login</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full hover:bg-primary/90 transition-colors w-full justify-center"
            >
              
              <span>Register</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
