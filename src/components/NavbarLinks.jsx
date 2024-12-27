import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavbarLinks = ({ isMobile = false, onCloseMobileMenu = () => {} }) => {
  const handleClick = () => {
    onCloseMobileMenu();
  };

  return (
    <div className={isMobile ? "flex flex-col" : "hidden md:flex space-x-8"}>
      <Link
        to="/"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        Dashboard
      </Link>
      <Link
        to="/expenses"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        Expenses
      </Link>
      <Link
        to="/budget"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        Budget
      </Link>
      <Link
        to="/utilities"
        className="text-gray-900 dark:text-white py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
        onClick={handleClick}
      >
        Utilities
      </Link>
    </div>
  );
};
NavbarLinks.propTypes = {
  onCloseMobileMenu: PropTypes.func,
  isMobile: PropTypes.bool,
};

export default NavbarLinks;
