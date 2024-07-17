import { NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../utils/streamUtils'
import type { Frequence_cerfa } from '@/app/societe/[societeID]/entite/type-frequences-cerfa/page'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_frequence_cerfa as id, libelle as label FROM `FrequencesCerfa` LIMIT 1000',
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
    let typesFrequence_cerfa: Frequence_cerfa
    try {
        typesFrequence_cerfa = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!typesFrequence_cerfa) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `FrequencesCerfa` SET ?'
        const [rows] = await connection.query(query, typesFrequence_cerfa)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
