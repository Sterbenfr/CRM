import { NextRequest, NextResponse } from 'next/server'
import type { Produit } from '@/app/dons/type-produits/page'
import connection from '../../../../utils/db'
import { streamToString } from '../../../../utils/streamUtils'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_type_produits as id, libelle as label FROM `TypesProduits` LIMIT 1000',
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
    let produit: Produit
    try {
        produit = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!produit) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `TypesProduits` SET ?'
        const [rows] = await connection.query(query, produit)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
