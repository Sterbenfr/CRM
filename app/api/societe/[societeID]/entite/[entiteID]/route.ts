import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID: string } },
) {
    const entiteID = params.entiteID
    try {
        const [rows] = await connection.query(
            'SELECT code_entite,entite.raison_sociale,entite.nom_commercial,entite.logo,siret,code_ape,code_rna,code_cee,entreprise.raison_sociale as nom_societe,adresse,telephone,mail,site_internet,Entite.commentaires,TypesEntites.libelle as TE_libelle,TypesDons.libelle as TD_libelle,TypesProduits.libelle as TP_libelle,TypesCompetences.libelle as TC_libelle,commentaires_logistique,presence_quai,pieces_associees,cerfa,FrequencesCerfa.libelle as FC_libelle,date_arret_activite FROM Entite LEFT JOIN TypesEntites ON Entite.code_type_entite = TypesEntites.code_type_entite LEFT JOIN TypesDons ON Entite.code_type_don = TypesDons.code_type_don LEFT JOIN TypesProduits ON Entite.code_type_produit = TypesProduits.code_type_produits LEFT JOIN TypesCompetences ON Entite.code_type_competence = TypesCompetences.code_type_competence LEFT JOIN FrequencesCerfa ON Entite.code_frequence_cerfa = FrequencesCerfa.code_frequence_cerfa LEFT JOIN entreprise ON Entite.code_societe_appartenance = entreprise.code_Societe WHERE code_entite = ?;',
            [entiteID],
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
    { params }: { params: { societeID: string; entiteID: string } },
) {
    const entiteID = params.entiteID
    if (entiteID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Entite` WHERE `code_entite` = ?'
        const [rows] = await connection.query(query, entiteID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
