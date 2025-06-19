import { useState, useEffect } from "react";

function InventarioForm({ onSubmit, productoToEdit, clearEdit }) {
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    cantidad: "", // Cambiado a cadena vacía para manejar placeholder correctamente
    precioUnitario: "", // Cambiado a cadena vacía
    descripcion: "",
  });

  useEffect(() => {
    if (productoToEdit) {
      // Asegúrate de que los valores numéricos sean cadenas para los inputs
      setProducto({
        ...productoToEdit,
        cantidad: String(productoToEdit.cantidad),
        precioUnitario: String(productoToEdit.precioUnitario),
      });
    } else {
      setProducto({
        nombre: "",
        categoria: "",
        cantidad: "",
        precioUnitario: "",
        descripcion: "",
      });
    }
  }, [productoToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convertir cantidad y precioUnitario a números antes de enviar
    const productoToSend = {
      ...producto,
      cantidad: parseFloat(producto.cantidad) || 0, // Usar parseFloat para manejar decimales si es necesario
      precioUnitario: parseFloat(producto.precioUnitario) || 0,
    };
    onSubmit(productoToSend);
    setProducto({
      nombre: "",
      categoria: "",
      cantidad: "",
      precioUnitario: "",
      descripcion: "",
    });
    if (clearEdit) clearEdit(); // Asegúrate de llamar clearEdit si existe
  };

  // --- Estilos en línea para el formulario de Inventario ---

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
        {productoToEdit ? "Editar Producto" : "Agregar Producto"}
      </h3>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        type="number"
        name="cantidad"
        placeholder="Cantidad"
        value={producto.cantidad}
        onChange={handleChange}
        style={inputStyle}
        required
      />
      <input
        type="number"
        name="precioUnitario"
        placeholder="Precio Unitario"
        value={producto.precioUnitario}
        onChange={handleChange}
        style={inputStyle}
        step="0.01" // Permite valores decimales para el precio
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={handleChange}
        style={textareaStyle}
      ></textarea>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button type="submit" style={primaryButtonStyle}>
          {productoToEdit ? "Actualizar Producto" : "Guardar Producto"}
        </button>
        {productoToEdit && ( // Mostrar botón Cancelar solo si estamos editando
          <button type="button" onClick={clearEdit} style={secondaryButtonStyle}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default InventarioForm;