import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';

function EventDetail() {
    // get the event id
    const { id } = useParams();
    // const id = 'Z7r9jZ1AdAV0v';
    // get all events
    const { events, setEvents } = useContext(DataContext);
    const [eventDetail, setEventDetail] = useState({
			// filter for target event 
			...events.filter((event) => event.id === id)[0],
		});
    
    //display the event detail in a card 
    return (
			<div className='details-container'>
				<div className='images-container'>
					<img
						className='event-img'
						src={eventDetail.images[0].url}
						alt={`${eventDetail.name} + promo`}></img>
				</div>
				<div className='detail-btns'>
					<button className='btn detail-btn bucket'>Add To BucketList</button>
					<button className='btn detail-btn seen'>Add To Seen</button>
					<a href={eventDetail.url}>
						<button className='btn detail-btn tickets'>View Tickets</button>
					</a>
				</div>
				<div className='info-container'>
					<h2>{eventDetail.name}</h2>
					<p>Start Date: {eventDetail.start.localDate}</p>
					<div className='seat-map'>
						<img
							src={eventDetail.seatmap.staticUrl}
							alt={`${eventDetail.name} + seat map`}></img>
					</div>
				</div>
			</div>
		);
};

export default EventDetail;