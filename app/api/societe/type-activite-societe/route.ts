import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { TypeActiviteSociete } from '@/app/societe/type-activite-societe/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'Select code as id, libelle as label from `typeactivitesociete` LIMIT 1000;',
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
    let TypeActiviteSocietes: TypeActiviteSociete
    try {
        TypeActiviteSocietes = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypeActiviteSocietes.id || !TypeActiviteSocietes.label) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypeActiviteSociete` SET ?'
        const [rows] = await pool.query(query, TypeActiviteSocietes)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
