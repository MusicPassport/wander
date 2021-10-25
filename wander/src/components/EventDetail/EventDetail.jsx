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
		axios
			.get(url)
			.then((res) => setEventDetail({ ...res.data }))
			.catch((err) => console.log(err));
	}, []);

	const getEvent = async () => {
		try {
			const event = await axios.get(
				`https://intense-island-04626.herokuapp.com/events/${id}`
			);
			if (event.status === 200) {
				return true;
			} else if (event.status === 404) {
				return false;
			}
		} catch (error) {
			console.log(error)
		}
	}

	const formatData = async () => {
		const newEvent = {
			name: eventDetail.name,
			genre: eventDetail.genre.name,
			summary: eventDetail.promoter.description,
			city: eventDetail.venues.city.name,
			state: eventDetail.venues.state.name,
			address: eventDetail.venues.address.line1,
			tm_url: eventDetail.url,
			img_url: eventDetail.images[0].url,
			eventId: eventDetail.id,
			start: eventDetail.dates.start.localDate,
			venue: eventDetail.venues.name,
			attendees: [],
			viewers: [],
		};
		return newEvent;
	}

	const addSeen = () => {
		// send a request to update the user detail to include the current user in the events attendees
		if (getEvent) {
			axios.put(`https://intense-island-04626.herokuapp.com/events${id}`, {
				...formatData(),
				attendees: 'currentUser',
			});
		} else {
			axios.post(`https://intense-island-04626.herokuapp.com/events${id}`, {
				...formatData(),
				attendees: 'currentUser',
			});

		}
		
	};

	const addBucketList = () => {
		// send a request to update the user detail to include the current user in the events viewers
		if (getEvent) {
			axios.put(`https://intense-island-04626.herokuapp.com/events${id}`, {
				...formatData(),
				viewers: 'currentUser',
			});
		} else {
			axios.post(`https://intense-island-04626.herokuapp.com/events${id}`, {
				...formatData(),
				viewers: 'currentUser',
			});
		}
	};

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
				<p className='start'>Start Date: {eventDetail.dates.start.localDate}</p>
				<div className='detail-btns'>
					<button className='btn detail-btn bucket' onClick={addBucketList}>
						Add To BucketList
					</button>
					<button className='btn detail-btn seen' onClick={addSeen}>
						Add To Seen
					</button>
					<a target='_blank' href={eventDetail.url}>
						<button className='btn detail-btn tickets'>View Tickets</button>
					</a>
				</div>
				<h3>Seat Map</h3>
				{eventDetail.seatmap ? (
					<div className='seat-map'>
						<img
							className='event-img seat-img'
							src={eventDetail.seatmap.staticUrl}
							alt={`${eventDetail.name} + seat map`}></img>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default EventDetail;
