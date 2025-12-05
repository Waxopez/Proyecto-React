import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/auth"; 

export default function Registro() {
  const [form, setForm] = useState({ 
    registerName: "", 
    registerEmail: "", 
    registerPassword: "", 
    registerConfirmPassword: "" 
  });
  const [msg, setMsg] = useState(null);
  const nav = useNavigate();

  const handleChange = (e) => setForm(prev => ({ 
    ...prev, 
    [e.target.id]: e.target.value 
  }));

  const handleSubmit = async (e) => { 
    e.preventDefault();
    
    // 1. VALIDACIONES (Usando las variables correctas del registro)
    if (!form.registerName || !form.registerEmail || !form.registerPassword || !form.registerConfirmPassword) {
      setMsg({ type: "danger", text: "Completa todos los campos." });
      return;
    }

    if (form.registerPassword.length < 6) {
      setMsg({ type: "danger", text: "La contraseña debe tener mínimo 6 caracteres." });
      return;
    }

    if (form.registerPassword !== form.registerConfirmPassword) {
      setMsg({ type: "danger", text: "Las contraseñas no coinciden." });
      return;
    }

    if (!form.registerEmail.includes('@') || !form.registerEmail.includes('.')) {
      setMsg({ type: "danger", text: "El correo electrónico no es válido." });
      return;
    }

    // 2. LLAMADA AL BACKEND (Usando registerUser, NO enviarSolicitud)
    const res = await registerUser({ 
      name: form.registerName, 
      email: form.registerEmail, 
      password: form.registerPassword 
    });

    // 3. MANEJO DE RESPUESTA
    if (!res.ok) {
      setMsg({ type: "danger", text: res.message });
      return;
    }

    setMsg({ type: "success", text: "Registro exitoso. Redirigiendo..." });
    setTimeout(() => nav("/login"), 1200);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow border-0 login-card p-4">
                <h2 className="text-center text-danger fw-bold mb-4">Crear Cuenta</h2>

                {msg && (
                  <div className={`alert alert-${msg.type}`} role="alert">
                    {msg.text}
                  </div>
                )}

                <form id="registerForm" onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="registerName" className="form-label">Nombre completo</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="registerName" 
                      value={form.registerName}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="registerEmail" className="form-label">Correo electrónico</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="registerEmail" 
                      value={form.registerEmail}
                      onChange={handleChange}
                      required 
                    />
                    <div className="form-text">Debe contener @ y un dominio válido.</div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="registerPassword" className="form-label">Contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="registerPassword" 
                      value={form.registerPassword}
                      onChange={handleChange}
                      required 
                      minLength="6"
                    />
                    <div className="form-text">Mínimo 6 caracteres.</div>
                  </div>
                  
                  <div className="mb-3">
                    <label htmlFor="registerConfirmPassword" className="form-label">Confirmar contraseña</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="registerConfirmPassword" 
                      value={form.registerConfirmPassword}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                  
                  <div className="d-grid mb-3">
                    <button type="submit" className="btn btn-danger">Registrarse</button>
                  </div>
                  
                  <p className="text-center">
                    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer text-white text-center p-3 bg-danger mt-auto">
        <p>&copy; 2025 Adopta un Amigo | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}