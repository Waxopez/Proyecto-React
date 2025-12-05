import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Bootstrap (vía npm)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// CSS global (copiar style.css aquí)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
