import { NextResponse, NextRequest } from 'next/server'
import connection from '../../../utils/db'
import { streamToString } from '../../../utils/streamUtils'
import type { Don } from '@/app/dons/page'

type CountResult = { count: number }[]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT Dons.*,Entite.raison_sociale FROM Dons LEFT JOIN  Entite ON Dons.code_Entite_donatrice = Entite.code_Entite LIMIT ?, ?',
            [offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Dons`',
        )

        const total = totalResult as CountResult

        return NextResponse.json({ data: rows, total: total[0].count })
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

export async function POST(req: NextRequest) {
    let dons: Don
    try {
        dons = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (
        !dons.date_proposition_don ||
        !dons.code_type_don ||
        !dons.code_Utilisateur_saisie_don
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }
    console.log(dons)
    try {
        const query = 'INSERT INTO `Dons` SET ?'
        const [rows] = await connection.query(query, dons)
        console.log('poulets')
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
