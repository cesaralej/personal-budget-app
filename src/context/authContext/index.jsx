import { useState, useEffect, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);

    return () => unsubscribe();
  }, []);

  async function initializeUser(user) {
    if (user) {
      setUser({ ...user });
      setLoading(false);
      setUserLoggedIn(true);
    } else {
      setUser(null);
      setLoading(false);
      setUserLoggedIn(false);
    }
  }

  const value = { user, userLoggedIn, loading };

  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
