import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser, setLoggedInUser, removeLoggedInUser } from "../utils/auth";

export default function Perfil({ onLogout }) {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  // Estado para el formulario de edición
  const [formData, setFormData] = useState({ nombre: "", password: "" });
  
  const nav = useNavigate();

  useEffect(() => {
    // 1. Cargar usuario del localStorage
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (!storedUser) {
      // Si no hay usuario, mandar al login
      nav("/login");
    } else {
      setUser(storedUser);
      // Pre-llenar el formulario con el nombre actual
      setFormData({ nombre: storedUser.nombre, password: "" });
    }
  }, [nav]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN PARA ACTUALIZAR (UPDATE) ---
  const handleUpdate = async () => {
    // Preparamos los datos a enviar
    const dataToSend = { nombre: formData.nombre };
    // Solo enviamos la contraseña si el usuario escribió algo
    if (formData.password) {
      dataToSend.password = formData.password;
    }

    const res = await updateUser(user.id, dataToSend, user.token);
    
    if (res.ok) {
      alert("¡Perfil actualizado con éxito!");
      
      // Actualizamos el estado local y el localStorage sin perder el token
      const newUserState = { ...user, ...res.user, token: user.token };
      
      setLoggedInUser(newUserState);
      setUser(newUserState);
      setIsEditing(false); // Salir del modo edición
    } else {
      alert("Error al actualizar los datos.");
    }
  };

  // --- FUNCIÓN PARA ELIMINAR (DELETE) ---
  const handleDelete = async () => {
    if (window.confirm("¿Estás 100% seguro de eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      const success = await deleteUser(user.id, user.token);
      
      if (success) {
        alert("Cuenta eliminada. Gracias por haber sido parte de Adopta un Amigo.");
        removeLoggedInUser(); // Borrar datos del navegador
        onLogout(); // Actualizar estado en App.jsx
        nav("/"); // Volver al inicio
      } else {
        alert("Ocurrió un error al intentar eliminar la cuenta.");
      }
    }
  };

  if (!user) return <div className="text-center mt-5">Cargando perfil...</div>;

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex align-items-center justify-content-center">
        <section className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow p-4 border-0">
                <h2 className="text-center text-danger mb-4">
                  {isEditing ? "Editar Perfil" : "Mi Perfil"}
                </h2>
                
                {isEditing ? (
                  // --- VISTA DE EDICIÓN ---
                  <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nombre Completo</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        name="nombre"
                        value={formData.nombre} 
                        onChange={handleChange} 
                        required
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label fw-bold">Nueva Contraseña</label>
                      <input 
                        type="password" 
                        className="form-control" 
                        name="password"
                        placeholder="Dejar en blanco para mantener la actual"
                        value={formData.password} 
                        onChange={handleChange} 
                      />
                      <div className="form-text">Mínimo 6 caracteres si decides cambiarla.</div>
                    </div>
                    
                    <div className="d-flex gap-2 mt-4">
                      <button type="submit" className="btn btn-success flex-grow-1">
                        Guardar Cambios
                      </button>
                      <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  // --- VISTA DE LECTURA ---
                  <div className="text-center">
                    <div className="mb-4">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.nombre}&background=e63946&color=fff&size=128`} 
                        alt="Avatar" 
                        className="rounded-circle mb-3 shadow-sm"
                      />
                      <h4>{user.nombre}</h4>
                      <p className="text-muted">{user.email}</p>
                      <span className="badge bg-warning text-dark">{user.role}</span>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary" onClick={() => setIsEditing(true)}>
                        ✏️ Editar mis datos
                      </button>
                      
                      <button className="btn btn-outline-danger" onClick={handleDelete}>
                        🗑️ Eliminar mi cuenta
                      </button>
                      
                      <hr className="my-3"/>
                      
                      <button 
                        className="btn btn-danger" 
                        onClick={() => { onLogout(); nav("/"); }}
                      >
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
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