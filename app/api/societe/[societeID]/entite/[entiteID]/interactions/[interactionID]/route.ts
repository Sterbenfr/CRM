import { NextResponse } from 'next/server'
import connection from '../../../../../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { interactionID: string } },
) {
    const interactionID = params.interactionID
    try {
        const [rows] = await connection.query(
            'SELECT i.code_interaction, i.code_Utilisateur_Prospecteur, i.code_Entite_Prospectee, i.date_interaction, i.code_type_interaction, i.code_modalite_interaction, i.code_contact_entite, i.commentaires, i.pieces_associees, i.date_relance FROM Interactions i LEFT JOIN Utilisateurs u ON i.code_Utilisateur_Prospecteur = u.code_utilisateur LEFT JOIN Entite e ON i.code_Entite_Prospectee = e.code_Entite LEFT JOIN TypeInteractions t ON i.code_type_interaction = t.code_type_interaction LEFT JOIN ModaliteInteractions m ON i.code_modalite_interaction = m.code_modalite_interaction LEFT JOIN ContactEntite c ON i.code_contact_entite = c.code_utilisateur_suivant WHERE i.code_Utilisateur_Prospecteur = ?;',
            [interactionID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function DELETE(
    req: NextApiRequest,
    {
        params,
    }: {
        params: { societeID: string; entiteID: string; interactionID: string }
    },
) {
    const interactionID = params.interactionID
    if (interactionID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `interactions` WHERE `code_interaction` = ?'
        const [rows] = await connection.query(query, interactionID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
