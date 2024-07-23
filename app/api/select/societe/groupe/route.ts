import { NextResponse } from 'next/server'
import connection from '../../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_groupe as id, nom_du_Groupe as label FROM Groupe;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
