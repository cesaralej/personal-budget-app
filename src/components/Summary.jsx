import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  FaMoneyBillAlt,
  FaArrowDown,
  FaArrowUp,
  FaWallet,
  FaCreditCard,
} from "react-icons/fa";

const Summary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    savings: 0,
    credit: 0,
  });

  useEffect(
    () => {
      console.log("Fetching transactions...");
      const unsubscribe = onSnapshot(
        collection(db, "transactions"),
        (snapshot) => {
          let income = 0;
          let expenses = 0;
          let savings = 0;
          let credit = 0;

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const amount = parseFloat(data.amount);

            // Alternatively, you can use a ternary operator
            if (!data.isCreditCardPayment) {
              data.type === "income"
                ? (income += amount)
                : (expenses += amount);
              data.account === "savings"
                ? data.type === "income"
                  ? (savings += amount)
                  : (savings -= amount)
                : (credit += amount);
            } else {
              credit -= amount;
              savings -= amount;
            }
          });

          setSummary({
            totalIncome: income,
            totalExpenses: expenses,
            balance: income - expenses,
            savings: savings,
            credit: credit,
          });
        }
      );

      return () => unsubscribe(); // Cleanup on unmount
    },
    [] // Add summary as a dependency
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6 mt-6">
      {/* Summary Title */}
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Summary
      </h1>

      {/* Income, Expenses, Balance Section */}
      <div className="space-y-4 mb-6">
        {/* Total Income */}
        <div className="flex justify-between items-center py-4 border-b">
          <div className="flex items-center space-x-2">
            <FaMoneyBillAlt className="text-green-600" />
            <span className="text-lg text-gray-700">Total Income</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            ${summary.totalIncome.toFixed(2)}
          </div>
        </div>

        {/* Total Expenses */}
        <div className="flex justify-between items-center py-4 border-b ">
          <div className="flex items-center space-x-2">
            <FaArrowDown className="text-red-600" />
            <span className="text-lg text-gray-700">Total Expenses</span>
          </div>
          <div className="text-xl font-bold text-red-600">
            ${summary.totalExpenses.toFixed(2)}
          </div>
        </div>

        {/* Balance */}
        <div className="flex justify-between items-center py-4 border-b">
          <div className="flex items-center space-x-2">
            <FaArrowUp
              className={`text-xl ${
                summary.balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            />
            <span className="text-lg text-gray-700">Balance</span>
          </div>
          <div
            className={`text-xl font-bold ${
              summary.balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${summary.balance.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Savings and Credit Section */}
      <div className="space-y-4">
        {/* Savings */}
        <div className="flex justify-between items-center py-4 border-b">
          <div className="flex items-center space-x-2">
            <FaWallet className="text-yellow-600" />
            <span className="text-lg text-gray-700">Savings</span>
          </div>
          <div className="text-xl font-bold text-yellow-600">
            ${summary.savings.toFixed(2)}
          </div>
        </div>

        {/* Credit */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <FaCreditCard className="text-indigo-600" />
            <span className="text-lg text-gray-700">Credit</span>
          </div>
          <div className="text-xl font-bold text-indigo-600">
            ${summary.credit.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
