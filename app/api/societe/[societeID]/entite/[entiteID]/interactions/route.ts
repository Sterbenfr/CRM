import { NextResponse } from 'next/server'
import pool from '../../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../../utils/streamUtils'
import type { Interactions } from '@/app/societe/[societeID]/entite/[entiteID]/interaction/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { entiteID: string }
    },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const entiteID = params.entiteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `interactions` WHERE code_Entite_Prospectee = ? LIMIT ?, ?',
            [entiteID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `interactions` WHERE code_Entite_Prospectee = ?',
            [entiteID],
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
    let interactions: Interactions
    try {
        interactions = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (
        !interactions.code_Utilisateur_Prospecteur ||
        !interactions.code_Entite_Prospectee ||
        !interactions.date_interaction ||
        !interactions.code_type_interaction ||
        !interactions.code_modalite_interaction ||
        !interactions.code_contact_entite ||
        !interactions.date_relance
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `interactions` SET ?'
        const [rows] = await pool.query(query, interactions)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
