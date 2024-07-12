import { NextResponse } from 'next/server'
import pool from '../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../utils/streamUtils'
import type { Societe } from '@/app/societe/page'

type CountResult = { count: number }[]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `entreprise` LIMIT ?, ?',
            [offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `entreprise`',
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
    let societes: Societe
    try {
        societes = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !societes.Siren ||
        !societes.code_type_activite_Societe ||
        !societes.raison_sociale
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(societes)
        const query = 'INSERT INTO `entreprise` SET ?'
        const [rows] = await pool.query(query, societes)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
