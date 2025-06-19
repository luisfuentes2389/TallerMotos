import { useState, useEffect } from "react";
import InventarioForm from "../components/InventarioForm";
import InventarioList from "../components/InventarioList";

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [productoToEdit, setProductoToEdit] = useState(null);

  const fetchProductos = async () => {
    const res = await fetch("http://localhost:3001/api/inventario");
    const data = await res.json();
    setProductos(data);
  };

  const guardarProducto = async (producto) => {
    if (producto.id) {
      await fetch(`http://localhost:3001/api/inventario/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
    } else {
      await fetch("http://localhost:3001/api/inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
    }
    fetchProductos();
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      <InventarioForm
        onSubmit={guardarProducto}
        productoToEdit={productoToEdit}
        clearEdit={() => setProductoToEdit(null)}
      />
      <InventarioList productos={productos} onEdit={setProductoToEdit} />
    </div>
  );
}

export default Inventario;
