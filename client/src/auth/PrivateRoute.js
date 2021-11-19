import { Navigate, Route } from "react-router-dom";
import { useUser } from "./useUser";

export function PrivateRoute({ children }) {
  const user = useUser();

  return user ? children : <Navigate to="/login" />;
}
