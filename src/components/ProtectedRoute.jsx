import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiresAuth = true }) => {
  const { user, token } = useAuth();

  // For routes that require NO authentication (login, register)
  if (!requiresAuth) {
    return user ? <Navigate to="/" replace /> : children;
  }

  // For routes that require authentication
  // Check both user and token
  return (user && token) ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;