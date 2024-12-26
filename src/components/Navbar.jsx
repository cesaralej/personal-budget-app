import { useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import UserMenu from "./UserMenu";
import NavbarLinks from "./NavbarLinks";
import MobileMenuToggle from "./MobileMenuToggle";

const Navbar = () => {
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
        <NavbarLinks />

        {/* User Menu and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          <UserMenu
            isDropdownOpen={isDropdownOpen}
            toggleDropdown={toggleDropdown}
          />
          <MobileMenuToggle
            isMobileMenuOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <NavbarLinks isMobile />}
    </nav>
  );
};

export default Navbar;
