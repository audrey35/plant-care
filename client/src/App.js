import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ProfileEditPage } from "./pages/ProfileEditPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfileEditPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/signup" element={<SignUpPage />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
