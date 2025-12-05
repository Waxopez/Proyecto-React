import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerAnimales } from "../utils/huachitos"; // Importamos la función

const Adopcion = () => {
  // 1. Estado para guardar los animales que lleguen de la API
  const [animales, setAnimales] = useState([]);

  // 2. useEffect para llamar a la API apenas cargue la página
  useEffect(() => {
    async function cargarDatos() {
      const datosReales = await obtenerAnimales();
      setAnimales(datosReales);
    }
    cargarDatos();
  }, []);

  return (
    <>
      <section className="container my-5">
        <h2 className="text-center text-danger mb-4">BUSCAN HOGAR (vía Huachitos API) 🐶</h2>
        
        {/* Mostramos un mensaje si está cargando */}
        {animales.length === 0 && <p className="text-center">Cargando peluditos...</p>}

        <div className="row g-4">
          {/* 3. Mapeamos la lista real de la API */}
          {animales.map((animal) => (
            <div key={animal.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div className="card shadow h-100 d-flex flex-column">
                {/* OJO: Hay que ver qué nombre de campo usa la API para la imagen */}
                <img 
                  src={animal.imagen} 
                  className="card-img-top" 
                  alt={animal.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                  // Si la imagen falla, ponemos una por defecto
                  onError={(e) => { e.target.src = "/img/perrito4.jpg"; }} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{animal.nombre}</h5>
                  <p className="card-text"><strong>UBICACIÓN:</strong> {animal.comuna || "Chile"}</p>
                  <p className="card-text"><strong>TIPO:</strong> {animal.tipo}</p>
                  
                  {/* Usamos dangerouslySetInnerHTML porque a veces las descripciones traen HTML */}
                  <div className="card-text small mb-3" dangerouslySetInnerHTML={{ __html: animal.desc_fisica ? animal.desc_fisica.substring(0, 100) + "..." : "Sin descripción" }} />
                  
                  <div className="mt-auto">
                    <Link to="/contacto" className="btn btn-custom w-100">
                      Adoptame!
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer text-white text-center p-3">
        <p>&copy; 2025 Adopta un Amigo</p>
      </footer>
    </>
  );
};

export default Adopcion;