import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'Select code_type_de_Prestataire as id, raison_sociale as label FROM Prestataires;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
