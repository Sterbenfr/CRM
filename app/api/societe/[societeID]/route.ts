import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import connection from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const societeID = params.societeID
    try {
        const [rows] = await connection.query(
            `SELECT Entreprise.code_Societe,
            Entreprise.raison_sociale,
            Entreprise.nom_commercial,
            Entreprise.site_Web,
            Entreprise.Logo,
            Entreprise.Siren,
            Entreprise.code_type_activite_Societe,
            Entreprise.commentaires,
            Entreprise.code_Groupe_appartenance,
            Entreprise.date_arret_activite_Societe,
            TypeActiviteSociete.libelle AS libelle_type_activite_Societe,
            Groupe.nom_du_Groupe
            FROM Entreprise
            LEFT JOIN Groupe ON Entreprise.code_Groupe_appartenance = Groupe.code_Groupe
            LEFT JOIN TypeActiviteSociete ON Entreprise.code_type_activite_Societe = TypeActiviteSociete.code 
            WHERE Entreprise.code_Societe = ?;`,
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

export async function PUT(
    request: Request,
    { params }: { params: { societeID: string } },
) {
    if (!params || params.societeID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const societeID = params.societeID
    if (societeID === undefined) {
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
            code_Societe: 'code_Societe',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Entreprise\` SET ${columns} WHERE \`code_Societe\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, societeID])
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
