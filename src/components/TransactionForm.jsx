import { useState } from "react";
import PropTypes from "prop-types";

const typeOptions = ["income", "expense"];

const accountOptions = {
  income: ["savings"],
  expense: ["savings", "credit"],
};

const categoryOptions = {
  income: ["salary", "other"],
  expense: [
    "groceries",
    "utilities",
    "lunch",
    "luxury",
    "investment",
    "maid",
    "taxi",
    "other",
  ],
};

const TransactionForm = ({ onSubmit }) => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "luxury",
    type: "expense", // Default type
    account: "credit", // Default account
    date: getTodayDate(),
    time: getCurrentTime(),
    comment: "",
    isCreditCardPayment: false,
  });

  const [showComment, setShowComment] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      type: prevData.type === "income" ? "expense" : "expense",
      account: prevData.account === "credit" ? "savings" : "savings",
      category: "other",
      isCreditCardPayment: !prevData.isCreditCardPayment,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill out all fields.");
      return;
    }

    if (isNaN(parseFloat(formData.amount)) || formData.amount.trim() === "") {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      await onSubmit(formData);
      alert("Transaction added!");
      setFormData({
        amount: "",
        description: "",
        category: "luxury",
        type: "expense",
        account: "credit",
        date: getTodayDate(),
        time: getCurrentTime(),
        comment: "",
        isCreditCardPayment: false,
      });
      setShowComment(false);
    } catch (error) {
      console.error("Error adding transaction: ", error);
      alert("Failed to add transaction.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <div className="flex items-center">
        <label htmlFor="amount" className="w-1/3 text-sm font-medium">
          Amount:{" "}
        </label>
        <div className="flex flex-grow">
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="50"
            value={formData.amount}
            onChange={handleChange}
            required
            min="1"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          />
          <span className="ml-2 text-gray-500">€</span>
        </div>
      </div>
      <div className="flex items-center">
        <label htmlFor="description" className="w-1/3 text-sm font-medium">
          Description:
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          required={!formData.isCreditCardPayment}
          placeholder="e.g., Coffee at Starbucks"
          maxLength="50"
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="type" className="w-1/3 text-sm font-medium">
          Type:
        </label>
        <select
          name="type"
          id="type"
          value={formData.type}
          onChange={handleChange}
          disabled={formData.isCreditCardPayment}
          className={`rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
            formData.isCreditCardPayment ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        >
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="account" className="w-1/3 text-sm font-medium">
          Account:
        </label>
        <select
          name="account"
          id="account"
          value={formData.account}
          onChange={handleChange}
          required
          disabled={formData.isCreditCardPayment}
          className={`rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
            formData.isCreditCardPayment ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        >
          {accountOptions[formData.type].map((account) => (
            <option key={account} value={account}>
              {account.charAt(0).toUpperCase() + account.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="category" className="w-1/3 text-sm font-medium">
          Category:
        </label>
        <select
          name="category"
          id="category"
          value={formData.category}
          onChange={handleChange}
          required
          disabled={formData.isCreditCardPayment}
          className={`rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full ${
            formData.isCreditCardPayment ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
        >
          {categoryOptions[formData.type].map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center">
        <label htmlFor="date" className="w-1/3 text-sm font-medium">
          Date:
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="time" className="w-1/3 text-sm font-medium">
          Time:
        </label>
        <input
          type="time"
          name="time"
          id="time"
          value={formData.time}
          onChange={handleChange}
          required
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
        />
      </div>
      <div className="flex items-center">
        <label
          htmlFor="isCreditCardPayment"
          className="w-1/3 text-sm font-medium"
        >
          <input
            type="checkbox"
            name="isCreditCardPayment"
            id="isCreditCardPayment"
            checked={formData.isCreditCardPayment}
            onChange={handleCheckboxChange}
            className="mr-2 rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          Credit Card Payment
        </label>
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowComment((prev) => !prev)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {showComment ? "Hide Comment" : "Add Comment"}
        </button>
      </div>

      {showComment && (
        <div className="mt-4">
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Comment:
          </label>
          <textarea
            name="comment"
            id="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Add an optional note about this transaction"
            rows="3"
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
          />
        </div>
      )}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add Transaction
      </button>
    </form>
  );
};

TransactionForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default TransactionForm;
