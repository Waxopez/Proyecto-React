import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Adopcion from "./pages/Adopcion";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Registro";
import Perfil from "./pages/Perfil";

import { getLoggedInUser, setLoggedInUser, removeLoggedInUser } from "./utils/auth";

export default function App() {
  // Estado global simple para el usuario logueado
  const [user, setUser] = useState(() => getLoggedInUser());

  // Cuando el usuario cambia (login/logout), actualizamos localStorage y estado
  const handleLogin = (userObj) => {
    setLoggedInUser(userObj);
    setUser(userObj);
  };

  const handleLogout = () => {
    removeLoggedInUser();
    setUser(null);
  };

  // Sincronizar si localStorage cambia en otra pestaña (opcional)
  useEffect(() => {
    function onStorage() {
      setUser(getLoggedInUser());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <main className="py-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/adopcion" element={<Adopcion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/perfil" element={<Perfil user={user} onLogout={handleLogout} />} />
        </Routes>
      </main>
    </Router>
  );
}
