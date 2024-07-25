import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const utilisateurID = params.utilisateurID
    try {
        const [rows] = await connection.query(
            'SELECT u.code_utilisateur, u.civilite, u.nom, u.prenom, u.tel_perso, u.mail, u.commentaires, u.code_type_utilisateur, t.libelle AS libelle_type_utilisateur FROM Utilisateurs u LEFT JOIN TypesUtilisateurs t ON u.code_type_utilisateur = t.code_type_utilisateur WHERE code_utilisateur = ?;',
            [utilisateurID],
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
    { params }: { params: { utilisateurID: string } },
) {
    if (!params || params.utilisateurID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const utilisateurID = params.utilisateurID
    if (utilisateurID === undefined) {
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
            code_utilisateur: 'code_utilisateur',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Utilisateurs\` SET ${columns} WHERE \`code_utilisateur\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, utilisateurID])
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
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const utilisateurID = params.utilisateurID
    if (utilisateurID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Utilisateurs` WHERE `code_utilisateur` = ?'
        const [rows] = await connection.query(query, utilisateurID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
