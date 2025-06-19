import { useEffect, useState } from "react";
import NovedadForm from "../components/NovedadForm";

function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [novedadToEdit, setNovedadToEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarNovedades = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/novedades");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setNovedades(data);
    } catch (err) {
      console.error("Error al cargar novedades:", err);
      setError("Error al cargar las novedades. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const agregarOEditar = async (novedad) => {
    try {
      if (novedad.id) {
        // Editar
        const res = await fetch(`http://localhost:3001/api/novedades/${novedad.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novedad),
        });
        if (!res.ok) throw new Error("Error al actualizar la novedad.");
        alert("Novedad actualizada con éxito.");
      } else {
        // Crear nueva
        const res = await fetch("http://localhost:3001/api/novedades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novedad),
        });
        if (!res.ok) throw new Error("Error al crear la novedad.");
        alert("Novedad registrada con éxito.");
      }
      cargarNovedades(); // Recargar la lista después de la operación
    } catch (error) {
      console.error("Error al guardar novedad:", error);
      alert(`No se pudo guardar la novedad: ${error.message}`);
    }
  };

  const eliminarNovedad = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta novedad?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/novedades/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar la novedad.");
      alert("Novedad eliminada con éxito.");
      cargarNovedades(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar novedad:", error);
      alert(`No se pudo eliminar la novedad: ${error.message}`);
    }
  };

  const editarNovedad = (novedad) => {
    setNovedadToEdit(novedad);
  };

  const limpiarEdicion = () => {
    setNovedadToEdit(null);
  };

  useEffect(() => {
    cargarNovedades();
  }, []);

  // --- Estilos en línea para la página Novedades ---

  const pageContainerStyle = {
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f4f7f6",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
  };

  const mainHeadingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "2.5rem",
    fontWeight: "700",
  };

  const introParagraphStyle = {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
    maxWidth: "700px",
    margin: "0 auto 2.5rem auto",
  };

  const hrStyle = {
    border: "none",
    borderTop: "2px dashed #e0e0e0",
    margin: "3rem 0",
  };

  const sectionHeadingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "2rem",
    fontSize: "2rem",
    fontWeight: "700",
  };

  const novedadesGridContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  };

  const novedadCardStyle = {
    backgroundColor: "#f9f9f9",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "1.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const novedadTitleStyle = {
    color: "#007bff",
    fontSize: "1.3rem",
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const novedadDescriptionStyle = {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "1rem",
  };

  const novedadMetaStyle = {
    fontSize: "0.9rem",
    color: "#666",
    lineHeight: "1.4",
    display: "block", // Asegura que cada small esté en su propia línea
  };

  const buttonContainerStyle = {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
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
    color: "#dc3545",
  };

  return (
    <div style={pageContainerStyle}>
      <h2 style={mainHeadingStyle}>Registro de Novedades</h2>
      <p style={introParagraphStyle}>
        Aquí podrás registrar observaciones y novedades del taller.
      </p>

      <NovedadForm
        onSubmit={agregarOEditar}
        novedadToEdit={novedadToEdit}
        clearEdit={limpiarEdicion}
      />

      <hr style={hrStyle} />

      <h3 style={sectionHeadingStyle}>Historial de Novedades</h3>

      {loading && <p style={messageStyle}>Cargando novedades...</p>}
      {error && <p style={errorMessageStyle}>{error}</p>}

      {!loading && !error && novedades.length === 0 && (
        <p style={messageStyle}>No hay novedades registradas.</p>
      )}

      {!loading && !error && novedades.length > 0 && (
        <div style={novedadesGridContainer}>
          {novedades.map((n) => (
            <div key={n.id} style={novedadCardStyle}>
              <h4 style={novedadTitleStyle}>{n.titulo}</h4>
              <p style={novedadDescriptionStyle}>{n.descripcion}</p>
              <small style={novedadMetaStyle}>Fecha: {n.fecha}</small>
              {n.relacionadoCon && (
                <small style={novedadMetaStyle}>
                  Relacionado con: {n.relacionadoCon}
                </small>
              )}

              <div style={buttonContainerStyle}>
                <button onClick={() => editarNovedad(n)} style={editButtonStyle}>
                  Editar
                </button>
                <button onClick={() => eliminarNovedad(n.id)} style={deleteButtonStyle}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Novedades;