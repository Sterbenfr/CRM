import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_societe as id, raison_sociale as label FROM Entreprise;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
