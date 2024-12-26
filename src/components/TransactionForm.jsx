import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import { collection, addDoc } from "firebase/firestore";

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

const TransactionForm = () => {
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "luxury",
    type: "expense", // Default type
    account: "credit", // Default account
    date: getTodayDate(),
    comment: "",
    isCreditCardPayment: false,
  });

  const [showComment, setShowComment] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.amount || !formData.category || !formData.date) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      console.log("Adding transaction...");
      await addDoc(collection(db, "transactions"), formData);
      console.log("Transaction added!");
      alert("Transaction added!");
      setFormData({
        amount: "",
        description: "",
        category: "luxury",
        type: "expense",
        account: "credit",
        date: getTodayDate(),
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
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <div>
        <label>Amount: </label>
        <input
          type="number"
          name="amount"
          placeholder="50"
          value={formData.amount}
          onChange={handleChange}
          required
          min="1"
        />
        €
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required={!formData.isCreditCardPayment}
          placeholder="e.g., Coffee at Starbucks"
          maxLength="50"
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          disabled={formData.isCreditCardPayment}
          className={`${
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
      <div>
        <label>Account:</label>
        <select
          name="account"
          value={formData.account}
          onChange={handleChange}
          required
          disabled={formData.isCreditCardPayment}
          className={`${
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
      <div>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          disabled={formData.isCreditCardPayment}
          className={`${
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
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={formData.isCreditCardPayment}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                type: prev.type === "income" ? "expense" : "expense",
                account: prev.account === "credit" ? "savings" : "savings",
                category: "other",
                isCreditCardPayment: !prev.isCreditCardPayment,
              }))
            }
          />
          Credit Card Payment
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowComment((prev) => !prev)}
          style={{ marginTop: "10px" }}
        >
          {showComment ? "Hide Comment" : "Add Comment"}
        </button>
      </div>

      {showComment && (
        <div style={{ marginTop: "10px" }}>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            placeholder="Add an optional note about this transaction"
            rows="3"
            style={{ width: "100%" }}
          />
        </div>
      )}
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
