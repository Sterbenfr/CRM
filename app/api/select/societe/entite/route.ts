import { NextResponse } from 'next/server'
import connection from '../../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'Select code_entite as id, raison_sociale as label from Entite;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
