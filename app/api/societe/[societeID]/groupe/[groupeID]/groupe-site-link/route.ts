import { NextResponse } from 'next/server'
import connection from '../../../../../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../../../../../utils/streamUtils'
import { SuiviGroupes } from '@/app/societe/[societeID]/groupe/[groupeID]/groupe-site-link/page'

type CountResult = { count: number }[]

export async function GET(
    request: Request,
    { params }: { params: { societeID: string; groupeID: string } },
) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'
    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT SuiviGroupe.*, groupe.nom_du_groupe, SiteTypes.libelle, sites.designation_longue, CONCAT(utilisateurs.prenom," ",utilisateurs.nom) as name FROM `SuiviGroupe` LEFT JOIN groupe ON groupe.code_groupe = SuiviGroupe.code_groupe LEFT JOIN SiteTypes ON SiteTypes.code_type_site = SuiviGroupe.code_type_de_Site LEFT JOIN sites ON sites.code_site = SuiviGroupe.code_site_suivi LEFT JOIN utilisateurs ON utilisateurs.code_utilisateur = SuiviGroupe.code_utilisateur_suivant WHERE SuiviGroupe.code_groupe = ? LIMIT ?, ?',
            [params.groupeID, offset, limitNumber],
        )

        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `SuiviGroupe` WHERE code_groupe = ?',
            [params.groupeID],
        )

        const total = totalResult as CountResult

        return NextResponse.json({ data: rows, total: total[0].count })
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}

export async function POST(req: NextApiRequest) {
    let contact: SuiviGroupes
    try {
        contact = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !contact.code_groupe ||
        !contact.code_type_de_Site ||
        !contact.code_site_suivi ||
        !contact.code_utilisateur_suivant
    ) {
        console.log(contact.code_groupe)
        console.log(contact.code_type_de_Site)
        console.log(contact.code_site_suivi)
        console.log(contact.code_utilisateur_suivant)
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        console.log(contact)
        const query = 'INSERT INTO `SuiviGroupe` SET ?'
        const [rows] = await connection.query(query, contact)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
