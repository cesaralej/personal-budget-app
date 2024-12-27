import TransactionItem from "./TransactionItem";
import PropTypes from "prop-types";

const TransactionList = ({ transactions, error, onEdit, onDelete }) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction List</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">
          No transactions yet. Add some to see them here.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
TransactionList.propTypes = {
  transactions: PropTypes.array.isRequired,
  error: PropTypes.object,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TransactionList;
