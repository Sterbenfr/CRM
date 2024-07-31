'use client'
import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'
import '../styles/calendarStyles.css'

const CalendarPage = () => {
    const [events, setEvents] = useState<{ id: string }[]>([])
    const [filteredEvents, setFilteredEvents] = useState<{ id: string }[]>([])
    const [filters, setFilters] = useState({
        dons: false, 
        receptions: false,
        modaliteslivraison: false,
        interactions: false, 
    })

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

    useEffect(() => {
        const applyFilters = () => {
            const newFilteredEvents = events.filter(event => {
                if (
                    filters.dons &&
                    (event.id.startsWith('donsD-') ||
                        event.id.startsWith('don-'))
                )
                    return true
                if (filters.receptions && event.id.startsWith('reception-'))
                    return true
                if (
                    filters.modaliteslivraison &&
                    event.id.startsWith('modaliteslivraison-')
                )
                    return true
                if (
                    filters.interactions &&
                    (event.id.startsWith('interactions-') ||
                        event.id.startsWith('interactionsrelance-'))
                )
                    return true
                return false
            })
            setFilteredEvents(newFilteredEvents)
        }
        applyFilters()
    }, [events, filters])

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: checked,
        }))
    }

    const renderEventContent = (eventInfo: {
        event: { url: string; title: string }
    }) => {
        return (
            <a
                href={eventInfo.event.url}
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
        <div className='checkbox'>
            <div className='filter-container'>
                <label className='lineCh'>
                    <input
                        type='checkbox'
                        name='dons'
                        checked={filters.dons}
                        onChange={handleCheckboxChange}
                    />
                    Mise à disposition
                </label>
                <label className='lineCh'>
                    <input
                        type='checkbox'
                        name='receptions'
                        checked={filters.receptions}
                        onChange={handleCheckboxChange}
                    />
                    Réception
                </label>
                <label className='lineCh'>
                    <input
                        type='checkbox'
                        name='modaliteslivraison'
                        checked={filters.modaliteslivraison}
                        onChange={handleCheckboxChange}
                    />
                    Livraison
                </label>
                <label className='lineCh'>
                    <input
                        type='checkbox'
                        name='interactions'
                        checked={filters.interactions}
                        onChange={handleCheckboxChange}
                    />
                    Interaction & Relance
                </label>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                events={filteredEvents}
                locale={frLocale}
                selectable={true}
                aspectRatio={1.5}
                selectMirror={true}
                dayMaxEvents={true}
                eventContent={renderEventContent}
                headerToolbar={{
                    left: 'prev,next',
                    center: 'title',
                    right: 'none',
                }}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    second: undefined,
                    meridiem: false,
                }}
            />
        </div>
    )
}

export default CalendarPage
