// app/api/calendar/route.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { GET as getEventsByDate } from '../events/route'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { date } = req.query

    if (!date || Array.isArray(date)) {
        return res.status(400).json({ message: 'Invalid date' })
    }

    try {
        const events = await getEventsByDate()

        return res.status(200).json(events)
    } catch (error) {
        console.error('Error retrieving events:', error)
        return res.status(500).json({ message: 'Error retrieving events' })
    }
}
