import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import { useState } from "react";

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>(null);
  console.log(authMode);

  console.log(authMode);
  return (
    <>
      <Header
        onLoginClick={() => setAuthMode("login")}
        onRegisterClick={() => setAuthMode("register")}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
