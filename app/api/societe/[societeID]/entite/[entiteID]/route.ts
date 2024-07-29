import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { entiteID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const entiteID = params.entiteID
    try {
        const [rows] = await connection.query(
            'SELECT code_entite,Entite.raison_sociale,Entite.nom_commercial,Entite.logo,siret,code_ape,code_rna,code_cee,Entreprise.raison_sociale as nom_societe,adresse,telephone,mail,site_internet,Entite.commentaires,TypesEntites.libelle as TE_libelle,TypesDons.libelle as TD_libelle,TypesProduits.libelle as TP_libelle,TypesCompetences.libelle as TC_libelle,commentaires_logistique,presence_quai,pieces_associees,cerfa,FrequencesCerfa.libelle as FC_libelle,date_arret_activite FROM Entite LEFT JOIN TypesEntites ON Entite.code_type_entite = TypesEntites.code_type_entite LEFT JOIN TypesDons ON Entite.code_type_don = TypesDons.code_type_don LEFT JOIN TypesProduits ON Entite.code_type_produit = TypesProduits.code_type_produits LEFT JOIN TypesCompetences ON Entite.code_type_competence = TypesCompetences.code_type_competence LEFT JOIN FrequencesCerfa ON Entite.code_frequence_cerfa = FrequencesCerfa.code_frequence_cerfa LEFT JOIN Entreprise ON Entite.code_societe_appartenance = Entreprise.code_Societe WHERE code_entite = ?;',
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

export async function PUT(
    request: Request,
    { params }: { params: { entiteID: string } },
) {
    if (!params || params.entiteID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const entiteID = params.entiteID
    if (entiteID === undefined) {
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
            code_entite: 'code_entite',
            TE_libelle: 'code_type_entite',
            TD_libelle: 'code_type_don',
            TC_libelle: 'code_type_competence',
            TP_libelle: 'code_type_produit',
            FC_libelle: 'code_frequence_cerfa',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`Entite\` SET ${columns} WHERE \`code_entite\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, entiteID])
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
