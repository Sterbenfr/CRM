'use client'
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import '../styles/calendarStyles.css'

const CalendarPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events')
                const data = await res.json()
                setEvents(data)
            } catch (error) {
                console.error('Failed to fetch events:', error)
            }
        }

        fetchEvents()
    }, [])

    const renderEventContent = (eventInfo: {
        event: { url: string; title: string }
    }) => {
        return (
            <a
                href={eventInfo.event.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}
                title={eventInfo.event.title}
            >
                <div>
                    <span>{eventInfo.event.title}</span>
                </div>
            </a>
        )
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView='dayGridMonth'
            events={events}
            locale={frLocale}
            selectable={true}
            aspectRatio={1.5}
            selectMirror={true}
            dayMaxEvents={true}
            eventContent={renderEventContent}
            headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth',
            }}
            eventTimeFormat={{
                hour: 'numeric',
                minute: '2-digit',
                second: undefined,
                meridiem: false,
            }}
        />
    )
}

export default CalendarPage
