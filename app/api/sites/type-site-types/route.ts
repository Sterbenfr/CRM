import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../utils/streamUtils'
import type { siteType } from '@/app/sites/type-site-types/page'

export async function GET() {
    try {
        const [rows] = await connection.query(
            'SELECT code_type_site as id, libelle as label FROM `SiteTypes` LIMIT 1000',
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
    let SiteTypes: siteType
    try {
        SiteTypes = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (!SiteTypes) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `SiteTypes` SET ?'
        const [rows] = await connection.query(query, SiteTypes)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
