import { Link, useLocation, useNavigate } from "react-router-dom"; // Importa useNavigate

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para obtener el estilo de los enlaces, destacando el activo
  const getLinkStyle = (path) => {
    const baseStyle = {
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "1.1rem",
      padding: "0.5rem 1rem",
      margin: "0 0.75rem",
      borderRadius: "5px",
      transition:
        "background-color 0.3s ease, color 0.3s ease, transform 0.2s ease",
      color: "#61dafb", // Color predeterminado para los enlaces
      cursor: "pointer",
      // Estilos para hover (opcional, se puede manejar con CSS externo o librerías)
      ":hover": {
        backgroundColor: "rgba(97, 218, 251, 0.1)", // Un azul claro translúcido al pasar el ratón
        transform: "scale(1.05)",
      },
    };

    const activeStyle = {
      color: "#ffffff",
      backgroundColor: "#007bff", // Fondo azul para el enlace activo
    };

    return location.pathname === path ? { ...baseStyle, ...activeStyle } : baseStyle;
  };

  // --- Función para cerrar sesión ---
  const cerrarSesion = () => {
    localStorage.removeItem("auth"); // Elimina la bandera de autenticación
    localStorage.removeItem("usuario"); // Elimina la información del usuario
    navigate("/login"); // Redirige al usuario a la página de login
  };

  // Verifica si el usuario está autenticado (puedes ajustar esta lógica según cómo manejes la autenticación)
  const isAuthenticated = localStorage.getItem("auth") === "true";

  // --- Estilos para el botón de cerrar sesión ---
  const logoutButtonStyle = {
    backgroundColor: "#dc3545", // Rojo para "Cerrar sesión"
    color: "#ffffff",
    padding: "0.6rem 1.2rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginLeft: "2rem", // Margen a la izquierda para separarlo de los Links
    transition: "background-color 0.3s ease, transform 0.2s ease",
    ":hover": {
      backgroundColor: "#c82333", // Rojo más oscuro al pasar el ratón
      transform: "scale(1.05)",
    },
  };

  return (
    <nav
      style={{
        backgroundColor: "#282c34", // Un azul oscuro
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "center", // Centra los enlaces
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Sutil sombra
        position: "sticky", // Se mantiene en la parte superior al hacer scroll
        top: 0,
        zIndex: 1000, // Asegura que esté por encima de otros elementos
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", // Fuente moderna
      }}
    >
      <Link to="/" style={getLinkStyle("/")}>
        Inicio
      </Link>
      <Link to="/clientes" style={getLinkStyle("/clientes")}>
        Clientes
      </Link>
      <Link to="/motos" style={getLinkStyle("/motos")}>
        Motos
      </Link>
      <Link to="/inventario" style={getLinkStyle("/inventario")}>
        Inventario
      </Link>
      <Link to="/novedades" style={getLinkStyle("/novedades")}>
        Novedades
      </Link>
      <Link to="/facturas" style={getLinkStyle("/facturas")}>
        Facturas
      </Link>

      {/* Botón de Cerrar Sesión (solo si está autenticado) */}
      {isAuthenticated && (
        <button onClick={cerrarSesion} style={logoutButtonStyle}>
          Cerrar sesión
        </button>
      )}
    </nav>
  );
};

export default NavBar;