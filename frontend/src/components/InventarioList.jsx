import { useState, useEffect } from "react"; // Se mantienen imports estándar de React

function InventarioList({ productos = [], onEdit, onDeleteProducto }) { // Añadida onDeleteProducto
  // Nota: La lógica para cargar `productos` (fetch, loading, error)
  // debe residir en el componente padre (ej. `pages/Inventario.jsx`)
  // que es el que pasa la prop `productos` a este componente.
  // Este componente se enfoca únicamente en renderizar la lista que recibe.

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto del inventario?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/inventario/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error al eliminar producto: ${res.status} - ${errorText}`);
        }

        // Si la eliminación fue exitosa, notifica al componente padre
        if (onDeleteProducto) {
          onDeleteProducto(id); // Llama a la función proporcionada por el padre
        }
        alert("Producto eliminado del inventario con éxito.");

      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert(`No se pudo eliminar el producto: ${error.message}`);
      }
    }
  };

  // --- Estilos en línea para la lista de Inventario ---

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
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", // Columnas adaptativas
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

  const productInfoStyle = {
    marginBottom: "1rem", // Espacio debajo de la información del producto
  };

  const nameStyle = {
    color: "#007bff", // Azul para el nombre del producto
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

  const priceStyle = {
    fontWeight: "bold",
    color: "#28a745", // Verde para el precio
    fontSize: "1.2rem",
    marginTop: "0.8rem",
    textAlign: "right",
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

  const noProductosMessageStyle = {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
    padding: "2rem",
  };

  return (
    <div style={listContainerStyle}>
      <h3 style={headingStyle}>Productos en Inventario</h3>

      {(!productos || productos.length === 0) ? (
        <p style={noProductosMessageStyle}>No hay productos registrados en el inventario.</p>
      ) : (
        <ul style={ulStyle}>
          {productos.map((prod) => (
            <li key={prod.id} style={liStyle}>
              <div style={productInfoStyle}>
                <p style={nameStyle}>{prod.nombre}</p>
                <p style={detailStyle}><span style={labelStyle}>Categoría:</span> {prod.categoria}</p>
                <p style={detailStyle}><span style={labelStyle}>Cantidad:</span> {prod.cantidad}</p>
                <p style={detailStyle}><span style={labelStyle}>Descripción:</span> {prod.descripcion}</p>
                <p style={priceStyle}><span style={labelStyle}>Precio Unitario:</span> ${parseFloat(prod.precioUnitario).toLocaleString('es-CO')}</p>
              </div>
              <div style={buttonContainerStyle}>
                {onEdit && (
                  <button onClick={() => onEdit(prod)} style={editButtonStyle}>
                    Editar
                  </button>
                )}
                {onDeleteProducto && (
                  <button onClick={() => handleDelete(prod.id)} style={deleteButtonStyle}>
                    Eliminar
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

export default InventarioList;