import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { prestataireID: string } },
) {
    const prestataireID = params.prestataireID
    try {
        const [rows] = await connection.query(
            'SELECT code_Prestataire,TypePrestataires.libelle as TP_libelle,raison_sociale,nom_commercial,Siren,Siret,telephone,mail,adresse,civilite_contact_prestataire,nom_contact_prestataire,prenom_contact_prestataire,telephone_contact_prestataire,mail_contact_prestataire,commentaires,date_arret_activite_du_prestataire FROM Prestataires LEFT JOIN TypePrestataires ON Prestataires.code_type_de_Prestataire = TypePrestataires.code_type_de_Prestataire WHERE code_Prestataire = ?;',
            [prestataireID],
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
    { params }: { params: { prestataireID: string } },
) {
    if (!params || params.prestataireID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const prestataireID = params.prestataireID
    if (prestataireID === undefined) {
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
            TP_libelle: 'code_type_de_Prestataire',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Prestataires\` SET ${columns} WHERE \`code_prestataire\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, prestataireID])
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
    { params }: { params: { prestataireID: string } },
) {
    const prestataireID = params.prestataireID
    if (prestataireID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Prestataires` WHERE `code_prestataire` = ?'
        const [rows] = await connection.query(query, prestataireID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
