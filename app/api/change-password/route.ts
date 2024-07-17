import { NextResponse } from 'next/server'
import connection from '../../../utils/db'
import bcrypt from 'bcryptjs'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../utils/streamUtils'
import { RowDataPacket } from 'mysql2'

export async function POST(req: NextApiRequest) {
    let data: { oldPassword: string; newPassword: string; userId: string }
    try {
        data = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { oldPassword, newPassword, userId } = data

    try {
        // Decrypte l'ancien MDP
        const querySelect =
            'SELECT password FROM `utilisateurs` WHERE code_utilisateur = ?'
        const [rows] = await connection.query<RowDataPacket[]>(querySelect, [
            userId,
        ])
        if (rows.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            )
        }
        const currentPasswordHash = rows[0].password

        // Verifie l'ancien MDP

        const isOldPasswordCorrect = await bcrypt.compare(
            oldPassword,
            currentPasswordHash,
        )
        if (!isOldPasswordCorrect) {
            return NextResponse.json(
                { error: 'Old password is incorrect' },
                { status: 400 },
            )
        }

        // Crypte le MDP

        const newPasswordHash = await bcrypt.hash(newPassword, 10)

        // Met a jour le mdp
        const queryUpdate =
            'UPDATE `utilisateurs` SET password = ? WHERE code_utilisateur = ?'
        await connection.query(queryUpdate, [newPasswordHash, userId])

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error: ' + error },
            { status: 500 },
        )
    }
}
