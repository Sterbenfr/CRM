import { NextResponse } from 'next/server'
import connection from '../../../utils/db'
import { NextApiRequest } from 'next'
import { streamToString } from '../../../utils/streamUtils'
import type { Affectation } from '@/app/affectation/page'

type CountResult = { count: number }[]

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const page = searchParams.get('page') || '1'
    const limit = searchParams.get('limit') || '10'

    try {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        const offset = (pageNumber - 1) * limitNumber

        const [rows] = await connection.query(
            'SELECT CONCAT(Utilisateurs.prenom , " " , Utilisateurs.nom) as code_Utilisateur_Prospecteur, Entite.raison_sociale as code_Entite, AffectationDonateursProspecteurs.commentaires,AffectationDonateursProspecteurs.date_affectation,AffectationDonateursProspecteurs.date_arret_affectation FROM `AffectationDonateursProspecteurs` LEFT JOIN Utilisateurs ON Utilisateurs.code_utilisateur = AffectationDonateursProspecteurs.code_Utilisateur_Prospecteur LEFT JOIN Entite ON Entite.code_entite = AffectationDonateursProspecteurs.code_entite LIMIT ?, ?',
            [offset, limitNumber],
        )
        const [totalResult] = await connection.query(
            'SELECT COUNT(*) as count FROM `AffectationDonateursProspecteurs`',
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
    let affectation: Affectation
    try {
        affectation = JSON.parse(await streamToString(req.body))
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    if (
        !affectation.code_Utilisateur_Prospecteur ||
        !affectation.code_Entite ||
        !affectation.date_affectation
    ) {
        return NextResponse.json(
            { error: 'Missing product data' },
            { status: 400 },
        )
    }

    try {
        const query = 'INSERT INTO `AffectationDonateursProspecteurs` SET ?'
        const [rows] = await connection.query(query, affectation)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + error },
            { status: 500 },
        )
    }
}
