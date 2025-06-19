import { useState, useEffect } from "react";
import MotoForm from "../components/MotoForm";

function Motos() {
  const [motos, setMotos] = useState([]);
  const [motoToEdit, setMotoToEdit] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga para la lista
  const [error, setError] = useState(null); // Estado de error para la lista

  // Cargar motos desde backend
  const fetchMotos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3001/api/motos");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setMotos(data);
    } catch (err) {
      console.error("Error al cargar motos:", err);
      setError("Error al cargar las motos. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotos();
  }, []);

  // Registrar nueva moto
  const agregarMoto = async (moto) => {
    try {
      const res = await fetch("http://localhost:3001/api/motos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moto),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al registrar moto: ${res.status} - ${errorText}`);
      }
      alert("✅ Moto registrada con éxito.");
      fetchMotos(); // Recargar la lista
    } catch (error) {
      console.error("Error al agregar moto:", error);
      alert(`❌ No se pudo registrar la moto: ${error.message}`);
    }
  };

  // Actualizar moto existente
  const actualizarMoto = async (moto) => {
    try {
      const res = await fetch(`http://localhost:3001/api/motos/${moto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(moto),
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al actualizar moto: ${res.status} - ${errorText}`);
      }
      alert("✅ Moto actualizada con éxito.");
      fetchMotos(); // Recargar la lista
      setMotoToEdit(null); // Salir del modo edición
    } catch (error) {
      console.error("Error al actualizar moto:", error);
      alert(`❌ No se pudo actualizar la moto: ${error.message}`);
    }
  };

  // Enviar formulario (decide si registrar o actualizar)
  const handleSubmit = (moto) => {
    if (moto.id) {
      actualizarMoto(moto);
    } else {
      agregarMoto(moto);
    }
  };

  

  // --- Estilos en línea para la página Motos ---

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

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Columnas adaptativas
    gap: "1.5rem",
    padding: "1rem",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
  };

  const itemCardStyle = {
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

  const itemDetailStyle = {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
    marginBottom: "0.5rem",
  };

  const itemLabelStyle = {
    fontWeight: "bold",
    color: "#555",
    marginRight: "0.5rem",
  };

  const itemPlacaStyle = {
    fontWeight: "bold",
    color: "#007bff", // Azul para la placa
    fontSize: "1.2rem",
    marginBottom: "1rem",
    textAlign: "center",
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
      <h2 style={mainHeadingStyle}>
        {motoToEdit ? "Editar Moto" : "Registrar Moto"}
      </h2>
      <MotoForm
        onSubmit={handleSubmit}
        motoToEdit={motoToEdit}
        clearEdit={() => setMotoToEdit(null)}
      />

      <hr style={hrStyle} />

      <h3 style={sectionHeadingStyle}>Lista de Motos</h3>
      {loading && <p style={messageStyle}>Cargando motos...</p>}
      {error && <p style={errorMessageStyle}>{error}</p>}

      {!loading && !error && motos.length === 0 && (
        <p style={messageStyle}>No hay motos registradas.</p>
      )}

      {!loading && !error && motos.length > 0 && (
        <div style={gridContainerStyle}>
          {motos.map((moto) => (
            <div key={moto.id} style={itemCardStyle}>
              <p style={itemPlacaStyle}>Placa: {moto.placa}</p>
              <p style={itemDetailStyle}>
                <span style={itemLabelStyle}>Marca:</span> {moto.marca}
              </p>
              <p style={itemDetailStyle}>
                <span style={itemLabelStyle}>Modelo:</span> {moto.modelo}
              </p>
              <p style={itemDetailStyle}>
                <span style={itemLabelStyle}>Año:</span> {moto.año}
              </p>
              <p style={itemDetailStyle}>
                <span style={itemLabelStyle}>Color:</span> {moto.color}
              </p>

              <div style={buttonContainerStyle}>
                <button onClick={() => setMotoToEdit(moto)} style={editButtonStyle}>
                  Editar
                </button>
          
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Motos;