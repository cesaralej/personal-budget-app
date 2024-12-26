import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // Adjust path if necessary
import { collection, onSnapshot } from "firebase/firestore";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "transactions"),
      (snapshot) => {
        const fetchedTransactions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(fetchedTransactions);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching transactions: ", error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", marginTop: "20px" }}>
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet. Add some to see them here.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
