import { NextResponse } from 'next/server'
import pool from '../../../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { groupeID: string } },
) {
    const groupeID = params.groupeID
    try {
        const [rows] = await pool.query(
            'SELECT * FROM Groupe WHERE code_Groupe = ?;',
            [groupeID],
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

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { siteID: string; groupeID: string } },
) {
    const groupeID = params.groupeID
    if (groupeID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `groupe` WHERE `code_Groupe` = ?'
        const [rows] = await pool.query(query, groupeID)
        return NextResponse.json(rows)
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
