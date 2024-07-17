import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    const societeID = params.societeID
    try {
        const [rows] = await connection.query(
            'SELECT entreprise.code_Societe, entreprise.raison_sociale, entreprise.nom_commercial, entreprise.site_Web, entreprise.Logo, entreprise.Siren, entreprise.code_type_activite_Societe, entreprise.commentaires, entreprise.code_Groupe_appartenance, entreprise.date_arret_activite_Societe AS type_activite_nom FROM entreprise LEFT JOIN TypeActiviteSociete ON entreprise.code_type_activite_Societe = TypeActiviteSociete.code WHERE entreprise.code_Societe = ?;',
            [societeID],
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
    { params }: { params: { societeID: string } },
) {
    const societeID = params.societeID
    if (societeID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Entreprise` WHERE `code_Societe` = ?'
        const [rows] = await connection.query(query, societeID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
