import { NextResponse } from 'next/server'
import pool from '../../../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../../../utils/streamUtils'
import type { Interaction } from '@/app/societe/[societeID]/entite/[entiteID]/interaction/type-interactions/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_type_interaction as id, libelle as label FROM `typeinteractions` LIMIT 1000',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function POST(req: NextApiRequest) {
    let code_type_interaction: Interaction
    try {
        code_type_interaction = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!code_type_interaction) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `typeinteractions` SET ?'
        const [rows] = await pool.query(query, code_type_interaction)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
