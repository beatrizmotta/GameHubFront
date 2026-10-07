import { Navigate } from "react-router";
import type { User } from "../../api/models/user.model";

interface ProtectedRouteProps {
  children: React.ReactNode | React.ReactNode[];
  user: User | null;
}
export const ProtectedRoute = ({ children, user }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
