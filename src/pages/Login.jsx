import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => setForm(prev => ({ 
    ...prev, 
    [e.target.id]: e.target.value 
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setMsg({ type: "danger", text: "Completa todos los campos." });
      return;
    }
    
    const res = await loginUser({ email: form.username, password: form.password });
    if (!res.ok) {
      setMsg({ type: "danger", text: res.message });
      return;
    }
    
    // login exitoso
    onLogin(res.user);
    nav("/perfil");
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Contenido principal que se expande */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow border-0 login-card p-4">
                <h2 className="text-center text-danger fw-bold mb-4">Iniciar Sesión</h2>
                
                {/* Mensaje de alerta */}
                {msg && (
                  <div className={`alert alert-${msg.type}`} role="alert">
                    {msg.text}
                  </div>
                )}

                <form id="loginForm" onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Correo electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="username" 
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Ingresa tu correo" 
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Ingresa tu contraseña" 
                      required 
                    />
                  </div>
                  
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-danger">Login</button>
                  </div>
                  
                  <p className="text-center">
                    ¿No tienes cuenta? <Link to="/registro">Crear Cuenta</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer que siempre está abajo */}
      <footer className="footer text-white text-center p-3 bg-danger mt-auto">
        <p>&copy; 2025 Adopta un Amigo | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}