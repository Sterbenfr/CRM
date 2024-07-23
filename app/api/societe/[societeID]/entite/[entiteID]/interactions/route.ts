import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../../utils/db'

import { streamToString } from '../../../../../../../utils/streamUtils'
import type { Interactions } from '@/app/societe/[societeID]/entite/[entiteID]/interaction/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: { entiteID: string }
    },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const entiteID = params.entiteID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT Interactions.*, Entite.raison_sociale, CONCAT(Utilisateurs.prenom," ",Utilisateurs.nom) as nom FROM `Interactions` LEFT JOIN Utilisateurs ON Utilisateurs.code_utilisateur = Interactions.code_contact_entite LEFT JOIN Entite ON Entite.code_entite = Interactions.code_entite_prospectee WHERE code_Entite_Prospectee = ? LIMIT ?, ?',
            [entiteID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `Interactions` WHERE code_Entite_Prospectee = ?',
            [entiteID],
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
    let interactions: Interactions
    try {
        interactions = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    if (
        !interactions.code_Utilisateur_Prospecteur ||
        !interactions.code_Entite_Prospectee ||
        !interactions.date_interaction
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(interactions)
        const query = 'INSERT INTO `Interactions` SET ?'
        const [rows] = await connection.query(query, interactions)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
