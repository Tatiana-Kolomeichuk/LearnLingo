import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

type AuthMode = "login" | "register" | null;

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);

  const closeAuthModal = () => {
    setAuthMode(null);
  };

  return (
    <>
      <Header
        onLoginClick={() => setAuthMode("login")}
        onRegisterClick={() => setAuthMode("register")}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {authMode && <AuthModal mode={authMode} onClose={closeAuthModal} />}
    </>
  );
}
