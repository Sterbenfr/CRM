import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../utils/streamUtils'
import type { Entite } from '@/app/societe/[societeID]/entite/type-entites/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_type_entite as id, libelle as label FROM `TypesEntites` LIMIT 1000',
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
    let EntitesPages: Entite
    try {
        EntitesPages = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!EntitesPages.code_type_entite || !EntitesPages.code_type_entite) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypesEntites` SET ?'
        const [rows] = await pool.query(query, EntitesPages)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
