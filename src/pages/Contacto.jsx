import React, { useState, useEffect } from "react"; 
import { obtenerAnimales, enviarSolicitud } from "../utils/huachitos";


export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    perrito: "",
    edad: "",
    mensaje: "",
    preferencia: "",
    terminos: false
  });

  const [listaPerritos, setListaPerritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [sent, setSent] = useState(false);

  //cargar perros al iniciar
  useEffect(() => {
    async function cargarLista() {
      const datos = await obtenerAnimales();
      setListaPerritos(datos);
      setCargando(false);
    }
    cargarLista();
    
    //prellena datos 
    const usuarioLogueado = JSON.parse(localStorage.getItem('loggedInUser'));
    if (usuarioLogueado) {
      setForm(prev => ({
        ...prev,
        nombre: usuarioLogueado.nombre || "",
        correo: usuarioLogueado.email || ""
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

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
    <>
      <section className="container my-5">
        <h2 className="text-center text-danger mb-4">Contáctanos 📩</h2>
        {sent && <div className="alert alert-success text-center">Mensaje enviado con éxito ✅</div>}
        
        <form 
          className="shadow p-4 rounded bg-light mx-auto" 
          style={{maxWidth: "600px"}}
          onSubmit={handleSubmit}
          noValidate
        >
          {/*Inputs de nombre correo etc*/}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre completo</label>
            <input type="text" className="form-control" id="nombre" name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="correo" name="correo" value={form.correo} onChange={handleChange} required />
          </div>
          
          <div className="mb-3">
            <label htmlFor="telefono" className="form-label">Teléfono</label>
            <input type="tel" className="form-control" id="telefono" name="telefono" value={form.telefono} onChange={handleChange} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="perrito" className="form-label">Perrito interesado en adoptar</label>
            <select 
              className="form-select" 
              id="perrito" 
              name="perrito"
              value={form.perrito}
              onChange={handleChange}
              required
              disabled={cargando} 
            >
              <option value="" disabled>
                {cargando ? "Cargando lista..." : "Selecciona un perrito"}
              </option>
              
              {/*lista real del Backend */}
              {listaPerritos.map((animal) => (
                <option key={animal.id} value={animal.nombre}>
                  {animal.nombre} ({animal.comuna || "Chile"})
                </option>
              ))}
            </select>
          </div>
          
          
          <div className="mb-3">
            <label htmlFor="edad" className="form-label">Edad del adoptante / grupo familiar</label>
            <input type="text" className="form-control" id="edad" name="edad" value={form.edad} onChange={handleChange} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="mensaje" className="form-label">Mensaje adicional</label>
            <textarea className="form-control" id="mensaje" name="mensaje" value={form.mensaje} onChange={handleChange} rows="4"></textarea>
          </div>
          
          <div className="mb-3">
            <label htmlFor="preferencia" className="form-label">Preferencia de adopción</label>
            <select className="form-select" id="preferencia" name="preferencia" value={form.preferencia} onChange={handleChange}>
              <option value="" disabled>Selecciona una opción</option>
              <option value="inmediata">Inmediata</option>
              <option value="próxima_semana">Próxima semana</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terminos" name="terminos" checked={form.terminos} onChange={handleChange} required />
            <label className="form-check-label" htmlFor="terminos">Acepto los términos y condiciones</label>
          </div>
          
          <button type="submit" className="btn btn-custom w-100">Enviar Solicitud</button>
        </form>
      </section>

      <footer className="footer text-white text-center p-3">
        <p>&copy; 2025 Adopta un Amigo</p>
      </footer>
    </>
  );
  }
