import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../utils/db'

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
export async function POST(req: NextRequest) {
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

export async function DELETE(req: NextRequest) {
    const body = await req.json()
    if (body === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }
    try {
        const query = 'DELETE FROM `SiteTypes` WHERE `code_type_site` = ?'
        const [rows] = await connection.query(
            query,
            body.join(' or code_type_site = '),
        )
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
