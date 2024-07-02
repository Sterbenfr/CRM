import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await pool.query(
            "Select code_utilisateur as id, CONCAT(prenom,' ',nom) as label from Utilisateurs;",
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
