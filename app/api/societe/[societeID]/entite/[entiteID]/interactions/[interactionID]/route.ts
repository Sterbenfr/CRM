import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { interactionID: string } },
) {
    const interactionID = params.interactionID
    try {
        const [rows] = await connection.query(
            `SELECT i.code_interaction, i.code_Utilisateur_Prospecteur, i.code_Entite_Prospectee, i.date_interaction, i.code_type_interaction, i.code_modalite_interaction, i.code_contact_entite, i.commentaires, i.pieces_associees, i.date_relance, e.raison_sociale, concat(u.prenom, " ", u.nom) AS utilisateur_prospecteur, concat(co.prenom, " ", co.nom) AS contact_entite, t.libelle AS libelle_type_interaction, m.libelle AS libelle_modalite_interaction
            FROM Interactions i
            LEFT JOIN Utilisateurs u ON i.code_Utilisateur_Prospecteur = u.code_utilisateur
            LEFT JOIN Entite e ON i.code_Entite_Prospectee = e.code_Entite
            LEFT JOIN TypeInteractions t ON i.code_type_interaction = t.code_type_interaction
            LEFT JOIN ModaliteInteractions m ON i.code_modalite_interaction = m.code_modalite_interaction
            LEFT JOIN ContactEntite c ON i.code_contact_entite = c.code_utilisateur_suivant
            LEFT JOIN Contacts co ON i.code_contact_entite = co.code_contact
            WHERE i.code_interaction = ?;`,
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

export async function PUT(
    request: Request,
    { params }: { params: { interactionID: string } },
) {
    if (!params || params.interactionID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const interactionID = params.interactionID
    if (interactionID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    let body

    try {
        body = await request.json()
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (body === null || body === undefined) {
        console.log(body, 'body', request.body)
        return NextResponse.json(
            { error: 'Body is null or undefined' },
            { status: 400 },
        )
    }

    if (Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Empty body' }, { status: 400 })
    }

    try {
        const columnMapping: { [key: string]: string } = {
            code_interaction: 'code_interaction',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Interactions\` SET ${columns} WHERE \`code_interaction\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, interactionID])
        return NextResponse.json(rows)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}

export async function DELETE(
    req: NextRequest,
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
        const query = 'DELETE FROM `Interactions` WHERE `code_interaction` = ?'
        const [rows] = await connection.query(query, interactionID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
