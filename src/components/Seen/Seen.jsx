import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../Utility/Context';
import axios from 'axios';


const Seen = () => {
    const {currentUser, setCurrentUser, updateUser} = useContext(DataContext)
    const [event, setEvent] = useState()

    const deleteEvent = async (event) => {
        const id = event.target.id
        const targetEvent = await axios.get(`https://intense-island-04626.herokuapp.com/events/${id}`)
        const newEvent = {...targetEvent.data, attendees: [...targetEvent.data.attendees.filter(user => user !== currentUser.id)]}
        const auth = localStorage.getItem('auth')
        const config = {
					headers: {
						Authorization: `Token  ${auth}`,
					},
				};
        // send to back end
        let res = await axios.put(
					`https://intense-island-04626.herokuapp.com/events/${id}`, newEvent, config
				);

        console.log(res)

        // update user 
        updateUser()
    
    }

	return (
		<div>
			<h3 className='greeting'>Hey, {currentUser.username}!</h3>
			<h1>Attending</h1>
			<div className='event-list'>
				{currentUser.attending.map((event, index) => (
					<div className='event-link' key={`${event.id}`}>
						<div className='img-container'>
							<img className='image' src={event.img_url} alt='' />
						</div>
						<h2>{event.name}</h2>
						<h4>{event.genre}</h4>
						<h4>
							{event.city}, {event.state}
						</h4>
						<h4>{event.start}</h4>
						<h4>{event.venue}</h4>
						<a href={event.tm_url}>Get your tickets here!</a>
						<button id={event.id} onClick={deleteEvent}>Remove from Seen</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Seen;
