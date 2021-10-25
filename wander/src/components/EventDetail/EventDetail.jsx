import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import './EventDetail.css';

function EventDetail() {
	const { id } = useParams();
	const { events, setEvents } = useContext(DataContext);
	const [eventDetail, setEventDetail] = useState();

	const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`;

	useEffect(() => {
		axios.get(url).then((res) => setEventDetail({ ...res.data }));
	}, []);

	if (!eventDetail) {
		return <h1>Loading...</h1>;
	}

	//display the event detail in a card
	return (
		<div className='details-container'>
			<div className='images-container'>
				<img
					className='event-img'
					src={eventDetail.images[1].url}
					alt={`${eventDetail.name} + promo`}></img>
			</div>
			<div className='info-container'>
				<h2>{eventDetail.name}</h2>
				<p>Start Date: {eventDetail.dates.start.localDate}</p>
				<div className='detail-btns'>
					<button className='btn detail-btn bucket'>Add To BucketList</button>
					<button className='btn detail-btn seen'>Add To Seen</button>
					<a target='_blank' href={eventDetail.url}>
						<button className='btn detail-btn tickets'>View Tickets</button>
					</a>
				</div>
				{
					eventDetail.seatmap ? 
					<div className='seat-map'>
					<img
						className='event-img seat-img'
						src={eventDetail.seatmap.staticUrl}
						alt={`${eventDetail.name} + seat map`}></img>
				</div> : null
				}
	
			</div>
		</div>
	);
}

export default EventDetail;
