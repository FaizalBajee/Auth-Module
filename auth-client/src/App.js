import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Login />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={<h2 style={{ textAlign: "center" }}>404 Not Found</h2>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
