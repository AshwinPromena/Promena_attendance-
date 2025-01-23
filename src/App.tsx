import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar";
import AttendancePage from "./pages/AttendancePage";
import CalendarPage from "./pages/CalendarPage";
import LeavePage from "./pages/LeavePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ResetPass from "./pages/ResetPass";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Function to handle screen size changes
    const handleResize = () => {
      const isTabletOrLarger = window.matchMedia("(min-width: 768px)").matches;
      setIsSidebarOpen(isTabletOrLarger); // Open sidebar for tablet or larger, close for mobile
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      {isAuthenticated ? (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              sm:translate-x-0`}
          >
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 p-6 ml-0 sm:ml-64">
            {/* Toggle button for mobile */}

            <Routes>
              <Route path="/" element={<AttendancePage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/leave" element={<LeavePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
             
            }
            
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/ResetPass" element={<ResetPass />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
