import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectPath?: string;
}

interface ApiResponse {
  data: {
    id: number;
    email: string;
    role: string;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectPath = ''
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log("Verifying authentication with API...");
        
        //will hope this will work as  aspected 
     //   await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await axios.get<ApiResponse>('/verify-token');
        
        
        if (response && response.data.success) {
          setIsAuthenticated(true);
      
        } else {
          setIsAuthenticated(false);
          setUserRole(null);
        }
      } catch (err) {
        console.error("Authentication verification failed:", err);
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyAuth();
  }, [location.pathname]);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to", redirectPath);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If role is required and doesn't match the user's role, redirect to login
  if (requiredRole && userRole !== requiredRole) {
    console.log(`Role mismatch: required ${requiredRole}, found ${userRole}, redirecting to ${redirectPath}`);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authenticated and role matches (if required), render the children
  console.log("Authentication successful, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute; 