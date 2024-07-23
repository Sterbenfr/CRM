import { NextRequest, NextResponse } from 'next/server'
import connection from '../../../../../../utils/db'

export async function GET(
    request: Request,
    { params }: { params: { groupeID: string } },
) {
    const groupeID = params.groupeID
    try {
        const [rows] = await connection.query(
            'SELECT * FROM Groupe WHERE code_groupe = ?;',
            [groupeID],
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
    req: NextRequest,
    { params }: { params: { siteID: string; groupeID: string } },
) {
    const groupeID = params.groupeID
    if (groupeID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `Groupe` WHERE `code_groupe` = ?'
        const [rows] = await connection.query(query, groupeID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
