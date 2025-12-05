// src/utils/auth.js

// URL base de tu backend
const BASE_URL = "http://localhost:8080";
const LOGGED_KEY = "loggedInUser";

// --- AUTENTICACIÓN (LOGIN / REGISTRO) ---

export async function registerUser({ name, email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        nombre: name, // Mapeo: name (React) -> nombre (Java)
        email: email, 
        password: password 
      }) 
    });

    if (response.ok) {
      return { ok: true, message: "Registro exitoso" };
    } else {
      const errorText = await response.text();
      return { ok: false, message: errorText || "Error al registrar" };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json(); 
      // data trae { token: "...", usuario: { id, nombre, ... } }
      
      // Guardamos usuario + token juntos
      const userToSave = { ...data.usuario, token: data.token };
      setLoggedInUser(userToSave);
      return { ok: true, user: userToSave };
    } else {
      return { ok: false, message: "Credenciales inválidas." };
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    return { ok: false, message: "Error de conexión con el servidor" };
  }
}

// --- GESTIÓN DE USUARIOS (UPDATE / DELETE) ---

export async function updateUser(id, userData, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // Enviamos el token de seguridad
      },
      body: JSON.stringify(userData)
    });
    
    if (response.ok) {
      const updatedUser = await response.json();
      return { ok: true, user: updatedUser };
    } else {
      return { ok: false, message: "Error al actualizar" };
    }
  } catch (error) {
    console.error("Error al actualizar:", error);
    return { ok: false, message: "Error de conexión" };
  }
}

export async function deleteUser(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/api/usuarios/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    return response.ok;
  } catch (error) {
    console.error("Error al eliminar:", error);
    return false;
  }
}

// --- UTILIDADES DE SESIÓN LOCAL ---

export function setLoggedInUser(userObj) {
  localStorage.setItem(LOGGED_KEY, JSON.stringify(userObj));
}

export function getLoggedInUser() {
  try {
    return JSON.parse(localStorage.getItem(LOGGED_KEY));
  } catch {
    return null;
  }
}

export function removeLoggedInUser() {
  localStorage.removeItem(LOGGED_KEY);
}