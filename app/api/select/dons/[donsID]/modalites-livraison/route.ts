import { NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    try {
        const [rows] = await connection.query(
            'Select numero_livraison as id, CONCAT(dons.commentaires," - Livraison ",numero_livraison) as label FROM ModalitesLivraison LEFT JOIN dons ON ModalitesLivraison.code_don = dons.code_don WHERE ModalitesLivraison.code_don = ?;',
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
