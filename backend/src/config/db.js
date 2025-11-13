module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 1433,
  database: process.env.DB_NAME || 'notes_app',
  username: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || '',
  dialect: 'mssql', // ✅ Cambiado de 'mysql' a 'mssql'
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true
    }
  },
  logging: false
};