import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../utils/db'
import { streamToString } from '../../../../../../utils/streamUtils'
import type { type_utilisateur } from '@/app/sites/[siteID]/interlocuteurs/type-utilisateurs/page'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    try {
        const [rows] = await connection.query(
            'SELECT code_type_interlocuteur as id, libelle as label FROM `TypeInterlocuteur` LIMIT 1000',
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
    let TypeInterlocuteur: type_utilisateur
    try {
        TypeInterlocuteur = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypeInterlocuteur) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypeInterlocuteur` SET ?'
        const [rows] = await connection.query(query, TypeInterlocuteur)
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
            'DELETE FROM `TypeInterlocuteur` WHERE `code_type_interlocuteur` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_type_interlocuteur = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
