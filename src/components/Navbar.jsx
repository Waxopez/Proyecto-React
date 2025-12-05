import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🐾 Adopta un Amigo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Menú">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Inicio</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/adopcion">Adopción</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>

            {/* Si NO hay usuario (No logueado) */}
            {!user && (
              <>
                <li className="nav-item"><NavLink className="nav-link login-btn" to="/login">Login</NavLink></li>
                <li className="nav-item"><NavLink className="nav-link register-btn" to="/register">Registro</NavLink></li>
              </>
            )}

            {/* Si SÍ hay usuario (Logueado) */}
            {user && (
              <>
                <li className="nav-item">
                  {/* CORRECCIÓN AQUÍ: Cambiamos user.name por user.nombre */}
                  <NavLink className="nav-link" to="/perfil">
                    Hola <strong>{user.nombre}</strong>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-danger text-white px-3 ms-2" onClick={onLogout}>Cerrar Sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}