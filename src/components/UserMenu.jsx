import { Link } from "react-router-dom";

const UserMenu = ({ isDropdownOpen, toggleDropdown }) => {
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
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-lg z-50">
          <div className="px-4 py-3">
            <span className="block text-sm">Bonnie Green</span>
            <span className="block text-xs text-gray-500 truncate">
              name@flowbite.com
            </span>
          </div>
          <ul className="py-2">
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                to="/earnings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Earnings
              </Link>
            </li>
            <li>
              <Link
                to="/signout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
