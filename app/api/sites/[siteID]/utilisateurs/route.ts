import { NextResponse } from 'next/server'
import connection from '../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../utils/streamUtils'
import type { Utilisateurs } from '@/app/sites/[siteID]/utilisateurs/page'
import { ResultSetHeader } from 'mysql2'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; utilisateurID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const siteID = params.siteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT * FROM `Utilisateurs` LEFT JOIN SitesRattachement ON Utilisateurs.code_utilisateur = SitesRattachement.code_utilisateur WHERE SitesRattachement.code_site = ? LIMIT ?, ?',
            [siteID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Utilisateurs` LEFT JOIN SitesRattachement ON Utilisateurs.code_utilisateur = SitesRattachement.code_utilisateur WHERE SitesRattachement.code_site = ?',
            [siteID],
        )

        const total = totalResult as CountResult

        return NextResponse.json({ data: rows, total: total[0].count })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

type extendedUtilisateurs = Utilisateurs & { code_site: string }
export async function POST(req: NextApiRequest) {
    let Utilisateur: extendedUtilisateurs
    try {
        Utilisateur = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !Utilisateur.code_site ||
        !Utilisateur.civilite ||
        !Utilisateur.nom ||
        !Utilisateur.prenom ||
        !Utilisateur.password ||
        !Utilisateur.code_type_utilisateur
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }
    const { code_site, ...user } = Utilisateur
    try {
        const query = 'INSERT INTO `Utilisateurs` SET ?'
        const [result] = await connection.query<ResultSetHeader>(query, user)
        const query2 =
            'INSERT INTO `SitesRattachement` SET code_utilisateur = ?, code_site = ?, code_type_utilisateur = ?'
        const [rows2] = await connection.query(query2, [
            result.insertId,
            code_site,
            Utilisateur.code_type_utilisateur,
        ])
        return NextResponse.json({ result, rows2 })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
