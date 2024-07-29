import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { streamToString } from '../../../../utils/streamUtils'
import type { Prestataire } from '@/app/prestataire/type-prestataires/page'

export async function GET(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const url = new URL(request.url)
        const [rows] = await connection.query(
            'SELECT code_type_de_Prestataire as id, libelle as label FROM `TypePrestataires` LIMIT 1000',
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
    let TypePrestataires: Prestataire
    try {
        TypePrestataires = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!TypePrestataires) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypePrestataires` SET ?'
        const [rows] = await connection.query(query, TypePrestataires)
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
            'DELETE FROM `TypePrestataires` WHERE `code_type_de_Prestataire` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_type_de_Prestataire = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
