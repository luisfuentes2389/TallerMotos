import { useState, useEffect } from "react";

function NovedadList({ onEdit, onDelete }) { // Agregamos props para editar y eliminar
  const [novedades, setNovedades] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga
  const [error, setError] = useState(null); // Nuevo estado para manejar errores

  // Función para cargar las novedades (se puede llamar desde useEffect o después de una operación)
  const fetchNovedades = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:3001/api/novedades")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setNovedades(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar novedades:", err);
        setError("Error al cargar las novedades. Intenta de nuevo más tarde.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNovedades(); // Cargar novedades al montar el componente
  }, []);

  // --- Estilos en línea para la lista de novedades ---

  const listContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px", // Ancho máximo para la lista
    margin: "3rem auto", // Centrar con margen
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };

  const headingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    fontWeight: "700",
  };

  const ulStyle = {
    listStyle: "none", // Quita los puntos de la lista
    padding: "0",
    margin: "0",
    display: "grid", // Usa CSS Grid para un diseño responsivo
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Columnas adaptativas
    gap: "1.5rem", // Espacio entre las tarjetas
  };

  const liStyle = {
    backgroundColor: "#f9f9f9", // Fondo ligeramente gris para cada ítem
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", // Espacia contenido y botones
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const liHoverStyle = {
    // Esto se tendría que manejar con onMouseEnter/onMouseLeave, no es directo con estilos en línea.
    // transform: "translateY(-5px)",
    // boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    color: "#007bff", // Azul para el título de la novedad
    fontSize: "1.3rem",
    marginBottom: "0.5rem",
    wordBreak: "break-word", // Asegura que el texto largo se rompa
  };

  const dateStyle = {
    fontSize: "0.9rem",
    color: "#6c757d", // Gris para la fecha
    marginBottom: "1rem",
  };

  const descriptionStyle = {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "1rem",
    flexGrow: 1, // Para que la descripción ocupe el espacio disponible
    wordBreak: "break-word",
  };

  const relatedToStyle = {
    fontSize: "0.9rem",
    color: "#555",
    fontStyle: "italic",
    textAlign: "right", // Alineado a la derecha
  };

  const buttonContainerStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end", // Alinear botones a la derecha
    gap: "0.75rem", // Espacio entre botones
  };

  const buttonStyle = {
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    color: "#ffffff",
  };

  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28a745", // Verde para editar
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#dc3545", // Rojo para eliminar
  };

  const messageStyle = {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
    padding: "2rem",
  };

  const errorMessageStyle = {
    ...messageStyle,
    color: "#dc3545", // Rojo para mensajes de error
  };

  return (
    <div style={listContainerStyle}>
      <h2 style={headingStyle}>Historial de Novedades</h2>

      {loading && <p style={messageStyle}>Cargando novedades...</p>}
      {error && <p style={errorMessageStyle}>{error}</p>}

      {!loading && !error && novedades.length === 0 && (
        <p style={messageStyle}>No hay novedades registradas.</p>
      )}

      {!loading && !error && novedades.length > 0 && (
        <ul style={ulStyle}>
          {novedades.map((n) => (
            <li key={n.id} style={liStyle}>
              <div> {/* Contenedor para el contenido de la novedad */}
                <strong style={titleStyle}>{n.titulo}</strong>
                <p style={dateStyle}>{n.fecha}</p>
                <p style={descriptionStyle}>{n.descripcion}</p>
              </div>
              <div> {/* Contenedor para el 'relacionado con' y botones */}
                <em style={relatedToStyle}>{n.relacionadoCon ? `Relacionado con: ${n.relacionadoCon}` : ''}</em>
                <div style={buttonContainerStyle}>
                  {onEdit && (
                    <button
                      onClick={() => onEdit(n)}
                      style={editButtonStyle}
                    >
                      Editar
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(n.id)}
                      style={deleteButtonStyle}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NovedadList;