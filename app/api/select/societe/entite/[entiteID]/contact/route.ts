import { NextResponse } from 'next/server'
import connection from '../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID: string } },
) {
    try {
        const [rows] = await connection.query(
            `Select code_contact as id, CONCAT(nom,' ', prenom) as label from Contacts WHERE code_entite = ?;`,
            [params.entiteID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
