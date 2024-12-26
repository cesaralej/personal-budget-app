import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import UserMenu from "./UserMenu";
import NavbarLinks from "./NavbarLinks";
import MobileMenuToggle from "./MobileMenuToggle";
import { FaMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <FaMoneyBillAlt className="h-8 w-8 text-blue-600" />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            Budget
          </span>
        </div>
        {/* Navbar Links for Desktop */}
        {user && <NavbarLinks />}
        {/* User Menu / Sign In Button */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div>Loading...</div> // Show loading indicator
          ) : error ? (
            <div>Error: {error.message}</div> // Show error message
          ) : user ? (
            <UserMenu
              isDropdownOpen={isDropdownOpen}
              toggleDropdown={toggleDropdown}
              user={user} // Pass the user prop
            />
          ) : (
            <Link to="/login" className="text-blue-500 hover:text-blue-700">
              Sign In
            </Link>
          )}

          {user && (
            <MobileMenuToggle
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {user && isMobileMenuOpen && <NavbarLinks isMobile />}
    </nav>
  );
};

export default Navbar;
