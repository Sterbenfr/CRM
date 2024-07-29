import { NextResponse } from 'next/server'

enum StatutAcceptationDon {
    Valide = 'Valide',
    Refuse = 'Refusé',
    Attente = 'En attente',
}

export async function GET(request: Request) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const url = new URL(request.url)
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
