const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los productos
router.get("/", (req, res) => {
  db.all("SELECT * FROM inventario", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear nuevo producto
router.post("/", (req, res) => {
  const { nombre, categoria, cantidad, precioUnitario, descripcion } = req.body;
  db.run(
    `INSERT INTO inventario (nombre, categoria, cantidad, precioUnitario, descripcion)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, categoria, cantidad, precioUnitario, descripcion],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Editar producto
router.put("/:id", (req, res) => {
  const { nombre, categoria, cantidad, precioUnitario, descripcion } = req.body;
  db.run(
    `UPDATE inventario SET nombre=?, categoria=?, cantidad=?, precioUnitario=?, descripcion=? WHERE id=?`,
    [nombre, categoria, cantidad, precioUnitario, descripcion, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// Eliminar producto (opcional)
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM inventario WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
