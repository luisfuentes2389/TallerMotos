const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mi-taller.db");

db.serialize(() => {
  // Tabla de inventario
  db.run(`
    CREATE TABLE IF NOT EXISTS inventario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      categoria TEXT,
      cantidad INTEGER NOT NULL,
      precioUnitario REAL,
      descripcion TEXT
    )
  `);

  // Tabla de clientes
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      cedula TEXT,
      telefono TEXT,
      correo TEXT
    )
  `);
});

module.exports = db;
