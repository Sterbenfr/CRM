import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'
import connection from '../../../utils/db'
import bcrypt from 'bcryptjs'
import { streamToString } from '../../../utils/streamUtils'
import { RowDataPacket } from 'mysql2'

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', req.url))
    }
    let data: { oldPassword: string; newPassword: string; userId: string }
    try {
        data = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { oldPassword, newPassword, userId } = data

    try {
        // Decrypte l'ancien MDP
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT password FROM `Utilisateurs` WHERE mail = ?',
            [userId],
        )
        if (rows.length === 0) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            )
        }
        const currentPasswordHash = rows[0].password
        console.log(currentPasswordHash)

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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const queryUpdate = await connection.query(
            'UPDATE `Utilisateurs` SET password = ? WHERE mail = ?',
            [newPasswordHash, userId],
        )
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error: ' + error },
            { status: 500 },
        )
    }
}
