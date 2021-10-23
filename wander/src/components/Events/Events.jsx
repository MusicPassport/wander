import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../../Utility/Context';
import './Events.css'


const Events = () => {

const {events, setEvents } = useContext(DataContext)
console.log(events);

if (!events) {
    return <h1>Loading...</h1>
}

    return (
        <div className="event-list">
                {events.map((event) => (
                    <Link className='link' to={`/events/${event.id}`}>
                        <img className='image' src={event.images[2].url} alt="" />
                        <h2>{event.name}</h2>
                        <h4>{event.dates.start.localDate}</h4>
                        <h4>{event.dates.status.code}</h4>
                        <h4>{event._embedded.venues[0].name}</h4>
                        {/* <h4>Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}</h4> */}
                    </Link>
                    // <button onClick={addEvent}>Add Event</button>
                ))}

                {/* <Link to="/create">Create an Event</Link> */}
        </div>
    )
}

export default Events;
