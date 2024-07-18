import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID: string; contactID: string } },
) {
    const contactID = params.contactID
    try {
        const [rows] = await connection.query(
            'SELECT code_contact,Entite.raison_sociale,civilite,nom,prenom,photo,fonction,service,numero_fixe,numero_portable,adresse_mail,contacts.commentaires,date_arret_contact FROM Contacts JOIN Entite ON Contacts.code_entite = Entite.code_entite WHERE code_contact = ?;',
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
