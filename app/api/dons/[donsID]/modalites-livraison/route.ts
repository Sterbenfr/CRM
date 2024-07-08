import { NextResponse } from 'next/server'
import pool from '../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../utils/streamUtils'
import type { ModalitesLivraison } from '@/app/dons/[donsID]/modalites-livraison/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { donsID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    const donsID = params.donsID

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await pool.query(
            'SELECT * FROM `ModalitesLivraison` WHERE code_Don = ? LIMIT ?, ?',
            [donsID, offset, limitNumber],
        )

        const [totalResult] = await pool.query(
            'SELECT COUNT(*) as count FROM `ModalitesLivraison` WHERE code_Don = ?',
            [donsID],
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

export async function POST(req: NextApiRequest) {
    let ModalitesLivraison: ModalitesLivraison
    try {
        ModalitesLivraison = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !ModalitesLivraison.code_Don ||
        !ModalitesLivraison.date_prevue_livraison ||
        !ModalitesLivraison.adresse_enlevement ||
        !ModalitesLivraison.adresse_livraison ||
        !ModalitesLivraison.nombre_palettes_prevu ||
        !ModalitesLivraison.nombre_palettes_consignees_prevu ||
        !ModalitesLivraison.nombre_cartons_prevu ||
        !ModalitesLivraison.poids_prevu_kg ||
        !ModalitesLivraison.produits_sur_palettes
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ModalitesLivraison` SET ?'
        const [rows] = await pool.query(query, ModalitesLivraison)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
