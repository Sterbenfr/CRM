import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../utils/streamUtils'
import type { Reception } from '@/app/dons/[donsID]/reception/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const donsID = params.donsID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `reception` WHERE code_Don = ? LIMIT ?, ?',
            [donsID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `reception` WHERE code_Don = ?',
            [donsID],
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
    let reception: Reception
    try {
        reception = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (
        !reception.date_reception ||
        !reception.code_Don ||
        !reception.numero_livraison
    ) {
        return NextResponse.json(
            { error: 'Missing reception data' },
            { status: 400 },
        )
    }

    try {
        console.log(reception)
        const query = 'INSERT INTO `reception` SET ?'
        const [rows] = await pool.query(query, reception)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
