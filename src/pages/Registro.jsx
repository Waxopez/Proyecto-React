import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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

  const handleSubmit = async (e) => { // Agrega async
    e.preventDefault();
    
    if (!form.nombre || !form.correo || !form.perrito || !form.terminos) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }
    
    // Preparamos el objeto tal cual como lo espera Java (Solicitud.java)
    const datosParaJava = {
        nombreSolicitante: form.nombre,
        email: form.correo,
        telefono: form.telefono,
        nombreMascota: form.perrito,
        edadSolicitante: form.edad,
        preferencia: form.preferencia,
        mensaje: form.mensaje
    };

    // Enviamos al backend
    const exito = await enviarSolicitud(datosParaJava);

    if (exito) {
        setSent(true);
        setTimeout(() => setSent(false), 3000);
        // Limpiar formulario
        setForm({
          nombre: "", correo: "", telefono: "", perrito: "",
          edad: "", mensaje: "", preferencia: "", terminos: false
        });
    } else {
        alert("Hubo un error al enviar tu solicitud. Intenta más tarde.");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Contenido principal que se expande */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow border-0 login-card p-4">
                <h2 className="text-center text-danger fw-bold mb-4">Crear Cuenta</h2>

                {/* Contenedor de mensajes */}
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

      {/* Footer que siempre está abajo */}
      <footer className="footer text-white text-center p-3 bg-danger mt-auto">
        <p>&copy; 2025 Adopta un Amigo | Todos los derechos reservados</p>
      </footer>
    </div>
  );
}