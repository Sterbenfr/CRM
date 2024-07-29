import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../../../utils/db'

import { streamToString } from '../../../../../../../../utils/streamUtils'
import type { Interaction } from '@/app/societe/[societeID]/entite/[entiteID]/interaction/type-interactions/page'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    try {
        const [rows] = await connection.query(
            'SELECT code_type_interaction as id, libelle as label FROM `TypeInteractions` LIMIT 1000',
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
        const query = 'INSERT INTO `TypeInteractions` SET ?'
        const [rows] = await connection.query(query, code_type_interaction)
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
            'DELETE FROM `TypeInteractions` WHERE `code_type_interaction` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_type_interaction = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
