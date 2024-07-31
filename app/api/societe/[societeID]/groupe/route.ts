import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../utils/db'

import { streamToString } from '../../../../../utils/streamUtils'
import type { Groupe } from '@/app/societe/[societeID]/groupe/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { societeID: string }
    },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const societeID = params.societeID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT code_groupe, nom_du_Groupe, Groupe.logo, Groupe.site_Web, Groupe.commentaires, date_arret_activite_du_Groupe FROM `Groupe` LEFT JOIN Entreprise ON Groupe.code_groupe = Entreprise.code_Groupe_appartenance WHERE Entreprise.code_Societe = ? LIMIT ?, ?',
            [societeID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Groupe` LEFT JOIN Entreprise ON Groupe.code_groupe = Entreprise.code_Groupe_appartenance WHERE Entreprise.code_Societe = ?',
            [societeID],
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

export async function POST(
    req: NextRequest,
    {
        params,
    }: {
        params: { societeID: string }
    },
) {
    let groupe: Groupe
    try {
        groupe = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (!groupe.nom_du_Groupe) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(groupe)
        const query = 'INSERT INTO `Groupe` SET ?'
        const [rows] = await connection.query(query, groupe)
        const [update] = await connection.query(
            'UPDATE Entreprise SET code_Groupe_appartenance = ? WHERE code_Entreprise = ?',
            [groupe.code_groupe, params.societeID],
        )
        return NextResponse.json({ rows, update })
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
