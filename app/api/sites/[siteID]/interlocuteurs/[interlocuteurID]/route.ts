import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; interlocuteurID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const interlocuteurID = params.interlocuteurID
    try {
        const [rows] = await connection.query(
            'SELECT i.code_interlocuteur, i.civilite, i.nom, i.prenom, i.tel_perso, i.mail, i.commentaires, i.code_type_interlocuteur, t.libelle AS libelle_type_utilisateur FROM Interlocuteurs i LEFT JOIN TypeInterlocuteur t ON i.code_type_interlocuteur = t.code_type_interlocuteur WHERE code_interlocuteur = ?;',
            [interlocuteurID],
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
    { params }: { params: { interlocuteurID: string } },
) {
    if (!params || params.interlocuteurID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const interlocuteurID = params.interlocuteurID
    if (interlocuteurID === undefined) {
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
            code_interlocuteur: 'code_interlocuteur',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Interlocuteurs\` SET ${columns} WHERE \`code_interlocuteur\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [
            ...values,
            interlocuteurID,
        ])
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
    { params }: { params: { siteID: string; interlocuteurID: string } },
) {
    const interlocuteurID = params.interlocuteurID
    if (interlocuteurID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query =
            'DELETE FROM `Interlocuteurs` WHERE `code_interlocuteur` = ?'
        const [rows] = await connection.query(query, interlocuteurID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
