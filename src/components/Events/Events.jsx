import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import './Events.css';
import axios from 'axios';
import EventSearch from './EventSearch.jsx';

const Events = () => {
	const { events, setEvents } = useContext(DataContext);

    const { searchInputs, setSearchInputs } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
    
    let keyword = searchInputs.keyword
			? `&keyword=${encodeURIComponent(searchInputs.keyword)}`
			: '&keyword=music'; 
    let postalCode = searchInputs.postalCode ? `&postalCode=${encodeURIComponent(searchInputs.postalCode)}`:"";
    let city = searchInputs.city ? `&city=${encodeURIComponent(searchInputs.city)}` : "";
    let state= searchInputs.stateCode ? `&stateCode=${encodeURIComponent(searchInputs.stateCode)}`:"";
    let startDate= searchInputs.startDateTime ? `&startDateTime=${encodeURIComponent(searchInputs.startDateTime)}T00:00:00Z` :"";
    let endDate= searchInputs.endDateTime ? `&endDateTime=${encodeURIComponent(searchInputs.endDateTime)}T00:00:00Z` :"";
    let classification= searchInputs.classificationName ? `&segment=${encodeURIComponent(searchInputs.classificationName) }` :"";


     let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword}${postalCode}${city}${state}${startDate}${endDate}${classification}`


	const getEvents = async () => {
		try {
			const result = await axios.get(url);
			setEvents([...result.data['_embedded'].events]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
	
			getEvents();
		
	}, [isOpen]);


	return (
		 <div>
            <button className={isOpen ? 'noToggle' : 'toggle'} onClick={()=>setIsOpen(!isOpen)}>Advanced Search</button>
            <div className={isOpen ? 'toggle' : 'noToggle'}>
                <EventSearch setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
            <div className={isOpen ? 'event-list noToggle' : 'event-list toggle'}>
				{/* <div className='event-list'> */}
				{events.map((event) => (
					<Link className='event-link' to={`/events/${event.id}`}>
						<div className='img-container'>
							<img className='image' src={event.images[2].url} alt='' />
					</div>
					<h2>{event.name}</h2>
					{/* <h4>{event.dates.start.localDate}</h4> */}
					<h4>{event.dates.status.code}</h4>
					{/* <h4>{event._embedded.venues[0].name}</h4> */}
					{/* <h4>Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}</h4> */}
				</Link>
				// <button onClick={addEvent}>Add Event</button>
			))}

			{/* <Link to="/create">Create an Event</Link> */}
		</div>
		</div>
	);
};

export default Events;
