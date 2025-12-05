// src/utils/huachitos.js

const API_URL = "http://localhost:8080/api/mascotas";

export async function obtenerAnimales() {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error("Error al conectar con Huachitos");
    }

    const data = await response.json();
    
    console.log("Respuesta de Huachitos:", data);
    
    return data.data; 
  } catch (error) {
    console.error("Fallo al traer los perritos:", error);
    return []; 
  }
}

export async function enviarSolicitud(datos) {
  try {
    const response = await fetch("http://localhost:8080/api/solicitudes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    return response.ok;
  } catch (error) {
    console.error("Error al enviar solicitud:", error);
    return false;
  }
}