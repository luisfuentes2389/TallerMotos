import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [usuario, setUsuario] = useState(""); // aquí será el correo
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: usuario,
          contraseña: clave,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas. Intenta de nuevo.");
        return;
      }

      localStorage.setItem("auth", "true");
      localStorage.setItem("usuario", JSON.stringify(data));
      navigate("/"); // Redirige al home o dashboard
    } catch (err) {
      console.error("Error en el login:", err);
      setError("Error al conectar con el servidor. Por favor, intenta más tarde.");
    }
  };

  // --- Estilos en línea para el formulario de Login ---

  const formContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px", // Un poco más estrecho para formularios de login
    margin: "5rem auto", // Centrar con margen superior para una página dedicada
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Espacio entre elementos del formulario
    alignItems: "center", // Centrar los elementos horizontalmente
  };

  const headingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "2rem", // Un poco más grande para el título principal
    fontWeight: "700",
  };

  const inputStyle = {
    width: "calc(100% - 20px)", // Ocupa el 100% menos el padding
    padding: "12px 10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    boxSizing: "border-box", // Incluye padding y border en el ancho total
    backgroundColor: "#f9f9f9",
    color: "#333",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const buttonStyle = {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem", // Botón un poco más grande
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    width: "100%", // Ancho completo del contenedor del formulario
    marginTop: "0.5rem", // Espacio arriba del botón principal
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff", // Azul primario para ingresar
    color: "#ffffff",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d", // Gris para crear nuevo usuario
    color: "#ffffff",
  };

  const errorTextStyle = {
    color: "#dc3545", // Rojo para mensajes de error
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    textAlign: "center",
    width: "100%",
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>Ingreso al Taller</h2>
      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={primaryButtonStyle}>
          Ingresar
        </button>
        {error && <p style={errorTextStyle}>{error}</p>}
      </form>

      <button
        onClick={() => navigate("/registro")}
        style={{ ...secondaryButtonStyle, marginTop: "1.5rem" }} // Aplicar estilos y un poco más de margen
      >
        Crear nuevo usuario
      </button>
    </div>
  );
}

export default Login;