import { useState } from "react";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.id) { // Verificar también que la respuesta sea OK (status 2xx)
        alert("✅ Usuario creado con éxito");
        // Limpiar el formulario después del registro exitoso
        setFormData({
          nombre: "",
          correo: "",
          contraseña: "",
        });
      } else {
        // Asumimos que data.message o data.error contendrá el mensaje del backend
        const errorMessage = data.message || data.error || "Error desconocido al registrar usuario.";
        alert(`❌ Error al registrar usuario: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Error de conexión al registrar usuario. Intenta de nuevo más tarde.");
    }
  };

  // --- Estilos en línea para el formulario de Registro ---

  const formContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "450px", // Un poco más estrecho para formularios de login/registro
    margin: "5rem auto", // Centrar con más margen superior para una página dedicada
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
    backgroundColor: "#007bff", // Azul primario
    color: "#ffffff",
    marginTop: "1rem", // Espacio arriba del botón
    width: "100%", // Ancho completo del contenedor del formulario
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={headingStyle}>📝 Registrar nuevo usuario</h2>
      <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {/* Usamos el inputStyle directamente, y eliminamos los <br /> para control de espaciado con gap */}
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo" // Placeholder más descriptivo
          value={formData.nombre}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico" // Placeholder más descriptivo
          value={formData.correo}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <input
          type="password"
          name="contraseña"
          placeholder="Contraseña"
          value={formData.contraseña}
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Registrar
        </button>

      </form>
    </div>
  );
};

export default Registro;