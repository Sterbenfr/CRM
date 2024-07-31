import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { modalites_livraisonID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const modalites_livraisonID = params.modalites_livraisonID
    try {
        const [rows] = await connection.query(
            `select ModalitesLivraison.numero_livraison,
            ModalitesLivraison.code_Don,
            ModalitesLivraison.code_type_livraison,
            ModalitesLivraison.date_prevue_livraison,
            ModalitesLivraison.heure_prevue_livraison,
            ModalitesLivraison.adresse_enlevement,
            ModalitesLivraison.civilite_contact_enlevement,
            ModalitesLivraison.nom_contact_enlevement,
            ModalitesLivraison.prenom_contact_enlevement,
            ModalitesLivraison.telephone_contact_enlevement,
            ModalitesLivraison.mail_contact_enlevement,
            ModalitesLivraison.code_Prestataire_transporteur,
            ModalitesLivraison.adresse_livraison,
            ModalitesLivraison.civilite_contact_livraison,
            ModalitesLivraison.nom_contact_livraison,
            ModalitesLivraison.prenom_contact_livraison,
            ModalitesLivraison.telephone_contact_livraison,
            ModalitesLivraison.mail_contact_livraison,
            ModalitesLivraison.nombre_palettes_prevu,
            ModalitesLivraison.nombre_palettes_consignees_prevu,
            ModalitesLivraison.nombre_cartons_prevu,
            ModalitesLivraison.poids_prevu_kg,
            ModalitesLivraison.produits_sur_palettes,
            ModalitesLivraison.temperature_conserv_produits,
            ModalitesLivraison.commentaires,
            ModalitesLivraison.pieces_associees,
            TypeLivraison.libelle AS libelle_type_livraison,
            Prestataires.code_Prestataire,
            Prestataires.raison_sociale AS raison_sociale_prestataire,
            Entite.raison_sociale AS raison_sociale_don
            FROM ModalitesLivraison 
            LEFT JOIN Dons on ModalitesLivraison.code_Don = Dons.code_Don
            LEFT JOIN Entite on Dons.code_Entite_donatrice = Entite.code_Entite
            LEFT JOIN TypeLivraison on ModalitesLivraison.code_type_livraison = TypeLivraison.code_type_livraison 
            LEFT JOIN Prestataires on ModalitesLivraison.code_Prestataire_transporteur = Prestataires.code_Prestataire 
            WHERE ModalitesLivraison.numero_livraison = ?;`,
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

        const [rows] = await connection.query(query, [
            ...values,
            modalites_livraisonID,
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
