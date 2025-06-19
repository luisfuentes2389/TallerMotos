/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ClienteForm from "../components/ClienteForm";
import ClienteList from "../components/ClienteList";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteToEdit, setClienteToEdit] = useState(null);

  const fetchClientes = async () => {
    const res = await fetch("http://localhost:3001/api/clientes");
    const data = await res.json();
    setClientes(data);
  };


  const guardarCliente = async (cliente) => {
    if (cliente.id) {
      await fetch(`http://localhost:3001/api/clientes/${cliente.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
    } else {
      await fetch("http://localhost:3001/api/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
    }
    fetchClientes();
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="login-container">
      <h2>Gestión de Clientes</h2>
      <ClienteForm
        onSubmit={guardarCliente}
        clienteToEdit={clienteToEdit}
        clearEdit={() => setClienteToEdit(null)}
      />
      <ClienteList clientes={clientes} onEdit={setClienteToEdit} />
    </div>
  );
}

export default Clientes;
