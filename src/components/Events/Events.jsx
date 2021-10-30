import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import '../../css/Events.css';
import axios from 'axios';
import EventSearch from './EventSearch.jsx';
import { useHistory } from 'react-router';
import video from '../../assets/Wandr Video.mp4'

const Events = () => {
	const { events, setEvents } = useContext(DataContext);

    const { searchInputs, setSearchInputs } = useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
	const [skipCount, setSkipCount] = useState(true);
	const history = useHistory();
    
    let keyword = searchInputs.keyword ? `&keyword=${encodeURIComponent(searchInputs.keyword)}`:"music"; 
    let postalCode = searchInputs.postalCode ? `&postalCode=${encodeURIComponent(searchInputs.postalCode)}`:"";
    let city = searchInputs.city ? `&city=${encodeURIComponent(searchInputs.city)}` : "";
    let state= searchInputs.stateCode ? `&stateCode=${encodeURIComponent(searchInputs.stateCode)}`:"";
    let startDate= searchInputs.startDateTime ? `&startDateTime=${encodeURIComponent(searchInputs.startDateTime)}T00:00:00Z` :"";
    let endDate= searchInputs.endDateTime ? `&endDateTime=${encodeURIComponent(searchInputs.endDateTime)}T00:00:00Z` :"";
    let classification= searchInputs.classificationName ? `&segment=${encodeURIComponent(searchInputs.classificationName) }` :"";


     let url=`https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}${keyword}${postalCode}${city}${state}${startDate}${endDate}${classification}`

	 console.log(url)

	const getEvents = async () => {
		try {
			const result = await axios.get(url);
			console.log('this is the result', result);
			if (result.data.page.totalElements > 0 ){
			setEvents([...result.data['_embedded'].events]);

			} else {
				console.log('No events matched')
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (skipCount) {
			setSkipCount(false)
		} else if (!skipCount && !isOpen) getEvents()
		
	}, [isOpen]);


	return (
		 <div>
			 <div className='movie' >
				<video className='video' src={video} loop autoPlay muted></video>
			 </div>
			 <div className="searchToolbar">
				<button className={isOpen ? 'noToggle backButton' : 'toggle backButton'}  onClick={()=> history.goBack()}>←</button>
				{/* <button className={isOpen ? 'noToggle' : 'toggle'} onClick={()=>setIsOpen(!isOpen)}>Advanced Search</button>
				<div className={isOpen ? 'toggle' : 'noToggle'}> */}
				<button className={isOpen ? 'noToggle advancedSearchButton' : 'toggle advancedSearchButton'} onClick={()=>setIsOpen(!isOpen)}>Advanced Search</button>
			</div>
			<div className={isOpen ? 'toggle' : 'noToggle'}>	
                <EventSearch setIsOpen={setIsOpen} isOpen={isOpen}/>
            </div>
				<h1 className='events-title'>Events</h1>
            <div className={isOpen ? 'event-list noToggleTest' : 'event-list toggleTest'}>
				{/* <div className='event-list'> */}
				{events.map((event) => (
					<div className="eventDiv">
					<Link className='event-link' to={`/events/${event.id}`}>
						<div className='event-container'>
						<div className='img-container'>
								<img className='image' src={event.images[2].url} alt='' />
						</div>
						<h2>{event.name}</h2>
						<h4>{event.dates.start.localDate}</h4>
						<h4>{event.dates.status.code}</h4>
						<h4>{event._embedded.venues[0].name}</h4>
						{/* <h4>Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.stateCode}</h4> */}
						<h4>Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}</h4>
						{/* {!event._embedded.venues[0].country.countryCode === 'US' ? <h4>{event._embedded.venues[0].country.name} </h4>  : <h4>{event._embedded.venues[0].state.name}</h4>} */}
						</div>
					</Link>
				 {/* <button onClick={addEvent}>Add Event</button> */}
					</div>
			))}

			{/* <Link to="/create">Create an Event</Link> */}
		</div>
		</div>
	);
};

export default Events;
