import { NextResponse } from 'next/server'
import type { Produit } from '@/app/dons/type-produits/page'
import pool from '../../../../utils/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { streamToString } from '../../../../utils/streamUtils'

export async function GET() {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM `TypesProduits` LIMIT 1000',
        )
        return NextResponse.json(rows)
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            { error: 'Internal Server Error' },
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

    console.log(produit)
    if (!produit.code_type_produits || !produit.libelle) {
        return res.status(400).json({ error: 'Missing product data' })
    }

    try {
        const query = 'INSERT INTO `TypesProduits` SET ?'
        const [rows] = await pool.query(query, produit)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
