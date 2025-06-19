import { useState, useEffect } from "react";

function NovedadForm({ onSubmit, novedadToEdit, clearEdit }) {
  const [novedad, setNovedad] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    relacionadoCon: "",
  });

  useEffect(() => {
    if (novedadToEdit) {
      setNovedad(novedadToEdit);
    } else {
      setNovedad({
        titulo: "",
        descripcion: "",
        fecha: new Date().toISOString().split("T")[0], // fecha actual
        relacionadoCon: "",
      });
    }
  }, [novedadToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovedad({ ...novedad, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novedad.titulo || !novedad.descripcion) {
      alert("El título y la descripción son obligatorios");
      return;
    }
    onSubmit(novedad);
    clearEdit();
    setNovedad({
      titulo: "",
      descripcion: "",
      fecha: new Date().toISOString().split("T")[0],
      relacionadoCon: "",
    });
  };

  // --- Estilos en línea para el formulario ---

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

  const inputFocusStyle = {
    borderColor: "#61dafb",
    boxShadow: "0 0 0 3px rgba(97, 218, 251, 0.2)",
  };

  const textareaStyle = {
    ...inputStyle, // Hereda estilos básicos del input
    minHeight: "100px",
    resize: "vertical", // Permite redimensionar verticalmente
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    display: "inline-block", // Para que los botones se alineen
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

  const buttonHoverEffect = {
    // Para hover, necesitaríamos manejar onMouseEnter/onMouseLeave,
    // por simplicidad y manteniendo la filosofía de estilos en línea, no los incluiremos directamente aquí.
    // Esto es una limitación de los estilos en línea puros.
    // transform: "translateY(-2px)",
  };

  return (
    <form onSubmit={handleSubmit} style={formContainerStyle}>
      <h3 style={headingStyle}>
        {novedad.id ? "Editar Novedad" : "Registrar Novedad"}
      </h3>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={novedad.titulo}
        onChange={handleChange}
        style={inputStyle}
        // Para el focus, necesitaríamos onFocus/onBlur para cambiar el estilo
        // en tiempo de ejecución con useState para el estado de foco.
      />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={novedad.descripcion}
        onChange={handleChange}
        style={textareaStyle}
      />

      <input
        type="date"
        name="fecha"
        value={novedad.fecha}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        type="text"
        name="relacionadoCon"
        placeholder="Relacionado con (Moto/Cliente)"
        value={novedad.relacionadoCon}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button type="submit" style={primaryButtonStyle}>
          {novedad.id ? "Guardar Cambios" : "Registrar"}
        </button>

        {novedadToEdit && (
          <button type="button" onClick={clearEdit} style={secondaryButtonStyle}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default NovedadForm;