import { NextResponse } from 'next/server'
import connection from '../../../../utils/db'
import { NextApiRequest } from 'next'

export async function GET(
    request: Request,
    { params }: { params: { siteID: string } },
) {
    const siteID = params.siteID
    try {
        const [rows] = await connection.query(
            'SELECT code_site,designation_longue,designation_courte,adresse,SiteTypes.libelle as st_libelle,date_ouverture,date_fermeture,numero_telephone,adresse_mail,commentaires FROM Sites LEFT JOIN SiteTypes ON Sites.code_type_site = SiteTypes.code_type_site WHERE code_site = ?;',
            [siteID],
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
    { params }: { params: { siteID: string } },
) {
    const siteID = params.siteID
    if (siteID === undefined) {
        return NextResponse.json({ error: 'Bad ID' }, { status: 400 })
    }

    try {
        const query = 'DELETE FROM `sites` WHERE `code_site` = ?'
        const [rows] = await connection.query(query, siteID)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
