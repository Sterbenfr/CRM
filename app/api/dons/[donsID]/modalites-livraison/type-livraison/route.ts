import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

import { streamToString } from '../../../../../../utils/streamUtils'
import type { Type_Livraison } from '@/app/dons/[donsID]/modalites-livraison/type-livraison/page'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_type_livraison as id, libelle as label FROM `typelivraison` LIMIT 1000',
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function POST(req: NextRequest) {
    let typesLivraison: Type_Livraison
    try {
        typesLivraison = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!typesLivraison) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypeLivraison` SET ?'
        const [rows] = await connection.query(query, typesLivraison)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
