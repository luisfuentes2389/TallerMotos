import { useState, useEffect } from "react";

function MotoForm({ onSubmit, motoToEdit, clearEdit }) {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    placa: "",
    año: "",
    color: "",
  });

  useEffect(() => {
    if (motoToEdit) {
      setForm(motoToEdit);
    } else {
      setForm({ marca: "", modelo: "", placa: "", año: "", color: "" });
    }
  }, [motoToEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ marca: "", modelo: "", placa: "", año: "", color: "" });
    if (clearEdit) clearEdit();
  };

  // --- Estilos en línea para el formulario de Moto ---

  const formContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "3rem auto", // Centrar el formulario con espacio arriba y abajo
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem", // Espacio entre elementos del formulario
  };

  const headingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
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
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "inline-block",
    margin: "0.5rem", // Espacio entre botones
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff", // Azul primario
    color: "#ffffff",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d", // Gris para cancelar
    color: "#ffffff",
  };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h3 style={headingStyle}>
        {form.id ? "Editar Moto" : "Registrar Moto"}
      </h3>

      <input
        name="marca"
        type="text"
        placeholder="Marca"
        value={form.marca}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="modelo"
        type="text"
        placeholder="Modelo"
        value={form.modelo}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="placa"
        type="text"
        placeholder="Placa"
        value={form.placa}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="año"
        type="number" // Cambiado a tipo "number" para el año
        placeholder="Año"
        value={form.año}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        name="color"
        type="text"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button type="submit" style={primaryButtonStyle}>
          {form.id ? "Actualizar Moto" : "Registrar Moto"}
        </button>
        {form.id && (
          <button type="button" onClick={clearEdit} style={secondaryButtonStyle}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default MotoForm;