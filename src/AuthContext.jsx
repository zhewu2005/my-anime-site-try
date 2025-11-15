// src/AuthContext.jsx
import { useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// 1. 🔻 引入「AuthContext」，注意路徑是從 "./useAuth.js" 來的！
import { AuthContext } from "./useAuth.js";

// 2. 「提供者」元件 (Provider)，這是此檔案「唯一」匯出的東西
export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}