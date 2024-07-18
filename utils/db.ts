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
        connectionLimit: 50,
        queueLimit: 0,
        waitForConnections: true,
        idleTimeout: 60000,
    })
    .promise()

connection.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId)
})

connection.on('release', function (connection) {
    console.log('Connection %d released', connection.threadId)
})

export default connection
