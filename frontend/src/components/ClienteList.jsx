import { useState, useEffect } from "react"; // Se mantiene aunque no se use directamente useState/useEffect para la carga interna

function ClienteList({ clientes = [], onEdit, onDeleteClient }) { // Renombrado a onDeleteClient para claridad
  // La lógica de carga de clientes y manejo de estados de carga/error
  // debería estar en el componente padre (e.g., ClientesPage.jsx)
  // que pasa la prop `clientes` a ClienteList.
  // Aquí asumimos que `clientes` ya viene con los datos correctos.

 
  // --- Estilos en línea para la lista de Clientes ---

  const listContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px", // Ancho máximo para la lista
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

  const clientInfoStyle = {
    marginBottom: "1rem", // Espacio debajo de la información del cliente
  };

  const nameStyle = {
    color: "#007bff", // Azul para el nombre
    fontSize: "1.3rem",
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const detailStyle = {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#555",
    marginRight: "0.5rem",
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

  const noClientsMessageStyle = {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
    padding: "2rem",
  };


  return (
    <div style={listContainerStyle}>
      <h3 style={headingStyle}>Lista de Clientes</h3>

      {clientes.length === 0 ? (
        <p style={noClientsMessageStyle}>No hay clientes registrados.</p>
      ) : (
        <ul style={ulStyle}>
          {clientes.map((cliente) => (
            <li key={cliente.id} style={liStyle}>
              <div style={clientInfoStyle}>
                <p style={nameStyle}>{cliente.nombre}</p>
                <p style={detailStyle}><span style={labelStyle}>Cédula:</span> {cliente.cedula}</p>
                <p style={detailStyle}><span style={labelStyle}>Teléfono:</span> {cliente.telefono}</p>
                <p style={detailStyle}><span style={labelStyle}>Correo:</span> {cliente.correo}</p>
              </div>
              <div style={buttonContainerStyle}>
                {onEdit && (
                  <button onClick={() => onEdit(cliente)} style={editButtonStyle}>
                    Editar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ClienteList;