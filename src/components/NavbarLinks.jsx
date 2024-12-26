import { Link } from "react-router-dom";

const NavbarLinks = ({ isMobile }) => {
  return (
    <div className={isMobile ? "flex flex-col" : "hidden md:flex space-x-8"}>
      <Link
        to="/"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Dashboard
      </Link>
      <Link
        to="/expenses"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Expenses
      </Link>
      <Link
        to="/budget"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Budget
      </Link>
      <Link
        to="/utilities"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        Utilities
      </Link>
    </div>
  );
};

export default NavbarLinks;
