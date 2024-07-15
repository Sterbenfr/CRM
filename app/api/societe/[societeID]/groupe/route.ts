import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../utils/streamUtils'
import type { Groupe } from '@/app/societe/[societeID]/groupe/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { societeID: string }
    },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const societeID = params.societeID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT code_groupe, nom_du_Groupe, groupe.logo, groupe.site_Web, groupe.commentaires, date_arret_activite_du_Groupe FROM `groupe` LEFT JOIN entreprise ON Groupe.code_groupe = entreprise.code_Groupe_appartenance WHERE entreprise.code_Societe = ? LIMIT ?, ?',
            [societeID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `groupe` LEFT JOIN entreprise ON Groupe.code_groupe = entreprise.code_Groupe_appartenance WHERE entreprise.code_Societe = ?',
            [societeID],
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

export async function POST(req: NextApiRequest) {
    let groupe: Groupe
    try {
        groupe = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (
        !groupe.nom_du_Groupe
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(groupe)
        const query = 'INSERT INTO `Groupe` SET ?'
        const [rows] = await pool.query(query, groupe)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
