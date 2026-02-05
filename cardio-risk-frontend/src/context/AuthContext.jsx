import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const login = ({ token, role, userInfo }) => {
    // 🔑 MUST match Axios interceptor
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    setToken(token);
    setUserRole(role);
    setUserInfo(userInfo);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setUserRole(null);
    setUserInfo(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userRole,
        userInfo,
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
