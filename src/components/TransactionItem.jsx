import { HiPlusSm, HiMinusSm } from "react-icons/hi";

const TransactionItem = ({ transaction }) => {
  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const amountColor =
    transaction.type === "income" ? "text-green-500" : "text-red-500";

  const formattedDate = transaction.date
    ? new Date(transaction.date.seconds * 1000).toLocaleDateString()
    : "No Date";
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
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
        <span className={`text-lg font-semibold ${amountColor}`}>
          {transaction.amount}€
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
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
        <span>Date: {formattedDate}</span>
      </div>
      {transaction.comment && (
        <div className="text-gray-500 text-sm">
          Comment: {transaction.comment}
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
