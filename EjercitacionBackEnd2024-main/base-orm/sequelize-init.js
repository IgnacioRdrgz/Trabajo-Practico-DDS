const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/reservas_vuelos.db");

const Vuelo = sequelize.define("vuelos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  numero_vuelo: {
    type: DataTypes.STRING(10),
    allowNull: false,
    unique: true,
  },
  destino: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  fecha_salida: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  fecha_llegada: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Aeropuerto = sequelize.define("aeropuertos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  ciudad: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Pasajero = sequelize.define("pasajeros", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  correo_electronico: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: "Correo electrónico inválido",
      },
    },
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Reserva = sequelize.define("reservas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha_reserva: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Avion = sequelize.define("aviones", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  modelo: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  aerolinea: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_fabricacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Aerolinea = sequelize.define("aerolineas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pais_origen: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Piloto = sequelize.define("pilotos", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  licencia: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  fecha_contratacion: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: false // Deshabilitar timestamps
});

const Tripulacion = sequelize.define('Tripulacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_contratacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'tripulacion', // Nombre exacto de la tabla en tu base de datos
  timestamps: false // Si no tienes timestamps en la tabla
});

// Relaciones entre tablas
Vuelo.belongsTo(Aerolinea); // Un vuelo pertenece a una aerolínea
Vuelo.belongsTo(Avion); // Un vuelo utiliza un avión
Vuelo.belongsTo(Aeropuerto, { as: 'aeropuerto_salida', foreignKey: 'aeropuerto_salida_id' });
Vuelo.belongsTo(Aeropuerto, { as: 'aeropuerto_llegada', foreignKey: 'aeropuerto_llegada_id' });

Reserva.belongsTo(Vuelo); // Una reserva pertenece a un vuelo
Reserva.belongsTo(Pasajero); // Una reserva pertenece a un pasajero

Tripulacion.belongsTo(Vuelo); // La tripulación trabaja en un vuelo
Piloto.belongsTo(Avion); // El piloto vuela un avión
// (Código de relaciones omitido por brevedad)

// Exportar modelos y sequelize
module.exports = {
  sequelize,
  Vuelo,
  Aeropuerto,
  Pasajero,
  Reserva,
  Avion,
  Aerolinea,
  Piloto,
  Tripulacion,
};
