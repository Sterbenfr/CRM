import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    const societeID = params.societeID
    try {
        const [rows] = await connection.query(
            'SELECT Entreprise.code_Societe, Entreprise.raison_sociale, Entreprise.nom_commercial, Entreprise.site_Web, Entreprise.Logo, Entreprise.Siren, Entreprise.code_type_activite_Societe, Entreprise.commentaires, Entreprise.code_Groupe_appartenance, Entreprise.date_arret_activite_Societe AS type_activite_nom FROM Entreprise LEFT JOIN TypeActiviteSociete ON Entreprise.code_type_activite_Societe = TypeActiviteSociete.code WHERE Entreprise.code_Societe = ?;',
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
    req: NextRequest,
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
