import { useState } from "react";
import { HiPlusSm, HiMinusSm, HiPencil, HiTrash } from "react-icons/hi";
import {
  FaShoppingCart,
  FaHome,
  FaLightbulb,
  FaTaxi,
  FaMoneyBillWave,
  FaCreditCard,
  FaWallet,
} from "react-icons/fa";
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
  other: <HiPlusSm />,
  salary: <FaMoneyBillWave />,
  fun: <GiPartyPopper />,
};

const categoryColors = {
  groceries: "bg-green-50", // Very light red
  utilities: "bg-blue-50", // Very light blue
  food: "bg-orange-50", // Very light yellow
  luxury: "bg-purple-50", // Very light purple
  investment: "bg-red-50", // Very light green
  transportation: "bg-yellow-50", // Very light orange
  other: "bg-indigo-50", // Very light indigo
  salary: "bg-green-50",
  fun: "bg-red-50",
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

  const formattedDate = transaction.date.toLocaleDateString();

  const categoryIcon = categoryIcons[transaction.category] || <HiPlusSm />;

  const categoryColor = categoryColors[transaction.category] || "bg-gray-50"; // Default light gray
  const accountIcon =
    transaction.account === "savings" ? <FaWallet /> : <FaCreditCard />;

  const amountStyle = transaction.type === "income" ? "text-green-500" : ""; // Conditional amount color
  const cardStyle =
    transaction.type === "income"
      ? `bg-green-50/10 border-green-500/30 border-2`
      : `bg-white" ${categoryColor}`; // Conditional card style

  return (
    <div
      className={`rounded-lg shadow-md p-4 flex flex-col gap-2 ${cardStyle}  hover:shadow-lg hover:border-gray-300 hover:scale-101 transition-all duration-200`}
      onMouseEnter={() => setIsHovering(true)} // Set hovering state on mouse enter
      onMouseLeave={() => setIsHovering(false)} // Clear hovering state on mouse leave
    >
      {" "}
      <div className="flex justify-between items-start">
        <div>
          {" "}
          {/* Container for date and description/icon */}
          {/* Date at top left */}
          <div>
            <span className="text-gray-500 text-sm mb-1">{formattedDate}</span>
            <div className="flex items-center gap-2">
              {transaction.type === "income" ? (
                <HiPlusSm className="text-green-500 h-5 w-5" />
              ) : (
                <HiMinusSm className="text-red-500 h-5 w-5" />
              )}
              {categoryIcon} {/* Render the icon here */}
              <span className="text-lg font-semibold">
                {truncateText(transaction.description, 20)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end relative">
          <div className="relative h-2">
            {" "}
            {/* Container for icons */}
            {isHovering && (
              <div className="flex gap-1 absolute top-0 right-0 rounded-md">
                <button disabled className="text-gray-400 cursor-not-allowed">
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
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm text-gray-600"> </span>
          </div>
          <span className={`text-lg font-semibold ${amountStyle} mt-2`}>
            {" "}
            {/* Amount below icons */}
            {transaction.amount}€
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {accountIcon}
        <span>
          {transaction.account.charAt(0).toUpperCase() +
            transaction.account.slice(1)}
        </span>
      </div>
      {transaction.comment && (
        <div className="text-gray-500 text-sm">
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
  }).isRequired,
};

export default TransactionItem;
