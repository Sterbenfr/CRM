import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import connection from '../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const donsID = params.donsID
    try {
        const [rows] = await connection.query(
            'SELECT Dons.code_Don, titre_don, Entite.raison_sociale, date_proposition_don,users.nom as contact_entite_donatrice, TypesDons.libelle as TD_libelle, TypesCompetences.libelle as TC_libelle,TypesProduits.libelle as TP_libelle, ModeConservationProduits.libelle as MCP_libelle, date_debut_mise_disposition, date_fin_mise_disposition, Dons.commentaires, Dons.pieces_associees, Utilisateur_saisie_don.nom as Utilisateur_saisie_don, statut_acceptation_don, date_acceptation_refus_don, Utilisateur_accepte_refuse_don.nom as Utilisateur_accepte_refuse_don, Sites.designation_courte,indicateur_remerciement,date_remerciement, nom_destinataire_cerfa,adresse_destinataire_cerfa,telephone_destinataire_cerfa,valeur_cerfa,cerfa_fait,date_cerfa,Dons.cerfa FROM Dons LEFT JOIN Entite ON Dons.code_Entite_donatrice = Entite.code_Entite LEFT JOIN ContactEntite ON Dons.code_contact_Entite_donatrice = ContactEntite.code_entite LEFT JOIN Utilisateurs as users ON ContactEntite.code_utilisateur_suivant = users.code_utilisateur LEFT JOIN TypesDons ON Dons.code_type_don = TypesDons.code_type_don LEFT JOIN TypesCompetences ON Dons.code_type_competences = TypesCompetences.code_type_competence LEFT JOIN TypesProduits ON Dons.code_type_produits = TypesProduits.code_type_produits LEFT JOIN ModeConservationProduits ON Dons.code_mode_conservation_produits = ModeConservationProduits.code_mode_conservation_produits LEFT JOIN Utilisateurs as Utilisateur_saisie_don ON Dons.code_Utilisateur_saisie_don = Utilisateur_saisie_don.code_utilisateur LEFT JOIN Utilisateurs as Utilisateur_accepte_refuse_don ON Dons.code_Utilisateur_accepte_refuse_don = Utilisateur_accepte_refuse_don.code_utilisateur LEFT JOIN Sites ON Dons.code_site_beneficiaire_don = Sites.code_site WHERE Dons.code_don = ?;',
            [donsID],
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
    { params }: { params: { donsID: string } },
) {
    if (!params || params.donsID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const donsID = params.donsID
    if (donsID === undefined) {
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
            Utilisateur_accepte_refuse_don:
                'code_Utilisateur_accepte_refuse_don',
            Utilisateur_saisie_don: 'code_Utilisateur_saisie_don',
            contact_entite_donatrice: 'code_contact_Entite_donatrice',
            designation_courte: 'code_site_beneficiaire_don',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Dons\` SET ${columns} WHERE \`code_Don\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, donsID])
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
    { params }: { params: { donsID: string } },
) {
    const donsID = params.donsID
    if (donsID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Dons` WHERE `code_Don` = ?'
        const [rows] = await connection.query(query, donsID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
