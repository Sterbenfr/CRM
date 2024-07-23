import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../utils/db'

import { streamToString } from '../../../../../utils/streamUtils'
import type { Entite } from '@/app/societe/[societeID]/entite/page'

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

        const [rows] = await connection.query(
            'SELECT * FROM `Entite` WHERE code_societe_appartenance = ? LIMIT ?, ?',
            [societeID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Entite` WHERE code_societe_appartenance = ?',
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
export async function POST(req: NextRequest) {
    let Entite: Entite
    try {
        Entite = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !Entite.raison_sociale ||
        !Entite.code_type_entite ||
        !Entite.code_societe_appartenance ||
        !Entite.adresse
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(Entite)
        const query = 'INSERT INTO `Entite` SET ?'
        const [rows] = await connection.query(query, Entite)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
