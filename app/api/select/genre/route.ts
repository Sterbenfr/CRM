import { NextResponse } from 'next/server'

enum StatutGenre {
    Madame = 'Madame',
    Monsieur = 'Monsieur',
    Autre = 'Autre',
}

export async function GET() {
    try {
        const statuts = [
            { id: 'Mme', label: StatutGenre.Madame },
            { id: 'Mr', label: StatutGenre.Monsieur },
            { id: 'Oth', label: StatutGenre.Autre },
        ]

        return NextResponse.json(statuts)
    } catch (err) {
        return NextResponse.json(
            { error: 'Internal Server Error : ' + err },
            { status: 500 },
        )
    }
}
