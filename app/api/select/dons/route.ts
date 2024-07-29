import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'

enum StatutAcceptationDon {
    Valide = 'Valide',
    Refuse = 'Refusé',
    Attente = 'En attente',
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', request.url))
    }
    try {
        const statuts = [
            { id: 'A', label: StatutAcceptationDon.Attente },
            { id: 'V', label: StatutAcceptationDon.Valide },
            { id: 'R', label: StatutAcceptationDon.Refuse },
        ]

        return NextResponse.json(statuts)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
