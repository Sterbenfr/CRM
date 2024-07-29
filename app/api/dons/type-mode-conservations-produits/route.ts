import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import connection from '../../../../utils/db'

import { streamToString } from '../../../../utils/streamUtils'
import type { Mode_Conservation_Produits } from '@/app/dons/type-mode-conservation-produits/page'

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    try {
        const [rows] = await connection.query(
            'SELECT code_mode_conservation_produits as id, libelle as label FROM `ModeConservationProduits` LIMIT 1000',
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
    let typesModeConservationProduits: Mode_Conservation_Produits
    try {
        typesModeConservationProduits = JSON.parse(
            await streamToString(req.body),
        )
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!typesModeConservationProduits) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ModeConservationProduits` SET ?'
        const [rows] = await connection.query(
            query,
            typesModeConservationProduits,
        )
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
            'DELETE FROM `ModeConservationProduits` WHERE `code_mode_conservation_produits` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_mode_conservation_produits = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
