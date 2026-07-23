import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This is the frontend mirror of the backend's `authenticate` middleware:
// same idea (block access without a valid token), same week (7),
// different side of the stack.
export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
