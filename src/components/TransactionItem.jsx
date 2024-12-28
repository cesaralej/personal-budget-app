import { useState } from "react";
import { HiPlusSm, HiMinusSm, HiPencil, HiTrash } from "react-icons/hi";
import {
  FaShoppingCart,
  FaHome,
  FaLightbulb,
  FaTaxi,
  FaCreditCard,
  FaWallet,
  FaCoins,
} from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { GiPartyPopper } from "react-icons/gi";
import PropTypes from "prop-types";

const categoryIcons = {
  groceries: <FaShoppingCart />,
  utilities: <FaLightbulb />,
  food: <MdRestaurant />,
  luxury: <IoSparkles />,
  investment: <FaHome />,
  transportation: <FaTaxi />,
  other: <FaCoins />,
  salary: <FaSackDollar />,
  fun: <GiPartyPopper />,
};

const categoryColors = {
  groceries: "bg-green-100", // Very light red
  utilities: "bg-blue-100", // Very light blue
  food: "bg-orange-100", // Very light yellow
  luxury: "bg-purple-100", // Very light purple
  investment: "bg-red-100", // Very light green
  transportation: "bg-yellow-100", // Very light orange
  other: "bg-indigo-100", // Very light indigo
  salary: "bg-green-100",
  fun: "bg-red-100",
};

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleDelete = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this transaction?")) {
        await onDelete(transaction.id);
        alert("Transaction deleted!");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction.");
    }
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const categoryIcon = categoryIcons[transaction.category] || <FaCoins />;

  const categoryColor = categoryColors[transaction.category] || "bg-gray-50"; // Default light gray
  const accountIcon =
    transaction.account === "savings" ? <FaWallet /> : <FaCreditCard />;

  const amountStyle =
    transaction.type === "income" ? "text-green-500" : "text-red-500"; // Conditional amount color
  const cardStyle =
    transaction.type === "income"
      ? `bg-green-50/10 border-green-500/30 border-2 hover:bg-green-50`
      : transaction.isCreditCardPayment
      ? `bg-purple-50/10 border-purple-500/30 border-2 hover:bg-purple-50`
      : `bg-white hover:bg-gray-50 hover:border-gray-300`; // Merged conditional card style

  return (
    <div
      className={`rounded-lg shadow-md p-4  ${cardStyle} hover:shadow-lg hover:scale-101 transition-all duration-200`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${categoryColor} shrink-0`}
        >
          {categoryIcon}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-lg font-semibold block">
                {truncateText(transaction.description, 20)}
              </span>{" "}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                {accountIcon}
                <span>
                  {transaction.account.charAt(0).toUpperCase() +
                    transaction.account.slice(1)}
                </span>
              </div>
              {/* Make description block level */}
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center">
                {transaction.type === "income" ? (
                  <HiPlusSm className="text-green-500 h-5 w-5" />
                ) : (
                  <HiMinusSm className="text-red-500 h-5 w-5" />
                )}
                <span
                  className={`text-lg font-semibold ${amountStyle} block text-right`}
                >
                  {transaction.amount}€
                </span>
              </div>
              <div className="relative h-6">
                {isHovering && (
                  <div className="flex gap-1 absolute top-0 right-0 p-1 rounded-md">
                    <button
                      disabled
                      className="text-gray-400 cursor-not-allowed"
                    >
                      <HiPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-red-500 hover:text-red-700"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {transaction.comment && (
        <div className="text-gray-500 text-sm mt-2 ml-4">
          Comment: {transaction.comment}
        </div>
      )}
    </div>
  );
};
TransactionItem.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
    date: PropTypes.shape({
      toLocaleDateString: PropTypes.func.isRequired,
    }),
    comment: PropTypes.string,
    isCreditCardPayment: PropTypes.bool,
  }).isRequired,
};

export default TransactionItem;
