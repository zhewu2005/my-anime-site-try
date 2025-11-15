// src/useAuth.js
import { createContext, useContext } from "react";

// 1. 🔻 我們把「建立 Context」的工作搬到這個檔案
export const AuthContext = createContext();

// 2. 🔻 我們把「useAuth Hook」也放在這個檔案
export function useAuth() {
  return useContext(AuthContext);
}