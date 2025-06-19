import { useEffect, useState } from "react";
// No necesitamos useNavigate ni Link si el botón de cerrar sesión está en el NavBar
// Si planeas agregar botones de navegación específicos aquí, entonces sí los necesitarías
// import { Link, useNavigate } from "react-router-dom"; 

function Home() {
  // Estado para las estadísticas
  const [motosCount, setMotosCount] = useState(0);
  const [clientesCount, setClientesCount] = useState(0);
  const [facturasCount, setFacturasCount] = useState(0);
  const [novedadesRecientes, setNovedadesRecientes] = useState([]);

  // Estados para carga y error general
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar todos los datos del dashboard
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch Motos
      const motosRes = await fetch("http://localhost:3001/api/motos");
      if (!motosRes.ok) throw new Error("Error al cargar motos.");
      const motosData = await motosRes.json();
      setMotosCount(motosData.length);

      // Fetch Clientes
      const clientesRes = await fetch("http://localhost:3001/api/clientes");
      if (!clientesRes.ok) throw new Error("Error al cargar clientes.");
      const clientesData = await clientesRes.json();
      setClientesCount(clientesData.length);

      // Fetch Facturas
      const facturasRes = await fetch("http://localhost:3001/api/facturas");
      if (!facturasRes.ok) throw new Error("Error al cargar facturas.");
      const facturasData = await facturasRes.json();
      setFacturasCount(facturasData.length);

      // Fetch Novedades (mostrar las 3 más recientes como alertas)
      const novedadesRes = await fetch("http://localhost:3001/api/novedades");
      if (!novedadesRes.ok) throw new Error("Error al cargar novedades.");
      const novedadesData = await novedadesRes.json();
      // Ordenar por fecha (asumiendo que tienen un campo 'fecha' en formato YYYY-MM-DD o Date-compatible)
      const sortedNovedades = novedadesData.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setNovedadesRecientes(sortedNovedades.slice(0, 3)); // Mostrar solo las 3 más recientes

    } catch (err) {
      console.error("Error al cargar datos del dashboard:", err);
      setError("No se pudieron cargar todos los datos del dashboard. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []); // Cargar datos al montar el componente

  // --- Estilos en línea para la pantalla Home/Dashboard ---

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

  const dashboardGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Columnas adaptativas para métricas
    gap: "1.5rem",
    marginBottom: "3rem",
  };

  const metricCardStyle = {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const metricTitleStyle = {
    color: "#007bff",
    fontSize: "1.3rem",
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const metricCountStyle = {
    color: "#28a745", // Verde para los números
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "0.5rem 0",
  };

  const alertsSectionHeadingStyle = {
    ...mainHeadingStyle,
    fontSize: "2rem",
    marginBottom: "1.5rem",
    marginTop: "2rem",
  };

  const alertsGridStyle = {
    display: "grid",
    gridTemplateColumns: "1fr", // Una columna para las alertas, una debajo de otra
    gap: "1rem",
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
  };

  const alertCardStyle = {
    backgroundColor: "#fff3cd", // Amarillo claro para alerta
    border: "1px solid #ffeeba",
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  };

  const alertTitleStyle = {
    color: "#856404", // Marrón oscuro
    fontSize: "1.1rem",
    fontWeight: "bold",
    marginBottom: "0.2rem",
  };

  const alertDescriptionStyle = {
    color: "#856404",
    fontSize: "0.95rem",
    lineHeight: "1.4",
  };

  const alertDateStyle = {
    color: "#856404",
    fontSize: "0.85rem",
    fontStyle: "italic",
    textAlign: "right",
    marginTop: "0.5rem",
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
      <h2 style={mainHeadingStyle}>Bienvenido al Panel de Control del Taller</h2>
      <p style={introParagraphStyle}>
        Aquí podrás ver un resumen rápido de la actividad y los datos clave de tu negocio.
      </p>

      {loading && <p style={messageStyle}>Cargando datos del dashboard...</p>}
      {error && <p style={errorMessageStyle}>{error}</p>}

      {!loading && !error && (
        <>
          {/* Sección de Métricas */}
          <div style={dashboardGridStyle}>
            <div style={metricCardStyle}>
              <h3 style={metricTitleStyle}>Total Motos</h3>
              <p style={metricCountStyle}>{motosCount}</p>
            </div>
            <div style={metricCardStyle}>
              <h3 style={metricTitleStyle}>Total Clientes</h3>
              <p style={metricCountStyle}>{clientesCount}</p>
            </div>
            <div style={metricCardStyle}>
              <h3 style={metricTitleStyle}>Total Facturaciones</h3>
              <p style={metricCountStyle}>{facturasCount}</p>
            </div>
            <div style={metricCardStyle}>
              <h3 style={metricTitleStyle}>Novedades Activas</h3>
              {/* Aquí podrías poner el número total de novedades o un conteo de "pendientes" */}
              <p style={metricCountStyle}>{novedadesRecientes.length}</p>
            </div>
          </div>

          {/* Sección de Novedades Recientes / Alertas */}
          <h3 style={alertsSectionHeadingStyle}>Novedades Recientes / Alertas</h3>
          {novedadesRecientes.length === 0 ? (
            <p style={{ ...messageStyle, padding: "1rem" }}>No hay novedades recientes.</p>
          ) : (
            <div style={alertsGridStyle}>
              {novedadesRecientes.map((novedad) => (
                <div key={novedad.id} style={alertCardStyle}>
                  <p style={alertTitleStyle}>{novedad.titulo}</p>
                  <p style={alertDescriptionStyle}>{novedad.descripcion}</p>
                  <p style={alertDateStyle}>Fecha: {novedad.fecha}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;