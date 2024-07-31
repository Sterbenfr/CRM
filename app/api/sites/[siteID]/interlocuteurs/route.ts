import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../utils/db'
import { streamToString } from '../../../../../utils/streamUtils'
import type { Interlocuteurs } from '@/app/sites/[siteID]/interlocuteurs/page'
import { ResultSetHeader } from 'mysql2'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { siteID: string; interlocuteurID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const siteID = params.siteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT * FROM `Interlocuteurs` WHERE code_site = ? LIMIT ?, ?',
            [siteID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Interlocuteurs` WHERE code_site = ?',
            [siteID],
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
    let Interlocuteur: Interlocuteurs
    try {
        Interlocuteur = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !Interlocuteur.code_site ||
        !Interlocuteur.civilite ||
        !Interlocuteur.nom ||
        !Interlocuteur.prenom ||
        !Interlocuteur.code_type_interlocuteur
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }
    try {
        const query = 'INSERT INTO `Interlocuteurs` SET ?'
        const [result] = await connection.query<ResultSetHeader>(
            query,
            Interlocuteur,
        )
        return NextResponse.json({ result })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
