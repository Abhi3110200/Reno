import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: process.env.DB_HOST, // or your remote MySQL host
  user: process.env.DB_USER, // the user you created
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true, // required by PlanetScale
  },
})

export default pool
