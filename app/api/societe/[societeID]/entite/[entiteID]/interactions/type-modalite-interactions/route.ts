import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../../../utils/db'

import { streamToString } from '../../../../../../../../utils/streamUtils'
import type { Modalite_Interactions } from '@/app/societe/[societeID]/entite/[entiteID]/interaction/type-modalite-interactions/page'

export async function GET(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const url = new URL(request.url)
        const [rows] = await connection.query(
            'SELECT code_modalite_interaction as id, libelle as label FROM `ModaliteInteractions` LIMIT 1000',
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
    let type_modalite_interaction: Modalite_Interactions
    try {
        type_modalite_interaction = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!type_modalite_interaction) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ModaliteInteractions` SET ?'
        const [rows] = await connection.query(query, type_modalite_interaction)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}

export async function DELETE(req: NextRequest) {
    const body = await req.json()
    if (body === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }
    try {
        const query =
            'DELETE FROM `ModaliteInteractions` WHERE `code_modalite_interaction` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_modalite_interaction = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
