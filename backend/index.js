const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Conexión a la base de datos
const db = new sqlite3.Database("./taller.db");

// Crear tablas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS motos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      marca TEXT,
      modelo TEXT,
      placa TEXT,
      año TEXT,
      color TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      cedula TEXT,
      telefono TEXT,
      correo TEXT
    )
  `);

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

  db.run(`
    CREATE TABLE IF NOT EXISTS novedades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descripcion TEXT NOT NULL,
      fecha TEXT NOT NULL,
      relacionadoCon TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS facturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT,
      moto TEXT,
      descripcion TEXT,
      total REAL,
      fecha TEXT
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      contraseña TEXT NOT NULL
    )
  `);
});

// =======================
// RUTAS DE MOTOS
// =======================
app.get("/api/motos", (req, res) => {
  db.all("SELECT * FROM motos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/motos", (req, res) => {
  const { marca, modelo, placa, año, color } = req.body;
  db.run(
    `INSERT INTO motos (marca, modelo, placa, año, color) VALUES (?, ?, ?, ?, ?)`,
    [marca, modelo, placa, año, color],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/motos/:id", (req, res) => {
  const { id } = req.params;
  const { marca, modelo, placa, año, color } = req.body;
  db.run(
    `UPDATE motos SET marca = ?, modelo = ?, placa = ?, año = ?, color = ? WHERE id = ?`,
    [marca, modelo, placa, año, color, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/api/motos/:id", (req, res) => {
  db.run("DELETE FROM motos WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// RUTAS DE CLIENTES
// =======================
app.get("/api/clientes", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/clientes", (req, res) => {
  const { nombre, cedula, telefono, correo } = req.body;
  db.run(
    `INSERT INTO clientes (nombre, cedula, telefono, correo) VALUES (?, ?, ?, ?)`,
    [nombre, cedula, telefono, correo],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/clientes/:id", (req, res) => {
  const { nombre, cedula, telefono, correo } = req.body;
  db.run(
    `UPDATE clientes SET nombre = ?, cedula = ?, telefono = ?, correo = ? WHERE id = ?`,
    [nombre, cedula, telefono, correo, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/api/clientes/:id", (req, res) => {
  db.run("DELETE FROM clientes WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// INVENTARIO
// =======================
app.get("/api/inventario", (req, res) => {
  db.all("SELECT * FROM inventario", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/inventario", (req, res) => {
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

app.put("/api/inventario/:id", (req, res) => {
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

app.delete("/api/inventario/:id", (req, res) => {
  db.run("DELETE FROM inventario WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// NOVEDADES
// =======================
app.get("/api/novedades", (req, res) => {
  db.all("SELECT * FROM novedades", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/novedades", (req, res) => {
  const { titulo, descripcion, fecha, relacionadoCon } = req.body;
  db.run(
    `INSERT INTO novedades (titulo, descripcion, fecha, relacionadoCon) VALUES (?, ?, ?, ?)`,
    [titulo, descripcion, fecha, relacionadoCon],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/novedades/:id", (req, res) => {
  const { titulo, descripcion, fecha, relacionadoCon } = req.body;
  db.run(
    `UPDATE novedades SET titulo = ?, descripcion = ?, fecha = ?, relacionadoCon = ? WHERE id = ?`,
    [titulo, descripcion, fecha, relacionadoCon, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/api/novedades/:id", (req, res) => {
  db.run("DELETE FROM novedades WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// FACTURAS
// =======================
app.get("/api/facturas", (req, res) => {
  db.all("SELECT * FROM facturas", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/facturas", (req, res) => {
  const { cliente, moto, descripcion, total, fecha } = req.body;
  db.run(
    `INSERT INTO facturas (cliente, moto, descripcion, total, fecha) VALUES (?, ?, ?, ?, ?)`,
    [cliente, moto, descripcion, total, fecha],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.put("/api/facturas/:id", (req, res) => {
  const { cliente, moto, descripcion, total, fecha } = req.body;
  db.run(
    `UPDATE facturas SET cliente=?, moto=?, descripcion=?, total=?, fecha=? WHERE id=?`,
    [cliente, moto, descripcion, total, fecha, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

app.delete("/api/facturas/:id", (req, res) => {
  db.run("DELETE FROM facturas WHERE id=?", [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// =======================
// INICIO SERVIDOR
// =======================
app.listen(PORT, () => {
  console.log(`✅ Servidor backend en http://localhost:${PORT}`);
});
// validar login
// Validar login
app.post("/api/login", (req, res) => {
  const { correo, contraseña } = req.body;

  db.get(
    `SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?`,
    [correo, contraseña],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });

      if (!row)
        return res.status(401).json({ error: "Credenciales incorrectas" });

      res.json({ id: row.id, nombre: row.nombre }); // puedes enviar más info si deseas
    }
  );
});

// Registrar usuario
app.post("/api/usuarios", (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  db.run(
    `INSERT INTO usuarios (nombre, correo, contraseña) VALUES (?, ?, ?)`,
    [nombre, correo, contraseña],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});
