import mysql from 'mysql2/promise'
import connection from './db'
const bcrypt = require('bcryptjs')

interface User {
    id: string
    email: string
    password: string
    role: string
    name: string
}

export async function findUser(email: string): Promise<User | null> {
    try {
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(
            'SELECT code_utilisateur AS id, mail AS email, password, code_type_utilisateur AS role, nom AS name FROM Utilisateurs WHERE mail = ?',
            [email],
        )

        if (Array.isArray(rows) && rows.length > 0) {
            const user = rows[0]
            return {
                id: user.id,
                email: user.email,
                password: user.password,
                name: user.name,
                role: user.role,
            }
        } else {
            return null
        }
    } catch (error) {
        console.error('Database query error:', error)
        throw new Error('Error finding user in the database')
    }
}

export async function verifyPassword(
    password: string,
    hash: string,
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hash)
    } catch (error) {
        console.error('Password verification error:', error)
        throw new Error('Error verifying password')
    }
}
