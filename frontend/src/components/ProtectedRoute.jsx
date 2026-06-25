import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import api from '../services/api';


const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resutl = await api.get("/auth/check");
        setIsAuth(true);
      } catch (err) {
        console.log("Authentication failed, redirecting to login");
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);


  if (loading) {
    return <div className="text-center h-screen w-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;