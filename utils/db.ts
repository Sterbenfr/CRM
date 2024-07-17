import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const connection = mysql
    .createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: Number(process.env.DB_PORT),
        timezone: '+00:00',
        charset: 'utf8mb4',
        connectionLimit: 10,
        queueLimit: 0,
        waitForConnections: true, // Wait for connections instead of throwing an error
        idleTimeout: 60000, // Close idle connections after 60 seconds
    })
    .promise()

export default connection
