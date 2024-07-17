import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { NextApiRequest } from 'next'

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

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { prestataireID: string } },
) {
    const prestataireID = params.prestataireID
    if (prestataireID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `prestataires` WHERE `code_prestataire` = ?'
        const [rows] = await connection.query(query, prestataireID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
