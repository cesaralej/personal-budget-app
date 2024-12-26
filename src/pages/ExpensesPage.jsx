import { useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const ExpensesPage = () => {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Transaction Form" : "Add Transaction"}
        </button>
      </div>

      {showForm && <TransactionForm />}
      <TransactionList />
    </>
  );
};
export default ExpensesPage;
