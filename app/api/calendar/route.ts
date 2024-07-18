// app/api/calendar/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GET as getEventsByDate } from '../events/route'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
        return NextResponse.json({ message: 'Invalid date' }, { status: 400 })
    }

    try {
        const events = await getEventsByDate()

        return NextResponse.json(events, { status: 200 })
    } catch (error) {
        console.error('Error retrieving events:', error)
        return NextResponse.json(
            { message: 'Error retrieving events' },
            { status: 500 },
        )
    }
}
