const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los clientes
router.get("/", (req, res) => {
  db.all("SELECT * FROM clientes", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nuevo cliente
router.post("/", (req, res) => {
  const { nombre, cedula, telefono, correo } = req.body;
  db.run(
    `INSERT INTO clientes (nombre, cedula, telefono, correo)
     VALUES (?, ?, ?, ?)`,
    [nombre, cedula, telefono, correo],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Editar cliente
router.put("/:id", (req, res) => {
  const { nombre, cedula, telefono, correo } = req.body;
  db.run(
    `UPDATE clientes SET nombre=?, cedula=?, telefono=?, correo=? WHERE id=?`,
    [nombre, cedula, telefono, correo, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Eliminar cliente
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM clientes WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
