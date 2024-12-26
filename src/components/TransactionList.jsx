import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import TransactionItem from "./TransactionItem";

const TransactionList = () => {
  const [user, loading, error] = useAuthState(auth);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      user // Check for user before creating query
        ? query(
            collection(db, "users", user.uid, "transactions"),
            orderBy("date", "desc")
          ) // Filter by subcollection, sort by date
        : collection(db, "transactions"), // Default to empty query if no user
      (snapshot) => {
        const fetchedTransactions = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        setTransactions(fetchedTransactions);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching transactions: ", error);
      }
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]); // Update query on user change

  if (isLoading) return <p>Loading transactions...</p>;

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
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
