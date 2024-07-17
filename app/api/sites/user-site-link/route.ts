import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT * FROM `SitesRattachement` LIMIT 1000',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
