import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Importa useLocation
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Motos from "./pages/Motos";
import Inventario from "./pages/Inventario";
import Novedades from "./pages/Novedades";
import Facturas from "./pages/Facturas";
import PrivateRoute from "./components/PrivateRoute";
import Registro from "./pages/Registro";


function AppContent() {
  const location = useLocation(); 

  const noNavbarRoutes = ['/login', '/registro'];

  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <NavBar />} {/* Renderizado condicional del NavBar */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />
        <Route
          path="/motos"
          element={
            <PrivateRoute>
              <Motos />
            </PrivateRoute>
          }
        />
        <Route
          path="/facturas"
          element={
            <PrivateRoute>
              <Facturas />
            </PrivateRoute>
          }
        />
        <Route
          path="/inventario"
          element={
            <PrivateRoute>
              <Inventario />
            </PrivateRoute>
          }
        />
        <Route
          path="/novedades"
          element={
            <PrivateRoute>
              <Novedades />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* Envuelve tu AppContent dentro de Router */}
    </Router>
  );
}

export default App;