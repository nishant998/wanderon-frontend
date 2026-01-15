import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./auth/ProtectedRoute";

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/register" element={<Page><Register /></Page>} />
        <Route path="/login" element={<Page><Login /></Page>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Page><Dashboard /></Page>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="p-6">Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}
