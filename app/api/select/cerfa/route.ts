import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'Select code_Don as id, code_Don as label, code_type_don as params1, date_proposition_don as params2 FROM Dons;',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
