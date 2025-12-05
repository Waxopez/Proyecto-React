import React from "react";

export default function Inicio() {
  return (
    <>
      {/* Banner con carrusel */}
      <section className="banner position-relative text-center text-white">
        <div id="bannerCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/img/perrito4.jpg" className="d-block w-100 banner-img" alt="Perrito 1" />
            </div>
            <div className="carousel-item">
              <img src="/img/perrito5.jpg" className="d-block w-100 banner-img" alt="Perrito 2" />
            </div>
            <div className="carousel-item">
              <img src="/img/perrito6.jpg" className="d-block w-100 banner-img" alt="Perrito 3" />
            </div>
          </div>
        </div>

        <div className="banner-content position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 p-4 rounded w-100" style={{maxWidth: "800px"}}>
          <h1 className="fw-bold">"Un amigo no se compra, se adopta" 🐾</h1>
          <p className="lead">Dale una nueva oportunidad a un perrito que espera por ti.</p>
          <a href="/adopcion" className="btn btn-custom mt-3">¡Adopta Ya!</a>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title text-danger">Nuestra Misión</h5>
                <p className="card-text">Rescatar, cuidar y encontrar un hogar amoroso para cada perrito en situación de abandono.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title text-danger">Nuestra Visión</h5>
                <p className="card-text">Un mundo donde todos los perritos tengan un hogar lleno de amor y cuidados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-white text-center p-3 bg-danger">
        <p>&copy; 2025 Adopta un Amigo | Todos los derechos reservados</p>
      </footer>
    </>
  );
}