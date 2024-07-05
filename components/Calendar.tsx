'use client'
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'

const CalendarPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events')
                const data = await res.json()
                //console.log('Fetched events:', data) // Ajout de log pour vérifier les événements récupérés
                setEvents(data)
            } catch (error) {
                console.error('Failed to fetch events:', error)
            }
        }

        fetchEvents()
    }, [])

    // Fonctions pour ajouter et supprimer des événements

    /*  
    const handleDateClick = info => {
        const title = prompt('Enter a title for your event:')
        if (title) {
            const newEvent = {
                id: String(events.length + 1),
                title,
                date: info.dateStr,
            }
            setEvents([...events, newEvent])
        }
    }

    const handleEventClick = info => {
        if (
            confirm(
                `Are you sure you want to delete the event '${info.event.title}'`,
            )
        ) {
            setEvents(events.filter(event => event.id !== info.event.id))
        }
    }
*/
    const renderEventContent = (eventInfo: {
        event: { url: string | undefined; title: React.ReactNode }
    }) => {
        return (
            <a
                href={eventInfo.event.url}
                target='_blank'
                rel='noopener noreferrer'
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
            // Appels des fonctions pour ajouter et supprimer des événements
            //dateClick={handleDateClick}
            //eventClick={handleEventClick}
            editable={true}
            selectable={true}
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
