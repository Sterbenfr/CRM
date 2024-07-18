import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

import { streamToString } from '../../../../../../utils/streamUtils'
import type { type_utilisateur } from '@/app/sites/[siteID]/utilisateurs/type-utilisateurs/page'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_type_utilisateur as id, libelle as label FROM `typesutilisateurs` LIMIT 1000',
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
    let TypesUtilisateurs: type_utilisateur
    try {
        TypesUtilisateurs = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypesUtilisateurs) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypesUtilisateurs` SET ?'
        const [rows] = await connection.query(query, TypesUtilisateurs)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
