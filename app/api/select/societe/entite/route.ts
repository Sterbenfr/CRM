import { NextResponse } from 'next/server'
import connection from '../../../../../utils/db'

export async function GET(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const url = new URL(request.url)
        console.log('Executing query...')
        const [rows] = await connection.query(
            'SELECT code_entite as id, raison_sociale as label FROM Entite;',
        )
        console.log('Query result:', rows)
        return NextResponse.json(rows)
    } catch (err) {
        console.error('Error executing query:', err)
        return NextResponse.json(
            { error: 'Internal Server Error: ' + err },
            { status: 500 },
        )
    }
}
