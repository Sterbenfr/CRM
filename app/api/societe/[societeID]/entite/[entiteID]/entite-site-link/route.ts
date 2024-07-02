import { NextResponse } from 'next/server'
import pool from '../../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../../utils/streamUtils'
import { ContactEntite } from '@/app/societe/[societeID]/entite/[entiteID]/entite-site-link/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { societeID: string; entiteID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `ContactEntite` WHERE code_entite = ? LIMIT ?, ?',
            [params.entiteID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `ContactEntite` WHERE code_entite = ?',
            [params.entiteID],
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

export async function POST(req: NextApiRequest) {
    let contact: ContactEntite
    try {
        contact = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !contact.code_entite ||
        !contact.code_type_site ||
        !contact.code_site_suivi ||
        !contact.code_utilisateur_suivant
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ContactEntite` SET ?'
        const [rows] = await pool.query(query, contact)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
