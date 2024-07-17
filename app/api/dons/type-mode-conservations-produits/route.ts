import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { Mode_Conservation_Produits } from '@/app/dons/type-mode-conservation-produits/page'

export async function GET() {
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

export async function POST(req: NextApiRequest) {
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
