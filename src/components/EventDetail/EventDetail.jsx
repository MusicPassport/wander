import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router';

function EventDetail() {
	const { id } = useParams();
	const { currentUser, updateUser } = useContext(DataContext);
	const [eventDetail, setEventDetail] = useState();
	const [updateEvent, setUpdateEvent] = useState();
	const [select, setSelect] = useState(false)
	const history = useHistory();

	const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${'RW9cwwI0fopdanO8UIpgzYPYq0GlSavB'}`;

	useEffect(() => {
		// get events
		axios
			.get(url)
			.then((res) => {
				setEventDetail({ ...res.data });
			})
			.catch((err) => console.log(err));
	}, []);

	const formatData = () => {
		const newEvent = {
			id: id,
			name: eventDetail.name,
			genre: eventDetail.classifications[0].genre.name,
			city: eventDetail['_embedded'].venues[0].city.name,
			state: eventDetail['_embedded'].venues[0].state.name,
			address: eventDetail['_embedded'].venues[0].address.line1,
			tm_url: eventDetail.url,
			img_url: eventDetail.images[0].url,
			start: eventDetail.dates.start.localDate,
			venue: null,
			attendees: [],
			viewers: [],
		};
		return newEvent;
	};

	const addEvent = async (event) => {
		// send a request to update the user detail to include the current user in the events viewers
		setSelect(true)
		const auth = localStorage.getItem('auth');
		console.log(event.target.id);
		let target = event.target.id;
		try {
			const event = await axios.get(
				`https://intense-island-04626.herokuapp.com/events/${id}`
			);
			setUpdateEvent({ ...event.data });
			console.log('Updated Event:', {
				...updateEvent,
				target: [...target, parseInt(currentUser.id)],
			});
			if (event.status == 200) {
				console.log('Updating Event!');
				await axios.put(
					`https://intense-island-04626.herokuapp.com/events/${id}`,
					{ ...updateEvent, target: [...target, parseInt(currentUser.id)] },
					{
						headers: {
							Authorization: `Token  ${auth}`,
						},
					}
				);
			}

			updateUser()

		} catch (error) {
			console.log(error);
			console.log(event.target.id);
			let newTarget = event.target.id;
			console.log({ ...formatData(), [newTarget]: [currentUser.id] });
			console.log('Not Found!');
			const results = await axios.post(
				`https://intense-island-04626.herokuapp.com/events/`,
				{ ...formatData(), [newTarget]: [currentUser.id] },
				{
					headers: {
						Authorization: `Token  ${auth}`,
					},
				}
			);
			updateUser();
			console.log('Results ', results);
		}
	};

	if (!eventDetail) {
		return <h1>Loading...</h1>;
	}

	//display the event detail in a card
	return (
		<div className='details-container'>
			<button
				className='btn detail-btn backButton'
				onClick={() => history.goBack()}>
				←
			</button>
			<div className='details-card'>
				<div className='images-container'>
					<img
						className='event-img'
						src={eventDetail.images[3].url}
						alt={`${eventDetail.name} + promo`}></img>
				</div>
				<div className='info-container'>
					<h2 className='event-details-title'>{eventDetail.name}</h2>
					<p className='start'>
						Event Start Date: {eventDetail.dates.start.localDate}
					</p>
					<p className='start end'>
						Sales End:{eventDetail.sales.public.endDateTime.substr(0, 10)}
					</p>
					<div className='detail-btns'>
						<div>
							{select ? (
								<Link to='/dashboard/'>
									<button className='btn detail-btn view'>
										Go To Dashboard
									</button>
								</Link>
							) : (
								<>
									<button
										className='btn detail-btn bucket'
										id='viewers'
										onClick={addEvent}>
										Add To BucketList
									</button>
									<button
										className='btn detail-btn seen'
										id='attendees'
										onClick={addEvent}>
										Add To Attending
									</button>
								</>
							)}
						</div>
						<a target='_blank' href={eventDetail.url} rel='noreferrer'>
							<button className='btn detail-btn tickets'>View Tickets</button>
						</a>
					</div>
				</div>
			</div>

			{eventDetail.seatmap ? (
				<div className='seat-map details-card'>
					<div className='seat'>
						<h3 className='seat-text'>Seat Map</h3>
					</div>
					<div className='seat-image'>
						<img
							className='event-img seat-img'
							src={eventDetail.seatmap.staticUrl}
							alt={`${eventDetail.name} + seat map`}></img>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default EventDetail;