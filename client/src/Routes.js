import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { UserInfoPage } from "./pages/UserInfoPage";
import { PrivateRoute } from "./auth/PrivateRoute";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <UserInfoPage />
            </PrivateRoute>
          }
          exact
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};
