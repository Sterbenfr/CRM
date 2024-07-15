import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { Competence } from '@/app/dons/type-competences/page'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT code_type_competence as id, libelle as label FROM `typescompetences` LIMIT 1000',
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
    let typesCompetence: Competence
    try {
        typesCompetence = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!typesCompetence) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypesCompetences` SET ?'
        const [rows] = await pool.query(query, typesCompetence)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
