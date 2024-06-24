import { NextResponse } from 'next/server'
import pool from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { Mode_Conservation_Produits } from '@/app/dons/type-mode-conservation-produits/page'

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT code_mode_conservation_produits as id, libelle as label FROM `ModeConservationProduits` LIMIT 1000')
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

export async function POST(req: NextApiRequest) {
    let typesModeConservationProduits: Mode_Conservation_Produits
    try {
        typesModeConservationProduits = JSON.parse(await streamToString(req.body))
        console.log(typesModeConservationProduits)
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !typesModeConservationProduits.id ||
        !typesModeConservationProduits.label
    ) {
        console.log(
            'Types Mode Conservation Produits:' +
            typesModeConservationProduits.id +
            typesModeConservationProduits.label,
        )
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `ModeConservationProduits` SET ?'
        const [rows] = await pool.query(query, typesModeConservationProduits)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
