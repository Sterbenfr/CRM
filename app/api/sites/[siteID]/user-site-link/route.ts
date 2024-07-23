import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../utils/db'

import { streamToString } from '../../../../../utils/streamUtils'
import { Site_Rattachement } from '@/app/sites/[siteID]/user-site-link/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { siteID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT SitesRattachement.*, CONCAT(Utilisateurs.prenom," ",Utilisateurs.nom) as name, Sites.designation_longue, TypesUtilisateurs.libelle FROM SitesRattachement LEFT JOIN Utilisateurs ON Utilisateurs.code_utilisateur = SitesRattachement.code_utilisateur LEFT JOIN Sites ON Sites.code_site = SitesRattachement.code_site LEFT JOIN TypesUtilisateurs ON TypesUtilisateurs.code_type_utilisateur = SitesRattachement.code_type_utilisateur WHERE SitesRattachement.code_site = ? LIMIT ?, ?',
            [params.siteID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `SitesRattachement` WHERE code_site = ?',
            [params.siteID],
        )

        const total = totalResult as CountResult

        return NextResponse.json({ data: rows, total: total[0].count })
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function POST(req: NextRequest) {
    let contact: Site_Rattachement
    try {
        contact = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !contact.code_utilisateur ||
        !contact.code_site ||
        !contact.code_type_utilisateur ||
        !contact.date_fin_activite
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `SitesRattachement` SET ?'
        const [rows] = await connection.query(query, contact)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
