import { NextApiRequest } from 'next'
import bcrypt from 'bcrypt'
import pool from '../../../utils/db'
import { NextResponse } from 'next/server'
import { Utilisateurs } from '@/app/sites/[siteID]/utilisateurs/page'
import { streamToString } from '@/utils/streamUtils'

export async function POST(req: NextApiRequest) {
    const saltRounds = 10
    const user: Utilisateurs = JSON.parse(await streamToString(req.body))
    if (!user.password || typeof user.password !== 'string') {
        return NextResponse.json(
            { message: 'Invalid password.' },
            { status: 400 },
        )
    }

    const hashedPassword = await bcrypt.hash(user.password, saltRounds)

    try {
        await pool.query(
            `
                INSERT INTO Utilisateurs (
                    civilite,
                    nom,
                    prenom,
                    tel_perso,
                    mail,
                    commentaires,
                    password,
                    code_type_utilisateur
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user.civilite,
                user.nom,
                user.prenom,
                user.tel_perso,
                user.mail,
                user.commentaires,
                hashedPassword,
                user.code_type_utilisateur,
            ],
        )
        return NextResponse.json(
            { message: 'User registered.' },
            { status: 200 },
        )
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
