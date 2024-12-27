import TransactionItem from "./TransactionItem";
import PropTypes from "prop-types";

const TransactionList = ({ transactions, error, onEdit, onDelete }) => {
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-gray-500 text-center">
          No transactions yet. Add some to see them here.
        </p>
      </div>
    );
  }

  // Group transactions by date
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date); // Create a Date object
    const day = date.toLocaleDateString("en-US", { day: "2-digit" }); // Format day
    const month = date.toLocaleDateString("en-US", { month: "short" }); // Format month
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" }); // Format weekday
    const formattedDate = `${day} ${month} | ${weekday}`; // Combine into desired format

    acc[formattedDate] = acc[formattedDate] || [];
    acc[formattedDate].push(transaction);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Transaction List</h2>
      {Object.entries(groupedTransactions).map(([date, transactionsByDate]) => (
        <div key={date}>
          <h3 className="text-md text-blue-500 font-semibold mb-2">{date}</h3>
          <div className="flex flex-col gap-4">
            {transactionsByDate.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
            <hr className="my-4 border-gray-300" />
          </div>
        </div>
      ))}
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
