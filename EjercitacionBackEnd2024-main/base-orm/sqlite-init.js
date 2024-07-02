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
    idAeropuerto INTEGER NOT NULL,
    fecha_salida TEXT NOT NULL,
    fecha_llegada TEXT NOT NULL,
    FOREIGN KEY (idAeropuerto) REFERENCES aeropuertos(idAeropuerto)
    
    );`
      );
      console.log("Tabla Vuelos creada.");

      // Insertar datos básicos en la tabla Vuelos
      await db.run(
        `INSERT INTO Vuelos 
         VALUES (1 , 'AA100', 'New York', 1, '2024-07-01', '2024-07-01'),
                (2 , 'AF200', 'Paris', 2, '2024-07-02', '2024-07-02'),
                (3 , 'JL300', 'Tokyo', 6, '2024-07-03', '2024-07-03'),
                (4 , 'SQ400', 'Singapore', 7, '2024-07-04', '2024-07-04'),
                (5 , 'EK500', 'Dubai', 8, '2024-07-05', '2024-07-05'),
                (6 , 'LH600', 'Frankfurt', 9,  '2024-07-06', '2024-07-07'),
                (7 , 'QF700', 'Sydney', 10, '2024-07-08', '2024-07-09'),
                (8 , 'BA800', 'London', 4, '2024-07-09', '2024-07-09'),
                (9 , 'UA900', 'Los Angeles', 5, '2024-07-10', '2024-07-11'),
                (10 , 'CX1000', 'Hong Kong', 7, '2024-07-11', '2024-07-11');`
      );
      console.log("Datos insertados en la tabla Vuelos.");
    }

    if (!tables.some(table => table.name === 'Aeropuertos')) {
      // Crear la tabla Aeropuertos si no existe
      await db.run(
        `CREATE TABLE Aeropuertos (
           idAeropuerto INTEGER PRIMARY KEY AUTOINCREMENT,
           nombre TEXT NOT NULL,
           ciudad TEXT NOT NULL,
           pais TEXT NOT NULL,
           fecha_inauguracion TEXT NOT NULL
         );`
      );
      console.log("Tabla Aeropuertos creada.");

      // Insertar datos básicos en la tabla Aeropuertos
      await db.run(
        `INSERT INTO Aeropuertos
         VALUES (1 , 'JFK International Airport', 'New York', 'USA', '1990-07-09'),
                (2 , 'Charles de Gaulle Airport', 'Paris', 'France','1990-07-09'),
                (3 , 'Narita International Airport', 'Tokyo', 'Japan','1990-07-09'),
                (4 , 'Heathrow Airport', 'London', 'United Kingdom','1990-07-09'),
                (5 , 'Los Angeles International Airport', 'Los Angeles', 'USA','1990-07-09'),
                (6 , 'Haneda Airport', 'Tokyo', 'Japan','1990-07-09'),
                (7 , 'Changi Airport', 'Singapore', 'Singapore','1990-07-09'),
                (8 , 'Dubai International Airport', 'Dubai', 'United Arab Emirates', '1990-07-09'),
                (9 , 'Frankfurt Airport', 'Frankfurt', 'Germany','1990-07-09'),
                (10, 'Sydney Airport', 'Sydney', 'Australia','1990-07-09');`
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
         VALUES 
           ('Boeing 737', 150, 'American Airlines', '2022-06-18'),
           ('Airbus A380', 500, 'Air France', '2023-06-18'),
           ('Boeing 787', 250, 'Japan Airlines', '2024-06-18'),
           ('Airbus A320', 180, 'Lufthansa', '2021-05-12'),
           ('Boeing 777', 300, 'Emirates', '2023-08-27'),
           ('Airbus A350', 270, 'Qatar Airways', '2023-10-15'),
           ('Boeing 737 MAX', 200, 'Ryanair', '2024-01-30'),
           ('Airbus A330', 250, 'Singapore Airlines', '2022-11-05'),
           ('Boeing 747', 400, 'British Airways', '2023-09-14'),
           ('Embraer E190', 110, 'KLM', '2022-03-20');`
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
         VALUES 
           ('American Airlines', 'USA'),
           ('Air France', 'France'),
           ('Japan Airlines', 'Japan'),
           ('Lufthansa', 'Germany'),
           ('Emirates', 'UAE'),
           ('Qatar Airways', 'Qatar'),
           ('Ryanair', 'Ireland'),
           ('Singapore Airlines', 'Singapore'),
           ('British Airways', 'UK'),
           ('KLM', 'Netherlands');`
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
           fecha_contratacion TEXT,
           idPiloto INTEGER

         );`
      );
      console.log("Tabla Tripulacion creada.");

      // Insertar datos básicos en la tabla Tripulacion
      await db.run(
        `INSERT INTO Tripulacion (nombre, rol, fecha_contratacion,idPiloto)
         VALUES ('Emily Davis', 'Azafata', '2012-07-01',1),
                ('David Wilson', 'Piloto', '2014-09-15',2),
                ('Sophia Martinez', 'Copiloto', '2017-11-20',3);`
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
