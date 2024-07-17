import { NextResponse } from 'next/server'
import type { Produit } from '@/app/dons/type-produits/page'
import connection from '../../../../utils/db'
import { NextApiRequest, NextApiResponse } from 'next'
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

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    let produit: Produit
    try {
        produit = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return res.status(400).json({ error: 'Invalid JSON' })
    }

    if (!produit) {
        return res.status(400).json({ error: 'Missing product data' })
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
