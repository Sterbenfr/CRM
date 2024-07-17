import { NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    try {
        const [rows] = await connection.query(
            'Select code_Don as id, commentaires as label FROM Dons WHERE code_Don = ?;',
            [params.donsID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
