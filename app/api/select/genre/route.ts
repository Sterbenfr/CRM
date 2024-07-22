import { NextResponse } from 'next/server'

enum StatutGenre {
    Madame = 'Madame',
    Monsieur = 'Monsieur',
    Autre = 'Non renseigné',
}

export async function GET() {
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
