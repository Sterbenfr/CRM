import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    try {
        const [rows] = await pool.query(
            'Select code_type_don, code_type_produits FROM Dons WHERE code_Don = ?;',
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
