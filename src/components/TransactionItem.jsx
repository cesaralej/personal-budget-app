import { HiPlusSm, HiMinusSm, HiPencil, HiTrash } from "react-icons/hi";
import PropTypes from "prop-types";

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const amountColor =
    transaction.type === "income" ? "text-green-500" : "text-red-500";

  const formattedDate = transaction.date.toLocaleDateString();

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

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div>
          {" "}
          {/* Container for date and description/icon */}
          <span className="text-gray-500 text-sm mb-1">
            {formattedDate}
          </span>{" "}
          {/* Date at top left */}
          <div className="flex items-center gap-2">
            {transaction.type === "income" ? (
              <HiPlusSm className="text-green-500 h-5 w-5" />
            ) : (
              <HiMinusSm className="text-red-500 h-5 w-5" />
            )}
            <span className="text-lg font-semibold">
              {truncateText(transaction.description, 20)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-lg font-semibold ${amountColor}`}>
            {transaction.amount}€
          </span>
          <div className="flex gap-1 mt-1">
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
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
        {" "}
        {/* Added text-gray-600 */}
        <span>
          Category:{" "}
          {transaction.category.charAt(0).toUpperCase() +
            transaction.category.slice(1)}
        </span>
        <span>
          Type:{" "}
          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
        </span>
        <span>
          Account:{" "}
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
