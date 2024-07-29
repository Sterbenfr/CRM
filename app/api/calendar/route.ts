// app/api/calendar/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { GET as getEventsByDate } from '../events/route'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/authOptions'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.redirect(new URL('/error/not-access', req.url))
    }
    const { searchParams } = new URL(req.url)
    const date = searchParams.get('date')

    if (!date) {
        return NextResponse.json({ message: 'Invalid date' }, { status: 400 })
    }

    try {
        const events = await getEventsByDate(req)

        return NextResponse.json(events, { status: 200 })
    } catch (error) {
        console.error('Error retrieving events:', error)
        return NextResponse.json(
            { message: 'Error retrieving events' },
            { status: 500 },
        )
    }
}
