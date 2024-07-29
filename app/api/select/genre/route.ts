import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'

enum StatutGenre {
    Madame = 'Madame',
    Monsieur = 'Monsieur',
    Autre = 'Non renseigné',
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    try {
        const statuts = [
            { id: 'Mme', label: StatutGenre.Madame },
            { id: 'M.', label: StatutGenre.Monsieur },
            { id: 'Aut', label: StatutGenre.Autre },
        ]

        return NextResponse.json(statuts)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
