import { NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { modalites_livraisonID: string } },
) {
    const modalites_livraisonID = params.modalites_livraisonID
    try {
        const [rows] = await connection.query(
            'select ModalitesLivraison.numero_livraison, Dons.code_Don, TypeLivraison.code_type_livraison, date_prevue_livraison, heure_prevue_livraison, adresse_enlevement, civilite_contact_enlevement, nom_contact_enlevement, prenom_contact_livraison, telephone_contact_livraison, mail_contact_livraison, nombre_palettes_prevu, nombre_palettes_consignees_prevu, nombre_cartons_prevu, poids_prevu_kg, produits_sur_palettes, temperature_conserv_produits, ModalitesLivraison.commentaires, ModalitesLivraison.pieces_associees, TypeLivraison.libelle, Prestataires.code_Prestataire from ModalitesLivraison left join Dons on ModalitesLivraison.code_Don = Dons.code_Don left join TypeLivraison on ModalitesLivraison.code_type_livraison = TypeLivraison.code_type_livraison left join Prestataires on ModalitesLivraison.code_Prestataire_transporteur = Prestataires.code_Prestataire WHERE ModalitesLivraison.numero_livraison = ?;',
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

export async function DELETE(
    req: NextApiRequest,
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
