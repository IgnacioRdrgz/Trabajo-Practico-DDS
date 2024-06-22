// Importar el módulo aa-sqlite para manejar SQLite
const db = require("aa-sqlite");

// Función asincrónica para crear la base de datos y las tablas si no existen
async function CrearBaseSiNoExiste() {
  try {
    // Abrir la conexión a la base de datos
    await db.open("./.data/reservas_vuelos.db");

    // Verificar si ya existen las tablas necesarias
    const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");

    if (!tables.some(table => table.name === 'Vuelos')) {
      // Crear la tabla Vuelos si no existe
      await db.run(
        `CREATE TABLE Vuelos (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           numero_vuelo TEXT NOT NULL,
           destino TEXT NOT NULL,
           fecha_salida TEXT NOT NULL,
           fecha_llegada TEXT NOT NULL
         );`
      );
      console.log("Tabla Vuelos creada.");
      
      // Insertar datos básicos en la tabla Vuelos
      await db.run(
        `INSERT INTO Vuelos (numero_vuelo, destino, fecha_salida, fecha_llegada)
         VALUES ('AV123', 'New York', '2024-07-01', '2024-07-02'),
                ('AV456', 'Paris', '2024-07-03', '2024-07-04'),
                ('AV789', 'Tokyo', '2024-07-05', '2024-07-06');`
      );
      console.log("Datos insertados en la tabla Vuelos.");
    }

    if (!tables.some(table => table.name === 'Aeropuertos')) {
      // Crear la tabla Aeropuertos si no existe
      await db.run(
        `CREATE TABLE Aeropuertos (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           ciudad TEXT NOT NULL,
           pais TEXT NOT NULL
         );`
      );
      console.log("Tabla Aeropuertos creada.");
      
      // Insertar datos básicos en la tabla Aeropuertos
      await db.run(
        `INSERT INTO Aeropuertos (nombre, ciudad, pais)
         VALUES ('JFK International Airport', 'New York', 'USA'),
                ('Charles de Gaulle Airport', 'Paris', 'France'),
                ('Narita International Airport', 'Tokyo', 'Japan');`
      );
      console.log("Datos insertados en la tabla Aeropuertos.");
    }

    if (!tables.some(table => table.name === 'Pasajeros')) {
      // Crear la tabla Pasajeros si no existe
      await db.run(
        `CREATE TABLE Pasajeros (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           correo_electronico TEXT NOT NULL,
           fecha_nacimiento TEXT
         );`
      );
      console.log("Tabla Pasajeros creada.");
      
      // Insertar datos básicos en la tabla Pasajeros
      await db.run(
        `INSERT INTO Pasajeros (nombre, correo_electronico, fecha_nacimiento)
         VALUES ('Alice Smith', 'alice@example.com', '1990-05-15'),
                ('Bob Johnson', 'bob@example.com', '1985-09-22'),
                ('Eve Brown', 'eve@example.com', '2000-03-10');`
      );
      console.log("Datos insertados en la tabla Pasajeros.");
    }

    if (!tables.some(table => table.name === 'Reservas')) {
      // Crear la tabla Reservas si no existe
      await db.run(
        `CREATE TABLE Reservas (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           vuelo_id INTEGER,
           pasajero_id INTEGER,
           fecha_reserva TEXT,
           FOREIGN KEY (vuelo_id) REFERENCES Vuelos(id),
           FOREIGN KEY (pasajero_id) REFERENCES Pasajeros(id)
         );`
      );
      console.log("Tabla Reservas creada.");
      
      // Insertar datos básicos en la tabla Reservas
      await db.run(
        `INSERT INTO Reservas (vuelo_id, pasajero_id, fecha_reserva)
         VALUES (1, 1, '2024-06-18'),
                (2, 2, '2024-06-19'),
                (3, 3, '2024-06-20');`
      );
      console.log("Datos insertados en la tabla Reservas.");
    }

    if (!tables.some(table => table.name === 'Aviones')) {
      // Crear la tabla Aviones si no existe
      await db.run(
        `CREATE TABLE Aviones (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           modelo TEXT NOT NULL,
           capacidad INTEGER,
           aerolinea TEXT,
           fecha_fabricacion TEXT
         );`
      );
      console.log("Tabla Aviones creada.");
      
      // Insertar datos básicos en la tabla Aviones
      await db.run(
        `INSERT INTO Aviones (modelo, capacidad, aerolinea, fecha_fabricacion)
         VALUES ('Boeing 737', 150, 'American Airlines', '2022-06-18'),
                ('Airbus A380', 500, 'Air France', '2023-06-18'),
                ('Boeing 787', 250, 'Japan Airlines', '2024-06-18');`
      );
      console.log("Datos insertados en la tabla Aviones.");
    }

    if (!tables.some(table => table.name === 'Aerolineas')) {
      // Crear la tabla Aerolineas si no existe
      await db.run(
        `CREATE TABLE Aerolineas (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           pais_origen TEXT
         );`
      );
      console.log("Tabla Aerolineas creada.");
      
      // Insertar datos básicos en la tabla Aerolineas
      await db.run(
        `INSERT INTO Aerolineas (nombre, pais_origen)
         VALUES ('American Airlines', 'USA'),
                ('Air France', 'France'),
                ('Japan Airlines', 'Japan');`
      );
      console.log("Datos insertados en la tabla Aerolineas.");
    }

    if (!tables.some(table => table.name === 'Pilotos')) {
      // Crear la tabla Pilotos si no existe
      await db.run(
        `CREATE TABLE Pilotos (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           licencia TEXT NOT NULL,
           fecha_contratacion TEXT
         );`
      );
      console.log("Tabla Pilotos creada.");
      
      // Insertar datos básicos en la tabla Pilotos
      await db.run(
        `INSERT INTO Pilotos (nombre, licencia, fecha_contratacion)
         VALUES ('John Doe', '123456', '2010-01-15'),
                ('Jane Smith', '654321', '2015-05-20'),
                ('Michael Brown', '987654', '2018-03-10');`
      );
      console.log("Datos insertados en la tabla Pilotos.");
    }

    if (!tables.some(table => table.name === 'Tripulacion')) {
      // Crear la tabla Tripulacion si no existe
      await db.run(
        `CREATE TABLE Tripulacion (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           rol TEXT,
           fecha_contratacion TEXT
         );`
      );
      console.log("Tabla Tripulacion creada.");
      
      // Insertar datos básicos en la tabla Tripulacion
      await db.run(
        `INSERT INTO Tripulacion (nombre, rol, fecha_contratacion)
         VALUES ('Emily Davis', 'Azafata', '2012-07-01'),
                ('David Wilson', 'Piloto', '2014-09-15'),
                ('Sophia Martinez', 'Copiloto', '2017-11-20');`
      );
      console.log("Datos insertados en la tabla Tripulacion.");
    }

    console.log("Base de datos y datos creados correctamente.");
  } catch (error) {
    console.error("Error al crear la base de datos:", error);
  } finally {
    // Cerrar la conexión a la base de datos
    await db.close();
  }
}

// Llamar a la función para crear la base de datos y las tablas al iniciar la aplicación
CrearBaseSiNoExiste();
