// Ruta para eliminar una moto por ID
app.delete("/api/motos/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM motos WHERE id = ?", [id], function (err) {
    if (err) {
      console.error("Error al eliminar la moto:", err.message);
      return res.status(500).json({ error: "Error al eliminar la moto" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Moto no encontrada" });
    }

    res.json({ mensaje: "Moto eliminada correctamente" });
  });
});
