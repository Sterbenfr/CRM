import { NextResponse } from 'next/server'
import pool from '../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../utils/streamUtils'
import type { Don } from '@/app/dons/page'

type CountResult = { count: number }[]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query('SELECT * FROM `dons` LIMIT ?, ?', [
            offset,
            limitNumber,
        ])

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `dons`',
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
    let dons: Don
    try {
        dons = JSON.parse(await streamToString(req.body))
        console.log(dons)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !dons.date_proposition_don ||
        !dons.code_type_don ||
        !dons.code_Utilisateur_saisie_don
    ) {
        console.log(
            'dons:' +
                dons.date_proposition_don +
                dons.code_type_don +
                dons.code_Utilisateur_saisie_don,
        )
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `dons` SET ?'
        const [rows] = await pool.query(query, dons)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

/*export async function DELETE(req: NextApiRequest) {
    let dons : Don
    try {
        dons = JSON.parse(await streamToString(req.body))
        console.log(dons)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if(!dons.code_Don){
        return NextResponse.json({ error: 'Missing product data' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `dons` WHERE `code_Don` = ?'
        const [rows] = await pool.query(query, dons.code_Don)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}*/