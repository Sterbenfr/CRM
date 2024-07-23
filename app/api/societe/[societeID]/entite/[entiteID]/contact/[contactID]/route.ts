import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID: string; contactID: string } },
) {
    const contactID = params.contactID
    try {
        const [rows] = await connection.query(
            'SELECT code_contact,Entite.raison_sociale,civilite,nom,prenom,photo,fonction,service,numero_fixe,numero_portable,adresse_mail,Contacts.commentaires,date_arret_contact FROM Contacts JOIN Entite ON Contacts.code_entite = Entite.code_entite WHERE code_contact = ?;',
            [contactID],
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
    { params }: { params: { contactID: string } },
) {
    if (!params || params.contactID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const contactID = params.contactID
    if (contactID === undefined) {
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
            code_contact: 'code_contact',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Contacts\` SET ${columns} WHERE \`code_contact\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, contactID])
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
    }: { params: { societeID: string; entiteID: string; contactID: string } },
) {
    const contactID = params.contactID
    const entiteID = params.entiteID
    if (contactID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query =
            'DELETE FROM `Contacts` WHERE `code_entite` = ? and `code_contact` = ?;'
        const [rows] = await connection.query(query, [entiteID, contactID])
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
