import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Create context
export const AuthContext = createContext();

// AuthProvider component to provide auth state
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate;
  // Function to check authentication status
  const isAuthenticated = () => !!auth;
  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    setAuth(null);
    navigate("/login");
  }; // Redirect to login page
  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);
