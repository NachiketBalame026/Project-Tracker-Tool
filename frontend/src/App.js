import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage.jsx"; // Import RegisterPage
import CandidatePage from "./components/CandidatePage";
import AdminPage from "./components/AdminPage";
import AuthProvider, { useAuth } from "./context/AuthContext";
import "./index.css"; // Import Tailwind CSS

const App = () => {
  useAuth();

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />{" "}
          {/* Redirect from "/" to "/login" */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />{" "}
          <Route
            path="/candidate"
            element={<ProtectedRoute component={CandidatePage} />}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute component={AdminPage} />}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default App;
