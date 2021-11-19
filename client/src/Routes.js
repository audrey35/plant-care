import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { ProfileViewPage } from "./pages/ProfileViewPage";
import NotFoundPage from "./pages/NotFoundPage";
import { PrivateRoute } from "./auth/PrivateRoute";

export const RoutesList = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileEditPage />
            </PrivateRoute>
          }
        />
        <Route path="/profile/:username" element={<ProfileViewPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
