import { useState, useEffect } from "react";

function Facturas() {
  // --- Estados para el formulario de factura ---
  const [factura, setFactura] = useState({
    clienteId: "", // Cambiado de 'cliente' a 'clienteId' para el selector
    motoId: "",    // Cambiado de 'moto' a 'motoId' para el selector
    descripcion: "",
    total: "",     // Mantener como string para el input type="number"
    fecha: new Date().toISOString().split("T")[0],
  });

  const [editandoId, setEditandoId] = useState(null); // ID de la factura que se está editando

  // --- Estados para datos de soporte (clientes, motos) ---
  const [clientes, setClientes] = useState([]);
  const [motos, setMotos] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [errorClients, setErrorClients] = useState(null);
  const [loadingMotos, setLoadingMotos] = useState(true);
  const [errorMotos, setErrorMotos] = useState(null);

  // --- Estados para la lista de facturas ---
  const [facturas, setFacturas] = useState([]);
  const [loadingFacturas, setLoadingFacturas] = useState(true);
  const [errorFacturas, setErrorFacturas] = useState(null);

  // --- useEffect para cargar la lista de facturas ---
  const fetchFacturas = async () => {
    setLoadingFacturas(true);
    setErrorFacturas(null);
    try {
      const res = await fetch("http://localhost:3001/api/facturas");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setFacturas(data);
    } catch (err) {
      console.error("Error al cargar facturas:", err);
      setErrorFacturas("No se pudieron cargar las facturas.");
    } finally {
      setLoadingFacturas(false);
    }
  };

  useEffect(() => {
    fetchFacturas();
  }, []); // Se ejecuta solo una vez al montar para cargar la lista inicial

  // --- useEffect para cargar clientes y motos para los selectores ---
  useEffect(() => {
    const fetchClientes = async () => {
      setLoadingClients(true);
      setErrorClients(null);
      try {
        const res = await fetch("http://localhost:3001/api/clientes");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setClientes(data);
      } catch (err) {
        console.error("Error al cargar clientes:", err);
        setErrorClients("No se pudieron cargar los clientes.");
      } finally {
        setLoadingClients(false);
      }
    };

    const fetchMotos = async () => {
      setLoadingMotos(true);
      setErrorMotos(null);
      try {
        const res = await fetch("http://localhost:3001/api/motos");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMotos(data);
      } catch (err) {
        console.error("Error al cargar motos:", err);
        setErrorMotos("No se pudieron cargar las motos.");
      } finally {
        setLoadingMotos(false);
      }
    };

    fetchClientes();
    fetchMotos();
  }, []);

  // --- useEffect para precargar datos en el formulario al editar ---
  useEffect(() => {
    if (editandoId) {
      const facturaAEditar = facturas.find((f) => f.id === editandoId);
      if (facturaAEditar) {
        setFactura({
          ...facturaAEditar,
          total: String(facturaAEditar.total), // Asegurar que total sea string para input
        });
      }
    } else {
      // Limpiar formulario cuando no se está editando
      setFactura({
        clienteId: "",
        motoId: "",
        descripcion: "",
        total: "",
        fecha: new Date().toISOString().split("T")[0],
      });
    }
  }, [editandoId, facturas]); // Depende de editandoId y facturas (para encontrar la factura)

  // --- Manejadores de eventos ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFactura({ ...factura, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convertir total a número antes de enviar
    const facturaToSend = {
      ...factura,
      total: parseFloat(factura.total) || 0,
      // Asegurarse de que clienteId y motoId sean números si la API lo espera
      clienteId: Number(factura.clienteId),
      motoId: Number(factura.motoId),
    };

    const metodo = editandoId ? "PUT" : "POST";
    const url = editandoId
      ? `http://localhost:3001/api/facturas/${editandoId}`
      : "http://localhost:3001/api/facturas";

    try {
      const res = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(facturaToSend),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error al ${editandoId ? "actualizar" : "registrar"} factura: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      alert(`Factura ${editandoId ? "actualizada" : "registrada"} con ID ${data.id || editandoId}`);
      setEditandoId(null); // Salir del modo edición
      fetchFacturas(); // Recargar la lista de facturas
    } catch (error) {
      console.error("Error en la operación de factura:", error);
      alert(`No se pudo ${editandoId ? "actualizar" : "registrar"} la factura: ${error.message}`);
    }
  };

  const handleEditar = (fact) => {
    setEditandoId(fact.id);
    // El useEffect se encargará de cargar los datos en el formulario
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta factura?")) {
      try {
        const res = await fetch(`http://localhost:3001/api/facturas/${id}`, { method: "DELETE" });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error al eliminar factura: ${res.status} - ${errorText}`);
        }

        alert("Factura eliminada con éxito.");
        fetchFacturas(); // Recargar la lista de facturas
      } catch (error) {
        console.error("Error al eliminar factura:", error);
        alert(`No se pudo eliminar la factura: ${error.message}`);
      }
    }
  };

  const clearEdit = () => {
    setEditandoId(null);
    // El useEffect se encargará de limpiar el formulario
  };

  // --- Estilos en línea (reutilizados de componentes anteriores) ---

  const formContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "3rem auto",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  };

  const listContainerStyle = {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    margin: "3rem auto",
    fontFamily: "'Segoe UI', Roboto', 'Helvetica Neue', Arial, sans-serif",
  };

  const headingStyle = {
    color: "#282c34",
    textAlign: "center",
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "700",
  };

  const listHeadingStyle = { // Para el título de la lista
    ...headingStyle,
    fontSize: "2rem",
    marginBottom: "2rem",
  };

  const inputStyle = {
    width: "calc(100% - 20px)",
    padding: "12px 10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "1rem",
    boxSizing: "border-box",
    backgroundColor: "#f9f9f9",
    color: "#333",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    background: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13.2-6.5H18.6c-5.1%200-9.3%201.8-12.9%205.5-3.6%203.7-5.5%208.5-5.5%2013.2V210c0%204.7%201.8%209.5%205.5%2013.2%203.6%203.7%208.2%205.5%2013.2%205.5h255.2c5.1%200%209.7-1.8%2013.2-5.5%203.6-3.7%205.5-8.5%205.5-13.2V82.6c0-4.7-1.8-9.5-5.5-13.2z%22%2F%3E%3C%2Fsvg%3E') no-repeat right 10px center / 12px auto",
    paddingRight: "30px",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
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
    margin: "0.5rem",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007bff",
    color: "#ffffff",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#6c757d",
    color: "#ffffff",
  };

  const ulListStyle = { // Estilos para la lista de facturas
    listStyle: "none",
    padding: "0",
    margin: "0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "1.5rem",
  };

  const liItemStyle = {
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

  const itemInfoStyle = {
    marginBottom: "1rem",
  };

  const itemIdStyle = {
    fontWeight: "bold",
    color: "#007bff",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  };

  const itemDetailStyle = {
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
  };

  const itemLabelStyle = {
    fontWeight: "bold",
    color: "#555",
    marginRight: "0.5rem",
  };

  const itemTotalStyle = {
    fontWeight: "bold",
    color: "#28a745",
    fontSize: "1.3rem",
    marginTop: "0.8rem",
    textAlign: "right",
  };

  const itemButtonContainerStyle = {
    marginTop: "1rem",
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.75rem",
  };

  const itemActionButtonStyle = {
    padding: "8px 15px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    color: "#ffffff",
  };

  const itemEditButtonStyle = {
    ...itemActionButtonStyle,
    backgroundColor: "#28a745",
  };

  const itemDeleteButtonStyle = {
    ...itemActionButtonStyle,
    backgroundColor: "#dc3545",
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

  const dropdownErrorStyle = { // Para errores en selectores
    color: "#dc3545",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    textAlign: "center",
  }


  return (
    <div>
      {/* --- Formulario de Factura --- */}
      <div style={formContainerStyle}>
        <h2 style={headingStyle}>
          {editandoId ? "Editar Factura" : "Registrar Factura"}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {loadingClients ? (
            <p style={{ ...inputStyle, textAlign: "center", fontStyle: "italic", color: "#666" }}>Cargando clientes...</p>
          ) : errorClients ? (
            <p style={dropdownErrorStyle}>{errorClients}</p>
          ) : (
            <select
              name="clienteId"
              value={factura.clienteId}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="">Seleccionar cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre} (ID: {c.id})
                </option>
              ))}
            </select>
          )}

          {loadingMotos ? (
            <p style={{ ...inputStyle, textAlign: "center", fontStyle: "italic", color: "#666" }}>Cargando motos...</p>
          ) : errorMotos ? (
            <p style={dropdownErrorStyle}>{errorMotos}</p>
          ) : (
            <select
              name="motoId"
              value={factura.motoId}
              onChange={handleChange}
              style={selectStyle}
              required
            >
              <option value="">Seleccionar moto</option>
              {motos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.placa} (ID: {m.id})
                </option>
              ))}
            </select>
          )}

          <textarea
            name="descripcion"
            placeholder="Descripción del servicio"
            value={factura.descripcion}
            onChange={handleChange}
            style={textareaStyle}
            required
          />
          <input
            name="total"
            placeholder="Total"
            type="number"
            step="0.01" // Permite decimales
            value={factura.total}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <input
            name="fecha"
            type="date"
            value={factura.fecha}
            onChange={handleChange}
            style={inputStyle}
            required
          />
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
            <button type="submit" style={primaryButtonStyle}>
              {editandoId ? "Guardar cambios" : "Registrar"}
            </button>
            {editandoId && (
              <button type="button" onClick={clearEdit} style={secondaryButtonStyle}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* --- Historial de Facturas (Lista) --- */}
      <div style={listContainerStyle}>
        <h3 style={listHeadingStyle}>Historial de Facturas</h3>
        {loadingFacturas && <p style={messageStyle}>Cargando facturas...</p>}
        {errorFacturas && <p style={errorMessageStyle}>{errorFacturas}</p>}

        {!loadingFacturas && !errorFacturas && facturas.length === 0 && (
          <p style={messageStyle}>No hay facturas registradas.</p>
        )}

        {!loadingFacturas && !errorFacturas && facturas.length > 0 && (
          <ul style={ulListStyle}>
            {facturas.map((f) => (
              <li key={f.id} style={liItemStyle}>
                <div style={itemInfoStyle}>
                  <p style={itemIdStyle}><span style={itemLabelStyle}>ID Factura:</span> {f.id}</p>
                  {/* Buscamos nombre de cliente y placa de moto si los datos están cargados */}
                  <p style={itemDetailStyle}>
                    <span style={itemLabelStyle}>Cliente:</span>
                    {clientes.find(c => c.id === f.clienteId)?.nombre || `ID: ${f.clienteId}`}
                  </p>
                  <p style={itemDetailStyle}>
                    <span style={itemLabelStyle}>Moto:</span>
                    {motos.find(m => m.id === f.motoId)?.placa || `ID: ${f.motoId}`}
                  </p>
                  <p style={itemDetailStyle}><span style={itemLabelStyle}>Fecha:</span> {f.fecha}</p>
                  <p style={itemDetailStyle}><span style={itemLabelStyle}>Descripción:</span> {f.descripcion}</p>
                </div>
                <p style={itemTotalStyle}>
                  <span style={itemLabelStyle}>Total:</span> ${parseFloat(f.total).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <div style={itemButtonContainerStyle}>
                  <button onClick={() => handleEditar(f)} style={itemEditButtonStyle}>
                    Editar
                  </button>
                  <button onClick={() => handleEliminar(f.id)} style={itemDeleteButtonStyle}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Facturas;