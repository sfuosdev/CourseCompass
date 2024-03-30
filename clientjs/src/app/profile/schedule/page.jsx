"use client";
import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

const CalendarPage = () => {
    const calendarRef = useRef(null);
    const [courses, setCourses] = useState([
        {
            id: 1,
            title: 'CMPT 225',
            sections: [
                { id: 'd100', title: 'Section D100', days: ['2024-03-25', '2024-03-26'], location: 'AQ9000', startTime: '15:00', endTime: '16:00', color: 'blue' },
                { id: 'd200', title: 'Section D200', days: ['2024-03-28', '2024-03-29'], location: 'AQ9000', startTime: '16:00', endTime: '17:00', color: 'blue' }
            ]
        },
        {
            id: 2,
            title: 'MATH 101',
            sections: [
                { id: 'm101', title: 'Section M101', days: ['2024-03-25', '2024-03-27'], location: 'AB1001', startTime: '10:00', endTime: '11:00', color: 'red' },
                { id: 'm102', title: 'Section M102', days: ['2024-03-28', '2024-03-29'], location: 'AB1001', startTime: '12:00', endTime: '13:00', color: 'red' }
            ]
        },
        {
            id: 3,
            title: 'CMPT 300',
            sections: [
                { id: 'e100', title: 'Section E100', days: ['2024-03-26', '2024-03-28'], location: 'AQ1001', startTime: '10:00', endTime: '11:00', color: 'green' },
                { id: 'e200', title: 'Section E200', days: ['2024-03-25', '2024-03-26'], location: 'AQ1001', startTime: '12:00', endTime: '13:00', color: 'green' }
            ]
        },
        {
            id: 4,
            title: 'CMPT 105',
            sections: [
                { id: 'd101', title: 'Section D101', days: ['2024-03-25', '2024-03-27'], location: 'ED1001', startTime: '08:30', endTime: '09:20', color: 'purple' },
                { id: 'd102', title: 'Section D102', days: ['2024-03-28', '2024-03-29'], location: 'ED1001', startTime: '08:00', endTime: '09:00', color: 'purple' }
            ]
        },
    ]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [events, setEvents] = useState([]);
    const [showExtraInfo, setShowExtraInfo] = useState({});

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView('timeGridWeek');
    }, []);

    const handleEventClick = (clickInfo) => {
        // Handle event click here
    };

    const handleClearCalendar = () => {
        if (window.confirm('Are you sure you want to clear all events?')) {
            setEvents([]);
        }
    };

    const handleAddEvent = () => {
        if (!selectedCourse || !selectedSection) {
            alert("Please select both a course and a section.");
            return;
        }

        const course = courses.find(course => course.id === selectedCourse);
        const section = course.sections.find(section => section.id === selectedSection);

        const existingEventsForCourse = events.filter(event => event.extendedProps.courseId === course.id);

        if (existingEventsForCourse.length > 0 && !window.confirm('Do you want to swap sections? This will replace all events for the selected course.')) {
            return;
        }

        const sectionEvents = section.days.flatMap(day => ({
            title: `${course.title}`,
            section: `${section.title}`,
            start: `${day}T${section.startTime}`,
            end: `${day}T${section.endTime}`,
            color: section.color,
            extendedProps: {
                location: section.location,
                section: section.title,
                courseId: course.id,
                sectionId: section.id
            }
        }));

        setEvents(prevEvents => {
            const filteredEvents = prevEvents.filter(event => event.extendedProps.courseId !== course.id);
            return [...filteredEvents, ...sectionEvents];
        });
    };

    const handleDeleteSection = (courseId, sectionId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this section?');
        if (confirmDelete) {
            const remainingEvents = events.filter(event => !(event.extendedProps.courseId === courseId && event.extendedProps.sectionId === sectionId));
            setEvents(remainingEvents);
        }
    };

    const toggleExtraInfo = (sectionId) => {
        setShowExtraInfo(prevState => ({
            ...prevState,
            [sectionId]: !prevState[sectionId]
        }));
    };

    return (
        <div style={{ position: 'relative' }}>

            <div className="ml-4 mt-4 flex justify-center flex-col">
                <button onClick={handleClearCalendar} className='border rounded-md p-2 bg-red-600 text-white hover:bg-red-400'>Clear Calendar</button>
                <div>
                    Add Courses:
                    <select onChange={(e) => setSelectedCourse(parseInt(e.target.value))} className='border border-black p-1 ml-3'>
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.title}</option>
                        ))}
                    </select>
                    {selectedCourse && (
                        <select onChange={(e) => setSelectedSection(e.target.value)} className='border border-black p-1'>
                            <option value="">Select Section</option>
                            {courses.find(course => course.id === selectedCourse).sections.map(section => (
                                <option key={section.id} value={section.id}>{section.title}</option>
                            ))}
                        </select>
                    )}
                    <button onClick={handleAddEvent} className='border rounded-md p-2 bg-primary-blue text-white hover:bg-primary-yellow hover:text-black'>Add Event</button>
                </div>
            </div>
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
                    eventClick={handleEventClick}
                    events={events}
                    eventContent={(eventInfo) => (
                        <>
                            {eventInfo.timeText} {eventInfo.event.title}
                            <div style={{ backgroundColor: eventInfo.event.backgroundColor }} className='border border-black rounded p-1 opacity-70'>
                                <div>
                                    {showExtraInfo[eventInfo.event.extendedProps.sectionId] ? (
                                        <div>
                                            Location: {eventInfo.event.extendedProps.location}<br />
                                            Section: {eventInfo.event.extendedProps.section}
                                            <button onClick={() => handleDeleteSection(eventInfo.event.extendedProps.courseId, eventInfo.event.extendedProps.sectionId)} className='underline hover:text-red-700'>Delete Section</button>
                                            <button onClick={() => toggleExtraInfo(eventInfo.event.extendedProps.sectionId)} className='underline hover:text-gray-700'>Hide</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => toggleExtraInfo(eventInfo.event.extendedProps.sectionId)} className='underline hover:text-gray-700'>Show More</button>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default CalendarPage;
