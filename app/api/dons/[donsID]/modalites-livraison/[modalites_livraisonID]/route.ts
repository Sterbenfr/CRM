import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { modalites_livraisonID: string } },
) {
    const modalites_livraisonID = params.modalites_livraisonID
    try {
        const [rows] = await connection.query(
            'select ModalitesLivraison.numero_livraison, Dons.code_Don, TypeLivraison.code_type_livraison, date_prevue_livraison, heure_prevue_livraison, adresse_enlevement, civilite_contact_enlevement, nom_contact_enlevement, prenom_contact_enlevement, telephone_contact_enlevement, mail_contact_enlevement, adresse_livraison, civilite_contact_livraison, nom_contact_livraison, prenom_contact_livraison, telephone_contact_livraison, mail_contact_livraison, nombre_palettes_prevu, nombre_palettes_consignees_prevu, nombre_cartons_prevu, poids_prevu_kg, produits_sur_palettes, temperature_conserv_produits, ModalitesLivraison.commentaires, ModalitesLivraison.pieces_associees, TypeLivraison.libelle, Prestataires.code_Prestataire, civilite_contact_livraison FROM ModalitesLivraison LEFT JOIN Dons on ModalitesLivraison.code_Don = Dons.code_Don left join TypeLivraison on ModalitesLivraison.code_type_livraison = TypeLivraison.code_type_livraison LEFT JOIN Prestataires on ModalitesLivraison.code_Prestataire_transporteur = Prestataires.code_Prestataire WHERE ModalitesLivraison.numero_livraison = ?;',
            [modalites_livraisonID],
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
    { params }: { params: { modalites_livraisonID: string } },
) {
    if (!params || params.modalites_livraisonID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const modalites_livraisonID = params.modalites_livraisonID
    if (modalites_livraisonID === undefined) {
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
            code_type_livraison: 'code_type_livraison',
            civilite_contact_enlevement: 'civilite_contact_enlevement',
            civilite_contact_livraison: 'civilite_contact_livraison',
            code_Prestataire_transporteur: 'code_Prestataire_transporteur',
            adresse_livraison: 'adresse_livraison',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`ModalitesLivraison\` SET ${columns} WHERE \`numero_livraison\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, modalites_livraisonID])
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
    { params }: { params: { donsID: string; modalites_livraisonID: string } },
) {
    const modalites_livraisonID = params.modalites_livraisonID
    if (modalites_livraisonID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query =
            'DELETE FROM `ModalitesLivraison` WHERE `numero_livraison` = ?'
        const [rows] = await connection.query(query, modalites_livraisonID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
