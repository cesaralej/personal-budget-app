import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [user, loadingUser] = useAuthState(auth);
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loadingUser) {
      return;
    }
    const transactionsCollectionRef = collection(
      db,
      "users",
      user.uid,
      "transactions"
    );
    const q = query(transactionsCollectionRef, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const transactionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data()?.date?.toDate() || null,
        }));
        setTransactions(transactionsData);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, loadingUser]);

  const addTransaction = async (transactionData) => {
    if (!user) {
      console.error("User not logged in. Cannot add transaction.");
      return;
    }

    try {
      const transactionsCollectionRef = collection(
        db,
        "users",
        user.uid,
        "transactions"
      );

      const docRef = await addDoc(transactionsCollectionRef, {
        ...transactionData,
        amount: Number(transactionData.amount),
        date: new Date(`${transactionData.date}T${transactionData.time}`),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const updateTransaction = async (transactionId, updatedTransactionData) => {
    // New update function
    if (!user) {
      console.error("User not logged in. Cannot update transaction.");
      return;
    }

    try {
      const transactionDocRef = doc(
        db,
        "users",
        user.uid,
        "transactions",
        transactionId
      ); // Get doc reference
      await updateDoc(transactionDocRef, updatedTransactionData); // Update the document
      console.log("Transaction updated with ID: ", transactionId);
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  };

  const deleteTransaction = async (transactionId) => {
    // New delete function
    if (!user) {
      console.error("User not logged in. Cannot delete transaction.");
      return;
    }

    try {
      const transactionDocRef = doc(
        db,
        "users",
        user.uid,
        "transactions",
        transactionId
      );
      await deleteDoc(transactionDocRef);
      console.log("Transaction deleted with ID: ", transactionId);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const value = {
    transactions,
    loading,
    error,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

TransactionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider"
    );
  }
  return context;
};
