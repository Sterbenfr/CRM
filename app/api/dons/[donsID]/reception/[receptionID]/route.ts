import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../auth/[...nextauth]/authOptions'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string; receptionID: string } },
) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    const receptionID = params.receptionID
    const donsID = params.donsID
    try {
        const [rows] = await connection.query(
            `SELECT numero_reception,
            Reception.code_Don,
            Reception.date_reception,
            Reception.numero_livraison,
            Reception.date_reception,
            Reception.heure_reception,
            Reception.nombre_palettes_recues,
            Reception.nombre_palettes_consignees_recues,
            Reception.nombre_palettes_consignees_rendues,
            Reception.nombre_cartons_recus,
            Reception.poids_recu_kg,
            Reception.produits_sur_palettes,
            Reception.commentaires,
            Reception.pieces_associees,
            Entite.raison_sociale AS raison_sociale_don
            FROM Reception
            LEFT JOIN Dons on Reception.code_Don = Dons.code_Don
            LEFT JOIN Entite on Dons.code_Entite_donatrice = Entite.code_Entite
            WHERE Reception.numero_reception = ? AND Reception.code_Don = ?;`,
            [receptionID, donsID],
        )
        return NextResponse.json(rows)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { receptionID: string } },
) {
    if (!params || params.receptionID === undefined) {
        return NextResponse.json(
            { error: 'Missing or invalid parameters' },
            { status: 400 },
        )
    }

    const receptionID = params.receptionID
    if (receptionID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    let body

    try {
        body = await request.json()
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (body === null || body === undefined) {
        console.log(body, 'body', request.body)
        return NextResponse.json(
            { error: 'Body is null or undefined' },
            { status: 400 },
        )
    }

    if (Object.keys(body).length === 0) {
        return NextResponse.json({ error: 'Empty body' }, { status: 400 })
    }

    try {
        const columnMapping: { [key: string]: string } = {
            numero_reception: 'numero_reception',
        }

        const columns = Object.keys(body)
            .map(key => `\`${columnMapping[key] || key}\` = ?`)
            .join(', ')
        const values = Object.values(body)
        const query = `UPDATE \`reception\` SET ${columns} WHERE \`numero_reception\` = ?`

        // Execute query
        const [rows] = await connection.query(query, [...values, receptionID])
        return NextResponse.json(rows)
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { donsID: string; receptionID: string } },
) {
    const receptionID = params.receptionID
    if (receptionID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `reception` WHERE `numero_reception` = ?'
        const [rows] = await connection.query(query, receptionID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
