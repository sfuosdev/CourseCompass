import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarPage = () => {
    const calendarRef = useRef(null);
    const [expandedEventId, setExpandedEventId] = useState(null);
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('calendarEvents');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });
    const [newEvent, setNewEvent] = useState({ title: '', location: '', section: '', start: '', end: '', color: '' });

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView('timeGridWeek');
    }, []);

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const handleEventClick = (clickInfo) => {
        if (expandedEventId === clickInfo.event.id) {
            setExpandedEventId(null); // Collapse the event info if already expanded
        } else {
            setExpandedEventId(clickInfo.event.id); // Expand the clicked event info
        }
    };

    const handleClearCalendar = () => {
        if (window.confirm('Are you sure you want to clear all events?')) {
            setEvents([]);
        }
    };

    const handleAddEvent = () => {
        setEvents([...events, newEvent]);
        setNewEvent({ title: '', location: '', section: '', start: '', end: '', color: '' });
    };

    const handleDeleteEvent = (eventId) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            const remainingEvents = events.filter(event => event.id !== eventId);
            setEvents(remainingEvents);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <div style={{ maxWidth: '700px', minHeight: '400px', margin: '0 auto' }}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    headerToolbar={false}
                    weekends={false}
                    slotMinTime="06:00:00"
                    slotMaxTime="22:00:00"
                    slotLabelFormat={{ hour: 'numeric', minute: '2-digit' }}
                    slotLabelInterval="01:00"
                    allDaySlot={false}
                    eventClick={handleEventClick} // Handle event click
                    events={events}
                    eventContent={(eventInfo) => (
                        <>
                            <b>{eventInfo.timeText}</b> {eventInfo.event.title}
                            {/* Show more button */}
                            {expandedEventId === eventInfo.event.id && (
                                <div style={{ backgroundColor: eventInfo.event.backgroundColor }} className='border border-black rounded p-1 opacity-70'>
                                    <div><i>{eventInfo.event.extendedProps.description}</i></div>
                                    <div>Location:<small>{eventInfo.event.extendedProps.location}</small></div>
                                    <div>Section:<small>{eventInfo.event.extendedProps.section}</small></div>
                                    <button onClick={() => setExpandedEventId(null)} className='underline hover:text-zinc-700 '>Hide</button>
                                    <button onClick={() => handleDeleteEvent(eventInfo.event.id)} className='underline hover:text-zinc-700 ml-2'>Delete</button>
                                </div>
                            )}
                            {expandedEventId !== eventInfo.event.id && (
                                <button onClick={() => setExpandedEventId(eventInfo.event.id)} className='hover:text-zinc-700 underline text-zinc-300'>Show More</button>
                            )}
                        </>
                    )}
                />
            </div>
            <div className="mt-4 flex justify-center flex-col">
                <button onClick={handleClearCalendar} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">Clear Calendar</button>
                <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <input type="location" placeholder="Location" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <input type="section" placeholder="Section" value={newEvent.section} onChange={(e) => setNewEvent({ ...newEvent, section: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <input type="datetime-local" placeholder="Start" value={newEvent.start} onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <input type="datetime-local" placeholder="End" value={newEvent.end} onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <input type="color" value={newEvent.color} onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })} className="mr-2 px-2 py-1 border rounded" />
                <button onClick={handleAddEvent} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Event</button>
                <button onClick={() => localStorage.setItem('calendarEvents', JSON.stringify(events))} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save Calendar</button>
            </div>
        </div>
    );
};

export default CalendarPage;
