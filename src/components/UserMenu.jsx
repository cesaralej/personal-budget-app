import { useEffect, useRef } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserMenu = ({ isDropdownOpen, toggleDropdown, user }) => {
  const navigate = useNavigate(); // Use useNavigate hook
  const dropdownRef = useRef(null); // Create a ref

  const handleSignOut = async () => {
    try {
      await auth.signOut().then(() => navigate("/login"));
      toggleDropdown();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleLinkClick = () => {
    toggleDropdown(); // Close the dropdown when a link is clicked
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        toggleDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, toggleDropdown]); // Add toggleDropdown to dependency array

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg z-50"
          ref={dropdownRef}
        >
          <div className="px-4 py-3">
            <span className="block text-sm">
              {user.displayName || user.email}
            </span>
            <span className="block text-xs text-gray-500 truncate">
              {user.email}
            </span>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleLinkClick}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-600  w-full text-left"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

UserMenu.propTypes = {
  isDropdownOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  user: PropTypes.shape({
    // Define the shape of the user object
    uid: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    displayName: PropTypes.string, // displayName is optional
    // Add other user properties as needed (e.g., photoURL)
    photoURL: PropTypes.string,
    emailVerified: PropTypes.bool,
  }).isRequired,
};

export default UserMenu;
