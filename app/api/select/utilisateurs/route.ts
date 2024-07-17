import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'Select code_type_utilisateur as id, libelle as label FROM TypesUtilisateurs;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
