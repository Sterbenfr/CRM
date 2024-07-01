import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { donsID: string; receptionID: string } },
) {
    const receptionID = params.receptionID
    const donsID = params.donsID
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Reception WHERE Reception.numero_reception = ? AND code_Don = ?;',
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

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { donsID: string; receptionID: string } },
) {
    const receptionID = params.receptionID
    if (receptionID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `reception` WHERE `numero_reception` = ?'
        const [rows] = await pool.query(query, receptionID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
